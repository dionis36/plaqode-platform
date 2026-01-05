'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnalyticsContent } from '@/components/analytics/AnalyticsContent';

// Wrapper to handle Suspense for useSearchParams
function AnalyticsPageContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!id) {
        return (
            <div className="p-8 text-center text-red-600">
                <h1 className="text-2xl font-bold">Error: Missing ID</h1>
                <p>Please provide a QR Code ID in the URL (e.g., ?id=...)</p>
            </div>
        );
    }

    return <AnalyticsContent id={id} />;
}

export default function AnalyticsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <AnalyticsPageContent />
        </Suspense>
    );
}
