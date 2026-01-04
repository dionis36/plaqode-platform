import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('access_token')?.value;

    // Only protect /app routes (dashboard and admin)
    // All other routes (/, /auth/*, public pages) are accessible to everyone
    // PROTECTION MOVED TO CLIENT-SIDE (Due to Cross-Domain Cookies)
    // Middleware cannot see the Fly.io cookies, so we must allow the request
    // and let the client-side useAuth() hook handle the redirect if not logged in.
    return NextResponse.next();

    // Allow all other routes
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
