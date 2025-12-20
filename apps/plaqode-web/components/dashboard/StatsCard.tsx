interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    color?: 'purple' | 'blue' | 'green' | 'orange';
}

export function StatsCard({ title, value, icon, trend, color = 'purple' }: StatsCardProps) {
    const colorClasses = {
        purple: 'bg-purple-100 text-purple-600',
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        orange: 'bg-orange-100 text-orange-600',
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition flex flex-col items-center text-center relative">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${colorClasses[color]}`}>
                {icon}
            </div>
            {trend && (
                <span className={`absolute top-4 right-4 text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.isPositive ? '↑' : '↓'} {trend.value}
                </span>
            )}
            <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
