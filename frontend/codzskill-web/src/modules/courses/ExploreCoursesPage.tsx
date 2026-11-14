
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CourseCard } from '../../shared/components/common/CourseCard';
import { useAsync } from '../../shared/hooks/useAsync';
import { courseService } from '../../shared/services/courseService';
import type { CourseCategory } from '../../shared/types';
import { cn } from '../../shared/utilis/formatters';

const CATEGORIES: CourseCategory[] = [
  'All',
  'Development',
  'AI & Data',
  'Cloud & DevOps',
  'Business',
  'Design',
];

export const ExploreCoursesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('category') as CourseCategory) || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<CourseCategory>(
    CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  );
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(20000);

  const fetchCourses = useCallback(() => courseService.getCourses(), []);
  const { data: courses, loading, error } = useAsync(fetchCourses);

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category') as CourseCategory | null;
    if (q !== null) setQuery(q);
    if (cat && CATEGORIES.includes(cat)) setActiveCategory(cat);
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter((c) => {
      const matchesCat = activeCategory === 'All' || c.category === activeCategory;
      const matchesQuery =
        !query.trim() ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        c.techTag.toLowerCase().includes(query.toLowerCase());
      const matchesPrice = c.priceInr <= maxPrice;
      return matchesCat && matchesQuery && matchesPrice;
    });
  }, [courses, activeCategory, query, maxPrice]);

  const handleCategoryChange = (cat: CourseCategory) => {
    setActiveCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === 'All') next.delete('category');
    else next.set('category', cat);
    setSearchParams(next);
  };

  return (
    <div className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header + Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Explore Courses
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Learn in-demand skills with industry experts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses (e.g., .NET, React, AI, DevOps)..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-violet-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
        </div>

        {/* Optional Price Filter Drawer */}
        {showFilters && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700">
                Max Price: <span className="font-bold text-violet-600">₹{maxPrice.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={10000}
                max={25000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-violet-600"
              />
            </div>
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('All');
                setMaxPrice(20000);
              }}
              className="text-xs font-semibold text-violet-600 hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                activeCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-slate-900'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            Loading courses...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {!loading && !error && filteredCourses.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-base font-semibold text-slate-800">
              No courses matched your filters.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try clearing your search keyword or switching categories.
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};
