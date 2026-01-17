'use client';

import { MapPin, Phone, Mail, Globe, Clock, Twitter, CheckCircle2, Navigation } from 'lucide-react';
import { SiFacebook, SiInstagram, SiLinkedin, SiTiktok, SiYoutube } from 'react-icons/si';

interface BusinessPagePreviewProps {
    data: any;
}

export function BusinessPagePreview({ data }: BusinessPagePreviewProps) {
    const styles = data.styles || {};
    const primaryColor = styles.primary_color || '#2563EB';
    const secondaryColor = styles.secondary_color || '#EFF6FF';
    // const gradientType = styles.gradient_type || 'none'; 
    // const gradientAngle = styles.gradient_angle || 135;

    const bizData = data.business || {
        name: 'My Business',
        description: 'Your trusted local business.',
        logo: '',
        banner: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        hours: {
            mon: '9:00 AM - 5:00 PM',
            tue: '9:00 AM - 5:00 PM',
            wed: '9:00 AM - 5:00 PM',
            thu: '9:00 AM - 5:00 PM',
            fri: '9:00 AM - 5:00 PM',
            sat: 'Closed',
            sun: 'Closed'
        },
        social_links: []
    };

    const SocialIcon = ({ platform }: { platform: string }) => {
        switch (platform) {
            case 'facebook': return <SiFacebook />;
            case 'instagram': return <SiInstagram />;
            case 'twitter': return <Twitter size={16} fill="currentColor" strokeWidth={0} />;
            case 'linkedin': return <SiLinkedin />;
            case 'tiktok': return <SiTiktok />;
            case 'youtube': return <SiYoutube />;
            default: return <Globe />;
        }
    };

    const getMapLink = (address: string) => {
        if (!address) return '#';
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    };

    const getWebsiteLink = (url: string) => {
        if (!url) return '#';
        if (url.startsWith('http')) return url;
        return `https://${url}`;
    };

    // Helper to format "14:00" -> "2:00 PM" or "14:00"
    const formatTime = (time: string) => {
        if (!time) return '';
        const use24h = bizData.hours?.format === '24h';
        const [h, m] = time.split(':').map(Number);
        if (isNaN(h) || isNaN(m)) return time; // Fallback for legacy text

        if (use24h) {
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        }

        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    const getBusinessStatus = (hours: any) => {
        const now = new Date();
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const todayKey = days[now.getDay()];
        const todaySchedule = hours?.[todayKey];

        // 1. Legacy string handling
        if (typeof todaySchedule === 'string') {
            if (!todaySchedule || todaySchedule.toLowerCase() === 'closed') return 'closed';
            return 'open'; // Naive open
        }

        // 2. Structured data handling
        if (!todaySchedule || !todaySchedule.isOpen) return 'closed';

        // Parse current time in minutes
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        // Parse start/end
        const [startH, startM] = (todaySchedule.start || "09:00").split(':').map(Number);
        const [endH, endM] = (todaySchedule.end || "17:00").split(':').map(Number);

        const startMinutes = startH * 60 + startM;
        const endMinutes = endH * 60 + endM;

        // Logic
        if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
            // It is currently open. Check if closing soon (within 30 mins)
            if (endMinutes - currentMinutes <= 30) {
                return 'closing_soon';
            }
            return 'open';
        }

        // It is closed. Check if opening soon (within 30 mins before open)
        if (currentMinutes < startMinutes && startMinutes - currentMinutes <= 30) {
            return 'opening_soon';
        }

        return 'closed';
    };

    const status = getBusinessStatus(bizData.hours);

    return (
        <div className="absolute inset-0 w-full h-full bg-slate-50 flex flex-col font-sans overflow-hidden">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Dynamic Hover Styles */}
            <style jsx>{`
                .theme-text { color: ${primaryColor}; }
                .theme-bg { backgroundColor: ${primaryColor}; }
                .theme-bg-light { backgroundColor: ${secondaryColor}; }
                .theme-border-hover:hover { border-color: ${primaryColor}40; } /* 40 is hex opacity ~25% */
                .theme-group:hover .theme-icon-scale { transform: scale(1.1); }
            `}</style>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
                {/* Hero Section */}
                <div className="relative w-full h-56 bg-slate-900">
                    {bizData.banner ? (
                        <>
                            <img src={bizData.banner} alt="Banner" className="w-full h-full object-cover opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                        </>
                    ) : (
                        <div className="w-full h-full" style={{ backgroundColor: primaryColor }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    )}

                    {/* Floating Profile Info */}
                    <div className="absolute -bottom-10 left-6 right-6 flex items-end justify-between">
                        <div className="w-24 h-24 rounded-2xl bg-white shadow-xl p-1 rotate-3 hover:rotate-0 transition-transform duration-300">
                            {bizData.logo ? (
                                <img src={bizData.logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-xl text-slate-300">
                                    <Globe size={32} />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 mb-12">
                            {/* Floating Quick Actions - Styled with Primary Color */}
                            {bizData.phone && (
                                <a
                                    href={`tel:${bizData.phone}`}
                                    className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    <Phone size={20} />
                                </a>
                            )}
                            {bizData.address && (
                                <a
                                    href={getMapLink(bizData.address)}
                                    target="_blank"
                                    className="w-12 h-12 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95 border-2"
                                    style={{ borderColor: primaryColor, color: primaryColor }}
                                >
                                    <Navigation size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="px-6 pt-14 space-y-8">

                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                                {bizData.name || 'Business Name'}
                            </h1>
                            <CheckCircle2 size={20} className="flex-shrink-0" fill="currentColor" color="white" style={{ color: primaryColor }} />
                        </div>

                        <p className="text-slate-500 leading-relaxed text-sm">
                            {bizData.description || 'Description goes here.'}
                        </p>

                        {/* Status Badge */}
                        <div className="mt-3 flex gap-2">
                            {status === 'open' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border animate-in fade-in" style={{ backgroundColor: secondaryColor, color: primaryColor, borderColor: `${primaryColor}30` }}>
                                    Open Now
                                </span>
                            )}
                            {status === 'closing_soon' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-amber-50 text-amber-600 border-amber-200 animate-pulse">
                                    Closing Soon
                                </span>
                            )}
                            {status === 'opening_soon' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-50 text-blue-600 border-blue-200">
                                    Opening Soon
                                </span>
                            )}
                            {status === 'closed' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                                    Closed
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {bizData.website && (
                            <a
                                href={getWebsiteLink(bizData.website)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="col-span-2 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between theme-border-hover transition-colors group theme-group"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center transition-transform theme-icon-scale"
                                        style={{ backgroundColor: secondaryColor, color: primaryColor }}
                                    >
                                        <Globe size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs text-slate-500 font-medium">Website</div>
                                        <div className="text-sm font-semibold text-slate-900">Visit Online</div>
                                    </div>
                                </div>
                                <div className="text-slate-300 group-hover:translate-x-1 transition-transform">
                                    →
                                </div>
                            </a>
                        )}

                        {bizData.email && (
                            <a
                                href={`mailto:${bizData.email}`}
                                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3 theme-border-hover transition-colors group theme-group"
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform theme-icon-scale"
                                    style={{ backgroundColor: secondaryColor, color: primaryColor }}
                                >
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Email</div>
                                    <div className="text-sm font-semibold text-slate-900">Contact Us</div>
                                </div>
                            </a>
                        )}

                        {bizData.address && (
                            <a
                                href={getMapLink(bizData.address)}
                                target="_blank"
                                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3 theme-border-hover transition-colors group theme-group"
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform theme-icon-scale"
                                    style={{ backgroundColor: secondaryColor, color: primaryColor }}
                                >
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Location</div>
                                    <div className="text-sm font-semibold text-slate-900">Get Directions</div>
                                </div>
                            </a>
                        )}
                    </div>

                    {/* Hours Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-xl" style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                                <Clock size={20} />
                            </div>
                            <h3 className="text-base font-bold text-slate-900">Business Hours</h3>
                        </div>
                        <div className="space-y-3">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                                const key = day.toLowerCase();
                                const time = bizData.hours?.[key];
                                const isToday = new Date().toLocaleDateString('en-US', { weekday: 'short' }) === day;

                                return (
                                    <div key={day} className={`flex justify-between items-center text-sm py-1 ${isToday ? 'font-medium' : ''}`}>
                                        <span
                                            className={`w-12 ${isToday ? '' : 'text-slate-400'}`}
                                            style={isToday ? { color: primaryColor } : {}}
                                        >
                                            {day}
                                        </span>
                                        <div className={`flex-1 mx-4 h-px border-b border-dotted ${isToday ? '' : 'border-slate-200'}`} style={isToday ? { borderColor: `${primaryColor}50` } : {}} />
                                        <span className={`${isToday ? 'text-slate-900' : 'text-slate-600'}`}>
                                            {typeof time === 'string' ? (time || 'Closed') : (
                                                time?.isOpen ? `${formatTime(time.start)} - ${formatTime(time.end)}` : 'Closed'
                                            )}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Social Links */}
                    {bizData.social_links?.length > 0 && (
                        <div className="pb-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Follow Us</h3>
                            <div className="flex justify-center gap-4 flex-wrap">
                                {bizData.social_links.map((link: any, i: number) => {
                                    if (!link.url) return null;
                                    const safeUrl = link.url.startsWith('http') ? link.url : `https://${link.url}`;

                                    return (
                                        <a
                                            key={i}
                                            href={safeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 transition-all hover:-translate-y-1 hover:text-white"
                                            style={{
                                                // We can't easily hover-style inline with pure React styles properly for pseudo classes without a wrapper or CSS-in-JS.
                                                // But we can use style tag for a group class or simple inline logic.
                                                // For now, let's keep the hover black default or try to use primary on hover?
                                                // Using `hover:bg-slate-900` keeps it neutral premium.
                                                // But user wants theme reflected. Let's stick to neutral for socials as brands have their own colors usually, 
                                                // but a subtle border could work.
                                            }}
                                        >
                                            <SocialIcon platform={link.platform} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Branding */}
                <div className="py-8 text-center bg-slate-50 border-t border-slate-100">
                    <div className="flex items-center justify-center gap-2 mb-1 grayscale opacity-50">
                        <span className="font-bold text-slate-900 tracking-tight">PLA<span className="text-slate-400">QODE</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
