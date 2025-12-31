"use client";

import Link from "next/link";
import { GradientButton } from "@plaqode-platform/ui";
import { GradientAvatar } from "@plaqode-platform/ui";
import { Logo } from "@plaqode-platform/ui";
import { useAuth } from "@/lib/auth-context";
import { Menu } from "lucide-react";
import { useState } from "react";
import MobileMenu from "@/components/layout/MobileMenu";

const HOME_URL = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || "http://localhost:3000";

export default function StaticNavbar() {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="absolute top-0 left-0 w-full z-20 px-4 md:px-8 py-4 flex justify-between items-center max-w-[1400px] mx-auto right-0 bg-transparent">
                <Logo color="dark" href={HOME_URL} />

                {/* Desktop Nav & Auth */}
                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex gap-8">
                        <a href={HOME_URL} className="text-slate-700 hover:text-secondary transition-colors font-medium">Home</a>
                        <a href={`${HOME_URL}/about`} className="text-slate-700 hover:text-secondary transition-colors font-medium">About</a>
                        <a href={`${HOME_URL}/services`} className="text-slate-700 hover:text-secondary transition-colors font-medium">Services</a>
                        <a href={`${HOME_URL}/contact`} className="text-slate-700 hover:text-secondary transition-colors font-medium">Contact</a>
                    </nav>

                    <div className="hidden md:block">
                        {user ? (
                            <GradientAvatar user={user} logout={logout} textColor="text-dark" />
                        ) : (
                            <GradientButton href={`${HOME_URL}/auth/login`} text="Login" size="sm" />
                        )}
                    </div>

                    {/* Mobile Toggle (Visible only on mobile) */}
                    <button
                        className="md:hidden text-slate-800 text-2xl"
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
