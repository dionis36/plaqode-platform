import { Star, MessageCircleHeart } from 'lucide-react';
import { useState } from 'react';

interface FeedbackPreviewProps {
    data: any;
}

export function FeedbackPreview({ data }: FeedbackPreviewProps) {
    const primaryColor = data.styles?.primary_color || '#A855F7';
    // const secondaryColor = data.styles?.secondary_color || '#F3E8FF';

    const feedbackData = data.feedback || {
        question: 'How was your experience?',
        email: '',
        logo: '',
        success_message: 'Thank you for your feedback!'
    };

    // Controlled state purely for preview interactivity (not saved)
    const [rating, setRating] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <div className="h-full w-full flex flex-col relative overflow-hidden font-sans">
            {/* Background Gradient - Premium Feel */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${data.styles?.secondary_color || '#ffffff'} 100%)`
                }}
            />

            <div className="w-full h-full flex flex-col relative z-10">
                {/* Logo Area (Optional) */}
                <div className="flex-none p-6 pb-2 min-h-[80px] flex justify-center items-center">
                    {feedbackData.logo ? (
                        <div className="h-16 w-32 relative">
                            <img
                                src={feedbackData.logo}
                                alt="Brand Logo"
                                className="h-full w-full object-contain drop-shadow-md"
                            />
                        </div>
                    ) : (
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-md shadow-lg">
                            <MessageCircleHeart className="w-8 h-8 text-white" />
                        </div>
                    )}
                </div>

                <div className="flex-1 p-5 flex items-center justify-center">
                    {/* Main Glass/White Card */}
                    <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex flex-col items-center animate-in zoom-in-95 duration-500">
                        {!isSubmitted ? (
                            <>
                                {/* Question */}
                                <h1 className="text-2xl font-bold text-slate-800 text-center mb-2 leading-tight">
                                    {feedbackData.question || 'How was your experience?'}
                                </h1>
                                <p className="text-slate-500 text-sm mb-8 font-medium">
                                    Tap a star to rate
                                </p>

                                {/* Star Rating - Interactive Upgrade */}
                                <div className="flex gap-2 mb-8">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="transition-transform hover:scale-110 active:scale-95 focus:outline-none group"
                                        >
                                            <Star
                                                className={`w-10 h-10 transition-all duration-300 drop-shadow-sm ${rating >= star ? 'fill-amber-400 text-amber-400 scale-110' : 'text-slate-200 group-hover:text-slate-300'}`}
                                                strokeWidth={rating >= star ? 0 : 2}
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Comment Box & Submit - Conditional Slide In */}
                                <div className={`w-full transition-all duration-500 ease-out space-y-4 ${rating > 0 ? 'opacity-100 max-h-[500px]' : 'opacity-50 blur-[1px] pointer-events-none'}`}>
                                    <div className="relative">
                                        <textarea
                                            className="w-full p-4 rounded-xl border-0 bg-slate-50 focus:ring-2 focus:ring-offset-2 ring-offset-white resize-none text-slate-700 shadow-inner"
                                            rows={3}
                                            placeholder="What did you like? What can we improve?"
                                            style={{ ['--tw-ring-color' as any]: primaryColor }}
                                            disabled
                                        />
                                    </div>

                                    <button
                                        onClick={() => setIsSubmitted(true)}
                                        className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        Submit Feedback
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce"
                                    style={{ backgroundColor: `${primaryColor}20` }}
                                >
                                    <Star className="w-10 h-10" style={{ color: primaryColor, fill: primaryColor }} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                    {feedbackData.success_message || 'Thank you for your feedback!'}
                                </h2>
                                <p className="text-slate-500">
                                    Your review helps us improve.
                                </p>
                                <button
                                    onClick={() => { setRating(0); setIsSubmitted(false); }}
                                    className="mt-8 text-sm font-medium hover:underline text-slate-400"
                                >
                                    Send another response
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-none pb-8 text-xs text-white/60 font-medium text-center">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
