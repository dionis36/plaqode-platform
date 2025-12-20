import { ScrollToTop } from '@/components/ScrollToTop';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 selection:bg-blue-100">
            <ScrollToTop />
            {/* Platform navbar is in root layout - no custom navbar needed */}
            <main className="flex-1 flex flex-col pt-20">
                {children}
            </main>
        </div>
    );
}
