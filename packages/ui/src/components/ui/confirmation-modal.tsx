"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Info, XCircle } from "lucide-react";
import clsx from "clsx";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = 'danger',
    isLoading = false
}: ConfirmationModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const hasOpenRef = useRef(false);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isLoading) onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose, isLoading]);

    // Handle body scroll
    useEffect(() => {
        if (isOpen) {
            hasOpenRef.current = true;
            document.body.style.overflow = 'hidden';
        } else if (hasOpenRef.current) {
            document.body.style.overflow = 'unset';
            hasOpenRef.current = false;
        }
        return () => {
            if (hasOpenRef.current) {
                document.body.style.overflow = 'unset';
            }
        };
    }, [isOpen]);

    // Handle click outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (isLoading) return;
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    // Icon and color based on variant
    const variantConfig = {
        danger: {
            icon: XCircle,
            iconColor: "text-red-500",
            buttonClass: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20",
            iconBg: "bg-red-50"
        },
        warning: {
            icon: AlertTriangle,
            iconColor: "text-amber-500",
            buttonClass: "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/20",
            iconBg: "bg-amber-50"
        },
        info: {
            icon: Info,
            iconColor: "text-blue-500",
            buttonClass: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20",
            iconBg: "bg-blue-50"
        }
    };

    const config = variantConfig[variant];
    const Icon = config.icon;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-300 ease-out"
            onClick={handleBackdropClick}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
            }}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-in zoom-in-95 duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon and Title */}
                <div className="flex flex-col items-center text-center">
                    <div className={clsx(config.iconBg, "p-3 rounded-full mb-4")}>
                        <Icon className={clsx("w-8 h-8", config.iconColor)} strokeWidth={2} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">{message}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 rounded-xl font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={clsx(
                                "flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2",
                                config.buttonClass
                            )}
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                confirmText
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
