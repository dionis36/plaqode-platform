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
        <div>Test Error Page</div>
    );
}
