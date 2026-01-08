'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnalyticsContent } from '@/components/analytics/AnalyticsContent';
import { UniversalLoader, LoadingBoundary } from '@plaqode-platform/ui';

// Wrapper to handle Suspense for useSearchParams
function AnalyticsPageContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <LoadingBoundary
            isLoading={!mounted}
            size="lg"
            center={false}
            className="flex items-center justify-center min-h-screen"
        >
            {!id ? (
                <div className="p-8 text-center text-red-600">
                    <h1 className="text-2xl font-bold">Error: Missing ID</h1>
                    <p>Please provide a QR Code ID in the URL (e.g., ?id=...)</p>
                </div>
            ) : (
                <AnalyticsContent id={id} />
            )}
        </LoadingBoundary>
    );
}

export default function AnalyticsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <UniversalLoader size="lg" text="Loading analytics..." />
            </div>
        }>
            <AnalyticsPageContent />
        </Suspense>
    );
}
