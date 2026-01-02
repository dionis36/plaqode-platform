"use client";

import { ReactNode } from "react";

export interface ErrorPageProps {
    code: string;
    title: string;
    description: string;
    children?: ReactNode;
}

export function ErrorPage({ code, title, description, children }: ErrorPageProps) {
    return (
        <div className="h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden font-sans text-white p-6">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
                <div>
                    <h1 className="text-[8rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none font-merriweather">
                        {code}
                    </h1>
                </div>

                <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-medium tracking-tight">
                            {title}
                        </h2>
                        <p className="text-gray-400 text-base">
                            {description}
                        </p>
                    </div>

                    {children && (
                        <div className="flex items-center justify-center gap-4 pt-4">
                            {children}
                        </div>
                    )}
                </div>
            </div>

            {/* Minimal Footer */}
            <div className="absolute bottom-8 text-xs text-gray-700 font-mono">
                {code}_ERROR
            </div>
        </div>
    );
}
