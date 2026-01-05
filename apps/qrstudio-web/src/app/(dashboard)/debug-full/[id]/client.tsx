'use client';

import { useEffect, useState } from 'react';

export default function DebugFullClient({ id }: { id: string }) {
    const [status, setStatus] = useState('Loading...');
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (id) {
            loadData(id);
        } else {
            setStatus('No ID param found');
        }
    }, [id]);

    async function loadData(id: string) {
        try {
            setStatus('Fetching API...');
            const baseUrl = 'https://api.plaqode.com';
            const res = await fetch(`${baseUrl}/qrcodes/${id}`).then(r => r.json());
            if (res.success) {
                setData(res.data);
                setStatus('Success');
            } else {
                setStatus('API Error: ' + (res.error || 'Unknown'));
            }
        } catch (err: any) {
            console.error('Fetch error:', err);
            setStatus('Fetch Exception: ' + err.message);
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-slate-800">🕵️ Debug Full Logic (Client)</h1>
            <div className="mt-4 space-y-2">
                <p><strong>Prop ID:</strong> {id}</p>
                <p><strong>Status:</strong> {status}</p>
                <pre className="bg-slate-100 p-4 rounded overflow-auto text-xs mt-4">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    );
}
