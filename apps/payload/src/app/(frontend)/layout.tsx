import React from "react";
import type { Metadata } from "next";

import { mergeOpenGraph } from "@/lib/utilities/mergeOpenGraph";

import "./globals.css";

import { getServerSideURL } from "@/lib/utilities/getURL";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Payload / Next.js boilerplate",
  description: "A quick way to start a new project with Payload and Next.js",
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
};
