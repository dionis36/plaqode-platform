'use client';

import { useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { ErrorPage } from '@plaqode-platform/ui';

import { useRouter } from 'next/navigation';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-bold mb-2">Something went wrong!</h1>
            <p className="font-mono bg-slate-100 p-2 rounded text-sm text-red-600 mb-4">{error.message}</p>
            {error.digest && <p className="text-xs text-slate-500">Digest: {error.digest}</p>}
            <button
                onClick={reset}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Try again
            </button>
        </div>
    );
}
