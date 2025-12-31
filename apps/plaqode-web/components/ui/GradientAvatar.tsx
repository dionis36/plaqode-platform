"use client";

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { LayoutDashboard, LogOut, UserCircle, Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface GradientAvatarProps {
    user: {
        name?: string;
        email: string;
        roles?: string[];
    };
    className?: string;
    textColor?: "text-white" | "text-dark";
    disableDropdown?: boolean;
}

export default function GradientAvatar({ user, className = "", textColor = "text-white", disableDropdown = false }: GradientAvatarProps) {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getInitials = (u: { name?: string; email: string }) => {
        if (u.name) {
            return u.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
        }
        return u.email.substring(0, 2).toUpperCase();
    };

    const isAdmin = user.roles?.includes('admin') || user.roles?.includes('superadmin');

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        if (!disableDropdown) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                onClick={toggleDropdown}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${disableDropdown ? 'cursor-default' : 'cursor-pointer'} ${className}`}
            >
                {/* 1. The Gradient Border (Masked) with Glow Effect */}
                <span className="absolute inset-0 rounded-full gradient-border-mask pointer-events-none" />

                {/* Glow behind */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 hover:from-secondary/50 hover:to-primary/50 blur-sm transition-all duration-300" />

                {/* 2. Initials (Transparent Center) */}
                <span className={`relative z-10 font-inter font-bold text-sm tracking-wider ${textColor}`}>
                    {getInitials(user)}
                </span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-4 w-60 bg-[#121212]/90 backdrop-blur-xl shadow-2xl border border-white/10 rounded-2xl overflow-hidden z-50 origin-top-right ring-1 ring-white/5"
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
        </div>
    );
}
