'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Use the EXACT same dynamic import strategy as the main page
const LiveQrPreview = dynamic(
    () => import('@/components/wizard/preview/LiveQrPreview').then(mod => mod.LiveQrPreview),
    {
        ssr: false,
        loading: () => <div className="text-amber-500">Loading Preview Module...</div>
    }
);

export default function PreviewDebugPage() {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-purple-600">🎨 Preview Component Debug</h1>
            <p className="mb-4">This page isolates the LiveQrPreview component.</p>

            <div className="w-64 h-64 border-2 border-dashed border-slate-300 rounded-xl mx-auto flex items-center justify-center">
                <Suspense fallback={<div>Suspense Loading...</div>}>
                    <LiveQrPreview />
                </Suspense>
            </div>
        </div>
    );
}
