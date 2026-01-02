"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, AlertCircle, CheckCircle, ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import { validateTemplate, ValidationError } from '@/lib/schemaValidator';

interface Template {
    id: string;
    name: string;
    description?: string;
    category: string;
    tags: string[];
    data: any;
    version: number;
    isFeatured: boolean;
    isPublic: boolean;
}

export default function TemplateEditPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [template, setTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'schema'>('basic');

    // Basic form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [isPublic, setIsPublic] = useState(true);

    // Advanced JSON state
    const [jsonData, setJsonData] = useState('');
    const [jsonError, setJsonError] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

    // Schema editor state
    const [schemaData, setSchemaData] = useState('');
    const [schemaError, setSchemaError] = useState('');
    const [schemaLoading, setSchemaLoading] = useState(false);

    // Load template
    useEffect(() => {
        loadTemplate();
    }, [params.id]);

    const loadTemplate = async () => {
        try {
            const response = await fetch(`/api/templates/${params.id}`);
            if (!response.ok) {
                throw new Error('Template not found');
            }
            const data = await response.json();
            setTemplate(data);

            // Set form values
            setName(data.name);
            setDescription(data.description || '');
            setCategory(data.category);
            setTagsInput(data.tags.join(', '));
            setIsFeatured(data.isFeatured);
            setIsPublic(data.isPublic);
            setJsonData(JSON.stringify(data.data, null, 2));
        } catch (error) {
            console.error('Failed to load template:', error);
            alert('Failed to load template');
            router.push('/admin/templates');
        } finally {
            setLoading(false);
        }
    };

    const loadSchema = async () => {
        setSchemaLoading(true);
        try {
            const response = await fetch('/api/templates/schema');
            const data = await response.json();
            setSchemaData(JSON.stringify(data.schema, null, 2));
        } catch (error) {
            console.error('Failed to load schema:', error);
            setSchemaError('Failed to load schema');
        } finally {
            setSchemaLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveSuccess(false);

        try {
            // Handle schema save
            if (activeTab === 'schema') {
                try {
                    const parsedSchema = JSON.parse(schemaData);
                    setSchemaError('');

                    const response = await fetch('/api/templates/schema', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ schema: parsedSchema }),
                    });

                    if (response.ok) {
                        setSaveSuccess(true);
                        setTimeout(() => setSaveSuccess(false), 3000);
                    } else {
                        const error = await response.json();
                        setSchemaError(error.error || 'Failed to save schema');
                    }
                } catch (e) {
                    setSchemaError('Invalid JSON format');
                    setSaving(false);
                    return;
                }
                setSaving(false);
                return;
            }

            // Handle template save
            let dataToSave = template?.data;

            // If in advanced mode, validate and parse JSON
            if (activeTab === 'advanced') {
                try {
                    dataToSave = JSON.parse(jsonData);
                    setJsonError('');

                    // Validate against schema
                    const validation = validateTemplate(dataToSave);
                    if (!validation.valid) {
                        setValidationErrors(validation.errors);
                        setSaving(false);
                        return;
                    }
                    setValidationErrors([]);
                } catch (e) {
                    setJsonError('Invalid JSON format. Please fix the syntax errors.');
                    setSaving(false);
                    return;
                }
            }

            // Prepare update payload
            const payload: any = {
                name,
                description: description || undefined,
                category,
                tags: tagsInput.split(',').map(t => t.trim()).filter(t => t),
                isFeatured,
                isPublic,
            };

            // Include data if it was modified in advanced mode
            if (activeTab === 'advanced') {
                payload.data = dataToSave;
            }

            const response = await fetch(`/api/templates/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSaveSuccess(true);
                await loadTemplate(); // Reload to get updated version
                setTimeout(() => setSaveSuccess(false), 3000);
            } else {
                const error = await response.json();
                alert(`Failed to save: ${error.error}`);
            }
        } catch (error) {
            console.error('Save failed:', error);
            alert('Failed to save template');
        } finally {
            setSaving(false);
        }
    };

    const handleJsonChange = (value: string) => {
        setJsonData(value);
        if (jsonError) setJsonError('');
        if (validationErrors.length > 0) setValidationErrors([]);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading template...</p>
                </div>
            </div>
        );
    }

    if (!template) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b mb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-4 overflow-hidden">
                            <Link
                                href="/admin/templates"
                                className="text-gray-500 hover:text-gray-900 transition flex-shrink-0 p-2 hover:bg-gray-100 rounded-xl"
                            >
                                <ArrowLeft size={22} />
                            </Link>
                            <div className="min-w-0 flex flex-col">
                                <h1 className="text-xl md:text-2xl font-merriweather font-bold text-gray-900 truncate leading-tight">
                                    <span className="md:hidden">Edit</span>
                                    <span className="hidden md:inline">Edit Template</span>
                                </h1>
                                <p className="text-sm text-gray-500 truncate hidden md:block mt-1">
                                    {template.id} • v{template.version}
                                </p>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {saveSuccess && (
                                <div className="hidden md:flex items-center text-green-600 text-sm font-medium animate-fade-in bg-green-50 px-3 py-1 rounded-full border border-green-100">
                                    <CheckCircle size={14} className="mr-1.5" />
                                    Saved
                                </div>
                            )}

                            {/* Cancel Button - Hidden on mobile */}
                            <button
                                onClick={() => router.push('/admin/templates')}
                                className="hidden md:block px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm"
                            >
                                Cancel
                            </button>

                            {/* Save Button - Compact on mobile */}
                            <button
                                onClick={handleSave}
                                disabled={saving ||
                                    (activeTab === 'advanced' && (!!jsonError || validationErrors.length > 0)) ||
                                    (activeTab === 'schema' && !!schemaError)
                                }
                                className="flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 text-sm font-medium shadow-sm active:scale-95 transform duration-150"
                            >
                                <Save size={18} className="md:mr-2" />
                                <span className="hidden md:inline">{saving ? 'Saving...' : 'Save Changes'}</span>
                                <span className="md:hidden ml-1.5">{saving ? '...' : 'Save'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 gap-6">
                        <button
                            onClick={() => setActiveTab('basic')}
                            className={`pb-3 pt-1 text-sm md:text-base font-medium transition whitespace-nowrap border-b-2 ${activeTab === 'basic'
                                ? 'text-blue-600 border-blue-600'
                                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Basic Info
                        </button>
                        <button
                            onClick={() => setActiveTab('advanced')}
                            className={`pb-3 pt-1 text-sm md:text-base font-medium transition whitespace-nowrap border-b-2 ${activeTab === 'advanced'
                                ? 'text-blue-600 border-blue-600'
                                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            JSON Editor
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('schema');
                                if (!schemaData) loadSchema();
                            }}
                            className={`pb-3 pt-1 text-sm md:text-base font-medium transition whitespace-nowrap border-b-2 flex items-center ${activeTab === 'schema'
                                ? 'text-purple-600 border-purple-600'
                                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Shield size={16} className="mr-1.5" />
                            Schema
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'basic' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                        <div className="max-w-3xl space-y-8">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Template Name *
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="e.g., Modern Business Card"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Describe this template..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
                                        >
                                            <option value="Business">Business</option>
                                            <option value="Creative">Creative</option>
                                            <option value="General">General</option>
                                            <option value="Modern">Modern</option>
                                            <option value="Minimal">Minimal</option>
                                            <option value="Professional">Professional</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={tagsInput}
                                        onChange={(e) => setTagsInput(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Tags (comma separated)"
                                    />
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 mr-4"
                                    />
                                    <div>
                                        <span className="block text-sm font-semibold text-gray-900">Featured Template</span>
                                        <span className="block text-xs text-gray-500">Highlight this template in the featured section</span>
                                    </div>
                                </label>

                                <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isPublic}
                                        onChange={(e) => setIsPublic(e.target.checked)}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 mr-4"
                                    />
                                    <div>
                                        <span className="block text-sm font-semibold text-gray-900">Public (Visible)</span>
                                        <span className="block text-xs text-gray-500">Make this template visible to all users</span>
                                    </div>
                                </label>
                            </div>

                            {/* Info */}
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                                <div className="p-1 bg-blue-100 rounded-full text-blue-600 mt-0.5">
                                    <Shield size={16} />
                                </div>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    <strong className="font-semibold block mb-1">Advanced Editing</strong>
                                    To edit template layers, specific colors, and deeper structure, please switch to the "JSON Editor" tab.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'schema' ? (
                    <div className="space-y-6">
                        {/* Schema Error Alert */}
                        {schemaError && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
                                <AlertCircle className="text-red-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-semibold text-red-900">Schema Error</h4>
                                    <p className="text-sm text-red-700 mt-1">{schemaError}</p>
                                </div>
                            </div>
                        )}

                        {/* Schema Info */}
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 flex items-start">
                            <Shield className="text-purple-600 mr-4 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <h4 className="font-semibold text-purple-900 text-lg">Template Schema Editor</h4>
                                <p className="text-sm text-purple-700 mt-1 leading-relaxed">
                                    Edit the global JSON Schema that validates all templates. Changes here will affect validation for all templates in the system.
                                </p>
                            </div>
                        </div>

                        {/* Schema Editor */}
                        {schemaLoading ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-20 text-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto"></div>
                                <p className="text-gray-600 mt-6 font-medium">Loading schema...</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Schema JSON</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">public/templates/schema.json</p>
                                    </div>
                                    <div className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                        System Config
                                    </div>
                                </div>
                                <div className="p-0">
                                    <textarea
                                        value={schemaData}
                                        onChange={(e) => {
                                            setSchemaData(e.target.value);
                                            if (schemaError) setSchemaError('');
                                        }}
                                        className={`w-full px-6 py-4 font-mono text-sm focus:outline-none focus:ring-0 ${schemaError ? 'bg-red-50' : 'bg-white'
                                            }`}
                                        rows={30}
                                        spellCheck={false}
                                        style={{
                                            tabSize: 2,
                                            lineHeight: '1.6',
                                            fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace'
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* JSON Error Alert */}
                        {jsonError && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
                                <AlertCircle className="text-red-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-semibold text-red-900">JSON Syntax Error</h4>
                                    <p className="text-sm text-red-700 mt-1">{jsonError}</p>
                                </div>
                            </div>
                        )}

                        {/* JSON Editor */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Template JSON Data</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Edit component structure</p>
                                </div>
                                <div className="flex gap-2 text-xs">
                                    <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded">ID: {template.id}</span>
                                </div>
                            </div>
                            <div className="p-0">
                                <textarea
                                    value={jsonData}
                                    onChange={(e) => handleJsonChange(e.target.value)}
                                    className={`w-full px-6 py-4 font-mono text-sm focus:outline-none focus:ring-0 ${jsonError ? 'bg-red-50' : 'bg-white'
                                        }`}
                                    rows={35}
                                    spellCheck={false}
                                    style={{
                                        tabSize: 2,
                                        lineHeight: '1.6',
                                        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Help Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Warning</h4>
                                <p className="text-sm text-yellow-800 leading-relaxed">
                                    Editing JSON directly is powerful but risky. One missing comma can break the template.
                                    Always ensure your JSON is valid before saving. Use an external validator if unsure.
                                </p>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-3">📋 Core Structure</h4>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li className="flex items-center"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono mr-2 text-gray-800">id</code> <span className="text-gray-500">- Unique identifier</span></li>
                                    <li className="flex items-center"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono mr-2 text-gray-800">layers</code> <span className="text-gray-500">- Array of visual elements</span></li>
                                    <li className="flex items-center"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono mr-2 text-gray-800">background</code> <span className="text-gray-500">- Canvas settings</span></li>
                                    <li className="flex items-center"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono mr-2 text-gray-800">colorRoles</code> <span className="text-gray-500">- Theme variable mappings</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
