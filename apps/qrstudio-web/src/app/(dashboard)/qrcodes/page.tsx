'use client';

import { redirect } from 'next/navigation';

export default function QrCodesPage() {
    // Redirect to Plaqode Web App Dashboard
    // Using environment variable check similar to other parts of the app
    const plaqodeUrl = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || 'http://localhost:3000';
    redirect(`${plaqodeUrl}/app/qrcodes`);
}
