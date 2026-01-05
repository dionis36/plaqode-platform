'use client';

import Link from 'next/link';
import { QrCode, BarChart2, Plus, Grid3x3 } from 'lucide-react';
import { SEO } from '@/components/common/SEO';

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SEO
                title="Dashboard | QR Studio"
                description="Manage your QR codes and analytics"
            />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                    QR Studio DashboardS
                </h1>
                <p className="text-slate-600 text-lg">
                    Create, manage, and track your QR codes
                </p>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Create New QR Code - Primary Action */}
                <Link href="/create" className="group">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-lg mb-4 group-hover:bg-white/30 transition-colors">
                            <Plus className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">
                            Create QR Code
                        </h2>
                        <p className="text-blue-100">
                            Generate a new QR code
                        </p>
                    </div>
                </Link>

                {/* My QR Codes */}
                <Link href="/qrcodes" className="group">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-14 h-14 bg-blue-50 rounded-lg mb-4 group-hover:bg-blue-100 transition-colors">
                            <Grid3x3 className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-2">
                            My QR Codes
                        </h2>
                        <p className="text-slate-600">
                            View and manage all your QR codes
                        </p>
                    </div>
                </Link>

                {/* QR Code Templates */}
                <Link href="/create" className="group">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-14 h-14 bg-purple-50 rounded-lg mb-4 group-hover:bg-purple-100 transition-colors">
                            <QrCode className="w-8 h-8 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-2">
                            Templates
                        </h2>
                        <p className="text-slate-600">
                            Browse QR code templates
                        </p>
                    </div>
                </Link>

                {/* Analytics */}
                <Link href="/qrcodes" className="group">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-green-300 transition-all cursor-pointer transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-lg mb-4 group-hover:bg-green-100 transition-colors">
                            <BarChart2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-2">
                            Analytics
                        </h2>
                        <p className="text-slate-600">
                            View QR code scan statistics
                        </p>
                    </div>
                </Link>
            </div>

            {/* Quick Stats (Optional - can add later) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium">Total QR Codes</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">-</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <QrCode className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium">Total Scans</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">-</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                            <BarChart2 className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium">Active QR Codes</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">-</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Grid3x3 className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
