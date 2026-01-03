"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import { Logo } from "@plaqode-platform/ui";
import { GradientButton } from "@plaqode-platform/ui";
import { GradientAvatar } from "@plaqode-platform/ui";

import { useAuth } from "@/lib/auth-context";
import { env } from "@/lib/env";

const HOME_URL = env.NEXT_PUBLIC_PLATFORM_URL;

export default function SmartNavbar() {
    const { user, logout } = useAuth();
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
                    <Logo color="white" href={HOME_URL} />

                    {/* Desktop Nav */}
                    <div className="flex items-center gap-8">
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex gap-8">
                            <a href={HOME_URL} className="text-slate-200 hover:text-secondary transition-colors">Home</a>
                            <a href={`${HOME_URL}/about`} className="text-slate-200 hover:text-secondary transition-colors">About</a>
                            <a href={`${HOME_URL}/services`} className="text-slate-200 hover:text-secondary transition-colors">Services</a>
                            <a href={`${HOME_URL}/contact`} className="text-slate-200 hover:text-secondary transition-colors">Contact</a>
                        </nav>

                        <div className="hidden md:block">
                            {user ? (
                                <GradientAvatar user={user} logout={logout} />
                            ) : (
                                <GradientButton href={`${HOME_URL}/auth/login`} text="Login" size="sm" />
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
