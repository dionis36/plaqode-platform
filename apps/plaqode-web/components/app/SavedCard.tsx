import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Trash2 } from 'lucide-react';
import TemplatePreview from '@/components/app/TemplatePreview';
import { CardTemplate } from '@/types/template';
import { env } from '@/lib/env';

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
    onDelete: (id: string, name: string) => void;
}

export default function SavedCard({ design, onDelete }: SavedCardProps) {
    // strict PLATFORM URL usage for consistency
    const EDITOR_URL = env.NEXT_PUBLIC_CARDIFY_URL;

    // Extract current page template from designData
    const template: CardTemplate | null = design.designData?.pages?.[design.designData.current || 0] || null;

    return (
        <a
            href={`${EDITOR_URL}/design/${design.templateId}?loadId=${design.id}`}
            className="block group"
        >
            <div className="relative bg-transparent rounded-xl overflow-hidden shadow-sm transition-all duration-300">
                {/* Thumbnail Container - Aspect Ratio 1.75:1 (Standard Business Card) */}
                <div className="relative aspect-[1.75/1] w-full bg-gray-100 overflow-hidden rounded-xl">
                    {template && Array.isArray(template.layers) ? (
                        <TemplatePreview template={template} />
                    ) : design.thumbnail ? (
                        <Image
                            src={design.thumbnail}
                            alt={design.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                            <span className="text-sm">No Preview</span>
                        </div>
                    )}

                    {/* Delete Button - Top Right, Visible on Mobile, Group Hover on Desktop */}
                    <div className="absolute top-2 right-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-200 transform lg:translate-y-2 group-hover:translate-y-0 z-10">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onDelete(design.id, design.name);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors flex items-center justify-center w-8 h-8 cursor-pointer"
                            title="Delete Card"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>

                    {/* Hover Overlay - Removed as per request */}
                </div>
            </div>
        </a>
    );
}
