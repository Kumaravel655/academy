import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-primary/5 to-background">
      {/* Sunshine animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main sun glow */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl opacity-30 animate-sun-glow"></div>
        <div className="absolute -top-40 right-32 w-80 h-80 bg-secondary rounded-full blur-3xl opacity-20 animate-sun-float"></div>
        
        {/* Light beams */}
        <div className="absolute top-0 left-1/2 w-1 h-64 bg-gradient-to-b from-primary to-transparent opacity-0 animate-light-beam" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-0 left-1/3 w-1 h-64 bg-gradient-to-b from-primary to-transparent opacity-0 animate-light-beam" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-0 left-2/3 w-1 h-64 bg-gradient-to-b from-primary to-transparent opacity-0 animate-light-beam" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/40 animate-sun-rise">
              <div className="w-2 h-2 rounded-full bg-primary animate-shimmer"></div>
              <span className="text-sm font-medium text-foreground">Welcome to Sunshine Academy</span>
            </div>

            {/* Headline */}
            <div className="animate-sun-rise" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Brighten Your{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Future with Learning
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Illuminate your path to success with expert-led courses. From personal development to technical skills,
                shine bright with Sunshine Academy.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '👨‍🏫', text: 'Expert Instructors' },
                { icon: '📱', text: 'Mobile Friendly' },
                { icon: '📈', text: 'Career Ready' },
                { icon: '♾️', text: 'Lifetime Access' },
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/courses">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-base h-12 gap-2">
                  Explore Courses
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 text-base h-12"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              {[
                { number: '500+', label: 'Active Students' },
                { number: '50+', label: 'Expert Courses' },
                { number: '4.8★', label: 'Avg Rating' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.number}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Sunshine Illustration */}
          <div className="hidden lg:flex items-center justify-center animate-sun-rise" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-96">
              {/* Sunshine central circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Main sun */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-primary animate-sun-glow flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-7xl animate-sun-spin">☀️</span>
                    </div>
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-sun-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full bg-secondary animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
