'use client';

import { Menu, Search, Home } from 'lucide-react';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get user initials
    const getInitials = (name?: string, email?: string) => {
        if (name) {
            const parts = name.split(' ');
            if (parts.length >= 2) {
                return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
            }
            return name.substring(0, 2).toUpperCase();
        }
        if (email) {
            return email.substring(0, 2).toUpperCase();
        }
        return 'U';
    };

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
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
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

                {/* Search Bar (Hidden on mobile for now) */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg w-64 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-gray-600 w-full placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">


                {/* Home Link */}
                <a
                    href="/"
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    title="Back to Website"
                >
                    <Home size={20} />
                </a>


                {/* User Avatar Dropdown - Hidden on Mobile */}
                {user && (
                    <div className="relative hidden lg:block" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 hover:opacity-80 transition"
                        >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                                {getInitials(user.name, user.email)}
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                    <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    <div className="flex gap-2 mt-2">
                                        {user.roles.map((role) => (
                                            <span
                                                key={role}
                                                className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full ${role === 'superadmin'
                                                    ? 'bg-red-100 text-red-600'
                                                    : role === 'admin'
                                                        ? 'bg-purple-100 text-purple-600'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    <a
                                        href="/app/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Profile Settings
                                    </a>
                                    {(user.roles.includes('admin') || user.roles.includes('superadmin')) && (
                                        <a
                                            href="/app/admin"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                                        >
                                            Admin Panel
                                        </a>
                                    )}
                                </div>

                                {/* Logout */}
                                <div className="border-t border-gray-100 py-2">
                                    <button
                                        onClick={() => {
                                            setShowDropdown(false);
                                            logout();
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Mobile Menu Button - Right Aligned */}
                <button
                    onClick={onMenuClick}
                    className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
}
