import "./globals.css";
import type { Metadata } from "next";
import FontLoader from "@/components/FontLoader";
import { Inter } from 'next/font/google';
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
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-secondary">
        <AuthProvider>
          <PlatformNavWrapper />
          <FontLoader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
