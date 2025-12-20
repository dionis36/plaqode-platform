"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function SmartNavbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = window.innerHeight; // Approx 100vh

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
                className={`fixed top-0 left-0 w-full z-[999] bg-dark shadow-md transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="max-w-[1200px] mx-auto px-8 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/img/logo.png" alt="Plaqode" className="w-12 h-12" />
                        <p className="font-serif text-2xl text-light font-bold">Plaqode</p>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8">
                        {["Home", "About", "Services", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-light hover:text-secondary transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-light text-2xl"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu />
                    </button>
                </div>
            </header>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
