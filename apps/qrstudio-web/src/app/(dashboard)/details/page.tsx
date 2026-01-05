import dynamic from 'next/dynamic';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'QR Code Details | QR Studio',
    description: 'View and manage your QR code',
};

// Reuse the working client component
const QrPageClient = dynamic(
    () => import('../qrcodes/[id]/client').then((mod) => mod.QrPageClient),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }
);

export default function DetailsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const id = typeof searchParams.id === 'string' ? searchParams.id : null;

    if (!id) {
        return (
            <div className="p-8 text-center text-red-600">
                <h1 className="text-2xl font-bold">Error: Missing ID</h1>
                <p>Please provide a QR Code ID in the URL (e.g., ?id=...)</p>
            </div>
        );
    }

    return <QrPageClient id={id} />;
}
