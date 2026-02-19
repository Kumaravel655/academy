'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useUserData } from '@/lib/user-data-context';
import { api } from '@/lib/api';
import { BookOpen, Heart, TrendingUp, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const { enrollments, wishlist, updateProgress, unenrollCourse } = useUserData();

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    api.courses.list().then(setCourses).catch(console.error);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <main>
        <Header />
        <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-foreground mt-4 font-medium">Loading your dashboard...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const enrolledCourses = enrollments.map((enrollment) => ({
    ...enrollment,
    course: courses.find((c) => c.id === enrollment.courseId),
  }));

  const wishlistCourses = courses.filter((c) => wishlist.includes(c.id));

  const completedCount = enrollments.filter((e) => e.completed).length;
  const inProgressCount = enrollments.filter((e) => !e.completed && e.progress > 0).length;
  const totalProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;

  return (
    <main>
      <Header />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-900 via-primary/80 to-slate-900 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Welcome back, {user.name}!
          </h1>
          <p className="text-lg text-white/70">
            Continue your learning journey with Sunshine Academy
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 -mt-20 relative z-20">
            <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-6 shadow-premium hover-lift transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-foreground">{enrollments.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <BookOpen size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-6 shadow-premium hover-lift transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Completed</p>
                  <p className="text-3xl font-bold text-foreground">{completedCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 flex items-center justify-center">
                  <TrendingUp size={24} className="text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-6 shadow-premium hover-lift transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-foreground">{inProgressCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center">
                  <TrendingUp size={24} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-6 shadow-premium hover-lift transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Overall Progress</p>
                  <p className="text-3xl font-bold text-foreground">{totalProgress}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50 flex items-center justify-center">
                  <Heart size={24} className="text-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Courses</h2>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrollment) => (
                  <div key={enrollment.courseId} className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl overflow-hidden hover:shadow-premium-lg transition-all hover-lift">
                    <div className="h-40 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center">
                      <span className="text-5xl">{enrollment.course?.icon || '📚'}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-foreground mb-3">{enrollment.course?.title}</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-semibold text-primary">{enrollment.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all"
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Link href={`/courses/${enrollment.course?.slug}`} className="flex-1">
                            <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl shadow-sm">
                              Continue Learning
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl border-border/60 hover:border-primary/40"
                            onClick={() => {
                              if (enrollment.progress < 100) {
                                updateProgress(enrollment.courseId, enrollment.progress + 10);
                              }
                            }}
                          >
                            +10%
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No courses yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start learning by enrolling in a course
                </p>
                <Link href="/courses">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl shadow-lg px-8">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Wishlist */}
          {wishlistCourses.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Wishlist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistCourses.map((course) => (
                  <div key={course.id} className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl overflow-hidden hover:shadow-premium-lg transition-all hover-lift">
                    <div className="h-40 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/5 flex items-center justify-center">
                      <span className="text-5xl">{course.icon}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-foreground mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl shadow-sm">
                          View Course
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
