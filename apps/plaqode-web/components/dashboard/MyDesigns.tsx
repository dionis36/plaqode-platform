'use client';

import { useEffect, useState } from 'react';

interface SavedDesign {
    id: string;
    name: string;
    templateId: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

export function MyDesigns() {
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
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">My Designs</h2>
                <div className="text-center py-8">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">My Designs</h2>
                <a
                    href={process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                    Create New →
                </a>
            </div>

            {designs.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <p className="text-gray-600 mb-2">No saved designs yet</p>
                    <p className="text-sm text-gray-500 mb-4">Start creating beautiful business cards</p>
                    <a
                        href={process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition"
                    >
                        Create Your First Design
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {designs.map((design) => (
                        <a
                            key={design.id}
                            href={`${process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}/design/${design.templateId}?loadId=${design.id}`}
                            className="group"
                        >
                            <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden mb-2 border border-gray-200 group-hover:border-purple-400 transition">
                                {design.thumbnail ? (
                                    <img
                                        src={design.thumbnail}
                                        alt={design.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm font-medium text-gray-900 truncate group-hover:text-purple-600 transition">
                                {design.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(design.updatedAt).toLocaleDateString()}
                            </p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
