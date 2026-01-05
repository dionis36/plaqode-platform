'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useWizardStore } from '@/components/wizard/store';

export default function FlowStartPage() {
    const router = useRouter();
    const { updatePayload } = useWizardStore();
    const [url, setUrl] = useState('');

    const handleNext = () => {
        // explicitly set the payload structure to ensure it exists
        updatePayload({
            url_details: {
                destination_url: url,
                title: 'Debug Title',
                description: 'Debug Desc',
                logo: ''
            }
        });

        // Navigate to the simple end page first to prove navigation works
        router.push('/debug/flow-design');
    };

    return (
        <div className="p-10 max-w-md mx-auto mt-10 border rounded shadow-lg bg-white">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">🐞 Trace Flow: Start</h1>
            <p className="mb-6 text-gray-600">This is a minimal input page. It does NOT use any complex components.</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Enter a URL:</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://example.com"
                    />
                </div>

                <div className="p-4 bg-yellow-50 text-yellow-800 rounded text-xs">
                    <strong>Note:</strong> Clicking Next will save this URL to the store and navigate to <code>/debug/flow-design</code>.
                </div>

                <button
                    onClick={handleNext}
                    disabled={!url}
                    className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Next Step ➔
                </button>
            </div>
        </div>
    );
}
