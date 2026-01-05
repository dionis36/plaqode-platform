
type TextPreviewProps = {
    data: any;
};

export function TextPreview({ data }: TextPreviewProps) {
    const activeData = data || {};

    const textContent = {
        title: activeData.text_content?.title || '',
        message: activeData.text_content?.message || '',
    };

    const styles = activeData.styles || {
        primary_color: '#9333EA', // Purple-600
        secondary_color: '#FAF5FF', // Purple-50
    };

    const primaryColor = styles.primary_color;
    const secondaryColor = styles.secondary_color;
    const gradientType = styles.gradient_type || 'none';
    const gradientAngle = styles.gradient_angle || 135;

    // Optional title
    const title = textContent.title;
    const message = textContent.message;

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

    return (
        <div
            className="flex-1 w-full h-full overflow-y-auto font-sans relative"
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
                    <div className="text-center py-12 px-4">
                        <p className="text-slate-400 font-medium">
                            No text content found.
                        </p>
                    </div>
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
