import "./globals.css";
import type { Metadata } from "next";
import FontLoader from "@/components/FontLoader";
import { Inter, Merriweather } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import { PlatformNav } from '@/components/layout/PlatformNav';
import { PlatformNavWrapper } from '@/components/layout/PlatformNavWrapper';
import { NavVisibilityProvider } from '@/components/layout/NavVisibilityContext';
import { Toaster } from "@plaqode-platform/ui";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

// Keep Inter for UI consistency
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'arial']
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cardify.plaqode.com"), // Assuming subdomain or use main domain/cardify
  title: {
    default: "Cardify by Plaqode - Professional Business Card Designer",
    template: "%s | Cardify by Plaqode",
  },
  description: "The professional business card designer powered by Plaqode. Create stunning cards effortlessly.",
  keywords: ["Business Cards", "Card Designer", "Print Ready", "Digital Business Card", "Design Templates"],
  authors: [{ name: "Plaqode Team" }],
  creator: "Plaqode",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cardify.plaqode.com",
    title: "Cardify - Professional Business Card Designer",
    description: "Create stunning, professional business cards effortlessly.",
    siteName: "Cardify by Plaqode",
    images: [
      {
        url: "/cardify-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cardify Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardify - Professional Business Card Designer",
    description: "Create stunning, professional business cards effortlessly.",
    images: ["/cardify-og.jpg"],
    creator: "@plaqode",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="bg-bg text-text font-sans">
        <AuthProvider>
          <NavVisibilityProvider>
            <PlatformNavWrapper />
            <FontLoader />
            {children}
            <Toaster richColors theme="light" />
          </NavVisibilityProvider>
        </AuthProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
