'use client';

import { useAuth } from '@/lib/auth-context';
import { StatsOverview } from '@/components/dashboard/widgets/StatsOverview';
import { RecentQrWidget } from '@/components/dashboard/widgets/RecentQrWidget';
import { RecentDesignsWidget } from '@/components/dashboard/widgets/RecentDesignsWidget';
import { QuickActionsWidget } from '@/components/dashboard/widgets/QuickActionsWidget';
import { useState, useEffect } from 'react';
import { qrApi } from '@/lib/api-client';

export default function DashboardPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    // Consolidated State
    const [data, setData] = useState({
        stats: {
            totalScans: 0,
            activeQrCodes: 0,
            totalDesigns: 0,
            totalQrCodes: 0,
        },
        recentQrs: [] as any[],
        recentDesigns: [] as any[],
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // 1. Fetch QR Stats & Recent QRs
                const [qrStatsRes, qrListRes] = await Promise.all([
                    qrApi.getDashboardStats().catch(() => ({ success: false, data: null })),
                    qrApi.list({ limit: 5 }).catch(() => ({ success: false, data: [] })) // Fetch top 5 recent
                ]);

                // 2. Fetch Designs (Saved Cards)
                // Note: Using the auth service endpoint for designs
                const designsRes = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/designs`, {
                    credentials: 'include',
                }).catch(() => null);

                let designsData = [];
                if (designsRes && designsRes.ok) {
                    designsData = await designsRes.json();
                }

                // Process Data
                const qrStats = qrStatsRes?.success ? qrStatsRes.data : null;
                const qrList = qrListRes?.success && Array.isArray(qrListRes.data) ? qrListRes.data : [];

                setData({
                    stats: {
                        totalScans: qrStats?.totalScans || 0,
                        activeQrCodes: qrStats?.activeQrCodes || 0,
                        totalQrCodes: qrStats?.totalQrCodes || 0,
                        totalDesigns: designsData.length || 0,
                    },
                    recentQrs: qrList.map((qr: any) => ({
                        id: qr.id,
                        name: qr.name,
                        type: qr.type,
                        scans: qr._count?.scans || 0,
                        status: qr.isActive,
                        createdAt: qr.createdAt
                    })),
                    recentDesigns: designsData.map((d: any) => ({
                        id: d.id,
                        name: d.name,
                        updatedAt: d.updatedAt
                    }))
                });

            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* 1. Header Section */}
            <div className="mb-8 text-left">
                <h1 className="text-3xl sm:text-4xl font-merriweather font-bold text-dark mb-3">
                    Welcome back, <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">{user?.name?.split(' ')[0] || 'Creator'}</span>
                </h1>
                <p className="text-text/70 font-sans text-lg">Here's what's happening in your workspace today.</p>
            </div>

            {/* 2. Stats Overview Row */}
            <StatsOverview stats={data.stats} loading={loading} />

            {/* 3. Main Data Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (2/3) - Main Lists */}
                <div className="lg:col-span-2 space-y-6">
                    <RecentQrWidget qrCodes={data.recentQrs} loading={loading} />
                </div>

                {/* Right Column (1/3) - Actions & Secondary Lists */}
                <div className="space-y-6">
                    <QuickActionsWidget />
                    <RecentDesignsWidget designs={data.recentDesigns} loading={loading} />
                </div>
            </div>
        </div>
    );
}
