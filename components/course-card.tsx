'use client';

import Link from 'next/link';
import { Course } from '@/lib/types';
import { Star, Users, BookOpen, Heart, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useUserData } from '@/lib/user-data-context';
import { useAuth } from '@/lib/auth-context';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { enrollCourse, toggleWishlist, isEnrolled, isWishlisted } = useUserData();
  const { isAuthenticated } = useAuth();
  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700';
      case 'Advanced':
        return 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-700';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      Python: 'from-blue-500 via-blue-600 to-cyan-500',
      Java: 'from-orange-500 via-red-500 to-orange-600',
      'Web Development': 'from-violet-500 via-purple-500 to-pink-500',
      React: 'from-cyan-400 via-blue-500 to-indigo-500',
      'Data Science': 'from-emerald-400 via-teal-500 to-cyan-500',
      'Mobile Development': 'from-pink-500 via-rose-500 to-red-500',
    };
    return gradients[category] || 'from-primary via-accent to-primary';
  };

  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="group h-full flex flex-col bg-card rounded-2xl border border-border/60 overflow-hidden transition-all duration-500 hover-lift card-shimmer">
        {/* Course Image */}
        <div className="relative h-52 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(course.category)}`} />
          
          {/* Pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Large category icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-8xl font-black">{course.category[0]}</div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating arrow on hover */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight size={18} className="text-white" />
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl px-3 py-1.5 text-xs font-bold shadow-lg">
              {discount}% OFF
            </div>
          )}

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 font-semibold text-xs">
              {course.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-white/90 text-xs bg-black/30 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
              <Clock size={12} />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col gap-3.5">
          {/* Level & Rating */}
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className={`${getLevelColor(course.level)} border text-[11px] font-semibold px-2.5`}
            >
              {course.level}
            </Badge>
            <div className="flex items-center gap-1.5">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-foreground">{course.rating}</span>
              <span className="text-xs text-muted-foreground">({(course.students / 1000).toFixed(1)}k)</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-snug">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">{course.instructor[0]}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">{course.instructor}</span>
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 py-3 border-y border-border/60 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <BookOpen size={13} className="text-primary" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={13} className="text-primary" />
              <span>{(course.students / 1000).toFixed(1)}k enrolled</span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="mt-auto space-y-3 pt-1">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-extrabold text-foreground">₹{course.price.toLocaleString()}</span>
              {course.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{course.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex gap-2.5">
              {isEnrolled(course.id) ? (
                <button className="flex-1 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-semibold border border-emerald-200 dark:border-emerald-700 flex items-center justify-center gap-2 cursor-default">
                  <CheckCircle size={16} />
                  Enrolled
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (isAuthenticated) {
                      enrollCourse(course.id);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                >
                  {isAuthenticated ? 'Enroll Now' : 'Login to Enroll'}
                </button>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (isAuthenticated) {
                    toggleWishlist(course.id);
                  }
                }}
                className={`w-11 h-11 flex items-center justify-center rounded-xl text-sm transition-all duration-300 ${
                  isWishlisted(course.id)
                    ? 'bg-red-50 dark:bg-red-900/30 text-red-500 border border-red-200 dark:border-red-700 shadow-sm'
                    : 'bg-muted/50 border border-border text-muted-foreground hover:border-red-200 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30'
                }`}
              >
                <Heart size={16} fill={isWishlisted(course.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
