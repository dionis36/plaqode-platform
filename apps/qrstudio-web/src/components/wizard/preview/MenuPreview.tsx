import { Utensils, MapPin, Clock, Phone, Globe } from 'lucide-react';
import { useEffect } from 'react';
import { usePreviewContext } from './PreviewContext';
import { HOVER_PREVIEW_DATA } from '../steps/hoverPreviewData';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    currency?: 'USD' | 'TSH';
    available?: boolean;
}

interface MenuCategory {
    id: string;
    name: string;
    items: MenuItem[];
}

interface MenuData {
    restaurant_info?: {
        name?: string;
        description?: string;
        website?: string;
        phone?: string;
        logo?: string;
        cover_image?: string;
    };
    content?: {
        categories?: MenuCategory[];
    };
    styles?: {
        primary_color?: string;
        secondary_color?: string;
        gradient_type?: 'none' | 'linear' | 'radial';
        gradient_angle?: number;
    };
}

export function MenuPreview({ data }: { data: MenuData }) {
    const fallback = HOVER_PREVIEW_DATA.menu;

    // Check if user has started entering ANY content
    const hasUserInput =
        (data?.restaurant_info?.name || '') !== '' ||
        (data?.restaurant_info?.description || '') !== '' ||
        (data?.restaurant_info?.website || '') !== '' ||
        (data?.restaurant_info?.phone || '') !== '' ||
        (data?.restaurant_info?.logo || '') !== '' ||
        (data?.restaurant_info?.cover_image || '') !== '' ||
        (data?.content?.categories && data.content.categories.length > 0);

    const activeData = hasUserInput ? data : fallback;

    // Fallback logic for Restaurant Info
    const info = {
        name: activeData.restaurant_info?.name || (hasUserInput ? '' : fallback.restaurant_info.name),
        description: activeData.restaurant_info?.description || (hasUserInput ? '' : fallback.restaurant_info.description),
        website: activeData.restaurant_info?.website || (hasUserInput ? '' : fallback.restaurant_info.website),
        phone: activeData.restaurant_info?.phone || (hasUserInput ? '' : fallback.restaurant_info.phone),
        logo: activeData.restaurant_info?.logo || (hasUserInput ? '' : null),
        cover_image: activeData.restaurant_info?.cover_image || (hasUserInput ? '' : null)
    };

    // Fallback logic for Categories
    // If we have categories but the first one has no items and default name, it might be the initial state.
    // But simplified check: if array is empty? 
    // The store initializes with one category "Starters" and one item "Garlic Bread".
    // So if it matches the exact store default, maybe we want to keep it?
    // Actually, user wants the "Preview Placeholders". 
    // The store default IS a placeholder but a boring one.
    // The hover data has "Mama's Kitchen" with many items.
    // Let's replace the content if it looks "default" (single category, default ID/name)? 
    // OR just use hover data if completely empty.
    // Since the store initializes with SOME data, simply checking length might not trigger fallback.
    // However, the user said "disappear as user starts inputting".
    // If we just override the store default, the user sees Mama's Kitchen.
    // As soon as they edit the name of the restaurant, `info.name` changes.
    // For categories, if they add a new item, the array changes.
    // Let's try to detect "is basically empty/default".

    // Store default for comparison:
    // categories: [{ id: 'cat_1', name: 'Starters', items: [{...Garlic Bread...}] }]

    // If we want the FULL rich preview initially, we should probably prefer the fallback 
    // UNLESS the user has made deliberate changes.
    // Detecting "deliberate changes" is hard without a dirty flag.
    // But checking for the exact default string "Starters" / "Garlic Bread" is risky if they actually want that.

    // Compromise: The user specifically asked for the SAME preview placeholders.
    // The create page preview uses `HOVER_PREVIEW_DATA.menu`.
    // That data has "Starters", "Main Dishes" etc.
    // If I just swap the default store initialization to match HOVER_PREVIEW_DATA, that would be cleaner?
    // But the request is about the *Page* showing placeholders.
    // If I change `MenuPreview` to ignore the props if they match the store default?

    // Let's stick to the pattern:
    // If `data.content.categories` is empty OR (length=1 and items=empty/default?), unlikely.
    // The store initializes with "Garlic Bread".
    // If I use the fallback here whenever `data.content.categories` is falsy, it won't trigger because store has data.

    // Let's look at `info` first. `info.name` defaults to "".
    // So `info.name || fallback.name` works perfectly.

    // For categories, it's tricker. 
    // If `categories` comes from props, and it has the "Garlic Bread" item, that IS the user's current data (from the wizard store default).
    // If I overwrite it, I lose the ability to see the "Garlic Bread" item if that's what is there.
    // FAILURE CASE: The user actively deletes "Garlic Bread". Now categories is empty (or category has no items).
    // Then we show fallback? That might be annoying ("I deleted it, why is it back?").
    // BUT this is a "Mockup" that disappears as you input.
    // Maybe best approach for complex lists: 
    // If the list is empty, show fallback.
    // The store initializes with items, so initially it WON'T show fallback.
    // This deviates from "same preview placeholders".

    // HYPOTHESIS: The user thinks the "Garlic Bread" default is boring/placeholder and wants "Mama's Kitchen".
    // "placeholder details that disappear as the user starts inputting"

    // If I change the Store initialization to be empty?
    // Then `categories` would be empty, and I can fallback to `HOVER_PREVIEW_DATA`.
    // But changing Store affects the Form too? (User sees empty form).
    // The user might want the form to be empty so they can Type?
    // "disappear as the user starts inputting their content"
    // This implies the form is empty, but the preview is full.
    // Currently, the form likely pre-fills "Garlic Bread".

    // Let's assume for `MenuPreview`, `categories` fallback is only if array is empty.
    // And for `info`, fallback if strings are empty.

    // Wait, if the user starts with "Garlic Bread", they have to delete it.
    // If I just prioritize the fallback logic for the top-level info, that's a huge win.
    // For the list, maybe I should leave it as is if it has items? 
    // The user explicitly said "change the template content pages with the same preview placeholder contents".

    // Decided: I will use fallback for `categories` ONLY if it is empty. 
    // AND I will check if the store default (Garlic Bread) is considered "placeholder" to be replaced?
    // No, that's too magic.
    // I will stick to: if `info.name` is empty => show fallback name.
    // For categories, if `categories.length === 0` => show fallback categories.
    // (Note: `store.ts` initializes with data, so this might not trigger for categories unless user deletes all).
    // However, VCard initialization was empty strings, so it works great there.
    // Menu initialization has data.

    // Let's proceed with standard fallback logic.
    const categories = (activeData.content?.categories && activeData.content.categories.length > 0)
        ? activeData.content.categories
        : (hasUserInput ? [] : fallback.content.categories);

    const primaryColor = data.styles?.primary_color || '#f97316';
    const secondaryColor = data.styles?.secondary_color || '#FFF7ED';
    const { setHeroBackgroundColor } = usePreviewContext();

    // Helper to lighten a color
    const lightenColor = (hex: string, percent: number = 30) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, (num >> 16) + Math.round(((255 - (num >> 16)) * percent) / 100));
        const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(((255 - ((num >> 8) & 0x00FF)) * percent) / 100));
        const b = Math.min(255, (num & 0x0000FF) + Math.round(((255 - (num & 0x0000FF)) * percent) / 100));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    const lightPrimary = lightenColor(primaryColor, 95);

    // Set hero background color for status bar adaptation
    useEffect(() => {
        // Menu has dark hero if cover image (with dark overlay), otherwise use primary color
        const heroColor = info.cover_image ? '#000000' : primaryColor;
        setHeroBackgroundColor(heroColor);
    }, [info.cover_image, primaryColor, setHeroBackgroundColor]);

    return (
        <div
            className="absolute inset-0 w-full h-full flex flex-col overflow-y-auto"
            style={{
                backgroundColor: secondaryColor || '#F1F5F9',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE/Edge
            }}
        >
            {/* Hide scrollbar */}
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            {/* Hero Banner - Taller with Better Content Spacing */}
            <div className="h-72 bg-gray-200 relative shrink-0">
                {info.cover_image ? (
                    <img
                        src={info.cover_image}
                        alt="Restaurant Cover"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div
                        className="w-full h-full"
                        style={{
                            background: data.styles?.gradient_type === 'linear'
                                ? `linear-gradient(${data.styles.gradient_angle || 135}deg, ${primaryColor}, ${secondaryColor})`
                                : data.styles?.gradient_type === 'radial'
                                    ? `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`
                                    : `linear-gradient(180deg, ${primaryColor} 0%, ${lightenColor(primaryColor, 30)} 100%)` // Subtle gradient default
                        }}
                    />
                )}
                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-0 left-0 w-full px-5 pt-5 pb-14 text-white">
                    <div className="flex items-center gap-3">
                        {info.logo && (
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white shrink-0">
                                <img
                                    src={info.logo}
                                    alt="Restaurant Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold leading-tight shadow-sm">{info.name || (hasUserInput ? '' : 'Restaurant Name')}</h1>
                            <p className="text-sm opacity-90 mt-1 line-clamp-2">{info.description || (hasUserInput ? '' : 'Tasty food served with love.')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area with Rounded Top */}
            <div
                className="flex-1 rounded-t-3xl -mt-8 relative z-10"
                style={{ backgroundColor: secondaryColor || '#F1F5F9' }}
            >
                {/* Info Bar - Blends with content area */}
                <div
                    className="px-4 py-3 flex gap-4 border-b border-gray-200 sticky top-0 z-10 shadow-sm overflow-x-auto no-scrollbar rounded-t-3xl"
                    style={{ backgroundColor: secondaryColor || '#F1F5F9' }}
                >
                    {info.phone && (
                        <a href={`tel:${info.phone}`} className="flex items-center gap-1.5 text-xs text-gray-600 whitespace-nowrap hover:opacity-80 transition-opacity">
                            <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                            <span>Call</span>
                        </a>
                    )}
                    {info.website && (
                        <a href={info.website} target="_blank" className="flex items-center gap-1.5 text-xs text-gray-600 whitespace-nowrap hover:opacity-80 transition-opacity">
                            <Globe className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                            <span>Website</span>
                        </a>
                    )}
                </div>

                {/* Categories & Items */}
                <div className="p-4 space-y-8">
                    {categories.length === 0 && (
                        <div className="text-center py-10 text-gray-400 text-sm">
                            Add categories and items to see them here.
                        </div>
                    )}

                    {categories.map((category) => (
                        <div key={category.id} className="scroll-mt-20">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
                                {category.name || 'Category'}
                                <span className="h-px bg-gray-100 flex-1"></span>
                            </h3>

                            <div className="space-y-4">
                                {category.items?.map((item) => {
                                    const isAvailable = item.available !== false; // Default to true if not specified
                                    const currencySymbol = item.currency === 'TSH' ? 'TSh' : '$';

                                    return (
                                        <div key={item.id} className={`flex gap-3 items-start ${!isAvailable ? 'opacity-50' : ''}`}>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-sm text-gray-900">{item.name || 'Item Name'}</h4>
                                                        {!isAvailable && (
                                                            <span
                                                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                                                                style={{
                                                                    backgroundColor: lightenColor('#EF4444', 95),
                                                                    color: '#DC2626',
                                                                    borderColor: lightenColor('#EF4444', 85)
                                                                }}
                                                            >
                                                                Unavailable
                                                            </span>
                                                        )}
                                                    </div>
                                                    {item.price ? (
                                                        <span className="font-semibold text-sm whitespace-nowrap" style={{ color: isAvailable ? primaryColor : '#9ca3af' }}>
                                                            {currencySymbol} {Number(item.price).toFixed(2)}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                {item.description && (
                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {(!category.items || category.items.length === 0) && (
                                    <p className="text-xs text-gray-300 italic">No items yet</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Branding - Always at Bottom */}
            <div
                className="pb-6 text-center"
                style={{ backgroundColor: secondaryColor || '#F1F5F9' }}
            >
                <p className="text-xs text-slate-600">
                    Powered by <span className="font-semibold">QR Studio</span>
                </p>
            </div>
        </div>
    );
}
