import { useForm } from 'react-hook-form';
import { useWizardStore } from '../store';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Video, Palette, Youtube, Link as LinkIcon, Type } from 'lucide-react';

// Form Value Types
type FormValues = {
    // Design & Customize
    styles: {
        primary_color: string;
        secondary_color?: string;
        gradient_type?: 'none' | 'linear' | 'radial';
        gradient_angle?: number;
    };

    platform: 'video';

    // Content
    title: string;
    description: string;
    video_url: string;

    // Future: Autoplay, Mute, Loop options
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
    // Hydration check
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

export function VideoForm() {
    const { payload, updatePayload, editMode } = useWizardStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [openSections, setOpenSections] = useState({
        design: true,
        content: false,
        video: true // Open video section by default as it's critical
    });

    const hasLoadedEditData = useRef(false);

    const { register, watch, setValue, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            styles: {
                primary_color: payload.styles?.primary_color || '#FF0000',
                secondary_color: payload.styles?.secondary_color || '#FFF1F2',
                gradient_type: payload.styles?.gradient_type || 'none',
                gradient_angle: payload.styles?.gradient_angle || 135
            },
            platform: 'video',

            title: payload.video?.title || 'Check out this video',
            description: payload.video?.description || 'Watch the full video below.',
            video_url: payload.video?.video_url || ''
        },
        mode: 'onChange'
    });

    useEffect(() => {
        if (editMode && !hasLoadedEditData.current && payload.video) {
            hasLoadedEditData.current = true;
            reset({
                styles: payload.styles || { primary_color: '#FF0000', secondary_color: '#FFF1F2' },
                platform: 'video',
                title: payload.video.title,
                description: payload.video.description,
                video_url: payload.video.video_url
            });
        }
        if (!editMode) {
            hasLoadedEditData.current = false;
        }
    }, [editMode, payload, reset]);

    useEffect(() => {
        const subscription = watch((value) => {
            const videoPayload = {
                title: value.title,
                description: value.description,
                video_url: value.video_url
            };

            updatePayload({
                styles: value.styles,
                video: videoPayload
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
            <div>
                <h3 className="text-2xl font-bold text-slate-900">Create your Video QR code</h3>
                <p className="text-slate-500 mt-1">Share YouTube videos, Vimeo clips, or direct video files.</p>
            </div>

            <div className="space-y-4">
                {/* 1. Design */}
                <AccordionSection
                    title="Design and customize"
                    subtitle="Choose your color scheme"
                    icon={Palette}
                    color="bg-red-100 text-red-600"
                    isOpen={openSections.design}
                    onToggle={() => toggleSection('design')}
                >
                    <div className="space-y-6 mt-4 min-w-0">
                        <div className='w-full max-w-full overflow-hidden min-w-0'>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Color Presets</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 max-w-full" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
                                {[
                                    { primary: '#FF0000', secondary: '#FFF1F2', name: 'YouTube Red' },
                                    { primary: '#1AB7EA', secondary: '#E0F7FA', name: 'Vimeo Blue' },
                                    { primary: '#000000', secondary: '#F3F4F6', name: 'Classic Black' },
                                    { primary: '#7C3AED', secondary: '#F5F3FF', name: 'Modern Purple' },
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
                                        value={watch('styles.primary_color') || '#FF0000'}
                                        onChange={(e) => setValue('styles.primary_color', e.target.value)}
                                        type="text"
                                        className="flex-1 px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm uppercase min-h-[44px]"
                                        placeholder="#FF0000"
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
                                        value={watch('styles.secondary_color') || '#FFF1F2'}
                                        onChange={(e) => setValue('styles.secondary_color', e.target.value)}
                                        type="text"
                                        className="flex-1 px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm uppercase min-h-[44px]"
                                        placeholder="#FFF1F2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* 2. Video URL */}
                <AccordionSection
                    title="Video Source"
                    subtitle="YouTube, Vimeo, or Direct Link"
                    icon={Youtube}
                    color="bg-indigo-100 text-indigo-600"
                    isOpen={openSections.video}
                    onToggle={() => toggleSection('video')}
                >
                    <div className="space-y-4 mt-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700 mb-2">
                            <strong>Supported formats:</strong> YouTube, Vimeo, MP4, WebM.
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Video URL <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <span className="flex-none p-3 bg-slate-100 border border-slate-200 rounded-l-lg text-slate-500">
                                    <LinkIcon size={20} />
                                </span>
                                <input
                                    {...register('video_url', {
                                        required: 'Video URL is required',
                                        pattern: {
                                            value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be|vimeo\.com|.+\.mp4|.+\.webm)\/.+$/,
                                            message: 'Please enter a valid YouTube, Vimeo, or video file URL'
                                        }
                                    })}
                                    type="text"
                                    className={`flex-1 px-3 rounded-r-lg border border-l-0 ${errors.video_url ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]`}
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                            </div>
                            {errors.video_url && <span className="text-xs text-red-500 mt-1">{errors.video_url.message}</span>}
                        </div>
                    </div>
                </AccordionSection>

                {/* 3. Details */}
                <AccordionSection
                    title="Video Details"
                    subtitle="Title and description"
                    icon={Type}
                    color="bg-emerald-100 text-emerald-600"
                    isOpen={openSections.content}
                    onToggle={() => toggleSection('content')}
                >
                    <div className="space-y-5 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Video Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('title', { required: 'Title is required', maxLength: 80 })}
                                type="text"
                                className={`w-full px-3 sm:px-4 py-3 rounded-lg border ${errors.title ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]`}
                                placeholder="My Awesome Video"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Description
                            </label>
                            <textarea
                                {...register('description', { maxLength: 200 })}
                                rows={3}
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-base"
                                placeholder="A short description of what this video is about."
                            />
                        </div>
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}
