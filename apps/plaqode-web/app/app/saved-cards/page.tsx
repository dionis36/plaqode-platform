'use client';

import { useEffect, useState } from 'react';
import { Layout } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

interface SavedDesign {
    id: string;
    name: string;
    templateId: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

export default function SavedCardsPage() {
    const [designs, setDesigns] = useState<SavedDesign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/designs`, {
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setDesigns(data);
            }
        } catch (error) {
            console.error('Failed to fetch designs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent">
            <div className="w-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl sm:text-3xl font-merriweather font-bold text-dark">Saved Cards</h1>
                            {!loading && designs.length > 0 && (
                                <span className="text-2xl sm:text-3xl font-bold text-purple-600">
                                    {designs.length}
                                </span>
                            )}
                        </div>
                        <p className="text-base text-text/70 font-sans mt-2">Manage your saved business card designs</p>
                    </div>
                    <GradientButton
                        href={process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}
                        text="Create New Card"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    />
                </div>

                {designs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                        <Layout className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No saved designs yet</h3>
                        <p className="text-slate-600 mb-6">Start creating beautiful business cards</p>
                        <a
                            href={process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        >
                            <Layout className="w-5 h-5" />
                            Create Your First Design
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {designs.map((design) => (
                            <a
                                key={design.id}
                                href={`${process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}/design/${design.templateId}?loadId=${design.id}`}
                                className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all"
                            >
                                <div className="aspect-[3/2] bg-slate-100 overflow-hidden relative border-b border-slate-100">
                                    {design.thumbnail ? (
                                        <img
                                            src={design.thumbnail}
                                            alt={design.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <Layout className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-slate-900 truncate group-hover:text-purple-600 transition-colors mb-1">
                                        {design.name}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        Last updated: {new Date(design.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
