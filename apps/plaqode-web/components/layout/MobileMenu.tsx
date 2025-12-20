"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import gsap from "gsap";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling
            document.body.style.overflow = "hidden";

            // Animate in
            gsap.to(overlayRef.current, {
                opacity: 1,
                visibility: "visible",
                duration: 0.4,
            });
            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.4,
                ease: "power2.out",
            });
        } else {
            // Restore scrolling
            document.body.style.overflow = "";

            // Animate out
            gsap.to(overlayRef.current, {
                opacity: 0,
                visibility: "hidden",
                duration: 0.4,
            });
            gsap.to(drawerRef.current, {
                x: "100%", // Move off-screen to the right
                duration: 0.4,
                ease: "power2.in",
            });
        }
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/50 z-[20] opacity-0 invisible"
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 h-full w-[80%] min-w-[300px] max-w-sm bg-dark/95 backdrop-blur-md z-[1000] p-6 translate-x-full text-light flex flex-col justify-between"
            >
                <div>
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            {/* Logo Placeholder - using img from public */}
                            <img src="/img/logo.png" alt="Plaqode" className="w-12 h-12" />
                            <p className="font-serif text-xl font-bold">Plaqode</p>
                        </div>
                        <button onClick={onClose} className="text-secondary hover:text-white transition-colors">
                            <X size={28} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4">
                        {["Home", "About", "Services", "Contact"].map((item) => (
                            <div key={item} className="border-b border-light/10 pb-4">
                                <Link
                                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    className="text-lg font-medium hover:text-secondary transition-colors block"
                                    onClick={onClose}
                                >
                                    {item}
                                </Link>
                            </div>
                        ))}
                        <div className="pt-4">
                            <Link
                                href="/auth/login"
                                className="block w-full py-3 text-center rounded-full bg-gradient-to-r from-secondary to-primary text-white font-bold text-lg"
                                onClick={onClose}
                            >
                                Login
                            </Link>
                        </div>
                    </nav>
                </div>

                <div>
                    <p className="text-sm text-white/70 mb-6">
                        Next Generation QR Code Solutions. Smart, Secure, Scalable.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-secondary hover:scale-110 transition-all"><Facebook /></a>
                        <a href="#" className="hover:text-secondary hover:scale-110 transition-all"><Twitter /></a>
                        <a href="#" className="hover:text-secondary hover:scale-110 transition-all"><Instagram /></a>
                        <a href="#" className="hover:text-secondary hover:scale-110 transition-all"><Linkedin /></a>
                    </div>
                </div>
            </div>
        </>
    );
}
