'use client';

import { QrCode, ArrowRight, Smartphone, Trash2, BarChart2, Edit } from 'lucide-react';
import Link from 'next/link';
import { env } from '@/lib/env';

interface QrDisplayItem {
    id: string;
    name: string;
    shortcode?: string;
    type: string;
    scans: number;
    status: boolean;
    createdAt: string;
}

interface RecentQrWidgetProps {
    qrCodes: QrDisplayItem[];
    loading: boolean;
    onDelete?: (id: string) => void;
    onPreview?: (id: string) => void;
}

export function RecentQrWidget({ qrCodes, loading, onDelete, onPreview }: RecentQrWidgetProps) {
    const qrStudioUrl = env.NEXT_PUBLIC_QRSTUDIO_URL;

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            menu: 'bg-purple-100 text-purple-700',
            vcard: 'bg-blue-100 text-blue-700',
            url: 'bg-green-100 text-green-700',
            wifi: 'bg-cyan-100 text-cyan-700',
            text: 'bg-orange-100 text-orange-700',
            file: 'bg-pink-100 text-pink-700',
            // Default fallback
        };
        return colors[type.toLowerCase()] || 'bg-slate-100 text-slate-700';
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-blue-500" />
                    Recent QR Codes
                </h3>
                <Link href="/app/qrcodes" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div>
                {loading ? (
                    <div className="p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-slate-50 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : qrCodes.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <p>No QR codes created yet.</p>
                    </div>
                ) : (
                    <>
                        {/* Mobile Card Layout */}
                        <div className="lg:hidden space-y-4 p-4">
                            {qrCodes.map((qr) => (
                                <div
                                    key={qr.id}
                                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => window.location.href = `${qrStudioUrl}/details?id=${qr.id}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <QrCode className="w-6 h-6 text-slate-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-slate-900 truncate">{qr.name}</h3>
                                                <p className="text-xs text-slate-500 truncate">{qr.shortcode || 'No Code'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getTypeColor(qr.type)}`}>
                                            {qr.type.toUpperCase()}
                                        </span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${qr.status ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                                            {qr.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm mb-3">
                                        <span className="text-slate-600">Scans: <span className="font-semibold text-slate-900">{qr.scans}</span></span>
                                        <span className="text-slate-500">{new Date(qr.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => onPreview?.(qr.id)}
                                            className="flex items-center justify-center p-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex-1"
                                            title="Preview"
                                        >
                                            <Smartphone className="w-4 h-4" />
                                        </button>
                                        <a
                                            href={`${qrStudioUrl}/analytics?id=${qr.id}`}
                                            className="flex items-center justify-center p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex-1"
                                            title="Analytics"
                                        >
                                            <BarChart2 className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`${qrStudioUrl}/create/${qr.type}?edit=${qr.id}`}
                                            className="flex items-center justify-center p-2.5 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors flex-1"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => onDelete?.(qr.id)}
                                            className="flex items-center justify-center p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex-1"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table Layout */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full text-left text-sm min-w-[600px]">
                                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Scans</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Created</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {qrCodes.map((qr) => (
                                        <tr
                                            key={qr.id}
                                            className="hover:bg-slate-50 transition-colors cursor-pointer"
                                            onClick={() => window.location.href = `${qrStudioUrl}/details?id=${qr.id}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                                        <QrCode className="w-5 h-5 text-slate-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-900 truncate max-w-[150px]">{qr.name}</div>
                                                        <div className="text-xs text-slate-500">{qr.shortcode || 'No Code'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getTypeColor(qr.type)}`}>
                                                    {qr.type.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-900 font-medium">
                                                {qr.scans}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${qr.status ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                                                    {qr.status ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                {new Date(qr.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => onPreview?.(qr.id)}
                                                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                        title="Preview"
                                                    >
                                                        <Smartphone className="w-4 h-4" />
                                                    </button>
                                                    <a
                                                        href={`${qrStudioUrl}/analytics?id=${qr.id}`}
                                                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                        title="Analytics"
                                                    >
                                                        <BarChart2 className="w-4 h-4" />
                                                    </a>
                                                    <a
                                                        href={`${qrStudioUrl}/create/${qr.type}?edit=${qr.id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </a>
                                                    <button
                                                        onClick={() => onDelete?.(qr.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
