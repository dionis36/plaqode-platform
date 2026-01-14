import { ExternalLink, ArrowRight, Link as LinkIcon, Loader2 } from 'lucide-react';
import { usePreviewContext } from './PreviewContext';
import { useEffect } from 'react';
import { MOCKUP_PREVIEW_DATA } from '../steps/mockupPreviewData';

interface URLPreviewProps {
    data: any;
}

export function URLPreview({ data }: URLPreviewProps) {
    const { setHeroBackgroundColor } = usePreviewContext();

    const fallback = MOCKUP_PREVIEW_DATA.url;

    // Check if user has started entering ANY content
    const hasUserInput =
        (data?.url_details?.destination_url || '') !== '' ||
        (data?.url_details?.title || '') !== '' ||
        (data?.url_details?.description || '') !== '' ||
        (data?.url_details?.logo || '') !== '';

    const activeData = hasUserInput ? data : fallback;

    const urlDetails = {
        destination_url: activeData?.url_details?.destination_url || (hasUserInput ? '' : fallback.url_details.destination_url),
        title: activeData?.url_details?.title || (hasUserInput ? '' : fallback.url_details.title),
        description: activeData?.url_details?.description || (hasUserInput ? '' : fallback.url_details.description),
        logo: activeData?.url_details?.logo || null,
    };

    const redirectSettings = data?.redirect_settings || fallback.redirect_settings;
    const styles = data?.styles || {};

    const primaryColor = styles.primary_color || fallback.styles.primary_color;
    const secondaryColor = styles.secondary_color || fallback.styles.secondary_color;

    useEffect(() => {
        setHeroBackgroundColor(primaryColor);
    }, [primaryColor, setHeroBackgroundColor]);

    const isInstantRedirect = redirectSettings.delay === 0;
    const showPreview = redirectSettings.show_preview;

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

                {/* Instant Redirect Loading State */}
                {isInstantRedirect && !showPreview ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-white/50 rounded-full blur-xl animate-pulse" />
                            <Loader2
                                className="w-12 h-12 animate-spin relative z-10"
                                style={{ color: primaryColor }}
                            />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Redirecting...</h2>
                        <p className="text-slate-500 text-sm">Please wait while we take you to the destination.</p>
                    </div>
                ) : (
                    <div className="min-h-full w-full flex flex-col py-8 px-4 sm:px-6">

                        {/* Spacer to push content down */}
                        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-6">

                            {/* 1. Header (Title & Description) - Only render if content exists */}
                            {(urlDetails?.title || urlDetails?.description) && (
                                <div className="text-center w-full space-y-2">
                                    {urlDetails?.title && (
                                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight drop-shadow-sm px-2 break-words leading-tight">
                                            {urlDetails.title}
                                        </h1>
                                    )}
                                    {urlDetails?.description && (
                                        <p className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
                                            {urlDetails.description}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* 2. Main Glass Card */}
                            <div className="w-full bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 px-6 py-8 sm:px-8 sm:py-10 flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-black/5">

                                {/* Countdown / Status */}
                                {redirectSettings.delay > 0 && (
                                    <div className="mb-6 flex flex-col items-center">
                                        <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                                <circle
                                                    cx="32" cy="32" r="28"
                                                    fill="none"
                                                    stroke={secondaryColor}
                                                    strokeWidth="4"
                                                />
                                                <circle
                                                    cx="32" cy="32" r="28"
                                                    fill="none"
                                                    stroke={primaryColor}
                                                    strokeWidth="4"
                                                    strokeDasharray="175.9"
                                                    strokeDashoffset="0" // In a real app, animate this
                                                    strokeLinecap="round"
                                                    className="opacity-100"
                                                />
                                            </svg>
                                            <span className="text-xl font-bold" style={{ color: primaryColor }}>
                                                {redirectSettings.delay}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">Redirecting automatically...</p>
                                    </div>
                                )}

                                {/* Manual Link Button */}
                                <div className="w-full space-y-4">
                                    <button
                                        className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white relative overflow-hidden"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        <span>Open Link</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>

                                    {/* URL Display */}
                                    <div className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-50/80 rounded-xl border border-slate-100 w-full overflow-hidden">
                                        <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                        <p className="text-xs text-slate-500 truncate max-w-full font-mono">
                                            {urlDetails.destination_url ? new URL(urlDetails.destination_url).hostname : '...'}
                                        </p>
                                    </div>
                                </div>

                                {/* Custom Message */}
                                {redirectSettings.custom_message && (
                                    <div className="mt-6 text-center w-full">
                                        <p className="text-sm text-slate-600 font-medium bg-slate-50/50 px-4 py-2 rounded-lg inline-block border border-slate-100">
                                            &quot;{redirectSettings.custom_message}&quot;
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Footer - Pushed to bottom */}
                        <div className="flex-none pt-12 pb-4 text-center">
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold opacity-60">
                                Powered by Plaqode
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

