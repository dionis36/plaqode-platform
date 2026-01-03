'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
    label?: string;
    className?: string;
}

import { useState, useEffect } from 'react';

export function BackButton({ label = 'Back', className = '' }: BackButtonProps) {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <button
            onClick={() => router.back()}
            className={`flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors ${className}`}
        >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}
