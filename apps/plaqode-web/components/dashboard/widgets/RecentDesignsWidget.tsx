'use client';

import { Layout, ArrowRight, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface DesignItem {
    id: string;
    name: string;
    updatedAt: string;
}

interface RecentDesignsWidgetProps {
    designs: DesignItem[];
    loading: boolean;
}

export function RecentDesignsWidget({ designs, loading }: RecentDesignsWidgetProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <Layout className="w-5 h-5 text-purple-500" />
                    Recent Designs
                </h3>
                <Link href="/app/saved-cards" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="p-6 flex-1">
                {loading ? (
                    <div className="space-y-3">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-16 bg-slate-50 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : designs.length === 0 ? (
                    <div className="text-center text-slate-500 py-4">
                        <p>No saved designs yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {designs.slice(0, 3).map((design) => (
                            <Link
                                key={design.id}
                                href={`/app/saved-cards`} // Ideally deep link if possible, but saves-cards is a list
                                className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center text-purple-500 group-hover:scale-105 transition-transform">
                                    <CreditCard size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{design.name}</h4>
                                    <p className="text-xs text-slate-500">
                                        Edited {new Date(design.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
