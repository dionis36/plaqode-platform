import { useForm } from 'react-hook-form';
import { useWizardStore } from '../store';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Star, Link as LinkIcon, Palette, Image as ImageIcon } from 'lucide-react';
import ColorPicker from '@/components/common/ColorPicker';
import { ImageUpload } from '../../common/ImageUpload';

// Form Value Types
type FormValues = {
    // Design & Customize
    styles: {
        primary_color: string;
        secondary_color?: string;
        gradient_type?: 'none' | 'linear' | 'radial';
        gradient_angle?: number;
    };

    // Review Links
    platform: 'review';

    // Content
    title: string;
    description: string;
    business_name?: string;
    logo?: string;

    // Links
    google?: string;
    yelp?: string;
    tripadvisor?: string;
    facebook?: string;
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

export function ReviewForm() {
    const { payload, updatePayload, editMode } = useWizardStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Main Sections State
    const [openSections, setOpenSections] = useState({
        design: true,
        content: false,
        branding: false,
        links: false
    });

    // Track if we've already loaded edit data
    const hasLoadedEditData = useRef(false);

    const { register, watch, setValue, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            styles: {
                primary_color: payload.styles?.primary_color || '#FACC15', // Yellow for stars
                secondary_color: payload.styles?.secondary_color || '#FEFCE8',
                gradient_type: payload.styles?.gradient_type || 'none',
                gradient_angle: payload.styles?.gradient_angle || 135
            },
            platform: 'review',

            title: payload.review?.title || 'We value your feedback',
            description: payload.review?.description || 'Please select a platform below to leave your review.',
            business_name: payload.review?.business_name || '',
            logo: payload.review?.logo || '',

            google: payload.review?.google || '',
            yelp: payload.review?.yelp || '',
            tripadvisor: payload.review?.tripadvisor || '',
            facebook: payload.review?.facebook || ''
        },
        mode: 'onChange'
    });

    // Reset form ONCE when entering edit mode with loaded data
    useEffect(() => {
        if (editMode && !hasLoadedEditData.current && payload.review) {
            hasLoadedEditData.current = true;
            reset({
                styles: payload.styles || { primary_color: '#FACC15', secondary_color: '#FEFCE8' },
                platform: 'review',
                title: payload.review.title,
                description: payload.review.description,
                business_name: payload.review.business_name || '',
                logo: payload.review.logo || '',
                google: payload.review.google,
                yelp: payload.review.yelp,
                tripadvisor: payload.review.tripadvisor,
                facebook: payload.review.facebook
            });
        }
        if (!editMode) {
            hasLoadedEditData.current = false;
        }
    }, [editMode, payload, reset]);

    // Watch for changes and update global store
    // Note: We need to map form values back to the nested 'review' structure expected by the store/API
    useEffect(() => {
        const subscription = watch((value) => {
            const reviewPayload = {
                title: value.title,
                description: value.description,
                business_name: value.business_name,
                logo: value.logo,
                google: value.google,
                yelp: value.yelp,
                tripadvisor: value.tripadvisor,
                facebook: value.facebook
            };

            updatePayload({
                styles: value.styles,
                review: reviewPayload
                // We don't save 'platform' in the payload root here as it's handled by the store type
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
                <h3 className="text-2xl font-bold text-slate-900">Create your Reviews QR code</h3>
                <p className="text-slate-500 mt-1">Direct customers to review your business on Google, Yelp, and more.</p>
            </div>

            <div className="space-y-4">
                {/* 1. Design and Customize Section */}
                <AccordionSection
                    title="Design and customize"
                    subtitle="Choose your color scheme"
                    icon={Palette}
                    color="bg-yellow-100 text-yellow-600"
                    isOpen={openSections.design}
                    onToggle={() => toggleSection('design')}
                >
                    <div className="space-y-6 mt-4 min-w-0">
                        {/* Color Palette Presets */}
                        <div className='w-full max-w-full overflow-hidden min-w-0'>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Color Presets</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 max-w-full" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
                                {[
                                    { primary: '#FACC15', secondary: '#FEFCE8', name: 'Star Yellow' },
                                    { primary: '#2563EB', secondary: '#EFF6FF', name: 'Google Blue' },
                                    { primary: '#DC2626', secondary: '#FEF2F2', name: 'Yelp Red' },
                                    { primary: '#059669', secondary: '#ECFDF5', name: 'TripAdvisor Green' },
                                    { primary: '#1877F2', secondary: '#F0F9FF', name: 'Facebook Blue' },
                                    { primary: '#1F2937', secondary: '#F3F4F6', name: 'Elegant Black' },
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
                                        color={watch('styles.primary_color') || '#FACC15'}
                                        onChange={(v) => setValue('styles.primary_color', v, { shouldDirty: true, shouldTouch: true })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary color</label>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <input type="hidden" {...register('styles.secondary_color')} />
                                    <ColorPicker
                                        color={watch('styles.secondary_color') || '#FEFCE8'}
                                        onChange={(v) => setValue('styles.secondary_color', v, { shouldDirty: true, shouldTouch: true })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* 2. Page Content */}
                <AccordionSection
                    title="Page Content"
                    subtitle="Customize the header text"
                    icon={Star}
                    color="bg-orange-100 text-orange-600"
                    isOpen={openSections.content}
                    onToggle={() => toggleSection('content')}
                >
                    <div className="space-y-5 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Headline
                            </label>
                            <input
                                {...register('title', {
                                    maxLength: { value: 50, message: 'Headline must be 50 characters or less' }
                                })}
                                type="text"
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="We value your feedback"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Description
                            </label>
                            <textarea
                                {...register('description', {
                                    maxLength: { value: 150, message: 'Description must be 150 characters or less' }
                                })}
                                rows={3}
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-base"
                                placeholder="Please select a platform below to leave your review."
                            />
                        </div>
                    </div>
                </AccordionSection>

                {/* 3. Branding (NEW) */}
                <AccordionSection
                    title="Branding"
                    subtitle="Add logo and business name"
                    icon={ImageIcon}
                    color="bg-orange-100 text-orange-600"
                    isOpen={openSections.branding}
                    onToggle={() => toggleSection('branding')}
                >
                    <div className="space-y-6 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Business Name (Optional)
                            </label>
                            <input
                                {...register('business_name')}
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                                placeholder="e.g. Acme Corp"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Logo
                            </label>
                            <div className="mb-2">
                                <ImageUpload
                                    label="Upload Logo"
                                    value={watch('logo') || ''}
                                    onChange={(url) => setValue('logo', url)}
                                    className="h-auto min-h-[160px] w-full"
                                />
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* 3. Review Links */}
                <AccordionSection
                    title="Review Platforms"
                    subtitle="Add links to your business profiles"
                    icon={LinkIcon}
                    color="bg-blue-100 text-blue-600"
                    isOpen={openSections.links}
                    onToggle={() => toggleSection('links')}
                >
                    <div className="space-y-6 mt-4">
                        {/* Google */}
                        <div className="animate-in slide-in-from-left-2 duration-300">
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded text-blue-600">G</span> Google Review Link
                            </label>
                            <input
                                {...register('google', {
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: 'Please enter a valid URL'
                                    }
                                })}
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="https://g.page/r/..."
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                Tip: Search for your business on Google Maps, click "Share", then copy link.
                            </p>
                        </div>

                        {/* Yelp */}
                        <div className="animate-in slide-in-from-left-2 duration-300 delay-75">
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 flex items-center justify-center bg-red-100 rounded text-red-600">Y</span> Yelp Review Link
                            </label>
                            <input
                                {...register('yelp', {
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: 'Please enter a valid URL'
                                    }
                                })}
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="https://yelp.com/biz/..."
                            />
                        </div>

                        {/* TripAdvisor */}
                        <div className="animate-in slide-in-from-left-2 duration-300 delay-100">
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 flex items-center justify-center bg-green-100 rounded text-green-600">T</span> TripAdvisor Review Link
                            </label>
                            <input
                                {...register('tripadvisor', {
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: 'Please enter a valid URL'
                                    }
                                })}
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="https://tripadvisor.com/..."
                            />
                        </div>

                        {/* Facebook */}
                        <div className="animate-in slide-in-from-left-2 duration-300 delay-150">
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded text-blue-800">f</span> Facebook Review Link
                            </label>
                            <input
                                {...register('facebook', {
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: 'Please enter a valid URL'
                                    }
                                })}
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}
