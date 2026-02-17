'use client';

import Link from 'next/link';
import { Course } from '@/lib/types';
import { Star, Users, BookOpen, Heart, CheckCircle } from 'lucide-react';
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
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediate':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Advanced':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="group h-full flex flex-col bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Course Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10 text-primary text-4xl font-bold opacity-20">
            {course.category[0]}
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white rounded-lg px-3 py-1 text-sm font-bold">
              -{discount}%
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 text-primary-foreground border-0">
              {course.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col gap-4">
          {/* Level Badge */}
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className={`${getLevelColor(course.level)} border text-xs`}
            >
              {course.level}
            </Badge>
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-semibold text-foreground">{course.rating}</span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>

          {/* Instructor */}
          <p className="text-sm text-muted-foreground">
            by <span className="text-primary font-medium">{course.instructor}</span>
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 py-3 border-y border-border text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen size={16} className="text-primary" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} className="text-primary" />
              <span>{(course.students / 1000).toFixed(1)}k students</span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="mt-auto space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">₹{course.price}</span>
              {course.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{course.originalPrice}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {isEnrolled(course.id) ? (
                <button className="flex-1 px-4 py-2 bg-green-500/20 text-green-500 rounded-lg text-sm font-medium border border-green-500/30 flex items-center justify-center gap-2 cursor-not-allowed">
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
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isWishlisted(course.id)
                    ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                    : 'bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
              >
                <Heart size={18} fill={isWishlisted(course.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
