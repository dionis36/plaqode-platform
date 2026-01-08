'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { toast, Modal, ConfirmationModal } from "@plaqode-platform/ui";
import { Shield, ShieldAlert, User as UserIcon, CheckCircle, CreditCard, QrCode, X } from "lucide-react";
import { env } from '@/lib/env';

interface User {
    id: string;
    email: string;
    name?: string;
    roles: string[];
    products: string[];
    createdAt: string;
}

export default function AdminPage() {
    const { user, isAdmin, isSuperAdmin, loading } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roleToRevoke, setRoleToRevoke] = useState<string | null>(null);
    const [productToRevoke, setProductToRevoke] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [filter, setFilter] = useState<'all' | 'admins' | 'users'>('all');
    const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch(`${env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/users`, {
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setUsersLoading(false);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (target.closest('.action-menu-trigger')) return;
            setOpenActionMenu(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        // Wait for auth to load before checking admin status
        if (loading) return;

        if (!isAdmin) {
            router.push('/app');
            return;
        }

        fetchUsers();
    }, [isAdmin, loading, fetchUsers, router]);

    const assignRole = async (userId: string, role: string) => {
        setActionLoading(true);
        // Remove duplicate setActionLoading(true)
        try {
            const response = await fetch(
                `${env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/users/${userId}/roles`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ role }),
                }
            );

            if (response.ok) {
                toast.success(`Role "${role}" assigned successfully!`);
                fetchUsers();
                setShowRoleModal(false);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to assign role');
            }
        } catch (error) {
            console.error('Failed to assign role:', error);
            toast.error('Failed to assign role');
        } finally {
            setActionLoading(false);
        }
    };

    const promptRevokeRole = (user: User, role: string) => {
        setSelectedUser(user);
        setRoleToRevoke(role);
    };

    const executeRevokeRole = async () => {
        if (!selectedUser || !roleToRevoke) return;

        // Optimistic UI update or wait for load? We'll wait.
        try {
            const response = await fetch(
                `${env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/users/${selectedUser.id}/roles/${roleToRevoke}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );

            if (response.ok) {
                toast.success(`Role "${roleToRevoke}" revoked successfully!`);
                fetchUsers();
                setRoleToRevoke(null);
            } else {
                toast.error('Failed to revoke role');
            }
        } catch (error) {
            console.error('Failed to revoke role:', error);
            toast.error('Failed to revoke role');
        }
    };

    const grantProduct = async (userId: string, product: string) => {
        setActionLoading(true);
        try {
            const response = await fetch(
                `${env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/users/${userId}/products`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ product }),
                }
            );

            if (response.ok) {
                toast.success(`Product "${product}" granted successfully!`);
                fetchUsers();
                setShowProductModal(false);
            }
        } catch (error) {
            console.error('Failed to grant product:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const promptRevokeProduct = (user: User, product: string) => {
        setSelectedUser(user);
        setProductToRevoke(product);
    };

    const executeRevokeProduct = async () => {
        if (!selectedUser || !productToRevoke) return;

        setActionLoading(true);
        try {
            const response = await fetch(
                `${env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/users/${selectedUser.id}/products/${productToRevoke}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );

            if (response.ok) {
                toast.success(`Product "${productToRevoke}" revoked successfully!`);
                fetchUsers();
                setProductToRevoke(null);
            } else {
                toast.error('Failed to revoke product');
            }
        } catch (error) {
            console.error('Failed to revoke product:', error);
            toast.error('Failed to revoke product');
        } finally {
            setActionLoading(false);
        }
    };

    const deleteUser = async (userId: string) => {
        setActionLoading(true);
        try {
            const response = await fetch(
                `${env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/users/${userId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );

            if (response.ok) {
                toast.success('User deleted successfully!');
                fetchUsers();
                setShowDeleteModal(false);
                setSelectedUser(null);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            toast.error('Failed to delete user');
        } finally {
            setActionLoading(false);
        }
    };

    // Filter users based on selected filter
    const filteredUsers = users.filter(u => {
        if (filter === 'admins') {
            return u.roles.includes('admin') || u.roles.includes('superadmin');
        } else if (filter === 'users') {
            return !u.roles.includes('admin') && !u.roles.includes('superadmin');
        }
        return true; // 'all'
    });

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-merriweather font-bold text-dark mb-2">
                    {isSuperAdmin ? 'Superadmin Panel' : 'Admin Panel'}
                </h1>
                <p className="text-text/70 font-sans">
                    {isSuperAdmin
                        ? 'Manage all users, roles, and permissions'
                        : 'Manage user product access'}
                </p>
            </div>



            {usersLoading ? (
                <div className="text-center py-12">
                    <div className="text-gray-600">Loading users...</div>
                </div>
            ) : (
                <>
                    {/* Filter Tabs - Superadmin Only */}
                    {isSuperAdmin && (
                        <div className="mb-6 flex gap-2 border-b border-gray-200 overflow-x-auto pb-1 scrollbar-hide">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-6 py-3 font-medium transition border-b-2 whitespace-nowrap flex-shrink-0 ${filter === 'all'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                All ({users.length})
                            </button>
                            <button
                                onClick={() => setFilter('admins')}
                                className={`px-6 py-3 font-medium transition border-b-2 whitespace-nowrap flex-shrink-0 ${filter === 'admins'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Admins ({users.filter(u => u.roles.includes('admin') || u.roles.includes('superadmin')).length})
                            </button>
                            <button
                                onClick={() => setFilter('users')}
                                className={`px-6 py-3 font-medium transition border-b-2 whitespace-nowrap flex-shrink-0 ${filter === 'users'
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Users ({users.filter(u => !u.roles.includes('admin') && !u.roles.includes('superadmin')).length})
                            </button>
                        </div>
                    )}

                    <div className="bg-white rounded-xl border border-gray-200">
                        {/* Mobile Card View */}
                        <div className="lg:hidden divide-y divide-gray-200">
                            {filteredUsers.map((u) => (
                                <div key={u.id} className="p-4 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">{u.name || 'Unnamed User'}</div>
                                            <div className="text-xs text-gray-500">{u.email}</div>
                                            <div className="text-xs text-slate-400 mt-1">{new Date(u.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenActionMenu(openActionMenu === u.id ? null : u.id);
                                            }}
                                            className="action-menu-trigger p-1 text-gray-400 hover:text-gray-600"
                                        >
                                            <div className="relative">
                                                <div className="p-2 bg-gray-100 rounded-lg">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                    </svg>
                                                </div>
                                                {openActionMenu === u.id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                                                        {isSuperAdmin && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedUser(u);
                                                                    setShowRoleModal(true);
                                                                    setOpenActionMenu(null);
                                                                }}
                                                                className="w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                                                            >
                                                                Assign Role
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                setSelectedUser(u);
                                                                setShowProductModal(true);
                                                                setOpenActionMenu(null);
                                                            }}
                                                            className="w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                                                        >
                                                            Grant Product
                                                        </button>
                                                        {isSuperAdmin && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedUser(u);
                                                                    setShowDeleteModal(true);
                                                                    setOpenActionMenu(null);
                                                                }}
                                                                className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                                                            >
                                                                Delete User
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {/* Roles */}
                                        {u.roles.map((role) => (
                                            <div key={role} className="flex items-center gap-1">
                                                <span className={`px-2 py-1 text-xs rounded-full border ${role === 'superadmin' ? 'bg-red-50 text-red-700 border-red-200' : role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                                                    {role}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {/* Products */}
                                        {u.products && u.products.length > 0 ? (
                                            u.products.filter(p => p).map((product, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                                                    {product}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-400">No products</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Roles
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Products
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredUsers.map((u) => (
                                        <tr key={u.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{u.name || u.email}</div>
                                                <div className="text-sm text-gray-500">{u.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 flex-wrap">
                                                    {u.roles.map((role) => (
                                                        <div key={role} className="flex items-center gap-1">
                                                            <span
                                                                className={`px-2 py-1 text-xs rounded-full ${role === 'superadmin'
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : role === 'admin'
                                                                        ? 'bg-purple-100 text-purple-700'
                                                                        : 'bg-gray-100 text-gray-700'
                                                                    }`}
                                                            >
                                                                {role}
                                                            </span>
                                                            {isSuperAdmin && (
                                                                <button
                                                                    onClick={() => promptRevokeRole(u, role)}
                                                                    className="text-red-600 hover:text-red-700 text-xs"
                                                                    title="Revoke role"
                                                                >
                                                                    ×
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 flex-wrap">
                                                    {u.products && u.products.length > 0 ? (
                                                        u.products
                                                            .filter((product: string | null) => product) // Filter out null/undefined
                                                            .map((product: string, index: number) => (
                                                                <div key={`${product}-${index}`} className="flex items-center gap-1">
                                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                                                        {product}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => promptRevokeProduct(u, product)}
                                                                        className="text-red-600 hover:text-red-700 text-xs"
                                                                        title="Revoke access"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                            ))
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">No products</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenActionMenu(openActionMenu === u.id ? null : u.id);
                                                        }}
                                                        className="action-menu-trigger px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-2"
                                                    >
                                                        <span className="text-sm font-medium text-gray-900">Actions</span>
                                                        <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>

                                                    {openActionMenu === u.id && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                                            {isSuperAdmin && (
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedUser(u);
                                                                        setShowRoleModal(true);
                                                                        setOpenActionMenu(null);
                                                                    }}
                                                                    className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                                                                >
                                                                    <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                    </svg>
                                                                    Assign Role
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedUser(u);
                                                                    setShowProductModal(true);
                                                                    setOpenActionMenu(null);
                                                                }}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                                                            >
                                                                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                                </svg>
                                                                Grant Product
                                                            </button>
                                                            {isSuperAdmin && (
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedUser(u);
                                                                        setShowDeleteModal(true);
                                                                        setOpenActionMenu(null);
                                                                    }}
                                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2 border-t border-gray-100"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                    Delete User
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Role Assignment Modal - Superadmin Only */}
            {selectedUser && (
                <Modal
                    isOpen={showRoleModal && isSuperAdmin}
                    onClose={() => setShowRoleModal(false)}
                    size="md"
                >
                    <div className="flex flex-col">
                        {/* Centered Header */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="bg-purple-50 p-3 rounded-full mb-4">
                                <Shield className="w-8 h-8 text-purple-600" strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Assign Role
                            </h3>
                            <p className="text-gray-500 max-w-sm">
                                Managing roles for <span className="font-medium text-gray-900">{selectedUser.name || selectedUser.email}</span>
                            </p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => assignRole(selectedUser.id, 'superadmin')}
                                disabled={actionLoading}
                                className={`
                                    relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all w-full
                                    ${selectedUser.roles.includes('superadmin')
                                        ? 'border-red-600 bg-red-50'
                                        : 'border-gray-200 hover:border-red-200 hover:bg-red-50/30'
                                    }
                                `}
                            >
                                <div className={`p-2 rounded-lg ${selectedUser.roles.includes('superadmin') ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                                    <ShieldAlert size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-bold ${selectedUser.roles.includes('superadmin') ? 'text-red-900' : 'text-gray-900'}`}>Superadmin</h3>
                                        {selectedUser.roles.includes('superadmin') && <CheckCircle size={18} className="text-red-600" />}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Full access to all system settings, user management, and sensitive operations.</p>
                                </div>
                            </button>

                            <button
                                onClick={() => assignRole(selectedUser.id, 'admin')}
                                disabled={actionLoading}
                                className={`
                                    relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all w-full
                                    ${selectedUser.roles.includes('admin')
                                        ? 'border-purple-600 bg-purple-50'
                                        : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/30'
                                    }
                                `}
                            >
                                <div className={`p-2 rounded-lg ${selectedUser.roles.includes('admin') ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                                    <Shield size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-bold ${selectedUser.roles.includes('admin') ? 'text-purple-900' : 'text-gray-900'}`}>Admin</h3>
                                        {selectedUser.roles.includes('admin') && <CheckCircle size={18} className="text-purple-600" />}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Can manage products and view user data but cannot delete users or change roles.</p>
                                </div>
                            </button>

                            <button
                                onClick={() => assignRole(selectedUser.id, 'user')}
                                disabled={actionLoading}
                                className={`
                                    relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all w-full
                                    ${selectedUser.roles.includes('user')
                                        ? 'border-gray-600 bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }
                                `}
                            >
                                <div className={`p-2 rounded-lg ${selectedUser.roles.includes('user') ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'}`}>
                                    <UserIcon size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-bold ${selectedUser.roles.includes('user') ? 'text-gray-900' : 'text-gray-900'}`}>Standard User</h3>
                                        {selectedUser.roles.includes('user') && <CheckCircle size={18} className="text-gray-600" />}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Default access level. Can use granted products and manage their own profile.</p>
                                </div>
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowRoleModal(false)}
                                className="px-8 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 hover:text-gray-900 transition w-full sm:w-auto"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Product Grant Modal */}
            {selectedUser && (
                <Modal
                    isOpen={showProductModal}
                    onClose={() => setShowProductModal(false)}
                    size="md"
                >
                    <div className="flex flex-col">
                        {/* Centered Header */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="bg-blue-50 p-3 rounded-full mb-4">
                                <CreditCard className="w-8 h-8 text-blue-600" strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Grant Product Access
                            </h3>
                            <p className="text-gray-500 max-w-sm">
                                Control which applications <span className="font-medium text-gray-900">{selectedUser.name || selectedUser.email}</span> can access.
                            </p>
                        </div>

                        <div className="space-y-3 mb-6">
                            {/* Cardify */}
                            <button
                                onClick={() => grantProduct(selectedUser.id, 'cardify')}
                                disabled={actionLoading}
                                className={`
                                    relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all w-full
                                    ${selectedUser.products.includes('cardify')
                                        ? 'border-purple-600 bg-purple-50'
                                        : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/30'
                                    }
                                `}
                            >
                                <div className={`p-2 rounded-lg ${selectedUser.products.includes('cardify') ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                                    <CreditCard size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-bold ${selectedUser.products.includes('cardify') ? 'text-purple-900' : 'text-gray-900'}`}>Cardify</h3>
                                        {selectedUser.products.includes('cardify') && <CheckCircle size={18} className="text-purple-600" />}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Digital business card platform. Allows users to create, design, and share digital cards.</p>
                                </div>
                            </button>

                            {/* QR Studio */}
                            <button
                                onClick={() => grantProduct(selectedUser.id, 'qrstudio')}
                                disabled={actionLoading}
                                className={`
                                    relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all w-full
                                    ${selectedUser.products.includes('qrstudio')
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
                                    }
                                `}
                            >
                                <div className={`p-2 rounded-lg ${selectedUser.products.includes('qrstudio') ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                    <QrCode size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-bold ${selectedUser.products.includes('qrstudio') ? 'text-blue-900' : 'text-gray-900'}`}>QR Studio</h3>
                                        {selectedUser.products.includes('qrstudio') && <CheckCircle size={18} className="text-blue-600" />}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Advanced QR code generator with analytics, dynamic content, and template library.</p>
                                </div>
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowProductModal(false)}
                                className="px-8 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 hover:text-gray-900 transition w-full sm:w-auto"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Delete User Modal - Superadmin Only */}
            <ConfirmationModal
                isOpen={showDeleteModal && !!selectedUser && isSuperAdmin}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => selectedUser && deleteUser(selectedUser.id)}
                title="Delete User"
                message={`Are you sure you want to delete ${selectedUser?.name || selectedUser?.email}? All their data, designs, and access will be permanently removed.`}
                confirmText="Delete User"
                variant="danger"
                isLoading={actionLoading}
            />

            {/* Revoke Role Modal */}
            <ConfirmationModal
                isOpen={!!roleToRevoke}
                onClose={() => setRoleToRevoke(null)}
                onConfirm={executeRevokeRole}
                title="Revoke Role"
                message={`Are you sure you want to remove the "${roleToRevoke}" role from ${selectedUser?.name || selectedUser?.email}?`}
                confirmText="Revoke Role"
                variant="danger"
                isLoading={actionLoading}
            />

            {/* Revoke Product Modal */}
            <ConfirmationModal
                isOpen={!!productToRevoke}
                onClose={() => setProductToRevoke(null)}
                onConfirm={executeRevokeProduct}
                title="Revoke Product Access"
                message={`Are you sure you want to remove access to ${productToRevoke}?`}
                confirmText="Revoke Access"
                variant="danger"
                isLoading={actionLoading}
            />


        </div >
    );
}
