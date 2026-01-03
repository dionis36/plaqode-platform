
import 'dotenv/config';

export function requireEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const env = {
    // System
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Server
    PORT: parseInt(process.env.PORT || '3005', 10),
    HOST: process.env.HOST || '0.0.0.0',

    // Database
    DATABASE_URL: requireEnv('DATABASE_URL', process.env.DATABASE_URL),

    // Security
    // Default to relative path for Dev, allow override for Prod
    JWT_PUBLIC_KEY_PATH: process.env.JWT_PUBLIC_KEY_PATH || './keys/public.pem',

    // CORS
    ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean),

    // URLs
    FRONTEND_URL: requireEnv('FRONTEND_URL', process.env.FRONTEND_URL),
};
