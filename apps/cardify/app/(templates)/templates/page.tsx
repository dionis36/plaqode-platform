"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CardTemplate } from "@/types/template";
import TemplateCard from "@/components/templates/TemplateCard";
import TemplateGrid from "@/components/templates/TemplateGrid";
import TemplateFilters from "@/components/templates/TemplateFilters";
import { TemplateFilterOptions } from "@/lib/templateRegistry";
import { Pagination } from "@/components/ui/Pagination";
import StaticNavbar from "@/components/layout/StaticNavbar";
import SmartNavbar from "@/components/layout/SmartNavbar";

const TemplatesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse page from URL or default to 1
  const initialPage = Number(searchParams.get('page')) || 1;

  const [templates, setTemplates] = useState<CardTemplate[]>([]);
  const [filters, setFilters] = useState<TemplateFilterOptions>({
    category: searchParams.get('category') || 'All',
    search: '',
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load from database
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        console.log('[Templates] Fetching from /api/templates...');
        const response = await fetch('/api/templates');
        console.log('[Templates] Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const baseTemplates = await response.json();
        console.log('[Templates] Loaded base templates:', baseTemplates.length);

        // Generate color variations for each template
        const { generateVariations } = await import('@/lib/templateVariations');
        const { shuffleArray } = await import('@/lib/utils');

        console.log('[Templates] Generating variations...');
        const allTemplatesNested = await Promise.all(
          baseTemplates.map((t: CardTemplate) => generateVariations(t))
        );
        const allTemplates = allTemplatesNested.flat();

        // Shuffle so variations aren't grouped together
        const shuffled = shuffleArray(allTemplates);

        console.log('[Templates] Total with variations:', shuffled.length);
        setTemplates(shuffled);
        setIsLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error('[Templates] Failed to load templates:', error);
        setIsLoading(false);
      }
    };
    loadTemplates();
  }, []);

  // Filter logic - now done client-side since we have all templates
  const [filteredTemplates, setFilteredTemplates] = useState<CardTemplate[]>([]);

  useEffect(() => {
    if (!isLoaded) return;

    console.log('[Templates] Filtering templates. Total:', templates.length);
    console.log('[Templates] Filters:', filters);

    let filtered = templates;

    // Filter by category
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(t => t.category === filters.category);
      console.log('[Templates] After category filter:', filtered.length);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower) ||
        (t.tags && t.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)))
      );
      console.log('[Templates] After search filter:', filtered.length);
    }

    console.log('[Templates] Final filtered count:', filtered.length);
    setFilteredTemplates(filtered);
  }, [filters, templates, isLoaded]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(initialPage);
  const ITEMS_PER_PAGE = 36;

  // Sync state with URL changes (e.g. Back button)
  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    setCurrentPage(page);

    const category = searchParams.get('category') || 'All';
    if (category !== filters.category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  // Derived visible templates
  const totalItems = filteredTemplates.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const visibleTemplates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredTemplates.slice(start, end);
  }, [currentPage, filteredTemplates, ITEMS_PER_PAGE]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Update URL
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    if (filters.category && filters.category !== 'All') {
      params.set('category', filters.category);
    } else {
      params.delete('category');
    }

    router.push(`?${params.toString()}`, { scroll: false });

    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: TemplateFilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (newFilters.category && newFilters.category !== 'All') {
      params.set('category', newFilters.category);
    } else {
      params.delete('category');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg relative">
      <SmartNavbar />

      {/* Hero Section with Internal Static Nav */}
      <div className="relative bg-dark text-center py-24 sm:py-32 px-4 overflow-hidden">
        <StaticNavbar />

        {/* Background Pattern/Gradient */}
        <div className="absolute inset-0 bg-[url('/img/hero-bg.jpg')] bg-cover bg-center opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/90 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto pt-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-merriweather font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-6">
            Business Card Designs
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-sans">
            Select a premium layout to begin your professional identity.
            Each design is fully customizable to align with your corporate branding.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {filters.category && filters.category !== 'All' ? `${filters.category} Templates` : 'All Templates'}
          </h1>
          <TemplateFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <TemplateGrid templates={visibleTemplates} />

            <div className="border-t border-gray-200 mt-12 pt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default TemplatesPage;
