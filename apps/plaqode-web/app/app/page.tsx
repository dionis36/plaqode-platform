'use client';

import { useAuth } from '@/lib/auth-context';
import { StatsCard } from '@/components/dashboard/StatsCard';

import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useState, useEffect } from 'react';

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
            <div className="mb-10 text-left">
                <h1 className="text-4xl font-merriweather font-bold text-dark mb-3">
                    Welcome back, {user?.name || user?.email}!
                </h1>
                <p className="text-text/70 font-sans text-lg">Here's an overview of your creative workspace</p>
            </div>





            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
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
