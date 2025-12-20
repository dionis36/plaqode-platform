import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const assignRoleSchema = z.object({
    role: z.enum(['superadmin', 'admin', 'user']),
});

export const grantProductAccessSchema = z.object({
    product: z.enum(['cardify', 'qrstudio']),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AssignRoleInput = z.infer<typeof assignRoleSchema>;
export type GrantProductAccessInput = z.infer<typeof grantProductAccessSchema>;
