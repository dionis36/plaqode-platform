'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useNavVisibility } from './NavVisibilityContext';
// import { PlatformNav } from './PlatformNav';
import StaticNavbar from './StaticNavbar';

export function PlatformNavWrapper() {
    const { user } = useAuth();
    const { isVisible } = useNavVisibility();

    if (!isVisible) return null;

    // Always use StaticNavbar for the app
    return <StaticNavbar />;
}
