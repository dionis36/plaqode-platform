import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import TemplatePreview from '@/components/app/TemplatePreview';
import { CardTemplate } from '@/types/template';

interface SavedDesign {
    id: string;
    name: string;
    templateId: string;
    thumbnail?: string;
    designData?: any; // Content for live rendering
    createdAt: string;
    updatedAt: string;
    userId: string;
}

interface SavedCardProps {
    design: SavedDesign;
}

export default function SavedCard({ design }: SavedCardProps) {
    // strict PLATFORM URL usage for consistency
    const EDITOR_URL = process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002';

    // Extract current page template from designData
    const template: CardTemplate | null = design.designData?.pages?.[design.designData.current || 0] || null;

    return (
        <a
            href={`${EDITOR_URL}/design/${design.templateId}?loadId=${design.id}`}
            className="block group"
        >
            <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
                {/* Thumbnail Container - Aspect Ratio 1.75:1 (Standard Business Card) */}
                <div className="relative aspect-[1.75/1] w-full bg-gray-100 overflow-hidden border-b border-slate-100">
                    {template ? (
                        <TemplatePreview template={template} />
                    ) : design.thumbnail ? (
                        <img
                            src={design.thumbnail}
                            alt={design.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                            <span className="text-sm">No Preview</span>
                        </div>
                    )}

                    {/* Hover Overlay - Subtle tint matching TemplateCard */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Footer with User Details (Requested Feature) */}
                <div className="p-4 bg-white">
                    <h3 className="font-semibold text-slate-900 truncate group-hover:text-purple-600 transition-colors mb-2 text-base font-merriweather">
                        {design.name}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-sans">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            <span>{new Date(design.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {/* Assuming current user context, but just generic 'Saved' label or user ID if needed */}
                            <span className="px-2 py-0.5 bg-slate-100 rounded-full text-slate-600 font-medium">
                                Saved
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
