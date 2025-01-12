import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootProvider from "./root-provider";
import Head from "next/head";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["greek"], display: "swap" });

export const metadata: Metadata = {
  title: "Keypilot",
  description: "Kepilot: Dubai real estate insights under one roof!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ff0000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link
          rel="icon"
          type="image/png"
          href="/assets/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content=" Keypilot" />
        <link rel="manifest" href="/manifest.ts" />
      </Head>

      <body className={cn(inter.className, "select-none")}>
        <RootProvider>{children}</RootProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID ?? ""} />
    </html>
  );
}
