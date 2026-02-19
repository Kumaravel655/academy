import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { instructors as staticInstructors } from '@/lib/courses-data';
import { API_BASE, transformKeys } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Lightbulb,
  Users,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Sunshine Academy — a premier online learning platform based in Arakkonam, Tamil Nadu. Expert instructors, 50+ courses, 2,500+ students.',
  keywords: [
    'about Sunshine Academy',
    'Sunshine Academy instructors',
    'online learning platform Tamil Nadu',
    'best coding academy Arakkonam',
  ],
  openGraph: {
    title: 'About Sunshine Academy | Arakkonam, Tamil Nadu',
    description: 'Expert-led learning platform with 50+ courses and 2,500+ students. Based in Arakkonam, Tamil Nadu.',
  },
};

export default async function AboutPage() {
  // Fetch instructors from backend API, fall back to static data
  let instructors = staticInstructors as any[];
  try {
    const res = await fetch(`${API_BASE}/api/admin/instructors`, { cache: 'no-store' });
    if (res.ok) {
      const data = transformKeys(await res.json());
      instructors = data.map((i: any) => ({ ...i, courses: i.coursesCount }));
    }
  } catch {}

  const stats = [
    { number: '2500+', label: 'Active Students' },
    { number: '50+', label: 'Courses Offered' },
    { number: '10+', label: 'Expert Instructors' },
    { number: '4.8★', label: 'Average Rating' },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly update our courses with the latest technologies and best practices.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Build connections with fellow learners and get support from our active community.',
    },
    {
      icon: Zap,
      title: 'Excellence',
      description: 'We are committed to delivering the highest quality education and learning experience.',
    },
  ];

  return (
    <main className="overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/95 to-slate-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            About Sunshine Academy
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Empowering the next generation of developers through quality education, practical learning,
            and industry expertise.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-card border border-border/60 rounded-2xl p-10 hover-lift transition-all duration-500">
              <h2 className="text-2xl font-extrabold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To make high-quality tech education accessible to everyone, regardless of their background or location.
                We believe that everyone deserves the opportunity to learn, grow, and build a successful career in
                technology.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border/60 rounded-2xl p-10 hover-lift transition-all duration-500">
              <h2 className="text-2xl font-extrabold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To become the leading platform for practical tech education, where students can master in-demand skills
                and launch rewarding careers. We envision a world where technology education is affordable, accessible,
                and of world-class quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-primary/95 to-slate-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                  {stat.number}
                </p>
                <p className="text-white/60 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-foreground mb-16 text-center tracking-tight">
            Our Core <span className="text-gradient-primary">Values</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border/60 rounded-2xl p-8 text-center hover:border-primary/30 transition-all duration-500 hover-lift"
                >
                  <Icon size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-slate-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-foreground mb-12 text-center tracking-tight">
            Why Choose <span className="text-gradient-primary">Sunshine Academy?</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              'Expert instructors with 10+ years of industry experience',
              'Practical, hands-on learning with real-world projects',
              'Up-to-date curriculum reflecting current industry standards',
              'Affordable pricing with flexible payment options',
              'Lifetime access to course materials and updates',
              'Supportive community and peer learning opportunities',
              'Career guidance and job placement assistance',
              'Certificate of completion recognized by employers',
            ].map((reason, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-border/60 hover:border-primary/30 transition-all duration-300 hover-lift">
                <CheckCircle2 size={24} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-lg text-foreground">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Instructors */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-foreground mb-4 text-center tracking-tight">
            Meet Our <span className="text-gradient-primary">Instructors</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Learn from industry professionals who are passionate about teaching and mentoring.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover-lift"
              >
                {/* Avatar */}
                <div className="h-48 bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center text-5xl font-bold text-white/30">
                  {instructor.name[0]}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {instructor.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {instructor.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-foreground mb-2 uppercase">
                      Expertise
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.expertise.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs bg-primary/10 border-primary/30 text-primary"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="pt-4 border-t border-border text-sm text-muted-foreground">
                    <p className="mb-2">
                      📚 <span className="font-medium">{instructor.courses}</span> courses
                    </p>
                    <p>
                      👥 <span className="font-medium">{instructor.students.toLocaleString()}</span> students
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-foreground mb-8 tracking-tight">Our <span className="text-gradient-primary">Story</span></h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Velandev Academy was founded with a simple mission: to make quality tech education accessible to everyone.
              Our founders realized that there was a significant gap between what students were learning in traditional
              institutions and what the industry actually needed.
            </p>

            <p>
              Starting with a small team of passionate developers and educators, we created our first course in web
              development. The response was overwhelming, and we quickly expanded our course offerings to cover Python,
              Java, Data Science, and more.
            </p>

            <p>
              Today, Velandev Academy serves thousands of students across the globe. We continue to innovate, update our
              curriculum, and ensure that our students have the best learning experience possible. Every course is
              designed with real-world applications in mind, ensuring that our students are job-ready upon completion.
            </p>

            <p>
              We believe that education should be empowering, inspiring, and transformative. That's what we strive to
              deliver every single day.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
