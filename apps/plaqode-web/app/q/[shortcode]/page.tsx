import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import { SmartLandingPage } from '@/components/redirect/SmartLandingPage';
import { env } from '@/lib/env';
import { ViewerClient } from './client';

interface PageProps {
    params: {
        shortcode: string;
    };
}

async function getQrData(shortcode: string) {
    const MAX_RETRIES = 3;
    const INITIAL_DELAY = 800;

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const res = await fetch(`${env.NEXT_PUBLIC_QRSTUDIO_API_URL}/q/${shortcode}`, {
                next: { revalidate: 0 }, // No cache for real-time updates
                signal: AbortSignal.timeout(8000) // 8s timeout per request
            });

            if (res.ok) {
                const json = await res.json();
                return json.success ? json.data : null;
            }

            // If 404, return null immediately (resource not found), don't retry
            if (res.status === 404) return null;

            // For 5xx errors or other non-ok statuses, iterate to retry
            console.warn(`Attempt ${i + 1}: Fetch failed with status ${res.status}`);
        } catch (error) {
            console.warn(`Attempt ${i + 1}: Fetch network error`, error);
        }

        // Wait before retry (backoff), but not after the last attempt
        if (i < MAX_RETRIES - 1) {
            await new Promise(resolve => setTimeout(resolve, INITIAL_DELAY * Math.pow(1.5, i)));
        }
    }

    return null;
}

async function recordScan(shortcode: string) {
    try {
        const { headers } = await import('next/headers');
        const list = headers();
        const userAgent = list.get('user-agent') || 'Unknown';
        const referrer = list.get('referer') || '';
        const ip = list.get('x-forwarded-for') || list.get('x-real-ip') || 'Unknown';

        // Fire and forget (don't await to avoid delaying redirect too much, 
        // though Vercel functions might kill it if not awaited. 
        // Best practice is to await but keep timeout short).
        await fetch(`${env.NEXT_PUBLIC_QRSTUDIO_API_URL}/analytics/scan/${shortcode}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': userAgent,
                'X-Forwarded-For': ip
            },
            body: JSON.stringify({
                timezone: 'UTC', // Best guess for server-side
                url: `https://plaqode.com/q/${shortcode}`, // Approximate
                referrer: referrer
            }),
            signal: AbortSignal.timeout(2000) // 2s max timeout
        });
    } catch (err) {
        console.error('Failed to record server-side scan', err);
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const data = await getQrData(params.shortcode);

    if (!data) {
        return {
            title: 'QR Code Not Found',
        };
    }

    return {
        title: data.name || 'View QR Code',
        description: `View contents of ${data.name}`,
    };
}

export default async function MockupViewerPage({ params }: PageProps) {
    const data = await getQrData(params.shortcode);

    if (!data) {
        notFound();
    }

    // Server Action to record scan analytics (optional, can be done in client)
    // For now we trust the client component to handle rendering

    // 3. URL Type Handling (Server-Side Logic for Speed & Correctness)
    if (data.type === 'url') {
        const urlDetails = data.payload?.url_details;
        const redirectSettings = data.payload?.redirect_settings;

        // server-side instant redirect
        // server-side instant redirect
        if ((redirectSettings?.show_preview === false || redirectSettings?.delay === 0) && urlDetails?.destination_url) {
            // Must await to ensure analytics are recorded before the response terminates
            await recordScan(params.shortcode);
            redirect(urlDetails.destination_url);
        }

        // Render the specialized SmartLandingPage (Client Component)
        // Render the specialized SmartLandingPage (Client Component)
        // Also record scan for non-instant redirects to ensure consistency
        await recordScan(params.shortcode);
        return <SmartLandingPage qrCode={data} />;
    }

    return <ViewerClient data={data} />;
}
