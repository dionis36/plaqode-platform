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

// Register plugins
await app.register(cors, {
    origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3004'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

await app.register(cookie);

// Health check
app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});

// Register routes
await authRoutes(app);
await adminRoutes(app);
await app.register(designRoutes, { prefix: '/api' });

// Start server
const start = async () => {
    try {
        await app.listen({ port: config.port, host: '0.0.0.0' });
        console.log(`🚀 Auth service running on http://localhost:${config.port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
