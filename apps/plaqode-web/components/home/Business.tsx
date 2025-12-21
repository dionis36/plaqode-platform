"use client";
import { Share2, Shield, TrendingUp, Zap } from "lucide-react";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function BusinessSection() {
    return (
        <section className="bg-bg pt-8 pb-24 px-4 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-[3rem] font-merriweather font-bold mb-6 text-dark max-w-4xl mx-auto leading-tight">
                        Everything you need to manage your QR Codes
                    </h2>
                    <p className="text-text/80 text-md max-w-2xl mx-auto font-sans">
                        Streamline your workflow with tools designed for performance, security, and scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
                    {/* Card 1: Dynamic QR Codes - Spans 2 columns */}
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 min-h-[300px] bg-pink-800 relative overflow-hidden"
                        className=""
                    >
                        <div className="max-w-xs relative z-20">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Dynamic QR Codes
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Edit content anytime without reprinting. Perfect for marketing campaigns that evolve with your business.
                            </p>
                        </div>
                        {/* Large Decorative Icon */}
                        <Zap className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 z-10 rotate-12" />
                    </WobbleCard>

                    {/* Card 2: Secure Data - Spans 1 column */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[300px] bg-indigo-800 relative overflow-hidden"
                        className=""
                    >
                        <div className="max-w-xs relative z-20">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Enterprise Security
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Bank-grade encryption keeping your analytics and user data safe 24/7.
                            </p>
                        </div>
                        <Shield className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10 z-10 rotate-12" />
                    </WobbleCard>

                    {/* Card 3: Smart Analytics - Spans 1 column (Swapped order/span for visual variety if needed, but keeping logic: Analytics is big data, maybe keep it Span 2? Original was Span 2) */}
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 min-h-[300px] bg-blue-900 lg:order-last relative overflow-hidden"
                        className=""
                    >
                        <div className="max-w-md relative z-20">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Real-time Analytics
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Track scans, locations, devices, and user behavior in real-time. Make data-driven decisions that grow your reach.
                            </p>
                        </div>
                        <TrendingUp className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 z-10 rotate-12" />
                    </WobbleCard>

                    {/* Card 4: Sharing - Spans 1 column */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[300px] bg-slate-900 relative overflow-hidden"
                        className=""
                    >
                        <div className="max-w-xs relative z-20">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Instant Sharing
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Share wifi, contacts, and files instantly with a single scan.
                            </p>
                        </div>
                        <Share2 className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10 z-10 rotate-12" />
                    </WobbleCard>
                </div>
            </div>
        </section>
    );
}
