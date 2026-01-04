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
            origin: true, // strict CORS handled by middleware or internal logic if needed
            credentials: true,
        });

        // Register cookie plugin
        await app.register(require('@fastify/cookie'));

        // Register application routes
        await app.register(routes);

        // Start server
        // Listen on all interfaces (0.0.0.0) for Fly.io
        await app.listen({
            port: PORT,
            host: '0.0.0.0'
        });

        console.log(`🚀 QR Studio API server running at http://${HOST}:${PORT}`);
        console.log(`📋 Routes registered successfully`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();
