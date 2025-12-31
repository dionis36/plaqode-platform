"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Facebook, Twitter, Instagram, Linkedin, LogIn, ChevronRight, Home, Info, Briefcase, Mail, LogOut, User, LayoutDashboard } from "lucide-react";
import { Drawer } from "@plaqode-platform/ui";
import { Logo } from "@plaqode-platform/ui";
import { GradientButton } from "@plaqode-platform/ui";
import { GradientAvatar } from "@plaqode-platform/ui";
import { useAuth } from "@/lib/auth-context";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { user, logout } = useAuth();

    const navItems = [
        { label: "Home", href: "/", icon: Home },
        { label: "About", href: "/about", icon: Info },
        { label: "Services", href: "/services", icon: Briefcase },
        { label: "Contact", href: "/contact", icon: Mail },
    ];

    // Helper for initials
    const getInitials = (name?: string, email?: string) => {
        if (name) {
            const parts = name.split(' ');
            if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
            return name.substring(0, 2).toUpperCase();
        }
        if (email) return email.substring(0, 2).toUpperCase();
        return 'U';
    };

    // Close on resize (desktop)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                onClose();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [onClose]);

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            className="w-80 border-l border-white/10 bg-[#121212]/95 backdrop-blur-xl shadow-2xl"
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
                    <div className="flex items-center gap-2">
                        <Logo color="white" />
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-light/70 transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Navigation - Centered Vertically */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col justify-center gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-4 px-4 py-4 rounded-xl border border-transparent text-light/80 hover:bg-white/5 hover:text-white transition-all duration-200 group"
                            onClick={onClose}
                        >
                            <item.icon size={22} className="text-light/50 group-hover:text-light transition-colors" />
                            <span className="font-medium text-lg">{item.label}</span>
                        </Link>
                    ))}

                    {/* Dashboard Link if logged in */}
                    {user && (
                        <Link
                            href="/app"
                            className="flex items-center gap-4 px-4 py-4 rounded-xl border border-white/5 text-light/80 hover:text-white hover:bg-white/5 transition-all duration-200 group mt-2"
                            onClick={onClose}
                        >
                            <LayoutDashboard size={22} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
                            <span className="font-medium text-lg">Dashboard</span>
                        </Link>
                    )}
                </nav>

                {/* Footer / Auth Section */}
                <div className="p-6 border-t border-white/10 bg-black/20 shrink-0">

                    {/* User Profile or Login */}
                    <div className="mb-2">
                        {user ? (
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <GradientAvatar
                                        user={user}
                                        logout={logout}
                                        disableDropdown
                                        className="shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                        <p className="text-xs text-light/50 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        onClose();
                                    }}
                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <GradientButton
                                href="/auth/login"
                                text="Login"
                                icon={<LogIn size={20} />}
                                className="w-full text-light"
                                onClick={onClose}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Drawer>
    );
}
