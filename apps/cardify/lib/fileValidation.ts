import { fileTypeFromBuffer } from 'file-type';
import DOMPurify from 'isomorphic-dompurify';

// Configuration
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
];

/**
 * Validate file size
 */
export function validateFileSize(size: number): boolean {
    return size > 0 && size <= MAX_FILE_SIZE;
}

/**
 * Validate MIME type
 */
export function validateMimeType(mimeType: string): boolean {
    return ALLOWED_MIME_TYPES.includes(mimeType);
}

/**
 * Validate file extension
 */
export function validateFileExtension(filename: string): boolean {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
    return allowedExtensions.includes(ext);
}

/**
 * Validate file content matches extension (magic number check)
 */
export async function validateFileContent(
    buffer: Buffer,
    expectedMimeType: string
): Promise<boolean> {
    try {
        // SVG files don't have magic numbers, skip for them
        if (expectedMimeType === 'image/svg+xml') {
            return validateSVGContent(buffer);
        }

        const fileType = await fileTypeFromBuffer(buffer);

        if (!fileType) {
            return false;
        }

        return fileType.mime === expectedMimeType;
    } catch (error) {
        console.error('File content validation failed:', error);
        return false;
    }
}

/**
 * Validate SVG content (check if it's valid XML and SVG)
 */
function validateSVGContent(buffer: Buffer): boolean {
    try {
        const content = buffer.toString('utf-8');

        // Basic checks
        if (!content.includes('<svg')) {
            return false;
        }

        // Check for malicious content
        const dangerous = [
            '<script',
            'javascript:',
            'onerror=',
            'onload=',
            'onclick=',
            '<iframe',
            '<embed',
            '<object'
        ];

        const lowerContent = content.toLowerCase();
        return !dangerous.some(pattern => lowerContent.includes(pattern));
    } catch {
        return false;
    }
}

/**
 * Sanitize SVG content
 */
export function sanitizeSVG(buffer: Buffer): Buffer {
    try {
        const content = buffer.toString('utf-8');

        // Use DOMPurify to sanitize
        const clean = DOMPurify.sanitize(content, {
            USE_PROFILES: { svg: true, svgFilters: true },
            ADD_TAGS: ['use'], // Allow <use> tag for SVG sprites
            FORBID_TAGS: ['script', 'iframe', 'embed', 'object'],
            FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
        });

        return Buffer.from(clean, 'utf-8');
    } catch (error) {
        console.error('SVG sanitization failed:', error);
        throw new Error('Failed to sanitize SVG');
    }
}

/**
 * Generate secure random filename
 */
export function generateSecureFilename(originalName: string): string {
    const ext = originalName.toLowerCase().slice(originalName.lastIndexOf('.'));
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}_${random}${ext}`;
}
