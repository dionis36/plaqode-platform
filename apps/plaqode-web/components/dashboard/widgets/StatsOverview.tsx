import { BarChart2, QrCode, Layout, Activity } from 'lucide-react';
import { StatsCard } from '../StatsCard';

interface StatsOverviewProps {
    stats: {
        totalScans: number;
        activeQrCodes: number;
        totalDesigns: number;
        totalQrCodes: number;
    };
    loading: boolean;
}

export function StatsOverview({ stats, loading }: StatsOverviewProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <StatsCard
                title="Total Scans"
                value={loading ? '...' : stats.totalScans}
                icon={<BarChart2 className="w-6 h-6" />}
                color="blue"
            />
            <StatsCard
                title="Active QR Codes"
                value={loading ? '...' : stats.activeQrCodes}
                icon={<QrCode className="w-6 h-6" />}
                color="green"
            />
            <StatsCard
                title="Saved Designs"
                value={loading ? '...' : stats.totalDesigns}
                icon={<Layout className="w-6 h-6" />}
                color="purple"
            />
            <StatsCard
                title="Total QRs"
                value={loading ? '...' : stats.totalQrCodes}
                icon={<Activity className="w-6 h-6" />}
                color="orange"
            />
        </div>
    );
}
