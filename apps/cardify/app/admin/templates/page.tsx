"use client";

import { useState, useEffect } from 'react';
import { Upload, Download, Trash2, Star, Eye, EyeOff, RefreshCw, Search, Filter, Edit, Plus } from 'lucide-react';
import Link from 'next/link';
import AdminTemplateCard from '@/components/templates/AdminTemplateCard';
import { CardTemplate } from '@/types/template';

export default function TemplateManagementPage() {
    // Note: Using CardTemplate type which might need adaptation depending on API response
    // flexible typing until exact match is confirmed
    const [templates, setTemplates] = useState<any[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);

    // Load templates
    useEffect(() => {
        loadTemplates();
        loadCategories();
    }, [filterCategory]);

    const loadTemplates = async () => {
        setLoading(true);
        try {
            const url = filterCategory === 'all'
                ? '/api/templates'
                : `/api/templates?category=${filterCategory}`;

            const response = await fetch(url);
            const data = await response.json();

            // Transform data to include metadata
            const templatesWithMeta = await Promise.all(
                data.map(async (template: any) => {
                    const metaResponse = await fetch(`/api/templates/${template.id}`);
                    const meta = await metaResponse.json();
                    return {
                        ...meta,
                        ...meta.data, // Flatten the JSON data (layers, width, height) to top level
                    };
                })
            );

            setTemplates(templatesWithMeta);
        } catch (error) {
            console.error('Failed to load templates:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await fetch('/api/templates/categories');
            const data = await response.json();
            setCategories(data.categories || []);
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    // File upload
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const content = await file.text();
            const template = JSON.parse(content);

            const response = await fetch('/api/templates/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ template, overwrite: false }),
            });

            if (response.ok) {
                await loadTemplates();
                alert('Template imported successfully!');
            } else {
                const error = await response.json();
                if (response.status === 409) {
                    if (confirm(`${error.message} Do you want to overwrite?`)) {
                        const retryResponse = await fetch('/api/templates/import', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ template, overwrite: true }),
                        });
                        if (retryResponse.ok) {
                            await loadTemplates();
                            alert('Template updated successfully!');
                        }
                    }
                } else {
                    alert(`Import failed: ${error.error}`);
                }
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload template');
        }

        // Reset file input
        e.target.value = '';
    };


    // Actions for Cards
    const handleDelete = async (template: CardTemplate) => {
        if (!confirm(`Delete template "${template.name}"?`)) return;

        try {
            const response = await fetch(`/api/templates/${template.id}`, { method: 'DELETE' });
            if (response.ok) {
                loadTemplates(); // Reload to refresh grid
            } else {
                alert('Failed to delete template');
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleToggleFeatured = async (template: CardTemplate) => {
        // Optimistic update could go here, but strict reload ensures consistency
        try {
            const response = await fetch(`/api/templates/${template.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isFeatured: !template.isFeatured }),
            });
            if (response.ok) {
                loadTemplates();
            }
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    const handleExport = async (template: CardTemplate) => {
        try {
            // We might have the full data in local state, but fetching fresh is safer
            // Assuming template.data exists or we fetch it
            const response = await fetch(`/api/templates/${template.id}`);
            const data = await response.json();

            const blob = new Blob([JSON.stringify(data.data, null, 2)], {
                type: 'application/json',
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${template.id}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export template');
        }
    };


    // Filter templates
    const filteredTemplates = templates.filter(t =>
        searchQuery === '' ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-merriweather font-bold text-gray-900">Manage Cards</h1>
                            <p className="mt-2 text-slate-600">Organize and manage business card templates.</p>
                        </div>
                        <div className="flex gap-3">
                            <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 cursor-pointer transition shadow-sm font-medium">
                                <Upload size={18} />
                                <span>Import JSON</span>
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                            <Link
                                href="/admin/templates/new"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm font-medium"
                            >
                                <Plus size={18} />
                                <span>New Template</span>
                            </Link>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="mt-8 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                            <button
                                onClick={() => setFilterCategory('all')}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${filterCategory === 'all'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                All Cards ({templates.length})
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.name}
                                    onClick={() => setFilterCategory(cat.name)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${filterCategory === cat.name
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    {cat.name} ({cat.count})
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-20">
                        <RefreshCw size={40} className="animate-spin mx-auto text-blue-500 mb-4" />
                        <p className="text-gray-500 font-medium">Loading templates...</p>
                    </div>
                ) : filteredTemplates.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No templates found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2">
                            Try adjusting your search or filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTemplates.map(template => (
                            <AdminTemplateCard
                                key={template.id}
                                template={template}
                                onDelete={handleDelete}
                                onToggleFeatured={handleToggleFeatured}
                                onExport={handleExport}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
