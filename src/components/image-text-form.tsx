"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  rank: z.number().min(1, { message: "Rank is required." }),
  score: z.number().min(1, { message: "Score is required." }),
  pullRequests: z.number().min(1, { message: "Pull Requests is required." }),
  badges: z.number().min(1, { message: "Badges is required." }),
  githubUsername: z
    .string()
    .min(1, { message: "GitHub username is required." }),
  profilePicUrl: z.string().url({ message: "Must be a valid URL." }),
});

type FormValues = z.infer<typeof formSchema>;

const ImageTextForm: React.FC = () => {
  const { toast } = useToast();
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rank: 0,
      score: 0,
      pullRequests: 0,
      badges: 0,
      githubUsername: "",
      profilePicUrl: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to generate certificate");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setResultImage(imageUrl);
      toast({
        title: "Generated certificate!",
      });
    } catch (error) {
      console.error("Error generating certificate:", error);
      // Here you might want to set an error state and display it to the user
      toast({
        title: "Something went wrong!",
        description: "Couldn't generate your stats :(",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="rank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rank</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter rank"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter score"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pullRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pull Requests</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of pull requests"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="badges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badges</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of badges"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter GitHub username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePicUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter profile picture URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Certificate"}
          </Button>
        </form>
      </Form>
      {resultImage && (
        <img
          src={resultImage}
          alt="Generated Certificate"
          className="mt-4 w-full"
        />
      )}
    </div>
  );
};

export default ImageTextForm;
