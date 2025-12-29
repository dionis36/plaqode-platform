"use client";

import React from "react";
import Image from "next/image";
import { Undo, Redo, MoreVertical, RotateCcw, Menu, Save, Download } from "lucide-react";
import { useRouter } from "next/navigation";

interface MobileEditorTopbarProps {
    templateName: string;
    onUndo: () => void;
    onRedo: () => void;
    onExport: () => void;
    onReset: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onShowMenu?: () => void;
    onSave?: () => void;
    saving?: boolean;
}

export default function MobileEditorTopbar({
    templateName,
    onUndo,
    onRedo,
    onExport,
    onReset,
    canUndo,
    canRedo,
    onShowMenu,
    onSave,
    saving = false,
}: MobileEditorTopbarProps) {
    const router = useRouter();

    const handleBack = () => {
        router.push("/templates");
    };

    return (
        <div className="lg:hidden fixed top-0 inset-x-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-3 safe-area-inset-top">
            {/* Left: Back, Undo, Redo */}
            <div className="flex items-center gap-1">
                <button
                    onClick={handleBack}
                    className="p-1 -ml-1 rounded-lg transition-transform active:scale-95 touch-target"
                    aria-label="Back to templates"
                >
                    <div className="relative w-8 h-8">
                        <Image
                            src="/img/qr-code-2.png"
                            alt="Plaqode"
                            fill
                            className="object-contain"
                        />
                    </div>
                </button>

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-gray-200 mx-0.5"></div>

                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className={`p-2 rounded-lg transition-colors touch-target ${canUndo
                        ? "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                        : "text-gray-300 cursor-not-allowed"
                        }`}
                    aria-label="Undo"
                >
                    <Undo size={18} />
                </button>
                <button
                    onClick={onRedo}
                    disabled={!canRedo}
                    className={`p-2 rounded-lg transition-colors touch-target ${canRedo
                        ? "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                        : "text-gray-300 cursor-not-allowed"
                        }`}
                    aria-label="Redo"
                >
                    <Redo size={18} />
                </button>
                <button
                    onClick={onReset}
                    className="p-2 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-lg transition-colors touch-target"
                    aria-label="Reset"
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            {/* Right: Save, Export */}
            <div className="flex items-center gap-2">
                {/* Save Button */}
                <button
                    onClick={onSave}
                    disabled={saving}
                    className="p-2 text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-target disabled:opacity-50"
                    aria-label="Save"
                >
                    <Save size={20} className={saving ? "animate-pulse" : ""} />
                </button>

                {/* Export Button (Icon Only) */}
                <button
                    onClick={onExport}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors touch-target"
                    aria-label="Export"
                >
                    <Download size={20} />
                </button>

                {/* Menu Toggle */}
                <button
                    onClick={onShowMenu}
                    className="p-2 text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-target"
                    aria-label="Menu"
                >
                    <Menu size={20} />
                </button>
            </div>
        </div>
    );
}
