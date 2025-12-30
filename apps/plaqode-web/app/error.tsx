'use client';

import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong!</h2>
                <p className="text-slate-600 mb-8">
                    {error.message || 'An unexpected error occurred.'}
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Go Home
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
}
