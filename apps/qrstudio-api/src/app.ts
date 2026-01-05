import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from './config';
import { routes } from './routes';

const PORT = config.port;
const HOST = config.host;

// Create Fastify instance
const app = Fastify({
    logger: true,
});

// 1. Immediate Health Check (Zero dependencies)
app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});

async function start() {
    try {
        // Register CORS
        await app.register(cors, {
            origin: config.allowedOrigins, // Explicit whitelist from env
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        });

        // Register cookie plugin
        await app.register(require('@fastify/cookie'));

        // 2. Register Routes & DB Logic (Async loading)
        console.log('⏳ Loading routes...');
        await app.register(routes);
        console.log(`✅ Routes registered successfully`);

        // 3. Open Port
        await app.listen({
            port: PORT,
            host: '0.0.0.0'
        });
        console.log(`🚀 QR Studio API server listening at http://${HOST}:${PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();
