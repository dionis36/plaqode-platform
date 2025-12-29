"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GradientButton } from "@plaqode-platform/ui";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="z-10 text-center px-4"
            >
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: "backOut", delay: 0.2 }}
                    className="text-display-xl font-bold mb-4"
                >
                    <span className="text-gradient">404</span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-3xl font-bold text-dark mb-6"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-text text-lg max-w-md mx-auto mb-10 leading-relaxed"
                >
                    Oops! It seems you've ventured into uncharted digital territory.
                    The page you are looking for doesn't exist or has been moved.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <GradientButton
                        href="/"
                        text="Return Home"
                        size="lg"
                        bold
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
