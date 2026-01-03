import { env } from './lib/env';

export const config = {
    // Server
    port: env.PORT,
    host: env.HOST,

    // Database
    databaseUrl: env.DATABASE_URL,

    // Security
    jwtPublicKeyPath: env.JWT_PUBLIC_KEY_PATH,

    // CORS
    allowedOrigins: env.ALLOWED_ORIGINS,

    // URLs
    frontendUrl: env.FRONTEND_URL,
};
