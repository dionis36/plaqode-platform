'use client';

interface ExportAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveBeforeAuth?: () => Promise<void>; // Callback to save design before auth
}

export function ExportAuthModal({ isOpen, onClose, onSaveBeforeAuth }: ExportAuthModalProps) {
    if (!isOpen) return null;

    const handleLogin = async () => {
        // Save design first if callback provided
        if (onSaveBeforeAuth) {
            try {
                await onSaveBeforeAuth();
            } catch (error) {
                console.error('Failed to save design before login:', error);
            }
        }

        const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
        window.location.href = `${process.env.NEXT_PUBLIC_PLATFORM_URL || 'http://localhost:3000'}/auth/login?redirect=${currentUrl}`;
    };

    const handleSignup = async () => {
        // Save design first if callback provided
        if (onSaveBeforeAuth) {
            try {
                await onSaveBeforeAuth();
            } catch (error) {
                console.error('Failed to save design before signup:', error);
            }
        }

        // For signup, we don't include redirect - new users go to dashboard to see their saved design
        window.location.href = `${process.env.NEXT_PUBLIC_PLATFORM_URL || 'http://localhost:3000'}/auth/signup`;
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Login Required
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Please login or create a free account to export your design
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={handleLogin}
                            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                        >
                            Login to Export
                        </button>
                        <button
                            onClick={handleSignup}
                            className="w-full px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium"
                        >
                            Create Free Account
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full px-6 py-3 text-gray-600 hover:text-gray-900 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
