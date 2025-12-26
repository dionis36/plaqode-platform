'use client';

import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/lib/auth-context';
import { PlatformNavWrapper } from '@/components/layout/PlatformNavWrapper';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    variable: "--font-merriweather"
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
                <AuthProvider>
                    <PlatformNavWrapper />
                    <HelmetProvider>
                        {children}
                    </HelmetProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
