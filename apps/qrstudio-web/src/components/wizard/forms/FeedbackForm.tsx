
import { useForm } from 'react-hook-form';
import { useWizardStore } from '../store';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, MessageCircleHeart, Palette, Star, User, Mail, Building2, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { ImageUpload } from '../../common/ImageUpload';
import ColorPicker from '@/components/common/ColorPicker';

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
    platform: 'feedback';

    // Content
    question: string;
    email: string;
    collect_contact?: boolean;
    business_name?: string;
    logo?: string;
    success_message?: string;
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
                    <div className={`p - 3 sm: p - 4 rounded - xl ${color} flex items - center justify - center flex - shrink - 0`}>
                        {isMounted && <Icon className="w-5 h-5 sm:w-7 sm:h-7" />}
                    </div>
                    <div className="text-left">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{title}</h3>
                        <p className="text-xs sm:text-sm text-slate-500">{subtitle}</p>
                    </div>
                </div>
                {isMounted && (
                    <ChevronDown
                        className={`w - 5 h - 5 text - slate - 400 transition - transform duration - 300 flex - shrink - 0 ${isOpen ? 'rotate-180' : ''} `}
                    />
                )}
            </button>

            {/* Content */}
            <div
                className={`overflow - hidden transition - all duration - 300 ease -in -out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    } `}
            >
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function FeedbackForm() {
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
        settings: false
    });

    // Track if we've already loaded edit data
    const hasLoadedEditData = useRef(false);

    const { register, watch, setValue, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            styles: {
                primary_color: payload.styles?.primary_color || '#A855F7',
                secondary_color: payload.styles?.secondary_color || '#F3E8FF',
                gradient_type: payload.styles?.gradient_type || 'none',
                gradient_angle: payload.styles?.gradient_angle || 135
            },
            platform: 'feedback',

            question: payload.feedback?.question || 'How was your experience?',
            email: payload.feedback?.email || '',
            collect_contact: payload.feedback?.collect_contact || false,
            business_name: payload.feedback?.business_name || '',
            logo: payload.feedback?.logo || '',
            success_message: payload.feedback?.success_message || 'Thank you for your feedback!'
        },
        mode: 'onChange'
    });

    // Reset form ONCE when entering edit mode with loaded data
    useEffect(() => {
        if (editMode && !hasLoadedEditData.current && payload.feedback) {
            hasLoadedEditData.current = true;
            reset({
                styles: payload.styles || { primary_color: '#A855F7', secondary_color: '#F3E8FF' },
                platform: 'feedback',
                question: payload.feedback.question || 'How was your experience?',
                email: payload.feedback.email || '',
                collect_contact: payload.feedback.collect_contact || false,
                business_name: payload.feedback.business_name || '',
                logo: payload.feedback.logo || '',
                success_message: payload.feedback.success_message || 'Thank you for your feedback!'
            });
        }
        if (!editMode) {
            hasLoadedEditData.current = false;
        }
    }, [editMode, payload, reset]);

    // Watch for changes and update global store
    useEffect(() => {
        const subscription = watch((value) => {
            const feedbackPayload = {
                question: value.question,
                email: value.email,
                collect_contact: value.collect_contact,
                business_name: value.business_name,
                logo: value.logo,
                success_message: value.success_message
            };

            updatePayload({
                styles: value.styles,
                feedback: feedbackPayload
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
                <h3 className="text-2xl font-bold text-slate-900">Create your Feedback QR code</h3>
                <p className="text-slate-500 mt-1">Collect ratings and private feedback from customers.</p>
            </div>

            <div className="space-y-4">
                {/* 1. Design and Customize Section */}
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
                                    { primary: '#A855F7', secondary: '#F3E8FF', name: 'Royal Purple' },
                                    { primary: '#EC4899', secondary: '#FCE7F3', name: 'Hot Pink' },
                                    { primary: '#2563EB', secondary: '#EFF6FF', name: 'Classic Blue' },
                                    { primary: '#059669', secondary: '#ECFDF5', name: 'Fresh Green' },
                                    { primary: '#F59E0B', secondary: '#FEF3C7', name: 'Warm Amber' },
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
                                        style={{ background: `linear - gradient(to right, ${palette.primary} 50 %, ${palette.secondary} 50 %)` }}
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
                                        color={watch('styles.primary_color') || '#A855F7'}
                                        onChange={(v) => setValue('styles.primary_color', v, { shouldDirty: true, shouldTouch: true })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary color</label>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <input type="hidden" {...register('styles.secondary_color')} />
                                    <ColorPicker
                                        color={watch('styles.secondary_color') || '#F3E8FF'}
                                        onChange={(v) => setValue('styles.secondary_color', v, { shouldDirty: true, shouldTouch: true })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* 2. Page Content */}
                <AccordionSection
                    title="Feedback Question"
                    subtitle="Customize your question"
                    icon={MessageCircleHeart}
                    color="bg-pink-100 text-pink-600"
                    isOpen={openSections.content}
                    onToggle={() => toggleSection('content')}
                >
                    <div className="space-y-5 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Question Heading <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('question', {
                                    required: 'Question is required',
                                    maxLength: { value: 60, message: 'Question must be 60 characters or less' }
                                })}
                                type="text"
                                className={`w - full px - 3 sm: px - 4 py - 3 rounded - lg border ${errors.question ? 'border-red-300' : 'border-slate-300'} focus: ring - 2 focus: ring - blue - 500 outline - none text - base min - h - [44px]`}
                                placeholder="How was your experience?"
                            />
                            {errors.question && <span className="text-xs text-red-500 mt-1">{errors.question.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Success Message
                            </label>
                            <input
                                {...register('success_message', {
                                    maxLength: { value: 60, message: 'Message must be 60 characters or less' }
                                })}
                                type="text"
                                className="w-full px-3 sm:px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-base min-h-[44px]"
                                placeholder="Thank you for your feedback!"
                            />
                        </div>
                    </div>
                </AccordionSection>

                {/* 3. Branding (NEW) */}
                <AccordionSection
                    title="Branding"
                    subtitle="Add logo and images"
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

                {/* 4. Settings */}
                <AccordionSection
                    title="Settings"
                    subtitle="Where should feedback go?"
                    icon={Mail}
                    color="bg-blue-100 text-blue-600"
                    isOpen={openSections.settings}
                    onToggle={() => toggleSection('settings')}
                >
                    <div className="space-y-5 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Admin Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('email', {
                                    required: 'Email is required to receive feedback',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                className={`w - full px - 3 sm: px - 4 py - 3 rounded - lg border ${errors.email ? 'border-red-300' : 'border-slate-300'} focus: ring - 2 focus: ring - blue - 500 outline - none text - base min - h - [44px]`}
                                placeholder="owner@restaurant.com"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                We'll send customer feedback directly to this email address.
                            </p>
                            {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
                        </div>

                        {/* Contact Info Toggle */}
                        <div className="flex items-center justify-between pt-2">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700">
                                    Collect Contact Info
                                </label>
                                <p className="text-xs text-slate-500 mt-1">
                                    Ask customers for their name and phone/email.
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={watch('collect_contact')}
                                    onChange={(e) => setValue('collect_contact', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}
