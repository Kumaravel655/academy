import { CourseLevel } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface CourseFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedLevel: CourseLevel | null;
  onLevelChange: (level: CourseLevel | null) => void;
  selectedPrice: 'all' | 'free' | 'paid';
  onPriceChange: (price: 'all' | 'free' | 'paid') => void;
}

export function CourseFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  selectedPrice,
  onPriceChange,
}: CourseFilterProps) {
  const levels: CourseLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

  const hasActiveFilters = selectedCategory || selectedLevel || selectedPrice !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onCategoryChange(null);
              onLevelChange(null);
              onPriceChange('all');
            }}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-foreground mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() =>
                  onCategoryChange(selectedCategory === category ? null : category)
                }
                className="w-4 h-4 rounded border-primary text-primary bg-secondary cursor-pointer"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Level Filter */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-foreground mb-3">Level</h4>
        <div className="space-y-2">
          {levels.map((level) => (
            <label
              key={level}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedLevel === level}
                onChange={() =>
                  onLevelChange(selectedLevel === level ? null : level)
                }
                className="w-4 h-4 rounded border-primary text-primary bg-secondary cursor-pointer"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Price</h4>
        <div className="space-y-2">
          {[
            { value: 'all' as const, label: 'All Prices' },
            { value: 'free' as const, label: 'Free' },
            { value: 'paid' as const, label: 'Paid' },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="price"
                checked={selectedPrice === value}
                onChange={() => onPriceChange(value)}
                className="w-4 h-4 text-primary cursor-pointer"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <Badge
                variant="secondary"
                className="gap-1 bg-primary/10 border-primary/30 text-primary"
              >
                {selectedCategory}
                <button
                  onClick={() => onCategoryChange(null)}
                  className="hover:opacity-70"
                >
                  <X size={14} />
                </button>
              </Badge>
            )}
            {selectedLevel && (
              <Badge
                variant="secondary"
                className="gap-1 bg-primary/10 border-primary/30 text-primary"
              >
                {selectedLevel}
                <button
                  onClick={() => onLevelChange(null)}
                  className="hover:opacity-70"
                >
                  <X size={14} />
                </button>
              </Badge>
            )}
            {selectedPrice !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1 bg-primary/10 border-primary/30 text-primary capitalize"
              >
                {selectedPrice}
                <button
                  onClick={() => onPriceChange('all')}
                  className="hover:opacity-70"
                >
                  <X size={14} />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
