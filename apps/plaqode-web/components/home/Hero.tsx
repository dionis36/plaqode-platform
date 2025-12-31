"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GradientButton } from "@plaqode-platform/ui";
import { GradientAvatar } from "@plaqode-platform/ui";
import { Logo } from "@plaqode-platform/ui";
import { ArrowRight } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

import { useAuth } from "@/lib/auth-context";

export default function Hero() {
    const { user, logout } = useAuth();

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark text-light">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-30 z-[1] pointer-events-none" />

            {/* Hero Header (Static) */}
            <div className="absolute top-0 left-0 w-full z-20 px-4 md:px-8 py-4 flex justify-between items-center max-w-[1400px] mx-auto">
                <Logo />
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex gap-8">
                        <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-secondary transition-colors">About</Link>
                        <Link href="/services" className="hover:text-secondary transition-colors">Services</Link>
                        <Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link>
                    </nav>
                    {user ? (
                        <GradientAvatar user={user} logout={logout} />
                    ) : (
                        <GradientButton href="/auth/login" text="Login" size="sm" className="text-light" />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col justify-center h-full pt-20">

                {/* Title */}
                <h1 className="font-merriweather font-bold leading-[1.25] tracking-tight mb-6 text-5xl md:text-7xl">
                    <SplitText
                        text="Scan Smart,"
                        className="font-merriweather text-secondary bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary block w-fit"
                        delay={0.2}
                    />
                    <SplitText
                        text="Stay Safe"
                        className="font-merriweather block"
                        delay={0.8}
                    />
                </h1>

                {/* Subtitle */}
                <motion.p
                    className="text-lg md:text-xl font-sans max-w-[42rem] mb-12 tracking-wide text-light/90"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    We simplify and streamline data access with innovative QR code solutions for your business.
                </motion.p>

                {/* Button */}
                <motion.div
                    className="relative z-10 w-fit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <GradientButton href="/auth/login" text="Get Started" size="lg" />
                </motion.div>
            </div>

        </section>
    );
}
