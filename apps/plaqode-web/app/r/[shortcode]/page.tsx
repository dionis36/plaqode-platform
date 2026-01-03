
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SmartLandingPage } from '@/components/redirect/SmartLandingPage';
import { env } from '@/lib/env';

// Import All Preview Components
import { MenuPreview } from '@/components/qrcodes/preview/MenuPreview';
import { VCardPreview } from '@/components/qrcodes/preview/VCardPreview';
import { URLPreview } from '@/components/qrcodes/preview/URLPreview';
import { TextPreview } from '@/components/qrcodes/preview/TextPreview';
import { WiFiPreview } from '@/components/qrcodes/preview/WiFiPreview';
import { PDFPreview } from '@/components/qrcodes/preview/PDFPreview';
import { EventPreview } from '@/components/qrcodes/preview/EventPreview';
import { EmailPreview } from '@/components/qrcodes/preview/EmailPreview';
import { MessagePreview } from '@/components/qrcodes/preview/MessagePreview';
import { AppStorePreview } from '@/components/qrcodes/preview/AppStorePreview';
import { SocialMediaPagePreview } from '@/components/qrcodes/preview/SocialMediaPagePreview';

interface ViewerPageProps {
    params: {
        shortcode: string;
    };
}

async function getQRCodeByShortcode(shortcode: string) {
    try {
        const apiUrl = env.NEXT_PUBLIC_QRSTUDIO_API_URL;
        const response = await fetch(`${apiUrl}/q/${shortcode}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Failed to fetch QR code:', error);
        return null;
    }
}

export async function generateMetadata({ params }: ViewerPageProps): Promise<Metadata> {
    const qrCode = await getQRCodeByShortcode(params.shortcode);
    return {
        title: qrCode?.name || 'QR Code Viewer',
        description: 'View QR Code Content',
    };
}

export default async function ViewerPage({ params }: ViewerPageProps) {
    const { shortcode } = params;
    const qrCode = await getQRCodeByShortcode(shortcode);

    // 1. Not Found
    if (!qrCode) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-2xl font-bold text-slate-900">QR Code Not Found</h1>
                    <p className="text-slate-600 mt-2">This code doesn&apos;t exist.</p>
                </div>
            </div>
        );
    }

    // 2. Inactive
    if (!qrCode.isActive) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8">
                    <div className="text-6xl mb-4">⏸️</div>
                    <h1 className="text-2xl font-bold text-slate-900">Recently Deactivated</h1>
                    <p className="text-slate-600 mt-2">This QR code has been disabled by the owner.</p>
                </div>
            </div>
        );
    }

    // 3. URL Type Handling
    if (qrCode.type === 'url') {
        const urlDetails = qrCode.payload?.url_details;
        const redirectSettings = qrCode.payload?.redirect_settings;

        // Fallback for instant redirect if backend didn't catch it for some reason
        if (redirectSettings?.show_preview === false && urlDetails?.destination_url) {
            redirect(urlDetails.destination_url);
        }

        // Show Smart Landing Page
        return <SmartLandingPage qrCode={qrCode} />;
    }

    // 4. Content Types (Menu, vCard, PDF, etc.)
    // We wrap them in a nice mobile-friendly container
    const renderContent = () => {
        const payload = qrCode.payload || {};

        switch (qrCode.type) {
            case 'menu': return <MenuPreview data={payload} />;
            case 'vcard': return <VCardPreview data={payload} />;
            // For 'url', we returned above, but just in case
            case 'url': return <URLPreview data={payload} />;
            case 'text': return <TextPreview data={payload} />;
            case 'wifi': return <WiFiPreview data={payload} />;
            case 'file': return <PDFPreview data={payload} />;
            case 'event': return <EventPreview data={payload} />;
            case 'email': return <EmailPreview data={payload} />;
            case 'message': return <MessagePreview data={payload} />;
            case 'appstore': return <AppStorePreview data={payload} />;
            case 'socialmedia': return <SocialMediaPagePreview data={payload} />;
            default:
                return (
                    <div className="p-8 text-center text-slate-500">
                        Content type not supported yet: {qrCode.type}
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gray-50 relative selection:bg-blue-100">
            {/* Desktop Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }}></div>

            <div className="w-full max-w-md bg-white min-h-screen shadow-2xl overflow-hidden relative z-10 sm:my-8 sm:min-h-[calc(100vh-4rem)] sm:rounded-[2.5rem] sm:border-[8px] sm:border-slate-800/5 ring-1 ring-slate-900/5">
                {renderContent()}
            </div>
        </div>
    );
}
