import dynamic from 'next/dynamic';

// Force client-side rendering only to bypass Vercel SSR crash
const QrPageClient = dynamic(
    () => import('./client').then((mod) => mod.QrPageClient),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }
);

export const dynamicParams = true; // Use Next.js 14 conventions

export default function QrCodeDetailPage({ params }: { params: { id: string } }) {
    return <QrPageClient id={params.id} />;
}
