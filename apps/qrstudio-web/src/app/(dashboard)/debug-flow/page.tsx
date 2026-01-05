'use client';

import { useState } from 'react';
import { qrApi } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';

export default function DebugFlowPage() {
    const { user } = useAuth();
    const [id, setId] = useState('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [envCheck, setEnvCheck] = useState<any>(null);

    async function runDebug() {
        setLoading(true);
        setError(null);
        setResult(null);

        // 1. Check Environment
        const envs = {
            PLATFORM_URL: process.env.NEXT_PUBLIC_PLATFORM_URL,
            API_URL: process.env.NEXT_PUBLIC_QRSTUDIO_API_URL,
            IS_BROWSER: typeof window !== 'undefined',
        };
        setEnvCheck(envs);

        try {
            // 2. Fetch Data
            const res = await qrApi.getById(id.trim());
            setResult(res);
        } catch (err: any) {
            console.error(err);
            setError({
                message: err.message,
                stack: err.stack,
                str: String(err)
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">🕵️ Debug Flow Simulator</h1>

            {/* User Info */}
            <div className="bg-slate-100 p-4 rounded">
                <h2 className="font-bold">Current User</h2>
                <pre className="text-xs mt-2">{JSON.stringify(user, null, 2)}</pre>
            </div>

            {/* Input */}
            <div className="flex gap-4">
                <input
                    value={id}
                    onChange={e => setId(e.target.value)}
                    placeholder="Enter QR ID (cmk...)"
                    className="flex-1 p-2 border rounded font-mono"
                />
                <button
                    onClick={runDebug}
                    disabled={loading || !id}
                    className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
                >
                    {loading ? 'Running...' : 'Simulate Fetch'}
                </button>
            </div>

            {/* Environment Check */}
            {envCheck && (
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                    <h2 className="font-bold text-blue-800">Environment Check</h2>
                    <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(envCheck, null, 2)}</pre>
                </div>
            )}

            {/* Results */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h2 className="font-bold text-green-800">Success Result</h2>
                    <pre className="text-xs mt-2 overflow-auto h-96">{JSON.stringify(result, null, 2)}</pre>
                </div>
                <div className="bg-red-50 p-4 rounded border border-red-200">
                    <h2 className="font-bold text-red-800">Error Result</h2>
                    <pre className="text-xs mt-2 overflow-auto h-96">{JSON.stringify(error, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}
