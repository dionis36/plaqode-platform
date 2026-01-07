"use client";


import Link from "next/link";
import { GradientButton } from "@plaqode-platform/ui";
import { GradientAvatar } from "@plaqode-platform/ui";
import { Logo } from "@plaqode-platform/ui";
import { useAuth } from "@/lib/auth-context";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";

import { env } from '@/lib/env';

const HOME_URL = env.NEXT_PUBLIC_PLATFORM_URL;

interface StaticNavbarProps {
    theme?: 'light' | 'dark';
}

export default function StaticNavbar({ theme = 'dark' }: StaticNavbarProps) {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const showUser = isMounted && user;

    // Determine colors based on theme
    // theme="dark" -> Dark Background, Light Text (Default for Cardify Home/Templates)
    // theme="light" -> Light Background, Dark Text (For Admin pages)
    const isLightTheme = theme === 'light';
    const textColor = isLightTheme ? 'text-slate-700' : 'text-light';
    const logoColor = isLightTheme ? 'dark' : 'white';
    const mobileToggleColor = isLightTheme ? 'text-slate-800' : 'text-light';

    // For light theme (admin), use relative positioning so it doesn't overlap content
    // For dark theme (home/templates), use absolute positioning for hero overlay
    const positionClass = isLightTheme ? 'relative bg-transparent' : 'absolute top-0 left-0 bg-transparent';

    return (
        <>
            <div className={`${positionClass} w-full z-20 px-4 md:px-8 py-4 flex justify-between items-center max-w-[1400px] mx-auto right-0`}>
                <Logo color={logoColor} href={HOME_URL} />

                {/* Desktop Nav & Auth */}
                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex gap-8">
                        {/* Adjusting links to point to PlaQode main site if needed, or keeping local routes if they exist.
                            Assuming relative routes for now, user can correct if they need absolute URLs to plaqode-web.
                        */}
                        <a href={HOME_URL} className={`${textColor} hover:text-secondary transition-colors font-medium`}>Home</a>
                        <a href={`${HOME_URL}/about`} className={`${textColor} hover:text-secondary transition-colors font-medium`}>About</a>
                        <a href={`${HOME_URL}/services`} className={`${textColor} hover:text-secondary transition-colors font-medium`}>Services</a>
                        <a href={`${HOME_URL}/contact`} className={`${textColor} hover:text-secondary transition-colors font-medium`}>Contact</a>
                    </nav>

                    <div className="hidden md:block">
                        {showUser ? (
                            <GradientAvatar user={user} logout={logout} textColor={isLightTheme ? "text-dark" : "text-white"} />
                        ) : (
                            <GradientButton href={`${HOME_URL}/auth/login`} text="Login" size="sm" className={textColor} />
                        )}
                    </div>

                    {/* Mobile Toggle (Visible only on mobile) */}
                    {isMounted && (
                        <button
                            className={`md:hidden ${mobileToggleColor} text-2xl`}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu />
                        </button>
                    )}
                </div>
            </div>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
