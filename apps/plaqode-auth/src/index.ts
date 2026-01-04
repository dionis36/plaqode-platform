import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { config } from './config.js';
import { authRoutes } from './routes/auth.js';
import { adminRoutes } from './routes/admin.js';
import designRoutes from './routes/designs.js';

const app = Fastify({
    logger: {
        level: config.nodeEnv === 'development' ? 'info' : 'warn',
    },
});

// 1. Immediate Health Check (Zero dependencies)
app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});

console.log('🔒 CORS Allowed Origins:', config.allowedOrigins);
console.log('🍪 Cookie Domain:', config.cookieDomain);

// Register plugins
await app.register(cors, {
    origin: config.allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

await app.register(cookie);

// Register routes
await authRoutes(app);
await adminRoutes(app);
await app.register(designRoutes, { prefix: '/api' });

// Start server
const start = async () => {
    try {
        // Listen on all interfaces (0.0.0.0) for Fly.io
        await app.listen({ port: config.port, host: '0.0.0.0' });
        console.log(`🚀 Auth service running on http://localhost:${config.port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
