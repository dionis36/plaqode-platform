'use client';

import { MapPin, Phone, Mail, Globe, Clock, Twitter, Share2, Store } from 'lucide-react';
import { SiFacebook, SiInstagram, SiLinkedin, SiTiktok, SiYoutube } from 'react-icons/si';

interface BusinessPagePreviewProps {
    data: any;
}

export function BusinessPagePreview({ data }: BusinessPagePreviewProps) {
    const styles = data.styles || {};
    const primaryColor = styles.primary_color || '#2563EB';
    // Secondary color not heavily used in this design, but available
    // const secondaryColor = styles.secondary_color || '#EFF6FF';

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
            case 'twitter': return <Twitter size={14} fill="currentColor" strokeWidth={0} />;
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

    return (
        <div className="absolute inset-0 w-full h-full bg-slate-50 flex flex-col overflow-y-auto font-sans scrollbar-hide">
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Banner Area */}
            <div className="w-full h-40 relative flex-shrink-0 bg-slate-200">
                {bizData.banner ? (
                    <img src={bizData.banner} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full" style={{ backgroundColor: primaryColor, opacity: 0.9 }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                )}
                {/* Curve Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(110%+1.3px)] h-[30px] fill-slate-50">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                    </svg>
                </div>
            </div>

            {/* Profile Section */}
            <div className="px-6 -mt-12 relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden mb-3 md:w-28 md:h-28">
                    {bizData.logo ? (
                        <img src={bizData.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                            <Store size={32} />
                        </div>
                    )}
                </div>

                <h1 className="text-xl font-bold text-slate-900 leading-tight mb-2 px-2">
                    {bizData.name || 'Business Name'}
                </h1>
                <p className="text-sm text-slate-500 leading-snug max-w-[280px]">
                    {bizData.description || 'Description'}
                </p>
            </div>

            {/* Content Container */}
            <div className="flex-1 px-4 py-6 space-y-4 max-w-md mx-auto w-full">

                {/* Contact Actions Row */}
                <div className="flex gap-3 justify-center">
                    {bizData.phone && (
                        <a
                            href={`tel:${bizData.phone}`}
                            className="flex-1 py-3 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-2 text-slate-700 text-sm font-semibold active:bg-slate-50 hover:shadow-md transition-all hover:border-green-200"
                        >
                            <Phone size={16} className="text-green-600" />
                            Call
                        </a>
                    )}
                    {bizData.email && (
                        <a
                            href={`mailto:${bizData.email}`}
                            className="flex-1 py-3 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-2 text-slate-700 text-sm font-semibold active:bg-slate-50 hover:shadow-md transition-all hover:border-blue-200"
                        >
                            <Mail size={16} className="text-blue-600" />
                            Email
                        </a>
                    )}
                </div>

                {/* Location Card */}
                {bizData.address && (
                    <a
                        href={getMapLink(bizData.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-4 hover:bg-slate-50 transition-colors group"
                    >
                        <div className="p-2.5 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-slate-100 group-hover:text-red-500 transition-colors">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                Visit Us
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-medium">Map</span>
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{bizData.address}</p>
                        </div>
                    </a>
                )}

                {/* Website Card */}
                {bizData.website && (
                    <a
                        href={getWebsiteLink(bizData.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-4 hover:bg-slate-50 transition-colors group"
                    >
                        <div className="p-2.5 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-slate-100 group-hover:text-blue-500 transition-colors">
                            <Globe size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Website</h3>
                            <p className="text-xs text-blue-600 mt-1 truncate max-w-[200px] hover:underline">
                                {bizData.website.replace(/^https?:\/\//, '')}
                            </p>
                        </div>
                    </a>
                )}

                {/* Hours Card */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-50">
                        <Clock size={16} className="text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-900">Opening Hours</h3>
                    </div>
                    <div className="space-y-2.5">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                            const key = day.toLowerCase();
                            const time = bizData.hours?.[key];
                            const isToday = new Date().toLocaleDateString('en-US', { weekday: 'short' }) === day;

                            return (
                                <div key={day} className={`flex justify-between text-xs items-center ${isToday ? 'bg-blue-50 -mx-2 px-2 py-1 rounded-md' : ''}`}>
                                    <span className={`w-12 ${isToday ? 'font-bold text-blue-700' : 'text-slate-500 font-medium'}`}>{day}</span>
                                    <span className={`${isToday ? 'text-blue-900 font-semibold' : 'text-slate-700'}`}>{time || 'Closed'}</span>
                                    {isToday && <span className="w-2 h-2 rounded-full bg-blue-500 ml-2" title="Today"></span>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Social Links */}
                {bizData.social_links?.length > 0 && (
                    <div className="flex justify-center gap-3 py-4 flex-wrap">
                        {bizData.social_links.map((link: any, i: number) => {
                            if (!link.url) return null;
                            const safeUrl = link.url.startsWith('http') ? link.url : `https://${link.url}`; // Basic fix

                            return (
                                <a
                                    key={i}
                                    href={safeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white hover:bg-slate-800 hover:border-transparent transition-all hover:scale-110 active:scale-95"
                                >
                                    <SocialIcon platform={link.platform} />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer Branding */}
            <div className="mt-auto py-6 text-xs text-slate-400 font-medium text-center bg-slate-50">
                Powered by Plaqode
            </div>
        </div>
    );
}
