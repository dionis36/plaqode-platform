'use client';

import { FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';

type TextPreviewProps = {
    data: any;
};

export function TextPreview({ data }: TextPreviewProps) {
    const [copied, setCopied] = useState(false);

    const textContent = data?.text_content || {};
    const styles = data?.styles || {};

    const primaryColor = styles.primary_color || '#3B82F6';
    const secondaryColor = styles.secondary_color || '#EFF6FF';

    const handleCopy = () => {
        const textToCopy = textContent.message || '';
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div
            className="absolute inset-0 w-full h-full font-sans overflow-hidden bg-white"
            style={{
                background: `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)`
            }}
        >
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* --- Fixed Background Elements --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-[-20%] left-[-20%] w-[120%] h-[60%] rounded-[100%] blur-3xl opacity-40 animate-pulse"
                    style={{ background: primaryColor }}
                />
                <div
                    className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[50%] rounded-[100%] blur-3xl opacity-30"
                    style={{ background: secondaryColor }}
                />
            </div>

            {/* --- Scrollable Content --- */}
            <div className="relative w-full h-full overflow-y-auto no-scrollbar flex flex-col z-10">

                {/* Spacer */}
                <div className="w-full flex-none pt-20" />


                {/* 1. Header (Floating) */}
                <div className="flex-none flex flex-col justify-center items-center pb-8 px-4 text-center">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2 break-words max-w-xs">
                        {textContent.title || 'Text Message'}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Read message
                    </p>
                </div>

                {/* 2. Main Glass Card */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8 w-full">
                    <div className="w-full max-w-md bg-white/90 backdrop-blur-3xl rounded-[2rem] shadow-xl border border-white/50 px-8 py-10 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700">

                        <div className="space-y-8">
                            {/* Text Content */}
                            <p className="text-slate-900 text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-normal break-words w-full text-left">
                                {textContent.message || <span className="text-slate-400 italic">No text content provided.</span>}
                            </p>

                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                disabled={copied || !textContent.message}
                                className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white relative overflow-hidden mt-4"
                                style={{
                                    backgroundColor: primaryColor,
                                    opacity: !textContent.message ? 0.7 : 1,
                                    cursor: !textContent.message ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                                <span className="text-lg">{copied ? 'Copied' : 'Copy Text'}</span>
                            </button>
                        </div>

                    </div>
                </div>

                <div className="flex-1 min-h-0" />
                <div className="flex-none pt-4 pb-4 text-[10px] uppercase tracking-widest text-slate-400 font-semibold text-center opacity-60">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
