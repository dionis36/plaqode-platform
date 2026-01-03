import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';


export async function GET() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch stats from QR Studio API
        const qrStudioApiUrl = process.env.NEXT_PUBLIC_QRSTUDIO_API_URL;
        if (!qrStudioApiUrl) {
            throw new Error('NEXT_PUBLIC_QRSTUDIO_API_URL is not defined');
        }
        const response = await fetch(
            `${qrStudioApiUrl}/dashboard/stats`,
            {
                headers: {
                    Cookie: `accessToken=${accessToken.value}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch QR Studio stats');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('QR Studio stats error:', error);
        // Return default stats on error
        return NextResponse.json(
            {
                success: true,
                data: {
                    totalQrCodes: 0,
                    activeQrCodes: 0,
                    totalScans: 0,
                    recentScans: 0,
                }
            },
            { status: 200 }
        );
    }
}
