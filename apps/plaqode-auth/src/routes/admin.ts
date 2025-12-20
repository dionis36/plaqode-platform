import { FastifyInstance } from 'fastify';
import { prisma } from '../db.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { assignRoleSchema, grantProductAccessSchema } from '../schemas/auth.js';

export async function adminRoutes(app: FastifyInstance) {
    // GET /auth/users - List all users (admin only)
    app.get(
        '/auth/users',
        { preHandler: [authMiddleware, requireRole('admin')] },
        async (request, reply) => {
            try {
                const currentUser = (request as any).user;
                const isSuperAdmin = currentUser.roles.includes('superadmin');

                const users = await prisma.user.findMany({
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        createdAt: true,
                        roles: {
                            include: {
                                role: true,
                            },
                        },
                        productAccess: true,
                    },
                });

                // Filter users based on current user's role
                const filteredUsers = isSuperAdmin
                    ? users // Superadmin sees all users
                    : users.filter(user => {
                        // Admin only sees users without admin/superadmin roles
                        const userRoles = user.roles.map((ur: any) => ur.role.name);
                        return !userRoles.includes('admin') && !userRoles.includes('superadmin');
                    });

                const formattedUsers = filteredUsers.map((user) => ({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    createdAt: user.createdAt,
                    roles: user.roles.map((ur: any) => ur.role.name),
                    products: user.productAccess.map((pa: any) => pa.product),  // Use 'product' to match schema
                }));

                return reply.send({
                    success: true,
                    users: formattedUsers,
                });
            } catch (error) {
                console.error('List users error:', error);
                return reply.status(500).send({
                    success: false,
                    error: 'Internal server error',
                });
            }
        }
    );

    // POST /auth/users/:id/roles - Assign role to user (superadmin only)
    app.post(
        '/auth/users/:id/roles',
        { preHandler: [authMiddleware, requireRole('superadmin')] },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const body = assignRoleSchema.parse(request.body);

                // Check if user exists
                const user = await prisma.user.findUnique({
                    where: { id },
                });

                if (!user) {
                    return reply.status(404).send({
                        success: false,
                        error: 'User not found',
                    });
                }

                // Find role by name
                const role = await prisma.role.findUnique({
                    where: { name: body.role },
                });

                if (!role) {
                    return reply.status(404).send({
                        success: false,
                        error: 'Role not found',
                    });
                }

                // Assign role
                await prisma.userRole.create({
                    data: {
                        userId: id,
                        roleId: role.id,
                    },
                });

                return reply.send({
                    success: true,
                    message: `Role "${role.name}" assigned to user`,
                });
            } catch (error: any) {
                if (error.code === 'P2002') {
                    return reply.status(400).send({
                        success: false,
                        error: 'User already has this role',
                    });
                }

                console.error('Assign role error:', error);
                return reply.status(500).send({
                    success: false,
                    error: 'Internal server error',
                });
            }
        }
    );

    // DELETE /auth/users/:id/roles/:role - Revoke role from user (superadmin only)
    app.delete(
        '/auth/users/:id/roles/:role',
        { preHandler: [authMiddleware, requireRole('superadmin')] },
        async (request, reply) => {
            try {
                const { id, role: roleName } = request.params as { id: string; role: string };

                // Find role by name
                const role = await prisma.role.findUnique({
                    where: { name: roleName },
                });

                if (!role) {
                    return reply.status(404).send({
                        success: false,
                        error: 'Role not found',
                    });
                }

                // Revoke role
                await prisma.userRole.deleteMany({
                    where: {
                        userId: id,
                        roleId: role.id,
                    },
                });

                return reply.send({
                    success: true,
                    message: `Role "${roleName}" revoked from user`,
                });
            } catch (error) {
                console.error('Revoke role error:', error);
                return reply.status(500).send({
                    success: false,
                    error: 'Internal server error',
                });
            }
        }
    );

    // POST /auth/users/:id/products - Grant product access (admin only)
    app.post(
        '/auth/users/:id/products',
        { preHandler: [authMiddleware, requireRole('admin')] },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const body = grantProductAccessSchema.parse(request.body);

                // Check if user exists
                const user = await prisma.user.findUnique({
                    where: { id },
                });

                if (!user) {
                    return reply.status(404).send({
                        success: false,
                        error: 'User not found',
                    });
                }

                // Grant product access
                await prisma.productAccess.create({
                    data: {
                        userId: id,
                        product: body.product,
                    },
                });

                return reply.send({
                    success: true,
                    message: `Access to "${body.product}" granted`,
                });
            } catch (error: any) {
                if (error.code === 'P2002') {
                    return reply.status(400).send({
                        success: false,
                        error: 'User already has access to this product',
                    });
                }

                if (error.name === 'ZodError') {
                    return reply.status(400).send({
                        success: false,
                        error: 'Validation error',
                        details: error.errors,
                    });
                }

                console.error('Grant product access error:', error);
                return reply.status(500).send({
                    success: false,
                    error: 'Internal server error',
                });
            }
        }
    );

    // DELETE /auth/users/:id/products/:product - Revoke product access (admin only)
    app.delete(
        '/auth/users/:id/products/:product',
        { preHandler: [authMiddleware, requireRole('admin')] },
        async (request, reply) => {
            try {
                const { id, product } = request.params as { id: string; product: string };

                await prisma.productAccess.deleteMany({
                    where: {
                        userId: id,
                        product,
                    },
                });

                return reply.send({
                    success: true,
                    message: `Access to "${product}" revoked`,
                });
            } catch (error) {
                console.error('Revoke product access error:', error);
                return reply.status(500).send({
                    success: false,
                    error: 'Internal server error',
                });
            }
        }
    );

    // DELETE /auth/users/:id - Delete user (superadmin only)
    app.delete(
        '/auth/users/:id',
        { preHandler: [authMiddleware, requireRole('superadmin')] },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };

                // Check if user exists
                const user = await prisma.user.findUnique({
                    where: { id },
                });

                if (!user) {
                    return reply.status(404).send({
                        success: false,
                        error: 'User not found',
                    });
                }

                // Delete user (cascade will delete related records)
                await prisma.user.delete({
                    where: { id },
                });

                return reply.send({
                    success: true,
                    message: 'User deleted successfully',
                });
            } catch (error) {
                console.error('Delete user error:', error);
                return reply.status(500).send({
                    success: false,
                    error: 'Internal server error',
                });
            }
        }
    );
}
