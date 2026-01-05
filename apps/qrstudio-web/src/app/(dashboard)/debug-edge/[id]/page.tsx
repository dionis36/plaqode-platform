export const runtime = 'edge';

export default function DebugEdgePage({ params }: { params: { id: string } }) {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-green-600">✅ Edge Runtime Works</h1>
            <p>ID: {params.id}</p>
            <p className="mt-4 text-sm text-slate-500">
                This page is running on the Vercel Edge Runtime (V8), not Node.js.
            </p>
        </div>
    );
}
