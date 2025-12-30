'use client';

const PLATFORM_URL = 'http://localhost:3000';

interface ExportAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveBeforeAuth?: () => Promise<void>; // Callback to save design before auth
}

import { Modal } from "@plaqode-platform/ui";
import { LogIn } from "lucide-react";

export function ExportAuthModal({ isOpen, onClose, onSaveBeforeAuth }: ExportAuthModalProps) {
    const handleLogin = async () => {
        if (onSaveBeforeAuth) {
            try {
                await onSaveBeforeAuth();
            } catch (error) {
                console.error('Failed to save design before login:', error);
            }
        }
        const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
        window.location.href = `${PLATFORM_URL}/auth/login?redirect=${currentUrl}`;
    };

    const handleSignup = async () => {
        if (onSaveBeforeAuth) {
            try {
                await onSaveBeforeAuth();
            } catch (error) {
                console.error('Failed to save design before signup:', error);
            }
        }
        window.location.href = `${PLATFORM_URL}/auth/signup`;
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Login Required"
            size="sm"
        >
            <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LogIn className="w-8 h-8 text-purple-600" />
                </div>

                <p className="text-gray-600 mb-6 font-sans">
                    Please login or create a free account to export your design
                </p>

                <div className="space-y-3">
                    <button
                        onClick={handleLogin}
                        className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                    >
                        Login to Export
                    </button>
                    <button
                        onClick={handleSignup}
                        className="w-full px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium"
                    >
                        Create Free Account
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 text-gray-600 hover:text-gray-900 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}
