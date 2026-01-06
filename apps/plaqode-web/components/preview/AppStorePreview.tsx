import { Download, Star, StarHalf } from 'lucide-react';
import { FaGooglePlay, FaApple, FaAmazon } from 'react-icons/fa6';

export function AppStorePreview({ data }: { data: any }) {
    // Default fallback data (replacing HOVER_PREVIEW_DATA)
    const fallback = {
        app_name: 'App Name',
        developer: 'Developer Name',
        description: 'App description goes here.',
        app_logo: null,
        platforms: [
            { platform: 'google_play', url: 'https://play.google.com/store' },
            { platform: 'ios', url: 'https://apps.apple.com' },
        ],
        styles: {
            primary_color: '#4F46E5', // Indigo-600
            secondary_color: '#EEF2FF', // Indigo-50
        },
    };

    // Check if user has entered ANY content
    // We check app_name, developer, description, or logo
    // OR if they added platforms (beyond defaults?)
    // Actually, usually user flows start empty or with defaults.
    // Let's use the provided data if it exists.

    const hasUserInput =
        (data?.app_name || '') !== '' ||
        (data?.developer || '') !== '' ||
        (data?.description || '') !== '' ||
        (data?.app_logo || '') !== '';

    const activeData = hasUserInput ? data : fallback;

    const appName = activeData.app_name || (hasUserInput ? '' : fallback.app_name);
    const developer = activeData.developer || (hasUserInput ? '' : fallback.developer);
    const description = activeData.description || (hasUserInput ? '' : fallback.description);
    const appLogo = activeData.app_logo;

    const platforms = activeData.platforms && activeData.platforms.length > 0
        ? activeData.platforms
        : (hasUserInput ? [] : fallback.platforms);

    const styles = data.styles || fallback.styles;
    const primaryColor = styles.primary_color || '#4F46E5';
    const secondaryColor = styles.secondary_color || '#EEF2FF';

    // Helper to lighten a color
    const lightenColor = (hex: string, percent: number = 30) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, (num >> 16) + Math.round(((255 - (num >> 16)) * percent) / 100));
        const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(((255 - ((num >> 8) & 0x00FF)) * percent) / 100));
        const b = Math.min(255, (num & 0x0000FF) + Math.round(((255 - (num & 0x0000FF)) * percent) / 100));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    // Generate background style
    const getBackgroundStyle = () => {
        const gradientType = styles.gradient_type || 'none';
        const angle = styles.gradient_angle || 135;

        // Ensure we always have a background, default to white/gray if none
        if (gradientType === 'linear') {
            return {
                background: `linear-gradient(${angle}deg, ${primaryColor}, ${secondaryColor})`
            };
        } else if (gradientType === 'radial') {
            return {
                background: `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`
            };
        }

        // Default: subtle gradient
        return {
            background: `linear-gradient(180deg, ${primaryColor} 0%, ${lightenColor(primaryColor, 30)} 100%)`
        };
    };

    const lightPrimary = lightenColor(primaryColor, 95);

    // Platform config
    const STORE_BADGES: any = {
        google_play: { name: 'Google Play', icon: FaGooglePlay, subtitle: 'GET IT ON' },
        ios: { name: 'App Store', icon: FaApple, subtitle: 'Download on the' },
        amazon: { name: 'Amazon Appstore', icon: FaAmazon, subtitle: 'Available at' },
    };

    return (
        <div
            className="absolute inset-0 w-full h-full flex flex-col overflow-y-auto"
            style={{
                backgroundColor: secondaryColor || '#F3F4F6',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}
        >
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            {/* Header / Hero Section */}
            <div
                className="pt-24 pb-20 px-6 text-center relative"
                style={getBackgroundStyle()}
            >
                {/* App Logo */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 rounded-2xl shadow-xl bg-white p-1">
                        {appLogo ? (
                            <img
                                src={appLogo}
                                alt="App Logo"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center">
                                <Star className="w-10 h-10 text-slate-300" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Rating Stars (Mockup) */}
                <div className="absolute top-6 right-6 flex gap-0.5 opacity-80">
                    {[1, 2, 3, 4].map(i => <Star key={i} className="w-3 h-3 fill-white text-white" />)}
                    <StarHalf className="w-3 h-3 fill-white text-white" />
                </div>
            </div>

            {/* Content Section */}
            <div
                className="flex-1 pt-12 px-6 pb-8 -mt-6 bg-white rounded-t-3xl shadow-sm z-10"
                style={{ backgroundColor: secondaryColor || '#F3F4F6' }}
            >
                {/* App Info */}
                <div className="text-center mb-8">
                    <h1 className="text-xl font-bold text-slate-900 mb-1 leading-tight">
                        {appName}
                    </h1>
                    <p className="text-sm font-medium opacity-80 mb-3" style={{ color: primaryColor }}>
                        {developer}
                    </p>
                    {description && (
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
                            {description}
                        </p>
                    )}
                </div>

                {/* Download Buttons */}
                <div className="space-y-3">
                    {platforms.map((platform: any, index: number) => {
                        const badge = STORE_BADGES[platform.platform];
                        if (!badge) return null;
                        const Icon = badge.icon;

                        return (
                            <a
                                key={index}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-slate-900 text-white p-3 rounded-xl shadow-lg hover:bg-slate-800 transition-all hover:scale-[1.02]"
                            >
                                <div className="p-1">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[0.6rem] uppercase tracking-wider opacity-90 leading-tight">
                                        {badge.subtitle}
                                    </span>
                                    <span className="text-lg font-bold leading-tight">
                                        {badge.name}
                                    </span>
                                </div>
                            </a>
                        );
                    })}

                    {platforms.length === 0 && hasUserInput && (
                        <div className="text-center p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 text-sm">
                            Add download links to see buttons here
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Branding */}
            <div
                className="pb-6 text-center"
                style={{ backgroundColor: secondaryColor || '#F3F4F6' }}
            >
                <p className="text-xs text-slate-600">
                    Powered by <span className="font-semibold">QR Studio</span>
                </p>
            </div>
        </div>
    );
}
