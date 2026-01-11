import { Ticket, Clock, Copy, ExternalLink, Scissors, Check } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';

interface CouponPreviewProps {
    data: any;
}

export function CouponPreview({ data }: CouponPreviewProps) {
    const primaryColor = data.styles?.primary_color || '#16A34A';
    const secondaryColor = data.styles?.secondary_color || '#DCFCE7';

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
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
        <div className="h-full w-full bg-slate-50 flex flex-col relative overflow-hidden font-sans">
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Header Background */}
            <div
                className="w-full h-48 absolute top-0 left-0 z-0 transition-colors duration-300"
                style={{ backgroundColor: primaryColor }}
            >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]" />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="flex-1 z-10 flex flex-col items-center pt-24 px-6 overflow-y-auto no-scrollbar">
                <h1 className="text-white text-2xl font-bold mb-6 drop-shadow-md text-center">
                    {couponData.title || 'Exclusive Offer'}
                </h1>

                {/* Main Coupon Card */}
                <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">

                    {couponData.offer_image ? (
                        <div className="w-full aspect-video bg-slate-100 relative">
                            <img
                                src={couponData.offer_image}
                                alt="Offer"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-32 flex items-center justify-center border-b border-slate-100" style={{ backgroundColor: secondaryColor }}>
                            <Ticket size={48} style={{ color: primaryColor, opacity: 0.8 }} />
                        </div>
                    )}

                    <div className="p-6 flex flex-col items-center text-center">
                        <p className="text-slate-600 text-lg mb-4 leading-relaxed font-medium">
                            {couponData.description || 'Get 20% off your next purchase!'}
                        </p>

                        {/* Dashed Line */}
                        <div className="w-full relative py-4 mb-2">
                            <div className="absolute left-0 top-1/2 w-full border-t-2 border-dashed" style={{ borderColor: `${primaryColor}40` }} />
                            <div className="absolute -left-9 top-1/2 -mt-3 w-6 h-6 bg-slate-50 rounded-full" />
                            <div className="absolute -right-9 top-1/2 -mt-3 w-6 h-6 bg-slate-50 rounded-full" />
                        </div>

                        {/* Code Display */}
                        <div className="w-full space-y-2 mb-6">
                            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: `${primaryColor}90` }}>Coupon Code</div>
                            <button
                                onClick={handleCopy}
                                className="w-full relative overflow-hidden rounded-xl p-3 transition-all border-2 border-dashed hover:shadow-sm flex items-center justify-between"
                                style={{
                                    backgroundColor: secondaryColor,
                                    borderColor: `${primaryColor}60`
                                }}
                            >
                                <span className="font-mono text-xl font-bold tracking-wider" style={{ color: primaryColor }}>
                                    {couponData.code || 'CODE'}
                                </span>
                                {copied ? (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-white/50 text-green-700">
                                        <Check size={14} strokeWidth={3} />
                                        <span>COPIED</span>
                                    </div>
                                ) : (
                                    <Copy size={20} style={{ color: primaryColor, opacity: 0.6 }} />
                                )}
                            </button>
                        </div>

                        {/* Expiry */}
                        {couponData.valid_until && (
                            <div className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                                <Clock size={14} />
                                <span>Valid until {formatDate(couponData.valid_until)}</span>
                            </div>
                        )}

                        {/* Footer Actions */}
                        {couponData.offer_url ? (
                            <button
                                className="w-full py-3 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all opacity-100"
                                style={{ backgroundColor: primaryColor, boxShadow: `0 10px 15px -3px ${primaryColor}70` }}
                                title="Links to external offer in public view"
                            >
                                <span>{couponData.button_label || 'Redeem Now'}</span>
                                <ExternalLink size={18} />
                            </button>
                        ) : (
                            <div className="text-center text-xs text-slate-400 py-2">
                                Show this coupon at checkout to redeem
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Branding */}
                <div className="mt-auto pt-8 pb-4 flex items-center justify-center gap-2 opacity-40 grayscale">
                    <span className="font-bold text-slate-900 text-sm">PLA<span className="text-slate-400">QODE</span></span>
                </div>
            </div>
        </div>
    );
}
