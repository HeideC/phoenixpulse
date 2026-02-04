import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhoenixPulse | Resilience, Healing & Inner Strength",
  description:
    "PhoenixPulse shares resilience quotes and reflections on healing, self-love, emotional strength, and rising after setbacks.",
  keywords: [
    "resilience",
    "healing",
    "self love",
    "motivation",
    "personal growth",
    "emotional strength",
    "inspirational quotes",
  ],
  metadataBase: new URL("https://phoenixpulse.vercel.app"),
  openGraph: {
    title: "PhoenixPulse | Rise. Rebuild. Repeat.",
    description:
      "A mindset-driven brand focused on healing, resilience, and inner power.",
    url: "https://phoenixpulse.vercel.app",
    siteName: "PhoenixPulse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhoenixPulse | Rise. Rebuild. Repeat.",
    description:
      "Healing, resilience, and inner power for those rebuilding after setbacks.",
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
        {children}
      </body>
    </html>
  );
}
