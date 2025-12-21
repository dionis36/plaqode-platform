"use client";

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
                        <Link href="/" className="text-light hover:text-secondary transition-colors">Home</Link>
                        <Link href="/about" className="text-light hover:text-secondary transition-colors">About</Link>
                        <Link href="/services" className="text-light hover:text-secondary transition-colors">Services</Link>
                        <Link href="/contact" className="text-light hover:text-secondary transition-colors">Contact</Link>
                    </nav>

                    <div className="hidden md:block">
                        {user ? (
                            <GradientAvatar user={user} />
                        ) : (
                            <GradientButton href="/auth/login" text="Login" size="sm" className="text-light" />
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
