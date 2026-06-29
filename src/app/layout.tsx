import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NorthEastern Stitches - Premium Traditional Attire",
  description: "Rooted in heritage. Driven by resilience. Customize and order authentic traditional wear online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-white text-brand-charcoal flex flex-col font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
