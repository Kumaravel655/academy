import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { instructors } from '@/lib/courses-data';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Lightbulb,
  Users,
  Zap,
} from 'lucide-react';

export default function AboutPage() {
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
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            About Velandev Academy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering the next generation of developers through quality education, practical learning,
            and industry expertise.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-card border border-border rounded-lg p-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To make high-quality tech education accessible to everyone, regardless of their background or location.
                We believe that everyone deserves the opportunity to learn, grow, and build a successful career in
                technology.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-lg p-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
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
      <section className="py-20 bg-primary/5 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary transition-colors"
                >
                  <Icon size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            Why Choose Velandev?
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
              <div key={idx} className="flex items-start gap-4 bg-background p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <CheckCircle2 size={24} className="text-primary flex-shrink-0 mt-1" />
                <p className="text-lg text-foreground">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Instructors */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
            Meet Our Instructors
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Learn from industry professionals who are passionate about teaching and mentoring.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
              >
                {/* Avatar */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-5xl font-bold text-primary/30">
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
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Story</h2>

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
