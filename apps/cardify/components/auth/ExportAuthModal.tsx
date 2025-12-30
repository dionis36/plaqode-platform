'use client';

const PLATFORM_URL = 'http://localhost:3000';

interface ExportAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveBeforeAuth?: () => Promise<void>; // Callback to save design before auth
}

import { Modal } from "@plaqode-platform/ui";
import { LogIn, Lock, ArrowRight, UserPlus } from "lucide-react";

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
            size="md"
        >
            <div className="flex flex-col items-center text-center pt-2">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                    <Lock className="w-8 h-8 text-blue-600" strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Sign in to Continue
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-[80%]">
                    Create a free account or login to save your design.
                </p>

                <div className="w-full max-w-sm space-y-4">
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={handleSignup}
                            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium flex items-center justify-center gap-2"
                        >
                            <UserPlus size={18} />
                            <span>Sign Up</span>
                        </button>

                        <button
                            onClick={handleLogin}
                            className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition font-medium text-xs"
                    >
                        Maybe Later
                    </button>
                </div>

            </div>
        </Modal>
    );
}
