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
            <div className="relative bg-transparent rounded-xl overflow-hidden shadow-sm transition-all duration-300">
                {/* Thumbnail Container - Aspect Ratio 1.75:1 (Standard Business Card) */}
                <div className="relative aspect-[1.75/1] w-full bg-gray-100 overflow-hidden rounded-xl">
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

                    {/* Hover Overlay - Removed as per request */}
                </div>
            </div>
        </a>
    );
}
