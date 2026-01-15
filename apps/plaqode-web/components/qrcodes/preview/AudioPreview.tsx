import { Play, Pause, SkipBack, SkipForward, Volume2, Share2, MoreHorizontal, AlertCircle, Download, Music, ExternalLink } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface AudioPreviewProps {
    data: any;
}

export function AudioPreview({ data }: AudioPreviewProps) {
    const primaryColor = data.styles?.primary_color || '#E11D48';

    // Construct audio data with defaults
    // Note: Public viewer data structure might be slightly different depending on how payload is unwrapped
    const audioData = {
        title: data.audio?.title || data.title || 'Track Title',
        description: data.audio?.description || data.description || 'Artist Name',
        audio_url: data.audio?.audio_url || data.audio_url || '',
        cover_image: data.audio?.cover_image || data.cover_image || '',
        source_type: data.audio?.source_type || data.source_type || 'url',
        allow_download: data.audio?.allow_download ?? data.allow_download ?? true,
        streaming: data.audio?.streaming || data.streaming || {}
    };

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Reset state when URL changes
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
                    setError("Cannot play this file");
                    setIsPlaying(false);
                });
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setError(null);
        }
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

    const handleDownload = () => {
        if (!audioData.audio_url) return;
        const link = document.createElement('a');
        link.href = audioData.audio_url;
        link.download = `${audioData.title || 'audio'}.mp3`; // Naive extension assumption
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    // Helper to check if any streaming links exist
    const hasStreamingLinks = Object.values(audioData.streaming || {}).some(link => !!link);

    // Platform Icons (Simplified mapping)
    const getPlatformIcon = (key: string) => {
        switch (key) {
            case 'spotify': return { label: 'Spotify', color: 'bg-green-500' };
            case 'apple': return { label: 'Apple Music', color: 'bg-red-500' };
            case 'soundcloud': return { label: 'SoundCloud', color: 'bg-orange-500' };
            case 'youtube_music': return { label: 'YouTube', color: 'bg-red-600' };
            default: return { label: key, color: 'bg-slate-500' };
        }
    };

    return (
        <div className="h-full w-full bg-slate-900 flex flex-col relative overflow-hidden font-sans text-slate-800">

            {/* Hidden Audio Element */}
            {audioData.audio_url && (
                <audio
                    ref={audioRef}
                    src={audioData.audio_url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => setError("Error loading audio")}
                />
            )}

            {/* Background Blur Effect */}
            <div className="absolute inset-0 z-0">
                {audioData.cover_image ? (
                    <div
                        className="w-full h-full bg-cover bg-center blur-3xl opacity-60 transform scale-125"
                        style={{ backgroundImage: `url(${audioData.cover_image})` }}
                    />
                ) : (
                    <div
                        className="w-full h-full opacity-60"
                        style={{ background: `linear-gradient(135deg, ${primaryColor}, #0f172a)` }}
                    />
                )}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
            </div>

            {/* Main Content Container - Glass Card */}
            <div className="relative z-10 w-full h-full overflow-y-auto scrollbar-hide p-6 flex flex-col items-center">

                <div className="w-full max-w-sm bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 p-6 flex flex-col items-center mt-4 mb-20">

                    {/* Header Controls */}
                    <div className="w-full flex justify-between items-center mb-6">
                        <button className="p-2 rounded-full bg-slate-200/50 hover:bg-white transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-slate-600" />
                        </button>
                        <button className="p-2 rounded-full bg-slate-200/50 hover:bg-white transition-colors">
                            <Share2 className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>

                    {/* Album Art */}
                    <div className="relative w-64 h-64 rounded-2xl shadow-xl overflow-hidden mb-8 group bg-slate-100">
                        {audioData.cover_image ? (
                            <img
                                src={audioData.cover_image}
                                alt="Cover"
                                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center text-white/50"
                                style={{ background: `linear-gradient(135deg, ${primaryColor}, #000)` }}
                            >
                                <Music className="w-24 h-24 opacity-50" />
                            </div>
                        )}
                    </div>

                    {/* Track Info */}
                    <div className="text-center mb-8 w-full">
                        <h2 className="text-2xl font-bold text-slate-900 mb-1 truncate px-2">{audioData.title}</h2>
                        <p className="text-slate-500 font-medium truncate px-2">{audioData.description}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full mb-8 group cursor-pointer" onClick={handleSeek}>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden relative">
                            <div
                                className="h-full rounded-full transition-all duration-100 ease-linear relative"
                                style={{ width: `${progressPercent}%`, backgroundColor: primaryColor }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform border border-slate-100" />
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono font-medium">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Main Controls */}
                    <div className="flex items-center justify-between w-full mb-8 px-4">
                        <button
                            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                            onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10; }}
                        >
                            <SkipBack className="w-8 h-8 fill-current" />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl shadow-slate-300 text-white hover:scale-105 active:scale-95 transition-all"
                            style={{ backgroundColor: primaryColor }}
                            disabled={!audioData.audio_url}
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 fill-current" />
                            ) : (
                                <Play className="w-8 h-8 fill-current ml-1" />
                            )}
                        </button>

                        <button
                            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                            onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10; }}
                        >
                            <SkipForward className="w-8 h-8 fill-current" />
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        {/* Download Button */}
                        {audioData.allow_download && (
                            <button
                                onClick={handleDownload}
                                className="col-span-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Download Audio
                            </button>
                        )}

                        {/* Streaming Links */}
                        {hasStreamingLinks && (
                            <div className="col-span-2 space-y-3 mt-4 w-full">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Listen on</p>
                                {Object.entries(audioData.streaming as Record<string, string>).map(([platform, url]) => {
                                    if (!url) return null;
                                    const info = getPlatformIcon(platform);
                                    return (
                                        <a
                                            key={platform}
                                            href={url.startsWith('http') ? url : `https://${url}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-between w-full p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg ${info.color} flex items-center justify-center text-white`}>
                                                    <Music className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-slate-700 text-sm">{info.label}</span>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>

                <div className="mt-auto py-6">
                    <p className="text-xs text-white/50 font-medium">Powered by Plaqode</p>
                </div>
            </div>
        </div>
    );
}
