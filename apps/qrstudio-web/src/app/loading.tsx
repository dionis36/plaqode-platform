import { UniversalLoader } from '@plaqode-platform/ui';

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center text-purple-600">
            <UniversalLoader size="lg" center />
        </div>
    );
}
