export function requireEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const env = {
    // We pass the process.env value explicitly to allow Next.js bundler to inline it
    NEXT_PUBLIC_PLATFORM_URL: requireEnv('NEXT_PUBLIC_PLATFORM_URL', process.env.NEXT_PUBLIC_PLATFORM_URL),
    NEXT_PUBLIC_AUTH_SERVICE_URL: requireEnv('NEXT_PUBLIC_AUTH_SERVICE_URL', process.env.NEXT_PUBLIC_AUTH_SERVICE_URL),
};
