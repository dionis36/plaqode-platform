
export const generateVCard = (data: any) => {
    // Helper to escape special characters for vCard values
    const escape = (str: string) => {
        if (!str) return '';
        return str.replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    };

    const lines = [];
    lines.push('BEGIN:VCARD');
    lines.push('VERSION:3.0');

    // Name
    const firstName = data.first_name || '';
    const lastName = data.last_name || '';
    const company = data.company || '';

    // N:LastName;FirstName;MiddleName;Prefix;Suffix
    lines.push(`N:${escape(lastName)};${escape(firstName)};;;`);

    // FN: Full Name
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    lines.push(`FN:${escape(fullName || company || 'Contact')}`);

    // Organization & Title
    if (company) lines.push(`ORG:${escape(company)}`);
    if (data.job_title) lines.push(`TITLE:${escape(data.job_title)}`);

    // Photo
    if (data.photo && data.photo.startsWith('data:image')) {
        // vCard expects raw base64 without the data URI prefix
        const base64Data = data.photo.split(',')[1];
        if (base64Data) {
            // TYPE can be JPEG, PNG, GIF. We'll default to JPEG if not sure or just generic.
            // Some parsers are strict.
            const type = data.photo.includes('png') ? 'PNG' : 'JPEG';
            lines.push(`PHOTO;ENCODING=b;TYPE=${type}:${base64Data}`);
        }
    }

    // Contact Details
    if (data.mobile) lines.push(`TEL;TYPE=CELL:${escape(data.mobile)}`);
    if (data.phone) lines.push(`TEL;TYPE=WORK:${escape(data.phone)}`);
    if (data.fax) lines.push(`TEL;TYPE=FAX:${escape(data.fax)}`);

    if (data.email) lines.push(`EMAIL;TYPE=WORK:${escape(data.email)}`);
    if (data.website) lines.push(`URL:${escape(data.website)}`); // Standard URL
    if (data.website) lines.push(`URL;type=pref:${escape(data.website)}`); // iOS preferred

    // Address
    // ADR:;;Street;City;Region;Zip;Country
    if (data.address || data.city || data.zip || data.country) {
        const parts = [
            '', // Post Office Box
            '', // Extended Address
            escape(data.address || ''),
            escape(data.city || ''),
            escape(data.state || ''), // Region
            escape(data.zip || ''),
            escape(data.country || '')
        ];
        lines.push(`ADR;TYPE=WORK:;${parts.join(';')}`);
    }

    // Social Profiles & Notes
    const notes = [];
    if (data.summary) notes.push(data.summary);

    if (data.social_links && data.social_links.length > 0) {
        notes.push('\nSocial Profiles:');
        data.social_links.forEach((link: any) => {
            if (link.url) {
                // Add standard X-SOCIALPROFILE for compatibility where supported
                lines.push(`X-SOCIALPROFILE;TYPE=${link.platform}:${escape(link.url)}`);
                // Add to notes as fallback
                notes.push(`${link.platform}: ${link.url}`);
            }
        });
    }

    if (notes.length > 0) {
        lines.push(`NOTE:${escape(notes.join('\n'))}`);
    }

    lines.push('END:VCARD');

    return lines.join('\r\n'); // CRLF is safer for vCard
};

export const downloadVCard = (data: any) => {
    const vcardContent = generateVCard(data);
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;

    // Filename: First_Last.vcf or Company.vcf
    const filenameName = [data.first_name, data.last_name].filter(Boolean).join('_') || data.company || 'contact';
    link.download = `${filenameName.replace(/[^a-z0-9_]/gi, '_')}.vcf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
