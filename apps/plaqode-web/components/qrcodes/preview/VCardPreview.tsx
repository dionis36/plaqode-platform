'use client';

import { Phone, Mail, Globe, MapPin, Building2, User, Share2, Briefcase } from 'lucide-react';
import Image from 'next/image';
import {
    FaLinkedin, FaFacebook, FaXTwitter, FaInstagram, FaYoutube, FaTiktok, FaPinterest, FaMastodon,
    FaGithub, FaBehance, FaDribbble, FaMedium, FaTwitch, FaFlickr,
    FaTelegram, FaWhatsapp, FaReddit, FaSpotify, FaSkype
} from 'react-icons/fa6';
import { downloadVCard } from '@/lib/vcard';

// Social network configuration
const SOCIAL_NETWORK_CONFIG: Record<string, { icon: any; color: string; label: string }> = {
    linkedin: { icon: FaLinkedin, color: '#0A66C2', label: 'LinkedIn' },
    facebook: { icon: FaFacebook, color: '#1877F2', label: 'Facebook' },
    twitter: { icon: FaXTwitter, color: '#000000', label: 'X (Twitter)' },
    instagram: { icon: FaInstagram, color: '#E4405F', label: 'Instagram' },
    youtube: { icon: FaYoutube, color: '#FF0000', label: 'YouTube' },
    tiktok: { icon: FaTiktok, color: '#000000', label: 'TikTok' },
    pinterest: { icon: FaPinterest, color: '#BD081C', label: 'Pinterest' },
    mastodon: { icon: FaMastodon, color: '#6364FF', label: 'Mastodon' },
    github: { icon: FaGithub, color: '#181717', label: 'GitHub' },
    behance: { icon: FaBehance, color: '#1769FF', label: 'Behance' },
    dribbble: { icon: FaDribbble, color: '#EA4C89', label: 'Dribbble' },
    medium: { icon: FaMedium, color: '#000000', label: 'Medium' },
    twitch: { icon: FaTwitch, color: '#9146FF', label: 'Twitch' },
    flickr: { icon: FaFlickr, color: '#0063DC', label: 'Flickr' },
    website: { icon: Globe, color: '#2563EB', label: 'Website' },
    telegram: { icon: FaTelegram, color: '#26A5E4', label: 'Telegram' },
    whatsapp: { icon: FaWhatsapp, color: '#25D366', label: 'WhatsApp' },
    reddit: { icon: FaReddit, color: '#FF4500', label: 'Reddit' },
    spotify: { icon: FaSpotify, color: '#1DB954', label: 'Spotify' },
    skype: { icon: FaSkype, color: '#00AFF0', label: 'Skype' },
};

export function VCardPreview({ data }: { data: any }) {
    // Destructure with defaults
    const styles = data?.styles || { primary_color: '#2563EB', secondary_color: '#EFF6FF' };
    const personal = data?.personal_info || {};
    const contact = data?.contact_details || {};
    const company = data?.company_details || {};
    const address = data?.address || {};
    const socialNetworks = data?.social_networks || [];
    const summary = data?.summary || '';

    const fullName = [personal.first_name, personal.last_name].filter(Boolean).join(' ') || 'John Doe';
    const jobTitle = company.job_title || 'Professional';
    const companyName = company.company_name || '';

    const primaryColor = styles.primary_color || '#2563EB';
    const secondaryColor = styles.secondary_color || '#EFF6FF';

    const handleSaveContact = () => {
        // Flatten data structure for the generator
        const vcardData = {
            first_name: personal.first_name,
            last_name: personal.last_name,
            company: company.company_name,
            job_title: company.job_title,
            photo: personal.avatar_image,
            mobile: contact.phone,
            phone: contact.alternative_phone,
            fax: contact.fax, // Assuming fax might be added later, or mapped from alt
            email: contact.email,
            website: contact.website,
            address: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
            summary: summary,
            social_links: socialNetworks.map((net: any) => ({
                platform: net.network,
                url: net.url
            }))
        };
        downloadVCard(vcardData);
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
                    {/* Floating Avatar */}
                    <div className="relative group mb-5">
                        <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 transition-opacity duration-500 scale-125" />
                        <div className="relative h-32 w-32 bg-white rounded-full shadow-2xl flex items-center justify-center p-1 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out">
                            {personal.avatar_image ? (
                                <div className="relative w-full h-full rounded-full overflow-hidden">
                                    <Image src={personal.avatar_image} alt="Profile" fill className="object-cover" />
                                </div>
                            ) : (
                                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold" style={{ color: primaryColor }}>
                                    {fullName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name & Title */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2">
                        {fullName}
                    </h1>
                    <div className="flex flex-col items-center gap-1 text-slate-600 font-medium">
                        <span className="text-lg">{jobTitle}</span>
                        {companyName && (
                            <span className="text-sm opacity-80 flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5" /> {companyName}
                            </span>
                        )}
                    </div>
                </div>

                {/* 2. Main Glass Card */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        {/* Save Contact Button */}
                        <button
                            onClick={handleSaveContact}
                            className="w-full py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-8 text-white relative overflow-hidden"
                            style={{ backgroundColor: primaryColor }}
                        >
                            <User className="w-5 h-5" />
                            <span>Save Contact</span>
                        </button>

                        <div className="space-y-6">
                            {/* Summary */}
                            {summary && (
                                <div className="text-center">
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {summary}
                                    </p>
                                </div>
                            )}

                            {/* Contact Actions */}
                            <div className="space-y-3">
                                {contact.phone && (
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all active:scale-[0.99]"
                                    >
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Mobile</p>
                                            <p className="text-slate-800 font-medium truncate">{contact.phone}</p>
                                        </div>
                                    </a>
                                )}

                                {contact.email && (
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all active:scale-[0.99]"
                                    >
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                                            <p className="text-slate-800 font-medium truncate">{contact.email}</p>
                                        </div>
                                    </a>
                                )}

                                {contact.website && (
                                    <a
                                        href={contact.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all active:scale-[0.99]"
                                    >
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Website</p>
                                            <p className="text-slate-800 font-medium truncate">{contact.website.replace(/^https?:\/\//, '')}</p>
                                        </div>
                                    </a>
                                )}

                                {(address.street || address.city) && (
                                    <a
                                        href={`https://maps.google.com/?q=${[address.street, address.city, address.state, address.country].filter(Boolean).join(', ')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all active:scale-[0.99]"
                                    >
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-600 transition-colors">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                                            <p className="text-slate-800 font-medium truncate">
                                                {[address.city, address.country].filter(Boolean).join(', ') || address.street}
                                            </p>
                                        </div>
                                    </a>
                                )}
                            </div>

                            {/* Social Grid */}
                            {socialNetworks.length > 0 && (
                                <div className="pt-2">
                                    <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Connect with me</p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {socialNetworks.map((net: any, idx: number) => {
                                            const config = SOCIAL_NETWORK_CONFIG[net.network] || { icon: Share2, color: '#64748b', label: 'Social' };
                                            const Icon = config.icon;
                                            return (
                                                <a
                                                    key={idx}
                                                    href={net.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm active:scale-95 transition-all"
                                                    style={{ backgroundColor: config.color }}
                                                    title={config.label}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </a>
                                            );
                                        })}
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
