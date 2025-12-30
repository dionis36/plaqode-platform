"use client";

import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import clsx from "clsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    description?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    noPadding?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    children,
    title,
    description,
    size = "md",
    noPadding = false
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const hasOpenRef = useRef(false);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

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
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[calc(100%-2rem)]"
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-300 ease-out p-4"
            onClick={handleBackdropClick}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
            }}
        >
            <div
                ref={modalRef}
                className={clsx(
                    "bg-white rounded-2xl shadow-2xl w-full mx-auto animate-in zoom-in-95 duration-300 ease-out relative max-h-[90vh] flex flex-col overflow-hidden",
                    sizeClasses[size]
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || description) && (
                    <div className="px-6 py-5 border-b border-gray-100 flex-shrink-0">
                        <div className="flex items-start justify-between">
                            <div>
                                {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
                                {description && <p className="text-gray-500 mt-1 text-sm">{description}</p>}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Close button if no header */}
                {!title && !description && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-1 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                {/* Content */}
                <div className={clsx("overflow-y-auto", noPadding ? "" : "p-6")}>
                    {children}
                </div>
            </div>
        </div >,
        document.body
    );
}
