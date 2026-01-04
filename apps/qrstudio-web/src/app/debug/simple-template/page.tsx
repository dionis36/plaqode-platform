'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useWizardStore } from '@/components/wizard/store';

export default function SimpleTemplateDebugPage() {
    const router = useRouter();
    const { payload, updatePayload } = useWizardStore();
    const [url, setUrl] = useState('');

    const handleNext = () => {
        // manually update store
        updatePayload({
            url_details: {
                destination_url: url,
                title: '',
                description: '',
                logo: ''
            }
        });

        // Go to design replica
        router.push('/debug/design-replica');
    };

    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-purple-600">Simple Template Debug</h1>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Enter URL:</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="https://example.com"
                    />
                </div>

                <div className="p-4 bg-slate-100 rounded text-xs font-mono">
                    Current Store URL: {payload.url_details?.destination_url || 'empty'}
                </div>

                <button
                    onClick={handleNext}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Next (Go to Design Replica)
                </button>
            </div>
        </div>
    );
}
