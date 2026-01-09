import { MapPin, Phone, Mail, Globe, Clock, Twitter } from 'lucide-react';
import { SiFacebook, SiInstagram, SiLinkedin, SiTiktok, SiYoutube } from 'react-icons/si';

interface BusinessPagePreviewProps {
    data: any;
}

export function BusinessPagePreview({ data }: BusinessPagePreviewProps) {
    const primaryColor = data.styles?.primary_color || '#2563EB';

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
            case 'twitter': return <Twitter size={14} fill="currentColor" />;
            case 'linkedin': return <SiLinkedin />;
            case 'tiktok': return <SiTiktok />;
            case 'youtube': return <SiYoutube />;
            default: return <Globe />;
        }
    };

    return (
        <div className="h-full w-full bg-slate-50 flex flex-col relative overflow-hidden font-sans scrollbar-hide overflow-y-auto">

            {/* Banner Area */}
            <div className="w-full h-40 bg-slate-200 relative flex-shrink-0">
                {bizData.banner ? (
                    <img src={bizData.banner} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full" style={{ backgroundColor: primaryColor, opacity: 0.8 }} />
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
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden mb-3">
                    {bizData.logo ? (
                        <img src={bizData.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                            <StoreIcon size={32} />
                        </div>
                    )}
                </div>

                <h1 className="text-xl font-bold text-slate-900 leading-tight mb-1">
                    {bizData.name || 'Business Name'}
                </h1>
                <p className="text-sm text-slate-500 leading-snug max-w-[250px]">
                    {bizData.description || 'Description'}
                </p>
            </div>

            {/* Contact Actions */}
            <div className="px-6 py-6 flex gap-3 justify-center">
                {bizData.phone && (
                    <a href={`tel:${bizData.phone}`} className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-2 text-slate-700 text-sm font-semibold active:bg-slate-50">
                        <Phone size={16} className="text-green-600" />
                        Call
                    </a>
                )}
                {bizData.email && (
                    <a href={`mailto:${bizData.email}`} className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center gap-2 text-slate-700 text-sm font-semibold active:bg-slate-50">
                        <Mail size={16} className="text-blue-600" />
                        Email
                    </a>
                )}
            </div>

            {/* Info Cards */}
            <div className="px-6 pb-6 space-y-4">

                {/* Location */}
                {bizData.address && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-4">
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Visit Us</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{bizData.address}</p>
                        </div>
                    </div>
                )}

                {/* Website */}
                {bizData.website && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-4">
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
                            <Globe size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Website</h3>
                            <a href={bizData.website} className="text-xs text-blue-600 mt-0.5 block truncate max-w-[200px]">{bizData.website}</a>
                        </div>
                    </div>
                )}

                {/* Hours */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                        <Clock size={16} className="text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-900">Opening Hours</h3>
                    </div>
                    <div className="space-y-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                            const key = day.toLowerCase();
                            const time = bizData.hours?.[key];
                            const isToday = new Date().toLocaleDateString('en-US', { weekday: 'short' }) === day;

                            return (
                                <div key={day} className={`flex justify-between text-xs ${isToday ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
                                    <span className="w-10">{day}</span>
                                    <span>{time || 'Closed'}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Social Links */}
                {bizData.social_links?.length > 0 && (
                    <div className="flex justify-center gap-4 py-4">
                        {bizData.social_links.map((link: any, i: number) => (
                            <a key={i} href={link.url} className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors">
                                <SocialIcon platform={link.platform} />
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-auto py-6 text-xs text-slate-400 font-medium text-center">
                Powered by Plaqode
            </div>
        </div>
    );
}

function StoreIcon({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" /></svg>
    )
}
