'use client';

import { VCardForm } from '@/components/wizard/forms/VCardForm';
import { PhoneMockup } from '@/components/common/PhoneMockup';
import { VCardPreview } from '@/components/wizard/preview/VCardPreview';
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

function VCardQrPageContent() {
    const { payload, setEditMode, loadQrData } = useWizardStore();
    const { isValid } = useTemplateValidation('vcard');
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
            // Check for stale state (different template type or stuck in edit mode)
            const storeState = useWizardStore.getState();
            if (storeState.editId || storeState.type !== 'vcard') {
                useWizardStore.getState().reset();
                useWizardStore.getState().setType('vcard');
            } else {
                // Just ensure type is correct if it was empty
                useWizardStore.getState().setType('vcard');
                setEditMode(null);
            }
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

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
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
                    title="Create vCard QR Code"
                    description="Create a digital business card QR code with contact information"
                />

                <BackButton />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT PANEL: 75% - Content Form */}
                    <div className="w-full lg:w-3/4 flex flex-col">
                        <VCardForm />

                        {/* Next Button */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                            <button
                                onClick={() => router.push(`/create/vcard/design${editId ? `?edit=${editId}` : ''}`)}
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
                                <PhoneMockup className="shadow-2xl shadow-slate-300/50">
                                    <VCardPreview data={payload} />
                                </PhoneMockup>
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
                    Preview
                </button>

                {/* Mobile Preview Modal */}
                <EnhancedPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)}>
                    <VCardPreview data={payload} />
                </EnhancedPreviewModal>
            </div>
        </LoadingBoundary>
    );
}

export default function VCardQrPage() {
    return (
        <Suspense fallback={
            <div className="w-full px-4 pb-20 flex items-center justify-center min-h-[400px]">
                <UniversalLoader size="lg" text="Loading..." />
            </div>
        }>
            <VCardQrPageContent />
        </Suspense>
    );
}
