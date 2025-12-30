"use client";

import { GradientButton, toast } from "@plaqode-platform/ui";
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MessageCircle, Loader2 } from "lucide-react";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { sendContactEmail, ContactState } from "@/actions/contact";

const initialState: ContactState = {
    success: false,
    message: "",
};

function SubmitButton() {
    // We can use useFormStatus here if we want button loading state, 
    // but since we are in the same component we can also check pending if we extract this or use a pending state from action?
    // Actually simpler to use useFormStatus hooks if available, but for now let's just use the button style.
    // Wait, useFormState doesn't give pending. useFormStatus does.
    // To use useFormStatus, the button must be inside the form.
    // Let's create a separate component or just rely on the action being fast/optimistic? 
    // Ideally use useFormStatus.
    // Let's keep it simple for now, prompt implies toast usage.
    // I'll add useFormStatus support for better UX.

    const { pending } = useFormStatus();

    return (
        <div className="pt-4">
            <GradientButton
                type="submit"
                text={pending ? "Sending..." : "Send Message"}
                size="lg"
                bold
                disabled={pending}
                icon={pending ? <Loader2 className="animate-spin" size={20} /> : undefined}
                className="w-full md:w-auto"
            />
        </div>
    );
}

// Helper for useFormStatus since it must be imported
import { useFormStatus } from "react-dom";

export default function ContactContent() {
    const [state, formAction] = useFormState(sendContactEmail, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                formRef.current?.reset();
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <section className="relative bg-dark text-light pt-0 pb-36 px-4 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-[1000px] mx-auto flex flex-col gap-24">

                {/* 1. Intro & Contact Details */}
                <div className="text-center space-y-12">
                    <p className="text-lg md:text-xl font-sans text-light/90 leading-relaxed max-w-4xl mx-auto">
                        Ready to Simplify Your Business? Contact us today to learn how PlaQode's QR code solutions can streamline your data, processes, and tasks.
                    </p>

                    {/* Social Icons Row */}
                    <div className="flex justify-center gap-8">
                        <a href="https://www.facebook.com/PlaQode" target="_blank" className="text-light hover:text-secondary hover:scale-110 transition-all"><Facebook size={28} /></a>
                        <a href="https://twitter.com/PlaQode" target="_blank" className="text-light hover:text-secondary hover:scale-110 transition-all"><Twitter size={28} /></a>
                        <a href="https://www.linkedin.com/company/PlaQode" target="_blank" className="text-light hover:text-secondary hover:scale-110 transition-all"><Linkedin size={28} /></a>
                        <a href="https://www.instagram.com/PlaQode" target="_blank" className="text-light hover:text-secondary hover:scale-110 transition-all"><Instagram size={28} /></a>
                    </div>

                    {/* Contact Details Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 justify-items-center">
                        <div className="flex flex-col items-center gap-3">
                            <Phone className="w-8 h-8 text-light mb-1" />
                            <div className="text-center">
                                <p className="font-bold text-lg mb-1">Call Us</p>
                                <a href="tel:+255676372864" className="text-light/80 hover:text-secondary transition-colors">+255 676 372 864</a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <Mail className="w-8 h-8 text-light mb-1" />
                            <div className="text-center">
                                <p className="font-bold text-lg mb-1">Email Us</p>
                                <a href="mailto:plaqode@gmail.com" className="text-light/80 hover:text-secondary transition-colors">plaqode@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <MessageCircle className="w-8 h-8 text-light mb-1" />
                            <div className="text-center">
                                <p className="font-bold text-lg mb-1">Whatsapp</p>
                                <a href="https://wa.me/255676372864" target="_blank" className="text-light/80 hover:text-secondary transition-colors">+255 676 372 864</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Contact Form */}
                <div className="w-full max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-[3.5rem] font-merriweather font-bold mb-12 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent leading-tight">
                        Send Us A Message
                    </h2>

                    <form action={formAction} ref={formRef} className="space-y-10">
                        <div className="relative z-0 w-full group">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block py-2.5 px-0 w-full text-lg text-light bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer transition-colors"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="name"
                                className="peer-focus:font-medium absolute text-lg text-light duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Name
                            </label>
                            {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
                        </div>

                        <div className="relative z-0 w-full group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block py-2.5 px-0 w-full text-lg text-light bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer transition-colors"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-lg text-light duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email
                            </label>
                            {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>}
                        </div>

                        <div className="relative z-0 w-full group">
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                className="block py-2.5 px-0 w-full text-lg text-light bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer transition-colors resize-none"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="message"
                                className="peer-focus:font-medium absolute text-lg text-light duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                How Can We Help?
                            </label>
                            {state.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>}
                        </div>

                        <SubmitButton />
                    </form>
                </div>

            </div>
        </section>
    );
}
