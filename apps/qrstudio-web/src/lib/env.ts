
export function requireEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const env = {
    // Public URLs
    NEXT_PUBLIC_QRSTUDIO_API_URL: requireEnv('NEXT_PUBLIC_QRSTUDIO_API_URL', process.env.NEXT_PUBLIC_QRSTUDIO_API_URL || process.env.NEXT_PUBLIC_API_URL),
    NEXT_PUBLIC_AUTH_SERVICE_URL: requireEnv('NEXT_PUBLIC_AUTH_SERVICE_URL', process.env.NEXT_PUBLIC_AUTH_SERVICE_URL),

    NEXT_PUBLIC_PLATFORM_URL: requireEnv('NEXT_PUBLIC_PLATFORM_URL', process.env.NEXT_PUBLIC_PLATFORM_URL),
    NEXT_PUBLIC_QRSTUDIO_URL: requireEnv('NEXT_PUBLIC_QRSTUDIO_URL', process.env.NEXT_PUBLIC_QRSTUDIO_URL || process.env.NEXT_PUBLIC_PLATFORM_URL),

    // Analytics (Optional)
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
};
