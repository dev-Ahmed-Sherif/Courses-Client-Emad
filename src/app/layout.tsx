// 13 4 2024
// import { Inter } from "next/font/google";
// import { Inter as FontSans } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

import type { Metadata } from "next";
import "@/styles/globals.css";
import { fontSans } from "@/styles/fonts";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import ThemeProvider from "@/providers/theme-provider";

import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const { title, description } = siteConfig;

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* 
      If you want to suppress a hydration warning on a given component, 
      you can pass the suppressHydrationWarning prop to it. 
      This signals to React that the component's content may be different once 
      the page is re-rendered on the client-side and to ignore the error.
    */
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Chang Default Icon */}
        <link rel="icon" href="./logo.ico" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* Don't set defaultTheme="light" */}
        <ThemeProvider attribute="class" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />

            <div className="flex-1">{children}</div>
            <Footer />
            <ScrollToTop />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
