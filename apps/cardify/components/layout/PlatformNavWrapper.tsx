'use client';

import { useAuth } from '@/lib/auth-context';
import { useNavVisibility } from './NavVisibilityContext';
// import { PlatformNav } from './PlatformNav';
import StaticNavbar from './StaticNavbar';
import { usePathname } from 'next/navigation';

export function PlatformNavWrapper() {
    const { user } = useAuth();
    const pathname = usePathname();
    const { isVisible } = useNavVisibility();

    // Hide PlatformNav (Dashboard Sidebar) on public templates page and design editor
    if (pathname?.startsWith('/templates') || pathname?.startsWith('/design') || !isVisible) {
        return null;
    }

    // Use StaticNavbar as the standard for Cardify app
    // For Admin pages (Light BG), use 'light' theme (Dark Text)
    // For other pages (Dark BG), use default 'dark' theme (Light Text)
    const isAdminPage = pathname?.startsWith('/admin');

    return <StaticNavbar theme={isAdminPage ? 'light' : 'dark'} />;
}
