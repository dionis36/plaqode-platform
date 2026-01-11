'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { env } from '@/lib/env';

// Loading Skeleton Component
function LoadingPreview() {
    return (
        <div className="flex-1 w-full h-full flex flex-col relative bg-slate-50">
            {/* Header Skeleton */}
            <div className="h-48 bg-slate-200 animate-pulse relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="w-20 h-20 bg-white/30 rounded-full mb-4" />
                    <div className="h-6 w-32 bg-white/30 rounded" />
                </div>
            </div>
            {/* Content Skeleton */}
            <div className="flex-1 px-6 space-y-4 -mt-6 relative z-10">
                <div className="h-24 bg-white rounded-2xl shadow-sm animate-pulse" />
                <div className="h-24 bg-white rounded-2xl shadow-sm animate-pulse" />
                <div className="h-12 bg-slate-200 rounded-xl animate-pulse mt-4" />
            </div>
        </div>
    );
}

// Import preview components dynamically with loading states
// These components are now ported to strictly handle the 'data' structure
const WifiPreview = dynamic(() => import('@/components/preview/WiFiPreview').then(mod => mod.WiFiPreview), { loading: () => <LoadingPreview /> });
const VCardPreview = dynamic(() => import('@/components/preview/VCardPreview').then(mod => mod.VCardPreview), { loading: () => <LoadingPreview /> });
const UrlPreview = dynamic(() => import('@/components/preview/URLPreview').then(mod => mod.URLPreview), { loading: () => <LoadingPreview /> });
const TextPreview = dynamic(() => import('@/components/preview/TextPreview').then(mod => mod.TextPreview), { loading: () => <LoadingPreview /> });
const AppStorePreview = dynamic(() => import('@/components/preview/AppStorePreview').then(mod => mod.AppStorePreview), { loading: () => <LoadingPreview /> });
const EmailPreview = dynamic(() => import('@/components/preview/EmailPreview').then(mod => mod.EmailPreview), { loading: () => <LoadingPreview /> });
const EventPreview = dynamic(() => import('@/components/preview/EventPreview').then(mod => mod.EventPreview), { loading: () => <LoadingPreview /> });
const MenuPreview = dynamic(() => import('@/components/preview/MenuPreview').then(mod => mod.MenuPreview), { loading: () => <LoadingPreview /> });
const MessagePreview = dynamic(() => import('@/components/preview/MessagePreview').then(mod => mod.MessagePreview), { loading: () => <LoadingPreview /> });
const PDFPreview = dynamic(() => import('@/components/preview/PDFPreview').then(mod => mod.PDFPreview), { loading: () => <LoadingPreview /> });
const SocialMediaPagePreview = dynamic(() => import('@/components/preview/SocialMediaPagePreview').then(mod => mod.SocialMediaPagePreview), { loading: () => <LoadingPreview /> });
const BusinessPagePreview = dynamic(() => import('@/components/qrcodes/preview/BusinessPagePreview').then(mod => mod.BusinessPagePreview), { loading: () => <LoadingPreview /> });

interface ViewerClientProps {
    data: any;
}

export function ViewerClient({ data }: ViewerClientProps) {
    useEffect(() => {
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

    // The data object contains all fields (type, styles, personal_info, etc.) at root
    const { type } = data || {};

    // Components handle their own responsiveness, but we provide a wrapper 
    // to ensure full height and consistent background if needed

    // Unwrap payload if it exists (standard backend response), otherwise use data as is (flat structure)
    const contentData = data?.payload ? { ...data.payload, ...data } : data;

    const renderContent = () => {
        switch (type) {
            case 'wifi':
                return <WifiPreview data={contentData} />;
            case 'vcard':
                return <VCardPreview data={contentData} />;
            case 'url':
                return <UrlPreview data={contentData} />;
            case 'text':
                return <TextPreview data={contentData} />;
            case 'appstore':
                return <AppStorePreview data={contentData} />;
            case 'email':
                return <EmailPreview data={contentData} />;
            case 'event':
                return <EventPreview data={contentData} />;
            case 'menu':
                return <MenuPreview data={contentData} />;
            case 'message':
                return <MessagePreview data={contentData} />;
            case 'file':
                return <PDFPreview data={contentData} />;
            case 'socialmedia':
                return <SocialMediaPagePreview data={contentData} />;
            case 'business':
                return <BusinessPagePreview data={contentData} />;
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
        <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center">
            {/* Desktop: Show as mobile app slice. Mobile: Full screen. */}
            <div className="w-full h-full min-h-screen sm:min-h-[auto] sm:h-auto sm:max-w-[400px] sm:aspect-[9/19.5] sm:max-h-[85vh] sm:rounded-3xl sm:shadow-2xl sm:overflow-hidden bg-white relative flex flex-col">
                {/* Scrollable content area */}
                <div className="absolute inset-0 overflow-y-auto no-scrollbar">
                    {renderContent()}
                </div>
            </div>

            {/* Hide scrollbar utility for this component */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
