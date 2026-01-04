'use client';

import { useWizardStore } from '@/components/wizard/store';
import { useEffect, useState } from 'react';

export default function StoreDebugPage() {
    // Attempt to read store during render (potential SSR crash point if store is unsafe)
    const store = useWizardStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-blue-600">ℹ️ Store Debug</h1>
            <div className="mt-4 p-4 border rounded bg-slate-50">
                <p><strong>Hydrated:</strong> {mounted ? 'Yes' : 'No (Server/Initial)'}</p>
                <p><strong>Payload Keys:</strong> {Object.keys(store.payload || {}).join(', ')}</p>
                <p><strong>Design Present:</strong> {store.design ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
}
