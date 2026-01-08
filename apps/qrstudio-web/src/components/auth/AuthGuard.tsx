'use client';

import { useAuth } from '@/lib/auth-context';
import { env } from '@/lib/env';
import { useEffect } from 'react';
import { UniversalLoader } from '@plaqode-platform/ui';

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
        return <UniversalLoader variant="page" center text="Verifying access..." />;
    }

    if (!user || !hasQrStudioAccess) {
        return null; // Effect will handle redirect
    }

    return <>{children}</>;
}
