"use client";

import { Link, AlignLeft, AtSign, Mail, MapPin, Wifi, Calendar, Share2, Smartphone, FileText, Image, MessageSquare, Utensils, Star, MessageCircleHeart, Ticket, Store, Music, Video } from "lucide-react";
import { GradientButton } from "@plaqode-platform/ui";

// Comprehensive list of tools
import { env } from '@/lib/env';

const QR_STUDIO_URL = env.NEXT_PUBLIC_QRSTUDIO_URL;

// Comprehensive list of tools
const tools = [
    { icon: Link, name: "URL", desc: "Link to any website or page", href: `${QR_STUDIO_URL}/create/url` },
    { icon: Store, name: "Business Page", desc: "Mini-website for local businesses", href: `${QR_STUDIO_URL}/create/business` },
    { icon: Star, name: "Reviews Collector", desc: "Get more 5-star Google reviews", href: `${QR_STUDIO_URL}/create/review` },
    { icon: AtSign, name: "VCard", desc: "Share contact details instantly", href: `${QR_STUDIO_URL}/create/vcard` },
    { icon: Share2, name: "Social Media", desc: "Link to all your social profiles", href: `${QR_STUDIO_URL}/create/socialmedia` },
    { icon: Video, name: "Video", desc: "Share YouTube, Vimeo & videos", href: `${QR_STUDIO_URL}/create/video` },
    { icon: Ticket, name: "Coupon / Offer", desc: "Share discounts & special deals", href: `${QR_STUDIO_URL}/create/coupon` },
    { icon: Utensils, name: "Menu", desc: "Digital restaurant menu", href: `${QR_STUDIO_URL}/create/menu` },
    { icon: Wifi, name: "WiFi", desc: "Connect to WiFi automatically", href: `${QR_STUDIO_URL}/create/wifi` },
    { icon: MessageCircleHeart, name: "Feedback", desc: "Collect private customer feedback", href: `${QR_STUDIO_URL}/create/feedback` },
    { icon: Music, name: "Audio", desc: "Share music, audio & podcasts", href: `${QR_STUDIO_URL}/create/audio` },
    { icon: FileText, name: "PDF / File", desc: "Share PDFs & documents", href: `${QR_STUDIO_URL}/create/file` },
    { icon: Smartphone, name: "App Store", desc: "Download apps directly", href: `${QR_STUDIO_URL}/create/appstore` },
    { icon: MessageSquare, name: "Message", desc: "SMS, WhatsApp & Telegram", href: `${QR_STUDIO_URL}/create/message` },
    { icon: Image, name: "Image Gallery", desc: "Showcase photo collections", href: `${QR_STUDIO_URL}/create/file` },
    { icon: Calendar, name: "Event", desc: "Save events to calendar", href: `${QR_STUDIO_URL}/create/event` },
    { icon: Mail, name: "Email", desc: "Send pre-filled emails", href: `${QR_STUDIO_URL}/create/email` },
    { icon: AlignLeft, name: "Text", desc: "Display plain text messages", href: `${QR_STUDIO_URL}/create/text` },
];

export default function ToolsCatalog() {
    return (
        <section id="qr-tools-catalog" className="relative bg-dark text-light pt-24 pb-36 px-4 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] opacity-40" />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto">
                {/* Intro */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-merriweather font-bold mb-6">
                        Explore All <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">QR Tools</span>
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
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center mb-4 text-light group-hover:from-secondary group-hover:to-primary group-hover:text-white transition-all duration-300">
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
                {/* <div className="mt-16 text-center">
                    <p className="text-light/60 mb-6">Ready to start creating?</p>
                    <GradientButton
                        href={`${env.NEXT_PUBLIC_QRSTUDIO_URL}/create`}
                        text="Open QR Studio"
                        size="lg"
                    />
                </div> */}
            </div>
        </section>
    );
}
