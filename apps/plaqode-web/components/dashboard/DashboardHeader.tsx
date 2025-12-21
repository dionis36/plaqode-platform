'use client';

import { Menu, Search, Home } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import GradientAvatar from '@/components/ui/GradientAvatar';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="h-20 bg-bg/80 backdrop-blur-md border-b border-dark/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                {/* Mobile Logo */}
                <Link href="/" className="md:hidden flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                        P
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        PlaQode
                    </span>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-dark/5 rounded-2xl w-72 focus-within:bg-white focus-within:shadow-md transition-all duration-300">
                    <Search size={18} className="text-dark/40" />
                    <input
                        type="text"
                        placeholder="Search designs, codes..."
                        className="bg-transparent border-none outline-none text-sm text-dark/80 w-full placeholder:text-dark/40 font-sans"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">

                {/* Home Link */}
                <a
                    href="/"
                    className="p-2 text-dark/50 hover:text-dark hover:bg-white/10 rounded-full transition-colors"
                    title="Back to Website"
                >
                    <Home size={20} />
                </a>

                {/* Gradient Avatar */}
                {user && (
                    <div className="hidden lg:block relative z-50">
                        <GradientAvatar user={user} textColor="text-dark" />
                    </div>
                )}

                {/* Mobile Menu Button - Right Aligned */}
                <button
                    onClick={onMenuClick}
                    className="p-2 -mr-2 text-dark/60 hover:bg-black/5 rounded-lg lg:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
}
