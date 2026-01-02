'use client';

import { ErrorPage } from '@plaqode-platform/ui';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="bg-black text-white p-0 m-0">
                <ErrorPage
                    code="500"
                    title="Critical System Error"
                    description="A critical error occurred while loading the application."
                >
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-white text-black px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-white/90 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Go Home
                    </button>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <RotateCcw size={16} />
                        Try again
                    </button>
                </ErrorPage>
            </body>
        </html>
    );
}
