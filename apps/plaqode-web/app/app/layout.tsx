'use client';

import { useAuth } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';
import { PlatformNav } from '@/components/layout/PlatformNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Unified Navigation */}
            <PlatformNav />

            {/* Main Content */}
            <main className="pt-20 pb-12 px-6">
                {/* Dashboard Sidebar Navigation */}
                <div className="container mx-auto max-w-7xl">
                    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                        <nav className="flex items-center gap-6 overflow-x-auto">
                            <a
                                href="/app"
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${isActive('/app')
                                        ? 'bg-purple-100 text-purple-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                Dashboard
                            </a>
                            <a
                                href="/app/profile"
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${isActive('/app/profile')
                                        ? 'bg-purple-100 text-purple-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                Profile
                            </a>
                            {(user?.roles.includes('admin') || user?.roles.includes('superadmin')) && (
                                <a
                                    href="/app/admin"
                                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${isActive('/app/admin')
                                            ? 'bg-purple-100 text-purple-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    Admin
                                </a>
                            )}
                        </nav>
                    </div>

                    {/* Page Content */}
                    {children}
                </div>
            </main>
        </div>
    );
}
