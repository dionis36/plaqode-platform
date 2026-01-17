import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

interface EnhancedPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function EnhancedPreviewModal({ isOpen, onClose, children }: EnhancedPreviewModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300 ease-out"
            onClick={onClose}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
            }}
        >
            <div
                className="relative w-full max-w-md animate-in zoom-in-95 duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Close preview"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Phone mockup - full screen on mobile, scaled on desktop */}
                <div className="transform scale-100 md:scale-90 origin-center">
                    <PhoneMockup className="shadow-2xl">
                        {children}
                    </PhoneMockup>
                </div>
            </div>
        </div>,
        document.body
    );
}
