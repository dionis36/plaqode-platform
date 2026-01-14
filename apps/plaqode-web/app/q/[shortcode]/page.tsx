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
        if ((redirectSettings?.show_preview === false || redirectSettings?.delay === 0) && urlDetails?.destination_url) {
            redirect(urlDetails.destination_url);
        }

        // Render the specialized SmartLandingPage (Client Component)
        return <SmartLandingPage qrCode={data} />;
    }

    return <ViewerClient data={data} />;
}
