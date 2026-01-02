import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for auth token (matches plaqode-web implementation)
    const token = request.cookies.get('access_token')?.value;

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        if (!token) {
            // Redirect to main platform login
            // Use environment variable or default to localhost:3000
            const webUrl = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || 'http://localhost:3000';
            const loginUrl = new URL('/auth/login', webUrl);

            // Add redirect param so user can return (if auth flow supports it)
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
