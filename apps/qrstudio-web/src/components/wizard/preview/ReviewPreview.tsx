import { Star } from 'lucide-react';
import { SiGoogle, SiYelp, SiTripadvisor, SiFacebook } from 'react-icons/si';

interface ReviewPreviewProps {
    data: any;
}

export function ReviewPreview({ data }: ReviewPreviewProps) {
    const primaryColor = data.styles?.primary_color || '#FACC15';
    const secondaryColor = data.styles?.secondary_color || '#FEFCE8';

    const reviewData = data.review || {
        title: 'We value your feedback',
        description: 'Please select a platform below to leave your review.',
        business_name: '',
        logo: ''
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

            {/* --- Fixed Background Elements (Do not scroll) --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Left Orb */}
                <div
                    className="absolute top-[-20%] left-[-20%] w-[120%] h-[60%] rounded-[100%] blur-3xl opacity-40 animate-pulse"
                    style={{ background: primaryColor }}
                />
                {/* Bottom Right Orb */}
                <div
                    className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[50%] rounded-[100%] blur-3xl opacity-30"
                    style={{ background: secondaryColor }}
                />
            </div>

            {/* --- Scrollable Content Container --- */}
            <div className="relative w-full h-full overflow-y-auto no-scrollbar flex flex-col z-10">

                {/* Flexible Spacer Top */}
                <div className="w-full flex-none pt-24" />

                {/* 1. Brand / Avatar Section */}
                <div className="flex-none flex flex-col justify-center items-center pb-4">
                    {reviewData.logo ? (
                        <div className="relative group">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-125" />
                            {/* Avatar */}
                            <div className="relative h-28 w-28 bg-white rounded-full shadow-2xl flex items-center justify-center p-1 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out">
                                <img
                                    src={reviewData.logo}
                                    alt="Brand Logo"
                                    className="w-full h-full object-cover rounded-full drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30" />
                            <div className="relative h-24 w-24 bg-white/10 rounded-full shadow-2xl flex items-center justify-center ring-1 ring-white/50 backdrop-blur-md">
                                <Star className="w-10 h-10 text-white drop-shadow-md" />
                            </div>
                        </div>
                    )}

                    {reviewData.business_name && (
                        <h2 className="text-slate-800 font-bold text-xl mt-8 tracking-tight drop-shadow-sm text-center px-6">
                            {reviewData.business_name}
                        </h2>
                    )}
                </div>

                {/* 2. Main Action Card */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full bg-white/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        <h1 className="text-2xl font-bold text-slate-800 text-center mb-3 leading-snug tracking-tight">
                            {reviewData.title || 'We value your feedback'}
                        </h1>
                        <p className="text-slate-500 text-sm mb-8 font-medium tracking-wide opacity-80 text-center leading-relaxed">
                            {reviewData.description || 'Please select a platform below to leave your review.'}
                        </p>

                        <div className="w-full space-y-4">
                            {reviewData.google && (
                                <a
                                    href="#"
                                    className="flex items-center justify-between w-full p-4 pl-5 rounded-xl bg-white border border-slate-100 shadow-sm active:scale-[0.98] relative overflow-hidden"
                                    style={{ borderLeft: `4px solid ${primaryColor}` }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2" style={{ background: primaryColor }} />
                                    <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Google Reviews</span>
                                    <SiGoogle className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                </a>
                            )}
                            {reviewData.yelp && (
                                <a
                                    href="#"
                                    className="flex items-center justify-between w-full p-4 pl-5 rounded-xl bg-white border border-slate-100 shadow-sm active:scale-[0.98] relative overflow-hidden"
                                    style={{ borderLeft: `4px solid ${primaryColor}` }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2" style={{ background: primaryColor }} />
                                    <span className="font-bold text-slate-700 group-hover:text-red-600 transition-colors">Yelp Reviews</span>
                                    <SiYelp className="w-6 h-6 text-slate-400 group-hover:text-red-600 transition-colors" />
                                </a>
                            )}
                            {reviewData.tripadvisor && (
                                <a
                                    href="#"
                                    className="flex items-center justify-between w-full p-4 pl-5 rounded-xl bg-white border border-slate-100 shadow-sm active:scale-[0.98] relative overflow-hidden"
                                    style={{ borderLeft: `4px solid ${primaryColor}` }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2" style={{ background: primaryColor }} />
                                    <span className="font-bold text-slate-700 group-hover:text-green-600 transition-colors">TripAdvisor</span>
                                    <SiTripadvisor className="w-6 h-6 text-slate-400 group-hover:text-green-600 transition-colors" />
                                </a>
                            )}
                            {reviewData.facebook && (
                                <a
                                    href="#"
                                    className="flex items-center justify-between w-full p-4 pl-5 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all group active:scale-[0.98] relative overflow-hidden"
                                    style={{ borderLeft: `4px solid ${primaryColor}` }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2" style={{ background: primaryColor }} />
                                    <span className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors">Facebook</span>
                                    <SiFacebook className="w-6 h-6 text-slate-400 group-hover:text-blue-700 transition-colors" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Spacer to push footer to bottom */}
                <div className="flex-1 min-h-0" />

                {/* Footer pinned to bottom */}
                <div className="flex-none pt-4 pb-4 text-[10px] uppercase tracking-widest text-slate-400 font-semibold text-center opacity-60">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
