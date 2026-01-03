'use client';

import { useAuth } from '@/lib/auth-context';
import { env } from '@/lib/env';

export function UserHeader() {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-4">

                    <a
                        href={env.NEXT_PUBLIC_PLATFORM_URL}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium transition"
                    >
                        ← Back to Platform
                    </a>
                </div>

                {isAuthenticated ? (
                    <div className="text-sm text-gray-600">
                        Logged in as <span className="font-medium text-gray-900">{user?.name || user?.email}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <a
                            href={`${env.NEXT_PUBLIC_PLATFORM_URL}/auth/login?redirect=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                            className="text-sm text-gray-600 hover:text-gray-900 transition font-medium"
                        >
                            Login
                        </a>
                        <a
                            href={`${env.NEXT_PUBLIC_PLATFORM_URL}/auth/signup`}
                            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                        >
                            Sign Up
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
