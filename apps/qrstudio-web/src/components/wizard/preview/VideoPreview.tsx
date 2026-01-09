import { Share2, ThumbsUp, MessageCircle, Play } from 'lucide-react';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';

interface VideoPreviewProps {
    data: any;
}

export function VideoPreview({ data }: VideoPreviewProps) {
    const primaryColor = data.styles?.primary_color || '#FF0000';

    const videoData = data.video || {
        title: 'Video Title',
        description: 'Watch the full video below.',
        video_url: ''
    };

    // Client-side only rendering for ReactPlayer to avoid hydration mismatch
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <div className="h-full w-full bg-white flex flex-col relative overflow-hidden font-sans text-slate-900 scrollbar-hide overflow-y-auto">

            {/* Header / Brand Area */}
            <div className="w-full px-6 pt-12 pb-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: primaryColor }}>
                        <Play size={16} fill="currentColor" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">WatchNow</span>
                </div>
                <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                    <Share2 size={18} className="text-slate-600" />
                </button>
            </div>

            {/* Video Player Container */}
            <div className="w-full aspect-video bg-black relative group">
                {videoData.video_url ? (
                    // Cast to any to avoid type issues with missing @types/react-player
                    <div className="w-full h-full">
                        {(ReactPlayer as any) && (
                            <ReactPlayer
                                url={videoData.video_url}
                                width="100%"
                                height="100%"
                                controls
                                light={false}
                                playing={false}
                            />
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/50 bg-slate-900">
                        <Play size={48} className="mb-2 opacity-50" />
                        <span className="text-sm font-medium">No Video URL</span>
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="p-6">
                <h1 className="text-xl font-bold leading-tight mb-2 text-slate-900">
                    {videoData.title || 'Video Title'}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-6">
                    <span>1.2K views</span>
                    <span>•</span>
                    <span>2 hours ago</span>
                </div>

                <div className="flex gap-2 mb-6 border-b border-slate-100 pb-6">
                    <button className="flex-1 py-2 rounded-full bg-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors">
                        <ThumbsUp size={14} /> Like
                    </button>
                    <button className="flex-1 py-2 rounded-full bg-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors">
                        <MessageCircle size={14} /> Comment
                    </button>
                    <button className="flex-1 py-2 rounded-full flex items-center justify-center gap-2 text-xs font-bold text-white transition-opacity hover:opacity-90 shadow-md shadow-blue-500/20" style={{ backgroundColor: primaryColor }}>
                        <Share2 size={14} /> Share
                    </button>
                </div>

                <div className="prose prose-sm max-w-none">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Description</h3>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {videoData.description || 'Video description will appear here.'}
                    </p>
                </div>
            </div>

            <div className="mt-auto py-6 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400 font-medium">Powered by Plaqode</p>
            </div>
        </div>
    );
}
