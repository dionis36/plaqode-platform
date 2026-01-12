/**
 * ICS File Generator for Event QR Codes
 * Compliant with RFC 5545
 */

import { saveAs } from 'file-saver';

type EventData = {
    title: string;
    start_date: string; // YYYY-MM-DD
    end_date: string;   // YYYY-MM-DD
    start_time?: string; // HH:mm
    end_time?: string;   // HH:mm
    all_day?: boolean;
    location?: string;
    description?: string;
    url?: string;
    organizer?: {
        name?: string;
        email?: string;
    };
    timezone?: string;
};

const formatICSDate = (dateStr: string, timeStr: string | undefined, timezone: string | undefined): string => {
    // Basic format: YYYYMMDDTHHmmSS
    const date = dateStr.replace(/-/g, '');
    const time = timeStr ? timeStr.replace(/:/g, '') + '00' : '000000';

    // Simplest robust method: Floating time (no 'Z') keeps it local to the user's device setting.
    return `${date}T${time}`;
};

export const generateICS = (data: EventData): string => {
    const lines: string[] = [];

    lines.push('BEGIN:VCALENDAR');
    lines.push('VERSION:2.0');
    lines.push('PRODID:-//Plaqode//Event QR//EN');
    lines.push('CALSCALE:GREGORIAN');
    lines.push('METHOD:PUBLISH');

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${Date.now()}@plaqode.com`);
    lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`);

    // SUMMARY
    lines.push(`SUMMARY:${data.title}`);

    // DTSTART / DTEND
    if (data.all_day) {
        lines.push(`DTSTART;VALUE=DATE:${data.start_date.replace(/-/g, '')}`);
        lines.push(`DTEND;VALUE=DATE:${data.end_date.replace(/-/g, '')}`);
    } else {
        const start = formatICSDate(data.start_date, data.start_time, data.timezone);
        const end = formatICSDate(data.end_date, data.end_time || data.start_time, data.timezone);

        lines.push(`DTSTART:${start}`);
        lines.push(`DTEND:${end}`);
    }

    // LOCATION
    if (data.location) {
        lines.push(`LOCATION:${data.location.replace(/,/g, '\\,')}`);
    }

    // DESCRIPTION
    if (data.description) {
        const desc = data.description
            .replace(/\\/g, '\\\\')
            .replace(/;/g, '\\;')
            .replace(/,/g, '\\,')
            .replace(/\n/g, '\\n');
        lines.push(`DESCRIPTION:${desc}`);
    }

    // URL
    if (data.url) {
        lines.push(`URL:${data.url}`);
    }

    // ORGANIZER
    if (data.organizer?.email) {
        const cn = data.organizer.name ? `;CN=${data.organizer.name}` : '';
        lines.push(`ORGANIZER${cn}:mailto:${data.organizer.email}`);
    }

    lines.push('END:VEVENT');
    lines.push('END:VCALENDAR');

    return lines.join('\r\n');
};

export const downloadICS = (data: EventData) => {
    const icsContent = generateICS(data);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const filename = `${data.title.replace(/[^a-z0-9]/gi, '_').substring(0, 30) || 'event'}.ics`;
    saveAs(blob, filename);
};
