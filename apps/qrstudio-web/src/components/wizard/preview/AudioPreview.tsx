import { Play, Pause, SkipBack, SkipForward, Volume2, Share2, MoreHorizontal, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface AudioPreviewProps {
    data: any;
}

export function AudioPreview({ data }: AudioPreviewProps) {
    const primaryColor = data.styles?.primary_color || '#E11D48';

    const audioData = data.audio || {
        title: 'My Track',
        description: 'Original Mix',
        audio_url: '',
        cover_image: ''
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

    const handleError = () => {
        setError("Error loading audio");
        setIsPlaying(false);
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

    return (
        <div className="h-full w-full bg-slate-900 flex flex-col relative overflow-hidden font-sans text-white">

            {/* Hidden Audio Element */}
            {audioData.audio_url && (
                <audio
                    ref={audioRef}
                    src={audioData.audio_url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    onError={handleError}
                />
            )}

            {/* Background Blur Effect */}
            <div className="absolute inset-0 z-0 opacity-40">
                {audioData.cover_image ? (
                    <div
                        className="w-full h-full bg-cover bg-center blur-2xl transform scale-125 transition-all duration-700"
                        style={{ backgroundImage: `url(${audioData.cover_image})` }}
                    />
                ) : (
                    <div
                        className="w-full h-full opacity-60"
                        style={{ background: `linear-gradient(45deg, ${primaryColor}, #000)` }}
                    />
                )}
            </div>

            <div className="relative z-10 h-full flex flex-col p-6">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8">
                    <button className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Album Art */}
                <div className="w-full aspect-square rounded-2xl shadow-2xl overflow-hidden mb-8 border border-white/10 relative group bg-black/50">
                    {audioData.cover_image ? (
                        <img
                            src={audioData.cover_image}
                            alt="Cover"
                            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900"
                            style={{
                                background: `linear-gradient(135deg, ${primaryColor}20 0%, ${primaryColor}60 100%)`
                            }}
                        >
                            <svg className={`w-24 h-24 text-white/20 ${isPlaying ? 'animate-pulse' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                        </div>
                    )}

                    {error && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm">
                            <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
                            <p className="text-sm font-medium text-white/90">{error}</p>
                            <p className="text-xs text-white/50 mt-1">Check URL</p>
                        </div>
                    )}
                </div>

                {/* Track Info */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold leading-tight mb-1 truncate">
                        {audioData.title || 'Track Title'}
                    </h2>
                    <p className="text-white/60 text-lg truncate">
                        {audioData.description || 'Artist Name'}
                    </p>
                </div>

                {/* Progress Bar */}
                <div
                    className="w-full mb-8 group cursor-pointer py-2" // Added padding for easier clicking
                    onClick={handleSeek}
                >
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden relative">
                        <div
                            className="h-full rounded-full transition-all duration-100 ease-linear relative"
                            style={{ width: `${progressPercent}%`, backgroundColor: primaryColor }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-white/40 mt-2 font-medium font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-auto">
                    <button className="text-white/60 hover:text-white transition-colors">
                        <Volume2 className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-6">
                        <button
                            className="text-white hover:scale-110 transition-transform disabled:opacity-50"
                            onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10; }}
                            disabled={!duration}
                        >
                            <SkipBack className="w-8 h-8 fill-current" />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: primaryColor }}
                            disabled={!audioData.audio_url || !!error}
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6 text-white fill-current" />
                            ) : (
                                <Play className="w-6 h-6 text-white fill-current ml-1" />
                            )}
                        </button>

                        <button
                            className="text-white hover:scale-110 transition-transform disabled:opacity-50"
                            onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10; }}
                            disabled={!duration}
                        >
                            <SkipForward className="w-8 h-8 fill-current" />
                        </button>
                    </div>

                    <button className="text-white/60 hover:text-white transition-colors cursor-not-allowed opacity-50">
                        {/* Placeholder for loop/shuffle or menu */}
                        <div className="w-6 h-6" />
                    </button>
                </div>

                <div className="py-4 text-xs text-white/30 font-medium text-center">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
