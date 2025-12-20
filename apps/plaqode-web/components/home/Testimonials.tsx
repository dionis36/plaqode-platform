"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
    {
        text: "Plaqode changed the way we handle our marketing materials. The dynamic codes are a game changer.",
        author: "Sarah J.",
        role: "Marketing Director",
        initials: "SJ"
    },
    {
        text: "Incredible analytics. We can finally see exactly where our traffic is coming from.",
        author: "Michael T.",
        role: "Tech Lead",
        initials: "MT"
    },
    {
        text: "The security features give us peace of mind when sharing sensitive documents.",
        author: "David R.",
        role: "CEO, TechFlow",
        initials: "DR"
    }
];

export default function Testimonials() {
    return (
        <section className="bg-dark text-light py-24 px-4">
            <div className="max-w-[1200px] mx-auto text-center">
                <h2 className="text-3xl md:text-[3rem] font-serif font-bold mb-16 text-light">What Clients Say</h2>

                <div className="bg-light text-dark max-w-3xl mx-auto p-8 md:p-12 rounded-lg shadow-light-shadow">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                        className="pb-12"
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i}>
                                <div className="flex flex-col items-center">
                                    <p className="text-lg md:text-xl text-text leading-relaxed mb-8 italic">
                                        "{t.text}"
                                    </p>
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full bg-text text-light flex items-center justify-center text-xl font-bold mb-4">
                                            {t.initials}
                                        </div>
                                        <p className="text-lg font-bold text-dark">{t.author}</p>
                                        <p className="text-sm text-text">{t.role}</p>
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
