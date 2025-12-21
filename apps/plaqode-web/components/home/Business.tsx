"use client";
import { Share2, Shield, TrendingUp, Zap } from "lucide-react";
import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";

export default function BusinessSection() {
    return (
        <section className="bg-bg py-24 px-4 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-[3rem] font-merriweather font-bold mb-6 text-dark max-w-4xl mx-auto leading-tight">
                        Everything you need to manage your QR codes in one <span className="text-secondary">powerful dashboard</span>.
                    </h2>
                    <p className="text-text/80 text-md max-w-2xl mx-auto font-sans">
                        Streamline your workflow with tools designed for performance, security, and scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
                    {/* Card 1: Dynamic QR Codes - Spans 2 columns */}
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[300px]"
                        className=""
                    >
                        <div className="max-w-xs">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="text-white w-6 h-6" />
                                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                    Dynamic QR Codes
                                </h2>
                            </div>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Edit content anytime without reprinting. Perfect for marketing campaigns that evolve with your business.
                            </p>
                        </div>
                        <div className="absolute -right-4 lg:-right-[40%] -bottom-10 object-contain rounded-2xl">
                            {/* Placeholder visual - we can put an image here later */}
                            <div className="w-[600px] h-[300px] bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl skew-y-6 transform translate-x-10 translate-y-10" />
                        </div>
                    </WobbleCard>

                    {/* Card 2: Secure Data - Spans 1 column */}
                    <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-indigo-800">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="text-white w-6 h-6" />
                            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Enterprise Security
                            </h2>
                        </div>
                        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                            Bank-grade encryption keeping your analytics and user data safe 24/7.
                        </p>
                    </WobbleCard>

                    {/* Card 3: Smart Analytics - Spans 1 column */}
                    <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[300px] bg-blue-900 lg:order-last">
                        <div className="max-w-md">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="text-white w-6 h-6" />
                                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                    Real-time Analytics
                                </h2>
                            </div>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Track scans, locations, devices, and user behavior in real-time. Make data-driven decisions that grow your reach.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* Card 4: Sharing - Spans 2 columns on mobile, 1 on LG (Wait, let's swap for Bento effect) */}
                    <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-slate-900">
                        <div className="flex items-center gap-2 mb-2">
                            <Share2 className="text-white w-6 h-6" />
                            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Instant Sharing
                            </h2>
                        </div>
                        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                            Share wifi, contacts, and files instantly with a single scan.
                        </p>
                    </WobbleCard>
                </div>
            </div>
        </section>
    );
}
