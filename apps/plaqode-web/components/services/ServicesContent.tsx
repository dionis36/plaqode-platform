"use client";

import GradientButton from "@/components/ui/GradientButton";
import { Link, IdCard, Share2, Smartphone, Utensils, Wifi, FileText, ArrowRight } from "lucide-react";

// Environment URLs
const CARDIFY_URL = process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002';
const QRSTUDIO_URL = process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3001';

// Section 1 Data: The "Power 6" High-Value Verticals
const solutions = [
    {
        icon: IdCard,
        title: "Digital Business Cards",
        desc: "Replace paper cards with dynamic identities. Share contact info, portfolios, and social links instantly with a single scan.",
        cta: "Create Identity",
        href: `${CARDIFY_URL}/templates` // Deep link to Cardify
    },
    {
        icon: Utensils,
        title: "Smart Digital Menus",
        desc: "Perfect for restaurants & cafes. Update items and prices instantly without re-printing QR codes. Contactless and efficient.",
        cta: "Digitize Menu",
        href: `${QRSTUDIO_URL}/create/menu`
    },
    {
        icon: Share2,
        title: "Social Media Hub",
        desc: "Consolidate your digital presence. Instagram, TikTok, LinkedIn, and more — accessible from one unified 'Link in Bio' page.",
        cta: "Build Bio Page",
        href: `${QRSTUDIO_URL}/create/socialmedia`
    },
    {
        icon: Wifi,
        title: "Instant WiFi Access",
        desc: "Improve guest experience by eliminating complex passwords. One scan connects guests directly to your secure network.",
        cta: "Create WiFi QR",
        href: `${QRSTUDIO_URL}/create/wifi`
    },
    {
        icon: Smartphone,
        title: "App Store Growth",
        desc: "Smart routing for your app. One QR code detects the user's device (iOS/Android) and directs them to the correct store.",
        cta: "Boost Downloads",
        href: `${QRSTUDIO_URL}/create/appstore`
    },
    {
        icon: FileText,
        title: "Document Distribution",
        desc: "Securely share menus, whitepapers, and guides. Support for PDF, Docx, and Images with trackable scan analytics.",
        cta: "Share Files",
        href: `${QRSTUDIO_URL}/create/file`
    },
];

export default function ServicesContent() {
    return (
        <div className="w-full">
            {/* 1. Services Section (Dark Mode with Decor) */}
            <section className="relative bg-dark text-light pt-0 pb-24 px-4">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
                </div>

                <div className="relative z-10 max-w-[1200px] mx-auto">
                    {/* Intro */}
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <p className="text-lg md:text-xl text-light/80 leading-relaxed">
                            Discover innovative QR code solutions that simplify data, processes, and tasks across various industries and applications. We help you create customized digital experiences that drive growth and efficiency.
                        </p>
                    </div>

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {solutions.map((item, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold font-merriweather mb-4 text-white">{item.title}</h3>
                                <p className="text-light/70 mb-8 leading-relaxed">
                                    {item.desc}
                                </p>
                                <div className="mt-auto">
                                    <GradientButton href={item.href} text={item.cta} size="md" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
