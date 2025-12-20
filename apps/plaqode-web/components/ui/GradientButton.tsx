import Link from 'next/link';

interface GradientButtonProps {
    href: string;
    text: string;
    className?: string;
}

export default function GradientButton({ href, text, className = "" }: GradientButtonProps) {
    return (
        <Link
            href={href}
            className={`group relative inline-flex items-center justify-center p-[2px] overflow-hidden font-semibold rounded-full transition-all duration-300 hover:scale-105 ${className}`}
        >
            {/* The Gradient Border Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-full"></span>

            {/* The Inner Button Body */}
            <span className="relative px-8 py-4 transition-all duration-300 bg-[#0a0a0a] hover:bg-transparent rounded-full text-white">
                {text}
            </span>
        </Link>
    );
}
