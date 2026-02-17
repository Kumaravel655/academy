'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CourseCard } from '@/components/course-card';
import { CourseFilter } from '@/components/course-filter';
import { courses } from '@/lib/courses-data';
import { CourseLevel } from '@/lib/types';
import { Search } from 'lucide-react';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high' | 'newest'>('rating');

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
    <main>
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Choose from our wide range of professional courses designed to help you
            succeed in your programming career.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-background sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search courses by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
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
                  className="px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                <div className="bg-card border border-border rounded-lg p-12 text-center">
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
