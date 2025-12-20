'use client';

import { Menu, Bell, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useState, useRef, useEffect } from 'react';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const pathname = usePathname();
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

    // Generate breadcrumbs or title based on path
    const getPageTitle = () => {
        const segments = pathname.split('/').filter(Boolean);
        // Remove 'app' from segments for cleaner display
        const displaySegments = segments.slice(1);

        if (displaySegments.length === 0) return 'Dashboard';

        return displaySegments
            .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
            .join(' / ');
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>

                <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
                    {getPageTitle()}
                </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Search Bar (Hidden on mobile for now) */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg w-64 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-gray-600 w-full placeholder:text-gray-400"
                    />
                </div>

                {/* Notifications */}
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* User Avatar Dropdown */}
                {user && (
                    <div className="relative" ref={dropdownRef}>
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
            </div>
        </header>
    );
}
