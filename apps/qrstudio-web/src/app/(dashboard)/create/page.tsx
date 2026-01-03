'use client';

import { redirect } from 'next/navigation';
import { env } from "@/lib/env";

export default function CreatePage() {
    const platformUrl = env.NEXT_PUBLIC_PLATFORM_URL;
    redirect(`${platformUrl}/services#qr-tools-catalog`);
}
