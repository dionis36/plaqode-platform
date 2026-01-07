import { FastifyRequest } from 'fastify';

/**
 * Extract the client IP Address from the request.
 * Prioritizes Fly.io headers and standard X-Forwarded-For.
 */
export function getClientIp(request: FastifyRequest): string {
    // 1. Try Fly-Client-IP (Fly.io specific)
    const flyIp = request.headers['fly-client-ip'];
    if (flyIp && typeof flyIp === 'string') {
        return flyIp;
    }

    // 2. Try X-Forwarded-For (Standard Proxy)
    const xForwardedFor = request.headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ips = Array.isArray(xForwardedFor) ? xForwardedFor : xForwardedFor.split(',');
        // Return the first IP in the list (client IP)
        return ips[0].trim();
    }

    // 3. Fallback to direct connection IP
    return request.ip;
}
