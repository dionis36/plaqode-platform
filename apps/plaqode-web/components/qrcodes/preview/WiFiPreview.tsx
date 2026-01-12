'use client';

import { Wifi, Lock, Shield, Eye, EyeOff, Copy, Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type WiFiPreviewProps = {
    data: any;
};

export function WiFiPreview({ data }: WiFiPreviewProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);

    const wifi = data?.wifi_details || {};
    const network = data?.network_info || {};
    const styles = data?.styles || {};

    const primaryColor = styles.primary_color || '#2563EB';
    const secondaryColor = styles.secondary_color || '#EFF6FF';

    const handleCopy = () => {
        const password = wifi.password || '';
        if (password) {
            navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Security badge logic
    const getSecurityBadge = () => {
        const security = wifi.security || 'WPA2';
        switch (security) {
            case 'WPA2':
            case 'WPA3':
                return { label: security, color: '#F59E0B', bg: '#FFFBEB' };
            case 'WEP':
                return { label: 'WEP', color: '#F59E0B', bg: '#FFFBEB' };
            case 'nopass':
                return { label: 'Open', color: '#10B981', bg: '#D1FAE5' };
            default:
                return { label: 'None', color: '#64748B', bg: '#F1F5F9' };
        }
    };

    const securityBadge = getSecurityBadge();
    const hasPassword = wifi.security !== 'nopass';

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
                    {/* Floating Icon or Logo */}
                    <div className="relative group mb-5">
                        <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 transition-opacity duration-500 scale-125" />
                        <div
                            className="relative h-24 w-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-1 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out rotate-3 overflow-hidden"
                        >
                            {network.logo ? (
                                <Image src={network.logo} alt="Logo" fill className="object-cover" />
                            ) : (
                                <Wifi
                                    className="w-10 h-10"
                                    style={{ color: primaryColor }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Title (SSID) */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2 break-words max-w-xs">
                        {wifi.ssid || 'WiFi Network'}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Scan to join network
                    </p>
                </div>

                {/* 2. Main Glass Card */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        {/* Description */}
                        {network.description && (
                            <div className="text-center mb-6">
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {network.description}
                                </p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Security Row */}
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600 font-bold text-base">Security</span>
                                <span
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border"
                                    style={{
                                        backgroundColor: securityBadge.bg,
                                        color: securityBadge.color,
                                        borderColor: securityBadge.color + '40'
                                    }}
                                >
                                    <Shield className="w-3 h-3 mr-1" />
                                    {securityBadge.label}
                                </span>
                            </div>

                            {/* Password Input-Style Box */}
                            {hasPassword && (
                                <div className="space-y-2">
                                    <span className="text-slate-600 font-bold text-base block">Password</span>
                                    <div className="relative group">
                                        <div className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 overflow-hidden">
                                            <span className="text-slate-800 font-mono text-lg tracking-widest w-full truncate">
                                                {showPassword ? (wifi.password || '') : (wifi.password ? '••••••••' : '')}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 active:text-slate-600 p-1"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                disabled={copied || !wifi.password}
                                className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white relative overflow-hidden"
                                style={{
                                    backgroundColor: primaryColor,
                                    opacity: !wifi.password && hasPassword ? 0.7 : 1,
                                    cursor: !wifi.password && hasPassword ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {copied ? <Check className="w-6 h-6" /> : <Wifi className="w-6 h-6" />}
                                <span className="text-lg">{copied ? 'Password Copied' : 'Copy Password'}</span>
                            </button>
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
