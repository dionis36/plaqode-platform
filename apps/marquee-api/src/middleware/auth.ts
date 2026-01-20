import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            userId: string;
            email: string;
            role: string;
        };
    }
}

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];

        // In a real scenario, this secret should come from env, and we should verify using public key if asymmetric
        // For local dev with plaqode-auth, we might need the shared secret or public key.
        // Assuming symmetric for MVP simplicity or configured public key path.
        const secret = process.env.JWT_SECRET || 'secret';

        const decoded = jwt.verify(token, secret) as any;
        request.user = decoded;
    } catch (err) {
        reply.code(401).send({ error: 'Invalid token' });
    }
};
