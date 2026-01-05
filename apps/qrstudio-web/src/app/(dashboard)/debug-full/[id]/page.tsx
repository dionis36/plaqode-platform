'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function DebugFullPage({ params }: { params: { id: string } }) {
    const [status, setStatus] = useState('Loading...');
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setStatus('Fetching API...');
            const baseUrl = 'https://api.plaqode.com';
            const res = await fetch(`${baseUrl}/qrcodes/${params.id}`).then(r => r.json());
            if (res.success) {
                setData(res.data);
                setStatus('Success');
            } else {
                setStatus('API Error: ' + (res.error || 'Unknown'));
            }
        } catch (err: any) {
            setStatus('Fetch Exception: ' + err.message);
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-slate-800">🕵️ Debug Full Logic</h1>
            <div className="mt-4 space-y-2">
                <p><strong>Param ID:</strong> {params.id}</p>
                <p><strong>Status:</strong> {status}</p>
                <pre className="bg-slate-100 p-4 rounded overflow-auto text-xs mt-4">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    );
}
