import { UniversalLoader } from "./UniversalLoader";

interface LoadingBoundaryProps {
    isLoading: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    center?: boolean;
    className?: string; // Class for the loader container if needed
}

export function LoadingBoundary({
    isLoading,
    children,
    fallback,
    size = 'md',
    text,
    center = true, // Default to centered as it replaces full component views usually
    className
}: LoadingBoundaryProps) {
    if (isLoading) {
        if (fallback) return <>{fallback}</>;

        return (
            <div className={className}>
                <UniversalLoader size={size} text={text} center={center} />
            </div>
        );
    }

    return <>{children}</>;
}
