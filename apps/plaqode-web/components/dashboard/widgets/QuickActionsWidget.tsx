'use client';

import { GradientButton } from '@plaqode-platform/ui';
import { Plus, Zap } from 'lucide-react';

export function QuickActionsWidget() {
    const qrStudioUrl = process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3001';
    const cardifyUrl = process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002';

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">
                <GradientButton
                    href={`${qrStudioUrl}/create`}
                    text="Create New QR Code"
                    className="flex-1 justify-center"
                />

                <a
                    href={`${process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002'}/templates`}
                    className="flex-1 flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 bg-white/10 hover:bg-white/20 text-white border border-white/10"
                >
                    Create Business Card
                </a>
            </div>
        </div>
    );
}
