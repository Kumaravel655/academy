'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Testimonials } from '@/components/testimonials';
import { FAQComponent } from '@/components/faq';
import { CourseCard } from '@/components/course-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
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
  const [course, setCourse] = useState<any>(null);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();
  const { enrollCourse, toggleWishlist, isEnrolled, isWishlisted, getProgress } =
    useUserData();

  useEffect(() => {
    const slug = params.slug as string;

    api.courses.get(slug)
      .then((data: any) => {
        setCourse(data);
        return api.courses.list({ category: data.category });
      })
      .then((all: any[]) => {
        const slug = params.slug as string;
        setRelatedCourses(all.filter((c: any) => c.slug !== slug).slice(0, 3));
      })
      .catch(() => {
        router.push('/404');
      });
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
    <main className="overflow-hidden">
      <Header />

      {/* Course Hero */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/95 to-slate-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white/80">
                  {course.level}
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                {course.title}
              </h1>

              <p className="text-xl text-white/70 mb-6">
                {course.longDescription}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 py-6 border-y border-white/10">
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span className="text-white/60">({course.students} students)</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock size={20} className="text-white/80" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <BookOpen size={20} className="text-white/80" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-white mb-4">Instructor</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                    {course.instructor[0]}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {course.instructor}
                    </p>
                    <p className="text-white/60">{course.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Pricing Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-8 sticky top-24 space-y-6 shadow-premium-lg">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-extrabold text-foreground">
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
                  <div className="space-y-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-xl p-3 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">Enrolled</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Your Progress</p>
                      <div className="w-full bg-slate-100 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all"
                          style={{ width: `${enrolledProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5">{enrolledProgress}% completed</p>
                    </div>
                    {enrolledProgress < 100 && (
                      <Button
                        onClick={() => router.push('/dashboard')}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white text-base h-12 gap-2 rounded-xl shadow-lg"
                      >
                        Continue Learning
                        <ArrowRight size={18} />
                      </Button>
                    )}
                    {enrolledProgress === 100 && (
                      <Button
                        disabled
                        className="w-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-base h-12 rounded-xl"
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
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white text-base h-12 gap-2 rounded-xl shadow-lg transition-all hover:shadow-xl"
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
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    isWishlistedCourse
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-500 border border-red-200 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900/50'
                      : 'bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Heart
                    size={18}
                    fill={isWishlistedCourse ? 'currentColor' : 'none'}
                  />
                  {isWishlistedCourse ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>

                <div className="border-t border-border/60 pt-6 space-y-3">
                  <p className="font-semibold text-foreground mb-4">What you&apos;ll get:</p>
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
      <section className="py-20 bg-gradient-to-b from-white to-slate-50/80 dark:from-gray-900 dark:to-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Course Curriculum
          </h2>
          <p className="text-muted-foreground mb-12">Everything you&apos;ll learn in this course</p>

          <div className="space-y-5">
            {course.curriculum.map((module, idx) => (
              <div
                key={module.id}
                className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white dark:from-gray-700/50 dark:to-gray-800 border-b border-border/60">
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

                <div className="divide-y divide-border/40">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
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
      <section className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 dark:from-primary/10 dark:via-accent/10 dark:to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            What You&apos;ll Learn
          </h2>
          <p className="text-muted-foreground mb-12">Skills and knowledge you&apos;ll gain</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {course.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-5 border border-white dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <CheckCircle2
                    size={18}
                    className="text-white"
                  />
                </div>
                <p className="text-foreground font-medium">{outcome}</p>
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
        <section className="py-20 bg-gradient-to-b from-slate-50/80 to-white dark:from-gray-900/80 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Related Courses
            </h2>
            <p className="text-muted-foreground mb-12">Continue your learning journey</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-primary/90 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Enroll?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join {course.students.toLocaleString()} students who are already learning and advancing
            their careers.
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 text-base h-13 px-10 rounded-xl shadow-xl font-semibold">
            Start Learning Today
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
