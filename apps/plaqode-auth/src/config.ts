import 'dotenv/config';

export const config = {
    // Server
    port: parseInt(process.env.PORT || '3003'),
    nodeEnv: process.env.NODE_ENV || 'development',

    // Database
    databaseUrl: process.env.DATABASE_URL!,

    // JWT
    jwtPrivateKeyPath: process.env.JWT_PRIVATE_KEY_PATH!,
    jwtPublicKeyPath: process.env.JWT_PUBLIC_KEY_PATH!,
    jwtAccessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY || '15m',
    jwtRefreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d',

    // Cookie
    cookieDomain: process.env.COOKIE_DOMAIN!,
    cookieSecure: process.env.COOKIE_SECURE === 'true',

    // CORS
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || [],

    // Rate Limiting
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    rateLimitWindow: process.env.RATE_LIMIT_WINDOW || '15m',
};
