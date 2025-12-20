// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import {
  validateFileSize,
  validateMimeType,
  validateFileExtension,
  validateFileContent,
  sanitizeSVG,
  generateSecureFilename,
  MAX_FILE_SIZE
} from '@/lib/fileValidation';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // 1. Validate file size
    if (!validateFileSize(file.size)) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // 2. Validate MIME type
    if (!validateMimeType(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images allowed.' },
        { status: 400 }
      );
    }

    // 3. Validate file extension
    if (!validateFileExtension(file.name)) {
      return NextResponse.json(
        { error: 'Invalid file extension' },
        { status: 400 }
      );
    }

    // 4. Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    let buffer: Buffer | Uint8Array = Buffer.from(arrayBuffer);

    // 5. Validate file content (magic number check)
    const isValidContent = await validateFileContent(Buffer.from(arrayBuffer), file.type);
    if (!isValidContent) {
      return NextResponse.json(
        { error: 'File content does not match extension' },
        { status: 400 }
      );
    }

    // 6. Sanitize SVG if needed
    if (file.type === 'image/svg+xml') {
      buffer = sanitizeSVG(Buffer.from(arrayBuffer));
    }

    // 7. Generate secure filename
    const secureFilename = generateSecureFilename(file.name);

    // 8. Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // 9. Write file
    const filepath = path.join(uploadsDir, secureFilename);
    await fs.writeFile(filepath, buffer);

    // 10. Store metadata in database
    const uploadedFile = await prisma.uploadedFile.create({
      data: {
        filename: secureFilename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: `/uploads/${secureFilename}`
      }
    });

    return NextResponse.json({
      url: uploadedFile.path,
      id: uploadedFile.id
    });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
