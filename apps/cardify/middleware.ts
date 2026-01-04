import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for auth token (matches plaqode-web implementation)
    const token = request.cookies.get('access_token')?.value;

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        // PROTECTION MOVED TO CLIENT-SIDE (Due to Cross-Domain Cookies)
        // Middleware cannot see the Fly.io cookies, so we must allow the request
        // and let the client-side useAuth() hook handle the protection.

        // Note: Real security is enforced by the API (Backend) which DOES see the cookies.
        // If the client fetches /admin data without a cookie, the Backend returns 401.
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    // Only run on admin routes to save resources
    matcher: ['/admin/:path*'],
};
