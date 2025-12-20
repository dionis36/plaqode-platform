import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-3">
            {/* Icon */}
            <div className="relative w-10 h-10">
                {/* Using qr-code-2.png as the icon based on file analysis. 
             Ideally we'd want a vector, but we use what we have. */}
                <Image
                    src="/img/qr-code-2.png"
                    alt="Plaqode Logo"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Text Branding */}
            <span className="font-merriweather text-2xl tracking-tight text-white">
                PlaQode
            </span>
        </Link>
    );
}
