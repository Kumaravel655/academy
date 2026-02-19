'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CourseCard } from '@/components/course-card';
import { CourseFilter } from '@/components/course-filter';
import { api } from '@/lib/api';
import { CourseLevel } from '@/lib/types';
import { Search } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high' | 'newest'>('rating');

  useEffect(() => {
    api.courses.list().then(setCourses).catch(console.error);
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(courses.map((c) => c.category)));

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      // Search filter
      if (
        searchTerm &&
        !course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !course.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (selectedCategory && course.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel && course.level !== selectedLevel) {
        return false;
      }

      // Price filter
      if (selectedPrice === 'free' && course.price > 0) {
        return false;
      }
      if (selectedPrice === 'paid' && course.price === 0) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [searchTerm, selectedCategory, selectedLevel, selectedPrice, sortBy]);

  return (
    <main className="overflow-hidden">
      <Header />

      {/* Page Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/95 to-slate-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm font-semibold mb-4">
            <Search size={14} />
            Browse & Learn
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Our Courses
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Choose from our wide range of professional courses designed to help you succeed in your programming career.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white dark:bg-gray-900 sticky top-0 z-40 border-b border-border/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search courses by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-muted/50 border border-border/60 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gradient-to-b from-slate-50/50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <CourseFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedLevel={selectedLevel}
                onLevelChange={setSelectedLevel}
                selectedPrice={selectedPrice}
                onPriceChange={setSelectedPrice}
              />
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              {/* Sort Options */}
              <div className="flex justify-between items-center mb-8">
                <p className="text-sm text-muted-foreground">
                  Found <span className="font-bold text-foreground">{filteredCourses.length}</span> courses
                </p>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | 'rating'
                        | 'price-low'
                        | 'price-high'
                        | 'newest'
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                >
                  <option value="rating">Sort: Highest Rated</option>
                  <option value="newest">Sort: Newest</option>
                  <option value="price-low">Sort: Price (Low to High)</option>
                  <option value="price-high">Sort: Price (High to Low)</option>
                </select>
              </div>

              {/* Courses Grid */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-12 text-center shadow-premium">
                  <p className="text-muted-foreground mb-4">
                    No courses found matching your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedLevel(null);
                      setSelectedPrice('all');
                      setSearchTerm('');
                    }}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
