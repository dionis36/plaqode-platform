"use client";

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CardTemplate } from '@/types/template';

// Dynamic import of the Stage wrapper with SSR disabled
const KonvaPreviewStage = dynamic(() => import('./KonvaPreviewStage'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />
});

interface TemplatePreviewProps {
    template: CardTemplate;
    width?: number;
    height?: number;
}

export default function TemplatePreview({ template, width: initialWidth = 400, height: initialHeight = 229 }: TemplatePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight });

    // Measure container size
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width } = entry.contentRect;
                // Maintain 1.75 aspect ratio (standard business card)
                const height = width / 1.75;
                setDimensions({ width, height });
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    // Force re-render when fonts are loaded
    const [, setFontsLoaded] = useState(false);
    useEffect(() => {
        document.fonts.ready.then(() => {
            setFontsLoaded(true);
        });
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-gray-50 pointer-events-none">
            <KonvaPreviewStage
                template={template}
                width={dimensions.width}
                height={dimensions.height}
            />
        </div>
    );
}
