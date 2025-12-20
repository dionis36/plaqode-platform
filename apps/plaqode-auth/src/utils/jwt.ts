import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { config } from '../config.js';

// Load RSA keys
const privateKey = readFileSync(config.jwtPrivateKeyPath, 'utf8');
const publicKey = readFileSync(config.jwtPublicKeyPath, 'utf8');

export interface JWTPayload {
    sub: string; // user ID
    email: string;
    roles: string[];
    products: string[];
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

/**
 * Generate JWT access token
 */
export function generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: config.jwtAccessTokenExpiry,
    } as jwt.SignOptions);
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(userId: string): string {
    return jwt.sign({ sub: userId }, privateKey, {
        algorithm: 'RS256',
        expiresIn: config.jwtRefreshTokenExpiry,
    } as jwt.SignOptions);
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload {
    try {
        const decoded = jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
        }) as JWTPayload;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

/**
 * Get public key for external services
 */
export function getPublicKey(): string {
    return publicKey;
}

/**
 * Generate both access and refresh tokens
 */
export function generateTokenPair(payload: JWTPayload): TokenPair {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload.sub),
    };
}
