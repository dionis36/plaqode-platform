'use client';

import { useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { ErrorPage } from '@plaqode-platform/ui';

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
        <ErrorPage
            code="500"
            title="Something went wrong!"
            description={error.message || 'An unexpected error occurred.'}
        >
            <button
                onClick={() => window.location.href = '/'}
                className="bg-white text-black px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-white/90 transition-colors"
            >
                <ArrowLeft size={16} />
                Go Home
            </button>
            <button
                onClick={reset}
                className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
                <RotateCcw size={16} />
                Try again
            </button>
        </ErrorPage>
    );
}
