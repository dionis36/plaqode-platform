import "./globals.css";
import type { Metadata } from "next";
import FontLoader from "@/components/FontLoader";
import { Inter, Merriweather } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import { PlatformNav } from '@/components/layout/PlatformNav';
import { PlatformNavWrapper } from '@/components/layout/PlatformNavWrapper';

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
  title: "Cardify – Business Card Designer",
  description: "Create stunning business cards effortlessly with Cardify.",
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
          <PlatformNavWrapper />
          <FontLoader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
