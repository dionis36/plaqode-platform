"use client";

import { useSplitText } from "@/lib/animations/useSplitText";
import Link from "next/link";
import GradientButton from "@/components/ui/GradientButton";
import Logo from "@/components/ui/Logo";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    const elementRef = useSplitText<HTMLHeadingElement>({ type: "chars", delay: 0.2 });

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark text-light">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-30 z-[1] pointer-events-none" />

            {/* Hero Header (Static) */}
            <div className="absolute top-0 left-0 w-full z-20 px-8 py-4 flex justify-between items-center max-w-[1400px] mx-auto">
                <Logo />
                <nav className="hidden md:flex gap-8">
                    <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-secondary transition-colors">About</Link>
                    <Link href="/services" className="hover:text-secondary transition-colors">Services</Link>
                    <Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link>
                    <Link href="/auth/login" className="hover:text-secondary transition-colors">Login</Link>
                </nav>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col justify-center h-full pt-20">

                {/* Title */}
                <h1 ref={elementRef} className="font-merriweather font-bold leading-[1.25] tracking-tight mb-6 text-5xl md:text-[4.5rem]">
                    <span className="font-merriweather text-secondary bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary block w-fit">
                        Scan Smart,
                    </span>
                    <span className="font-merriweather block">Stay Safe</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl font-sans max-w-[42rem] mb-12 tracking-wide text-light/90">
                    Next-generation QR code solutions making connections secure, fast, and reliable.
                </p>

                {/* Button */}
                <div className="relative z-10 w-fit">
                    <GradientButton href="/contact" text="Get Started" />
                </div>
            </div>

        </section>
    );
}
