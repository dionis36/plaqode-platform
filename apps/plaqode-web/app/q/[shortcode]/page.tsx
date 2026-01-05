import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { env } from '@/lib/env';
import { ViewerClient } from './client';

interface PageProps {
    params: {
        shortcode: string;
    };
}

async function getQrData(shortcode: string) {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_QRSTUDIO_API_URL}/q/${shortcode}`, {
            next: { revalidate: 0 } // No cache for real-time updates
        });

        if (!res.ok) return null;

        const json = await res.json();
        return json.success ? json.data : null;
    } catch (error) {
        console.error('Failed to fetch QR data:', error);
        return null;
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

    return <ViewerClient data={data} />;
}
