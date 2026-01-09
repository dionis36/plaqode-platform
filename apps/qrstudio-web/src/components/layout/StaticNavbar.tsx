"use client";

import Link from "next/link";
import { GradientButton } from "@plaqode-platform/ui";
import { GradientAvatar } from "@plaqode-platform/ui";
import { Logo } from "@plaqode-platform/ui";
import { useAuth } from "@/lib/auth-context";
import { Menu, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import MobileMenu from "@/components/layout/MobileMenu";
import { env } from "@/lib/env";

const HOME_URL = env.NEXT_PUBLIC_PLATFORM_URL;

export default function StaticNavbar() {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const showUser = isMounted && user;

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
                        {showUser ? (
                            <GradientAvatar user={user} logout={logout} textColor="text-dark" />
                        ) : (
                            <GradientButton href={`${HOME_URL}/auth/login`} text="Login" size="sm" />
                        )}
                    </div>

                    {/* Mobile Toggle (Visible only on mobile) */}
                    {isMounted && (
                        user ? (
                            <button
                                className="md:hidden relative z-50 flex items-center gap-1 group"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <GradientAvatar
                                    user={user}
                                    logout={logout}
                                    textColor="text-dark"
                                    disableDropdown={true}
                                    className="transform group-active:scale-95 transition-transform"
                                />
                                <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center">
                                    <MoreVertical size={12} className="text-slate-700" />
                                </div>
                            </button>
                        ) : (
                            <button
                                className="md:hidden text-slate-800 text-2xl"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu />
                            </button>
                        )
                    )}
                </div>
            </div>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
