"use client";

import Link from "next/link";
import GradientButton from "@/components/ui/GradientButton";
import GradientAvatar from "@/components/ui/GradientAvatar";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth-context";
import { Menu } from "lucide-react";
import { useState } from "react";
import MobileMenu from "@/components/layout/MobileMenu";

const HOME_URL = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || "http://localhost:3000";

export default function StaticNavbar() {
    const { user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="absolute top-0 left-0 w-full z-20 px-4 md:px-8 py-4 flex justify-between items-center max-w-[1400px] mx-auto right-0 bg-transparent">
                <Logo color="dark" />

                {/* Desktop Nav & Auth */}
                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex gap-8">
                        <Link href={HOME_URL} className="text-slate-700 hover:text-secondary transition-colors font-medium">Home</Link>
                        <Link href={`${HOME_URL}/about`} className="text-slate-700 hover:text-secondary transition-colors font-medium">About</Link>
                        <Link href={`${HOME_URL}/services`} className="text-slate-700 hover:text-secondary transition-colors font-medium">Services</Link>
                        <Link href={`${HOME_URL}/contact`} className="text-slate-700 hover:text-secondary transition-colors font-medium">Contact</Link>
                    </nav>

                    <div className="hidden md:block">
                        {user ? (
                            <GradientAvatar user={user} />
                        ) : (
                            <GradientButton href={`${process.env.NEXT_PUBLIC_PLATFORM_URL}/auth/login`} text="Login" size="sm" className="text-white bg-slate-900" />
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
