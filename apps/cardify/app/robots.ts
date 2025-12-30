import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/api/'], // Block API routes for Cardify
        },
        sitemap: 'https://cardify.plaqode.com/sitemap.xml',
    }
}
