'use client';

import { useState, useEffect } from 'react';

export default function DebugClientPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-blue-600">✅ Client Debug Page Works</h1>
            <p className="mt-4">If you can see this, Client Components and Hydration are working.</p>
            <div className="mt-4 p-4 bg-slate-100 rounded">
                <p>Status: {mounted ? 'Mounted (Browser)' : 'Loading (Server)'}</p>
            </div>
        </div>
    );
}
