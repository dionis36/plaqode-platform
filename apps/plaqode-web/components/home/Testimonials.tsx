"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
    {
        text: "We generated over 5,000 unique entry badges for our tech conference. The scanning speed and reliability were flawless.",
        author: "Sarah Jenkins",
        role: "Event Director, NexusConf",
        initials: "SJ"
    },
    {
        text: "Updating menus across our 12 restaurant locations used to be a nightmare. Now with dynamic QR codes, it takes seconds.",
        author: "Michael Chen",
        role: "Operations Manager, Urban Bites",
        initials: "MC"
    },
    {
        text: "Secure data handling was non-negotiable for our law firm. Plaqode's enterprise-grade encryption gave us the confidence to switch.",
        author: "David Ross",
        role: "Partner, Ross & Associates",
        initials: "DR"
    },
    {
        text: "The analytics are game-changing. Knowing exactly when and where our product packaging is scanned helps us optimize distribution.",
        author: "Elena Rodriguez",
        role: "Supply Chain Lead, FreshFoods",
        initials: "ER"
    },
    {
        text: "As a real estate agency, we use Plaqode to link virtual tours on 'For Sale' signs. The lead conversion rate has doubled.",
        author: "James Wilson",
        role: "Senior Agent, Prime Realty",
        initials: "JW"
    }
];

export default function Testimonials() {
    return (
        <section className="bg-dark text-light py-24 px-4 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
            </div>

            <div className="max-w-[1400px] mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-[3rem] font-merriweather font-bold mb-6 text-light">What Clients Say</h2>
                <p className="text-light/80 text-md max-w-2xl mx-auto mb-16 font-sans">
                    Join thousands of businesses scaling their reach with Plaqode.
                </p>

                <div className="w-full relative">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        centeredSlides={true}
                        loop={true}
                        speed={1000}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 30 },
                            1024: { slidesPerView: 3, spaceBetween: 40 },
                        }}
                        className="!pb-20 !overflow-visible"
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i} className="h-auto">
                                <div className="h-[380px] bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col items-start text-left hover:bg-white/10 transition-colors duration-300 overflow-hidden">
                                    <div className="mb-8 flex items-center justify-between w-full">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white text-md font-bold shadow-lg flex-shrink-0">
                                            {t.initials}
                                        </div>
                                    </div>

                                    <p className="text-base text-neutral-200 leading-relaxed mb-6 flex-grow font-sans relative">
                                        <span className="text-4xl absolute -top-3 -left-2 text-white/10 font-serif leading-none">"</span>
                                        <span className="relative z-10">{t.text}</span>
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/10 w-full">
                                        <p className="text-2xl font-bold text-white truncate">{t.author}</p>
                                        <p className="text-sm text-secondary/80 font-medium truncate">{t.role}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
