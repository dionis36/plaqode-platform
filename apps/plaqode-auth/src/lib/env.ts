import 'dotenv/config';

function requireEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const env = {
    // Server
    PORT: process.env.PORT || '3003',
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Database
    DATABASE_URL: requireEnv('DATABASE_URL', process.env.DATABASE_URL),

    // JWT
    JWT_PRIVATE_KEY_PATH: requireEnv('JWT_PRIVATE_KEY_PATH', process.env.JWT_PRIVATE_KEY_PATH),
    JWT_PUBLIC_KEY_PATH: requireEnv('JWT_PUBLIC_KEY_PATH', process.env.JWT_PUBLIC_KEY_PATH),
    JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY || '15m',
    JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d',

    // Cookie
    COOKIE_DOMAIN: requireEnv('COOKIE_DOMAIN', process.env.COOKIE_DOMAIN),
    COOKIE_SECURE: process.env.COOKIE_SECURE === 'true',

    // CORS
    ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean),

    // Rate Limiting
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || '100',
    RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || '15m',

    // Services
    RESEND_API_KEY: requireEnv('RESEND_API_KEY', process.env.RESEND_API_KEY),
    WEB_URL: requireEnv('WEB_URL', process.env.WEB_URL),
    EMAIL_FROM: process.env.EMAIL_FROM || 'Plaqode <support@plaqode.com>',
};
