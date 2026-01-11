'use client';

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
        <div className="min-h-screen w-full bg-white flex flex-col relative overflow-hidden font-sans">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Content Container */}
            <div className="relative z-10 flex-1 flex flex-col items-center pt-16 px-6 pb-12 overflow-y-auto no-scrollbar">

                {/* Hero / Branding Section */}
                <div className="w-full flex flex-col items-center text-center mb-12 animate-in slide-in-from-top-8 duration-700">
                    <div
                        className="w-24 h-24 rounded-3xl mb-6 shadow-2xl flex items-center justify-center relative overflow-hidden ring-4 ring-white"
                        style={{ backgroundColor: secondaryColor }}
                    >
                        {reviewData.logo ? (
                            <img
                                src={reviewData.logo}
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Star className="w-10 h-10" style={{ color: primaryColor, fill: primaryColor }} />
                        )}
                    </div>

                    {reviewData.business_name && (
                        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-2">
                            {reviewData.business_name}
                        </h2>
                    )}

                    <h1 className="text-3xl font-extrabold text-slate-900 mb-3 leading-tight max-w-[80%]">
                        {reviewData.title || 'We value your feedback'}
                    </h1>

                    <p className="text-slate-500 text-lg leading-relaxed max-w-sm font-medium">
                        {reviewData.description || 'Please select a platform below to leave your review.'}
                    </p>
                </div>

                {/* Modern Button Grid/Stack */}
                <div className="w-full max-w-sm space-y-4 animate-in slide-in-from-bottom-8 duration-700 delay-150">
                    {reviewData.google && (
                        <a
                            href={reviewData.google.startsWith('http') ? reviewData.google : `https://${reviewData.google}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all group active:scale-[0.98]"
                        >
                            <span className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">Google</span>
                            <SiGoogle className="w-8 h-8 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </a>
                    )}

                    {reviewData.yelp && (
                        <a
                            href={reviewData.yelp.startsWith('http') ? reviewData.yelp : `https://${reviewData.yelp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all group active:scale-[0.98]"
                        >
                            <span className="font-bold text-slate-800 text-lg group-hover:text-red-600 transition-colors">Yelp</span>
                            <SiYelp className="w-8 h-8 text-slate-300 group-hover:text-red-600 transition-colors" />
                        </a>
                    )}

                    {reviewData.tripadvisor && (
                        <a
                            href={reviewData.tripadvisor.startsWith('http') ? reviewData.tripadvisor : `https://${reviewData.tripadvisor}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all group active:scale-[0.98]"
                        >
                            <span className="font-bold text-slate-800 text-lg group-hover:text-green-600 transition-colors">TripAdvisor</span>
                            <SiTripadvisor className="w-8 h-8 text-slate-300 group-hover:text-green-600 transition-colors" />
                        </a>
                    )}

                    {reviewData.facebook && (
                        <a
                            href={reviewData.facebook.startsWith('http') ? reviewData.facebook : `https://${reviewData.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all group active:scale-[0.98]"
                        >
                            <span className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">Facebook</span>
                            <SiFacebook className="w-8 h-8 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                        </a>
                    )}
                </div>

                <div className="mt-auto pt-16 pb-6 w-full text-center">
                    <div className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">
                        Powered by Plaqode
                    </div>
                </div>
            </div>
        </div>
    );
}
