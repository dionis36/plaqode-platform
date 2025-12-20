'use client';

import { useAuth } from '@/lib/auth-context';
import { PlatformNav } from './PlatformNav';

export function PlatformNavWrapper() {
    const { user } = useAuth();

    const handleLogout = async () => {
        // Call logout endpoint
        try {
            await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }

        // Redirect to platform login
        window.location.href = `${process.env.NEXT_PUBLIC_PLATFORM_URL}/auth/login`;
    };

    return (
        <PlatformNav
            user={user ? {
                email: user.email,
                name: user.name,
                roles: user.roles || []
            } : null}
            onLogout={handleLogout}
        />
    );
}
