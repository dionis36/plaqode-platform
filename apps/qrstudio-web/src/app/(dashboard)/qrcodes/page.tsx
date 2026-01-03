'use client';

import { redirect } from 'next/navigation';
import { env } from "@/lib/env";

export default function QrCodesPage() {
    // Redirect to Plaqode Web App Dashboard
    // Using environment variable check similar to other parts of the app
    const plaqodeUrl = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || 'http://localhost:3000';
    redirect(`${process.env.NEXT_PUBLIC_QRSTUDIO_URL}/app/qrcodes`);
}
