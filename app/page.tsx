import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { Testimonials } from '@/components/testimonials';
import { CourseCard } from '@/components/course-card';
import { Button } from '@/components/ui/button';
import { courses } from '@/lib/courses-data';
import Link from 'next/link';
import { Users, Award, BookOpen } from 'lucide-react';

export default function Page() {
  const featuredCourses = courses.slice(0, 3);

  const stats = [
    { icon: Users, number: '2500+', label: 'Active Students' },
    { icon: BookOpen, number: '50+', label: 'Expert Courses' },
    { icon: Award, number: '4.8★', label: 'Avg Rating' },
  ];

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Courses */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Sunshine's Brightest Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Illuminate your path to success with our expert-led, highly-rated courses that shine bright.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '☀️',
                title: 'Sunlit Learning Path',
                description:
                  'Learn from award-winning instructors with 10+ years of experience illuminating minds.',
              },
              {
                icon: '✨',
                title: 'Shine-Ready Skills',
                description:
                  'Master skills that make you stand out in the competitive job market of 2024.',
              },
              {
                icon: '🌟',
                title: 'Forever Bright Access',
                description:
                  'Lifetime access to all course materials. Your learning shines on, whenever you need it.',
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-background border border-border rounded-lg p-8 hover:border-primary transition-colors"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={courses[0]?.testimonials || []} />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <Icon size={48} className="text-primary mb-4" />
                  <p className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                    {stat.number}
                  </p>
                  <p className="text-lg text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Let Your Light Shine ✨
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of students who are brightening their future at Sunshine Academy. Your journey to success starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore Courses
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
