interface ProductCardProps {
    name: string;
    description: string;
    icon: React.ReactNode;
    stats: {
        total: number;
        recent: number;
    };
    href: string;
    hasAccess: boolean;
    gradient: string;
}

export function ProductCard({ name, description, icon, stats, href, hasAccess, gradient }: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center text-white`}>
                    {icon}
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                    Active
                </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className="text-gray-600 mb-4 text-sm">{description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Total Created</p>
                    <p className="text-lg font-bold text-gray-900">{stats.total}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">This Week</p>
                    <p className="text-lg font-bold text-gray-900">{stats.recent}</p>
                </div>
            </div>

            <a
                href={href}
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium"
            >
                Open {name} →
            </a>
        </div>
    );
}
