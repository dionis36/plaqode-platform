"use client";

import GradientButton from "@/components/ui/GradientButton";
import { Link, IdCard, Calendar, Share2, Printer, Code, ShieldCheck, Settings, LineChart, Lock, Smartphone, Headphones } from "lucide-react";

// Section 1 Data: Business Solutions
const solutions = [
    {
        icon: Link,
        title: "Education & Information",
        desc: "Provide instant access to educational resources, template files, and important documents. Our QR codes simplify information sharing for students and professionals alike.",
    },
    {
        icon: IdCard,
        title: "Business Cards & Communication",
        desc: "Elevate your networking with dynamic QR business cards. Instantly share your contact information, portfolio, and social media links with a simple scan.",
    },
    {
        icon: Calendar,
        title: "Event Management",
        desc: "Streamline your events from start to finish with QR codes for tickets, attendee check-ins, event schedules, and digital menus. Enhance the guest experience with seamless access.",
    },
    {
        icon: Share2,
        title: "Social & Digital Footprint",
        desc: "Boost your online presence by connecting physical spaces to your digital world. Our QR codes link directly to your website and social media platforms.",
    },
    {
        icon: Printer,
        title: "Printing & Marketing",
        desc: "Transform traditional marketing materials like banners and posters into interactive tools. Engage your audience with QR codes that lead to promotions and valuable information.",
    },
    {
        icon: Code,
        title: "Custom API Solutions",
        desc: "Integrate powerful QR code generation capabilities directly into your own applications with our robust and scalable API.",
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
                                    <GradientButton href="/contact" text="Order Now" size="sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
