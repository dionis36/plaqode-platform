'use client';

import { EnhancedPreviewModal } from './EnhancedPreviewModal';
import { PreviewProvider } from '../wizard/preview/PreviewContext';
import { MenuPreview } from '../wizard/preview/MenuPreview';
import { VCardPreview } from '../wizard/preview/VCardPreview';
import { URLPreview } from '../wizard/preview/URLPreview';
import { TextPreview } from '../wizard/preview/TextPreview';
import { WiFiPreview } from '../wizard/preview/WiFiPreview';
import { FilePreview } from '../wizard/preview/FilePreview';
import { EventPreview } from '../wizard/preview/EventPreview';
import { EmailPreview } from '../wizard/preview/EmailPreview';
import { MessagePreview } from '../wizard/preview/MessagePreview';
import { AppStorePreview } from '../wizard/preview/AppStorePreview';
import { SocialMediaPagePreview } from '../wizard/preview/SocialMediaPagePreview';
import { BusinessPagePreview } from '../wizard/preview/BusinessPagePreview';
import { CouponPreview } from '../wizard/preview/CouponPreview';
import { FeedbackPreview } from '../wizard/preview/FeedbackPreview';
import { ReviewPreview } from '../wizard/preview/ReviewPreview';
import { AudioPreview } from '../wizard/preview/AudioPreview';
import { VideoPreview } from '../wizard/preview/VideoPreview';

interface QrContentPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    qrCode: {
        type: string;
        payload: any;
        design?: any;
    } | null;
}

export function QrContentPreviewModal({ isOpen, onClose, qrCode }: QrContentPreviewModalProps) {
    if (!qrCode) return null;

    // Render the appropriate preview component based on QR code type
    const renderPreview = () => {
        const { type, payload } = qrCode;

        // Merge design styles into the payload for preview components that expect 'styles'
        const previewData = {
            ...payload,
            styles: {
                ...(payload.styles || {}),
                ...(qrCode.design || {})
            }
        };

        switch (type.toLowerCase()) {
            case 'menu':
                return <MenuPreview data={previewData} />;
            case 'vcard':
                return <VCardPreview data={previewData} />;
            case 'url':
                return <URLPreview data={previewData} />;
            case 'text':
                return <TextPreview data={previewData} />;
            case 'wifi':
                return <WiFiPreview data={previewData} />;
            case 'file':
                return <FilePreview data={previewData} />;
            case 'event':
                return <EventPreview data={previewData} />;
            case 'email':
                return <EmailPreview data={previewData} />;
            case 'message':
                return <MessagePreview data={previewData} />;
            case 'appstore':
                return <AppStorePreview data={previewData} />;
            case 'socialmedia':
                return <SocialMediaPagePreview data={previewData} />;
            case 'business':
                return <BusinessPagePreview data={previewData} />;
            case 'coupon':
                return <CouponPreview data={previewData} />;
            case 'feedback':
                return <FeedbackPreview data={previewData} />;
            case 'review':
                return <ReviewPreview data={previewData} />;
            case 'audio':
                return <AudioPreview data={previewData} />;
            case 'video':
                return <VideoPreview data={previewData} />;
            default:
                return (
                    <div className="flex items-center justify-center h-full p-8 text-center">
                        <div>
                            <p className="text-slate-600 font-medium">Preview not available</p>
                            <p className="text-sm text-slate-500 mt-2">
                                Preview for {type} type is not supported yet
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <EnhancedPreviewModal isOpen={isOpen} onClose={onClose}>
            <PreviewProvider>
                {renderPreview()}
            </PreviewProvider>
        </EnhancedPreviewModal>
    );
}
