export default function DebugSSRPage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-green-600">✅ SSR Debug Page Works</h1>
            <p className="mt-4">If you can see this, basic Server Components are working correctly.</p>
            <p className="mt-2 text-sm text-slate-500">Timestamp: {new Date().toISOString()}</p>
        </div>
    );
}
