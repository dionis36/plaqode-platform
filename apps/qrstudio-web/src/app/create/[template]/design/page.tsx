import { Suspense } from 'react';
import DesignClient from './DesignClient';

// Define the static params for build time generation
export async function generateStaticParams() {
    const templates = [
        'url', 'vcard', 'text', 'email', 'wifi',
        'event', 'file', 'appstore', 'socialmedia', 'menu', 'message'
    ];

    return templates.map((template) => ({
        template: template,
    }));
}

export const metadata = {
    title: 'Customize QR Design | QR Studio',
    description: 'Customize the colors, shape, and logo of your QR code.',
};

export default function DesignPage({ params }: { params: { template: string } }) {
    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        }>
            <DesignClient params={params} />
        </Suspense>
    );
}
