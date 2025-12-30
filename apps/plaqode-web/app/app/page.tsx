'use client';

import { useAuth } from '@/lib/auth-context';
import { StatsOverview } from '@/components/dashboard/widgets/StatsOverview';
import { RecentQrWidget } from '@/components/dashboard/widgets/RecentQrWidget';
import { RecentDesignsWidget } from '@/components/dashboard/widgets/RecentDesignsWidget';
import { QuickActionsWidget } from '@/components/dashboard/widgets/QuickActionsWidget';
import { ProfileWidget } from '@/components/dashboard/widgets/ProfileWidget';
import { useState, useEffect } from 'react';
import { qrApi } from '@/lib/api-client';
import { ConfirmationModal, toast } from '@plaqode-platform/ui';
import { QrContentPreviewModal } from '@/components/common/QrContentPreviewModal';

export default function DashboardPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    // Modal States
    const [qrToDelete, setQrToDelete] = useState<string | null>(null);
    const [designToDelete, setDesignToDelete] = useState<{ id: string, name: string } | null>(null);
    const [qrToPreview, setQrToPreview] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const fetchDashboardData = async () => {
        try {
            // 1. Fetch QR Stats & Recent QRs
            const [qrStatsRes, qrListRes] = await Promise.all([
                qrApi.getDashboardStats().catch(() => ({ success: false, data: null })),
                qrApi.list({ limit: 4 }).catch(() => ({ success: false, data: [] }))
            ]);

            // 2. Fetch Designs (Saved Cards)
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
                    createdAt: qr.createdAt,
                    shortcode: qr.shortcode
                })),
                recentDesigns: designsData
            });

        } catch (error) {
            console.error("Failed to load dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    // --- Action Handlers ---

    const handleQrDeleteConfirm = async () => {
        if (!qrToDelete) return;
        try {
            setIsDeleting(true);
            await qrApi.delete(qrToDelete);
            toast.success("QR Code deleted successfully");
            await fetchDashboardData(); // Refresh data
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete QR Code");
        } finally {
            setIsDeleting(false);
            setQrToDelete(null);
        }
    };

    const handleDesignDeleteConfirm = async () => {
        if (!designToDelete) return;
        try {
            setIsDeleting(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/designs/${designToDelete.id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                toast.success("Design deleted successfully");
                await fetchDashboardData(); // Refresh data
            } else {
                throw new Error("Failed to delete design");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete design");
        } finally {
            setIsDeleting(false);
            setDesignToDelete(null);
        }
    };

    const handlePreviewQr = async (id: string) => {
        try {
            const response = await qrApi.getById(id);
            if (response.success && response.data) {
                setQrToPreview(response.data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load preview");
        }
    };

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

            {/* 3. Main Actions & Widgets Stack */}
            <div className="space-y-8 mt-8">

                {/* Recent QRs - Full Width */}
                <RecentQrWidget
                    qrCodes={data.recentQrs}
                    loading={loading}
                    onDelete={(id) => setQrToDelete(id)}
                    onPreview={handlePreviewQr}
                />

                {/* Recent Designs - Full Width */}
                <RecentDesignsWidget
                    designs={data.recentDesigns}
                    loading={loading}
                    onDelete={(id, name) => setDesignToDelete({ id, name })}
                />

                {/* Bottom Row: Profile + Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ProfileWidget />
                    <QuickActionsWidget />
                </div>
            </div>

            {/* Modals */}
            <ConfirmationModal
                isOpen={!!qrToDelete}
                onClose={() => setQrToDelete(null)}
                onConfirm={handleQrDeleteConfirm}
                title="Delete QR Code"
                message="Are you sure you want to delete this QR code? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
                isLoading={isDeleting}
            />

            <ConfirmationModal
                isOpen={!!designToDelete}
                onClose={() => setDesignToDelete(null)}
                onConfirm={handleDesignDeleteConfirm}
                title="Delete Design"
                message={`Are you sure you want to delete "${designToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                variant="danger"
                isLoading={isDeleting}
            />

            <QrContentPreviewModal
                isOpen={!!qrToPreview}
                onClose={() => setQrToPreview(null)}
                qrCode={qrToPreview}
            />
        </div>
    );
}
