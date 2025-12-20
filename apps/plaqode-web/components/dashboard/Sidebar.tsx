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
} from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isMobile: boolean;
    onCloseMobile?: () => void;
}

export function Sidebar({ isOpen, setIsOpen, isMobile, onCloseMobile }: SidebarProps) {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        {
            label: 'Dashboard',
            href: '/app',
            icon: LayoutDashboard
        },
        {
            label: 'My QR Codes',
            href: '/app/qrcodes', // Assuming this route exists or will exist
            icon: QrCode
        },
        {
            label: 'Profile',
            href: '/app/profile',
            icon: UserCircle
        },
    ];

    if (user?.roles.includes('admin') || user?.roles.includes('superadmin')) {
        navItems.push({
            label: 'Admin',
            href: '/app/admin',
            icon: Shield
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
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onCloseMobile}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
                    ${isMobile ? (isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64') : (isOpen ? 'w-64' : 'w-20')}
                `}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${!isOpen && !isMobile ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                            P
                        </div>
                        <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                            PlaQode
                        </span>
                    </div>

                    {!isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                        >
                            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                        </button>
                    )}

                    {isMobile && (
                        <button
                            onClick={onCloseMobile}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
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
                                        : 'items-center gap-3 px-3 py-2.5'
                                    }
                                    rounded-lg
                                    ${active
                                        ? 'bg-purple-50 text-purple-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                                `}
                                onClick={isMobile ? onCloseMobile : undefined}
                            >
                                <item.icon
                                    size={!isOpen && !isMobile ? 24 : 22}
                                    className={`shrink-0 transition-colors ${active ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'}`}
                                />

                                {/* Label: Show normally if open, show small below if collapsed */}
                                {(!isOpen && !isMobile) ? (
                                    <span className="text-[10px] font-medium text-center leading-tight">
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
            </aside>
        </>
    );
}
