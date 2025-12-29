"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GradientButton } from "@plaqode-platform/ui";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-dark flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[128px]" />
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 404 Text */}
                    <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary select-none">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Page Not Found
                    </h2>

                    <p className="text-lg text-slate-400 max-w-lg mx-auto">
                        Oops! We can't seem to find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <GradientButton
                            href="/"
                            text="Return Home"
                            size="lg"
                            bold
                        />
                        <Link
                            href="/contact"
                            className="text-slate-400 hover:text-white transition-colors duration-200 font-medium px-6 py-3"
                        >
                            Report Issue
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
