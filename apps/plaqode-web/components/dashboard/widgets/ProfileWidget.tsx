'use client';

import { useAuth } from '@/lib/auth-context';
import GradientAvatar from '@/components/ui/GradientAvatar';
import { Settings, Award } from 'lucide-react';
import Link from 'next/link';

export function ProfileWidget() {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <div className="grid md:grid-cols-2 gap-6 w-full">
            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                        <p className="text-gray-900 font-medium">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                        <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                        <Link href="/app/profile">
                            <span className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-9 px-4 py-2 mt-2">
                                Edit Profile
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Account Details</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                        <p className="text-gray-900 font-mono text-sm break-all">{user.id}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Roles</label>
                        <div className="flex gap-2 flex-wrap">
                            {user.roles?.map((role: string) => (
                                <span key={role} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                    {user.products && (
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Product Access</label>
                            <div className="flex gap-2 flex-wrap">
                                {user.products.length > 0 ? (
                                    user.products.map((product: string) => (
                                        <span key={product} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                                            {product}
                                        </span>
                                    ))
                                ) : <span className="text-sm text-slate-400">No products</span>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
