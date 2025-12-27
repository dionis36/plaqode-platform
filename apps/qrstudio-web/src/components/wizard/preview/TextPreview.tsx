import { HOVER_PREVIEW_DATA } from '../steps/hoverPreviewData';

type TextPreviewProps = {
    data: any;
};

export function TextPreview({ data }: TextPreviewProps) {
    const fallback = HOVER_PREVIEW_DATA.text;

    // Check if user has started entering ANY content
    const hasUserInput =
        (data?.text_content?.title || '') !== '' ||
        (data?.text_content?.message || '') !== '';

    const activeData = hasUserInput ? data : fallback;

    const textContent = {
        title: activeData.text_content?.title || (hasUserInput ? '' : fallback.text_content.title),
        message: activeData.text_content?.message || (hasUserInput ? '' : fallback.text_content.message),
    };

    const styles = data.styles || fallback.styles;

    const primaryColor = styles.primary_color || fallback.styles.primary_color;
    const secondaryColor = styles.secondary_color || fallback.styles.secondary_color;
    const gradientType = styles.gradient_type || 'none';
    const gradientAngle = styles.gradient_angle || 135;

    // Optional title
    const title = textContent.title;
    const message = textContent.message;

    // Helper to lighten a color
    const lightenColor = (hex: string, percent: number = 30) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, (num >> 16) + Math.round(((255 - (num >> 16)) * percent) / 100));
        const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(((255 - ((num >> 8) & 0x00FF)) * percent) / 100));
        const b = Math.min(255, (num & 0x0000FF) + Math.round(((255 - (num & 0x0000FF)) * percent) / 100));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    // Lorem ipsum placeholder
    const placeholderText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

    // Generate background style
    const getBackgroundStyle = () => {
        if (gradientType === 'linear') {
            return {
                background: `linear-gradient(${gradientAngle}deg, ${primaryColor}, ${secondaryColor})`
            };
        } else if (gradientType === 'radial') {
            return {
                background: `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`
            };
        } else {
            return {
                backgroundColor: secondaryColor
            };
        }
    };

    const lightPrimary = lightenColor(primaryColor, 95);

    return (
        <div
            className="absolute inset-0 w-full h-full overflow-y-auto font-sans"
            style={{
                ...getBackgroundStyle(),
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE/Edge
            }}
        >
            {/* Hide scrollbar for Chrome/Safari */}
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            <div className="min-h-full px-6 py-8 flex flex-col">
                {/* Top margin */}
                <div className="flex-shrink-0 h-16"></div>

                {/* Optional Title */}
                {title && (
                    <h1
                        className="text-2xl font-bold text-center mb-6 px-4"
                        style={{ color: primaryColor }}
                    >
                        {title}
                    </h1>
                )}

                {/* Text Content */}
                {message ? (
                    <div className="bg-white rounded-2xl p-6 shadow-md w-full relative">


                        <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-wrap relative z-10 font-medium">
                            {message}
                        </p>
                    </div>
                ) : (
                    hasUserInput ? null : (
                        <div className="text-center py-12 px-4">
                            {/* Assuming 'Type' is an icon component, it needs to be imported or defined */}
                            {/* <Type className="w-16 h-16 text-slate-300 mx-auto mb-4" /> */}
                            <p className="text-slate-400 font-medium">
                                Enter your text message to see it previewed here
                            </p>
                        </div>
                    )
                )}

                {/* Bottom spacing for scroll allowance */}
                <div className="flex-shrink-0 h-8"></div>

                {/* Footer Branding */}
                <div className="mt-auto pt-6 text-center">
                    <p className="text-xs text-slate-600">
                        Powered by <span className="font-semibold">QR Studio</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
