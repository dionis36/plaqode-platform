import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/jwt.js';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    try {
        const accessToken = request.cookies.access_token;

        if (!accessToken) {
            return reply.status(401).send({
                success: false,
                error: 'Authentication required',
            });
        }

        const payload = verifyToken(accessToken);
        (request as any).user = payload;
    } catch (error) {
        return reply.status(401).send({
            success: false,
            error: 'Invalid or expired token',
        });
    }
}

export function requireRole(role: string) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const user = (request as any).user;

        // Superadmin has access to everything
        if (user?.roles.includes('superadmin')) {
            return;
        }

        // Check for specific role
        if (!user || !user.roles.includes(role)) {
            return reply.status(403).send({
                success: false,
                error: 'Insufficient permissions',
            });
        }
    };
}
