'use client';

export default function DynamicDebugPage({ params }: { params: { id: string } }) {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-green-600">Dynamic Route Works!</h1>
            <p>ID: {params.id}</p>
        </div>
    );
}
