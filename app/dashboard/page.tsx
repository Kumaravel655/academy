'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useUserData } from '@/lib/user-data-context';
import { courses } from '@/lib/courses-data';
import { BookOpen, Heart, TrendingUp, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const { enrollments, wishlist, updateProgress, unenrollCourse } = useUserData();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <main>
        <Header />
        <section className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-foreground mt-4">Loading...</p>
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
      <section className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Welcome back, {user.name}!
            </h1>
            <p className="text-muted-foreground text-lg">
              Continue your learning journey with Velandev Academy
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-foreground">{enrollments.length}</p>
                </div>
                <BookOpen size={32} className="text-primary opacity-50" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Completed</p>
                  <p className="text-3xl font-bold text-foreground">{completedCount}</p>
                </div>
                <TrendingUp size={32} className="text-green-500 opacity-50" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-foreground">{inProgressCount}</p>
                </div>
                <TrendingUp size={32} className="text-primary opacity-50" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Overall Progress</p>
                  <p className="text-3xl font-bold text-foreground">{totalProgress}%</p>
                </div>
                <Heart size={32} className="text-red-500 opacity-50" />
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Courses</h2>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrollment) => (
                  <div key={enrollment.courseId} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl">{enrollment.course?.icon || '📚'}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-foreground mb-2">{enrollment.course?.title}</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-semibold text-primary">{enrollment.progress}%</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Link href={`/courses/${enrollment.course?.slug}`} className="flex-1">
                            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                              Continue Learning
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
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
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <BookOpen size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No courses yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start learning by enrolling in a course
                </p>
                <Link href="/courses">
                  <Button className="bg-primary hover:bg-primary/90">
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
                  <div key={course.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-4xl">{course.icon}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-foreground mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
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
