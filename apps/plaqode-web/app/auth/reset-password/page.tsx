'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo, toast } from "@plaqode-platform/ui";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}

function ResetPasswordContent() {
    return (
        <div className="h-screen w-full bg-white p-2 md:p-4 flex overflow-hidden">
            <div className="hidden lg:flex w-[50%] h-full bg-dark rounded-2xl relative overflow-hidden flex-col justify-between p-8 text-white">

                {/* Background Art */}
                <div className="absolute inset-0 bg-dark z-0">
                    <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary blur-[100px] opacity-10 translate-y-1/3 -translate-x-1/3 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-full h-[300px] bg-gradient-to-r from-secondary via-purple-500 to-primary blur-[80px] opacity-10 -translate-x-1/2 -translate-y-1/2 rotate-45 transform"></div>
                </div>

                <div className="relative z-10">
                    <Logo color="white" />
                </div>

                <div className="relative z-10 mt-auto">
                    <h1 className="font-merriweather font-bold text-5xl md:text-7xl leading-none mb-6 tracking-tight">
                        Secure your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                            Account
                        </span>
                    </h1>
                    <p className="font-sans text-xl text-gray-300/80 max-w-[80%] leading-relaxed font-light">
                        Create a strong password to protect your digital identity.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 h-full bg-white relative flex flex-col items-center justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="w-full max-w-md px-8">
                    <div className="text-center mb-10">
                        <h2 className="font-merriweather text-4xl text-dark mb-3">Reset Password</h2>
                        <p className="text-text font-sans">Enter your new password below</p>
                    </div>

                    <ResetPasswordForm />
                </div>
            </div>
        </div>
    );
}

function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const { confirmPasswordReset } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setStatus('error');
            setMessage('Invalid or missing reset token.');
            return;
        }

        if (password !== confirmPassword) {
            setStatus('error');
            setMessage('Passwords do not match.');
            return;
        }

        if (password.length < 8) {
            setStatus('error');
            setMessage('Password must be at least 8 characters.');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            await confirmPasswordReset(password, token);
            setStatus('success');
            setMessage('Your password has been reset successfully.');
            // Optional: Auto redirect after few seconds
            setTimeout(() => router.push('/auth/login'), 2000);
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message || 'Failed to reset password. The link may have moved or expired.');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center space-y-6">
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl text-sm font-medium">
                    {message}
                </div>
                <p className="text-gray-500 text-sm">Redirecting to login...</p>
                <Link
                    href="/auth/login"
                    className="block w-full py-4 bg-black text-white rounded-2xl font-bold font-sans hover:opacity-80 transition-all duration-300 shadow-lg shadow-black/10"
                >
                    Login Now
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                    {message}
                </div>
            )}
            {!token && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl text-sm mb-4">
                    Missing reset token. Please check your email link.
                </div>
            )}

            <div className="space-y-5">
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition text-dark placeholder-gray-500 font-sans font-medium"
                        placeholder="New Password"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition text-dark placeholder-gray-500 font-sans font-medium"
                        placeholder="Confirm Password"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={status === 'loading' || !token}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold font-sans hover:opacity-80 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-black/10"
            >
                {status === 'loading' ? 'Resetting Password...' : 'Reset Password'}
            </button>
        </form>
    );
}
