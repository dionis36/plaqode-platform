'use client';

import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import { GradientButton, toast, Input } from "@plaqode-platform/ui";

export default function ProfilePage() {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            toast.success('Profile updated successfully!');
            setEditing(false);

            // Refresh the page to update user data
            setTimeout(() => window.location.reload(), 1000);
        } catch (err: any) {
            toast.error(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-4xl mr-auto">
            <div className="mb-10 text-left">
                <h1 className="text-4xl font-merriweather font-bold text-dark mb-3">Profile</h1>
                <p className="text-text/70 font-sans text-lg">Manage your account information</p>
            </div>



            <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>

                    {editing ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <Input
                                    label="Name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <Input
                                    label="Email"
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="bg-gray-100 text-gray-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>

                            <div className="flex gap-3">
                                <GradientButton
                                    type="submit"
                                    text={loading ? 'Saving...' : 'Save Changes'}
                                    disabled={loading}
                                    size="md"
                                    bold
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditing(false);
                                        setName(user.name || '');
                                    }}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition h-10"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                                <p className="text-gray-900">{user.name || 'Not set'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <p className="text-gray-900">{user.email}</p>
                            </div>

                            <GradientButton
                                text="Edit Profile"
                                size="sm"
                                onClick={() => setEditing(true)}
                            />
                        </div>
                    )}
                </div>

                {/* Account Details */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Account Details</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                            <p className="text-gray-900 font-mono text-sm">{user.id}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Roles</label>
                            <div className="flex gap-2">
                                {user.roles.map((role) => (
                                    <span
                                        key={role}
                                        className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Product Access</label>
                            <div className="flex gap-2">
                                {user.products.length > 0 ? (
                                    user.products.map((product) => (
                                        <span
                                            key={product}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                                        >
                                            {product}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No products assigned</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
