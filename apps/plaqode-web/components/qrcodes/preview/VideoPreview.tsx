import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Share2, Video, Play, ExternalLink } from 'lucide-react';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

// --- Helpers ---
function getYouTubeVideoId(url: string): string | null {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:.*v=|embed\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getYouTubeThumbnail(videoId: string) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

interface VideoPreviewProps {
    data: any;
}

export function VideoPreview({ data }: VideoPreviewProps) {
    const primaryColor = data.styles?.primary_color || '#FF0000';
    const secondaryColor = data.styles?.secondary_color || '#FFF1F2';

    // Construct video list
    let videoList = data.video?.videos || [];
    if (videoList.length === 0 && (data.video?.video_url || data.video_url)) {
        // Fallback for legacy single-video structure
        videoList = [{
            id: 'legacy',
            url: data.video?.video_url || data.video_url,
            title: data.video?.title || data.title || 'Video',
            description: data.video?.description || data.description || ''
        }];
    }

    const pageInfo = {
        title: data.video?.page_title || data.title || 'My Playlist',
        description: data.video?.page_description || data.description || '',
        buttons: data.video?.buttons || []
    };

    const [isMounted, setIsMounted] = useState(false);
    const [activeVideoId, setActiveVideoId] = useState<string | number | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                    {/* Floating Icon */}
                    <div className="relative group mb-5">
                        <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 transition-opacity duration-500 scale-125" />
                        <div
                            className="relative h-24 w-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-1 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out rotate-3"
                        >
                            <div className="w-full h-full rounded-2xl flex items-center justify-center text-white font-bold text-3xl" style={{ backgroundColor: primaryColor }}>
                                {pageInfo.title.charAt(0)}
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2">
                        {pageInfo.title}
                    </h1>
                    {pageInfo.description && (
                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                            {pageInfo.description}
                        </p>
                    )}
                </div>

                <div className="flex-shrink-0 px-4 flex flex-col items-center pb-8 space-y-6">

                    {/* Top Action Buttons (if any) */}
                    {pageInfo.buttons.length > 0 && (
                        <div className="w-full max-w-sm space-y-3">
                            {pageInfo.buttons.map((btn: any, idx: number) => (
                                <a
                                    key={idx}
                                    href={btn.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-slate-800 bg-white/80 backdrop-blur-md border border-white/60 relative overflow-hidden"
                                >
                                    <span>{btn.label}</span>
                                    <ExternalLink size={14} className="opacity-50" />
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Video List */}
                    <div className="w-full max-w-sm space-y-6">
                        {videoList.length > 0 ? (
                            videoList.map((video: any, idx: number) => {
                                const videoKey = video.id || idx;
                                const isPlaying = activeVideoId === videoKey;
                                const ytId = getYouTubeVideoId(video.url);
                                const isYouTube = !!ytId;

                                // Smart Thumbnail
                                let displayThumbnail = video.thumbnail;
                                if (!displayThumbnail && video.url) {
                                    const ytId = getYouTubeVideoId(video.url);
                                    if (ytId) displayThumbnail = getYouTubeThumbnail(ytId);
                                }

                                return (
                                    <div
                                        key={videoKey}
                                        className="w-full bg-white/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/80 p-4 ring-1 ring-white/40 animate-in slide-in-from-bottom-8 duration-700 fill-mode-backwards"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="flex flex-col gap-4">
                                            {/* Video Player Box */}
                                            <div className="relative w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow-sm border border-slate-200/50">
                                                {isPlaying && isMounted ? (
                                                    isYouTube && ytId ? (
                                                        <iframe
                                                            className="w-full h-full"
                                                            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
                                                            title={video.title}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                                            allowFullScreen
                                                        />
                                                    ) : (
                                                        <video
                                                            className="w-full h-full bg-black"
                                                            src={video.url}
                                                            controls
                                                            autoPlay
                                                            playsInline
                                                            controlsList="nodownload"
                                                        />
                                                    )
                                                ) : (
                                                    // Thumbnail
                                                    <div
                                                        onClick={() => setActiveVideoId(videoKey)}
                                                        className="absolute inset-0 cursor-pointer flex items-center justify-center bg-slate-900 group"
                                                    >
                                                        {displayThumbnail ? (
                                                            <Image
                                                                src={displayThumbnail}
                                                                alt={video.title}
                                                                fill
                                                                sizes="(max-width: 768px) 100vw, 400px"
                                                                className="object-cover opacity-90 transition-opacity"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
                                                        )}

                                                        {/* Play Button Icon */}
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                            <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-lg">
                                                                <Play fill="white" className="ml-1 text-white w-5 h-5" />
                                                            </div>
                                                        </div>

                                                        {/* Badge */}
                                                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold text-white uppercase tracking-wider">
                                                            {video.source_type === 'file' ? 'File' : 'YouTube'}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info & Actions */}
                                            <div className="px-1">
                                                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2">{video.title}</h3>
                                                {video.description && (
                                                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">{video.description}</p>
                                                )}

                                                <button
                                                    onClick={() => isPlaying ? null : setActiveVideoId(videoKey)}
                                                    className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${isPlaying
                                                        ? 'bg-slate-100 text-slate-400 cursor-default border border-slate-200'
                                                        : 'bg-slate-900 text-white shadow-lg active:scale-[0.98]'
                                                        }`}
                                                >
                                                    <Play size={14} fill={isPlaying ? "currentColor" : "none"} />
                                                    {isPlaying ? 'Now Playing' : 'Watch Video'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2rem] shadow-lg border border-white/80 p-10 text-center flex flex-col items-center justify-center">
                                <Video className="w-10 h-10 text-slate-300 mb-2" />
                                <p className="text-sm font-bold text-slate-400">Empty Playlist</p>
                            </div>
                        )}
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
