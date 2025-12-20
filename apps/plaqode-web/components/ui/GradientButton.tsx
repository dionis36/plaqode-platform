import Link from 'next/link';

interface GradientButtonProps {
    href: string;
    text: string;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export default function GradientButton({ href, text, className = "", size = "md" }: GradientButtonProps) {
    const sizeClasses = {
        sm: "px-6 py-2 text-sm",
        md: "px-8 py-3 text-base",
        lg: "px-10 py-4 text-lg"
    };

    return (
        <Link
            href={href}
            className={`group relative inline-flex items-center justify-center font-semibold rounded-full transition-transform duration-300 ${className}`}
        >
            {/* 1. The Gradient Border (Masked) */}
            <span
                className="absolute inset-0 rounded-full gradient-border-mask pointer-events-none"
            />

            {/* 3. Text */}
            <span className={`relative z-10 text-white ${sizeClasses[size]}`}>
                {text}
            </span>
        </Link>
    );
}
