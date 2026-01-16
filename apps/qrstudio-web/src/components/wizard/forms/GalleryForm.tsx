import { useForm, useFieldArray } from 'react-hook-form';
import { useWizardStore } from '../store';
import { useEffect, useState, useRef } from 'react';
import { Plus, X, ArrowUp, ArrowDown, Image as ImageIcon, LayoutGrid, Columns, Palette, ChevronDown, AlignLeft } from 'lucide-react';
import ColorPicker from '@/components/common/ColorPicker';

interface GalleryFormData {
    gallery: {
        title: string;
        description: string;
        grid_style: 'grid' | 'masonry' | 'carousel';
        images: {
            url: string;
            caption: string;
            alt: string;
        }[];
    };
    styles: {
        primary_color: string;
        secondary_color?: string;
        gradient_type?: 'none' | 'linear' | 'radial';
        gradient_angle?: number;
    };
}

// Accordion Section Component
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
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function GalleryForm() {
    const { payload, updatePayload, editMode } = useWizardStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Accordion State
    const [openSections, setOpenSections] = useState({
        design: true,
        info: false,
        images: false
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Ensure gallery payload exists (safe access)
    const galleryData = payload.gallery || {
        title: 'My Gallery',
        description: '',
        grid_style: 'grid',
        images: []
    };

    const stylesData = payload.styles || {
        primary_color: '#2563EB',
        secondary_color: '#EFF6FF',
        gradient_type: 'linear',
        gradient_angle: 135
    };

    const hasSetRandomColors = useRef(false);

    const { register, control, watch, setValue, formState: { errors } } = useForm<GalleryFormData>({
        defaultValues: {
            gallery: {
                title: galleryData.title,
                description: galleryData.description,
                grid_style: galleryData.grid_style,
                images: galleryData.images || []
            },
            styles: {
                primary_color: stylesData.primary_color,
                secondary_color: stylesData.secondary_color,
                gradient_type: stylesData.gradient_type,
                gradient_angle: stylesData.gradient_angle
            }
        },
        mode: 'onChange'
    });

    // Set random color pair on page load for new QR codes
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
            // Only set if not already set by payload
            if (!payload.styles) {
                setValue('styles.primary_color', randomPalette.primary);
                setValue('styles.secondary_color', randomPalette.secondary);
            }
            hasSetRandomColors.current = true;
        }
    }, [editMode, setValue, payload.styles]);

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "gallery.images"
    });

    // Watch for changes and update store
    useEffect(() => {
        const subscription = watch((value) => {
            updatePayload({
                gallery: value.gallery as any,
                styles: value.styles as any
            });
        });
        return () => subscription.unsubscribe();
    }, [watch, updatePayload]);

    const gridStyle = watch('gallery.grid_style');

    if (!isMounted) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Heading Section */}
            <div>
                <h3 className="text-2xl font-bold text-slate-900">Create your Image Gallery</h3>
                <p className="text-slate-500 mt-1">Upload photos, customize the layout, and choose your theme.</p>
            </div>

            <div className="space-y-4">
                {/* 1. Design and Customize (Copied from URL Form) */}
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

                {/* 2. Gallery Information */}
                <AccordionSection
                    title="Gallery Information"
                    subtitle="Title, description, and layout"
                    icon={AlignLeft}
                    color="bg-blue-100 text-blue-600"
                    isOpen={openSections.info}
                    onToggle={() => toggleSection('info')}
                >
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gallery Title</label>
                            <input
                                {...register('gallery.title')}
                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Summer Vacation 2024"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                            <textarea
                                {...register('gallery.description')}
                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Add a brief description..."
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Layout Style</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setValue('gallery.grid_style', 'grid')}
                                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${gridStyle === 'grid' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300 text-slate-600'}`}
                                >
                                    <LayoutGrid className="w-6 h-6" />
                                    <span className="text-sm font-medium">Grid</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setValue('gallery.grid_style', 'carousel')}
                                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${gridStyle === 'carousel' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300 text-slate-600'}`}
                                >
                                    <Columns className="w-6 h-6" />
                                    <span className="text-sm font-medium">Carousel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </AccordionSection>

                {/* 3. Images */}
                <AccordionSection
                    title="Gallery Images"
                    subtitle="Upload and arrange photos"
                    icon={ImageIcon}
                    color="bg-pink-100 text-pink-600"
                    isOpen={openSections.images}
                    onToggle={() => toggleSection('images')}
                >
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-slate-600">
                                {fields.length} Image{fields.length !== 1 ? 's' : ''}
                            </span>
                            <div className="flex gap-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm">
                                    <Plus className="w-4 h-4" />
                                    Upload
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={async (e) => {
                                            const files = e.target.files;
                                            if (files && files.length > 0) {
                                                const filePromises = Array.from(files).map(file =>
                                                    new Promise<{ url: string, caption: string, alt: string }>((resolve) => {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            resolve({
                                                                url: reader.result as string,
                                                                caption: '',
                                                                alt: file.name
                                                            });
                                                        };
                                                        reader.readAsDataURL(file);
                                                    })
                                                );

                                                const newImages = await Promise.all(filePromises);
                                                append(newImages);
                                            }
                                            e.target.value = '';
                                        }}
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={() => append({ url: '', caption: '', alt: '' })}
                                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    Add URL
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {fields.map((field, index) => {
                                const currentUrl = watch(`gallery.images.${index}.url`);
                                const isBase64 = currentUrl?.startsWith('data:');

                                return (
                                    <div
                                        key={field.id}
                                        className="group bg-slate-50 p-4 rounded-xl border border-slate-200 animate-in slide-in-from-bottom-2"
                                    >
                                        <div className="flex gap-3">
                                            {/* Order Controls */}
                                            <div className="flex flex-col gap-1 mt-3">
                                                <button
                                                    type="button"
                                                    onClick={() => index > 0 && move(index, index - 1)}
                                                    disabled={index === 0}
                                                    className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400"
                                                >
                                                    <ArrowUp className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => index < fields.length - 1 && move(index, index + 1)}
                                                    disabled={index === fields.length - 1}
                                                    className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400"
                                                >
                                                    <ArrowDown className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex-1 space-y-3">
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <label className="text-xs font-semibold text-slate-500 uppercase">Image Source</label>
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                            className="text-red-400 hover:text-red-600 transition-colors"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        {isBase64 ? (
                                                            <div className="w-full p-2 text-sm border border-slate-200 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-between">
                                                                <span className="italic">(Uploaded Image Data)</span>
                                                                <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-600">File</span>
                                                            </div>
                                                        ) : (
                                                            <input
                                                                {...register(`gallery.images.${index}.url` as const, { required: true })}
                                                                className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                                placeholder="https://example.com/image.jpg"
                                                            />
                                                        )}
                                                        {isBase64 && (
                                                            <input
                                                                type="hidden"
                                                                {...register(`gallery.images.${index}.url` as const)}
                                                            />
                                                        )}
                                                        {errors.gallery?.images?.[index]?.url && (
                                                            <span className="text-xs text-red-500">URL is required</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <div className="flex-1">
                                                        <input
                                                            {...register(`gallery.images.${index}.caption` as const)}
                                                            className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                            placeholder="Caption (optional)"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Thumbnail Preview */}
                                            {currentUrl && (
                                                <div className="w-20 h-20 bg-white rounded-lg border border-slate-200 overflow-hidden flex-shrink-0 relative">
                                                    <img
                                                        src={currentUrl}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://placehold.co/100?text=Error';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}
