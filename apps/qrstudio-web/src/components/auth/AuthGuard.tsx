'use client';

import { useAuth } from '@/lib/auth-context';
import { env } from '@/lib/env';
import { useEffect } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { loading, user, hasQrStudioAccess } = useAuth();

    useEffect(() => {
        if (!loading && (!user || !hasQrStudioAccess)) {
            // Redirect to platform login
            const loginUrl = `${env.NEXT_PUBLIC_PLATFORM_URL}/auth/login?redirect=${encodeURIComponent(window.location.href)}`;
            window.location.href = loginUrl;
        }
    }, [loading, user, hasQrStudioAccess]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!user || !hasQrStudioAccess) {
        return null; // Effect will handle redirect
    }

    return <>{children}</>;
}
