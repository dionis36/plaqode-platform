"use client";
import { ShieldCheck, Settings, LineChart, Lock, Smartphone, Headphones } from "lucide-react";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function WhyChooseSection() {
    return (
        <section className="bg-[#efefef] py-24 px-4 overflow-visible">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-[3.5rem] font-merriweather font-bold mb-6 text-dark">
                        Why Choose <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">PlaQode</span>?
                    </h2>
                    <p className="text-lg md:text-xl text-text/70 max-w-3xl mx-auto">
                        Our platform combines cutting-edge technology with local expertise to deliver QR solutions that truly work for Tanzanian businesses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">

                    {/* 1. Secure & Authentic (Row 1, Span 2) */}
                    <WobbleCard
                        containerClassName="col-span-1 md:col-span-2 min-h-[250px] bg-pink-800"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                                <ShieldCheck className="text-white w-7 h-7" />
                            </div>
                            <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Secure & Authentic
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Each QR code is uniquely encrypted with advanced security protocols, preventing fraud and ensuring complete authenticity for your business operations.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* 2. Customizable (Row 1, Span 1) */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[250px] bg-indigo-800"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                                <Settings className="text-white w-7 h-7" />
                            </div>
                            <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Customizable
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Tailor your QR codes to match your brand identity with custom colors, logos, and designs.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* 3. Analytics (Row 1, Span 1) */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[250px] bg-blue-900"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                                <LineChart className="text-white w-7 h-7" />
                            </div>
                            <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Analytics
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Gain valuable data on scan rates, demographics, and location analytics to optimize strategy.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* 4. Data Privacy (Row 2, Span 2) */}
                    <WobbleCard
                        containerClassName="col-span-1 md:col-span-2 min-h-[250px] bg-purple-900"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                                <Lock className="text-white w-7 h-7" />
                            </div>
                            <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Data Privacy First
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                We prioritize your data security with enterprise-grade encryption and strict adherence to international privacy standards and regulations.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* 5. Mobile First (Row 2, Span 1) */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[250px] bg-teal-800"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                                <Smartphone className="text-white w-7 h-7" />
                            </div>
                            <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Mobile-First
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Optimized for seamless user experiences across all smartphones and tablets in Tanzania.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* 6. Local Support (Row 2, Span 1) */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[250px] bg-zinc-900"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full">
                            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                                <Headphones className="text-white w-7 h-7" />
                            </div>
                            <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Local Support
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Dedicated Tanzanian support team providing assistance in both English and Swahili.
                            </p>
                        </div>
                    </WobbleCard>

                </div>
            </div>
        </section>
    );
}
