import { useForm } from 'react-hook-form';
import { useWizardStore } from '../store';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Ticket, Palette, Type, Calendar, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ImageUpload } from '@/components/common/ImageUpload';

// Form Value Types
type FormValues = {
    // Design & Customize
    styles: {
        primary_color: string;
        secondary_color?: string;
        gradient_type?: 'none' | 'linear' | 'radial';
        gradient_angle?: number;
    };

    // Platform Link (dummy for type consistency)
    platform: 'coupon';

    // Content
    title: string;
    description: string;
    code: string;
    valid_until: string;
    terms?: string;
    offer_image?: string;
    button_label?: string;
    offer_url?: string; // Optional link to redeem online
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

export function CouponForm() {
    const { payload, updatePayload, editMode } = useWizardStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Main Sections State
    const [openSections, setOpenSections] = useState({
        design: true,
        details: false,
        code: false
    });

    // Track if we've already loaded edit data
    const hasLoadedEditData = useRef(false);

    const { register, watch, setValue, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            styles: {
                primary_color: payload.styles?.primary_color || '#16A34A',
                secondary_color: payload.styles?.secondary_color || '#DCFCE7',
                gradient_type: payload.styles?.gradient_type || 'none',
                gradient_angle: payload.styles?.gradient_angle || 135
            },
            platform: 'coupon',

            title: payload.coupon?.title || 'Exclusive Offer',
            description: payload.coupon?.description || 'Get 20% off your next purchase!',
            code: payload.coupon?.code || 'WELCOME20',
            valid_until: payload.coupon?.valid_until || format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
            terms: payload.coupon?.terms || 'Valid for one-time use only.',
            offer_image: payload.coupon?.offer_image || '',
            button_label: payload.coupon?.button_label || 'Redeem Now',
            offer_url: payload.coupon?.offer_url || ''
        },
        mode: 'onChange'
    });

    // Reset form ONCE when entering edit mode with loaded data
    useEffect(() => {
        if (editMode && !hasLoadedEditData.current && payload.coupon) {
            hasLoadedEditData.current = true;
            reset({
                styles: payload.styles || { primary_color: '#16A34A', secondary_color: '#DCFCE7' },
                platform: 'coupon',
                title: payload.coupon.title,
                description: payload.coupon.description,
                code: payload.coupon.code,
                valid_until: payload.coupon.valid_until,
                terms: payload.coupon.terms,
                offer_image: payload.coupon.offer_image,
                button_label: payload.coupon.button_label,
                offer_url: payload.coupon.offer_url
            });
        }
        if (!editMode) {
            hasLoadedEditData.current = false;
        }
    }, [editMode, payload, reset]);

    // Watch for changes and update global store
    useEffect(() => {
        const subscription = watch((value) => {
            const couponPayload = {
                title: value.title,
                description: value.description,
                code: value.code,
                valid_until: value.valid_until,
                terms: value.terms,
                offer_image: value.offer_image,
                button_label: value.button_label,
                offer_url: value.offer_url
            };

            updatePayload({
                styles: value.styles,
                coupon: couponPayload
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
                <h3 className="text-2xl font-bold text-slate-900">Create your Coupon QR code</h3>
                <p className="text-slate-500 mt-1">Share exclusive discounts and special offers.</p>
            </div>

            <div className="space-y-4">
                {/* 1. Design and Customize Section */}
                <AccordionSection
                    title="Design and customize"
                    subtitle="Choose your color scheme"
                    icon={Palette}
                    color="bg-green-100 text-green-600"
                    isOpen={openSections.design}
                    onToggle={() => toggleSection('design')}
                >
                    <div className="space-y-6 mt-4 min-w-0">
                        {/* Color Palette Presets */}
                        <div className='w-full max-w-full overflow-hidden min-w-0'>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Color Presets</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 max-w-full" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}>
                                {[
                                    { primary: '#16A34A', secondary: '#DCFCE7', name: 'Fresh Green' },
                                    { primary: '#2563EB', secondary: '#EFF6FF', name: 'Sale Blue' },
                                    { primary: '#DC2626', secondary: '#FEF2F2', name: 'Hot Deal Red' },
                                    { primary: '#D97706', secondary: '#FEF3C7', name: 'Gold' },
                                    { primary: '#F472B6', secondary: '#FCE7F3', name: 'Pink' },
                                    { primary: '#1F2937', secondary: '#F3F4F6', name: 'Premium Black' },
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
                                        value={watch('styles.primary_color') || '#16A34A'}
                                        onChange={(e) => setValue('styles.primary_color', e.target.value)}
                                        type="text"
                                        className="flex-1 px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm uppercase min-h-[44px]"
                                        placeholder="#16A34A"
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
                                        value={watch('styles.secondary_color') || '#DCFCE7'}
                                        onChange={(e) => setValue('styles.secondary_color', e.target.value)}
                                        type="text"
                                        className="flex-1 px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm uppercase min-h-[44px]"
                                        placeholder="#DCFCE7"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* 2. Offer Details */}
                <AccordionSection
                    title="Offer Details"
                    subtitle="Describe your promotion"
                    icon={Ticket}
                    color="bg-purple-100 text-purple-600"
                    isOpen={openSections.details}
                    onToggle={() => toggleSection('details')}
                >
                    <div className="space-y-5 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Offer Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('title', {
                                    required: 'Title is required',
                                    maxLength: { value: 30, message: 'Title must be 30 characters or less' }
                                })}
                                type="text"
                                className={`w-full px-3 sm:px-4 py-3 rounded-lg border ${errors.title ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]`}
                                placeholder="Summer Sale - 50% OFF"
                            />
                            {errors.title && <span className="text-xs text-red-500 mt-1">{errors.title.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Description
                            </label>
                            <textarea
                                {...register('description', {
                                    maxLength: { value: 120, message: 'Description must be 120 characters or less' }
                                })}
                                rows={3}
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-base"
                                placeholder="Show this code at checkout to get 50% off any item."
                            />
                        </div>

                        <div>
                            <ImageUpload
                                label="Offer Image"
                                value={watch('offer_image')}
                                onChange={(base64) => setValue('offer_image', base64 || '')}
                                maxSizeMB={2}
                            />
                        </div>
                    </div>
                </AccordionSection>

                {/* 3. Code & Validity */}
                <AccordionSection
                    title="Coupon Code & Validity"
                    subtitle="Set code and expiration"
                    icon={Calendar}
                    color="bg-blue-100 text-blue-600"
                    isOpen={openSections.code}
                    onToggle={() => toggleSection('code')}
                >
                    <div className="space-y-5 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Coupon Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('code', {
                                        required: 'Coupon code is required'
                                    })}
                                    type="text"
                                    className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-lg uppercase font-bold min-h-[44px] tracking-wider"
                                    placeholder="SAVE50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Valid Until
                                </label>
                                <input
                                    {...register('valid_until')}
                                    type="date"
                                    className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Terms & Conditions
                            </label>
                            <input
                                {...register('terms')}
                                type="text"
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[44px]"
                                placeholder="Valid for one-time use. Cannot be combined."
                            />
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Redeem URL (Optional)
                                </label>
                                <input
                                    {...register('offer_url')}
                                    type="text"
                                    className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                    placeholder="https://myshop.com/redeem"
                                />
                                <p className="text-xs text-slate-500 mt-1">If provided, a "Redeem Now" button will appear.</p>
                            </div>
                        </div>
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}
