import { WizardState } from '../store';

const PLACEHOLDER_IMAGES = [
    { url: 'https://images.pexels.com/photos/31051251/pexels-photo-31051251.jpeg', alt: 'Placeholder 1' },
    { url: 'https://images.pexels.com/photos/26772001/pexels-photo-26772001.jpeg', alt: 'Placeholder 2' },
    { url: 'https://images.pexels.com/photos/6532248/pexels-photo-6532248.jpeg', alt: 'Placeholder 3' },
    { url: 'https://images.pexels.com/photos/20335127/pexels-photo-20335127.jpeg', alt: 'Placeholder 4' },
    { url: 'https://images.pexels.com/photos/2451625/pexels-photo-2451625.jpeg', alt: 'Placeholder 5' },
    { url: 'https://images.pexels.com/photos/14525263/pexels-photo-14525263.jpeg', alt: 'Placeholder 6' },
];

interface GalleryPreviewProps {
    data: WizardState['payload'];
}

export function GalleryPreview({ data }: GalleryPreviewProps) {
    const gallery = data.gallery;
    // Use placeholders if no user images, or if the array is empty
    const hasUserImages = gallery?.images && gallery.images.length > 0;
    const images = hasUserImages ? gallery.images : PLACEHOLDER_IMAGES;

    const style = gallery?.grid_style || 'grid';
    const styles = data.styles || {};
    const primaryColor = styles.primary_color || '#3B82F6'; // Default blue
    const secondaryColor = styles.secondary_color || '#DBEAFE';

    // Dynamic Background Style
    const backgroundStyle = { background: `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)` };

    return (
        <div className="absolute inset-0 w-full h-full font-sans overflow-hidden bg-white text-slate-900 select-none" style={backgroundStyle}>
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* --- Fixed Background Orbs --- */}
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

            {/* --- Content Container --- */}
            <div className="relative w-full h-full flex flex-col z-10">

                {/* Header Section */}
                <div className="flex-none pt-12 pb-6 px-6 text-center z-20">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight drop-shadow-sm mb-2">{gallery.title || 'My Gallery'}</h1>
                    {gallery.description && (
                        <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-[80%] mx-auto bg-white/30 backdrop-blur-md py-1 px-3 rounded-full border border-white/40 shadow-sm inline-block">
                            {gallery.description}
                        </p>
                    )}
                </div>

                {/* Main View Area */}
                <div className={`flex-1 min-h-0 w-full px-4 pb-4 ${style === 'carousel' ? 'flex flex-col justify-center' : 'overflow-y-auto no-scrollbar'}`}>

                    {style === 'grid' && (
                        <div className="w-full pb-8">
                            <div className="grid grid-cols-2 gap-3">
                                {images.map((img: any, idx: number) => (
                                    <div key={idx} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden shadow-sm relative">
                                        <img
                                            src={img.url}
                                            alt={img.alt || 'Gallery image'}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {style === 'carousel' && (
                        <div className="w-full py-4">
                            {/* Carousel Container - Centered Vertically by parent flex */}
                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-8 scrollbar-hide items-center">
                                {images.map((img: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="snap-center shrink-0 w-[90%] bg-transparent rounded-3xl overflow-hidden shadow-2xl shadow-black/20"
                                    >
                                        <div className="aspect-[3/4] relative">
                                            <img
                                                src={img.url}
                                                alt={img.alt || 'Gallery image'}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            {/* Gradient Overlay for Text Visibility */}
                                            {img.caption && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                                                    <p className="text-white font-bold text-lg leading-tight shadow-black/20 drop-shadow-md">{img.caption}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {/* Spacer for end of list padding */}
                                <div className="snap-center shrink-0 w-4" />
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="flex-none pb-6 pt-2 text-center">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold opacity-60">Powered by Plaqode</span>
                </div>
            </div>
        </div>
    );
}
