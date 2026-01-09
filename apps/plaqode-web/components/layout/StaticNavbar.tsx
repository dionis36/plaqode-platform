"use client";

import Link from "next/link";
import { GradientButton } from "@plaqode-platform/ui";
import { GradientAvatar } from "@plaqode-platform/ui";
import { Logo } from "@plaqode-platform/ui";
import { useAuth } from "@/lib/auth-context";
import { Menu, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";

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
            <div className="absolute top-0 left-0 w-full z-20 px-4 md:px-8 py-4 flex justify-between items-center max-w-[1400px] mx-auto left-0 right-0">
                <Logo />

                {/* Desktop Nav & Auth */}
                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex gap-8">
                        <Link href="/" className="text-light hover:text-secondary transition-colors">Home</Link>
                        <Link href="/about" className="text-light hover:text-secondary transition-colors">About</Link>
                        <Link href="/services" className="text-light hover:text-secondary transition-colors">Services</Link>
                        <Link href="/contact" className="text-light hover:text-secondary transition-colors">Contact</Link>
                    </nav>

                    <div className="hidden md:block">
                        {showUser ? (
                            <GradientAvatar user={user} logout={logout} />
                        ) : (
                            <GradientButton href="/auth/login" text="Login" size="sm" className="text-light" />
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
                                    textColor="text-white"
                                    disableDropdown={true}
                                    className="transform group-active:scale-95 transition-transform"
                                />
                                <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center">
                                    <MoreVertical size={12} className="text-light" />
                                </div>
                            </button>
                        ) : (
                            <button
                                className="md:hidden text-light text-2xl"
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
