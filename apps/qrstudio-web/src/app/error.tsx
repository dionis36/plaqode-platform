'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@plaqode-platform/ui';
import { RefreshCcw, Home } from 'lucide-react';
import { env } from "@/lib/env";

const PLATFORM_URL = env.NEXT_PUBLIC_PLATFORM_URL;

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
            title="Something went wrong"
            description="We encountered an unexpected error while processing your request."
        >
            <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-white/10 rounded-lg hover:bg-white/20"
            >
                <RefreshCcw className="w-4 h-4" />
                Try again
            </button>
            <a
                href={PLATFORM_URL}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black transition-colors duration-200 bg-white rounded-lg hover:bg-gray-200"
            >
                <Home className="w-4 h-4" />
                Go Home
            </a>
        </ErrorPage>
    );
}
