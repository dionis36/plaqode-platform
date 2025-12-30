'use client';

import { Menu, Search, Home } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import GradientAvatar from '@/components/ui/GradientAvatar';
import { Logo, Input } from '@plaqode-platform/ui';

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
        <header className="h-20 bg-bg/80 backdrop-blur-md border-b border-dark/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                {/* Mobile Logo */}
                <div className="md:hidden">
                    <Logo color="dark" />
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex relative w-72">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark/40 pointer-events-none z-10" />
                    <Input
                        type="text"
                        placeholder="Search designs, codes..."
                        className="pl-10 h-10 bg-white border-dark/5 rounded-xl"
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
                    className="p-2 text-dark hover:bg-black/5 rounded-lg lg:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
}
