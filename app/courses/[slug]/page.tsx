'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Testimonials } from '@/components/testimonials';
import { FAQComponent } from '@/components/faq';
import { CourseCard } from '@/components/course-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courses } from '@/lib/courses-data';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Star,
  Users,
  BookOpen,
  Clock,
  CheckCircle2,
  User,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useUserData } from '@/lib/user-data-context';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<typeof courses[0] | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<typeof courses>([]);
  const { isAuthenticated } = useAuth();
  const { enrollCourse, toggleWishlist, isEnrolled, isWishlisted, getProgress } =
    useUserData();

  useEffect(() => {
    const slug = params.slug as string;
    const foundCourse = courses.find((c) => c.slug === slug);

    if (!foundCourse) {
      router.push('/404');
      return;
    }

    setCourse(foundCourse);

    // Get related courses (same category, different course)
    const related = courses
      .filter((c) => c.category === foundCourse.category && c.id !== foundCourse.id)
      .slice(0, 3);
    setRelatedCourses(related);
  }, [params.slug, router]);

  if (!course) {
    return (
      <main>
        <Header />
        <section className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-foreground mt-4">Loading course...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const enrolledProgress = getProgress(course.id);
  const isEnrolledInCourse = isEnrolled(course.id);
  const isWishlistedCourse = isWishlisted(course.id);

  return (
    <main>
      <Header />

      {/* Course Hero */}
      <section className="relative bg-gradient-to-br from-primary/20 to-primary/5 py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary/90 text-primary-foreground border-0">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {course.level}
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                {course.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {course.longDescription}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 py-6 border-y border-border">
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">{course.rating}</span>
                  <span className="text-muted-foreground">({course.students} students)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={20} className="text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen size={20} className="text-primary" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Instructor</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0">
                    {course.instructor[0]}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {course.instructor}
                    </p>
                    <p className="text-muted-foreground">{course.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Pricing Card */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-8 sticky top-24 space-y-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      ₹{course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{course.originalPrice}
                      </span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <p className="text-sm text-green-500 font-medium">
                      Save ₹{course.originalPrice - course.price}
                    </p>
                  )}
                </div>

                {isEnrolledInCourse ? (
                  <div className="space-y-3">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-green-500" />
                      <span className="font-semibold text-green-200">Enrolled</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Your Progress</p>
                      <div className="w-full bg-background rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${enrolledProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{enrolledProgress}% completed</p>
                    </div>
                    {enrolledProgress < 100 && (
                      <Button
                        onClick={() => router.push('/dashboard')}
                        className="w-full bg-primary hover:bg-primary/90 text-base h-12 gap-2"
                      >
                        Continue Learning
                        <ArrowRight size={18} />
                      </Button>
                    )}
                    {enrolledProgress === 100 && (
                      <Button
                        disabled
                        className="w-full bg-green-500/20 text-green-200 text-base h-12"
                      >
                        <CheckCircle2 size={18} className="mr-2" />
                        Course Completed
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      if (isAuthenticated) {
                        enrollCourse(course.id);
                        router.push('/dashboard');
                      } else {
                        router.push('/login');
                      }
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-base h-12 gap-2"
                  >
                    Enroll Now
                    <ArrowRight size={18} />
                  </Button>
                )}

                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      toggleWishlist(course.id);
                    } else {
                      router.push('/login');
                    }
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    isWishlistedCourse
                      ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                      : 'bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  <Heart
                    size={18}
                    fill={isWishlistedCourse ? 'currentColor' : 'none'}
                  />
                  {isWishlistedCourse ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>

                <div className="border-t border-border pt-6 space-y-3">
                  <p className="font-semibold text-foreground mb-4">What you'll get:</p>
                  {[
                    'Lifetime access',
                    'Certificate of completion',
                    '30-day money-back guarantee',
                    'Downloadable resources',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-primary flex-shrink-0"
                      />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            Course Curriculum
          </h2>

          <div className="space-y-6">
            {course.curriculum.map((module, idx) => (
              <div
                key={module.id}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-background/50 border-b border-border">
                  <h3 className="text-lg font-bold text-foreground">
                    Module {idx + 1}: {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {module.lessons.length} lessons •{' '}
                    {Math.round(module.lessons.reduce((sum, l) => {
                      const mins = parseInt(l.duration);
                      return sum + mins;
                    }, 0) / 60)} hours
                  </p>
                </div>

                <div className="divide-y divide-border">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <BookOpen
                          size={20}
                          className="text-primary flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium text-foreground">
                            {lesson.title}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground flex-shrink-0">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-16 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            What You'll Learn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2
                  size={24}
                  className="text-primary flex-shrink-0 mt-1"
                />
                <p className="text-lg text-foreground">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {course.testimonials.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Testimonials testimonials={course.testimonials} />
          </div>
        </section>
      )}

      {/* FAQ */}
      {course.faq.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQComponent faqs={course.faq} />
          </div>
        </section>
      )}

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="py-16 bg-card/50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12">
              Related Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Enroll?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join {course.students.toLocaleString()} students who are already learning and advancing
            their careers.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-base h-12">
            Start Learning Today
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
