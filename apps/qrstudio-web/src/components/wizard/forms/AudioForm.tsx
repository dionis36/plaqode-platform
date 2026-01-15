import { useForm } from 'react-hook-form';
import { useWizardStore } from '../store';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Music, Palette, Image as ImageIcon, Link as LinkIcon, Mic } from 'lucide-react';

// Form Value Types
type FormValues = {
    // Design & Customize
    styles: {
        primary_color: string;
        secondary_color?: string;
        gradient_type?: 'none' | 'linear' | 'radial';
        gradient_angle?: number;
    };

    platform: 'audio';

    // Content
    title: string;
    description: string;
    audio_url: string;
    cover_image?: string;

    // New Fields
    audio: {
        source_type: 'file' | 'url';
        file_data?: string;
        file_name?: string;
        file_mime?: string;
        allow_download: boolean;
        streaming?: {
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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
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

            {/* Content */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Main Sections State
    const [openSections, setOpenSections] = useState({
        design: true,
        content: false,
        file: false
    });

    // Track if we've already loaded edit data
    const hasLoadedEditData = useRef(false);

    const { register, watch, setValue, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            styles: {
                primary_color: payload.styles?.primary_color || '#E11D48',
                secondary_color: payload.styles?.secondary_color || '#FFE4E6',
                gradient_type: payload.styles?.gradient_type || 'none',
                gradient_angle: payload.styles?.gradient_angle || 135
            },
            platform: 'audio',

            title: payload.audio?.title || 'My Track',
            description: payload.audio?.description || 'Original Mix',
            audio_url: payload.audio?.audio_url || '',
            cover_image: payload.audio?.cover_image || '',

            // New Defaults
            'audio.source_type': payload.audio?.source_type || 'url',
            'audio.file_data': payload.audio?.file_data || '',
            'audio.file_name': payload.audio?.file_name || '',
            'audio.allow_download': payload.audio?.allow_download ?? true,
            'audio.streaming.spotify': payload.audio?.streaming?.spotify || '',
            'audio.streaming.apple': payload.audio?.streaming?.apple || '',
            'audio.streaming.soundcloud': payload.audio?.streaming?.soundcloud || '',
            'audio.streaming.youtube_music': payload.audio?.streaming?.youtube_music || '',
        },
        mode: 'onChange'
    });

    // Reset form ONCE when entering edit mode with loaded data
    useEffect(() => {
        if (editMode && !hasLoadedEditData.current && payload.audio) {
            hasLoadedEditData.current = true;
            reset({
                styles: payload.styles || { primary_color: '#E11D48', secondary_color: '#FFE4E6' },
                platform: 'audio',
                title: payload.audio.title,
                description: payload.audio.description,
                audio_url: payload.audio.audio_url,
                cover_image: payload.audio.cover_image
            });
        }
        if (!editMode) {
            hasLoadedEditData.current = false;
        }
    }, [editMode, payload, reset]);

    useEffect(() => {
        const subscription = watch((value) => {
            const audioPayload = {
                title: value.title || 'My Track',
                description: value.description || '',
                audio_url: value.audio_url || '',
                cover_image: value.cover_image || '',

                // Merge nested audio fields
                source_type: value.audio?.source_type,
                file_data: value.audio?.file_data,
                file_name: value.audio?.file_name,
                file_mime: value.audio?.file_mime,
                allow_download: value.audio?.allow_download,
                streaming: value.audio?.streaming
            };

            updatePayload({
                styles: value.styles,
                audio: audioPayload
            } as any);
        });
        return () => subscription.unsubscribe();
    }, [watch, updatePayload]);

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Heading Section */}
            <div>
                <h3 className="text-2xl font-bold text-slate-900">Create your Audio QR code</h3>
                <p className="text-slate-500 mt-1">Share music, podcasts, or audio guides.</p>
            </div>

            <div className="space-y-4">
                {/* 1. Design and Customize Section */}
                <AccordionSection
                    title="Design and customize"
                    subtitle="Choose your color scheme"
                    icon={Palette}
                    color="bg-rose-100 text-rose-600"
                    isOpen={openSections.design}
                    onToggle={() => toggleSection('design')}
                >
                    <div className="space-y-6 mt-4 min-w-0">
                        <div className='w-full max-w-full overflow-hidden min-w-0'>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Color Presets</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 max-w-full" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
                                {[
                                    { primary: '#E11D48', secondary: '#FFE4E6', name: 'Rose Red' },
                                    { primary: '#7C3AED', secondary: '#F5F3FF', name: 'Synthwave Purple' },
                                    { primary: '#0891B2', secondary: '#CFFAFE', name: 'Ambient Cyan' },
                                    { primary: '#F59E0B', secondary: '#FEF3C7', name: 'Acoustic Gold' },
                                    { primary: '#18181B', secondary: '#F4F4F5', name: 'Studio Black' },
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
                                        {...register('styles.primary_color')}
                                        type="color"
                                        className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer flex-shrink-0"
                                    />
                                    <input
                                        value={watch('styles.primary_color') || '#E11D48'}
                                        onChange={(e) => setValue('styles.primary_color', e.target.value)}
                                        type="text"
                                        className="flex-1 px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm uppercase min-h-[44px]"
                                        placeholder="#E11D48"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary color</label>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <input
                                        {...register('styles.secondary_color')}
                                        type="color"
                                        className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer flex-shrink-0"
                                    />
                                    <input
                                        value={watch('styles.secondary_color') || '#FFE4E6'}
                                        onChange={(e) => setValue('styles.secondary_color', e.target.value)}
                                        type="text"
                                        className="flex-1 px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm uppercase min-h-[44px]"
                                        placeholder="#FFE4E6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* 2. Track Info */}
                <AccordionSection
                    title="Track Information"
                    subtitle="Title, artist, and cover art"
                    icon={Mic}
                    color="bg-purple-100 text-purple-600"
                    isOpen={openSections.content}
                    onToggle={() => toggleSection('content')}
                >
                    <div className="space-y-5 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Track Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('title', {
                                    required: 'Title is required',
                                    maxLength: { value: 50, message: 'Title must be 50 characters or less' }
                                })}
                                type="text"
                                className={`w-full px-3 sm:px-4 py-3 rounded-lg border ${errors.title ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]`}
                                placeholder="My Song Name"
                            />
                            {errors.title && <span className="text-xs text-red-500 mt-1">{errors.title.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Artist / Description
                            </label>
                            <input
                                {...register('description', { maxLength: 60 })}
                                type="text"
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="Artist Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Cover Image URL
                            </label>
                            <div className="flex gap-2">
                                <span className="flex-none p-3 bg-slate-100 border border-slate-200 rounded-l-lg text-slate-500">
                                    <ImageIcon size={20} />
                                </span>
                                <input
                                    {...register('cover_image')}
                                    type="text"
                                    className="flex-1 px-3 rounded-r-lg border border-l-0 border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                    placeholder="https://.../cover.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* 3. Audio Source */}
                <AccordionSection
                    title="Audio Source"
                    subtitle="Upload file or external link"
                    icon={LinkIcon}
                    color="bg-cyan-100 text-cyan-600"
                    isOpen={openSections.file}
                    onToggle={() => toggleSection('file')}
                >
                    <div className="space-y-6 mt-4">
                        {/* Source Type Toggle */}
                        <div className="flex p-1 bg-slate-100 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setValue('audio.source_type', 'url')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${watch('audio.source_type') !== 'file' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                External URL
                            </button>
                            <button
                                type="button"
                                onClick={() => setValue('audio.source_type', 'file')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${watch('audio.source_type') === 'file' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                Upload File
                            </button>
                        </div>

                        {watch('audio.source_type') === 'file' ? (
                            /* File Upload Mode */
                            <div className="space-y-4">
                                <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-4 text-sm text-cyan-700">
                                    <strong>Supported formats:</strong> MP3, WAV, OGG, AAC (Max 15MB)
                                </div>

                                {!watch('audio.file_data') ? (
                                    <div
                                        onClick={() => document.getElementById('audio-upload')?.click()}
                                        className="border-2 border-dashed border-slate-300 hover:border-cyan-400 rounded-xl p-8 text-center cursor-pointer transition-all bg-slate-50 hover:bg-cyan-50"
                                    >
                                        <Music className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                                        <p className="text-sm font-semibold text-slate-700">Click to upload audio file</p>
                                        <p className="text-xs text-slate-500 mt-1">Up to 15MB</p>
                                        <input
                                            id="audio-upload"
                                            type="file"
                                            accept="audio/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    if (file.size > 15 * 1024 * 1024) {
                                                        alert('File too large. Max 15MB');
                                                        return;
                                                    }
                                                    const reader = new FileReader();
                                                    reader.onload = (ev) => {
                                                        const base64 = ev.target?.result as string;
                                                        const base64Data = base64.split(',')[1];
                                                        setValue('audio.file_data', base64Data);
                                                        setValue('audio.file_name', file.name);
                                                        setValue('audio.file_mime', file.type);
                                                        // Auto-fill audio_url for preview if needed, or handle in preview
                                                        setValue('audio_url', base64);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                                                <Music className="w-5 h-5 text-cyan-600" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">{watch('audio.file_name')}</p>
                                                <p className="text-xs text-slate-500">Ready to play</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setValue('audio.file_data', '');
                                                setValue('audio.file_name', '');
                                                setValue('audio_url', '');
                                            }}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <ChevronDown className="w-5 h-5 rotate-45" /> {/* X icon replacement */}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* URL Mode */
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Audio URL <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <span className="flex-none p-3 bg-slate-100 border border-slate-200 rounded-l-lg text-slate-500">
                                        <LinkIcon size={20} />
                                    </span>
                                    <input
                                        {...register('audio_url', {
                                            required: watch('audio.source_type') !== 'file' ? 'Audio URL is required' : false
                                        })}
                                        type="text"
                                        className={`flex-1 px-3 rounded-r-lg border border-l-0 ${errors.audio_url ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]`}
                                        placeholder="https://example.com/audio.mp3"
                                    />
                                </div>
                                {errors.audio_url && <span className="text-xs text-red-500 mt-1">{errors.audio_url.message}</span>}
                            </div>
                        )}

                        <div className="pt-4 border-t border-slate-100">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register('audio.allow_download')}
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-slate-700 font-medium">Allow users to download audio file</span>
                            </label>
                        </div>
                    </div>
                </AccordionSection>

                {/* 4. Streaming Links */}
                <AccordionSection
                    title="Streaming Platforms"
                    subtitle="Links to Spotify, Apple Music, etc."
                    icon={Music}
                    color="bg-green-100 text-green-600"
                    isOpen={true} // Keep open for visibility for now
                    onToggle={() => { }} // Handle toggle state if added to openSections
                >
                    <div className="space-y-4 mt-4">
                        {[
                            { id: 'spotify', label: 'Spotify', placeholder: 'https://open.spotify.com/...' },
                            { id: 'apple', label: 'Apple Music', placeholder: 'https://music.apple.com/...' },
                            { id: 'soundcloud', label: 'SoundCloud', placeholder: 'https://soundcloud.com/...' },
                            { id: 'youtube_music', label: 'YouTube Music', placeholder: 'https://music.youtube.com/...' },
                        ].map((platform) => (
                            <div key={platform.id}>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                    {platform.label}
                                </label>
                                <input
                                    {...register(`audio.streaming.${platform.id}` as any)}
                                    type="text"
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    placeholder={platform.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}
