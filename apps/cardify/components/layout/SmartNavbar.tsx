"use client";

const HOME_URL = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || "http://localhost:3000";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Logo } from "@plaqode-platform/ui";
import { GradientButton } from "@plaqode-platform/ui";
import { GradientAvatar } from "@plaqode-platform/ui";

import { useAuth } from "@/lib/auth-context";


export default function SmartNavbar() {
    const { user, logout } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = 100; // Trigger earlier since Templates page might not have a huge hero

            if (currentScrollY > heroHeight) {
                if (currentScrollY > lastScrollY.current) {
                    // Scrolling DOWN - Hide
                    setIsVisible(false);
                } else {
                    // Scrolling UP - Show
                    setIsVisible(true);
                }
            } else {
                // Less than hero height - Hide (as checking the source logic)
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
                className={`fixed top-0 left-0 w-full z-[999] bg-dark/80 backdrop-blur-md shadow-md border-b border-white/5 rounded-b-lg transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Logo href={HOME_URL} />

                    {/* Desktop Nav */}
                    {/* Right Side - Nav & Login & Mobile Toggle */}
                    <div className="flex items-center gap-8">
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex gap-8">
                            {["Home", "About", "Services", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    href={item === "Home" ? HOME_URL : `${HOME_URL}/${item.toLowerCase()}`}
                                    className="text-light hover:text-secondary transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
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
                            className="md:hidden text-light text-2xl"
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
