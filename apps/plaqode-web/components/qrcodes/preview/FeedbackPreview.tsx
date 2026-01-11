'use client';

import { Star, MessageCircleHeart, Send } from 'lucide-react';
import { useState, useTransition } from 'react';
import { sendFeedbackEmail } from '../../../actions/feedback';

interface FeedbackPreviewProps {
    data: any;
}

export function FeedbackPreview({ data }: FeedbackPreviewProps) {
    const primaryColor = data.styles?.primary_color || '#0000FF';
    // const secondaryColor = data.styles?.secondary_color || '#F3E8FF';

    const feedbackData = data.feedback || {
        question: 'How was your experience?',
        email: '',
        logo: '',
        success_message: 'Thank you for your feedback!'
    };

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    const [isPending, startTransition] = useTransition();
    const [state, setState] = useState<{ success: boolean; message: string }>({ success: false, message: '' });

    const handleSendFeedback = () => {
        if (!feedbackData.email) {
            // Demo mode
            setState({ success: true, message: feedbackData.success_message });
            return;
        }

        startTransition(async () => {
            const formData = new FormData();
            formData.append('rating', rating.toString());
            formData.append('comment', comment);
            formData.append('contactName', contactName);
            formData.append('contactInfo', contactInfo);
            formData.append('destinationEmail', feedbackData.email);
            formData.append('businessName', feedbackData.business_name || '');
            formData.append('question', feedbackData.question);

            const result = await sendFeedbackEmail(
                { success: false, message: '' },
                formData
            );

            setState(result);
        });
    };

    const isSubmitted = state.success;

    return (
        <div className="min-h-[100dvh] w-full flex flex-col relative overflow-y-auto no-scrollbar font-sans bg-slate-50">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* --- Ambient Background Layer --- */}
            {/* Base Gradient */}
            <div
                className="absolute inset-0 z-0 h-full min-h-full"
                style={{
                    background: `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)`
                }}
            />

            {/* Floating Orbs for Depth */}
            <div
                className="absolute top-[-20%] left-[-20%] w-[120%] h-[60%] rounded-[100%] blur-3xl opacity-40 animate-pulse"
                style={{ background: primaryColor }}
            />
            <div
                className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[50%] rounded-[100%] blur-3xl opacity-30"
                style={{ background: data.styles?.secondary_color || '#3b82f6' }}
            />

            <div className="w-full min-h-full flex flex-col relative z-10">

                {/* 1. Floating Circular Avatar (Premium) */}
                <div className="flex-none pt-12 pb-4 flex flex-col justify-center items-center relative z-20 mt-8">
                    {feedbackData.logo ? (
                        <div className="relative group">
                            {/* Glow Behind */}
                            <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-125" />

                            {/* Avatar Container */}
                            <div className="relative h-28 w-28 bg-white rounded-full shadow-2xl flex items-center justify-center p-1 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out">
                                <img
                                    src={feedbackData.logo}
                                    alt="Brand Logo"
                                    className="w-full h-full object-cover rounded-full drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30" />
                            <div className="relative h-24 w-24 bg-white/10 rounded-full shadow-2xl flex items-center justify-center ring-1 ring-white/50 backdrop-blur-md">
                                <MessageCircleHeart className="w-10 h-10 text-white drop-shadow-md" />
                            </div>
                        </div>
                    )}

                    {feedbackData.business_name && (
                        <h2 className="text-slate-800 font-bold text-2xl mt-8 tracking-tight drop-shadow-sm text-center px-6">
                            {feedbackData.business_name}
                        </h2>
                    )}
                </div>

                {/* 2. Main Glass Card */}
                <div className="flex-1 px-4 flex items-start justify-center pt-8 pb-12">
                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">
                        {!isSubmitted ? (
                            <>
                                {/* Question */}
                                <h1 className="text-2xl font-bold text-slate-800 text-center mb-3 leading-snug tracking-tight">
                                    {feedbackData.question || 'How was your experience?'}
                                </h1>
                                <p className="text-slate-500 text-sm mb-10 font-medium tracking-wide uppercase opacity-80">
                                    Tap a star to rate
                                </p>

                                {/* Star Rating - Interactive Gummy Feel */}
                                <div className="flex gap-3 mb-10">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="transition-all duration-200 hover:scale-110 active:scale-90 focus:outline-none group relative"
                                        >
                                            <Star
                                                className={`w-10 h-10 transition-all duration-300 ${rating >= star
                                                    ? 'fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)] rotate-0'
                                                    : 'text-slate-300/80 group-hover:text-slate-400 hover:rotate-12'
                                                    }`}
                                                strokeWidth={rating >= star ? 0 : 1.5}
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Comment Box & Submit */}
                                <div className={`w-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] space-y-5 overflow-hidden ${rating > 0 ? 'opacity-100 max-h-[600px] translate-y-0' : 'opacity-0 max-h-0 translate-y-4 pointer-events-none'}`}>
                                    <div className="relative group space-y-3">
                                        {feedbackData.collect_contact && (
                                            <>
                                                <input
                                                    type="text"
                                                    value={contactName}
                                                    onChange={(e) => setContactName(e.target.value)}
                                                    className="w-full p-4 rounded-2xl border border-slate-200 bg-white/70 focus:bg-white focus:border-transparent focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-slate-700 placeholder:text-slate-400 text-base shadow-sm"
                                                    placeholder="Your Name (Optional)"
                                                    style={{ ['--tw-ring-color' as any]: `${primaryColor}30` }}
                                                />
                                                <input
                                                    type="text"
                                                    value={contactInfo}
                                                    onChange={(e) => setContactInfo(e.target.value)}
                                                    className="w-full p-4 rounded-2xl border border-slate-200 bg-white/70 focus:bg-white focus:border-transparent focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-slate-700 placeholder:text-slate-400 text-base shadow-sm"
                                                    placeholder="Your Email/Phone (Optional)"
                                                    style={{ ['--tw-ring-color' as any]: `${primaryColor}30` }}
                                                />
                                            </>
                                        )}
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="w-full p-4 rounded-2xl border border-slate-200 bg-white/70 focus:bg-white focus:border-transparent focus:ring-4 focus:ring-purple-100 transition-all duration-300 resize-none text-slate-700 placeholder:text-slate-400 text-base shadow-sm"
                                            rows={3}
                                            placeholder={
                                                rating === 1 ? "What went wrong?" :
                                                    rating === 2 ? "How can we improve?" :
                                                        rating === 3 ? "What could be better?" :
                                                            rating === 4 ? "What did you like?" :
                                                                "What did you love?"
                                            }
                                            style={{ ['--tw-ring-color' as any]: `${primaryColor}30` }}
                                        />
                                    </div>

                                    {!state.success && state.message && (
                                        <p className="text-center text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                                            {state.message}
                                        </p>
                                    )}

                                    <button
                                        onClick={handleSendFeedback}
                                        disabled={isPending}
                                        className="w-full py-4 rounded-xl font-bold text-white shadow-[0_10px_20px_-5px_rgba(100,50,200,0.3)] hover:shadow-[0_15px_25px_-5px_rgba(100,50,200,0.4)] hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
                                    >
                                        {isPending ? (
                                            <>
                                                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Submit Feedback</span>
                                                <Send className="w-4 h-4 ml-1 opacity-90" />
                                            </>
                                        )}
                                    </button>

                                    {!feedbackData.email && (
                                        <p className="text-[10px] text-center text-slate-400 font-medium">
                                            Preview Mode: No email configured
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="py-8 flex flex-col items-center justify-center text-center animate-in zoom-in-90 duration-500">
                                <div
                                    className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl ring-4 ring-white animate-bounce"
                                    style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}10)` }}
                                >
                                    <Star className="w-12 h-12 drop-shadow-md" style={{ color: primaryColor, fill: primaryColor }} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">
                                    {feedbackData.success_message || 'Thank you!'}
                                </h2>
                                <p className="text-slate-500 text-base max-w-[200px] leading-relaxed">
                                    We appreciate your feedback.
                                </p>
                                <button
                                    onClick={() => {
                                        setRating(0);
                                        setComment('');
                                        setContactName('');
                                        setContactInfo('');
                                        setState({ success: false, message: '' });
                                    }}
                                    className="mt-10 text-sm font-semibold hover:underline opacity-60 hover:opacity-100 transition-opacity"
                                    style={{ color: primaryColor }}
                                >
                                    Send another response
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-none pb-8 text-[10px] uppercase tracking-widest text-slate-400 font-semibold text-center opacity-60">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
