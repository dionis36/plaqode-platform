'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Logo, toast } from "@plaqode-platform/ui";

export default function ForgotPasswordPage() {
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
                        Recover your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                            Access
                        </span>
                    </h1>
                    <p className="font-sans text-xl text-gray-300/80 max-w-[80%] leading-relaxed font-light">
                        Securely reset your password and get back to managing your smart connections.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 h-full bg-white relative flex flex-col items-center justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="w-full max-w-md px-8">
                    <div className="text-center mb-10">
                        <h2 className="font-merriweather text-4xl text-dark mb-3">Forgot Password?</h2>
                        <p className="text-text font-sans">Enter your email to receive a reset link</p>
                    </div>

                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
}

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await resetPassword(email);
            toast.success('If an account exists for this email, you will receive a reset link shortly.');
            setEmail('');
        } catch (err: any) {
            toast.error(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition text-dark placeholder-gray-500 font-sans font-medium"
                    placeholder="Email Address"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold font-sans hover:opacity-80 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-black/10"
            >
                {loading ? 'Sending Link...' : 'Send Reset Link'}
            </button>

            <div className="text-center">
                <Link
                    href="/auth/login"
                    className="text-sm font-bold text-dark hover:text-secondary transition-colors font-sans"
                >
                    Back to Login
                </Link>
            </div>
        </form>
    );
}
