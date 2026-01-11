'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    label: string;
    value?: string; // base64 or URL
    onChange: (base64: string | null) => void;
    maxSizeMB?: number;
    aspectRatio?: string; // e.g., "16/9", "1/1"
    className?: string;
    multiple?: boolean;
    onUpload?: (files: string[]) => void;
}

export function ImageUpload({
    label,
    value,
    onChange,
    maxSizeMB = 5,
    aspectRatio,
    className = '',
    multiple = false,
    onUpload
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: File[]) => {
        setError(null);

        if (multiple && onUpload) {
            const validFiles: File[] = [];

            for (const file of files) {
                if (!file.type.startsWith('image/')) {
                    setError('Some files were skipped (not an image)');
                    continue;
                }
                const maxSize = maxSizeMB * 1024 * 1024;
                if (file.size > maxSize) {
                    setError(`Some files were skipped (larger than ${maxSizeMB}MB)`);
                    continue;
                }
                validFiles.push(file);
            }

            if (validFiles.length === 0) return;

            const promises = validFiles.map(file => new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.onerror = () => reject();
                reader.readAsDataURL(file);
            }));

            Promise.all(promises)
                .then(base64s => {
                    onUpload(base64s);
                }) // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .catch(err => {
                    setError('Failed to process some files');
                });

            return;
        }

        // Single file mode (Legacy)
        const file = files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Validate file size
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            setError(`Image must be less than ${maxSizeMB}MB`);
            return;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target?.result as string;
            onChange(base64);
        };
        reader.onerror = () => {
            setError('Failed to read file');
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleRemove = () => {
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={className}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>

            {value ? (
                // Preview
                <div className="relative group">
                    <div
                        className="relative rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-50"
                        style={aspectRatio ? { aspectRatio } : { maxHeight: '200px' }}
                    >
                        <img
                            src={value}
                            alt={label}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                // Upload Area
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                        relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all min-h-[180px] flex items-center justify-center
                        ${isDragging
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
                        }
                    `}
                    style={aspectRatio ? { aspectRatio } : {}}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple={multiple}
                        onChange={handleFileInput}
                        className="hidden"
                    />

                    <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-white rounded-full shadow-sm">
                            {isDragging ? (
                                <Upload className="w-6 h-6 text-blue-500" />
                            ) : (
                                <ImageIcon className="w-6 h-6 text-slate-400" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-700">
                                {isDragging ? 'Drop image here' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                PNG, JPG up to {maxSizeMB}MB
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {error}
                </p>
            )}
        </div>
    );
}
