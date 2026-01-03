import { redirect } from 'next/navigation';
import { env } from "@/lib/env";

export default function Home() {
    const platformUrl = env.NEXT_PUBLIC_PLATFORM_URL;
    redirect(`${platformUrl}/services#qr-tools-catalog`);
}
