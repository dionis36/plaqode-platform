'use client';

import { ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface URLPreviewProps {
    data: any;
}

export function URLPreview({ data }: URLPreviewProps) {
    const urlDetails = data?.url_details || {};
    const redirectSettings = data?.redirect_settings || { delay: 2, show_preview: true };
    const styles = data?.styles || { primary_color: '#2563EB', secondary_color: '#EFF6FF' };

    const destinationUrl = urlDetails.destination_url || 'https://example.com';
    const title = urlDetails.title || 'Redirecting...';
    const description = urlDetails.description || '';
    const customMessage = redirectSettings.custom_message || '';

    // Get user's colors
    const primaryColor = styles.primary_color || '#2563EB';
    const secondaryColor = styles.secondary_color || '#EFF6FF';

    const [countdown, setCountdown] = useState(redirectSettings.delay || 0);
    const [redirecting, setRedirecting] = useState(false);

    // Note: This component might be used in a context where auto-redirect logic should or shouldn't run.
    // If it's used as a static preview, we might not want to redirect.
    // But assuming it mirrors SmartLandingPage behavior for consistency:

    const delay = redirectSettings.delay || 0;
    const showPreview = redirectSettings.show_preview ?? true;
    const isInstantRedirect = delay === 0;

    // Background Style
    const getBackgroundStyle = () => {
        return `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)`;
    };

    return (
        <div
            className="absolute inset-0 w-full h-full font-sans overflow-hidden bg-white flex flex-col"
            style={{ background: getBackgroundStyle() }}
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

            <div className="relative w-full h-full flex-1 flex flex-col z-10 overflow-y-auto no-scrollbar">

                {/* Instant Redirect Loading Screen */}
                {isInstantRedirect && !showPreview ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-white/50 rounded-full blur-xl animate-pulse" />
                            <Loader2
                                className="w-16 h-16 animate-spin relative z-10"
                                style={{ color: primaryColor }}
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Redirecting...</h2>
                        <p className="text-slate-500 text-lg">Taking you to the destination.</p>
                    </div>
                ) : (
                    <div className="min-h-full w-full flex flex-col items-center justify-center py-12 px-4">

                        {/* 1. Header */}
                        <div className="flex-none flex flex-col justify-center items-center pb-8 px-4 text-center w-full max-w-sm mx-auto">

                            {/* Title */}
                            {title && (
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2 break-words w-full">
                                    {title}
                                </h1>
                            )}

                            {/* Description */}
                            {description && (
                                <p className="text-slate-600 font-medium text-base leading-relaxed w-full">
                                    {description}
                                </p>
                            )}
                        </div>

                        {/* 2. Main Glass Card */}
                        <div className="flex-shrink-0 w-full max-w-md bg-white/90 backdrop-blur-3xl rounded-[2rem] shadow-xl border border-white/50 px-8 py-10 flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700">

                            {/* Countdown Circle */}
                            {delay > 0 && (
                                <div className="mb-8 flex flex-col items-center">
                                    <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                                            <circle
                                                cx="40" cy="40" r="36"
                                                fill="none"
                                                stroke={secondaryColor}
                                                strokeWidth="6"
                                                className="opacity-50"
                                            />
                                            <circle
                                                cx="40" cy="40" r="36"
                                                fill="none"
                                                stroke={primaryColor}
                                                strokeWidth="6"
                                                strokeDasharray="226.19"
                                                strokeDashoffset={226.19 * (1 - countdown / delay)}
                                                strokeLinecap="round"
                                                className="transition-all duration-1000 ease-linear"
                                            />
                                        </svg>
                                        <span className="text-2xl font-bold" style={{ color: primaryColor }}>
                                            {countdown}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium">Redirecting automatically...</p>
                                </div>
                            )}

                            {/* Manual Link Button */}
                            <a
                                href={destinationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white relative overflow-hidden group"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <span className="text-lg">Open Link</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {/* URL Display */}
                            <div className="mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-slate-50 rounded-xl border border-slate-100 max-w-full overflow-hidden w-full box-border">
                                <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                <p className="text-xs text-slate-500 truncate font-mono">
                                    {new URL(destinationUrl).hostname}
                                </p>
                            </div>

                            {/* Custom Message */}
                            {customMessage && (
                                <p className="mt-8 text-sm text-slate-600 text-center font-medium bg-slate-50/50 px-4 py-3 rounded-xl border border-slate-100 w-full">
                                    &quot;{customMessage}&quot;
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
