import { NextRequest, NextResponse } from 'next/server';
import { getCuratedPhotos } from '@/lib/pexelsService';

/**
 * API Proxy for Pexels Curated Photos
 * Protects API key by keeping it server-side
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '20');

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
        const results = await getCuratedPhotos(page, perPage);
        return NextResponse.json(results);
    } catch (error) {
        console.error('Failed to get curated photos:', error);
        return NextResponse.json(
            { error: 'Failed to get curated photos' },
            { status: 500 }
        );
    }
}
