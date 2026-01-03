import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for auth token (matches plaqode-web implementation)
    const token = request.cookies.get('access_token')?.value;

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        const webUrl = env.NEXT_PUBLIC_PLATFORM_URL;

        // 1. Unauthenticated: No token present
        if (!token) {
            const loginUrl = new URL('/auth/login', webUrl);
            loginUrl.searchParams.set('redirect', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // 2. Authorization: Check Roles (RBAC)
        try {
            // JWT Structure: header.payload.signature
            // We need the payload (2nd part)
            const payloadPart = token.split('.')[1];
            if (!payloadPart) throw new Error('Invalid token');

            // Decode Base64 (atob is available in Edge Runtime)
            const decodedPayload = JSON.parse(atob(payloadPart));

            // Extract roles - handle case sensitivity just in case
            // The structure we saw in grep was `roles: string[]`
            const roles = Array.isArray(decodedPayload.roles) ? decodedPayload.roles : [];

            const isAdmin = roles.some((role: string) =>
                ['admin', 'superadmin'].includes(role.toLowerCase())
            );

            // If user is NOT an admin, redirect them to their User Dashboard
            if (!isAdmin) {
                // Redirecting to /app (Dashboard) keeps them in their authorized flow
                // and avoids the "logged out" feeling of the home page.
                return NextResponse.redirect(new URL('/app', webUrl));
            }

        } catch (error) {
            // Safety net: If token is malformed or decoding fails, 
            // force re-authentication rather than risking unauthorized access.
            const loginUrl = new URL('/auth/login', webUrl);
            loginUrl.searchParams.set('redirect', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    // Only run on admin routes to save resources
    matcher: ['/admin/:path*'],
};
