"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onClose?: () => void;
}

export default function SuccessModal({
    isOpen,
    title,
    message,
    onClose,
}: SuccessModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center animate-fadeIn p-4"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-sm w-full animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-center mb-6">
                    {message}
                </p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-green-500 animate-[width_1.5s_linear_forwards]" style={{ width: '0%' }} />
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes width { from { width: 0%; } to { width: 100%; } }
            `}</style>
        </div>
    );
}
