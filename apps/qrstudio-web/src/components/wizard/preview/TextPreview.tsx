import { FileText, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePreviewContext } from './PreviewContext';
import { MOCKUP_PREVIEW_DATA } from '../steps/mockupPreviewData';

type TextPreviewProps = {
    data: any;
};

export function TextPreview({ data }: TextPreviewProps) {
    const { setHeroBackgroundColor } = usePreviewContext();
    const [copied, setCopied] = useState(false);

    const fallback = MOCKUP_PREVIEW_DATA.text;

    const hasUserInput =
        (data?.text_content?.title || '') !== '' ||
        (data?.text_content?.message || '') !== '';

    const activeData = hasUserInput ? data : fallback;

    const textContent = {
        title: activeData.text_content?.title || (hasUserInput ? '' : fallback.text_content.title),
        message: activeData.text_content?.message || (hasUserInput ? '' : fallback.text_content.message),
    };

    const styles = data?.styles || {};
    const primaryColor = styles.primary_color || '#3B82F6';
    const secondaryColor = styles.secondary_color || '#EFF6FF';

    useEffect(() => {
        setHeroBackgroundColor(primaryColor);
    }, [primaryColor, setHeroBackgroundColor]);

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
                    {/* Floating Icon */}
                    <div className="relative group mb-5">
                        <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 transition-opacity duration-500 scale-125" />
                        <div
                            className="relative h-24 w-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-1 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out rotate-3"
                        >
                            <FileText
                                className="w-10 h-10"
                                style={{ color: primaryColor }}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2 break-words max-w-xs">
                        {textContent.title || 'Text Message'}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Read message
                    </p>
                </div>

                {/* 2. Main Glass Card */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        <div className="space-y-6">
                            {/* Text Content Area */}
                            <div className="relative">
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-white to-slate-50 opacity-50 blur-sm" />
                                <div className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm min-h-[160px] flex items-start">
                                    <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap font-medium break-words w-full">
                                        {textContent.message || <span className="text-slate-400 italic">No text content provided.</span>}
                                    </p>
                                </div>
                            </div>

                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                disabled={copied || !textContent.message}
                                className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white relative overflow-hidden"
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
