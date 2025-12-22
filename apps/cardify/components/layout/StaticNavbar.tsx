"use client";

// Explicitly pointing to the main Plaqode Platform application (Port 3000)
const PLATFORM_URL = 'http://localhost:3000';

import Link from "next/link";
import GradientButton from "@/components/ui/GradientButton";
import GradientAvatar from "@/components/ui/GradientAvatar";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth-context";
import { Menu } from "lucide-react";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function StaticNavbar() {
    const { user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="absolute top-0 left-0 w-full z-20 px-4 md:px-8 py-4 flex justify-between items-center max-w-[1400px] mx-auto left-0 right-0">
                <Logo />

                {/* Desktop Nav & Auth */}
                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex gap-8">
                        {/* Adjusting links to point to PlaQode main site if needed, or keeping local routes if they exist.
                            Assuming relative routes for now, user can correct if they need absolute URLs to plaqode-web.
                        */}
                        <a href={PLATFORM_URL} className="text-light hover:text-secondary transition-colors">Home</a>
                        <a href={`${PLATFORM_URL}/about`} className="text-light hover:text-secondary transition-colors">About</a>
                        <a href={`${PLATFORM_URL}/services`} className="text-light hover:text-secondary transition-colors">Services</a>
                        <a href={`${PLATFORM_URL}/contact`} className="text-light hover:text-secondary transition-colors">Contact</a>
                    </nav>

                    <div className="hidden md:block">
                        {user ? (
                            <div className="relative z-50">
                                <GradientAvatar user={user} />
                            </div>
                        ) : (
                            <GradientButton href={`${PLATFORM_URL}/auth/login`} text="Login" size="sm" className="text-light" />
                        )}
                    </div>

                    {/* Mobile Toggle (Visible only on mobile) */}
                    <button
                        className="md:hidden text-light text-2xl"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu />
                    </button>
                </div>
            </div>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
