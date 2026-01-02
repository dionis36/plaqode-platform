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
            <body>
                <div>Test Global Error</div>
            </body>
        </html>
    );
}
