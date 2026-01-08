'use client';

import { useAuth } from '@/lib/auth-context';
import { UniversalLoader } from '@plaqode-platform/ui';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { loading, user, hasCardifyAccess } = useAuth();

    if (loading) {
        return <UniversalLoader variant="page" center text="Verifying access..." />;

    }

    if (!user || !hasCardifyAccess) {
        return null; // Will redirect in AuthProvider
    }

    return <>{children}</>;
}
