'use client';

import { MenuPreview } from '../qrcodes/preview/MenuPreview';
import { VCardPreview } from '../qrcodes/preview/VCardPreview';
import { URLPreview } from '../qrcodes/preview/URLPreview';
import { TextPreview } from '../qrcodes/preview/TextPreview';
import { WiFiPreview } from '../qrcodes/preview/WiFiPreview';
import { FilePreview } from '../qrcodes/preview/FilePreview';
import { EventPreview } from '../qrcodes/preview/EventPreview';
import { EmailPreview } from '../qrcodes/preview/EmailPreview';
import { MessagePreview } from '../qrcodes/preview/MessagePreview';
import { AppStorePreview } from '../qrcodes/preview/AppStorePreview';
import { SocialMediaPagePreview } from '../qrcodes/preview/SocialMediaPagePreview';
import { PreviewProvider } from '../qrcodes/preview/PreviewContext';
import { EnhancedPreviewModal } from './EnhancedPreviewModal';

interface QrContentPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    qrCode: any;
}

export function QrContentPreviewModal({ isOpen, onClose, qrCode }: QrContentPreviewModalProps) {
    if (!qrCode) return null;

    const renderPreview = () => {
        const payload = qrCode.payload || {};
        // Merge design styles into the payload for preview components that expect 'styles'
        // This ensures that even if styles are stored in 'design' at the root (which is common for some types),
        // they are passed down correctly.
        const previewData = {
            ...payload,
            styles: {
                ...(payload.styles || {}),
                ...(qrCode.design || {})
            }
        };

        switch (qrCode.type) {
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
            default:
                return (
                    <div className="flex items-center justify-center h-full bg-slate-100 p-6 text-center">
                        <div>
                            <p className="text-slate-500 font-medium">Preview not available for this type</p>
                            <p className="text-sm text-slate-400 mt-2">({qrCode.type})</p>
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
