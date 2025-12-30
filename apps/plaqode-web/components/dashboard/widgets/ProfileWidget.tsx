'use client';

import { useAuth } from '@/lib/auth-context';
import GradientAvatar from '@/components/ui/GradientAvatar';
import { Settings, Award } from 'lucide-react';
import Link from 'next/link';

export function ProfileWidget() {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
                <Link href="/app/profile">
                    <Settings className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                </Link>
            </div>

            <div className="flex items-start gap-4 mb-6">
                <GradientAvatar user={user} className="w-16 h-16 text-2xl" disableDropdown={true} textColor="text-dark" />
                <div>
                    <h3 className="font-bold text-lg text-gray-900">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.email}</p>

                    <div className="flex gap-2 mt-2">
                        {user.roles?.slice(0, 2).map((role: string) => (
                            <span key={role} className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium capitalize">
                                {role}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mb-2">
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">User ID</p>
                    <p className="text-sm font-mono text-gray-700 truncate" title={user.id}>{user.id}</p>
                </div>
            </div>

            <Link href="/app/profile" className="block mt-6">
                <button className="w-full py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg border border-slate-200 transition-colors text-sm">
                    Manage Account
                </button>
            </Link>
        </div>
    );
}
