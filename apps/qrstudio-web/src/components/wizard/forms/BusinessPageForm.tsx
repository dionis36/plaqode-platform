import { useForm, useFieldArray } from 'react-hook-form';
import { useWizardStore } from '../store';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Store, Palette, Clock, MapPin, Globe, Share2, Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '@/components/common/ImageUpload';
import ColorPicker from '@/components/common/ColorPicker';
import { BusinessHoursInput, BusinessHours } from './BusinessHoursInput';

// Form Value Types
type FormValues = {
    // Design & Customize
    styles: {
        primary_color: string;
        secondary_color?: string;
        gradient_type?: 'none' | 'linear' | 'radial';
        gradient_angle?: number;
    };

    platform: 'business';

    // Business Info
    logo?: string;
    banner?: string;
    name: string;
    description: string;

    // Concat Info
    address: string;
    phone: string;
    email: string;
    website?: string;

    // Hours (flat structure for form handling)
    // Hours
    hours: BusinessHours;

    social_links: { platform: string; url: string }[];
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

const SOCIAL_PLATFORMS = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'X (Twitter)' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
];

const migrateHours = (hours: any): BusinessHours => {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
    const defaultHours = {
        mon: { isOpen: true, start: '09:00', end: '17:00' },
        tue: { isOpen: true, start: '09:00', end: '17:00' },
        wed: { isOpen: true, start: '09:00', end: '17:00' },
        thu: { isOpen: true, start: '09:00', end: '17:00' },
        fri: { isOpen: true, start: '09:00', end: '17:00' },
        sat: { isOpen: false, start: '09:00', end: '17:00' },
        sun: { isOpen: false, start: '09:00', end: '17:00' }
    };

    if (!hours) return defaultHours;

    const result: any = {};
    days.forEach(day => {
        const val = hours[day];
        if (typeof val === 'string') {
            // Legacy string data
            if (val.toLowerCase() === 'closed') {
                result[day] = { isOpen: false, start: '09:00', end: '17:00' };
            } else {
                // If we want to be fancy we could regex match, but safer to default to 9-5 for migration
                // We'll mark it open though
                result[day] = { isOpen: true, start: '09:00', end: '17:00' };
            }
        } else if (val && typeof val === 'object' && typeof val.isOpen === 'boolean') {
            // Already new format
            result[day] = val;
        } else {
            // Fallback
            result[day] = defaultHours[day];
        }
    });

    return result as BusinessHours;
};

export function BusinessPageForm() {
    const { payload, updatePayload, editMode } = useWizardStore();
    const [isMounted, setIsMounted] = useState(false);
    const hasSetRandomColors = useRef(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Main Sections State
    const [openSections, setOpenSections] = useState({
        design: true,
        info: false,
        contact: false,
        hours: false,
        social: false
    });

    // Track if we've already loaded edit data
    const hasLoadedEditData = useRef(false);

    const { register, control, watch, setValue, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            styles: {
                primary_color: payload.styles?.primary_color || '#2563EB',
                secondary_color: payload.styles?.secondary_color || '#EFF6FF',
                gradient_type: payload.styles?.gradient_type || 'none',
                gradient_angle: payload.styles?.gradient_angle || 135
            },
            platform: 'business',

            name: payload.business?.name || 'My Business',
            description: payload.business?.description || 'Your trusted local business.',
            logo: payload.business?.logo || '',
            banner: payload.business?.banner || '',

            address: payload.business?.address || '',
            phone: payload.business?.phone || '',
            email: payload.business?.email || '',
            website: payload.business?.website || '',

            hours: migrateHours(payload.business?.hours),

            social_links: payload.business?.social_links || []
        },
        mode: 'onChange'
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "social_links"
    });

    // Set random color pair on page load for new QR codes - same as Menu
    useEffect(() => {
        if (!editMode && !hasSetRandomColors.current) {
            const colorPalettes = [
                { primary: '#2563EB', secondary: '#EFF6FF' },
                { primary: '#1F2937', secondary: '#F3F4F6' },
                { primary: '#059669', secondary: '#ECFDF5' },
                { primary: '#DC2626', secondary: '#FEF2F2' },
                { primary: '#7C3AED', secondary: '#FAF5FF' },
                { primary: '#EA580C', secondary: '#FFF7ED' },
                { primary: '#0891B2', secondary: '#F0FDFA' },
                { primary: '#BE123C', secondary: '#FFF1F2' },
                { primary: '#EC4899', secondary: '#FCE7F3' },
            ];
            const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
            // Only set if not already set in payload (avoid overwriting if user went back)
            if (!payload.styles?.primary_color) {
                setValue('styles.primary_color', randomPalette.primary);
                setValue('styles.secondary_color', randomPalette.secondary);
            }
            hasSetRandomColors.current = true;
        }
    }, [editMode, setValue, payload.styles]);


    // Reset form ONCE when entering edit mode with loaded data
    useEffect(() => {
        if (editMode && !hasLoadedEditData.current && payload.business) {
            hasLoadedEditData.current = true;
            reset({
                styles: payload.styles || { primary_color: '#2563EB', secondary_color: '#EFF6FF' },
                platform: 'business',
                ...payload.business,
                hours: migrateHours(payload.business?.hours)
            });
        }
        if (!editMode) {
            hasLoadedEditData.current = false;
        }
    }, [editMode, payload, reset]);

    // Watch for changes and update global store
    useEffect(() => {
        const subscription = watch((value) => {
            const businessPayload = {
                name: value.name,
                description: value.description,
                logo: value.logo,
                banner: value.banner,
                address: value.address,
                phone: value.phone,
                email: value.email,
                website: value.website,
                hours: value.hours,
                social_links: value.social_links
            };

            updatePayload({
                styles: value.styles,
                business: businessPayload
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
                <h3 className="text-2xl font-bold text-slate-900">Create your Business Page</h3>
                <p className="text-slate-500 mt-1">A mini-website for your business with hours, location, and more.</p>
            </div>

            <div className="space-y-4">
                {/* 1. Design and Customize Section (Replicated from MenuForm) */}
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
                                    { primary: '#2563EB', secondary: '#EFF6FF', name: 'Corporate Blue' },
                                    { primary: '#0F172A', secondary: '#F8FAFC', name: 'Sleek Dark' },
                                    { primary: '#DC2626', secondary: '#FEF2F2', name: 'Bold Red' },
                                    { primary: '#059669', secondary: '#ECFDF5', name: 'Professional Green' },
                                    { primary: '#7C3AED', secondary: '#F5F3FF', name: 'Creative Purple' },
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
                                        color={watch('styles.secondary_color') || '#EFF6FF'}
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

                {/* 2. Business Info */}
                <AccordionSection
                    title="Business Information"
                    subtitle="Logo, name, and description"
                    icon={Store}
                    color="bg-indigo-100 text-indigo-600"
                    isOpen={openSections.info}
                    onToggle={() => toggleSection('info')}
                >
                    <div className="space-y-5 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Business Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('name', { required: 'Business name is required' })}
                                type="text"
                                className={`w-full px-3 sm:px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]`}
                                placeholder="Acme Corp"
                            />
                            {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Description
                            </label>
                            <textarea
                                {...register('description', { maxLength: 150 })}
                                rows={3}
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-base"
                                placeholder="Your trusted local business."
                            />
                        </div>

                        {/* Replaces URL input with ImageUpload */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ImageUpload
                                label="Business Logo"
                                value={watch('logo')}
                                onChange={(base64) => setValue('logo', base64 || '')}
                                maxSizeMB={2}
                            />
                            <ImageUpload
                                label="Banner Image"
                                value={watch('banner')}
                                onChange={(base64) => setValue('banner', base64 || '')}
                                maxSizeMB={3}
                            />
                        </div>
                    </div>
                </AccordionSection>

                {/* 3. Contact & Location */}
                <AccordionSection
                    title="Contact & Location"
                    subtitle="How customers can reach you"
                    icon={MapPin}
                    color="bg-red-100 text-red-600"
                    isOpen={openSections.contact}
                    onToggle={() => toggleSection('contact')}
                >
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                            <input
                                {...register('address')}
                                type="text"
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="123 Main St, City, Country"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                            <input
                                {...register('phone')}
                                type="tel"
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="contact@business.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Website</label>
                            <input
                                {...register('website')}
                                type="url"
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="https://business.com"
                            />
                        </div>
                    </div>
                </AccordionSection>

                {/* 4. Opening Hours */}
                <AccordionSection
                    title="Opening Hours"
                    subtitle="When are you open?"
                    icon={Clock}
                    color="bg-orange-100 text-orange-600"
                    isOpen={openSections.hours}
                    onToggle={() => toggleSection('hours')}
                >
                    <div className="mt-4">
                        <BusinessHoursInput
                            value={watch('hours')}
                            onChange={(val) => setValue('hours', val, { shouldDirty: true, shouldTouch: true })}
                        />
                    </div>
                </AccordionSection>

                {/* 5. Social Links */}
                <AccordionSection
                    title="Social Media"
                    subtitle="Add your profiles"
                    icon={Share2}
                    color="bg-pink-100 text-pink-600"
                    isOpen={openSections.social}
                    onToggle={() => toggleSection('social')}
                >
                    <div className="space-y-4 mt-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-start animate-in slide-in-from-left-2 duration-300">
                                <div className="flex-1 space-y-2">
                                    <select
                                        {...register(`social_links.${index}.platform` as const)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-sm"
                                    >
                                        <option value="">Select Platform</option>
                                        {SOCIAL_PLATFORMS.map(p => (
                                            <option key={p.value} value={p.value}>{p.label}</option>
                                        ))}
                                    </select>
                                    <input
                                        {...register(`social_links.${index}.url` as const)}
                                        placeholder="Profile URL"
                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => append({ platform: 'facebook', url: '' })}
                            className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-semibold hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Social Link
                        </button>
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}
