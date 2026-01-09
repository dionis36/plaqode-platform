"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Undo, Redo, MoreVertical, RotateCcw, Menu, Save, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { env } from '@/lib/env';
import { useAuth } from "@/lib/auth-context";
import { GradientAvatar } from "@plaqode-platform/ui";

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
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleBack = () => {
        router.push("/templates");
    };

    return (
        <div className="lg:hidden fixed top-0 inset-x-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-3 safe-area-inset-top">
            {/* Left: Back, Undo, Redo */}
            <div className="flex items-center gap-1">

                <Link
                    href={env.NEXT_PUBLIC_PLATFORM_URL}
                    className="flex-shrink-0 -ml-1"
                    aria-label="Back to Home"
                >
                    <div className="relative w-8 h-8">
                        <Image
                            src="/img/qr-code-2.png"
                            alt="Plaqode"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

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
                {user ? (
                    <button
                        onClick={onShowMenu}
                        className="relative z-50 flex items-center gap-1 group pl-2"
                        aria-label="Menu"
                    >
                        <GradientAvatar
                            user={user}
                            logout={logout}
                            textColor="text-dark"
                            disableDropdown={true}
                            className="transform group-active:scale-95 transition-transform"
                        />
                        <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                            <MoreVertical size={12} className="text-slate-600" />
                        </div>
                    </button>
                ) : (
                    <button
                        onClick={onShowMenu}
                        className="p-2 text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-target"
                        aria-label="Menu"
                    >
                        <Menu size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}
