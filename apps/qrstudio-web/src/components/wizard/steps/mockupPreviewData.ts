// Sample data for template hover previews on the create page
// This provides users with a visual preview of each template before selection

export const MOCKUP_PREVIEW_DATA = {
    menu: {
        restaurant_info: {
            name: "Mama's Kitchen",
            description: 'Authentic Tanzanian cuisine & local favorites',
            phone: '+255 7XX XXX XXX',
            website: 'https://example.com',
            logo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop',
            cover_image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        },
        content: {
            categories: [
                {
                    id: 'starters',
                    name: 'Starters',
                    items: [
                        {
                            id: 'sambusa',
                            name: 'Sambusa',
                            description: 'Crispy pastry filled with spiced meat and vegetables',
                            price: 3000,
                            currency: 'TSH' as const,
                            available: true,
                        },
                        {
                            id: 'chips-mayai',
                            name: 'Chips Mayai',
                            description: 'Tanzanian omelette with french fries',
                            price: 5000,
                            currency: 'TSH' as const,
                            available: true,
                        },
                    ],
                },
                {
                    id: 'mains',
                    name: 'Main Dishes',
                    items: [
                        {
                            id: 'ugali-nyama',
                            name: 'Ugali na Nyama Choma',
                            description: 'Grilled meat served with ugali and vegetables',
                            price: 15000,
                            currency: 'TSH' as const,
                            available: true,
                        },
                        {
                            id: 'pilau',
                            name: 'Pilau ya Kuku',
                            description: 'Spiced chicken rice with aromatic flavors',
                            price: 12000,
                            currency: 'TSH' as const,
                            available: true,
                        },
                        {
                            id: 'wali-maharage',
                            name: 'Wali wa Maharage',
                            description: 'Rice with red beans in coconut sauce',
                            price: 8000,
                            currency: 'TSH' as const,
                            available: true,
                        },
                    ],
                },
            ],
        },
        styles: {
            primary_color: '#F97316', // Orange-500
            secondary_color: '#FFF7ED', // Orange-50
            gradient_type: 'none' as const,
            gradient_angle: 135,
        },
    },

    vcard: {
        personal_info: {
            first_name: 'Demo',
            last_name: 'User',
            avatar_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        },
        contact_details: {
            phone: '+255 7XX XXX XXX',
            email: 'user@example.com',
            website: 'https://example.com',
        },
        company_details: {
            company_name: 'TechHub Tanzania',
            job_title: 'Software Developer',
        },
        address: {
            street: 'Masaki Peninsula',
            city: 'Dar es Salaam',
            state: 'Dar es Salaam',
            country: 'Tanzania',
        },
        social_networks: [
            { network: 'linkedin', url: 'https://linkedin.com/in/example-user' },
            { network: 'twitter', url: 'https://twitter.com/example_user' },
            { network: 'github', url: 'https://github.com/example-account' },
            { network: 'whatsapp', url: 'https://wa.me/2557XXXXXXXX' },
        ],
        summary: 'Passionate software developer building innovative tech solutions for East Africa. Specialized in web and mobile app development with 5+ years of experience.',
        styles: {
            primary_color: '#2563EB', // Blue-600
            secondary_color: '#EFF6FF', // Blue-50
        },
    },

    url: {
        url_details: {
            destination_url: 'https://example.com',
            title: 'Safari Bookings Tanzania',
            description: 'Book your dream safari adventure',
        },
        redirect_settings: {
            delay: 3,
            show_preview: true,
            custom_message: '',
        },
        styles: {
            primary_color: '#10B981', // Emerald-500
            secondary_color: '#ECFDF5', // Emerald-50
            gradient_type: 'linear' as const,
            gradient_angle: 135,
        },
    },

    wifi: {
        wifi_details: {
            ssid: 'Cafe Mocha WiFi',
            password: 'mocha2024',
            security: 'WPA2' as const,
            hidden: false,
        },
        network_info: {
            title: 'Cafe Mocha',
            description: 'Premium coffee shop with high-speed internet in Masaki, Dar es Salaam',
            logo: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=200&fit=crop',
        },
        styles: {
            primary_color: '#06B6D4', // Cyan-500
            secondary_color: '#CFFAFE', // Cyan-50
        },
    },

    file: {
        pdf_file: {
            file_name: 'Mama_Kitchen_Menu.pdf',
            file_extension: 'PDF',
            file_category: 'document',
            file_type: 'application/pdf',
            file_size: 245000,
        },
        document_info: {
            title: "Mama's Kitchen Menu",
            topic: 'Restaurant Menu',
            description: 'Full menu with Tanzanian dishes and daily specials',
            author: "Mama's Kitchen",
        },
        styles: {
            primary_color: '#475569', // Slate-600
            secondary_color: '#F1F5F9', // Slate-50
        },
    },

    text: {
        text_content: {
            title: 'Karibu Tanzania!',
            message: 'Karibu sana! Welcome to Tanzania, the land of Kilimanjaro, Serengeti, and Zanzibar.\n\nExperience our rich culture, stunning wildlife, and warm hospitality.\n\nTuonane hivi karibuni! (See you soon!)',
        },
        styles: {
            primary_color: '#9333EA', // Purple-600
            secondary_color: '#FAF5FF', // Purple-50
        },
    },

    event: {
        event_details: {
            title: 'Tech Meetup Dar es Salaam',
            start_date: '2024-12-20',
            end_date: '2024-12-20',
            start_time: '18:00',
            end_time: '21:00',
            timezone: 'Africa/Nairobi',
            location: 'TechHub Tanzania, Masaki Peninsula',
            location_url: 'https://maps.google.com/?q=TechHub+Tanzania',
            all_day: false,
        },
        description: 'Join us for an evening of networking with local tech entrepreneurs and developers. Learn about the latest innovations in East African tech.',
        organizer: {
            name: 'TechHub Tanzania',
            email: 'events@example.com',
        },
        event_url: 'https://example.com',
        reminders: {
            enabled: true,
        },
        styles: {
            primary_color: '#DB2777', // Pink-600
            secondary_color: '#FDF2F8', // Pink-50
        },
    },

    email: {
        email_details: {
            recipient: 'info@example.com',
            subject: 'Safari Inquiry - Serengeti Tour',
            body: 'Hello,\n\nI am interested in booking a 5-day safari tour to Serengeti National Park. Could you please send me more information about available packages and pricing?\n\nAsante sana!',
        },
        additional_recipients: {
            cc: '',
            bcc: '',
        },
        styles: {
            primary_color: '#D97706', // Amber-600
            secondary_color: '#FFFBEB', // Amber-50
        },
    },

    message: {
        platform: 'whatsapp',
        phone_number: '+255 7XX XXX XXX',
        username: '',
        message: 'Habari! I would like to confirm my safari booking for tomorrow at 6 AM. Asante sana!',
        message_only: false,
        styles: {
            primary_color: '#16A34A', // Green-600
            secondary_color: '#F0FDF4', // Green-50
        },
    },

    appstore: {
        app_name: 'TechHub TZ',
        developer: 'TechHub Tanzania',
        description: 'Connect with East Africa\'s tech community. Discover events, network with developers, and stay updated on the latest tech innovations in Tanzania.',
        app_logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop',
        platforms: [
            { platform: 'google_play', url: 'https://play.google.com/store' },
            { platform: 'ios', url: 'https://apps.apple.com' },
        ],
        styles: {
            primary_color: '#4F46E5', // Indigo-600
            secondary_color: '#EEF2FF', // Indigo-50
        },
    },

    socialmedia: {
        display_name: 'Sample Profile',
        bio: 'Software Developer | Tech Enthusiast | Building the future of East African tech 🇹🇿',
        profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        title: 'Connect With Me',
        tagline: 'Follow my journey in tech and innovation across Tanzania',
        gallery_images: [],
        social_links: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/example-user' },
            { platform: 'twitter', url: 'https://twitter.com/example_user' },
            { platform: 'github', url: 'https://github.com/example-account' },
            { platform: 'instagram', url: 'https://instagram.com/example_profile' },
        ],
        styles: {
            primary_color: '#E11D48', // Rose-600
            secondary_color: '#FFF1F2', // Rose-50
        },
    },
};

export type TemplateType = keyof typeof MOCKUP_PREVIEW_DATA;
