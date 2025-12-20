import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../middleware/auth';
import { prisma } from '../db.js';
import { z } from 'zod';

// Validation schemas
const saveDesignSchema = z.object({
    name: z.string().min(1).max(255),
    templateId: z.string(),
    designData: z.any(), // JSON object
    thumbnail: z.string().optional(),
});

const updateDesignSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    designData: z.any().optional(),
    thumbnail: z.string().optional(),
});

export default async function designRoutes(fastify: FastifyInstance) {
    // Create a new saved design
    fastify.post('/designs', { preHandler: authMiddleware }, async (request, reply) => {
        const userId = (request as any).user.sub;

        try {
            const data = saveDesignSchema.parse(request.body);

            const savedDesign = await prisma.savedDesign.create({
                data: {
                    userId,
                    name: data.name,
                    templateId: data.templateId,
                    designData: data.designData,
                    thumbnail: data.thumbnail,
                },
            });

            return reply.code(201).send({
                message: 'Design saved successfully',
                design: savedDesign,
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return reply.code(400).send({ error: 'Invalid request data', details: error.errors });
            }
            throw error;
        }
    });

    // Get all saved designs for the current user
    fastify.get('/designs', { preHandler: authMiddleware }, async (request, reply) => {
        const userId = (request as any).user.sub;

        const designs = await prisma.savedDesign.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                name: true,
                templateId: true,
                thumbnail: true,
                createdAt: true,
                updatedAt: true,
                // Don't send full designData in list view
            },
        });

        return reply.send(designs);
    });

    // Get a specific saved design
    fastify.get('/designs/:id', { preHandler: authMiddleware }, async (request, reply) => {
        const userId = (request as any).user.sub;
        const { id } = request.params as { id: string };

        const design = await prisma.savedDesign.findFirst({
            where: {
                id,
                userId, // Ensure user owns this design
            },
        });

        if (!design) {
            return reply.code(404).send({ error: 'Design not found' });
        }

        return reply.send(design);
    });

    // Update a saved design
    fastify.put('/designs/:id', { preHandler: authMiddleware }, async (request, reply) => {
        const userId = (request as any).user.sub;
        const { id } = request.params as { id: string };

        try {
            const data = updateDesignSchema.parse(request.body);

            // Check if design exists and belongs to user
            const existing = await prisma.savedDesign.findFirst({
                where: { id, userId },
            });

            if (!existing) {
                return reply.code(404).send({ error: 'Design not found' });
            }

            const updated = await prisma.savedDesign.update({
                where: { id },
                data: {
                    ...(data.name && { name: data.name }),
                    ...(data.designData && { designData: data.designData }),
                    ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
                },
            });

            return reply.send({
                message: 'Design updated successfully',
                design: updated,
            });
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return reply.code(400).send({ error: 'Invalid request data', details: error.errors });
            }
            throw error;
        }
    });

    // Delete a saved design
    fastify.delete('/designs/:id', { preHandler: authMiddleware }, async (request, reply) => {
        const userId = (request as any).user.sub;
        const { id } = request.params as { id: string };

        // Check if design exists and belongs to user
        const existing = await prisma.savedDesign.findFirst({
            where: { id, userId },
        });

        if (!existing) {
            return reply.code(404).send({ error: 'Design not found' });
        }

        await prisma.savedDesign.delete({
            where: { id },
        });

        return reply.send({ message: 'Design deleted successfully' });
    });

    // Get user statistics
    fastify.get('/stats', { preHandler: authMiddleware }, async (request, reply) => {
        const userId = (request as any).user.sub;

        // Get total designs count
        const totalDesigns = await prisma.savedDesign.count({
            where: { userId },
        });

        // Get designs created this week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const thisWeek = await prisma.savedDesign.count({
            where: {
                userId,
                createdAt: {
                    gte: oneWeekAgo,
                },
            },
        });

        // Get user's products
        const productAccess = await prisma.productAccess.findMany({
            where: { userId },
            select: { product: true },
        });

        const products = productAccess.map((p: any) => p.product);

        return reply.send({
            totalDesigns,
            thisWeek,
            products,
        });
    });
}
