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
                    <div className="min-h-full flex flex-col items-center justify-center py-12 px-4">

                        {/* 1. Header */}
                        <div className="flex-none flex flex-col justify-center items-center pb-8 px-4 text-center w-full max-w-md mx-auto">

                            {/* Title */}
                            {urlDetails.title && (
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2 break-words w-full">
                                    {urlDetails.title}
                                </h1>
                            )}

                            {/* Description */}
                            {urlDetails.description && (
                                <p className="text-slate-600 font-medium text-sm leading-relaxed w-full">
                                    {urlDetails.description}
                                </p>
                            )}
                        </div>

                        {/* 2. Main Glass Card */}
                        <div className="flex-shrink-0 w-full max-w-md bg-white/90 backdrop-blur-3xl rounded-[2rem] shadow-xl border border-white/50 px-6 py-8 flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700">

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
                            <div className="w-full space-y-3">
                                <button
                                    className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white relative overflow-hidden"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    <span>Open Link</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                {/* URL Display */}
                                <div className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-50 rounded-xl border border-slate-100 w-full overflow-hidden">
                                    <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                    <p className="text-xs text-slate-500 truncate max-w-full">
                                        {urlDetails.destination_url || 'https://...'}
                                    </p>
                                </div>
                            </div>

                            {/* Custom Message */}
                            {redirectSettings.custom_message && (
                                <p className="mt-6 text-sm text-slate-600 text-center font-medium bg-slate-50/50 px-4 py-2 rounded-lg w-full">
                                    &quot;{redirectSettings.custom_message}&quot;
                                </p>
                            )}

                        </div>

                        <div className="flex-none pt-8 text-[10px] uppercase tracking-widest text-slate-400 font-semibold text-center opacity-60">
                            Powered by Plaqode
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

