import { NextResponse } from 'next/server';

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public isOperational: boolean = true
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Centralized error handler for API routes
 * Prevents leaking internal error details to clients
 */
export function handleError(error: unknown) {
    if (error instanceof AppError) {
        return NextResponse.json(
            { error: error.message },
            { status: error.statusCode }
        );
    }

    // Don't expose internal errors to clients
    console.error('Unexpected error:', error);
    return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
    );
}

/**
 * Validation error helper
 */
export function validationError(message: string) {
    return new AppError(message, 400);
}

/**
 * Not found error helper
 */
export function notFoundError(resource: string) {
    return new AppError(`${resource} not found`, 404);
}

/**
 * Unauthorized error helper
 */
export function unauthorizedError(message: string = 'Unauthorized') {
    return new AppError(message, 401);
}
