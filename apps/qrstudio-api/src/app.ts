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

async function start() {
    try {
        // Register CORS
        await app.register(cors, {
            origin: true,
            credentials: true,
        });

        // Register cookie plugin (v9 uses CommonJS export)
        await app.register(require('@fastify/cookie'));

        // Register application routes
        await app.register(routes);

        // Start server
        await app.listen({ port: PORT, host: HOST });

        console.log(`🚀 QR Studio API server running at http://${HOST}:${PORT}`);
        console.log(`📋 Routes registered successfully`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();
