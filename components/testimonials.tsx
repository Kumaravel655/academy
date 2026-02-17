'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  if (!testimonials.length) return null;

  const testimonial = testimonials[current];

  return (
    <section className="py-20 bg-card/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful developers who have transformed their careers with our courses.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div
            className="bg-background border border-border rounded-xl p-8 sm:p-12 transition-all duration-300"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < testimonial.rating
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg sm:text-xl text-foreground mb-8 leading-relaxed italic">
              "{testimonial.text}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                {testimonial.name[0]}
              </div>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrent(idx);
                    setAutoPlay(false);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === current
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted-foreground hover:bg-muted'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setCurrent((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  );
                  setAutoPlay(false);
                }}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setCurrent((prev) => (prev + 1) % testimonials.length);
                  setAutoPlay(false);
                }}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
