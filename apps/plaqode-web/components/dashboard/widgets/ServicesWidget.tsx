'use client';

import { useAuth } from '@/lib/auth-context';
import { QrCode, CreditCard, ExternalLink, Lock } from 'lucide-react';
import Link from 'next/link';

export function ServicesWidget() {
    const { user, hasProduct } = useAuth();
    const qrStudioUrl = process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3001';
    const cardifyUrl = process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002';

    const services = [
        {
            id: 'qr-studio',
            name: 'QR Studio',
            description: 'Create and manage dynamic QR codes with advanced analytics.',
            icon: <QrCode className="w-5 h-5 text-indigo-500" />,
            url: qrStudioUrl,
            hasAccess: true, // Core feature, usually available
        },
        {
            id: 'cardify',
            name: 'Cardify',
            description: 'Digital business cards for professionals and teams.',
            icon: <CreditCard className="w-5 h-5 text-pink-500" />,
            url: cardifyUrl,
            hasAccess: true, // Assuming accessible for simple designs, or check hasProduct('cardify')
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Services</h2>
            <div className="space-y-4">
                {services.map((service) => (
                    <div key={service.id} className="flex items-start justify-between p-4 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-4">
                            <div className="bg-white p-2.5 rounded-lg shadow-sm border border-gray-100">
                                {service.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                    {service.name}
                                    {service.hasAccess && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 text-green-700 rounded-sm uppercase tracking-wide">
                                            Active
                                        </span>
                                    )}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                            </div>
                        </div>

                        <div>
                            <a
                                href={service.url}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                                title={`Open ${service.name}`}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}

                <div className="pt-2">
                    <button className="w-full py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100 dashed">
                        + Browse More Products
                    </button>
                </div>
            </div>
        </div>
    );
}
