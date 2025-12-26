'use client';

import { useState } from 'react';
import Link from 'next/link';

interface User {
    name?: string;
    email: string;
}

export default function GradientAvatar({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(false);
    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : user.email.substring(0, 2).toUpperCase();

    // Generate consistent gradient based on email length
    const gradients = [
        'from-blue-500 to-indigo-500',
        'from-emerald-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-pink-500 to-rose-500',
        'from-purple-500 to-violet-500',
    ];
    const gradient = gradients[user.email.length % gradients.length];

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            window.location.href = `${process.env.NEXT_PUBLIC_PLATFORM_URL}/auth/login`;
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold shadow-md hover:shadow-lg transition-all border-2 border-white`}
            >
                {initials}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-1 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-4 py-2 border-b border-slate-100">
                            <p className="text-sm font-medium text-slate-900 truncate">{user.name || 'User'}</p>
                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                            <Link
                                href={`${process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || 'http://localhost:3000'}/app/profile`}
                                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                                Profile Settings
                            </Link>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || 'http://localhost:3000'}/app/qrcodes`}
                                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                                Dashboard
                            </Link>
                        </div>
                        <div className="border-t border-slate-100 py-1">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
