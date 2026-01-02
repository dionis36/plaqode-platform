import React, { useState } from "react";
import { CardTemplate } from "@/types/template";
import Link from "next/link";
import TemplatePreview from "./TemplatePreview";
import { Edit, Trash2, Star, EyeOff, Eye, Download, MoreVertical } from "lucide-react";

interface AdminTemplateCardProps {
    template: CardTemplate;
    onDelete: (template: CardTemplate) => void;
    onToggleFeatured: (template: CardTemplate) => void;
    onTogglePublic?: (template: CardTemplate) => void;
    onExport: (template: CardTemplate) => void;
}

export default function AdminTemplateCard({
    template,
    onDelete,
    onToggleFeatured,
    onTogglePublic,
    onExport
}: AdminTemplateCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Helper to prevent navigation when clicking actions
    const handleAction = (e: React.MouseEvent, action: () => void) => {
        e.preventDefault();
        e.stopPropagation();
        action();
    };

    return (
        <Link
            href={`/admin/templates/${template.id}/edit`}
            className="group block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Visual Card Container */}
            <div className="relative aspect-[1.75/1] bg-gray-100 rounded-lg overflow-hidden mb-3 border border-gray-200 group-hover:shadow-md transition-all duration-300">
                <TemplatePreview template={template} />

                {/* Overlay for actions on hover */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center gap-3 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={(e) => handleAction(e, () => onExport(template))}
                        className="p-2 bg-white rounded-full text-slate-700 hover:text-green-600 hover:scale-110 transition-all shadow-lg"
                        title="Export JSON"
                    >
                        <Download size={18} />
                    </button>
                    {/* Visual cue for Edit */}
                    <div className="p-2 bg-white rounded-full text-blue-600 shadow-lg">
                        <Edit size={18} />
                    </div>
                </div>

                {/* Status Badges - Absolute inside card */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
                    {template.isFeatured && (
                        <span className="px-2 py-0.5 bg-yellow-400/90 text-yellow-900 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm backdrop-blur-sm">
                            Featured
                        </span>
                    )}
                    {!template.isPublic && (
                        <span className="px-2 py-0.5 bg-gray-800/90 text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm backdrop-blur-sm flex items-center gap-1">
                            <EyeOff size={10} /> Private
                        </span>
                    )}
                </div>
            </div>

            {/* Details Below Card */}
            <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1 pr-2">
                    <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {template.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {template.category}
                    </p>
                </div>

                {/* Quick Actions (Star/Delete) - Subtle next to title */}
                <div className={`flex gap-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={(e) => handleAction(e, () => onToggleFeatured(template))}
                        className={`p-1 rounded-md transition-colors ${template.isFeatured ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50'}`}
                        title={template.isFeatured ? "Unfeature" : "Feature"}
                    >
                        <Star size={14} className={template.isFeatured ? "fill-current" : ""} />
                    </button>
                    <button
                        onClick={(e) => handleAction(e, () => onDelete(template))}
                        className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
