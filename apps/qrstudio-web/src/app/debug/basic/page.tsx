import { Suspense } from 'react';

export default function BasicDebugPage() {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-green-600">✅ Basic SSR Working</h1>
            <p>This page confirms the Next.js server environment is healthy.</p>
            <p>Time: {new Date().toISOString()}</p>
        </div>
    );
}
