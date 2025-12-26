"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import Logo from "@/components/ui/Logo";
import GradientButton from "@/components/ui/GradientButton";
import GradientAvatar from "@/components/ui/GradientAvatar";

import { useAuth } from "@/lib/auth-context";

const HOME_URL = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || "http://localhost:3000";

export default function SmartNavbar() {
    const { user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = 100; // Show sooner for QR Studio pages as they might not have large heros

            if (currentScrollY > heroHeight) {
                if (currentScrollY > lastScrollY.current) {
                    // Scrolling DOWN - Hide
                    setIsVisible(false);
                } else {
                    // Scrolling UP - Show
                    setIsVisible(true);
                }
            } else {
                setIsVisible(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-[999] bg-slate-900/90 backdrop-blur-md shadow-md border-b border-white/5 rounded-b-lg transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Logo color="white" />

                    {/* Desktop Nav */}
                    <div className="flex items-center gap-8">
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex gap-8">
                            <Link href={HOME_URL} className="text-slate-200 hover:text-white transition-colors">Home</Link>
                            <Link href={`${HOME_URL}/about`} className="text-slate-200 hover:text-white transition-colors">About</Link>
                            <Link href={`${HOME_URL}/services`} className="text-slate-200 hover:text-white transition-colors">Services</Link>
                            <Link href={`${HOME_URL}/contact`} className="text-slate-200 hover:text-white transition-colors">Contact</Link>
                        </nav>

                        <div className="hidden md:block">
                            {user ? (
                                <GradientAvatar user={user} />
                            ) : (
                                <GradientButton href={`${process.env.NEXT_PUBLIC_PLATFORM_URL}/auth/login`} text="Login" size="sm" className="text-white" />
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-white text-2xl"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu />
                        </button>
                    </div>
                </div>
            </header>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
