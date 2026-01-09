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
        description: 'Please select a platform below to leave your review.'
    };

    const hasAnyLink = reviewData.google || reviewData.yelp || reviewData.tripadvisor || reviewData.facebook;

    return (
        <div className="h-full w-full bg-white flex flex-col relative overflow-hidden font-sans">
            {/* Background Header */}
            <div
                className="w-full h-48 absolute top-0 left-0 z-0 transition-colors duration-300"
                style={{ backgroundColor: primaryColor }}
            >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
            </div>

            {/* Content Container */}
            <div className="flex-1 z-10 flex flex-col items-center pt-24 px-6 overflow-y-auto">

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center mb-6">
                    {/* Icon Bubble */}
                    <div
                        className="w-20 h-20 rounded-full mx-auto -mt-16 mb-6 flex items-center justify-center shadow-lg border-4 border-white"
                        style={{ backgroundColor: secondaryColor }}
                    >
                        <Star className="w-10 h-10" style={{ color: primaryColor, fill: primaryColor }} />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">
                        {reviewData.title || 'We value your feedback'}
                    </h1>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        {reviewData.description || 'Please select a platform below to leave your review.'}
                    </p>

                    {/* Buttons Stack */}
                    <div className="space-y-4">
                        {reviewData.google && (
                            <a
                                href="#" // Preview prevents navigation
                                className="flex items-center gap-4 w-full p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group shadow-sm"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <SiGoogle className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-slate-800 text-sm">Review on Google</div>
                                    <div className="text-xs text-slate-400">Share your experience</div>
                                </div>
                            </a>
                        )}

                        {reviewData.yelp && (
                            <a
                                href="#"
                                className="flex items-center gap-4 w-full p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group shadow-sm"
                            >
                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <SiYelp className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-slate-800 text-sm">Review on Yelp</div>
                                    <div className="text-xs text-slate-400">Share your experience</div>
                                </div>
                            </a>
                        )}

                        {reviewData.tripadvisor && (
                            <a
                                href="#"
                                className="flex items-center gap-4 w-full p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group shadow-sm"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <SiTripadvisor className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-slate-800 text-sm">Review on TripAdvisor</div>
                                    <div className="text-xs text-slate-400">Share your experience</div>
                                </div>
                            </a>
                        )}

                        {reviewData.facebook && (
                            <a
                                href="#"
                                className="flex items-center gap-4 w-full p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group shadow-sm"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <SiFacebook className="w-5 h-5 text-blue-800" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-slate-800 text-sm">Review on Facebook</div>
                                    <div className="text-xs text-slate-400">Share your experience</div>
                                </div>
                            </a>
                        )}

                        {!hasAnyLink && (
                            <div className="text-xs text-slate-400 italic py-4">
                                Add review links in the editor to see buttons appear here.
                            </div>
                        )}
                    </div>
                </div>

                {/* Branding Footnote */}
                <div className="mt-auto mb-6 text-xs text-slate-400 font-medium">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
