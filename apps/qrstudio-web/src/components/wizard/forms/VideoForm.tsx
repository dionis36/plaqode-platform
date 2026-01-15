import { useForm, useFieldArray } from 'react-hook-form';
import { useWizardStore } from '../store';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Video, Palette, Youtube, Link as LinkIcon, Type, Trash2, GripVertical } from 'lucide-react';

// Form Value Types
type VideoItem = {
    id: string; // Unique ID for keying
    source_type: 'file' | 'url';
    url: string; // URL or Base64
    file_name?: string;
    title: string;
    description: string;
    thumbnail?: string;
};

type ButtonItem = {
    id: string;
    label: string;
    url: string;
};

type FormValues = {
    // Design
    styles: {
        primary_color: string;
        secondary_color?: string;
        gradient_type?: 'none' | 'linear' | 'radial';
        gradient_angle?: number;
    };
    platform: 'video';

    // Page Info
    video: {
        page_title: string;
        page_description: string;
        share_button: boolean;

        buttons: ButtonItem[];
        videos: VideoItem[];
    };
};

// Accordion Component (Reused)
function AccordionSection({
    title,
    subtitle,
    icon: Icon,
    color,
    isOpen,
    onToggle,
    children
}: {
    title: string;
    subtitle: string;
    icon: any;
    color: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
                type="button"
                onClick={onToggle}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between hover:bg-slate-50 transition-colors min-h-[60px]"
            >
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-3 sm:p-4 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                        {isMounted && <Icon className="w-5 h-5 sm:w-7 sm:h-7" />}
                    </div>
                    <div className="text-left">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{title}</h3>
                        <p className="text-xs sm:text-sm text-slate-500">{subtitle}</p>
                    </div>
                </div>
                {isMounted && (
                    <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Helper to generate video thumbnail
export const generateVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(file);
        video.muted = true;
        video.playsInline = true;
        video.currentTime = 1; // Seek to 1s

        video.onloadeddata = () => {
            // Wait for seek if needed, but often enough for metadata
        };

        video.onseeked = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 640;
                canvas.height = video.videoHeight || 360;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(dataUrl);
                } else {
                    resolve('');
                }
            } catch (e) {
                console.error('Canvas error', e);
                resolve('');
            } finally {
                // Cleanup
                // URL.revokeObjectURL(video.src); // Keep for now as we might be using it, but actually we created a new one just for this.
                // It is safer to let the main flow handle the source URL or just revoke this specific one if it was unique?
                // `URL.createObjectURL(file)` creates a new one each time. So we SHOULD revoke this specific one.
                URL.revokeObjectURL(video.src);
                video.remove();
            }
        };

        video.onerror = () => {
            resolve('');
        };
    });
};

export function VideoForm() {
    const { payload, updatePayload, editMode } = useWizardStore();
    const [isMounted, setIsMounted] = useState(false);
    const hasLoadedEditData = useRef(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [openSections, setOpenSections] = useState({
        design: true,
        pageInfo: false,
        videos: false
    });

    const { register, control, watch, setValue, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            styles: payload.styles || { primary_color: '#FF0000', secondary_color: '#FFF1F2' },
            platform: 'video',
            video: {
                page_title: payload.video?.page_title || 'My Video Playlist',
                page_description: payload.video?.page_description || 'Check out these videos!',
                share_button: payload.video?.share_button ?? true,
                buttons: payload.video?.buttons || [],
                videos: payload.video?.videos || []
            }
        },
        mode: 'onChange'
    });

    // Array Fields
    const { fields: videoFields, append: appendVideo, remove: removeVideo, move: moveVideo } = useFieldArray({
        control,
        name: "video.videos"
    });



    const fetchVideoMetadata = async (url: string) => {
        let title = 'New Video';
        let thumbnail = '';

        // Robust YouTube Regex
        const ytRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const ytMatch = url.match(ytRegex);

        if (ytMatch && ytMatch[2].length === 11) {
            const videoId = ytMatch[2];
            thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

            try {
                // Try noembed for title
                const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                if (data.title) title = data.title;
            } catch (e) {
                console.error("Failed to fetch youtube oembed", e);
            }
        } else if (url.includes('vimeo.com')) {
            // Basic Vimeo support
            try {
                const response = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                if (data.title) title = data.title;
                if (data.thumbnail_url) thumbnail = data.thumbnail_url;
            } catch (e) {
                console.error("Failed to fetch vimeo oembed", e);
            }
        }

        return { title, thumbnail };
    };

    // Sync from Store
    useEffect(() => {
        if (editMode && !hasLoadedEditData.current && payload.video) {
            hasLoadedEditData.current = true;
            // Handle legacy single-video data migration if needed
            const isLegacy = !payload.video.videos && payload.video.video_url;

            const initialVideos = isLegacy ? [{
                id: 'legacy-1',
                source_type: payload.video.source_type || 'url',
                url: payload.video.video_url,
                title: payload.video.title,
                description: payload.video.description,
                thumbnail: payload.video.thumbnail || ''
            }] : (payload.video.videos || []);

            reset({
                styles: payload.styles,
                platform: 'video',
                video: {
                    page_title: payload.video.page_title || payload.video.title || 'My Videos',
                    page_description: payload.video.page_description || payload.video.description || '',
                    share_button: payload.video.share_button ?? true,
                    buttons: payload.video.buttons || [],
                    videos: initialVideos
                }
            });
        }
    }, [editMode, payload, reset]);

    // Sync to Store
    useEffect(() => {
        const subscription = watch((value) => {
            updatePayload({
                styles: value.styles,
                video: value.video
            } as any);
        });
        return () => subscription.unsubscribe();
    }, [watch, updatePayload]);

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h3 className="text-2xl font-bold text-slate-900">Create your Video Playlist</h3>
                <p className="text-slate-500 mt-1">Share multiple videos on a custom landing page.</p>
            </div>

            <div className="space-y-4">
                {/* 1. Design */}
                <AccordionSection
                    title="Design and customize"
                    subtitle="Colors and Branding"
                    icon={Palette}
                    color="bg-red-100 text-red-600"
                    isOpen={openSections.design}
                    onToggle={() => toggleSection('design')}
                >
                    <div className="space-y-6 mt-4 min-w-0">
                        {/* Color Palette Presets */}
                        <div className='w-full max-w-full overflow-hidden min-w-0'>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Color Presets</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 max-w-full" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
                                {[
                                    { primary: '#2563EB', secondary: '#EFF6FF', name: 'Classic Blue' },
                                    { primary: '#1F2937', secondary: '#F3F4F6', name: 'Elegant Black' },
                                    { primary: '#059669', secondary: '#ECFDF5', name: 'Fresh Green' },
                                    { primary: '#DC2626', secondary: '#FEF2F2', name: 'Bold Red' },
                                    { primary: '#7C3AED', secondary: '#FAF5FF', name: 'Royal Purple' },
                                    { primary: '#EA580C', secondary: '#FFF7ED', name: 'Warm Orange' },
                                    { primary: '#0891B2', secondary: '#F0FDFA', name: 'Ocean Teal' },
                                    { primary: '#BE123C', secondary: '#FFF1F2', name: 'Wine Red' },
                                    { primary: '#EC4899', secondary: '#FCE7F3', name: 'Hot Pink' },

                                ].map((palette, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            setValue('styles.primary_color', palette.primary);
                                            setValue('styles.secondary_color', palette.secondary);
                                        }}
                                        className="h-10 w-16 flex-shrink-0 rounded-lg border-2 border-slate-200 hover:border-blue-400 transition-all hover:scale-105 shadow-sm overflow-hidden"
                                        style={{ background: `linear-gradient(to right, ${palette.primary} 50%, ${palette.secondary} 50%)` }}
                                        title={palette.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Custom Colors */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Primary color</label>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <input
                                        type="color"
                                        value={watch('styles.primary_color') || '#2563EB'}
                                        onChange={(e) => setValue('styles.primary_color', e.target.value)}
                                        className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer flex-shrink-0"
                                    />
                                    <input
                                        type="text"
                                        value={watch('styles.primary_color') || '#2563EB'}
                                        onChange={(e) => setValue('styles.primary_color', e.target.value)}
                                        className="flex-1 px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm uppercase min-h-[44px]"
                                        placeholder="#2563EB"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary color</label>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <input
                                        type="color"
                                        value={watch('styles.secondary_color') || '#EFF6FF'}
                                        onChange={(e) => setValue('styles.secondary_color', e.target.value)}
                                        className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer flex-shrink-0"
                                    />
                                    <input
                                        type="text"
                                        value={watch('styles.secondary_color') || '#EFF6FF'}
                                        onChange={(e) => setValue('styles.secondary_color', e.target.value)}
                                        className="flex-1 px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm uppercase min-h-[44px]"
                                        placeholder="#EFF6FF"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gradient Controls */}
                        <div className="space-y-4 pt-4 border-t border-slate-200">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Background Style</label>
                                <select
                                    {...register('styles.gradient_type')}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="none">Solid Color</option>
                                    <option value="linear">Linear Gradient</option>
                                    <option value="radial">Radial Gradient</option>
                                </select>
                            </div>

                            {watch('styles.gradient_type') === 'linear' && (
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Gradient Angle: {watch('styles.gradient_angle') || 135}°
                                    </label>
                                    <input
                                        {...register('styles.gradient_angle')}
                                        type="range"
                                        min="0"
                                        max="360"
                                        step="45"
                                        defaultValue="135"
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>0°</span>
                                        <span>90°</span>
                                        <span>180°</span>
                                        <span>270°</span>
                                        <span>360°</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </AccordionSection>

                {/* 2. Page Info */}
                <AccordionSection
                    title="Landing Page Info"
                    subtitle="Title, description, and custom buttons"
                    icon={Type}
                    color="bg-indigo-100 text-indigo-600"
                    isOpen={openSections.pageInfo}
                    onToggle={() => toggleSection('pageInfo')}
                >
                    <div className="space-y-5 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Page Title</label>
                            <input
                                {...register('video.page_title')}
                                type="text"
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="e.g., My Top Hits"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                            <textarea
                                {...register('video.page_description')}
                                rows={3}
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base resize-none"
                                placeholder="Welcome to my video page..."
                            />
                        </div>


                    </div>
                </AccordionSection>

                {/* 3. Videos */}
                <AccordionSection
                    title="Videos"
                    subtitle="Manage your playlist"
                    icon={Video}
                    color="bg-emerald-100 text-emerald-600"
                    isOpen={openSections.videos}
                    onToggle={() => toggleSection('videos')}
                >
                    <div className="space-y-6 mt-4">

                        {/* Add Video Section */}
                        <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                            <h4 className="text-sm font-bold text-slate-800">Add a Video</h4>

                            {/* URL Input */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Video URL (YouTube, Vimeo)</label>
                                <div className="flex gap-2">
                                    <input
                                        id="new-video-url"
                                        type="text"
                                        placeholder="https://youtube.com/watch?v=..."
                                        className="flex-1 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                        onKeyDown={async (e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const input = e.currentTarget;
                                                const url = input.value;
                                                if (url) {
                                                    const { title, thumbnail } = await fetchVideoMetadata(url);
                                                    appendVideo({
                                                        id: crypto.randomUUID(),
                                                        source_type: 'url',
                                                        url: url,
                                                        title: title,
                                                        description: '',
                                                        thumbnail: thumbnail
                                                    });
                                                    input.value = '';
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            const input = document.getElementById('new-video-url') as HTMLInputElement;
                                            const url = input.value;
                                            if (url) {
                                                const { title, thumbnail } = await fetchVideoMetadata(url);
                                                appendVideo({
                                                    id: crypto.randomUUID(),
                                                    source_type: 'url',
                                                    url: url,
                                                    title: title,
                                                    description: '',
                                                    thumbnail: thumbnail
                                                });
                                                input.value = '';
                                            }
                                        }}
                                        className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors text-sm"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-slate-50 px-2 text-slate-400 font-medium">Or upload file</span>
                                </div>
                            </div>

                            {/* Upload Area */}
                            <div
                                onClick={() => document.getElementById('video-upload-main')?.click()}
                                className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-50 rounded-xl p-6 text-center cursor-pointer transition-all group"
                            >
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <Video size={24} />
                                </div>
                                <h5 className="text-sm font-bold text-slate-700">Upload video from your device</h5>
                                <p className="text-xs text-slate-500 mt-1">Maximum size: 15 MB (Direct Upload)</p>
                                <input
                                    id="video-upload-main"
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            // 15MB Limit (Safe for Base64 JSON payloads)
                                            const MAX_SIZE = 15 * 1024 * 1024;
                                            if (file.size > MAX_SIZE) {
                                                alert('File too large. maximum 15MB allowed for direct uploads. Please use YouTube/Vimeo for larger videos.');
                                                return;
                                            }

                                            // Convert to Base64 for persistence
                                            const reader = new FileReader();
                                            reader.onload = async (event) => {
                                                const base64Url = event.target?.result as string;

                                                // Generate Thumbnail
                                                let thumbnail = '';
                                                try {
                                                    thumbnail = await generateVideoThumbnail(file);
                                                } catch (err) {
                                                    console.error("Thumbnail generation failed", err);
                                                }

                                                appendVideo({
                                                    id: crypto.randomUUID(),
                                                    source_type: 'file',
                                                    url: base64Url, // Store Base64
                                                    file_name: file.name,
                                                    title: file.name.split('.')[0],
                                                    description: '',
                                                    thumbnail: thumbnail
                                                });
                                            };
                                            reader.readAsDataURL(file);

                                            e.target.value = ''; // Reset
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Video List */}
                        <div className="space-y-4">
                            {videoFields.map((field, index) => {
                                const isFile = watch(`video.videos.${index}.source_type`) === 'file';
                                const url = watch(`video.videos.${index}.url`);
                                const thumbnail = watch(`video.videos.${index}.thumbnail`);

                                return (
                                    <div key={field.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start group">
                                        {/* Thumbnail / Icon Area */}
                                        <div className="w-24 h-16 sm:w-32 sm:h-20 bg-black rounded-lg overflow-hidden flex-shrink-0 relative">
                                            {thumbnail ? (
                                                <img src={thumbnail} alt="Video Thumbnail" className="w-full h-full object-cover" />
                                            ) : isFile ? (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white">
                                                    <Video size={20} className="mb-1 opacity-70" />
                                                    <span className="text-[10px] opacity-50 uppercase font-bold">File</span>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-red-600 text-white">
                                                    <Youtube size={24} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Fields */}
                                        <div className="flex-1 min-w-0 space-y-3">
                                            {/* Hidden Inputs for data persistence */}
                                            <input type="hidden" {...register(`video.videos.${index}.id` as const)} />

                                            {/* Source Input */}
                                            {watch(`video.videos.${index}.source_type`) === 'file' ? (
                                                <div className="space-y-2">
                                                    <input
                                                        type="file"
                                                        accept="video/*"
                                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                if (file.size > 15 * 1024 * 1024) return alert('Max 15MB allowed for direct uploads.');

                                                                const blobUrl = URL.createObjectURL(file);
                                                                setValue(`video.videos.${index}.url`, blobUrl);
                                                                setValue(`video.videos.${index}.file_name`, file.name);

                                                                try {
                                                                    const thumb = await generateVideoThumbnail(file);
                                                                    setValue(`video.videos.${index}.thumbnail`, thumb);
                                                                } catch (err) {
                                                                    console.error("Thumbnail failed", err);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    {watch(`video.videos.${index}.file_name`) && (
                                                        <p className="text-xs text-green-600">Selected: {watch(`video.videos.${index}.file_name`)}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <span className="p-3 bg-white border border-slate-300 border-r-0 rounded-l-lg text-slate-400 flex items-center">
                                                        <LinkIcon size={18} />
                                                    </span>
                                                    <input
                                                        {...register(`video.videos.${index}.url` as const)}
                                                        type="text"
                                                        placeholder="https://youtube.com/..."
                                                        className="flex-1 px-3 sm:px-4 py-3 border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                                    />
                                                </div>
                                            )}

                                            {/* Meta */}
                                            <div className="grid grid-cols-1 gap-3">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Title <span className="text-red-500">*</span></label>
                                                    <input
                                                        {...register(`video.videos.${index}.title` as const, { required: true })}
                                                        placeholder="Video Title"
                                                        className={`w-full px-3 sm:px-4 py-3 border ${errors.video?.videos?.[index]?.title ? 'border-red-300' : 'border-slate-300'} rounded-lg text-base focus:ring-2 focus:ring-blue-500 outline-none min-h-[44px]`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                                                    <textarea
                                                        {...register(`video.videos.${index}.description` as const)}
                                                        rows={2}
                                                        placeholder="Short description..."
                                                        className="w-full px-3 sm:px-4 py-3 border border-slate-300 rounded-lg text-base resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2">
                                            <button
                                                type="button"
                                                onClick={() => removeVideo(index)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                            <div className="p-2 text-slate-300 cursor-grab hover:text-slate-500">
                                                <GripVertical size={20} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {videoFields.length === 0 && (
                                <p className="text-center text-sm text-slate-500 py-4 italic">
                                    No videos added yet. Add one above.
                                </p>
                            )}
                        </div>
                    </div>
                </AccordionSection>
            </div>
        </div>
    );

}
