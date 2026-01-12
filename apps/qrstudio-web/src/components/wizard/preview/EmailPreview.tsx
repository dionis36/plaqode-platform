import { Mail, User, FileText, Users, Eye, Send } from 'lucide-react';
import { useEffect } from 'react';
import { usePreviewContext } from './PreviewContext';
import { MOCKUP_PREVIEW_DATA } from '../steps/mockupPreviewData';

export function EmailPreview({ data }: { data: any }) {
    const { setHeroBackgroundColor } = usePreviewContext();
    const fallback = MOCKUP_PREVIEW_DATA.email;

    // Check if user has started entering ANY content
    const hasUserInput =
        (data?.email_details?.recipient || '') !== '' ||
        (data?.email_details?.subject || '') !== '' ||
        (data?.email_details?.body || '') !== '';

    const emailDetails = {
        recipient: hasUserInput ? (data.email_details?.recipient || '') : fallback.email_details.recipient,
        subject: hasUserInput ? (data.email_details?.subject || '') : fallback.email_details.subject,
        body: hasUserInput ? (data.email_details?.body || '') : fallback.email_details.body,
    };

    const additionalRecipients = {
        cc: hasUserInput ? (data.additional_recipients?.cc || '') : fallback.additional_recipients.cc,
        bcc: hasUserInput ? (data.additional_recipients?.bcc || '') : fallback.additional_recipients.bcc,
    };

    const styles = data.styles || fallback.styles;
    const primaryColor = styles.primary_color || '#F59E0B';
    const secondaryColor = styles.secondary_color || '#FEF3C7';

    // Set hero background color
    useEffect(() => {
        setHeroBackgroundColor(primaryColor);
    }, [primaryColor, setHeroBackgroundColor]);

    // Parse CC/BCC emails
    const ccEmails = additionalRecipients.cc?.split(',').map((e: string) => e.trim()).filter((e: string) => e) || [];
    const bccEmails = additionalRecipients.bcc?.split(',').map((e: string) => e.trim()).filter((e: string) => e) || [];

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

            {/* --- Scrollable Content --- */}
            <div className="relative w-full h-full overflow-y-auto no-scrollbar flex flex-col z-10">

                {/* Spacer */}
                <div className="w-full flex-none pt-20" />

                {/* 1. Header (Floating) */}
                <div className="flex-none flex flex-col justify-center items-center pb-8 px-4 text-center">
                    {/* Floating Icon */}
                    <div className="relative group mb-5">
                        <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 transition-opacity duration-500 scale-125" />
                        <div
                            className="relative h-24 w-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-1 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out rotate-3"
                        >
                            <Mail
                                className="w-10 h-10"
                                style={{ color: primaryColor }}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2">
                        Send Email
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Compose and send email
                    </p>
                </div>

                {/* 2. Main Glass Card */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        {/* Open Email App Button */}
                        <a
                            href={`mailto:${emailDetails.recipient}?subject=${encodeURIComponent(emailDetails.subject || '')}&body=${encodeURIComponent(emailDetails.body || '')}&cc=${encodeURIComponent(additionalRecipients.cc || '')}&bcc=${encodeURIComponent(additionalRecipients.bcc || '')}`}
                            className="w-full py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-8 text-white relative overflow-hidden"
                            style={{ backgroundColor: primaryColor }}
                        >
                            <Send className="w-5 h-5" />
                            <span>Open Email App</span>
                        </a>

                        <div className="space-y-3">
                            {/* Recipient */}
                            <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">To</p>
                                </div>
                                <p className="text-slate-800 font-medium break-all pl-1">
                                    {emailDetails.recipient || 'recipient@example.com'}
                                </p>
                            </div>

                            {/* Subject */}
                            {emailDetails.subject && (
                                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</p>
                                    </div>
                                    <p className="text-slate-800 font-medium break-words pl-1">
                                        {emailDetails.subject}
                                    </p>
                                </div>
                            )}

                            {/* Message Body */}
                            {emailDetails.body && (
                                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message</p>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap pl-1">
                                        {emailDetails.body}
                                    </p>
                                </div>
                            )}

                            {/* CC */}
                            {ccEmails.length > 0 && (
                                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">CC</p>
                                    </div>
                                    <div className="space-y-1 pl-1">
                                        {ccEmails.map((email: string, idx: number) => (
                                            <p key={idx} className="text-slate-800 font-medium break-all">{email}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* BCC */}
                            {bccEmails.length > 0 && (
                                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">BCC</p>
                                    </div>
                                    <div className="space-y-1 pl-1">
                                        {bccEmails.map((email: string, idx: number) => (
                                            <p key={idx} className="text-slate-800 font-medium break-all">{email}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-0" />
                <div className="flex-none pt-4 pb-4 text-[10px] uppercase tracking-widest text-slate-400 font-semibold text-center opacity-60">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
