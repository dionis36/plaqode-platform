'use client';

import { env } from '@/lib/env';

// Explicitly pointing to the main Plaqode Platform application (Port 3000)
// We use env var with fallback to localhost:3000
const PLATFORM_URL = env.NEXT_PUBLIC_PLATFORM_URL;

import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface User {
    email: string;
    name?: string;
    roles: string[];
}

interface PlatformNavProps {
    user?: User | null;
    onLogout?: () => void;
}

export function PlatformNav({ user, onLogout }: PlatformNavProps) {
    const pathname = usePathname();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isActive = (path: string) => pathname === path;

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

    const handleLogout = () => {
        setShowDropdown(false);
        if (onLogout) {
            onLogout();
        } else {
            // Default logout - redirect to platform
            window.location.href = `${PLATFORM_URL}/auth/login`;
        }
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
            <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href={PLATFORM_URL} className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    PlaQode
                </a>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a
                        href={PLATFORM_URL}
                        className="transition text-white hover:text-purple-400"
                    >
                        Home
                    </a>
                    <a
                        href={`${PLATFORM_URL}/about`}
                        className="transition text-white hover:text-purple-400"
                    >
                        About
                    </a>
                    <a
                        href={`${PLATFORM_URL}/services`}
                        className="transition text-white hover:text-purple-400"
                    >
                        Services
                    </a>
                    <a
                        href={`${PLATFORM_URL}/contact`}
                        className="transition text-white hover:text-purple-400"
                    >
                        Contact
                    </a>

                    {/* Auth-dependent links */}
                    {user ? (
                        <>
                            {/* User Avatar Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 hover:opacity-80 transition"
                                >
                                    {/* Avatar with initials */}
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                                        {getInitials(user.name, user.email)}
                                    </div>
                                    <svg
                                        className={`w-4 h-4 text-white transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-gray-700">
                                            <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                            <div className="flex gap-2 mt-2">
                                                {user.roles.map((role) => (
                                                    <span
                                                        key={role}
                                                        className={`px-2 py-0.5 text-xs rounded-full ${role === 'superadmin'
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : role === 'admin'
                                                                ? 'bg-purple-500/20 text-purple-400'
                                                                : 'bg-gray-700 text-gray-300'
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
                                                href={`${PLATFORM_URL}/app`}
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    Dashboard
                                                </div>
                                            </a>
                                            <a
                                                href={`${PLATFORM_URL}/app/profile`}
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Profile
                                                </div>
                                            </a>
                                            {(user.roles.includes('admin') || user.roles.includes('superadmin')) && (
                                                <a
                                                    href={`${PLATFORM_URL}/app/admin`}
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Admin Panel
                                                    </div>
                                                </a>
                                            )}
                                        </div>

                                        {/* Logout */}
                                        <div className="border-t border-gray-700 py-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Logout
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <a
                                href={`${PLATFORM_URL}/auth/login`}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition text-white font-medium"
                            >
                                Get Started
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button (placeholder for future) */}
                <button className="md:hidden text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>
        </header>
    );
}
