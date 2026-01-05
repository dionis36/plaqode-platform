'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { env } from '@/lib/env';

// Preview components handled via inline generic render to avoid dependency duplication
// const WifiPreview = dynamic(...) - removed

// If you don't have all preview components ready in plaqode-web, you might need to copy them or create a generic one
// For now, I will use a Generic Viewer that tries to render based on type

interface ViewerClientProps {
    data: any;
}

export function ViewerClient({ data }: ViewerClientProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Record Scan logic here
        recordScan(data.shortcode);
    }, [data.shortcode]);

    async function recordScan(shortcode: string) {
        try {
            // Simplified analytics recording
            // In a real app, you might want to gather more device info
            await fetch(`${env.NEXT_PUBLIC_QRSTUDIO_API_URL}/analytics/scan/${shortcode}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Browser metadata is automatically handled by many backends or can be added here
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    url: window.location.href,
                    referrer: document.referrer
                })
            });
        } catch (err) {
            console.error('Failed to record scan', err);
        }
    }

    if (!mounted) return null;

    // Render appropriate preview based on type
    const { type, payload, design } = data;

    // Common container style for mobile view
    const Container = ({ children }: { children: React.ReactNode }) => (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 md:p-4">
            <div className={`w-full max-w-md bg-white min-h-screen md:min-h-0 md:h-[800px] md:rounded-3xl shadow-xl overflow-hidden relative border-slate-200 md:border-8`}>
                {/* Simulate Status Bar for realism if desired, or just clean content */}
                <div className="h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );

    // If it's a direct URL type, we might want to redirect immediately
    // BUT the user asked for "Mobile Based Optimized Pages", so likely an interstitial or card
    // For now, let's render the Content logic

    // NOTE: Since I don't have access to all `qrstudio-web` preview components in `plaqode-web`,
    // I will implement a robust Generic Viewer here that handles the basic types requested.

    // Fallback content renderer
    const renderContent = () => {
        switch (type) {
            case 'url':
                // Redirecting is often expected for URL types, but let's show a card first
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                            🔗
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Link QR Code</h1>
                            <p className="text-slate-600 mb-6 break-all">{payload.url}</p>
                            <a
                                href={payload.url}
                                className="inline-block w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition"
                            >
                                Open Link
                            </a>
                        </div>
                    </div>
                );
            case 'wifi':
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 text-3xl font-bold">
                            📡
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Join Wi-Fi Network</h1>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left space-y-3 mb-6">
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Network Name</span>
                                    <p className="text-lg font-medium text-slate-900">{payload.ssid}</p>
                                </div>
                                {payload.password && (
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</span>
                                        <p className="text-lg font-mono text-slate-900 bg-white p-2 border border-slate-200 rounded mt-1">{payload.password}</p>
                                    </div>
                                )}
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Encryption</span>
                                    <p className="text-sm text-slate-600">{payload.encryption || 'WPA/WPA2'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(payload.password);
                                    alert('Password copied to clipboard!');
                                }}
                                className="w-full py-4 bg-cyan-600 text-white rounded-xl font-bold shadow-lg hover:bg-cyan-700 transition"
                            >
                                Copy Password
                            </button>
                        </div>
                    </div>
                );
            case 'vcard':
                // Basic VCard Renderer
                return (
                    <div className="flex flex-col h-full bg-slate-50">
                        <div className="bg-white p-8 text-center border-b border-slate-200 pb-12">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {payload.firstName?.[0]}{payload.lastName?.[0]}
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900">{payload.firstName} {payload.lastName}</h1>
                            <p className="text-slate-500">{payload.organization} {payload.title && `• ${payload.title}`}</p>
                        </div>
                        <div className="p-4 -mt-8 space-y-3">
                            {payload.mobilePhone && (
                                <a href={`tel:${payload.mobilePhone}`} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">📞</div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-400 font-medium uppercase">Mobile</p>
                                        <p className="text-slate-900 font-medium">{payload.mobilePhone}</p>
                                    </div>
                                </a>
                            )}
                            {payload.email && (
                                <a href={`mailto:${payload.email}`} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">✉️</div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-400 font-medium uppercase">Email</p>
                                        <p className="text-slate-900 font-medium">{payload.email}</p>
                                    </div>
                                </a>
                            )}
                            {payload.website && (
                                <a href={payload.website} target="_blank" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">🌐</div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-400 font-medium uppercase">Website</p>
                                        <p className="text-slate-900 font-medium">{payload.website.replace(/^https?:\/\//, '')}</p>
                                    </div>
                                </a>
                            )}
                            <button
                                onClick={() => {
                                    // Generate VCF logic or save contact
                                    alert('Save Contact feature would download .vcf here');
                                }}
                                className="w-full mt-4 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition"
                            >
                                Save Contact
                            </button>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl mb-4">
                            📱
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 mb-2">Scan Successful</h1>
                        <p className="text-slate-500">
                            This is a <strong>{type.toUpperCase()}</strong> QR Code.
                        </p>
                        <div className="mt-8 w-full p-4 bg-slate-50 rounded-lg text-left overflow-auto max-h-60 text-xs font-mono border border-slate-200">
                            <pre>{JSON.stringify(payload, null, 2)}</pre>
                        </div>
                    </div>
                );
        }
    };

    return <Container>{renderContent()}</Container>;
}
