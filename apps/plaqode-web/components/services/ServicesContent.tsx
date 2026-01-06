"use client";

import { GradientButton, toast } from "@plaqode-platform/ui";
import { IdCard, QrCode, Calendar } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

import { config } from "../../lib/config";

// Environment URLs
const CARDIFY_URL = config.app.cardifyUrl;
const QRSTUDIO_URL = config.app.qrstudioUrl;

const services = [
    {
        icon: IdCard,
        title: "Business Cards",
        desc: "Design premium physical business cards in Cardify. Customize your layout, add QR codes, and export print-ready files instantly.",
        cta: "Start Designing",
        href: `${CARDIFY_URL}/templates` // Deep link to Cardify
    },
    {
        icon: QrCode,
        title: "QR Marketing Suite",
        desc: "A complete toolkit for your business. Manage digital menus, WiFi access, app store links, and more from one dashboard.",
        cta: "Explore Tools",
        action: "scroll",
        href: "#qr-tools-catalog"
    },
    {
        icon: Calendar,
        title: "Event Management",
        desc: "Coming Soon. A powerful system to create, manage, and track events with integrated ticketing and guest management.",
        cta: "Join Waitlist",
        action: "toast"
        // No href, effectively a button
    },
];

export default function ServicesContent() {
    const handleServiceClick = (e: React.MouseEvent, service: typeof services[0]) => {
        if (service.action === 'toast') {
            e.preventDefault();
            toast.info("Event Management System is coming soon!");
        } else if (service.action === 'scroll') {
            e.preventDefault();
            const element = document.getElementById('qr-tools-catalog');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

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
                    <ScrollReveal variant="fade-up" className="text-center mb-16 max-w-4xl mx-auto">
                        <p className="text-lg md:text-xl text-light/80 leading-relaxed font-sans">
                            Discover innovative digital solutions that simplify connections, marketing, and management across your business.
                        </p>
                    </ScrollReveal>

                    {/* Solutions Grid */}
                    {/* Desktop: 3 cols. Tablet: 2 cols, 3rd centered below. Mobile: 1 col. */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((item, idx) => (
                            <ScrollReveal
                                key={idx}
                                variant="fade-up"
                                delay={idx * 0.1}
                                className={`h-full ${idx === 2 ? 'md:col-span-2 lg:col-span-1 border-none' : ''}`}
                            >
                                <div className={`bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group h-full flex flex-col ${idx === 2 ? 'md:w-1/2 md:mx-auto lg:w-full lg:mx-0' : ''}`}>
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon className="text-white w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold font-merriweather mb-4 text-white">{item.title}</h3>
                                    <p className="text-light/70 mb-8 leading-relaxed flex-1">
                                        {item.desc}
                                    </p>
                                    <div className="mt-auto" onClick={(e) => handleServiceClick(e, item)}>
                                        <GradientButton
                                            href={item.href}
                                            text={item.cta}
                                            size="md"
                                        />
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
