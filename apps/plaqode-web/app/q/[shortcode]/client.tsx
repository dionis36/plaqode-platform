'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { env } from '@/lib/env';

// Import preview components dynamically
// These components are now ported to strictly handle the 'data' structure
const WifiPreview = dynamic(() => import('@/components/preview/WiFiPreview').then(mod => mod.WiFiPreview));
const VCardPreview = dynamic(() => import('@/components/preview/VCardPreview').then(mod => mod.VCardPreview));
const UrlPreview = dynamic(() => import('@/components/preview/URLPreview').then(mod => mod.URLPreview));
const TextPreview = dynamic(() => import('@/components/preview/TextPreview').then(mod => mod.TextPreview));

interface ViewerClientProps {
    data: any;
}

export function ViewerClient({ data }: ViewerClientProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (data?.shortcode) {
            recordScan(data.shortcode);
        }
    }, [data?.shortcode]);

    async function recordScan(shortcode: string) {
        try {
            await fetch(`${env.NEXT_PUBLIC_QRSTUDIO_API_URL}/analytics/scan/${shortcode}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    url: window.location.href,
                    referrer: document.referrer
                })
            });
        } catch (err) {
            console.error('Failed to record scan', err);
        }
    }

    if (!mounted) return null;

    // The data object contains all fields (type, styles, personal_info, etc.) at root
    const { type } = data || {};

    // Components handle their own responsiveness, but we provide a wrapper 
    // to ensure full height and consistent background if needed

    const renderContent = () => {
        switch (type) {
            case 'wifi':
                return <WifiPreview data={data} />;
            case 'vcard':
                return <VCardPreview data={data} />;
            case 'url':
                return <UrlPreview data={data} />;
            case 'text':
                return <TextPreview data={data} />;
            default:
                // Fallback for unhandled types
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-8 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl mb-4">
                            📱
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 mb-2">Scan Successful</h1>
                        <p className="text-slate-500 mb-8">
                            This content type ({type}) is not yet supported in the mobile viewer.
                        </p>
                        <div className="w-full max-w-md p-4 bg-white rounded-lg text-left overflow-auto max-h-60 text-xs font-mono border border-slate-200 mx-auto shadow-sm">
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-100">
            {/* Components will take full width/height of this container */}
            {renderContent()}
        </div>
    );
}
