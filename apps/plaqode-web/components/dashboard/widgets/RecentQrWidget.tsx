'use client';

import { QrCode, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface QrDisplayItem {
    id: string;
    name: string;
    type: string;
    scans: number;
    status: boolean;
    createdAt: string;
}

interface RecentQrWidgetProps {
    qrCodes: QrDisplayItem[];
    loading: boolean;
}

export function RecentQrWidget({ qrCodes, loading }: RecentQrWidgetProps) {

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            menu: 'bg-purple-100 text-purple-700',
            vcard: 'bg-blue-100 text-blue-700',
            url: 'bg-green-100 text-green-700',
            wifi: 'bg-cyan-100 text-cyan-700',
            // Add other types as needed, fallback default:
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

            <div className="flex-1 overflow-auto">
                {loading ? (
                    <div className="p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-12 bg-slate-50 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : qrCodes.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                        <p>No QR codes created yet.</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3 text-right">Scans</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {qrCodes.map((qr) => (
                                <tr key={qr.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        <div className="truncate max-w-[150px]">{qr.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getTypeColor(qr.type)}`}>
                                            {qr.type.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-slate-600">
                                        {qr.scans}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
