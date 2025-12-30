import Link from 'next/link';
import { ArrowRight, Layout } from 'lucide-react';
import SavedCard from '@/components/app/SavedCard';

interface DesignItem {
    id: string;
    name: string;
    updatedAt: string;
    thumbnail?: string;
    designData?: any;
    templateId?: string;
    userId?: string;
}

interface RecentDesignsWidgetProps {
    designs: DesignItem[];
    loading: boolean;
    onDelete?: (id: string, name: string) => void;
}

export function RecentDesignsWidget({ designs, loading, onDelete }: RecentDesignsWidgetProps) {
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

            <div className="p-6 flex-1 bg-slate-50/50">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-[1.75/1] bg-slate-200 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : designs.length === 0 ? (
                    <div className="text-center text-slate-500 py-6">
                        <p>No saved designs yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {designs.slice(0, 4).map((design: any) => (
                            <SavedCard
                                key={design.id}
                                design={design}
                                onDelete={(id, name) => onDelete?.(id, name)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
