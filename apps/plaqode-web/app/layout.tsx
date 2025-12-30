import type { Metadata } from "next";
import { Open_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@plaqode-platform/ui";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

import FontLoader from "@/components/FontLoader";

// Global Body Font
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans', // CSS variable bridge
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${merriweather.variable}`}>
      <body
        className="antialiased font-sans"
      >
        <AuthProvider>
          <FontLoader />
          {children}
          <Toaster />
        </AuthProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
