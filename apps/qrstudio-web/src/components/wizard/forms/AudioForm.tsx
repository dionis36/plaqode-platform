import { useForm } from 'react-hook-form';
import { useWizardStore } from '../store';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Music, Palette, Image as ImageIcon, Link as LinkIcon, Mic, UploadCloud, Radio, Trash2 } from 'lucide-react';
import ColorPicker from '@/components/common/ColorPicker';
import { toast } from '@plaqode-platform/ui';

// Form Value Types
type FormValues = {
    // Design
    styles: {
        primary_color: string;
        secondary_color?: string;
        gradient_type?: 'none' | 'linear' | 'radial';
        gradient_angle?: number;
    };
    platform: 'audio';

    // Core Content
    audio: {
        title: string;
        description: string;
        cover_image: string;

        // Source
        source_type: 'file' | 'url';
        audio_url: string; // Final URL to play
        file_data?: string;
        file_name?: string;
        file_mime?: string;

        // Settings
        allow_download: boolean;

        // Distribution
        streaming: {
            spotify?: string;
            apple?: string;
            soundcloud?: string;
            youtube_music?: string;
        }
    };
};

// Accordion Component
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function AudioForm() {
    const { payload, updatePayload, editMode } = useWizardStore();
    const [isMounted, setIsMounted] = useState(false);
    const hasLoadedEditData = useRef(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Initial Sections State
    const [openSections, setOpenSections] = useState({
        design: true,
        content: false,
        source: false,
        streaming: false
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const { register, watch, setValue, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            styles: {
                primary_color: payload.styles?.primary_color || '#E11D48',
                secondary_color: payload.styles?.secondary_color || '#FFE4E6',
                gradient_type: payload.styles?.gradient_type || 'none',
                gradient_angle: payload.styles?.gradient_angle || 135
            },
            platform: 'audio',
            audio: {
                title: payload.audio?.title || '',
                description: payload.audio?.description || '',
                cover_image: payload.audio?.cover_image || '',
                source_type: payload.audio?.source_type || 'url',
                audio_url: payload.audio?.audio_url || '',
                file_data: payload.audio?.file_data || '',
                file_name: payload.audio?.file_name || '',
                allow_download: payload.audio?.allow_download ?? true,
                streaming: {
                    spotify: payload.audio?.streaming?.spotify || '',
                    apple: payload.audio?.streaming?.apple || '',
                    soundcloud: payload.audio?.streaming?.soundcloud || '',
                    youtube_music: payload.audio?.streaming?.youtube_music || '',
                }
            }
        },
        mode: 'onChange'
    });

    // Reset form ONCE when entering edit mode
    useEffect(() => {
        if (editMode && !hasLoadedEditData.current && payload.audio) {
            hasLoadedEditData.current = true;
            reset({
                styles: payload.styles,
                platform: 'audio',
                audio: payload.audio
            });
        }
    }, [editMode, payload, reset]);

    // Sync to Store
    useEffect(() => {
        const subscription = watch((value) => {
            updatePayload({
                styles: value.styles,
                audio: value.audio
            } as any);
        });
        return () => subscription.unsubscribe();
    }, [watch, updatePayload]);

    if (!isMounted) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h3 className="text-2xl font-bold text-slate-900">Create Audio QR</h3>
                <p className="text-slate-500 mt-1">Share a single track, podcast teaser, or voice guide.</p>
            </div>

            <div className="space-y-4">
                <AccordionSection
                    title="Design and customize"
                    subtitle="Choose your color scheme"
                    icon={Palette}
                    color="bg-purple-100 text-purple-600"
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
                                    <input type="hidden" {...register('styles.primary_color')} />
                                    <ColorPicker
                                        color={watch('styles.primary_color') || '#2563EB'}
                                        onChange={(v) => setValue('styles.primary_color', v, { shouldDirty: true, shouldTouch: true })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary color</label>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <input type="hidden" {...register('styles.secondary_color')} />
                                    <ColorPicker
                                        color={watch('styles.secondary_color') || '#DBEAFE'}
                                        onChange={(v) => setValue('styles.secondary_color', v, { shouldDirty: true, shouldTouch: true })}
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
                                        className="w-full"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </AccordionSection>

                {/* 2. Audio Info */}
                <AccordionSection
                    title="Audio Information"
                    subtitle="Title, description, and cover art"
                    icon={Music}
                    color="bg-purple-100 text-purple-600"
                    isOpen={openSections.content}
                    onToggle={() => toggleSection('content')}
                >
                    <div className="space-y-5 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Audio Title <span className="text-red-500">*</span></label>
                            <input
                                {...register('audio.title', { required: 'Title is required' })}
                                type="text"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.audio?.title ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-rose-500 outline-none`}
                                placeholder="My Audio"
                            />
                            {errors.audio?.title && <p className="text-xs text-red-500 mt-1">{errors.audio.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                            <input
                                {...register('audio.description')}
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 outline-none"
                                placeholder="e.g. A brief description about this audio"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Art <span className="text-red-500">*</span></label>

                            {!watch('audio.cover_image') ? (
                                <div
                                    onClick={() => document.getElementById('cover-upload')?.click()}
                                    className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-2xl p-6 text-center cursor-pointer transition-all group"
                                    style={{
                                        borderColor: '#cbd5e1', // default slate-300
                                        // Dynamic hover styles are tricky with inline styles, 
                                        // so we'll use a wrapper or rely on standard classes + inline color for the icon.
                                        // A better approach for "hover:border-primary" with dynamic color is using a styled component or raw CSS, 
                                        // but for simplicity, we'll just tint the ICON and the BG manually or keep it simple.
                                        // Let's stick to standard Tailwind for the container to avoid complexity, 
                                        // but color the ICON with the user's primary color.
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = watch('styles.primary_color');
                                        e.currentTarget.style.backgroundColor = `${watch('styles.primary_color')}10`; // 10 = low opacity hex
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#cbd5e1';
                                        e.currentTarget.style.backgroundColor = '#f8fafc'; // slate-50
                                    }}
                                >
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform">
                                        <ImageIcon size={20} style={{ color: watch('styles.primary_color') }} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 text-center">Upload Cover Art</p>
                                    <p className="text-xs text-slate-400 mt-1 text-center">Square (1:1) JPG/PNG (Max 5MB)</p>
                                    <input
                                        id="cover-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (file.size > 5 * 1024 * 1024) {
                                                    toast.error('Image too large. Max 5MB.');
                                                    return;
                                                }
                                                const reader = new FileReader();
                                                reader.onload = (ev) => {
                                                    setValue('audio.cover_image', ev.target?.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="relative group w-32 h-32 mx-auto sm:mx-0">
                                    <img
                                        src={watch('audio.cover_image')}
                                        alt="Cover"
                                        className="w-full h-full object-cover rounded-xl shadow-md border border-slate-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setValue('audio.cover_image', '')}
                                        className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1.5 shadow-lg hover:bg-red-50 transition-colors border border-slate-100"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </AccordionSection>

                {/* 3. Audio Source */}
                <AccordionSection
                    title="Audio File"
                    subtitle="Upload your audio"
                    icon={UploadCloud}
                    color="bg-cyan-100 text-cyan-600"
                    isOpen={openSections.source}
                    onToggle={() => toggleSection('source')}
                >
                    <div className="space-y-4 mt-4">
                        <div className="space-y-6 mt-4">
                            {/* 1. Direct URL Input */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-slate-700">Direct Audio URL <span className="text-slate-400 font-normal">(Optional)</span></label>
                                </div>
                                <div className="flex relative items-center">
                                    <div className="absolute left-0 pl-4 text-slate-400">
                                        <LinkIcon size={18} />
                                    </div>
                                    <input
                                        {...register('audio.audio_url')}
                                        type="text"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                        placeholder="https://website.com/audio.mp3"
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Paste a link to a hosted MP3, WAV, or AAC file.</p>
                            </div>

                            {/* 2. Disabled Upload Area */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Audio File</label>
                                <div
                                    onClick={() => toast.info('Audio uploads are briefly paused for upgrades. Please use a direct link or streaming platforms.', { duration: 4000 })}
                                    className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl p-6 text-center cursor-not-allowed opacity-75 relative overflow-hidden transition-colors hover:bg-slate-100"
                                >
                                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <UploadCloud size={24} />
                                    </div>
                                    <h5 className="text-sm font-bold text-slate-500">Upload audio from your device</h5>

                                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                        <span>🚧</span> Feature Coming Soon
                                    </div>

                                    <p className="text-xs text-slate-400 mt-3 leading-relaxed max-w-xs mx-auto">
                                        We're upgrading our storage infrastructure.<br />
                                        Please use a <strong>Direct URL</strong> or <strong>Streaming Links</strong> below.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${watch('audio.allow_download') ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`}>
                                    {watch('audio.allow_download') && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                                <input
                                    type="checkbox"
                                    {...register('audio.allow_download')}
                                    className="hidden"
                                />
                                <span className="text-sm font-medium text-slate-700 group-hover:text-black">Allow listeners to download file</span>
                            </label>
                        </div>
                    </div>
                </AccordionSection>

                {/* 4. Streaming Platforms */}
                <AccordionSection
                    title="Listen On..."
                    subtitle="Links to Spotify, Apple, etc."
                    icon={Radio}
                    color="bg-green-100 text-green-600"
                    isOpen={openSections.streaming}
                    onToggle={() => toggleSection('streaming')}
                >
                    <div className="space-y-5 mt-4">
                        {[
                            { id: 'spotify', label: 'Spotify', color: 'text-green-600' },
                            { id: 'apple', label: 'Apple Music', color: 'text-rose-500' },
                            { id: 'soundcloud', label: 'SoundCloud', color: 'text-orange-600' },
                            { id: 'youtube_music', label: 'YouTube Music', color: 'text-red-600' },
                        ].map((platform) => (
                            <div key={platform.id}>
                                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${platform.color}`}>{platform.label} URL</label>
                                <div className="relative">
                                    <input
                                        {...register(`audio.streaming.${platform.id}` as any)}
                                        type="text"
                                        className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-slate-300"
                                        placeholder={`https://${platform.id === 'apple' ? 'music.apple.com' : platform.id + '.com'}/...`}
                                    />
                                    {watch(`audio.streaming.${platform.id}` as any) && (
                                        <button
                                            type="button"
                                            onClick={() => setValue(`audio.streaming.${platform.id}` as any, '')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}
