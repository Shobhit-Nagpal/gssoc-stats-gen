"use client";
import ImageTextForm from '@/components/image-text-form'

export default function Home() {
  return (
    <main className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">GSSoC Stat Generator</h1>
      <ImageTextForm />
    </main>
  )
}
