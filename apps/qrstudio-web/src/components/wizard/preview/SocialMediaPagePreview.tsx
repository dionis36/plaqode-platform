import { User, Share2, ChevronRight } from 'lucide-react';
import {
    FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaLinkedin,
    FaXTwitter, FaWhatsapp, FaTelegram, FaSnapchat, FaPinterest,
    FaGithub, FaBehance, FaDribbble, FaMedium, FaTwitch,
    FaReddit, FaSpotify, FaDiscord, FaThreads, FaGlobe
} from 'react-icons/fa6';

import { MOCKUP_PREVIEW_DATA } from '../steps/mockupPreviewData';

export function SocialMediaPagePreview({ data }: { data: any }) {
    const fallback = MOCKUP_PREVIEW_DATA.socialmedia;

    // Check if user has started entering ANY content
    const hasUserInput =
        (data?.display_name || '') !== '' ||
        (data?.bio || '') !== '' ||
        (data?.profile_photo || '') !== '' ||
        (data?.title || '') !== '' ||
        (data?.tagline || '') !== '' ||
        (data?.social_links && data.social_links.length > 0) ||
        (data?.gallery_images && data.gallery_images.length > 0);

    const activeData = hasUserInput ? data : fallback;

    const displayName = activeData.display_name || (hasUserInput ? '' : fallback.display_name);
    const bio = activeData.bio || (hasUserInput ? '' : fallback.bio);
    const profilePhoto = activeData.profile_photo || (hasUserInput ? '' : fallback.profile_photo);
    const title = activeData.title || (hasUserInput ? '' : fallback.title);
    const tagline = activeData.tagline || (hasUserInput ? '' : fallback.tagline);

    const galleryImagesData = activeData.gallery_images && activeData.gallery_images.length > 0 ? activeData.gallery_images : (hasUserInput ? [] : fallback.gallery_images);
    const galleryImages = (galleryImagesData || []).filter((img: string) => img);

    const socialLinks = activeData.social_links && activeData.social_links.length > 0 ? activeData.social_links : (hasUserInput ? [] : (fallback.social_links || []));

    const styles = data.styles || fallback.styles;

    // Get user's colors
    const primaryColor = styles.primary_color || '#A855F7';
    const secondaryColor = styles.secondary_color || '#FDF4FF';

    // Social Platform configurations
    const SOCIAL_PLATFORMS = {
        instagram: { name: 'Instagram', icon: FaInstagram, color: '#E4405F' },
        facebook: { name: 'Facebook', icon: FaFacebook, color: '#1877F2' },
        youtube: { name: 'YouTube', icon: FaYoutube, color: '#FF0000' },
        tiktok: { name: 'TikTok', icon: FaTiktok, color: '#000000' },
        linkedin: { name: 'LinkedIn', icon: FaLinkedin, color: '#0A66C2' },
        twitter: { name: 'X (Twitter)', icon: FaXTwitter, color: '#000000' },
        whatsapp: { name: 'WhatsApp', icon: FaWhatsapp, color: '#25D366' },
        telegram: { name: 'Telegram', icon: FaTelegram, color: '#26A5E4' },
        snapchat: { name: 'Snapchat', icon: FaSnapchat, color: '#FFFC00' },
        pinterest: { name: 'Pinterest', icon: FaPinterest, color: '#BD081C' },
        github: { name: 'GitHub', icon: FaGithub, color: '#181717' },
        behance: { name: 'Behance', icon: FaBehance, color: '#1769FF' },
        dribbble: { name: 'Dribbble', icon: FaDribbble, color: '#EA4C89' },
        medium: { name: 'Medium', icon: FaMedium, color: '#000000' },
        twitch: { name: 'Twitch', icon: FaTwitch, color: '#9146FF' },
        reddit: { name: 'Reddit', icon: FaReddit, color: '#FF4500' },
        spotify: { name: 'Spotify', icon: FaSpotify, color: '#1DB954' },
        discord: { name: 'Discord', icon: FaDiscord, color: '#5865F2' },
        threads: { name: 'Threads', icon: FaThreads, color: '#000000' },
        website: { name: 'Website', icon: FaGlobe, color: '#2563EB' },
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

            {/* --- Fixed Background Elements (Do not scroll) --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Left Orb */}
                <div
                    className="absolute top-[-20%] left-[-20%] w-[120%] h-[60%] rounded-[100%] blur-3xl opacity-40 animate-pulse"
                    style={{ background: primaryColor }}
                />
                {/* Bottom Right Orb */}
                <div
                    className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[50%] rounded-[100%] blur-3xl opacity-30"
                    style={{ background: secondaryColor }}
                />
            </div>

            {/* --- Scrollable Content Container --- */}
            <div className="relative w-full h-full overflow-y-auto no-scrollbar flex flex-col z-10">

                {/* Flexible Spacer Top */}
                <div className="w-full flex-none pt-24" />

                {/* 1. Header Section (Floating) */}
                <div className="flex-none flex flex-col justify-center items-center pb-8 px-4 text-center">
                    {/* Floating Avatar */}
                    <div className="relative group mb-6">
                        {/* Glow */}
                        <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-125" />
                        {/* Avatar Image */}
                        <div className="relative h-28 w-28 bg-white rounded-full shadow-2xl flex items-center justify-center p-1 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out">
                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full drop-shadow-sm"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
                                    <User className="w-10 h-10 text-slate-300" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Display Name */}
                    {displayName && (
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight drop-shadow-sm">
                            {displayName}
                        </h1>
                    )}

                    {/* Bio */}
                    {bio && (
                        <p className="text-sm text-slate-500 font-medium mt-2 max-w-[280px] leading-relaxed opacity-90">
                            {bio}
                        </p>
                    )}
                </div>

                {/* 2. Main Glass Card Container */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        {/* Title & Tagline (if different from profile) */}
                        {(title || tagline) && (
                            <div className="text-center mb-6">
                                {title && (
                                    <h2 className="text-xl font-bold text-slate-800 mb-1 leading-snug">
                                        {title}
                                    </h2>
                                )}
                                {tagline && (
                                    <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold opacity-70">
                                        {tagline}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Gallery Preview (Stories Style) */}
                        {galleryImages.length > 0 && (
                            <div className="mb-8">
                                <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                                    {galleryImages.map((image: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden shadow-md border-2 border-white/50 relative snap-start transition-transform"
                                        >
                                            <img
                                                src={image}
                                                alt={`Gallery ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Social Links List */}
                        <div className="space-y-3 w-full">
                            {socialLinks.length > 0 ? (
                                socialLinks.map((link: any, index: number) => {
                                    const platform = SOCIAL_PLATFORMS[link.platform as keyof typeof SOCIAL_PLATFORMS];
                                    if (!platform) return null;

                                    const Icon = platform.icon;
                                    const customLabel = link.platform === 'website' && link.custom_label
                                        ? link.custom_label
                                        : platform.name;

                                    return (
                                        <div
                                            key={index}
                                            className="flex-items-center justify-between w-full p-3 pl-4 rounded-xl bg-white border border-slate-100 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden group cursor-pointer"
                                            style={{ borderLeft: `4px solid ${platform.color}` }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
                                                    style={{ backgroundColor: platform.color }}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-slate-700 text-sm">
                                                    {customLabel}
                                                </span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300" />
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-8 opacity-50">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center mb-2">
                                        <Share2 className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <p className="text-sm text-slate-400 font-medium">Add your links</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Spacer to push footer to bottom */}
                <div className="flex-1 min-h-0" />

                {/* Footer pinned to bottom */}
                <div className="flex-none pt-4 pb-4 text-[10px] uppercase tracking-widest text-slate-400 font-semibold text-center opacity-60">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
