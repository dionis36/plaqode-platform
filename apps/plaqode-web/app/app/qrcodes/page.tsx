'use client';

import { useEffect, useState, useCallback } from 'react';
import { qrApi } from '@/lib/api-client';
import { QrCode, Search, Filter, BarChart2, Edit, Trash2, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { QrContentPreviewModal } from '@/components/common/QrContentPreviewModal';
import { GradientButton, toast, ConfirmationModal, Input } from "@plaqode-platform/ui";
import { env } from '@/lib/env';

interface QrCodeItem {
    id: string;
    shortcode: string;
    type: string;
    name: string;
    isActive: boolean;
    createdAt: string;
    _count: {
        scans: number;
    };
}

export default function QrCodesPage() {
    const router = useRouter();
    const [qrCodes, setQrCodes] = useState<QrCodeItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [qrToDelete, setQrToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [qrToPreview, setQrToPreview] = useState<any>(null);

    const qrStudioUrl = env.NEXT_PUBLIC_QRSTUDIO_URL;

    const loadQrCodes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await qrApi.list({
                page,
                limit: 10,
                search: search || undefined,
                type: typeFilter || undefined,
            });

            if (response.success && response.data && Array.isArray(response.data)) {
                setQrCodes(response.data);
                setTotalPages(response.pagination?.totalPages || 1);
                setTotalCount(response.pagination?.total || 0);
            } else if (response.success) {
                setQrCodes([]);
                setTotalPages(1);
                setTotalCount(0);
            }
        } catch (error) {
            console.error('Failed to load QR codes:', error);
            setQrCodes([]);
            setTotalPages(1);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    }, [page, search, typeFilter]);

    useEffect(() => {
        loadQrCodes();
    }, [loadQrCodes]);

    async function handleDelete(id: string) {
        setQrToDelete(id);
        setDeleteModalOpen(true);
    }

    async function confirmDelete() {
        if (!qrToDelete) return;

        try {
            setIsDeleting(true);
            await qrApi.delete(qrToDelete);
            await loadQrCodes();
            setDeleteModalOpen(false);
            setQrToDelete(null);
            toast.success("QR Code deleted successfully");
        } catch (error) {
            console.error('Failed to delete QR code:', error);
            toast.error('Failed to delete QR code');
        } finally {
            setIsDeleting(false);
        }
    }

    async function handlePreview(id: string) {
        try {
            const response = await qrApi.getById(id);
            if (response.success && response.data) {
                setQrToPreview(response.data);
                // setPreviewModalOpen(true); 
                // Keep the modal internal OR redirect? User said "pages" not modal.
                // Keeping modal internal is nicer, but "clicking the card" goes external.
                // Let's redirect Preview too if they want full external experience?
                // Actually, "Preview" button usually opens modal. The user complained about PAGE redirection.
                // I'll keep the modal internal for the preview button as a "Quick View" unless specified.
                setPreviewModalOpen(true);
            }
        } catch (error) {
            console.error('Failed to load QR code for preview:', error);
        }
    }

    function navigateToExternal(path: string) {
        window.location.href = `${qrStudioUrl}${path}`;
    }

    function getTypeColor(type: string) {
        const colors: Record<string, string> = {
            menu: 'bg-purple-100 text-purple-700 border border-purple-200',
            vcard: 'bg-blue-100 text-blue-700 border border-blue-200',
            url: 'bg-green-100 text-green-700 border border-green-200',
            text: 'bg-orange-100 text-orange-700 border border-orange-200',
            wifi: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
            file: 'bg-pink-100 text-pink-700 border border-pink-200',
            event: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
            email: 'bg-red-100 text-red-700 border border-red-200',
            message: 'bg-teal-100 text-teal-700 border border-teal-200',
            appstore: 'bg-violet-100 text-violet-700 border border-violet-200',
            socialmedia: 'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200',
        };
        return colors[type.toLowerCase()] || 'bg-slate-100 text-slate-700 border border-slate-200';
    }

    return (
        <div className="min-h-screen bg-transparent">
            <div className="w-full">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl sm:text-3xl font-merriweather font-bold text-dark">QR Codes</h1>
                            {!loading && totalCount > 0 && (
                                <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                                    {totalCount}
                                </span>
                            )}
                        </div>
                        <p className="text-base text-text/70 font-sans mt-2">Manage all your QR codes in one place</p>
                    </div>
                    <GradientButton
                        href={`${qrStudioUrl}/create`}
                        text="Create New QR"
                    // className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <Input
                            placeholder="Search QR codes..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="pl-12 bg-white"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                        <select
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-12 pr-10 h-11 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.4)] appearance-none cursor-pointer transition-all text-sm sm:text-base hover:border-slate-300"
                        >
                            <option value="">All Types</option>
                            <option value="menu">Menu</option>
                            <option value="vcard">vCard</option>
                            <option value="url">URL</option>
                            <option value="text">Text</option>
                            <option value="wifi">Wi-Fi</option>
                            <option value="file">File</option>
                            <option value="event">Event</option>
                            <option value="email">Email</option>
                            <option value="message">Message</option>
                            <option value="appstore">App Store</option>
                            <option value="socialmedia">Social Media</option>
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* QR Codes */}
                {loading ? (
                    <div className="flex items-center justify-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : qrCodes.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                        <QrCode className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No QR codes found</h3>
                        <p className="text-slate-600 mb-6">Create your first QR code to get started</p>
                        <div className="flex justify-center">
                            <GradientButton
                                href={`${qrStudioUrl}/create`}
                                text="Create QR Code"
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Mobile Card Layout */}
                        <div className="lg:hidden space-y-4">
                            {qrCodes.map((qr) => (
                                <div
                                    key={qr.id}
                                    onClick={() => navigateToExternal(`/details?id=${qr.id}`)}
                                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <QrCode className="w-6 h-6 text-slate-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-slate-900 truncate">{qr.name}</h3>
                                                <p className="text-xs text-slate-500 truncate">{qr.shortcode}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(qr.type)}`}>
                                            {qr.type.toUpperCase()}
                                        </span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${qr.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                                            {qr.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm mb-3">
                                        <span className="text-slate-600">Scans: <span className="font-semibold text-slate-900">{qr._count.scans}</span></span>
                                        <span className="text-slate-500" suppressHydrationWarning>{new Date(qr.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => handlePreview(qr.id)}
                                            className="flex items-center justify-center p-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                                            title="Preview Content"
                                        >
                                            <Smartphone className="w-4 h-4" />
                                        </button>
                                        <a
                                            href={`${qrStudioUrl}/qrcodes/${qr.id}/analytics`}
                                            className="flex items-center justify-center p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                            title="Analytics"
                                        >
                                            <BarChart2 className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={`${qrStudioUrl}/create/${qr.type}?edit=${qr.id}`}
                                            className="flex items-center justify-center p-2.5 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(qr.id)}
                                            className="flex items-center justify-center p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table Layout */}
                        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Name</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Type</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Scans</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Created</th>
                                        <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {qrCodes.map((qr) => (
                                        <tr
                                            key={qr.id}
                                            onClick={() => navigateToExternal(`/details?id=${qr.id}`)}
                                            className="hover:bg-slate-50 transition-colors cursor-pointer"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                                        <QrCode className="w-5 h-5 text-slate-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{qr.name}</p>
                                                        <p className="text-sm text-slate-500">{qr.shortcode}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(qr.type)}`}>
                                                    {qr.type.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-900 font-medium">{qr._count.scans}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${qr.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                                                    {qr.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600" suppressHydrationWarning>
                                                {new Date(qr.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handlePreview(qr.id)}
                                                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                        title="Preview Content"
                                                    >
                                                        <Smartphone className="w-4 h-4" />
                                                    </button>
                                                    <a
                                                        href={`${qrStudioUrl}/qrcodes/${qr.id}/analytics`}
                                                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                        title="Analytics"
                                                    >
                                                        <BarChart2 className="w-4 h-4" />
                                                    </a>
                                                    <a
                                                        href={`${qrStudioUrl}/create/${qr.type}?edit=${qr.id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(qr.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-slate-600">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete QR Code"
                message="Are you sure you want to delete this QR code? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
                isLoading={isDeleting}
            />

            {/* Preview Modal */}
            <QrContentPreviewModal
                isOpen={previewModalOpen}
                onClose={() => {
                    setPreviewModalOpen(false);
                    setQrToPreview(null);
                }}
                qrCode={qrToPreview}
            />
        </div>
    );
}
