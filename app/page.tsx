'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { AppCard } from '@/components/AppCard';
import { AppHeader } from '@/components/AppHeader';
import { FilterToolbar } from '@/components/FilterToolbar';
import { PaginationControls } from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import appsData from '@/data/apps.json';
import type { AppEntry } from '@/data/types';

const apps = appsData as AppEntry[];
const repoUrl = 'https://github.com/rickstaa/byoc-example-apps';
const contributeUrl = `${repoUrl}/blob/main/CONTRIBUTING.md`;

export default function Home() {
  const [search, setSearch] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Extract unique categories from apps data.
  const categoryOptions = useMemo(() => {
    const allTags = apps.flatMap((app) => app.tags || []);
    return Array.from(new Set(allTags)).sort((a, b) => a.localeCompare(b));
  }, []);

  // Filter apps based on search, selected categories, and active tag.
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const selectedLower = selectedCategories.map((c) => c.toLowerCase());
    return apps.filter((app) => {
      const haystack = `${app.name} ${app.tagline} ${app.tags.join(' ')}`.toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      const matchesCategories =
        selectedCategories.length === 0 ||
        app.tags.some((tag) => selectedLower.includes(tag.toLowerCase()));
      return matchesSearch && matchesCategories;
    });
  }, [search, selectedCategories]);

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPage(1);
  };

  useEffect(() => {
    // Close category dropdown when clicking outside.
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setPage(1); // Reset to first page on filter/search change.
  }, [search, selectedCategories, pageSize]);

  useEffect(() => {
    // Adjust page size based on viewport dimensions.
    const computePageSize = () => {
      if (typeof window === 'undefined') return 6;
      const isCompact = window.innerHeight < 900 || window.innerWidth < 1100;
      return isCompact ? 4 : 6;
    };
    const handleResize = () => setPageSize(computePageSize());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    // Ensure current page is within valid range after filtering.
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  return (
    <div className="min-h-screen pb-9">
      <AppHeader repoUrl={repoUrl} contributeUrl={contributeUrl} />
      <div className="mx-auto w-full max-w-6xl px-6">
        <Separator className="mt-3 border-white/10" />
      </div>

      <main className="mx-auto mt-5 flex max-w-6xl flex-col gap-6 px-6">
        <section className="glass-panel relative z-10 flex flex-col gap-3 overflow-visible p-3">
          <FilterToolbar
            selectedCategories={selectedCategories}
            categoryOptions={categoryOptions}
            categoryOpen={categoryOpen}
            categoryRef={categoryRef}
            search={search}
            onClearAll={clearFilters}
            onToggleDropdown={() => setCategoryOpen((prev) => !prev)}
            onToggleCategory={toggleCategory}
            onSearchChange={setSearch}
          />
        </section>

        {filtered.length === 0 ? (
          <section className="glass-panel flex flex-col items-center gap-3 px-6 py-14 text-center">
            <h2 className="text-2xl font-semibold text-foreground">No matches yet.</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Try another tag or search phrase, or add the first community app in this category.
            </p>
            <Button variant="default" className="rounded-full" asChild>
              <a href={repoUrl} target="_blank" rel="noreferrer">
                Add an app
              </a>
            </Button>
          </section>
        ) : (
          <>
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paginated.map((app, index) => (
                <div
                  key={app.name}
                  className="animate-rise"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <AppCard app={app} />
                </div>
              ))}
            </section>

            <PaginationControls
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
              onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            />
          </>
        )}
      </main>
    </div>
  );
}
