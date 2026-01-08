import { cn } from "../lib/utils";

type UniversalLoaderProps = {
    size?: 'sm' | 'md' | 'lg';
    center?: boolean;
    className?: string;
    text?: string;
    variant?: 'inline' | 'page' | 'button'; // Added for backward compat / explicitly intention
};

const sizeMap = {
    sm: 'text-[16px]',
    md: 'text-[28px]',
    lg: 'text-[40px]',
};

export function UniversalLoader({
    size = 'md',
    center = false,
    className,
    text,
    variant = 'inline',
}: UniversalLoaderProps) {
    const isPage = variant === 'page' || center;

    return (
        <div
            role="status"
            aria-busy="true"
            className={cn(
                "relative flex flex-col items-center justify-center gap-3",
                sizeMap[size],
                isPage ? "absolute inset-0 m-auto w-fit h-fit" : "inline-flex",
                className
            )}
        >
            <div className="spinner relative w-[1em] h-[1em]">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="spinner-blade" />
                ))}
            </div>
            {text && (
                <span className="text-sm font-medium text-muted-foreground animate-pulse">
                    {text}
                </span>
            )}
        </div>
    );
}
