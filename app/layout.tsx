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
  title: {
    default: "Next.js + Notion Blog Template",
    template: "%s | Notion Blog",
  },
  description:
    "A modern, customizable Next.js boilerplate for creating a blog powered by Notion as a CMS. Perfect for developers who want to leverage Notion's powerful content management while maintaining full control over their blog's design and functionality.",
  keywords: [
    "Next.js",
    "Notion",
    "Blog",
    "CMS",
    "React",
    "TypeScript",
    "Template",
    "SEO",
    "Newsletter",
  ],
  authors: [{ name: "Notion Blog Template" }],
  creator: "Notion Blog Template",
  publisher: "Notion Blog Template",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://nextjs-notion-blog-template-eight.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Next.js + Notion Blog Template",
    description:
      "A modern, customizable Next.js boilerplate for creating a blog powered by Notion as a CMS. Perfect for developers who want to leverage Notion's powerful content management while maintaining full control over their blog's design and functionality.",
    siteName: "Notion Blog Template",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next.js + Notion Blog Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js + Notion Blog Template",
    description:
      "A modern, customizable Next.js boilerplate for creating a blog powered by Notion as a CMS.",
    images: ["/og-image.png"],
    creator: "@notionblogtemplate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Add your Google Search Console verification code
  },
  category: "technology",
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
