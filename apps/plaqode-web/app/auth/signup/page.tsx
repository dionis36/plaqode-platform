'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await signup(email, password, name || undefined);
            // Redirect is handled in the signup function
        } catch (err: any) {
            setError(err.message || 'Signup failed');
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full bg-white p-2 md:p-4 flex overflow-hidden">

            {/* Left Side - The "Image" / Artistic Panel 
                - Takes 45% width as requested, matching Login Page exactly
                - Reduced radius (rounded-2xl)
                - Reduced margins (via parent p-2 md:p-4)
            */}
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

                {/* Top Content: Logo */}
                <div className="relative z-10">
                    <Logo color="white" />
                </div>

                {/* Bottom Content: QR Code Text */}
                <div className="relative z-10 mt-auto">
                    <h1 className="font-merriweather font-bold text-5xl md:text-7xl leading-none mb-6 tracking-tight">
                        Join the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                            Revolution
                        </span>
                    </h1>
                    <p className="font-sans text-xl text-gray-300/80 max-w-[80%] leading-relaxed font-light">
                        Create an account to start managing your smart connections today.
                    </p>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 h-full bg-white relative flex flex-col items-center justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                <div className="w-full max-w-md px-8 py-8">
                    <div className="text-center mb-8">
                        <h2 className="font-merriweather text-4xl text-dark mb-3">Create Account</h2>
                        <p className="text-text font-sans">Enter your details to join Plaqode</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition text-dark placeholder-gray-500 font-sans font-medium"
                                    placeholder="Full Name"
                                />
                            </div>

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
                                        placeholder="Password (Min. 8 characters)"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="relative">
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
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-black text-white rounded-2xl font-bold font-sans hover:opacity-80 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-black/10 mt-4"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                    </form>

                    <div className="mt-8 text-center text-sm text-text font-sans">
                        Already have an account?{' '}
                        <a href="/auth/login" className="text-dark font-bold hover:text-secondary transition-colors">
                            Sign In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
