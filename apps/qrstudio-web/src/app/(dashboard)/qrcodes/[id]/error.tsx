'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Next.js Route Error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <div className="bg-red-50 p-4 rounded-full mb-6">
                <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong!</h2>
            <div className="max-w-md bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 font-mono text-sm text-red-600 overflow-auto text-left">
                {error.message || 'Unknown error occurred'}
                {error.stack && (
                    <details className="mt-2 text-xs text-slate-500 cursor-pointer">
                        <summary>View Stack Trace</summary>
                        <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
                    </details>
                )}
            </div>
            <button
                onClick={reset}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow"
            >
                Try refreshing
            </button>
        </div>
    );
}
