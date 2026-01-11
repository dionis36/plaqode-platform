'use client';

import { Ticket, Clock, Copy, ExternalLink, Scissors, Check } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';

interface CouponPreviewProps {
    data: any;
}

export function CouponPreview({ data }: CouponPreviewProps) {
    const primaryColor = data.styles?.primary_color || '#16A34A';
    const secondaryColor = data.styles?.secondary_color || '#DCFCE7';

    // Fallback data
    const couponData = data.coupon || {
        title: 'Exclusive Offer',
        description: 'Get 20% off your next purchase!',
        code: 'WELCOME20',
        valid_until: '',
        terms: 'Valid for one-time use only.',
        offer_image: '',
        button_label: 'Redeem Now',
        offer_url: ''
    };

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (couponData.code) {
            navigator.clipboard.writeText(couponData.code);
            setCopied(true);

            // Confetti removed to prevent missing dependency error
            // setCopied(true);

            setTimeout(() => setCopied(false), 2500);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return null;
        try {
            return format(new Date(dateString), 'PPP');
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="absolute inset-0 w-full h-full bg-slate-50 flex flex-col font-sans overflow-hidden">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <style jsx>{`
                .theme-text { color: ${primaryColor}; }
                .theme-bg { backgroundColor: ${primaryColor}; }
                .theme-bg-light { backgroundColor: ${secondaryColor}; }
                .theme-border { borderColor: ${primaryColor}40; } /* 25% opacity */
                .theme-border-strong { borderColor: ${primaryColor}; }
            `}</style>

            {/* Header / Background */}
            <div className="absolute top-0 left-0 w-full h-64 z-0 transition-colors duration-500" style={{ backgroundColor: primaryColor }}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]" />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center pt-12 px-4 pb-8 overflow-y-auto no-scrollbar">

                {/* Brand / Title */}
                <h1 className="text-white text-3xl font-bold mb-8 text-center drop-shadow-sm px-4">
                    {couponData.title || 'Exclusive Offer'}
                </h1>

                {/* Ticket Card */}
                <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative transform transition-transform hover:scale-[1.01] duration-300">

                    {/* Image Section */}
                    {couponData.offer_image ? (
                        <div className="w-full aspect-video relative bg-slate-200">
                            <img src={couponData.offer_image} alt="Offer" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-full h-32 flex items-center justify-center border-b border-slate-100" style={{ backgroundColor: secondaryColor }}>
                            <Ticket size={48} style={{ color: primaryColor, opacity: 0.8 }} />
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 flex flex-col items-center text-center bg-white relative">

                        <p className="text-slate-600 text-lg leading-relaxed font-medium mb-4">
                            {couponData.description}
                        </p>

                        {/* Dashed Divider with Cutouts */}
                        <div className="w-full relative py-5">
                            <div className="absolute left-0 top-1/2 w-full border-t-2 border-dashed" style={{ borderColor: `${primaryColor}40` }} />
                            <div className="absolute -left-10 top-1/2 -mt-3 w-6 h-6 bg-slate-50 rounded-full" /> {/* Matches global bg */}
                            <div className="absolute -right-10 top-1/2 -mt-3 w-6 h-6 bg-slate-50 rounded-full" />
                        </div>

                        {/* Coupon Code Block */}
                        <div className="w-full space-y-2">
                            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: `${primaryColor}90` }}>Coupon Code</div>
                            <button
                                onClick={handleCopy}
                                className="w-full group relative overflow-hidden rounded-xl p-4 transition-all border-2 border-dashed hover:shadow-sm"
                                style={{
                                    backgroundColor: secondaryColor,
                                    borderColor: `${primaryColor}60`
                                }}
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <span className="font-mono text-2xl font-bold tracking-wider" style={{ color: primaryColor }}>
                                        {couponData.code}
                                    </span>
                                    {copied ? (
                                        <div className="flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-white/50 text-green-700">
                                            <Check size={14} strokeWidth={3} />
                                            <span>COPIED</span>
                                        </div>
                                    ) : (
                                        <Copy size={20} style={{ color: primaryColor, opacity: 0.6 }} className="group-hover:opacity-100 transition-opacity" />
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Expiry */}
                        {couponData.valid_until && (
                            <div className="flex items-center gap-2 text-sm mt-6 px-3 py-1.5 rounded-full" style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                                <Clock size={14} />
                                <span>Valid until {formatDate(couponData.valid_until)}</span>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100">
                        {couponData.offer_url ? (
                            <a
                                href={couponData.offer_url.startsWith('http') ? couponData.offer_url : `https://${couponData.offer_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
                                style={{ backgroundColor: primaryColor, boxShadow: `0 10px 15px -3px ${primaryColor}70` }}
                            >
                                <span>{couponData.button_label || 'Redeem Now'}</span>
                                <ExternalLink size={18} />
                            </a>
                        ) : (
                            <div className="text-center text-xs text-slate-400 py-2">
                                Show this coupon at checkout to redeem
                            </div>
                        )}

                        {couponData.terms && (
                            <p className="text-[10px] text-slate-400 text-center mt-4 leading-normal max-w-xs mx-auto">
                                *{couponData.terms}
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer Branding */}
                <div className="mt-auto pt-12 pb-4 flex items-center justify-center gap-2 opacity-40 grayscale">
                    <span className="font-bold text-slate-900 text-sm">PLA<span className="text-slate-400">QODE</span></span>
                </div>
            </div>
        </div>
    );
}
