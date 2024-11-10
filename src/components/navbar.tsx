"use client";
import Link from "next/link";
import { ModeToggle } from "./theme-button";
import Image from "next/image";
import StarRepoButton from "./star-repo-button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center px-4 py-8 md:px-6 text-gray-49 border-b border-gray-100 bg-gray-900">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <h2 className="bg-gradient-to-r from-white to-yellow-600 inline-block text-transparent bg-clip-text font-bold">
          Shobhit-Nagpal
        </h2>
      </Link>
      <div className="ml-auto flex items-center justify-center gap-4">
        <StarRepoButton />
        <ModeToggle />
      </div>
    </header>
  );
}
