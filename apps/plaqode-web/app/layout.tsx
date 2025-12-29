import type { Metadata } from "next";
import { Open_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

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
  title: "Plaqode",
  description: "Next Gen QR Code Solutions",
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
