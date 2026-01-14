'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, ArrowRight, Link as LinkIcon, Loader2 } from 'lucide-react';

interface SmartLandingPageProps {
    qrCode: {
        id: string;
        type: string;
        name: string;
        shortcode: string;
        payload: {
            url_details?: {
                destination_url: string;
                title?: string;
                description?: string;
                logo?: string;
            };
            redirect_settings?: {
                delay: number;
                show_preview: boolean;
                custom_message?: string;
            };
            styles?: {
                primary_color?: string;
                secondary_color?: string;
                gradient_type?: 'none' | 'linear' | 'radial';
                gradient_angle?: number;
            };
        };
    };
}

export function SmartLandingPage({ qrCode }: SmartLandingPageProps) {
    const urlDetails = qrCode.payload?.url_details;
    const redirectSettings = qrCode.payload?.redirect_settings;
    const styles = qrCode.payload?.styles;

    const destinationUrl = urlDetails?.destination_url || '';
    const delay = redirectSettings?.delay || 0; // Default to 0 if undefined
    const showPreview = redirectSettings?.show_preview ?? true; // Default to true if undefined
    const customMessage = redirectSettings?.custom_message || '';

    const primaryColor = styles?.primary_color || '#3B82F6';
    const secondaryColor = styles?.secondary_color || '#EFF6FF';

    const [countdown, setCountdown] = useState(delay);
    const [redirecting, setRedirecting] = useState(false);

    // Redirect Logic
    useEffect(() => {
        // If delay is 0 (Direct), redirect immediately
        if (delay === 0) {
            setRedirecting(true);
            window.location.href = destinationUrl;
            return;
        }

        // Timer for Indirect Redirect
        const timer = setInterval(() => {
            setCountdown((prev) => {
                const next = prev - 1;
                if (next <= 0) {
                    clearInterval(timer);
                    setRedirecting(true);
                    window.location.href = destinationUrl;
                    return 0;
                }
                return next;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [delay, destinationUrl]);

    // Background Style
    const getBackgroundStyle = () => {
        // We'll use the same subtle gradient as other tools for consistency if gradient_type is default
        return `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)`;
    };

    const isInstantRedirect = delay === 0;

    // --- RENDER ---

    return (
        <div
            className="min-h-screen w-full font-sans overflow-hidden bg-white relative flex flex-col"
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
                    <div className="min-h-full w-full flex flex-col py-8 px-4 sm:px-6">

                        {/* Spacer to push content down */}
                        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8">

                            {/* 1. Header (Title & Description) - Only render if content exists */}
                            {(urlDetails?.title || urlDetails?.description) && (
                                <div className="text-center w-full space-y-3">
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

                                {/* Countdown Circle */}
                                {delay > 0 && !redirecting && (
                                    <div className="mb-8 flex flex-col items-center">
                                        <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                                <circle
                                                    cx="48" cy="48" r="42"
                                                    fill="none"
                                                    stroke={secondaryColor}
                                                    strokeWidth="6"
                                                    className="opacity-50"
                                                />
                                                <circle
                                                    cx="48" cy="48" r="42"
                                                    fill="none"
                                                    stroke={primaryColor}
                                                    strokeWidth="6"
                                                    strokeDasharray="263.89" // 2 * PI * 42
                                                    strokeDashoffset={263.89 * (1 - countdown / delay)}
                                                    strokeLinecap="round"
                                                    className="transition-all duration-1000 ease-linear"
                                                />
                                            </svg>
                                            <span className="text-3xl font-bold" style={{ color: primaryColor }}>
                                                {countdown}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 font-bold uppercase tracking-wide">Redirecting...</p>
                                    </div>
                                )}

                                {/* Loading Spinner (When redirecting) */}
                                {redirecting && (
                                    <div className="mb-8 flex flex-col items-center">
                                        <Loader2 className="w-12 h-12 animate-spin mb-3" style={{ color: primaryColor }} />
                                        <p className="text-sm text-slate-500 font-semibold">Opening link...</p>
                                    </div>
                                )}

                                {/* Manual Link Button */}
                                <a
                                    href={destinationUrl}
                                    className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white relative overflow-hidden group"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    <span className="text-lg">Open Link</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>

                                {/* URL Display */}
                                <div className="mt-6 flex items-center justify-center gap-2 py-2 px-4 bg-slate-50/80 rounded-xl border border-slate-100 w-full overflow-hidden">
                                    <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                    <p className="text-xs text-slate-500 truncate font-mono">
                                        {destinationUrl ? new URL(destinationUrl).hostname : '...'}
                                    </p>
                                </div>

                                {/* Custom Message */}
                                {customMessage && (
                                    <div className="mt-6 text-center w-full">
                                        <p className="text-sm text-slate-600 font-medium bg-slate-50/50 px-4 py-3 rounded-xl border border-slate-100 inline-block">
                                            &quot;{customMessage}&quot;
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
