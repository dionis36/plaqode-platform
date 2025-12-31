'use client';

import { useEffect, useState } from 'react';
import { analyticsApi, qrApi } from '@/lib/api-client';
import { ArrowLeft, TrendingUp, Globe, Smartphone, Monitor } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import charts with SSR disabled
const ScansChart = dynamic(() => import('@/components/analytics/AnalyticsCharts').then(mod => mod.ScansChart), { ssr: false });
const DeviceChart = dynamic(() => import('@/components/analytics/AnalyticsCharts').then(mod => mod.DeviceChart), { ssr: false });
const OSChart = dynamic(() => import('@/components/analytics/AnalyticsCharts').then(mod => mod.OSChart), { ssr: false });

interface AnalyticsData {
    totalScans: number;
    scansByDay: Record<string, number>;
    deviceBreakdown: Array<{ device: string; count: number }>;
    osBreakdown: Array<{ os: string; count: number }>;
    browserBreakdown: Array<{ browser: string; count: number }>;
    countryBreakdown: Array<{ country: string; count: number }>;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

export default function AnalyticsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [qrName, setQrName] = useState('');
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<'7d' | '30d' | 'all'>('30d');

    useEffect(() => {
        loadAnalytics();
    }, [params.id, dateRange]);

    async function loadAnalytics() {
        try {
            setLoading(true);

            // Load QR code details for name
            const qrResponse = await qrApi.getById(params.id);
            if (qrResponse.success && qrResponse.data) {
                setQrName(qrResponse.data.name);
                document.title = `Analytics: ${qrResponse.data.name} | QR Studio`;
            }

            // Load analytics
            const now = new Date();
            let startDate: string | undefined;

            if (dateRange === '7d') {
                const date = new Date(now);
                date.setDate(date.getDate() - 7);
                startDate = date.toISOString();
            } else if (dateRange === '30d') {
                const date = new Date(now);
                date.setDate(date.getDate() - 30);
                startDate = date.toISOString();
            }

            const response = await analyticsApi.getQrAnalytics(
                params.id,
                startDate ? { startDate, endDate: now.toISOString() } : undefined
            );

            if (response.success && response.data) {
                setAnalytics(response.data);
            }
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">No Analytics Data</h2>
                    <button onClick={() => router.back()} className="text-blue-600 hover:underline">
                        Back
                    </button>
                </div>
            </div>
        );
    }

    // Prepare chart data
    const scansOverTimeData = Object.entries(analytics.scansByDay).map(([date, count]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        scans: count,
    }));

    return (
        <div className="min-h-screen bg-transparent">
            <div className="w-full">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
                            <p className="text-slate-600 mt-2">{qrName}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setDateRange('7d')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${dateRange === '7d'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                Last 7 Days
                            </button>
                            <button
                                onClick={() => setDateRange('30d')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${dateRange === '30d'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                Last 30 Days
                            </button>
                            <button
                                onClick={() => setDateRange('all')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${dateRange === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                All Time
                            </button>
                        </div>
                    </div>
                </div>

                {/* Total Scans */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Total Scans</p>
                            <p className="text-5xl font-bold">{analytics.totalScans.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Scans Over Time */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Scans Over Time</h2>
                    {scansOverTimeData.length > 0 ? (
                        <ScansChart data={scansOverTimeData} />
                    ) : (
                        <p className="text-center text-slate-500 py-8">No scan data available for this period</p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Device Breakdown */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-blue-600" />
                            Device Breakdown
                        </h2>
                        {analytics.deviceBreakdown.length > 0 ? (
                            <DeviceChart data={analytics.deviceBreakdown} colors={COLORS} />
                        ) : (
                            <p className="text-center text-slate-500 py-8">No device data available</p>
                        )}
                    </div>

                    {/* OS Breakdown */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Monitor className="w-5 h-5 text-purple-600" />
                            Operating System
                        </h2>
                        {analytics.osBreakdown.length > 0 ? (
                            <OSChart data={analytics.osBreakdown} />
                        ) : (
                            <p className="text-center text-slate-500 py-8">No OS data available</p>
                        )}
                    </div>
                </div>

                {/* Browser & Geographic */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Browser Breakdown */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4">Browser Distribution</h2>
                        {analytics.browserBreakdown.length > 0 ? (
                            <div className="space-y-3">
                                {analytics.browserBreakdown.map((item, index) => {
                                    const percentage = (item.count / analytics.totalScans) * 100;
                                    return (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-slate-700">{item.browser}</span>
                                                <span className="text-sm text-slate-600">{item.count} ({percentage.toFixed(1)}%)</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                <div
                                                    className="h-2 rounded-full"
                                                    style={{
                                                        width: `${percentage}%`,
                                                        backgroundColor: COLORS[index % COLORS.length],
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-slate-500 py-8">No browser data available</p>
                        )}
                    </div>

                    {/* Geographic Distribution */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-green-600" />
                            Geographic Distribution
                        </h2>
                        {analytics.countryBreakdown.length > 0 ? (
                            <div className="space-y-3">
                                {analytics.countryBreakdown.slice(0, 5).map((item, index) => {
                                    const percentage = (item.count / analytics.totalScans) * 100;
                                    return (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-slate-700">{item.country}</span>
                                                <span className="text-sm text-slate-600">{item.count} ({percentage.toFixed(1)}%)</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                <div
                                                    className="h-2 rounded-full bg-green-600"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-slate-500 py-8">No geographic data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
