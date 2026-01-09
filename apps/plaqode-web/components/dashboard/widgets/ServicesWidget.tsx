'use client';

import { useAuth } from '@/lib/auth-context';
import { env } from '@/lib/env';
import { QrCode, IdCard, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@plaqode-platform/ui';


export function ServicesWidget() {
    const { user, hasProduct } = useAuth();
    const qrStudioUrl = env.NEXT_PUBLIC_QRSTUDIO_URL;
    const cardifyUrl = env.NEXT_PUBLIC_CARDIFY_URL;

    const services = [
        {
            id: 'qr-marketing-suite',
            name: 'QR Marketing Suite',
            description: 'A complete toolkit for your business. Manage digital menus, WiFi access, app store links, and more.',
            icon: <QrCode className="w-5 h-5 text-indigo-500" />,
            url: qrStudioUrl,
            hasAccess: true,
            action: 'link'
        },
        {
            id: 'business-cards',
            name: 'Business Cards',
            description: 'Design premium physical business cards. Customize your layout and export print-ready files instantly.',
            icon: <IdCard className="w-5 h-5 text-pink-500" />,
            url: `${cardifyUrl}/templates`,
            hasAccess: true,
            action: 'link'
        },
        {
            id: 'event-management',
            name: 'Event Management',
            description: 'A powerful system to create, manage, and track events with integrated ticketing.',
            icon: <Calendar className="w-5 h-5 text-orange-500" />,
            url: '#',
            hasAccess: false,
            action: 'toast',
            statusLabel: 'Coming Soon',
            statusColor: 'bg-orange-100 text-orange-700'
        }
    ];

    const handleServiceClick = (e: React.MouseEvent, service: any) => {
        if (service.action === 'toast') {
            e.preventDefault();
            toast.info(`${service.name} is coming soon!`);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Services</h2>
            <div className="space-y-4">
                {services.map((service) => (
                    <div key={service.id} className="flex items-start justify-between p-4 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-4">
                            <div className="bg-white p-2.5 rounded-lg shadow-sm border border-gray-100 shrink-0">
                                {service.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2 flex-wrap">
                                    {service.name}
                                    {service.hasAccess && !service.statusLabel && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 text-green-700 rounded-sm uppercase tracking-wide">
                                            Active
                                        </span>
                                    )}
                                    {service.statusLabel && (
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide ${service.statusColor}`}>
                                            {service.statusLabel}
                                        </span>
                                    )}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                            </div>
                        </div>

                        <div>
                            {service.action === 'link' ? (
                                <a
                                    href={service.url}
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                                    title={`Open ${service.name}`}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            ) : (
                                <button
                                    onClick={(e) => handleServiceClick(e, service)}
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer"
                                    title={service.statusLabel || "Coming Soon"}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <div className="pt-2">
                    <Link href="/services">
                        <button className="w-full py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100 dashed">
                            + Browse More Products
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
