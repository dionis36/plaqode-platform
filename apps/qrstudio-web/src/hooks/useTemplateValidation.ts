import { useWizardStore } from '../components/wizard/store';

export const useTemplateValidation = (type: string) => {
    const { payload } = useWizardStore();

    let isValid = false;
    let errors: string[] = [];

    if (!payload) return { isValid: false, errors: ['No data'] };

    switch (type) {
        case 'text':
            if (payload.text_content?.message?.trim()) {
                isValid = true;
            } else {
                errors.push('Message is required');
            }
            break;

        case 'url':
            if (payload.url_details?.destination_url?.trim()) {
                // Basic URL check
                try {
                    let urlString = payload.url_details.destination_url;
                    if (!/^https?:\/\//i.test(urlString)) {
                        urlString = 'https://' + urlString;
                    }
                    new URL(urlString);
                    isValid = true;
                } catch {
                    errors.push('Invalid URL');
                }
            } else {
                errors.push('Destination URL is required');
            }
            break;

        case 'vcard':
            const hasName = payload.personal_info?.first_name?.trim();
            const hasContact = payload.contact_details?.phone?.trim() ||
                payload.contact_details?.mobile?.trim() ||
                payload.contact_details?.email?.trim();

            if (hasName && hasContact) {
                isValid = true;
            } else {
                if (!hasName) errors.push('First name is required');
                if (!hasContact) errors.push('At least one contact method (phone/email) is required');
            }
            break;

        case 'email':
            if (payload.email_details?.recipient?.trim()) {
                // Basic email check
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(payload.email_details.recipient)) {
                    isValid = true;
                } else {
                    errors.push('Invalid email address');
                }
            } else {
                errors.push('Recipient email is required');
            }
            break;

        case 'message':
            // Can be SMS or WhatsApp depending on platform toggle, but 'phone' is the main field name 
            // used in MessageForm.tsx/MessagePreview.tsx interaction
            if (payload.phone?.trim()) { // Changed from phone_number to phone based on MessageForm payload structure
                isValid = true;
            } else {
                errors.push('Phone number is required');
            }
            break;

        case 'wifi':
            if (payload.wifi_details?.ssid?.trim()) {
                isValid = true;
            } else {
                errors.push('Network name (SSID) is required');
            }
            break;

        case 'event':
            if (payload.event_details?.title?.trim() && payload.event_details?.start_date?.trim()) {
                isValid = true;
            } else {
                if (!payload.event_details?.title?.trim()) errors.push('Event title is required');
                if (!payload.event_details?.start_date?.trim()) errors.push('Start date is required');
            }
            break;

        case 'file':
        case 'pdf': // Handling both potential type names
            if (payload.pdf_file?.file_data || payload.pdf_file?.file_url) {
                isValid = true;
            } else {
                errors.push('Please upload a file');
            }
            break;

        case 'appstore':
            // Check if at least one platform link is present
            const hasPlatform = payload.platforms?.some((p: any) => p.url?.trim());
            // OR checks generic app info? Usually you need at least one link.
            if (hasPlatform) {
                isValid = true;
            } else {
                errors.push('At least one app store link is required');
            }
            break;

        case 'socialmedia':
            // Check for social links
            const hasSocialLinks = payload.social_links?.some((l: any) => l.url?.trim());
            if (hasSocialLinks) {
                isValid = true;
            } else {
                errors.push('Add at least one social media profile');
            }
            break;

        case 'menu':
            // Basic restaurant info + at least one item
            const hasRestName = payload.restaurant_info?.name?.trim();
            const hasItems = payload.content?.categories?.some((cat: any) => cat.items?.length > 0);

            if (hasRestName && hasItems) {
                isValid = true;
            } else {
                if (!hasRestName) errors.push('Restaurant name is required');
                if (!hasItems) errors.push('Add at least one menu item');
            }
            break;

        default:
            // For unknown types, maybe allow pass? Or block?
            // Safer to block and valid explicit types.
            isValid = false;
            errors.push('Unknown template type');
            break;
    }

    return { isValid, errors };
};
