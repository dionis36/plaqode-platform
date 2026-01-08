export function requireEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

const isServer = typeof window === 'undefined';

export const env = {
    // Public URLs
    NEXT_PUBLIC_QRSTUDIO_API_URL: requireEnv('NEXT_PUBLIC_QRSTUDIO_API_URL', process.env.NEXT_PUBLIC_QRSTUDIO_API_URL),
    NEXT_PUBLIC_AUTH_SERVICE_URL: requireEnv('NEXT_PUBLIC_AUTH_SERVICE_URL', process.env.NEXT_PUBLIC_AUTH_SERVICE_URL),
    NEXT_PUBLIC_APP_URL: requireEnv('NEXT_PUBLIC_APP_URL', process.env.NEXT_PUBLIC_APP_URL),
    NEXT_PUBLIC_CARDIFY_URL: requireEnv('NEXT_PUBLIC_CARDIFY_URL', process.env.NEXT_PUBLIC_CARDIFY_URL),
    NEXT_PUBLIC_QRSTUDIO_URL: requireEnv('NEXT_PUBLIC_QRSTUDIO_URL', process.env.NEXT_PUBLIC_QRSTUDIO_URL),

    // Internal URLs (Server Side)
    AUTH_SERVICE_INTERNAL_URL: process.env.AUTH_SERVICE_INTERNAL_URL || process.env.NEXT_PUBLIC_AUTH_SERVICE_URL, // Fallback to public if internal not set

    // Configuration
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || 'localhost', // Default allowable for stricter cookies, but ideally verified
    NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS: (process.env.NEXT_PUBLIC_ALLOWED_REDIRECT_HOSTS || '').split(',').map(h => h.trim()).filter(Boolean),

    // Analytics (Optional)
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,

    // Server-Side Secrets (Only validate on server)
    RESEND_API_KEY: isServer ? process.env.RESEND_API_KEY : undefined,
    EMAIL_FROM: isServer ? (process.env.EMAIL_FROM || 'Plaqode <noreply@plaqode.com>') : undefined,
    CONTACT_EMAIL_TO: isServer ? (process.env.CONTACT_EMAIL_TO || 'nasuwadio36@gmail.com') : undefined,
};
