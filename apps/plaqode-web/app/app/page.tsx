'use client';

import { useAuth } from '@/lib/auth-context';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ProductCard } from '@/components/dashboard/ProductCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { MyDesigns } from '@/components/dashboard/MyDesigns';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const { user } = useAuth();

    // Real statistics state
    const [stats, setStats] = useState({
        totalDesigns: 0,
        thisWeek: 0,
        products: [] as string[],
    });
    const [loading, setLoading] = useState(true);

    // QR Studio statistics state
    const [qrStudioStats, setQrStudioStats] = useState({
        totalQrCodes: 0,
        activeQrCodes: 0,
        totalScans: 0,
        recentScans: 0,
    });

    // Fetch real statistics
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/stats`, {
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Fetch QR Studio statistics
    useEffect(() => {
        const fetchQrStudioStats = async () => {
            if (user?.products.includes('qrstudio')) {
                try {
                    const response = await fetch('/api/qrstudio/stats', {
                        credentials: 'include',
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.success && data.data) {
                            setQrStudioStats(data.data);
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch QR Studio stats:', error);
                }
            }
        };

        fetchQrStudioStats();
    }, [user]);

    // Mock activities - In production, fetch from API
    const mockActivities = [
        {
            id: '1',
            type: 'cardify' as const,
            action: 'Created new business card design',
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        },
        {
            id: '2',
            type: 'qrstudio' as const,
            action: 'Generated QR code for website',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        },
        {
            id: '3',
            type: 'cardify' as const,
            action: 'Exported business card as PDF',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name || user?.email}!
                </h1>
                <p className="text-gray-600">Here's an overview of your creative workspace</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Designs"
                    value={loading ? '...' : stats.totalDesigns}
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    }
                    color="purple"
                />
                <StatsCard
                    title="QR Codes"
                    value={qrStudioStats.totalQrCodes}
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                    }
                    color="blue"
                />
                <StatsCard
                    title="This Week"
                    value={loading ? '...' : stats.thisWeek}
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    }
                    color="green"
                />
                <StatsCard
                    title="Products"
                    value={user?.products.length || 0}
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    }
                    color="orange"
                />
            </div>

            {/* My Designs Section */}
            <div className="mb-8">
                <MyDesigns />
            </div>

            {/* Products Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Products</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <ProductCard
                        name="Cardify"
                        description="Create beautiful, professional business cards"
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                        }
                        stats={{ total: stats.totalDesigns, recent: stats.thisWeek }}
                        href={process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}
                        hasAccess={user?.products.includes('cardify') || false}
                        gradient="bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                    <ProductCard
                        name="QR Studio"
                        description="Generate dynamic QR codes for any purpose"
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                        }
                        stats={{ total: qrStudioStats.totalQrCodes, recent: qrStudioStats.recentScans }}
                        href={`${process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3004'}/qrcodes`}
                        hasAccess={user?.products.includes('qrstudio') || false}
                        gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                </div>
            </div>

            {/* QR Studio Quick Access - Only show if user has access and has QR codes */}
            {user?.products.includes('qrstudio') && qrStudioStats.totalQrCodes > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">QR Studio</h2>
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {qrStudioStats.totalQrCodes}
                                </div>
                                <div className="text-sm text-gray-600">Total QR Codes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {qrStudioStats.activeQrCodes}
                                </div>
                                <div className="text-sm text-gray-600">Active</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {qrStudioStats.totalScans}
                                </div>
                                <div className="text-sm text-gray-600">Total Scans</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">
                                    {qrStudioStats.recentScans}
                                </div>
                                <div className="text-sm text-gray-600">Last 7 Days</div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a
                                href={`${process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3004'}/create`}
                                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                            >
                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="font-medium text-blue-900">Create QR Code</span>
                            </a>
                            <a
                                href={`${process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3004'}/qrcodes`}
                                className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                            >
                                <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                <span className="font-medium text-slate-900">View All QR Codes</span>
                            </a>
                            <a
                                href={`${process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3004'}/qrcodes?filter=active`}
                                className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
                            >
                                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium text-green-900">Active QR Codes</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Activity & Account Info */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <RecentActivity activities={mockActivities} />
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Account</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Email</div>
                            <div className="font-medium text-gray-900">{user?.email}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Role</div>
                            <div className="flex gap-2 flex-wrap">
                                {user?.roles.map((role) => (
                                    <span
                                        key={role}
                                        className={`px-2 py-1 text-xs rounded-full ${role === 'superadmin'
                                            ? 'bg-red-100 text-red-700'
                                            : role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Active Products</div>
                            <div className="font-medium text-gray-900">
                                {user?.products.length || 0} product{user?.products.length !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
