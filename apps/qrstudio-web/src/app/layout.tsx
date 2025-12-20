'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/lib/auth-context';
import { PlatformNavWrapper } from '@/components/layout/PlatformNavWrapper';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
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
