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
        const styles = qrCode.design || {}; // Assuming styles might be in design or separate, adjusting based on typical structure

        // Normalize data structure if needed by previews
        // Most previews expect { ...payload, styles: ... } or just payload
        // Let's pass the whole object if standard, or construct what they need.
        // Checking MenuPreview it expects { restaurant_info, content, styles } which matches payload structure usually.

        switch (qrCode.type) {
            case 'menu':
                return <MenuPreview data={payload} />;
            case 'vcard':
                return <VCardPreview data={payload} />;
            case 'url':
                return <URLPreview data={payload} />;
            case 'text':
                return <TextPreview data={payload} />;
            case 'wifi':
                return <WiFiPreview data={payload} />;
            case 'file':
                return <FilePreview data={payload} />;
            case 'event':
                return <EventPreview data={payload} />;
            case 'email':
                return <EmailPreview data={payload} />;
            case 'message':
                return <MessagePreview data={payload} />;
            case 'appstore':
                return <AppStorePreview data={payload} />;
            case 'socialmedia':
                return <SocialMediaPagePreview data={payload} />;
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
