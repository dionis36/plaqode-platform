import Fastify from 'fastify';
import cors from '@fastify/cors';

const server = Fastify({
    logger: true
});

server.register(cors, {
    origin: '*' // TODO: tighten this for production
});

import { authenticate } from './middleware/auth';

server.get('/', async (request, reply) => {
    return { status: 'ok', service: 'marquee-api', version: '0.0.1' };
});

server.get('/protected', { preHandler: [authenticate] }, async (request, reply) => {
    return { status: 'ok', user: request.user };
});

const start = async () => {
    try {
        const port = parseInt(process.env.PORT || '3006');
        await server.listen({ port, host: '0.0.0.0' });
        console.log(`Marquee API listening on port ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
