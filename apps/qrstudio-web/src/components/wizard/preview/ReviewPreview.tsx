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
        <div className="h-full w-full bg-white flex flex-col relative overflow-hidden font-sans">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Content Container */}
            <div className="relative z-10 flex-1 flex flex-col items-center pt-8 px-6 pb-12 overflow-y-auto no-scrollbar">

                {/* Hero / Branding Section */}
                <div className="w-full flex flex-col items-center text-center mb-8 animate-in slide-in-from-top-8 duration-700">
                    <div
                        className="w-20 h-20 rounded-2xl mb-4 shadow-xl flex items-center justify-center relative overflow-hidden ring-4 ring-white"
                        style={{ backgroundColor: secondaryColor }}
                    >
                        {reviewData.logo ? (
                            <img
                                src={reviewData.logo}
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Star className="w-8 h-8" style={{ color: primaryColor, fill: primaryColor }} />
                        )}
                    </div>

                    {reviewData.business_name && (
                        <h2 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
                            {reviewData.business_name}
                        </h2>
                    )}

                    <h1 className="text-2xl font-extrabold text-slate-900 mb-2 leading-tight max-w-[90%]">
                        {reviewData.title || 'We value your feedback'}
                    </h1>

                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
                        {reviewData.description || 'Please select a platform below to leave your review.'}
                    </p>
                </div>

                {/* Modern Button Grid/Stack */}
                <div className="w-full max-w-xs space-y-3 animate-in slide-in-from-bottom-8 duration-700 delay-150">
                    {reviewData.google && (
                        <a
                            href="#"
                            className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent hover:border-slate-200 hover:bg-white hover:shadow-md transition-all group active:scale-[0.98]"
                        >
                            <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">Google</span>
                            <SiGoogle className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </a>
                    )}

                    {reviewData.yelp && (
                        <a
                            href="#"
                            className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent hover:border-slate-200 hover:bg-white hover:shadow-md transition-all group active:scale-[0.98]"
                        >
                            <span className="font-bold text-slate-800 text-sm group-hover:text-red-600 transition-colors">Yelp</span>
                            <SiYelp className="w-5 h-5 text-slate-300 group-hover:text-red-600 transition-colors" />
                        </a>
                    )}

                    {reviewData.tripadvisor && (
                        <a
                            href="#"
                            className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent hover:border-slate-200 hover:bg-white hover:shadow-md transition-all group active:scale-[0.98]"
                        >
                            <span className="font-bold text-slate-800 text-sm group-hover:text-green-600 transition-colors">TripAdvisor</span>
                            <SiTripadvisor className="w-5 h-5 text-slate-300 group-hover:text-green-600 transition-colors" />
                        </a>
                    )}

                    {reviewData.facebook && (
                        <a
                            href="#"
                            className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent hover:border-slate-200 hover:bg-white hover:shadow-md transition-all group active:scale-[0.98]"
                        >
                            <span className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">Facebook</span>
                            <SiFacebook className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                        </a>
                    )}
                </div>

                <div className="mt-auto pt-8 pb-4 w-full text-center">
                    <div className="text-[9px] uppercase tracking-widest text-slate-300 font-bold">
                        Powered by Plaqode
                    </div>
                </div>
            </div>
        </div>
    );
}
