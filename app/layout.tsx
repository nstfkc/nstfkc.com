import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nstfkc",
  description: "UI/UX designer and full-stack developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
