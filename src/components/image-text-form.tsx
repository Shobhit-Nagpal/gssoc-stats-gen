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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  rank: z.number().min(1, { message: "Rank is required." }).optional(),
  score: z.number().min(1, { message: "Score is required." }).optional(),
  pullRequests: z
    .number()
    .min(1, { message: "Pull Requests is required." })
    .optional(),
  githubUsername: z
    .string()
    .min(1, { message: "GitHub username is required." }),
  postmanBadge: z.boolean().default(false),
  hackWeb3ConfBadge: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const ImageTextForm: React.FC = () => {
  const { toast } = useToast();
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rank: undefined,
      score: undefined,
      pullRequests: undefined,
      githubUsername: "",
      postmanBadge: false,
      hackWeb3ConfBadge: false,
    },
  });

  const fetchGitHubAvatar = async (username: string): Promise<string> => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      toast({
        title: "Check GitHub username",
        description: "Couldn't fetch GitHub details",
        variant: "destructive",
      });
      return `https://avatar.iran.liara.run/public/boy?username=${username}`;
    }
    const userData = await response.json();
    return userData.avatar_url;
  };

  const onSubmit = async (values: FormValues) => {
    // Check for empty fields
    const emptyFields = Object.entries(values).filter(([key, value]) => {
      if (key === "postmanBadge") return false; // Skip postmanBadge as it's a boolean
      return value === undefined || value === "";
    });

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields
        .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
        .join(", ");
      toast({
        title: "Missing Information",
        description: `Please fill in the following field(s): ${emptyFieldNames}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const avatarUrl = await fetchGitHubAvatar(values.githubUsername);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          profilePicUrl: avatarUrl,
        }),
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
      toast({
        title: "Something went wrong! Try again",
        description: "Couldn't generate your stats :(",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement("a");
      link.href = resultImage;
      link.download = "GSSoC24_Stats.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
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
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
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
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postmanBadge"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Did you get the Postman badge?</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hackWeb3ConfBadge"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Did you get the Hack Web3Conf badge?</FormLabel>
                </div>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </form>
      </Form>
      {resultImage && (
        <div className="space-y-4">
          <img
            src={resultImage}
            alt="Generated Certificate"
            className="mt-4 w-full"
          />
          <Button onClick={handleDownload} className="w-full">
            Download Certificate
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageTextForm;
