import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import TipBanner from "@/components/tip-banner";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GSSoC Stats Generator",
  description: "Get your GSSoC stats in a few seconds.",
  metadataBase: new URL("https://gssoc.shobhitnagpal.com"),
  openGraph: {
    title: "GSSoC Stats Generator",
    description: "Get your GSSoC stats in a few seconds.",
    url: "https://gssoc.shobhitnagpal.com",
    locale: "en_US",
    type: "website",
    images: "/opengraph-image.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["shobhitsnagpal@gmail.com", "https://www.shobhitnagpal.com"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="pt-16">
            <TipBanner />
            {children}
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
