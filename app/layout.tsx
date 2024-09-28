// File: app/layout.tsx
"use client"; // Add this to make this component a Client Component

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/layout/Header";
// import "tailwindcss/tailwind.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-20`}
      >
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
