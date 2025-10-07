import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ElasticCursor from "@/components/cursor/cursor";
import Preloader from "@/components/preloader";
import { TooltipProvider } from "@/components/global/tooltip";
import { config } from "@/data/config"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Preloader><TooltipProvider>{children}</TooltipProvider><ElasticCursor /></Preloader>
        
      </body>
    </html>
  );
}
