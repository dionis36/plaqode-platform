'use client';

// Force Deploy: Fix 500 error on dynamic routes

import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/lib/auth-context';
import { PlatformNavWrapper } from '@/components/layout/PlatformNavWrapper';
import { NavVisibilityProvider } from '@/components/layout/NavVisibilityContext';
import { Toaster } from "@plaqode-platform/ui";
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
            <head>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
            </head>
            <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
                <AuthProvider>
                    <NavVisibilityProvider>
                        <PlatformNavWrapper />
                        <HelmetProvider>
                            {children}
                            <Toaster />
                        </HelmetProvider>
                    </NavVisibilityProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
