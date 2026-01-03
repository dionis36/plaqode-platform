'use client';

import { redirect } from 'next/navigation';
import { env } from "@/lib/env";

export default function QrCodesPage() {
    // Redirect to Plaqode Web App Dashboard
    // Using environment variable check similar to other parts of the app
    const plaqodeUrl = env.NEXT_PUBLIC_PLATFORM_URL;
    redirect(`${env.NEXT_PUBLIC_QRSTUDIO_URL}/app/qrcodes`);
}
