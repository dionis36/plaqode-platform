'use client';

import { useState } from 'react';
import { Modal } from "@plaqode-platform/ui";
import { LogIn, QrCode, UserPlus, Lock } from "lucide-react";
import { env } from "@/lib/env";

interface QRAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QRAuthModal({ isOpen, onClose }: QRAuthModalProps) {
    const [isLoading, setIsLoading] = useState(false); // Added isLoading state

    const handleLogin = () => {
        setIsLoading(true); // Set loading state
        try {
            // Redirect to platform login
            window.location.href = `${env.NEXT_PUBLIC_AUTH_SERVICE_URL}/login?from=qrstudio&redirect=${encodeURIComponent(window.location.href)}`;
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleSignup = () => {
        setIsLoading(true); // Set loading state
        try {
            window.location.href = `${env.NEXT_PUBLIC_PLATFORM_URL}/auth/signup?from=qrstudio&redirect=${encodeURIComponent(window.location.href)}`;
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
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
                    Sign in Required
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-[80%]">
                    Create a free account or login to create your QR code.
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
                        Continue as Guest
                    </button>
                </div>
            </div>
        </Modal>
    );
}
