import DebugFullClient from './client';

export const dynamic = 'force-dynamic';

export default function DebugFullPage({ params }: { params: { id: string } }) {
    return <DebugFullClient id={params.id} />;
}
