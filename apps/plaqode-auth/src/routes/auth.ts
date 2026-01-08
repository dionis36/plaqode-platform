import { FastifyInstance } from 'fastify';
import { prisma } from '../db.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { generateTokenPair, verifyToken, getPublicKey } from '../utils/jwt.js';
import { signupSchema, loginSchema } from '../schemas/auth.js';
import { config } from '../config.js';
import { authMiddleware } from '../middleware/auth.js';
import { Resend } from 'resend';
import crypto from 'crypto';
import { z } from 'zod';

import { env } from '../lib/env.js';

const resend = new Resend(env.RESEND_API_KEY);
const WEB_URL = env.WEB_URL;

const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

const resetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(8),
});
export async function authRoutes(app: FastifyInstance) {
    // POST /auth/signup - User registration
    app.post('/auth/signup', async (request, reply) => {
        try {
            const body = signupSchema.parse(request.body);

            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email: body.email },
            });

            if (existingUser) {
                return reply.status(400).send({
                    success: false,
                    error: 'User with this email already exists',
                });
            }

            // Hash password
            const passwordHash = await hashPassword(body.password);

            // Create user
            const user = await prisma.user.create({
                data: {
                    email: body.email,
                    name: body.name,
                    passwordHash,
                },
            });

            // Assign default "user" role
            const userRole = await prisma.role.findUnique({
                where: { name: 'user' },
            });

            if (userRole) {
                await prisma.userRole.create({
                    data: {
                        userId: user.id,
                        roleId: userRole.id,
                    },
                });
            }

            // Auto-grant access to all products for new users
            const allProducts = ['cardify', 'qrstudio'];
            await prisma.productAccess.createMany({
                data: allProducts.map(product => ({
                    userId: user.id,
                    product,  // Use 'product' to match schema
                })),
            });

            // Generate tokens with products included
            const tokens = generateTokenPair({
                sub: user.id,
                email: user.email,
                roles: ['user'],
                products: allProducts, // Include products in JWT
            });

            // Store refresh token
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

            await prisma.refreshToken.create({
                data: {
                    userId: user.id,
                    token: tokens.refreshToken,
                    expiresAt,
                },
            });

            // Set cookies
            reply
                .setCookie('access_token', tokens.accessToken, {
                    httpOnly: true,
                    secure: config.cookieSecure,
                    sameSite: 'none',
                    domain: config.cookieDomain,
                    path: '/',
                    maxAge: 15 * 60, // 15 minutes
                })
                .setCookie('refresh_token', tokens.refreshToken, {
                    httpOnly: true,
                    secure: config.cookieSecure,
                    sameSite: 'none',
                    domain: config.cookieDomain,
                    path: '/',
                    maxAge: 7 * 24 * 60 * 60, // 7 days
                });

            return reply.status(201).send({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return reply.status(400).send({
                    success: false,
                    error: 'Validation error',
                    details: error.errors,
                });
            }

            console.error('Signup error:', error);
            return reply.status(500).send({
                success: false,
                error: 'Internal server error',
            });
        }
    });

    // POST /auth/login - User login
    app.post('/auth/login', async (request, reply) => {
        try {
            const body = loginSchema.parse(request.body);

            // Find user
            const user = await prisma.user.findUnique({
                where: { email: body.email },
                include: {
                    roles: {
                        include: {
                            role: true,
                        },
                    },
                    productAccess: true,
                },
            });

            if (!user) {
                return reply.status(401).send({
                    success: false,
                    error: 'Invalid email or password',
                });
            }

            // Verify password
            const isValid = await verifyPassword(body.password, user.passwordHash);

            if (!isValid) {
                return reply.status(401).send({
                    success: false,
                    error: 'Invalid email or password',
                });
            }

            // Extract roles and products
            const roles = user.roles.map((ur: any) => ur.role.name);
            const products = user.productAccess.map((pa: any) => pa.product);

            // Generate tokens
            const tokens = generateTokenPair({
                sub: user.id,
                email: user.email,
                roles,
                products,
            });

            // Store refresh token
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);

            await prisma.refreshToken.create({
                data: {
                    userId: user.id,
                    token: tokens.refreshToken,
                    expiresAt,
                },
            });

            // Set cookies
            reply
                .setCookie('access_token', tokens.accessToken, {
                    httpOnly: true,
                    secure: config.cookieSecure,
                    sameSite: 'none',
                    domain: config.cookieDomain,
                    path: '/',
                    maxAge: 15 * 60,
                })
                .setCookie('refresh_token', tokens.refreshToken, {
                    httpOnly: true,
                    secure: config.cookieSecure,
                    sameSite: 'none',
                    domain: config.cookieDomain,
                    path: '/',
                    maxAge: 7 * 24 * 60 * 60,
                });

            return reply.send({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    roles,
                    products,
                },
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return reply.status(400).send({
                    success: false,
                    error: 'Validation error',
                    details: error.errors,
                });
            }

            console.error('Login error:', error);
            return reply.status(500).send({
                success: false,
                error: 'Internal server error',
            });
        }
    });

    // POST /auth/logout - User logout
    app.post('/auth/logout', async (request, reply) => {
        try {
            const refreshToken = request.cookies.refresh_token;

            if (refreshToken) {
                // Delete refresh token from database
                await prisma.refreshToken.deleteMany({
                    where: { token: refreshToken },
                });
            }

            // Clear cookies
            reply
                .clearCookie('access_token', {
                    domain: config.cookieDomain,
                    path: '/',
                })
                .clearCookie('refresh_token', {
                    domain: config.cookieDomain,
                    path: '/',
                });

            return reply.send({
                success: true,
                message: 'Logged out successfully',
            });
        } catch (error) {
            console.error('Logout error:', error);
            return reply.status(500).send({
                success: false,
                error: 'Internal server error',
            });
        }
    });

    // POST /auth/refresh - Refresh access token
    app.post('/auth/refresh', async (request, reply) => {
        try {
            const refreshToken = request.cookies.refresh_token;

            if (!refreshToken) {
                return reply.status(401).send({
                    success: false,
                    error: 'Refresh token required',
                });
            }

            // Verify refresh token
            verifyToken(refreshToken);

            // Check if token exists in database
            const storedToken = await prisma.refreshToken.findUnique({
                where: { token: refreshToken },
                include: {
                    user: {
                        include: {
                            roles: {
                                include: {
                                    role: true,
                                },
                            },
                            productAccess: true,
                        },
                    },
                },
            });

            if (!storedToken || storedToken.expiresAt < new Date()) {
                return reply.status(401).send({
                    success: false,
                    error: 'Invalid or expired refresh token',
                });
            }

            // Extract roles and products
            const roles = storedToken.user.roles.map((ur: any) => ur.role.name);
            const products = storedToken.user.productAccess.map((pa: any) => pa.product);

            // Generate new tokens
            const tokens = generateTokenPair({
                sub: storedToken.user.id,
                email: storedToken.user.email,
                roles,
                products,
            });

            // Delete old refresh token
            await prisma.refreshToken.delete({
                where: { token: refreshToken },
            });

            // Store new refresh token
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);

            await prisma.refreshToken.create({
                data: {
                    userId: storedToken.user.id,
                    token: tokens.refreshToken,
                    expiresAt,
                },
            });

            // Set new cookies
            reply
                .setCookie('access_token', tokens.accessToken, {
                    httpOnly: true,
                    secure: config.cookieSecure,
                    sameSite: 'none',
                    domain: config.cookieDomain,
                    path: '/',
                    maxAge: 15 * 60,
                })
                .setCookie('refresh_token', tokens.refreshToken, {
                    httpOnly: true,
                    secure: config.cookieSecure,
                    sameSite: 'none',
                    domain: config.cookieDomain,
                    path: '/',
                    maxAge: 7 * 24 * 60 * 60,
                });

            return reply.send({
                success: true,
                message: 'Token refreshed successfully',
            });
        } catch (error) {
            console.error('Refresh error:', error);
            return reply.status(401).send({
                success: false,
                error: 'Invalid refresh token',
            });
        }
    });

    // GET /auth/me - Get current user
    app.get('/auth/me', { preHandler: authMiddleware }, async (request, reply) => {
        try {
            const user = (request as any).user;

            const dbUser = await prisma.user.findUnique({
                where: { id: user.sub },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    createdAt: true,
                },
            });

            if (!dbUser) {
                return reply.status(404).send({
                    success: false,
                    error: 'User not found',
                });
            }

            return reply.send({
                success: true,
                user: {
                    ...dbUser,
                    roles: user.roles,
                    products: user.products,
                },
            });
        } catch (error) {
            console.error('Get user error:', error);
            return reply.status(500).send({
                success: false,
                error: 'Internal server error',
            });
        }
    });

    // PUT /auth/profile - Update user profile
    app.put('/auth/profile', {
        preHandler: [authMiddleware],
    }, async (request, reply) => {
        try {
            const user = (request as any).user;
            const { name } = request.body as { name?: string };

            const updatedUser = await prisma.user.update({
                where: { id: user.sub },
                data: { name },
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            });

            return reply.send({
                success: true,
                user: updatedUser,
            });
        } catch (error) {
            console.error('Profile update error:', error);
            return reply.status(500).send({
                success: false,
                error: 'Failed to update profile',
            });
        }
    });

    // GET /auth/public-key - Get JWT public key
    app.get('/auth/public-key', async (_request, reply) => {
        return reply.send({
            success: true,
            publicKey: getPublicKey(),
        });
    });
    // POST /auth/forgot-password
    app.post('/auth/forgot-password', async (request, reply) => {
        try {
            const { email } = forgotPasswordSchema.parse(request.body);

            // Generic response to prevent enumeration
            const genericResponse = {
                success: true,
                message: 'If an account exists for this email, you will receive a reset link shortly.',
            };

            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                console.log(`[Forgot Password] User not found for email: ${email}`);
                return reply.send(genericResponse);
            }

            console.log(`[Forgot Password] User found: ${user.id}. Generating token...`);

            // Generate secure token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

            // Store in DB (expires in 30 mins)
            const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

            await prisma.resetToken.create({
                data: {
                    userId: user.id,
                    tokenHash,
                    expiresAt,
                },
            });

            // Send Email
            const resetLink = `${WEB_URL}/auth/reset-password?token=${resetToken}`;
            const emailFrom = env.EMAIL_FROM;

            console.log(`[Forgot Password] Sending email to ${email} from ${emailFrom}`);

            await resend.emails.send({
                from: emailFrom,
                to: email,
                subject: 'Reset your password',
                html: `
                    <h1>Reset your password</h1>
                    <p>Click the link below to reset your password. This link expires in 30 minutes.</p>
                    <a href="${resetLink}">Reset Password</a>
                    <p>If you didn't request this, please ignore this email.</p>
                `,
            });

            console.log(`[Forgot Password] Email sent successfully.`);

            return reply.send(genericResponse);

        } catch (error: any) {
            console.error('Forgot password error:', error);
            if (error instanceof z.ZodError) {
                return reply.status(400).send({ success: false, error: 'Invalid email format' });
            }
            // Return generic success even on internal error to avoid leaking info, or generic 500
            return reply.status(500).send({ success: false, error: 'Internal server error' });
        }
    });

    // POST /auth/reset-password
    app.post('/auth/reset-password', async (request, reply) => {
        try {
            const { token, password } = resetPasswordSchema.parse(request.body);

            const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

            const storedToken = await prisma.resetToken.findUnique({
                where: { tokenHash },
                include: { user: true },
            });

            if (!storedToken || storedToken.expiresAt < new Date()) {
                // Delete expired token if found
                if (storedToken) {
                    await prisma.resetToken.delete({ where: { id: storedToken.id } });
                }
                return reply.status(400).send({ success: false, error: 'Invalid or expired token' });
            }

            // Update password
            const passwordHash = await hashPassword(password);
            await prisma.user.update({
                where: { id: storedToken.userId },
                data: { passwordHash },
            });

            // Invalidate all sessions and delete used token
            await prisma.$transaction([
                prisma.resetToken.delete({ where: { id: storedToken.id } }),
                prisma.refreshToken.deleteMany({ where: { userId: storedToken.userId } }),
            ]);

            // Notify user of change (optional but recommended)
            await resend.emails.send({
                from: env.EMAIL_FROM,
                to: storedToken.user.email,
                subject: 'Your password has been changed',
                html: `<p>Your password was successfully changed. If this wasn't you, contact support immediately.</p>`,
            });

            return reply.send({ success: true, message: 'Password reset successfully' });

        } catch (error) {
            console.error('Reset password error:', error);
            if (error instanceof z.ZodError) {
                return reply.status(400).send({ success: false, error: 'Invalid input' });
            }
            return reply.status(500).send({ success: false, error: 'Internal server error' });
        }
    });

}

