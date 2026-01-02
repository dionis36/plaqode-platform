import 'dotenv/config';

export const config = {
    // Server
    port: parseInt(process.env.PORT || '3005'), // Keep port fallback as it's standard for cloud runtimes to provide PORT, but local often defaults

    // Database
    databaseUrl: process.env.DATABASE_URL!,

    // Security
    // Default to relative path for Dev, allow override for Prod
    jwtPublicKeyPath: process.env.JWT_PUBLIC_KEY_PATH || './keys/public.pem',

    // CORS
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || [],
};
