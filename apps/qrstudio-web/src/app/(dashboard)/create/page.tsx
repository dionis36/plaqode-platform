'use client';

import { redirect } from 'next/navigation';

export default function CreateQrPage() {
    // Redirect to Plaqode Web Services page (Tools Catalog section)
    // Using environment variable check similar to other parts of the app
    const plaqodeUrl = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || 'http://localhost:3000';
    redirect(`${plaqodeUrl}/services#qr-tools-catalog`);
}
