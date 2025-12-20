"use client";

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { LayoutDashboard, LogOut, Code, User, Settings } from 'lucide-react';

interface GradientAvatarProps {
    user: {
        name?: string;
        email: string;
    };
    className?: string;
}

export default function GradientAvatar({ user, className = "" }: GradientAvatarProps) {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getInitials = (u: { name?: string; email: string }) => {
        if (u.name) {
            return u.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
        }
        return u.email.substring(0, 2).toUpperCase();
    };

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

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-300 hover:scale-105 cursor-pointer ${className}`}
            >
                {/* 1. The Gradient Border (Masked) */}
                <span
                    className="absolute inset-0 rounded-full gradient-border-mask pointer-events-none"
                />

                {/* 2. Initials (Transparent Center) */}
                <span className="relative z-10 text-white font-inter font-bold text-sm tracking-wider">
                    {getInitials(user)}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-dark/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden origin-top-right animate-in fade-in zoom-in-95 duration-200 z-50">
                    <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-base font-medium text-white truncate font-merriweather">{user.name || "User"}</p>
                        <p className="text-xs text-white/70 truncate font-sans">{user.email}</p>
                    </div>

                    <div className="p-2 space-y-1">
                        <Link
                            href="/app"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-light hover:bg-white/10 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <LayoutDashboard size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                            Dashboard
                        </Link>

                        <Link
                            href="/app/qrcodes"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-light hover:bg-white/10 rounded-lg transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <Code size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                            My QR Codes
                        </Link>
                    </div>

                    <div className="border-t border-white/10 p-2">
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <LogOut size={18} />
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
