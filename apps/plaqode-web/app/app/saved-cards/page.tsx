'use client';

import { useEffect, useState } from 'react';
import { Layout } from 'lucide-react';
import SavedCard from '@/components/app/SavedCard';
import { toast, ConfirmationModal, GradientButton } from "@plaqode-platform/ui";

interface SavedDesign {
    id: string;
    name: string;
    templateId: string;
    thumbnail?: string;
    designData?: any;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export default function SavedCardsPage() {
    const [designs, setDesigns] = useState<SavedDesign[]>([]);
    const [loading, setLoading] = useState(true);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [cardToDelete, setCardToDelete] = useState<{ id: string; name: string } | null>(null);

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

    const handleDeleteClick = (id: string, name: string) => {
        setCardToDelete({ id, name });
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!cardToDelete) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/api/designs/${cardToDelete.id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                // Remove from state immediately
                setDesigns(prev => prev.filter(d => d.id !== cardToDelete.id));
                toast.success("Design deleted successfully");
            } else {
                console.error('Failed to delete design');
                toast.error("Failed to delete design");
            }
        } catch (error) {
            console.error('Error deleting design:', error);
            toast.error("Error deleting design");
        } finally {
            setDeleteModalOpen(false);
            setCardToDelete(null);
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
                                <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                                    {designs.length}
                                </span>
                            )}
                        </div>
                        <p className="text-base text-text/70 font-sans mt-2">Manage your saved business card designs</p>
                    </div>
                    <GradientButton
                        href={`${process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}/templates`}
                        text="Create New Card"
                    />
                </div>

                {designs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                        <Layout className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No saved designs yet</h3>
                        <p className="text-slate-600 mb-6">Start creating beautiful business cards</p>
                        <div className="flex justify-center">
                            <GradientButton
                                href={`${process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}/templates`}
                                text="Create Your First Design"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                        {designs.map((design) => (
                            <SavedCard
                                key={design.id}
                                design={design}
                                onDelete={handleDeleteClick}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Design"
                message={`Are you sure you want to delete "${cardToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete Design"
                variant="danger"
            />
        </div>
    );
}
