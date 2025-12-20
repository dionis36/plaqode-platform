import { NextRequest, NextResponse } from 'next/server';
import { searchPhotos } from '@/lib/pexelsService';

/**
 * API Proxy for Pexels Image Search
 * Protects API key by keeping it server-side
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '20');

        // Validate query
        if (!query || query.trim().length === 0) {
            return NextResponse.json(
                { error: 'Search query is required' },
                { status: 400 }
            );
        }

        if (query.length > 100) {
            return NextResponse.json(
                { error: 'Query too long (max 100 characters)' },
                { status: 400 }
            );
        }

        // Validate pagination
        if (page < 1 || page > 100) {
            return NextResponse.json(
                { error: 'Page must be between 1 and 100' },
                { status: 400 }
            );
        }

        if (perPage < 1 || perPage > 80) {
            return NextResponse.json(
                { error: 'Per page must be between 1 and 80' },
                { status: 400 }
            );
        }

        // Call Pexels API (server-side)
        const results = await searchPhotos(query, page, perPage);
        return NextResponse.json(results);
    } catch (error) {
        console.error('Image search failed:', error);
        return NextResponse.json(
            { error: 'Failed to search images' },
            { status: 500 }
        );
    }
}
