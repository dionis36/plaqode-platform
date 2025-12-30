"use client";

import { motion } from "framer-motion";
import { GradientButton } from "@plaqode-platform/ui";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
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
                        404
                    </h1>
                </div>

                <div
                    className="mt-6 space-y-6"
                >
                    <div className="space-y-2">
                        <h2 className="text-2xl font-medium tracking-tight">
                            Page not found
                        </h2>
                        <p className="text-gray-400 text-base">
                            The page you are looking for doesn't exist or has been moved.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 pt-4">
                        <a
                            href="/"
                            className="bg-white text-black px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-white/90 transition-colors"
                        >
                            <Home size={16} />
                            Go Home
                        </a>

                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <ArrowLeft size={16} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Minimal Footer */}
            <div className="absolute bottom-8 text-xs text-gray-700 font-mono">
                404_ERROR
            </div>
        </div>
    );
}
