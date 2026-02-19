import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { Testimonials } from '@/components/testimonials';
import { CourseCard } from '@/components/course-card';
import { VideoShowcase } from '@/components/video-showcase';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import { courses as staticCourses } from '@/lib/courses-data';
import { API_BASE, transformKeys } from '@/lib/api';
import Link from 'next/link';
import {
  Users,
  Award,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Target,
  Rocket,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Code,
  Database,
  Smartphone,
  Brain,
  Layers,
  Cpu,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sunshine Academy — Best Online Courses | Arakkonam, Tamil Nadu',
  description:
    'Sunshine Academy — #1 online learning platform in Arakkonam, Tamil Nadu. Master Python, Java, Web Development, Data Science & more. Expert instructors, lifetime access, certificate guaranteed. Join 2,500+ students!',
  openGraph: {
    title: 'Sunshine Academy — Best Online Courses | Arakkonam, Tamil Nadu',
    description: 'Expert-led courses in Python, Java, Web Development, Data Science from Arakkonam, Tamil Nadu. Lifetime access & certificate. Join 2,500+ students!',
  },
};

export default async function Page() {
  // Fetch courses from the backend API, fall back to static data
  let courses = staticCourses as any[];
  try {
    const res = await fetch(`${API_BASE}/api/courses`, { cache: 'no-store' });
    if (res.ok) courses = transformKeys(await res.json());
  } catch {}

  // Fetch testimonials from the first course detail
  let testimonials: any[] = [];
  if (courses.length > 0) {
    try {
      const res = await fetch(`${API_BASE}/api/courses/${courses[0].slug}`, { cache: 'no-store' });
      if (res.ok) {
        const detail = transformKeys(await res.json());
        testimonials = detail.testimonials || [];
      }
    } catch {}
  }

  const featuredCourses = courses.slice(0, 3);

  const stats = [
    { icon: Users, number: '2,500+', label: 'Active Students', color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, number: '50+', label: 'Expert Courses', color: 'from-violet-500 to-purple-500' },
    { icon: Award, number: '4.8★', label: 'Average Rating', color: 'from-amber-500 to-orange-500' },
    { icon: TrendingUp, number: '95%', label: 'Success Rate', color: 'from-emerald-500 to-green-500' },
  ];

  const benefits = [
    {
      icon: Lightbulb,
      title: 'Expert-Led Courses',
      description: 'Learn from industry veterans with 10+ years of real-world experience in top companies.',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: Target,
      title: 'Industry-Ready Skills',
      description: 'Master the exact skills companies are hiring for. Build portfolio-worthy projects.',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: Rocket,
      title: 'Lifetime Access',
      description: 'Learn at your own pace with lifetime access to course materials, updates & community.',
      color: 'from-violet-400 to-purple-500',
    },
    {
      icon: Shield,
      title: 'Certificate of Completion',
      description: 'Earn recognized certificates to showcase your skills and boost your professional profile.',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Zap,
      title: 'Hands-On Projects',
      description: 'Apply concepts immediately with guided projects and real-world coding challenges.',
      color: 'from-pink-400 to-rose-500',
    },
    {
      icon: Globe,
      title: 'Community Support',
      description: 'Join a vibrant community of learners. Get help, share knowledge, grow together.',
      color: 'from-cyan-400 to-blue-500',
    },
  ];

  const categories = [
    { icon: Code, name: 'Web Development', count: '12 Courses', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { icon: Smartphone, name: 'Mobile Apps', count: '8 Courses', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    { icon: Database, name: 'Data Science', count: '10 Courses', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
    { icon: Brain, name: 'Machine Learning', count: '6 Courses', color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' },
    { icon: Layers, name: 'Full Stack', count: '9 Courses', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
    { icon: Cpu, name: 'Cloud & DevOps', count: '5 Courses', color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' },
  ];

  return (
    <main className="overflow-hidden">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Layers size={14} />
                Browse Categories
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                Explore Our <span className="text-gradient-primary">Categories</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.name} delay={idx * 80}>
                <Link href="/courses">
                  <div className="group flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border/60 hover:border-primary/30 transition-all duration-500 hover-lift cursor-pointer text-center">
                    <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <cat.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{cat.count}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/50 to-white dark:from-gray-900/50 dark:to-gray-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  <GraduationCap size={14} />
                  Featured Courses
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                  Learn From the <span className="text-gradient-primary">Best</span>
                </h2>
                <p className="mt-3 text-lg text-muted-foreground max-w-lg">
                  Hand-picked courses designed to accelerate your growth and career trajectory.
                </p>
              </div>
              <Link href="/courses">
                <Button variant="outline" className="rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 gap-2">
                  View All Courses
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, idx) => (
              <ScrollReveal key={course.id} delay={idx * 150}>
                <CourseCard course={course} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <VideoShowcase />

      {/* Why Choose Us */}
      <section className="py-24 relative bg-white dark:bg-gray-950">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                <Zap size={14} />
                Why Choose Us
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                Everything You Need to <span className="text-gradient-primary">Succeed</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide a complete learning ecosystem designed for your professional growth.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="group bg-card border border-border/60 rounded-2xl p-7 hover:border-primary/30 transition-all duration-500 hover-lift h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <benefit.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-primary/95 to-slate-900" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 100}>
                  <div className="flex flex-col items-center text-center group">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                      {stat.number}
                    </p>
                    <p className="text-sm text-white/60 font-medium">{stat.label}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Rocket size={14} />
              Start Today
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
              Ready to Transform<br />
              <span className="text-gradient-primary">Your Career?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who are already building their dream careers. Start your learning journey today with our expert-led courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white text-base h-14 px-10 rounded-2xl shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-1 font-semibold gap-2">
                  Browse Courses
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-10 rounded-2xl border-2 border-foreground/10 hover:border-primary/40 hover:bg-primary/5 text-base font-semibold transition-all duration-300"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
