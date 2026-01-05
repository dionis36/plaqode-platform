export async function generateStaticParams() {
    return [{ id: '123' }, { id: 'test' }];
}

export default function DynamicDebugPage({ params }: { params: { id: string } }) {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-green-600">Dynamic Route Working!</h1>
            <p className="mt-4">ID Parameter: <code className="bg-slate-100 p-1 rounded">{params.id}</code></p>
            <p className="text-sm text-slate-500 mt-2">
                If you see this, Next.js routed the dynamic segment correctly.
            </p>
        </div>
    );
}
