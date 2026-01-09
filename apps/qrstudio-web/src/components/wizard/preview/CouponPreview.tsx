import { Ticket, Clock, Copy, ExternalLink, Scissors } from 'lucide-react';
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

    return (
        <div className="h-full w-full bg-slate-50 flex flex-col relative overflow-hidden font-sans">
            {/* Header Background */}
            <div
                className="w-full h-48 absolute top-0 left-0 z-0 transition-colors duration-300"
                style={{ backgroundColor: primaryColor }}
            >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]" />
                {/* Dotted Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="flex-1 z-10 flex flex-col items-center pt-24 px-6 overflow-y-auto">
                <h1 className="text-white text-2xl font-bold mb-6 drop-shadow-md text-center">
                    {couponData.title || 'Exclusive Offer'}
                </h1>

                {/* Main Coupon Card */}
                <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
                    {/* Top Scallop Border (Simulated via CSS mask or multiple circles - sticking to simple flex for now) */}

                    {couponData.offer_image && (
                        <div className="w-full h-48 bg-slate-100 relative">
                            <img
                                src={couponData.offer_image}
                                alt="Offer"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6 flex flex-col items-center text-center">
                        {!couponData.offer_image && (
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                                style={{ backgroundColor: secondaryColor }}
                            >
                                <Ticket className="w-8 h-8" style={{ color: primaryColor }} />
                            </div>
                        )}

                        <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                            {couponData.description || 'Get 20% off your next purchase!'}
                        </p>

                        {/* Dashed Line */}
                        <div className="w-full border-t-2 border-dashed border-slate-200 my-2 relative">
                            <div className="absolute -left-8 -top-3 w-6 h-6 bg-slate-50 rounded-full" />
                            <div className="absolute -right-8 -top-3 w-6 h-6 bg-slate-50 rounded-full" />
                        </div>

                        {/* Code Display */}
                        <div className="w-full py-6">
                            <label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 block">
                                Coupon Code
                            </label>
                            <button
                                onClick={handleCopy}
                                className="w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl py-3 px-4 flex items-center justify-between group hover:border-slate-400 transition-colors"
                            >
                                <span className="font-mono text-xl font-bold text-slate-800 tracking-wider">
                                    {couponData.code || 'CODE'}
                                </span>
                                {copied ? (
                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">COPIED</span>
                                ) : (
                                    <Copy className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                                )}
                            </button>
                        </div>

                        {/* Redeem Button (If URL provided) */}
                        {couponData.offer_url && (
                            <a
                                href="#"
                                className="w-full py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 mb-4"
                                style={{ backgroundColor: primaryColor }}
                            >
                                {couponData.button_label || 'Redeem Now'}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}

                        {/* Validity Footer */}
                        <div className="flex flex-col gap-2 w-full pt-2">
                            {couponData.valid_until && (
                                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                                    <Clock className="w-4 h-4" />
                                    <span>Valid until {format(new Date(couponData.valid_until || Date.now()), 'MMM d, yyyy')}</span>
                                </div>
                            )}
                            <p className="text-xs text-slate-400">
                                *{couponData.terms || 'Terms apply.'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-xs text-white/60 font-medium">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
