import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@plaqode-platform/ui";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Suspense } from "react";

import FontLoader from "@/components/FontLoader";
import { env } from '@/lib/env';

// Global Body Font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // CSS variable bridge
});

// Manual Heading Font
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-merriweather', // CSS variable bridge
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plaqode.com"),
  title: {
    default: "Plaqode - The All-in-One QR & Design Platform",
    template: "%s | Plaqode Platform",
  },
  description: "Create, manage, and track dynamic QR codes for your business. Plaqode offers professional QR solutions with analytics, custom designs, and more.",
  keywords: ["QR Code", "QR Generator", "Business Cards", "Dynamic QR", "Marketing Tools", "Plaqode"],
  authors: [{ name: "Plaqode Team" }],
  creator: "Plaqode",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://plaqode.com",
    title: "Plaqode - Next Gen QR Code Solutions",
    description: "Create, manage, and track dynamic QR codes for your business.",
    siteName: "Plaqode",
    images: [
      {
        url: "/og-image.jpg", // Ensure this image exists in public folder or update path
        width: 1200,
        height: 630,
        alt: "Plaqode Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plaqode - Next Gen QR Code Solutions",
    description: "Create, manage, and track dynamic QR codes for your business.",
    images: ["/og-image.jpg"],
    creator: "@plaqode",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body
        className="antialiased font-sans"
      >
        <Suspense fallback={null}>
          <AuthProvider>
            <FontLoader />
            {children}
            <Toaster richColors theme="light" />
          </AuthProvider>
        </Suspense>
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
