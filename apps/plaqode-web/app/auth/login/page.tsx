'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo, toast } from "@plaqode-platform/ui";

export default function LoginPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </React.Suspense>
    );
}

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password, redirect || undefined);
            toast.success('Welcome back!');
        } catch (err: any) {
            toast.error(err.message || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full bg-white p-2 md:p-4 flex overflow-hidden">
            <div className="hidden lg:flex w-[50%] h-full bg-dark rounded-2xl relative overflow-hidden flex-col justify-between p-8 text-white">

                {/* Background Art - Replicating the vibrant flow */}
                <div className="absolute inset-0 bg-dark z-0">
                    {/* Base texture */}
                    <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-40 mix-blend-overlay"></div>

                    {/* Vibrant Gradients simulating the reference waves */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary blur-[100px] opacity-10 translate-y-1/3 -translate-x-1/3 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-full h-[300px] bg-gradient-to-r from-secondary via-purple-500 to-primary blur-[80px] opacity-10 -translate-x-1/2 -translate-y-1/2 rotate-45 transform"></div>
                </div>

                {/* Top Content: Logo Placeholder or Brand Label */}
                {/* Top Content: Logo */}
                <div className="relative z-10">
                    <Logo color="white" />
                </div>

                {/* Bottom Content: QR Code Text */}
                <div className="relative z-10 mt-auto">
                    <h1 className="font-merriweather font-bold text-5xl md:text-7xl leading-none mb-6 tracking-tight">
                        Manage your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                            QR Codes
                        </span>
                    </h1>
                    <p className="font-sans text-xl text-gray-300/80 max-w-[80%] leading-relaxed font-light">
                        Next-generation solutions making connections secure, fast, and reliable.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 h-full bg-white relative flex flex-col items-center justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="w-full max-w-md px-8">
                    <div className="text-center mb-10">
                        <h2 className="font-merriweather text-4xl text-dark mb-3">Welcome Back</h2>
                        <p className="text-text font-sans">Enter your details to access your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
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

                            <div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition text-dark placeholder-gray-500 font-sans font-medium"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-secondary focus:ring-secondary" />
                                <span className="text-sm text-text font-sans">Remember me</span>
                            </label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm font-bold text-dark hover:text-secondary transition-colors font-sans"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-black text-white rounded-2xl font-bold font-sans hover:opacity-80 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-black/10"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>


                    </form>

                    <div className="mt-8 text-center text-sm text-text font-sans">
                        Don't have an account?{' '}
                        <a href="/auth/signup" className="text-dark font-bold hover:text-secondary transition-colors">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

