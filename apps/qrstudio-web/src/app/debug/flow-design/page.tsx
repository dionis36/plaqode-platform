'use client';

import { useRouter } from 'next/navigation';
import { useWizardStore } from '@/components/wizard/store';
import { useEffect, useState } from 'react';

export default function FlowDesignPage() {
    const router = useRouter();
    const { payload } = useWizardStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="p-10">Loading...</div>;

    return (
        <div className="p-10 max-w-md mx-auto mt-10 border rounded shadow-lg bg-white">
            <h1 className="text-2xl font-bold mb-4 text-green-600">✅ Trace Flow: Design (Success)</h1>
            <p className="mb-6 text-gray-600">If you are seeing this, the navigation and state passing WORKED.</p>

            <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="font-bold text-sm text-gray-700 mb-2">Stored Data:</h3>
                    <pre className="text-xs overflow-auto">
                        {JSON.stringify(payload.url_details, null, 2)}
                    </pre>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => router.push('/debug/flow-start')}
                        className="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Start Over
                    </button>
                    <button
                        onClick={() => router.push('/debug/design-replica')}
                        className="flex-1 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        Try Full Replica
                    </button>
                </div>
            </div>
        </div>
    );
}
