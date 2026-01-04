'use client';

import { PhoneMockup } from '@/components/common/PhoneMockup';

export default function MockupDebugPage() {
    return (
        <div className="p-10 bg-slate-100 min-h-screen">
            <h1 className="text-2xl font-bold text-red-600 mb-8">📱 PhoneMockup Debug</h1>

            <p className="mb-4">This page tests if PhoneMockup crashes without a provider.</p>

            <div className="flex justify-center">
                <PhoneMockup>
                    <div className="p-4 text-center">
                        <p>Mockup Content</p>
                    </div>
                </PhoneMockup>
            </div>
        </div>
    );
}
