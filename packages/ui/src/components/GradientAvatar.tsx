"use client";

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LayoutDashboard, LogOut, UserCircle, Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Define a minimal User interface if one isn't available globally
interface User {
    name?: string;
    email: string;
    roles?: string[];
}

// We rely on passing the logout function and user object as props
// because the shared UI component shouldn't depend on app-specific context directly
// unless we move the AuthContext to the shared package (which is a larger refactor).
// For now, we'll accept `logout` as a prop to keep it pure.
interface GradientAvatarProps {
    user: User;
    logout: () => void; // Passed explicitly to avoid context dependency issues across apps
    className?: string;
    textColor?: "text-white" | "text-dark";
    disableDropdown?: boolean;
}

export function GradientAvatar({ user, logout, className = "", textColor = "text-white", disableDropdown = false }: GradientAvatarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, right: 0 });
    const [mounted, setMounted] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getInitials = (u: { name?: string; email: string }) => {
        if (u.name) {
            return u.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
        }
        return u.email.substring(0, 2).toUpperCase();
    };

    const isAdmin = user.roles?.includes('admin') || user.roles?.includes('superadmin');

    useEffect(() => {
        setMounted(true);
    }, []);

    // Update position when opening or scrolling
    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();

            setPosition({
                top: rect.bottom + 12,
                right: window.innerWidth - rect.right
            });
        }
    };

    // Close on scroll to prevent "ghost menu" floating when Smart Navbar hides
    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) setIsOpen(false);
        };

        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', updatePosition);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isOpen]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if click is inside button (toggle) or dropdown
            const isButton = buttonRef.current?.contains(event.target as Node);
            const isDropdown = dropdownRef.current?.contains(event.target as Node);

            if (!isButton && !isDropdown) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const toggleDropdown = () => {
        if (!disableDropdown) {
            if (!isOpen) updatePosition();
            setIsOpen(!isOpen);
        }
    };

    const dropdownContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                        position: 'fixed',
                        top: position.top,
                        right: position.right,
                        zIndex: 9999
                    }}
                    className="w-60 bg-[#121212]/90 backdrop-blur-xl shadow-2xl border border-white/10 rounded-2xl overflow-hidden ring-1 ring-white/5 origin-top-right"
                >
                    {/* User Header */}
                    <div className="px-5 py-4 border-b border-white/5">
                        <p className="text-sm font-semibold text-white truncate font-merriweather">
                            {user.name || "User"}
                        </p>
                        <p className="text-xs text-white/50 truncate font-sans mt-0.5">
                            {user.email}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                        <Link
                            href="/app"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-light/80 hover:text-white hover:bg-white/10 rounded-xl transition-all group"
                            onClick={() => setIsOpen(false)}
                        >
                            <LayoutDashboard size={18} className="text-light/50 group-hover:text-secondary transition-colors" />
                            Dashboard
                        </Link>

                        <Link
                            href="/app/profile"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-light/80 hover:text-white hover:bg-white/10 rounded-xl transition-all group"
                            onClick={() => setIsOpen(false)}
                        >
                            <UserCircle size={18} className="text-light/50 group-hover:text-secondary transition-colors" />
                            Profile
                        </Link>

                        {isAdmin && (
                            <Link
                                href="/app/admin"
                                className="flex items-center gap-3 px-3 py-2.5 text-sm text-light/80 hover:text-white hover:bg-white/10 rounded-xl transition-all group"
                                onClick={() => setIsOpen(false)}
                            >
                                <Shield size={18} className="text-light/50 group-hover:text-secondary transition-colors" />
                                Admin
                            </Link>
                        )}
                    </div>

                    {/* Footer / Logout */}
                    <div className="border-t border-white/5 p-2 mt-1">
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all group"
                        >
                            <LogOut size={18} className="group-hover:text-red-400 transition-colors" />
                            Log Out
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <motion.button
                ref={buttonRef}
                onClick={toggleDropdown}
                className={`group relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${disableDropdown ? 'cursor-default' : 'cursor-pointer'} ${className}`}
            >
                {/* 1. The Gradient Border (Masked) with Glow Effect */}
                <span className="absolute inset-0 rounded-full gradient-border-mask pointer-events-none" />

                {/* 2. Initials (Transparent Center) */}
                <span className={`relative z-10 font-merriweather font-bold text-sm tracking-wider ${textColor}`}>
                    {getInitials(user)}
                </span>
            </motion.button>

            {mounted && createPortal(dropdownContent, document.body)}
        </>
    );
}
