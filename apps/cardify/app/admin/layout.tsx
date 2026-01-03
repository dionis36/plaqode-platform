"use client";

import { useAuth } from '@/lib/auth-context';
import { env } from '@/lib/env';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // Not logged in -> Redirect to login
                // We use window.location to ensure full refresh/exit from current state if needed,
                // but router.push is usually fine.
                const HOME_URL = env.NEXT_PUBLIC_PLATFORM_URL;
                window.location.href = `${HOME_URL}/auth/login`;
            } else if (!user.roles.includes('admin') && !user.roles.includes('superadmin')) {
                // Logged in but not admin -> Redirect to home
                router.push('/');
            } else {
                // Authorized
                setIsAuthorized(true);
            }
        }
    }, [user, loading, router]);

    if (loading || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                    <p className="text-gray-500 font-medium">Verifying access...</p>
                </div>
            </div>
        );
    }

    // Render children if authorized
    return <>{children}</>;
}
