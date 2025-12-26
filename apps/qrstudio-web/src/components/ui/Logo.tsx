import Image from "next/image";
import Link from "next/link";
// Ensure NEXT_PUBLIC_PLAQODE_WEB_URL is defined or fallback
const HOME_URL = process.env.NEXT_PUBLIC_PLAQODE_WEB_URL || "http://localhost:3000";

interface LogoProps {
    color?: "white" | "dark";
}

export default function Logo({ color = "white" }: LogoProps) {
    return (
        <Link href={HOME_URL} className="flex items-center gap-3">
            {/* Icon */}
            <div className="relative w-10 h-10">
                <Image
                    src="/img/qr-code-2.png"
                    alt="Plaqode Logo"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Text Branding */}
            <span className={`font-serif text-2xl font-bold tracking-tight ${color === "white" ? "text-white" : "text-slate-900"}`}>
                PlaQode
            </span>
        </Link>
    );
}
