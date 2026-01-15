import { Play, Pause, Rewind, FastForward, Music, ExternalLink, Download, Disc } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Platform Icons
const PlatformIcons = {
    spotify: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
    ),
    apple: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M23.595 10.368c.552 6.556-3.666 12.185-9.846 13.439-6.37 1.293-12.728-2.67-13.689-9.13-.969-6.516 3.655-12.529 10.225-13.473 6.136-.881 12.75 3.069 13.31 9.164zM10.966 6.942c-2.43 1.021-3.674 3.673-4.232 6.225 1.52.27 3.038.56 4.557.871l1.531-.22c-.672-1.03-1.041-3.606.31-4.008 1.4-.418 2.072 2.11 3.253 2.502.582.193 2.053-.9.967-1.85-.926-.81-2.906-.88-3.418-2.126-.26-.632.179-1.161.9-1.353 1.062-.281 2.92.59 1.609 2.043.682-.36 3.078-1.63 2.458-2.58-.93-1.424-3.418-.94-5.226-1.054-.93-.058-1.871 1.05-2.71 1.551zm3.896 11.838c1.339-.14 2.87-1.192 1.942-2.583-.455-.683-1.082-.54-1.954-.38-1.04.192-2.071.39-3.111.6l-.08.01c-.131-.02-.26-.06-.381-.08-1.52-.3-3.039-.58-4.558-.85-.14 2.152.02 4.394 2.14 5.385 2.171 1.013 4.542-.901 6.002-2.102z" />
        </svg>
    ),
    soundcloud: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M8.83 8.35c.03-.26.04-.51.04-.76 0-3.32-2.69-6.01-6.01-6.01C1.29 1.58.01 2.86.01 4.43c0 .54.15 1.05.41 1.49-.63.85-1.01 1.9-1.01 3.04 0 3.32 2.69 6.01 6.01 6.01h12.55c3.32 0 6.01-2.69 6.01-6.01s-2.69-6.01-6.01-6.01c-.34 0-.67.03-1.01.09-.99-1.69-2.8-2.83-4.88-2.83-2.96 0-5.41 2.3-5.63 5.21v.93z" transform="translate(0.000000, 4.000000)" />
        </svg>
    ),
    youtube_music: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.344c-4.053 0-7.344-3.291-7.344-7.344S7.947 4.656 12 4.656 19.344 7.947 19.344 12 19.344zm3.327-7.917l-4.707-2.717a.647.647 0 0 0-.969.563v5.432a.648.648 0 0 0 .969.563l4.707-2.716a.65.65 0 0 0 0-1.125z" />
        </svg>
    ),
    default: <Music className="w-3 h-3" />
};

const getPlatformStyle = (key: string) => {
    switch (key) {
        case 'spotify': return { bg: 'bg-[#1DB954]', text: 'text-white' };
        case 'apple': return { bg: 'bg-[#FA243C]', text: 'text-white' };
        case 'soundcloud': return { bg: 'bg-[#FF5500]', text: 'text-white' };
        case 'youtube_music': return { bg: 'bg-[#FF0000]', text: 'text-white' };
        default: return { bg: 'bg-slate-800', text: 'text-white' };
    }
};

interface AudioPreviewProps {
    data: any;
}

export function AudioPreview({ data }: AudioPreviewProps) {
    // Styles
    const styles = data?.styles || {};
    const primaryColor = styles.primary_color || '#E11D48';
    const secondaryColor = styles.secondary_color || '#FFE4E6';
    const gradientType = styles.gradient_type || 'linear';
    const gradientAngle = styles.gradient_angle || 135;

    // Normalize Data
    const audioData = {
        title: data.audio?.title || data.title || 'Track Title',
        description: data.audio?.description || data.description || 'Artist Name',
        cover_image: data.audio?.cover_image || data.cover_image || '',
        audio_url: data.audio?.audio_url || data.audio_url || '',
        allow_download: data.audio?.allow_download ?? true,
        streaming: data.audio?.streaming || data.streaming || {}
    };

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Audio Logic
    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setError(null);
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [audioData.audio_url]);

    const togglePlay = () => {
        if (!audioRef.current || !audioData.audio_url) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((e) => {
                    console.error("Playback error:", e);
                    setError("Cannot play file");
                    setIsPlaying(false);
                });
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !duration) return;
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        audioRef.current.currentTime = percent * duration;
        setCurrentTime(percent * duration);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;
    const hasStreaming = Object.values(audioData.streaming || {}).some(v => !!v);

    // Dynamic Background Style
    let backgroundStyle = {};
    if (gradientType === 'linear') {
        backgroundStyle = { background: `linear-gradient(${gradientAngle}deg, ${primaryColor}15 0%, #ffffff 100%)` };
    } else if (gradientType === 'radial') {
        backgroundStyle = { background: `radial-gradient(circle, ${primaryColor}15 0%, #ffffff 100%)` };
    } else if (gradientType === 'none') {
        backgroundStyle = { background: '#ffffff' };
    } else {
        backgroundStyle = { background: `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)` };
    }


    return (
        <div className="absolute inset-0 w-full h-full min-h-screen font-sans overflow-hidden bg-white text-slate-900 select-none" style={backgroundStyle}>
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Hidden Audio Element */}
            {audioData.audio_url && (
                <audio
                    ref={audioRef}
                    src={audioData.audio_url}
                    onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
                    onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => setError("Error loading audio")}
                />
            )}

            {/* --- Fixed Background Elements (Gummy Orbs OR Cover Blur) --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
                {audioData.cover_image ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-3xl opacity-30 transform scale-125 transition-all duration-1000"
                        style={{ backgroundImage: `url(${audioData.cover_image})` }}
                    />
                ) : (
                    <>
                        <div
                            className="absolute top-[-20%] left-[-20%] w-[120%] h-[60%] rounded-[100%] blur-3xl opacity-40 animate-pulse"
                            style={{ background: primaryColor }}
                        />
                        <div
                            className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[50%] rounded-[100%] blur-3xl opacity-30"
                            style={{ background: secondaryColor }}
                        />
                    </>
                )}
            </div>

            {/* --- Scrollable Content --- */}
            <div className="relative w-full h-full overflow-y-auto no-scrollbar flex flex-col z-10">
                {/* Spacer */}
                <div className="w-full flex-none pt-20" />

                {/* 1. Floating Header (Cover Art) */}
                <div className="flex-none flex flex-col justify-center items-center pb-8 px-6 text-center">
                    {/* Floating Squircle Container */}
                    <div className="relative group mb-8">
                        {/* Glow Behind */}
                        <div className={`absolute inset-0 rounded-[3rem] blur-2xl opacity-40 transition-opacity duration-500 scale-105 ${isPlaying ? 'opacity-60' : 'opacity-30'}`} style={{ backgroundColor: primaryColor }} />

                        {/* Squircle Image */}
                        <div className={`relative w-72 h-72 rounded-[3rem] shadow-2xl overflow-hidden border-4 border-white/40 ring-4 ring-black/5 bg-slate-800 transition-transform duration-700 ease-out rotate-2 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
                            {audioData.cover_image ? (
                                <img
                                    src={audioData.cover_image}
                                    alt="Cover"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white/20">
                                    <Disc className={`w-32 h-32 ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Meta Outside */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2 line-clamp-2">
                        {audioData.title}
                    </h1>
                    <p className="text-slate-500 text-lg font-medium uppercase tracking-wide">
                        {audioData.description}
                    </p>
                </div>

                {/* 2. Main Glass Card (Player Controls) */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full max-w-[320px] bg-white/60 backdrop-blur-3xl rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-5 py-6 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        {/* Progress Bar - tabular-nums */}
                        <div className="w-full mb-6 cursor-pointer pt-2" onClick={handleSeek}>
                            <div className="w-full h-2 bg-slate-200/50 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full rounded-full transition-all duration-100 ease-linear relative"
                                    style={{ width: `${progressPercent}%`, backgroundColor: primaryColor }}
                                />
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-bold tracking-wider tabular-nums">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls - No Hover Effects, Visible Labels */}
                        <div className="flex items-center justify-between px-2 mb-6">
                            <button
                                onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10 }}
                                className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-xl flex flex-col items-center min-w-[3rem]"
                            >
                                <Rewind size={26} className="fill-current mb-0.5" />
                                <span className="text-[10px] font-bold text-slate-500">-10s</span>
                            </button>

                            <button
                                onClick={togglePlay}
                                disabled={!audioData.audio_url}
                                className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white active:scale-95 transition-all shadow-xl shadow-blue-900/10"
                                style={{ backgroundColor: primaryColor }}
                            >
                                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                            </button>

                            <button
                                onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10 }}
                                className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-xl flex flex-col items-center min-w-[3rem]"
                            >
                                <FastForward size={26} className="fill-current mb-0.5" />
                                <span className="text-[10px] font-bold text-slate-500">+10s</span>
                            </button>
                        </div>

                        {/* Action Buttons Stack - No Hover Scale */}
                        <div className="space-y-3">
                            {audioData.allow_download && audioData.audio_url && (
                                <a
                                    href={audioData.audio_url}
                                    download={`${audioData.title}.mp3`}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100/80 hover:bg-slate-200/80 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-wide transition-all"
                                >
                                    <Download size={14} />
                                    <span>Download MP3</span>
                                </a>
                            )}

                            {hasStreaming && (
                                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100/50 mt-2">
                                    {Object.entries(audioData.streaming as Record<string, string>).map(([key, url]) => {
                                        if (!url) return null;
                                        const style = getPlatformStyle(key);
                                        const icon = PlatformIcons[key as keyof typeof PlatformIcons] || PlatformIcons.default;
                                        const label = key.replace('_', ' ');

                                        return (
                                            <a key={key} href={url} target="_blank" rel="noreferrer" className="flex items-center justify-center" title={label}>
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${style.bg} ${style.text}`}>
                                                    <div className="scale-125 flex items-center justify-center">
                                                        {icon}
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    })}
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
