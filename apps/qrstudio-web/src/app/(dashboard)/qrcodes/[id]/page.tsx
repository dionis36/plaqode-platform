import { QrPageClient } from './client';

export const dynamic = 'force-dynamic';

export default function QrCodeDetailPage({ params }: { params: { id: string } }) {
    return <QrPageClient id={params.id} />;
}
