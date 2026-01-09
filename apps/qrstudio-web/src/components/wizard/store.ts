import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WizardState {
    step: number;
    type: string | null;
    payload: Record<string, any>;
    design: Record<string, any>;
    editMode: boolean;
    editId: string | null;
    shortcode: string | null;
    qrName: string;

    setStep: (step: number) => void;
    setType: (type: string) => void;
    updatePayload: (data: Record<string, any>) => void;
    updateDesign: (data: Record<string, any>) => void;
    setEditMode: (editId: string | null) => void;
    loadQrData: (qrCode: any) => void;
    reset: () => void;
}

export const useWizardStore = create<WizardState>()(persist((set) => ({
    step: 1,
    type: null,
    editMode: false,
    editId: null,
    shortcode: null,
    qrName: '',
    payload: {
        // Default structure must match, but empty strings
        restaurant_info: { name: '', description: '' },
        content: {
            categories: [], // Empty menu
            language: 'en'
        },
        url_details: { destination_url: '', title: '', description: '', logo: '' },
        // Shared Styles Default
        styles: { primary_color: '#2563EB', secondary_color: '#EFF6FF' }, // Neutral Blue

        // Default structure for VCard
        personal_info: { first_name: '', last_name: '' },
        contact_details: { phone: '', email: '', website: '' },
        company_details: { company_name: '', job_title: '' },
        address: { street: '', city: '', country: '' },
        social_networks: [],

        // New Tools Defaults
        review: {
            google: '',
            yelp: '',
            tripadvisor: '',
            facebook: '',
            custom_label: 'Rate us on Google',
            title: 'We value your feedback',
            description: 'Please select a platform below to leave your review.'
        },
        audio: { title: '', description: '', audio_url: '', cover_image: '' },
        video: { title: '', description: '', video_url: '' },
        business: {
            name: '',
            description: '',
            logo: '',
            banner: '',
            address: '',
            phone: '',
            email: '',
            website: '',
            hours: {
                mon: '9:00 AM - 5:00 PM',
                tue: '9:00 AM - 5:00 PM',
                wed: '9:00 AM - 5:00 PM',
                thu: '9:00 AM - 5:00 PM',
                fri: '9:00 AM - 5:00 PM',
                sat: 'Closed',
                sun: 'Closed'
            },
            social_links: []
        },
        feedback: {
            question: 'How was your experience?',
            email: '',
            logo: '',
            success_message: 'Thank you for your feedback!'
        },
        coupon: { title: '', description: '', code: '', valid_until: '' }
    },
    design: {
        dots: { color: '#000000', style: 'square' },
        background: { color: '#ffffff' },
        cornersSquare: { color: '#000000', style: 'square' },
        cornersDot: { color: '#000000', style: 'square' },
        image: null,
        imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 10 },
        margin: 1
    },

    setStep: (step) => set({ step }),
    setType: (type) => set({ type }),
    updatePayload: (data) => set((state) => {
        // specialized deep merge for nested objects could go here, 
        // but for now simple spread fits most 1-level updates.
        // For deep updates (like modifying specific item in specific category), 
        // components should pass the full new object or use a cleaner action.
        // Simple merge:
        return { payload: { ...state.payload, ...data } };
    }),
    updateDesign: (data) => set((state) => ({
        design: { ...state.design, ...data }
    })),
    setEditMode: (editId) => set({ editMode: !!editId, editId }),
    loadQrData: (qrCode) => set({
        type: qrCode.type,
        payload: qrCode.payload,
        design: qrCode.design,
        editMode: true,
        editId: qrCode.id,
        shortcode: qrCode.shortcode,
        qrName: qrCode.name,
    }),
    reset: () => set({
        step: 1,
        type: null,
        editMode: false,
        editId: null,
        shortcode: null,
        qrName: '',
        payload: {
            restaurant_info: { name: '', description: '' },
            content: {
                categories: [],
                language: 'en'
            },
            url_details: { destination_url: '', title: '', description: '', logo: '' },
            styles: { primary_color: '#2563EB', secondary_color: '#EFF6FF' },
            // Add other reset defaults to match structure if needed, but these are the critical ones for conflict
            personal_info: { first_name: '', last_name: '' },
            contact_details: { phone: '', email: '', website: '' },
            company_details: { company_name: '', job_title: '' },
            address: { street: '', city: '', country: '' },
            social_networks: [],
            // New Tools Defaults
            review: {
                google: '',
                yelp: '',
                tripadvisor: '',
                facebook: '',
                custom_label: 'Rate us on Google',
                title: 'We value your feedback',
                description: 'Please select a platform below to leave your review.'
            },
            audio: { title: '', description: '', audio_url: '', cover_image: '' },
            video: { title: '', description: '', video_url: '' },
            business: {
                name: '',
                description: '',
                logo: '',
                banner: '',
                address: '',
                phone: '',
                email: '',
                website: '',
                hours: {
                    mon: '9:00 AM - 5:00 PM',
                    tue: '9:00 AM - 5:00 PM',
                    wed: '9:00 AM - 5:00 PM',
                    thu: '9:00 AM - 5:00 PM',
                    fri: '9:00 AM - 5:00 PM',
                    sat: 'Closed',
                    sun: 'Closed'
                },
                social_links: []
            },
            feedback: {
                question: 'How was your experience?',
                email: '',
                logo: '',
                success_message: 'Thank you for your feedback!'
            },
            coupon: { title: '', description: '', code: '', valid_until: '' }
        },
        design: {
            dots: { color: '#000000', style: 'square' },
            background: { color: '#ffffff' },
            cornersSquare: { color: '#000000', style: 'square' },
            cornersDot: { color: '#000000', style: 'square' },
            image: null,
            imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 10 },
            margin: 1
        }
    }),
}), {
    name: 'wizard-storage',
    version: 1, // Increment to invalidate old cache with missing keys
    storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
            return localStorage;
        }
        return {
            getItem: () => null,
            setItem: () => { },
            removeItem: () => { },
        };
    }),
}));
