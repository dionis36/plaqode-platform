"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientDividerProps {
    className?: string;
}

export default function GradientDivider({ className }: GradientDividerProps) {
    return (
        <div className={cn("relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", className)}>
            <div className="relative flex justify-center items-center">
                {/* 1. Static base line (subtle) */}
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200/0" />
                </div>

                {/* 2. Animated Gradient Line */}
                <div className="relative h-[2px] w-2/3 overflow-hidden">
                    {/* 
                        Mask to ensure ends are transparent 
                        (preserve the "fading at the ends" effect)
                    */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-bg via-transparent to-bg" />

                    {/* Moving Gradient Layer */}
                    <motion.div
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-secondary via-primary to-secondary"
                        style={{ backgroundSize: "200% 100%" }}
                        animate={{
                            backgroundPosition: ["0% 50%", "200% 50%"],
                        }}
                        transition={{
                            duration: 3,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    />

                    {/* Add a blur for a 'glow' effect */}
                    <motion.div
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-secondary via-primary to-secondary opacity-50 blur-sm"
                        style={{ backgroundSize: "200% 100%" }}
                        animate={{
                            backgroundPosition: ["0% 50%", "200% 50%"],
                        }}
                        transition={{
                            duration: 3,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
