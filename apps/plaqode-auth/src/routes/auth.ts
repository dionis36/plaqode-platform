import { FastifyInstance } from 'fastify';
import { prisma } from '../db.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { generateTokenPair, verifyToken, getPublicKey } from '../utils/jwt.js';
import { signupSchema, loginSchema } from '../schemas/auth.js';
import { config } from '../config.js';
import { authMiddleware } from '../middleware/auth.js';

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
                    sameSite: 'lax',
                    domain: config.cookieDomain,
                    path: '/',
                    maxAge: 15 * 60, // 15 minutes
                })
                .setCookie('refresh_token', tokens.refreshToken, {
                    httpOnly: true,
                    secure: config.cookieSecure,
                    sameSite: 'lax',
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
                    sameSite: 'lax',
                    domain: config.cookieDomain,
                    path: '/',
                    maxAge: 15 * 60,
                })
                .setCookie('refresh_token', tokens.refreshToken, {
                    httpOnly: true,
                    secure: config.cookieSecure,
                    sameSite: 'lax',
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
                    sameSite: 'lax',
                    domain: config.cookieDomain,
                    path: '/',
                    maxAge: 15 * 60,
                })
                .setCookie('refresh_token', tokens.refreshToken, {
                    httpOnly: true,
                    secure: config.cookieSecure,
                    sameSite: 'lax',
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
}
