"use client";
import ImageTextForm from "@/components/image-text-form";

export default function Home() {
  return (
    <main className="mt-8 p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">GSSoC Stats Generator</h1>
      <ImageTextForm />
    </main>
  );
}
