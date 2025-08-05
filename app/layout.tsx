import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const messapia = localFont({
  src: [
    {
      path: "./fonts/Messapia-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Messapia-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-messapia",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hearth | Coworking & Co-wellness Space in South Edmonton",
  description: "Hearth is a cozy coworking and co-wellness space in South Edmonton, designed for community, creativity, and care. We host pay-what-you-can events in wellness, education, and the arts—everything from guided meditation and sound baths to financial literacy and crypto workshops. Whether you're here to work, rest, or connect, Hearth is a soft place to land.",
  keywords: ["coworking", "wellness", "South Edmonton", "community space", "meditation", "workshops", "co-wellness", "creative space"],
  authors: [{ name: "Hearth" }],
  creator: "Hearth",
  publisher: "Hearth",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hearthcowork.com'), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hearth | Coworking & Co-wellness Space in South Edmonton",
    description: "Hearth is a cozy coworking and co-wellness space in South Edmonton, designed for community, creativity, and care. We host pay-what-you-can events in wellness, education, and the arts—everything from guided meditation and sound baths to financial literacy and crypto workshops. Whether you're here to work, rest, or connect, Hearth is a soft place to land.",
    url: "https://hearthcowork.com",
    siteName: "Hearth",
    images: [
      {
        url: "/thumbnail.png", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Hearth - Coworking & Co-wellness Space in South Edmonton",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hearth | Coworking & Co-wellness Space in South Edmonton",
    description: "Hearth is a cozy coworking and co-wellness space in South Edmonton, designed for community, creativity, and care. We host pay-what-you-can events in wellness, education, and the arts—everything from guided meditation and sound baths to financial literacy and crypto workshops. Whether you're here to work, rest, or connect, Hearth is a soft place to land.",
    images: ["/thumbnail.png"], // You'll need to add this image
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
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.png",
        color: "#E0E7CF", // Replace with your brand color
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${messapia.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
