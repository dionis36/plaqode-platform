"use client";

import { Link, AlignLeft, AtSign, Phone, Mail, MapPin, Wifi, Calendar, Share2, Smartphone, FileText, Image } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";

// Comprehensive list of tools
const QR_STUDIO_URL = process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3001';

// Comprehensive list of tools
const tools = [
    { icon: Link, name: "URL", desc: "Link to any website or page", href: `${QR_STUDIO_URL}/create/url` },
    { icon: AlignLeft, name: "Text", desc: "Display plain text messages", href: `${QR_STUDIO_URL}/create/text` },
    { icon: AtSign, name: "VCard", desc: "Share contact details instantly", href: `${QR_STUDIO_URL}/create/vcard` },
    { icon: Mail, name: "Email", desc: "Send pre-filled emails", href: `${QR_STUDIO_URL}/create/email` },
    { icon: Phone, name: "Phone", desc: "Make a call with one scan", href: `${QR_STUDIO_URL}/create/phone` },
    { icon: MapPin, name: "Location", desc: "Share Google Maps location", href: `${QR_STUDIO_URL}/create/location` },
    { icon: Wifi, name: "WiFi", desc: "Connect to WiFi automatically", href: `${QR_STUDIO_URL}/create/wifi` },
    { icon: Calendar, name: "Event", desc: "Save events to calendar", href: `${QR_STUDIO_URL}/create/event` },
    { icon: Smartphone, name: "App Store", desc: "Download apps directly", href: `${QR_STUDIO_URL}/create/app` },
    { icon: FileText, name: "PDF", desc: "Share PDF documents", href: `${QR_STUDIO_URL}/create/file` },
    { icon: Image, name: "Image Gallery", desc: "Showcase photos", href: `${QR_STUDIO_URL}/create/images` },
    { icon: Share2, name: "Social Media", desc: "Link to all your profiles", href: `${QR_STUDIO_URL}/create/social` },
];

export default function ToolsCatalog() {
    return (
        <section className="relative bg-dark text-light py-24 px-4 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] opacity-40" />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto">
                {/* Intro */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-merriweather font-bold mb-6">
                        Explore All <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">QR Tools</span>
                    </h2>
                    <p className="text-lg md:text-xl text-light/70 leading-relaxed font-sans">
                        From simple links to complex business solutions, we have a specialized tool for every need. Browse our full catalog below.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                    {tools.map((tool, idx) => (
                        <a
                            key={idx}
                            href={tool.href}
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-purple-500/30 block"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-4 text-purple-300 group-hover:text-white group-hover:bg-purple-600 transition-colors">
                                <tool.icon size={24} />
                            </div>
                            <h3 className="font-semibold text-white text-sm sm:text-base mb-1">{tool.name}</h3>
                            <p className="text-xs text-light/50 hidden sm:block group-hover:text-light/80 transition-colors">
                                {tool.desc}
                            </p>
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-light/60 mb-6">Ready to start creating?</p>
                    <GradientButton
                        href={`${process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3001'}/create`}
                        text="Open QR Studio"
                        size="lg"
                    />
                </div>
            </div>
        </section>
    );
}
