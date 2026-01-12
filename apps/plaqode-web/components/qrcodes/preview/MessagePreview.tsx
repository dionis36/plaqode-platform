'use client';

import { MessageSquare, Phone, User, Mail, Smartphone, Send } from 'lucide-react';

export function MessagePreview({ data }: { data: any }) {

    const platform = data.platform || 'sms';
    const phoneNumber = data.phone_number || '';
    const username = data.username || '';
    const message = data.message || '';
    const messageOnly = data.message_only || false;
    const styles = data.styles || {};

    const primaryColor = styles.primary_color || '#10B981';
    const secondaryColor = styles.secondary_color || '#D1FAE5';

    // Platform-specific data
    const platformData = {
        sms: { Icon: MessageSquare, name: 'SMS', action: 'Send SMS' },
        whatsapp: { Icon: Smartphone, name: 'WhatsApp', action: 'Open WhatsApp' },
        telegram: { Icon: Send, name: 'Telegram', action: 'Open Telegram' }
    };

    const currentPlatform = platformData[platform as keyof typeof platformData] || platformData.sms;
    const PlatformIcon = currentPlatform.Icon;

    const getLink = () => {
        const encodedMessage = encodeURIComponent(message || '');
        const cleanPhone = (phoneNumber || '').replace(/\D/g, '');

        switch (platform) {
            case 'whatsapp':
                return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
            case 'telegram':
                return `https://t.me/${username || ''}`;
            case 'sms':
            default:
                return `sms:${cleanPhone}?body=${encodedMessage}`;
        }
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
                            <PlatformIcon
                                className="w-10 h-10"
                                style={{ color: primaryColor }}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2">
                        {currentPlatform.name} Message
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Send via {currentPlatform.name}
                    </p>
                </div>

                {/* 2. Main Glass Card */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        {/* Action Button */}
                        <a
                            href={getLink()}
                            target={platform === 'sms' ? undefined : '_blank'}
                            rel={platform === 'sms' ? undefined : 'noopener noreferrer'}
                            className="w-full py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-8 text-white relative overflow-hidden"
                            style={{ backgroundColor: primaryColor }}
                        >
                            <PlatformIcon className="w-5 h-5" />
                            <span>{currentPlatform.action}</span>
                        </a>

                        <div className="space-y-3">
                            {/* Platform Badge */}
                            <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                        <MessageSquare className="w-4 h-4" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform</p>
                                </div>
                                <div className="flex items-center gap-2 pl-1">
                                    <PlatformIcon className="w-4 h-4 text-slate-600" />
                                    <p className="text-slate-800 font-medium">
                                        {currentPlatform.name}
                                    </p>
                                </div>
                            </div>

                            {/* Phone Number */}
                            {phoneNumber && !messageOnly && (
                                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">To</p>
                                    </div>
                                    <p className="text-slate-800 font-medium break-all pl-1">
                                        {phoneNumber}
                                    </p>
                                </div>
                            )}

                            {/* Username (Telegram) */}
                            {platform === 'telegram' && username && (
                                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Username</p>
                                    </div>
                                    <p className="text-slate-800 font-medium break-all pl-1">
                                        @{username}
                                    </p>
                                </div>
                            )}

                            {/* Message Bubble */}
                            {message && (
                                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message</p>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap pl-1">
                                        {message}
                                    </p>
                                    {platform === 'sms' && (
                                        <p className="text-[10px] text-slate-400 text-right mt-1">
                                            {message.length}/160
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Message Only Mode (WhatsApp) */}
                            {platform === 'whatsapp' && messageOnly && (
                                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recipient</p>
                                    </div>
                                    <p className="text-slate-500 text-sm italic pl-1">
                                        User select from contact list
                                    </p>
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
