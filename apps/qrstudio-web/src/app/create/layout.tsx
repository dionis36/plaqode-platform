"use client";

import { ScrollToTop } from '@/components/ScrollToTop';

export default function CreateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-[#efefef] selection:bg-blue-100">
            <ScrollToTop />
            {/* Navbar is in root layout */}
            <main className="flex-1 flex flex-col pt-20">
                {children}
            </main>
        </div>
    );
}
