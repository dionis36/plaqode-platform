'use client';

import { createContext, useContext, useEffect, useState } from 'react';

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
    isAuthenticated: boolean;
    hasCardifyAccess: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/me`,
                { credentials: 'include' }
            );

            if (response.ok) {
                const data = await response.json();
                const userData = data.user;
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                // Don't redirect - just set as not authenticated
                // Public users can still use Cardify
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const hasCardifyAccess = user?.products.includes('cardify') || false;

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, hasCardifyAccess }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
