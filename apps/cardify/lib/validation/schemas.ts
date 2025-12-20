import { z } from 'zod';

/**
 * Design validation schema
 */
export const DesignSchema = z.object({
    id: z.string().min(1).max(100),
    data: z.any() // Prisma Json type
});

/**
 * File upload validation schema
 */
export const FileUploadSchema = z.object({
    file: z.instanceof(File)
        .refine((file) => file.size <= 10 * 1024 * 1024, 'File too large (max 10MB)')
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'].includes(file.type),
            'Invalid file type. Only images allowed.'
        )
});

/**
 * Image search validation schema
 */
export const ImageSearchSchema = z.object({
    query: z.string().min(1).max(100),
    page: z.number().int().min(1).max(100).default(1),
    perPage: z.number().int().min(1).max(80).default(20)
});

/**
 * Template validation schema
 */
export const TemplateSchema = z.object({
    id: z.string(),
    name: z.string().min(1).max(200),
    description: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    data: z.any()
});

/**
 * Template update schema
 */
export const TemplateUpdateSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    isPublic: z.boolean().optional(),
    data: z.any().optional()
});
