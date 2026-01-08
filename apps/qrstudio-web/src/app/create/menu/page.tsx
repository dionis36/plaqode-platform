'use client';

import { MenuForm } from '@/components/wizard/forms/MenuForm';
import { PhoneMockup } from '@/components/common/PhoneMockup';
import { MenuPreview } from '@/components/wizard/preview/MenuPreview';
import { PreviewProvider } from '@/components/wizard/preview/PreviewContext';
import { useWizardStore } from '@/components/wizard/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Eye } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';
import { qrApi } from '@/lib/api-client';
import { SEO } from '@/components/common/SEO';
import { BackButton } from '@/components/common/BackButton';
import { EnhancedPreviewModal } from '@/components/common/EnhancedPreviewModal';
import { useTemplateValidation } from '@/hooks/useTemplateValidation';
import { LoadingBoundary, UniversalLoader } from '@plaqode-platform/ui';

function MenuQrPageContent() {
    const { payload, setEditMode, loadQrData } = useWizardStore();
    const { isValid } = useTemplateValidation('menu');
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('edit');
    const [loading, setLoading] = useState(!!editId);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (editId) {
            // Load existing QR code data for editing
            loadExistingQr(editId);
        } else {
            // Clear edit mode if no edit parameter
            setEditMode(null);
        }
    }, [editId]);

    async function loadExistingQr(id: string) {
        try {
            setLoading(true);
            const response = await qrApi.getById(id);

            if (response.success && response.data) {
                // Set edit mode and load data into store
                setEditMode(id);
                loadQrData(response.data);
            } else {
                alert('Failed to load QR code');
                router.push('/qrcodes');
            }
        } catch (error) {
            console.error('Failed to load QR code:', error);
            alert('Failed to load QR code');
            router.push('/qrcodes');
        } finally {
            setLoading(false);
        }
    }

    return (
        <LoadingBoundary
            isLoading={loading}
            size="lg"
            text="Loading QR code data..."
            className="w-full px-4 pb-20 flex items-center justify-center min-h-[400px]"
        >
            <div className="w-full px-3 sm:px-6 pb-20">
                <SEO
                    title="Create Menu QR Code"
                    description="Create a digital menu QR code for your restaurant with customizable colors and design"
                />

                <BackButton />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT PANEL: 75% - Content Form */}
                    <div className="w-full lg:w-3/4 flex flex-col">
                        <MenuForm />

                        {/* Next Button */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                            <button
                                onClick={() => router.push(`/create/menu/design${editId ? `?edit=${editId}` : ''}`)}
                                disabled={!isValid}
                                className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 ${!isValid ? 'opacity-50 cursor-not-allowed hover:translate-y-0 shadow-none' : ''}`}
                            >
                                {editId ? 'Next: Update Design' : 'Next: Customize QR Design'}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT PANEL: 25% - Sticky Preview */}
                    <div className="hidden lg:flex w-full lg:w-1/4 relative">
                        <div className="sticky top-6 w-full flex flex-col items-center h-fit">
                            <div className="transform transition-all duration-500 origin-top scale-[0.85] xl:scale-[0.9]">
                                <PreviewProvider>
                                    <PhoneMockup className="shadow-2xl shadow-slate-300/50">
                                        <MenuPreview data={payload} />
                                    </PhoneMockup>
                                </PreviewProvider>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Preview Button */}
                <button
                    onClick={() => setShowPreview(true)}
                    className="lg:hidden fixed bottom-6 right-6 z-40 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
                >
                    <Eye className="w-5 h-5" />
                    View Preview
                </button>

                {/* Mobile Preview Modal */}
                <EnhancedPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)}>
                    <PreviewProvider>
                        <MenuPreview data={payload} />
                    </PreviewProvider>
                </EnhancedPreviewModal>
            </div>
        </LoadingBoundary>
    );
}

export default function MenuQrPage() {
    return (
        <Suspense fallback={
            <div className="w-full px-4 pb-20 flex items-center justify-center min-h-[400px]">
                <UniversalLoader size="lg" text="Loading..." />
            </div>
        }>
            <MenuQrPageContent />
        </Suspense>
    );
}
