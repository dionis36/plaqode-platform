'use client';

import { useEffect, useState } from 'react';
import {
    QrCode,
    Smartphone,
    Wifi,
    Link as LinkIcon,
    FileText,
    Mail,
    MessageSquare,
    Calendar,
    Share2,
    File
} from 'lucide-react';
import { format } from 'date-fns';

interface QrItem {
    id: string;
    name: string;
    type: string;
    shortcode: string;
    createdAt: string;
    isActive: boolean;
}

export function MyQRCodes() {
    const [qrcodes, setQrcodes] = useState<QrItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQrCodes();
    }, []);

    const fetchQrCodes = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_QRSTUDIO_API_URL || 'http://localhost:3005';
            const response = await fetch(`${apiUrl}/qrcodes?limit=4`, {
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setQrcodes(result.data);
                }
            }
        } catch (error) {
            console.error('Failed to fetch QR codes:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'url': return <LinkIcon className="w-8 h-8 text-blue-500" />;
            case 'vcard': return <Smartphone className="w-8 h-8 text-purple-500" />;
            case 'wifi': return <Wifi className="w-8 h-8 text-orange-500" />;
            case 'text': return <FileText className="w-8 h-8 text-slate-500" />;
            case 'email': return <Mail className="w-8 h-8 text-red-500" />;
            case 'message': return <MessageSquare className="w-8 h-8 text-green-500" />;
            case 'event': return <Calendar className="w-8 h-8 text-pink-500" />;
            case 'socialmedia': return <Share2 className="w-8 h-8 text-indigo-500" />;
            case 'file': return <File className="w-8 h-8 text-yellow-500" />;
            default: return <QrCode className="w-8 h-8 text-slate-900" />;
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">My QR Codes</h2>
                <div className="text-center py-8">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-purple-600" />
                    My QR Codes
                </h2>
                <a
                    href={`${process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3001'}/create`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                    Create New →
                </a>
            </div>

            {qrcodes.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">No QR codes yet</p>
                    <p className="text-sm text-gray-500 mb-4">Create your first dynamic QR code</p>
                    <a
                        href={`${process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3001'}/create`}
                        target="_blank"
                        className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition"
                    >
                        Create QR Code
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {qrcodes.map((qr) => (
                        <a
                            key={qr.id}
                            href={`${process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3001'}/qrcodes/${qr.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-gray-50 rounded-lg border border-gray-200 p-4 hover:border-purple-400 hover:shadow-md transition flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition">
                                {getTypeIcon(qr.type)}
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 truncate w-full group-hover:text-purple-600 transition">
                                {qr.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 capitalize">
                                {qr.type} • {format(new Date(qr.createdAt), 'MMM d')}
                            </p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
