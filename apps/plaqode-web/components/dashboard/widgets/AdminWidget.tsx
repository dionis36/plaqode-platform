'use client';

import { useAuth } from '@/lib/auth-context';
import { Shield, Users, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AdminWidget() {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('admin') || user?.roles.includes('superadmin');

    if (!isAdmin) return null;

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 h-full shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-red-500/20 transition-colors" />

            <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2 relative z-10">
                <Shield className="w-5 h-5 text-red-500" />
                Admin Controls
            </h3>

            <div className="space-y-3 relative z-10">
                <Link href="/app/admin" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group/item">
                    <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-slate-400 group-hover/item:text-white" />
                        <span className="text-sm font-medium text-slate-300 group-hover/item:text-white">User Management</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover/item:text-white" />
                </Link>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                        <Database className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-300">System Logs</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
