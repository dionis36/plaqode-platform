import { FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// Load public key from auth-service
// This key is copied from plaqode2/auth-service/keys/public.pem
const publicKeyPath = path.join(__dirname, '../../keys/public.pem');
let publicKey: string;

try {
    publicKey = fs.readFileSync(publicKeyPath, 'utf8');
} catch (error) {
    console.error('Failed to load public key:', error);
    console.error('Make sure to copy public.pem from auth-service to apps/api/keys/');
    throw new Error('Public key not found. Cannot verify JWT tokens.');
}

/**
 * Auth middleware for Plaqode platform integration
 * Verifies JWT token from cookie and extracts user ID
 */
export async function authMiddleware(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        // Get access token from cookie (using type assertion for @fastify/cookie)
        // IMPORTANT: Platform sets cookie as 'access_token' not 'accessToken'!
        const accessToken = (request as any).cookies?.access_token;

        if (!accessToken) {
            return reply.code(401).send({
                error: 'Unauthorized',
                message: 'Authentication required. Please login via Plaqode platform.'
            });
        }

        // Verify JWT with public key
        // Platform JWT payload structure:
        // { sub: 'user-id', email: '...', roles: [...], products: [...] }
        const decoded = jwt.verify(accessToken, publicKey, {
            algorithms: ['RS256']
        }) as { sub: string; email: string; roles: string[]; products: string[] };

        // Attach userId to request for use in handlers
        // Extract from 'sub' field (standard JWT claim for subject/user ID)
        (request as any).userId = decoded.sub;
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return reply.code(401).send({
                error: 'Unauthorized',
                message: 'Invalid or expired token. Please login again.'
            });
        }
        throw error;
    }
}

/**
 * Optional auth middleware - doesn't fail if no token
 * Used for public endpoints that can work with or without auth
 */
export async function optionalAuthMiddleware(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const accessToken = (request as any).cookies?.access_token;

        if (accessToken) {
            const decoded = jwt.verify(accessToken, publicKey, {
                algorithms: ['RS256']
            }) as { sub: string };

            (request as any).userId = decoded.sub;
        }
    } catch (error) {
        // Silently fail for optional auth
        console.warn('Optional auth failed:', error);
    }
}
