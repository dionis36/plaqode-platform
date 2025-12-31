'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    name?: string;
    roles: string[];
    products: string[];
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, redirectUrl?: string) => Promise<void>;
    signup: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => Promise<void>;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    hasProduct: (product: string) => boolean;
    resetPassword: (email: string) => Promise<void>;
    confirmPasswordReset: (password: string, token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/me`, {
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string, redirectUrl?: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        const data = await response.json();
        setUser(data.user);

        // Validate and use redirect URL if provided
        if (redirectUrl && isValidRedirect(redirectUrl)) {
            window.location.href = decodeURIComponent(redirectUrl);
        } else {
            // Default to dashboard using client-side routing to preserve toast
            router.push('/app');
        }
    };

    // Validate redirect URLs to prevent open redirect attacks
    const isValidRedirect = (url: string): boolean => {
        try {
            const decoded = decodeURIComponent(url);
            const parsed = new URL(decoded);

            // Allow only our own domains
            const allowedHosts = [
                'localhost:3002', // Cardify dev
                'localhost:3003', // QR Studio dev  
            ];

            // Check if host matches any allowed host
            return allowedHosts.some(host => parsed.host === host);
        } catch {
            return false;
        }
    };

    const signup = async (email: string, password: string, name?: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Signup failed');
        }

        const data = await response.json();
        setUser(data.user);

        // Auto-login after signup
        router.push('/app');
    };

    const logout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        setUser(null);
        router.push('/');
    };

    const resetPassword = async (email: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            // We generally don't want to expose if email failed due to non-existence, but the backend handles that.
            // If it fails here, it's likely a 400 or 500.
            const error = await response.json();
            throw new Error(error.error || 'Failed to request password reset');
        }
    };

    const confirmPasswordReset = async (password: string, token: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, token }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to reset password');
        }
    };

    const isSuperAdmin = user?.roles.includes('superadmin') || false;
    const isAdmin = user?.roles.includes('admin') || isSuperAdmin;
    const hasProduct = (product: string) => user?.products.includes(product) || false;

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin, isSuperAdmin, hasProduct, resetPassword, confirmPasswordReset }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
