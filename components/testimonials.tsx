'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length, current]);

  if (!testimonials.length) return null;

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const testimonial = testimonials[current];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white dark:from-gray-900/50 dark:to-gray-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 via-accent/3 to-secondary/5 dark:from-primary/10 dark:via-accent/5 dark:to-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            <Star size={14} className="fill-secondary" />
            Student Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            What Our Students <span className="text-gradient-primary">Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful professionals who transformed their careers with our courses.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`relative bg-card border border-border/60 rounded-3xl p-8 sm:p-12 shadow-premium transition-all duration-300 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {/* Quote icon */}
            <div className="absolute -top-5 left-10 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Quote size={18} className="text-white" />
            </div>

            {/* Rating */}
            <div className="flex gap-1.5 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < testimonial.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted fill-muted'
                  }`}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl sm:text-2xl text-foreground mb-10 leading-relaxed font-medium">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-primary/20">
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    handlePrev();
                    setAutoPlay(false);
                  }}
                  className="w-11 h-11 rounded-xl border-border/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    handleNext();
                    setAutoPlay(false);
                  }}
                  className="w-11 h-11 rounded-xl border-border/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrent(idx);
                  setAutoPlay(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === current
                    ? 'w-8 bg-gradient-to-r from-primary to-accent'
                    : 'w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
