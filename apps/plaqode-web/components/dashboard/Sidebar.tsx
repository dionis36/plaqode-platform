'use client';

import { useAuth } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    QrCode,
    Shield,
    ChevronLeft,
    ChevronRight,
    UserCircle,
    Layout,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from "@plaqode-platform/ui";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isMobile: boolean;
    onCloseMobile?: () => void;
}

export function Sidebar({ isOpen, setIsOpen, isMobile, onCloseMobile }: SidebarProps) {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    // Helper to get initials (same as DashboardHeader)
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

    const isActive = (path: string) => pathname === path;

    const navItems = [
        {
            label: 'Dashboard',
            href: '/app',
            icon: LayoutDashboard
        },
        {
            label: 'My QR Codes',
            href: '/app/qrcodes',
            icon: QrCode
        },
        {
            label: 'Profile',
            href: '/app/profile',
            icon: UserCircle
        },
        {
            label: 'Saved Cards',
            href: '/app/saved-cards',
            icon: Layout
        },
    ];

    if (user?.roles.includes('admin') || user?.roles.includes('superadmin')) {
        navItems.push({
            label: 'Admin Panel',
            href: '/app/admin',
            icon: Shield
        });

        // Add Cardify Manager Link
        navItems.push({
            label: 'Manage Cards',
            href: `${process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}/admin/templates`,
            icon: Layout // Reusing Layout icon or maybe a better one like FileText
        });
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={onCloseMobile}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed top-0 z-[60] h-screen bg-dark text-light border-r border-white/5 transition-all duration-300 ease-in-out flex flex-col shadow-2xl md:shadow-none
                    md:left-0 md:border-r
                    ${isMobile
                        ? (isOpen ? 'right-0 translate-x-0 w-80 border-l border-white/10' : 'right-0 translate-x-full w-80')
                        : (isOpen ? 'left-0 w-64' : 'left-0 w-20')
                    }
                `}
            >
                {/* Header */}
                <div className={`h-20 flex items-center border-b border-white/5 shrink-0 relative ${!isOpen && !isMobile ? 'justify-center px-0' : 'justify-between px-6'}`}>

                    {/* Consistent Logo (Hidden when collapsed on desktop) */}
                    <div className={`transition-opacity duration-300 ${!isOpen && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                        <Logo color="white" />
                    </div>
                    {/* Collapsed Icon when closed */}
                    {/* Collapsed Icon when closed */}
                    {(!isOpen && !isMobile) && (
                        <Link href="/" className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-10 h-10">
                                {/* Using Image to match Logo.tsx style but without text */}
                                <Image
                                    src="/img/qr-code-2.png"
                                    alt="Plaqode Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                    )}


                    {!isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="absolute -right-3 top-20 p-1 bg-dark border border-white/10 rounded-full shadow-lg text-light/70 transition-colors z-50 transform -translate-y-1/2"
                        >
                            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                        </button>
                    )}

                    {isMobile && (
                        <button
                            onClick={onCloseMobile}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-light/70 transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}
                </div>



                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-8 px-3 flex flex-col gap-2">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex transition-all duration-200 group relative
                                    ${!isOpen && !isMobile
                                        ? 'flex-col items-center justify-center py-3 px-1 gap-1'
                                        : 'items-center gap-3 px-3 py-3'
                                    }
                                    rounded-lg border border-transparent
                                    ${active
                                        ? 'bg-white/10 text-red-500'
                                        : 'text-light/70 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                                onClick={isMobile ? onCloseMobile : undefined}
                            >
                                <item.icon
                                    size={!isOpen && !isMobile ? 24 : 20}
                                    className={`shrink-0 transition-colors ${active ? 'text-red-500' : 'text-light/50 group-hover:text-light'}`}
                                />

                                {/* Label: Show normally if open, show small below if collapsed */}
                                {(!isOpen && !isMobile) ? (
                                    <span className="text-[10px] font-medium text-center leading-tight opacity-70">
                                        {item.label}
                                    </span>
                                ) : (
                                    <span className={`whitespace-nowrap font-medium transition-all duration-300 ${!isOpen && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile (Mobile Only) - Bottom */}
                {isMobile && user && (
                    <div className="p-4 border-t border-white/10 bg-black/20 shrink-0 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {getInitials(user.name, user.email)}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                <p className="text-xs text-light/50 truncate">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => logout()}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}
