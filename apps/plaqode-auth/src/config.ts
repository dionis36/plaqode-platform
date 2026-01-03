import { env } from './lib/env.js';

export const config = {
    // Server
    port: parseInt(env.PORT),
    nodeEnv: env.NODE_ENV,

    // Database
    databaseUrl: env.DATABASE_URL,

    // JWT
    jwtPrivateKeyPath: env.JWT_PRIVATE_KEY_PATH,
    jwtPublicKeyPath: env.JWT_PUBLIC_KEY_PATH,
    jwtAccessTokenExpiry: env.JWT_ACCESS_TOKEN_EXPIRY,
    jwtRefreshTokenExpiry: env.JWT_REFRESH_TOKEN_EXPIRY,

    // Cookie
    cookieDomain: env.COOKIE_DOMAIN,
    cookieSecure: env.COOKIE_SECURE,

    // CORS
    allowedOrigins: env.ALLOWED_ORIGINS,

    // Rate Limiting
    rateLimitMax: parseInt(env.RATE_LIMIT_MAX),
    rateLimitWindow: env.RATE_LIMIT_WINDOW,
};

