'use client';

import { FileText, ExternalLink, File, FileImage, FileArchive, FileCode, Music, Video } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePreviewContext } from './PreviewContext';

type FilePreviewProps = {
    data: any;
};

// Helper function to get file icon based on type
function getFileIcon(extension: string, category: string, primaryColor: string) {
    const iconClass = "w-8 h-8";
    const iconStyle = { color: primaryColor };

    // Documents
    if (extension === 'PDF') return <FileText className={iconClass} style={iconStyle} />;
    if (['DOC', 'DOCX'].includes(extension)) return <FileText className={iconClass} style={iconStyle} />;
    if (['XLS', 'XLSX'].includes(extension)) return <FileText className={iconClass} style={iconStyle} />;
    if (['PPT', 'PPTX'].includes(extension)) return <FileText className={iconClass} style={iconStyle} />;

    // Images
    if (category === 'image') return <FileImage className={iconClass} style={iconStyle} />;

    // Archives
    if (category === 'archive') return <FileArchive className={iconClass} style={iconStyle} />;

    // Text
    if (category === 'text') return <FileCode className={iconClass} style={iconStyle} />;

    // Media
    if (extension === 'MP3') return <Music className={iconClass} style={iconStyle} />;
    if (extension === 'MP4') return <Video className={iconClass} style={iconStyle} />;

    // Default
    return <File className={iconClass} style={iconStyle} />;
}

export function FilePreview({ data }: FilePreviewProps) {
    const { setHeroBackgroundColor } = usePreviewContext();
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Default styles for public if missing
    const defaultStyles = { primary_color: '#2563EB', secondary_color: '#EFF6FF' };
    const styles = data?.styles || defaultStyles;
    const primaryColor = styles.primary_color || defaultStyles.primary_color;
    const secondaryColor = styles.secondary_color || defaultStyles.secondary_color;

    const pdfFile = data?.pdf_file || {};
    const docInfo = data?.document_info || {};

    // Set hero background color
    useEffect(() => {
        setHeroBackgroundColor(primaryColor);
    }, [primaryColor, setHeroBackgroundColor]);

    const fileExtension = pdfFile.file_extension || 'FILE';
    const fileCategory = pdfFile.file_category || 'document';
    const fileType = pdfFile.file_type || 'application/octet-stream'; // Default fallback
    const fileSize = pdfFile.file_size || 0;

    const fileDataUri = useMemo(() => {
        if (!pdfFile.file_data) return null;

        try {
            // 1. If it's already a Data URI, return as is
            if (pdfFile.file_data.startsWith('data:')) {
                return pdfFile.file_data;
            }

            // 2. If it is a remote URL (http/https), return as is
            if (pdfFile.file_data.startsWith('http')) {
                return pdfFile.file_data;
            }

            // 3. Assume Base64 - verify and clean
            // Remove any whitespace which might break atob
            const base64Clean = pdfFile.file_data.replace(/\s/g, '');

            // Convert Base64 to Blob
            const byteCharacters = atob(base64Clean);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: fileType });
            return URL.createObjectURL(blob);
        } catch (e) {
            console.error("Error creating object URL for file:", e);
            return null;
        }
    }, [pdfFile.file_data, fileType]);

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (fileDataUri && fileDataUri.startsWith('blob:')) {
                URL.revokeObjectURL(fileDataUri);
            }
        };
    }, [fileDataUri]);

    // Format file size
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 10) / 10 + ' ' + sizes[i];
    };

    // Generate PDF thumbnail
    const generateThumbnail = useCallback(async () => {
        if (!pdfFile.file_data || fileExtension !== 'PDF') return;
        try {
            setIsGenerating(true);
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
            const binaryString = atob(pdfFile.file_data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const loadingTask = pdfjsLib.getDocument({ data: bytes });
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1.0 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) return;
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({
                canvasContext: context,
                viewport: viewport,
                canvas: canvas
            }).promise;
            const dataUrl = canvas.toDataURL('image/png');
            setThumbnailUrl(dataUrl);
        } catch (error) {
            console.error('Failed to generate PDF thumbnail:', error);
            setThumbnailUrl('');
        } finally {
            setIsGenerating(false);
        }
    }, [pdfFile.file_data, fileExtension]);

    useEffect(() => {
        if (pdfFile.file_data && !pdfFile.fullscreen_mode) {
            generateThumbnail();
        } else {
            setThumbnailUrl('');
        }
    }, [pdfFile.file_data, pdfFile.fullscreen_mode, generateThumbnail]);

    return (
        <div
            className="absolute inset-0 w-full h-full font-sans overflow-hidden bg-white"
            style={{
                background: `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)`
            }}
        >
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* --- Fixed Background Elements --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-[-20%] left-[-20%] w-[120%] h-[60%] rounded-[100%] blur-3xl opacity-40 animate-pulse"
                    style={{ background: primaryColor }}
                />
                <div
                    className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[50%] rounded-[100%] blur-3xl opacity-30"
                    style={{ background: secondaryColor }}
                />
            </div>

            {/* --- Scrollable Content --- */}
            <div className="relative w-full h-full overflow-y-auto no-scrollbar flex flex-col z-10">

                {/* Spacer */}
                <div className="w-full flex-none pt-20" />

                {/* 1. Header (Floating) */}
                <div className="flex-none flex flex-col justify-center items-center pb-8 px-4 text-center">
                    {/* Floating Icon or Preview */}
                    <div className="relative group mb-5">
                        <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 transition-opacity duration-500 scale-125" />
                        <div className="relative h-32 w-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-2 ring-4 ring-white/30 backdrop-blur-sm animate-in zoom-in-50 duration-700 ease-out rotate-3 overflow-hidden">
                            {fileCategory === 'image' && pdfFile.file_data ? (
                                <img src={fileDataUri} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                            ) : thumbnailUrl ? (
                                <img src={thumbnailUrl} alt="PDF Preview" className="w-full h-full object-cover rounded-2xl" />
                            ) : isGenerating ? (
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{ borderColor: primaryColor }}></div>
                            ) : (
                                getFileIcon(fileExtension, fileCategory, primaryColor)
                            )}
                        </div>
                    </div>

                    {/* File Title */}
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight drop-shadow-sm mb-2 px-2 break-words">
                        {docInfo.title || pdfFile.file_name || 'File'}
                    </h1>
                    {docInfo.topic && (
                        <p className="text-lg font-medium text-slate-600 opacity-90">
                            {docInfo.topic}
                        </p>
                    )}
                </div>

                {/* 2. Main Glass Card */}
                <div className="flex-shrink-0 px-4 flex justify-center pb-8">
                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] border border-white/80 px-6 py-8 flex flex-col items-stretch animate-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/40">

                        {/* File Meta */}
                        <div className="text-center mb-8 flex items-center justify-center gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-bold border bg-white/50" style={{ borderColor: `${primaryColor}30`, color: primaryColor }}>
                                {fileExtension}
                            </span>
                            <span className="text-sm font-medium text-slate-500">
                                {formatFileSize(fileSize)}
                            </span>
                        </div>

                        {/* Description */}
                        {docInfo.description && (
                            <div className="text-center mb-8">
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {docInfo.description}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="space-y-3">
                            {/* View / Download Primary */}
                            {fileDataUri && (
                                <a
                                    href={fileDataUri}
                                    download={pdfFile.file_name || 'download'}
                                    className="w-full py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white relative overflow-hidden"
                                    style={{ backgroundColor: primaryColor }}
                                    target="_blank"  // Helpful for some browsers even with download
                                    rel="noopener noreferrer"
                                >
                                    <FileText className="w-5 h-5" />
                                    <span>Download File</span>
                                </a>
                            )}

                            {/* View (Secondary) if valid for viewing */}
                            {(fileCategory === 'image' || fileExtension === 'PDF' || fileCategory === 'media') && fileDataUri && (
                                <a
                                    href={fileDataUri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 rounded-xl font-bold bg-white text-slate-700 shadow-sm border border-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-slate-50"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    <span>View {fileCategory === 'media' ? 'Media' : fileExtension}</span>
                                </a>
                            )}
                        </div>

                        {/* Author Info */}
                        {docInfo.author && (
                            <div className="mt-8 pt-6 border-t border-slate-200/60 text-center">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Author</p>
                                <p className="text-slate-700 font-medium">{docInfo.author}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 min-h-0" />
                <div className="flex-none pt-4 pb-4 text-[10px] uppercase tracking-widest text-slate-400 font-semibold text-center opacity-60">
                    Powered by Plaqode
                </div>
            </div>
        </div>
    );
}
