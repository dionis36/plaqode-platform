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

                    {/* 1. Secure & Authentic (Row 1, Span 2) - Pink Theme */}
                    <WobbleCard
                        containerClassName="col-span-1 md:col-span-2 min-h-[250px] bg-pink-800 relative overflow-hidden"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-xs relative z-20">
                            <h2 className="font-merriweather text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Secure & Authentic
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Each QR code is uniquely encrypted with advanced security protocols, preventing fraud and ensuring complete authenticity.
                            </p>
                        </div>
                        {/* Large Icon */}
                        <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 z-10 rotate-12" />
                    </WobbleCard>

                    {/* 2. Customizable (Row 1, Span 1) - Indigo Theme */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[250px] bg-indigo-800 relative overflow-hidden"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full relative z-20">
                            <h2 className="font-merriweather text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Customizable
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Tailor your QR codes to match your brand identity with custom colors and logos.
                            </p>
                        </div>
                        <Settings className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10 z-10 rotate-12" />
                    </WobbleCard>

                    {/* 3. Analytics (Row 1, Span 1) - Blue Theme */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[250px] bg-blue-900 relative overflow-hidden"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full relative z-20">
                            <h2 className="font-merriweather text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Analytics
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Gain valuable data on scan rates, demographics, and location analytics to optimize strategy.
                            </p>
                        </div>
                        <LineChart className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10 z-10 rotate-12" />
                    </WobbleCard>

                    {/* 4. Data Privacy (Row 2, Span 1) - Purple Theme - CHANGED TO SPAN 1 */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[250px] bg-purple-900 relative overflow-hidden"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full relative z-20">
                            <h2 className="font-merriweather text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Data Privacy
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                We prioritize security with enterprise-grade encryption and strict privacy standards.
                            </p>
                        </div>
                        <Lock className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10 z-10 rotate-12" />
                    </WobbleCard>

                    {/* 5. Mobile First (Row 2, Span 1) - Teal Theme */}
                    <WobbleCard
                        containerClassName="col-span-1 min-h-[250px] bg-teal-800 relative overflow-hidden"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-full relative z-20">
                            <h2 className="font-merriweather text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Mobile-First
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Optimized for seamless user experiences across all smartphones and tablets.
                            </p>
                        </div>
                        <Smartphone className="absolute -bottom-8 -right-8 w-48 h-48 text-white/10 z-10 rotate-12" />
                    </WobbleCard>

                    {/* 6. Local Support (Row 2, Span 2) - Zinc Theme - CHANGED TO SPAN 2 */}
                    <WobbleCard
                        containerClassName="col-span-1 md:col-span-2 min-h-[250px] bg-zinc-900 relative overflow-hidden"
                        className="p-8 sm:p-10"
                    >
                        <div className="max-w-xs relative z-20">
                            <h2 className="font-merriweather text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Local Support
                            </h2>
                            <p className="mt-4 text-left text-base/6 text-neutral-200">
                                Dedicated Tanzanian support team providing assistance in both English and Swahili, ensuring you get help when you need it most.
                            </p>
                        </div>
                        {/* Large Icon for Span 2 */}
                        <Headphones className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 z-10 rotate-12" />
                    </WobbleCard>

                </div>
            </div>
        </section>
    );
}
