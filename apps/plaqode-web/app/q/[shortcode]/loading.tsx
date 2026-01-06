import { Skeleton } from "../../../components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center">
            {/* Desktop: Mobile slice container */}
            <div className="w-full h-full min-h-screen sm:min-h-[auto] sm:h-auto sm:max-w-[400px] sm:aspect-[9/19.5] sm:max-h-[85vh] sm:rounded-3xl sm:shadow-2xl sm:overflow-hidden bg-white relative flex flex-col">

                {/* Header Skeleton */}
                <div className="h-40 bg-slate-200 relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <Skeleton className="w-16 h-16 rounded-full bg-white/30 mb-4" />
                        <Skeleton className="h-6 w-32 bg-white/30 rounded" />
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="flex-1 px-6 py-8 space-y-4 -mt-8 relative z-10">
                    <Skeleton className="h-24 w-full rounded-2xl bg-slate-50 border border-slate-100" />
                    <Skeleton className="h-24 w-full rounded-2xl bg-slate-50 border border-slate-100" />
                    <Skeleton className="h-12 w-full rounded-xl bg-slate-200 mt-8" />
                </div>

                {/* Footer Skeleton */}
                <div className="p-6 flex justify-center">
                    <Skeleton className="h-3 w-32 bg-slate-200 rounded" />
                </div>
            </div>
        </div>
    );
}
