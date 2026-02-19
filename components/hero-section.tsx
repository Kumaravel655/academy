'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, BookOpen, Award, CheckCircle2, X } from 'lucide-react';

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Gradient mesh blobs */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl animate-morph-blob" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-secondary/15 via-primary/5 to-transparent rounded-full blur-3xl animate-morph-blob" style={{ animationDelay: '4s' }} />
          <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-gradient-to-r from-accent/10 to-primary/5 rounded-full blur-3xl animate-float" />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Orbiting element */}
          <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-primary/30 rounded-full animate-orbit" style={{ animationDuration: '25s' }} />
          <div className="absolute top-[40%] left-[15%] w-2 h-2 bg-accent/40 rounded-full animate-orbit" style={{ animationDuration: '18s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-8 animate-fade-in-up">
              {/* Trust badge */}
              <div className="inline-flex w-fit items-center gap-3 px-5 py-2.5 rounded-full glass-card">
                <div className="flex -space-x-2">
                  {['bg-primary', 'bg-accent', 'bg-secondary', 'bg-emerald-500'].map((color, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${color} border-2 border-white flex items-center justify-center`}>
                      <span className="text-white text-[10px] font-bold">{['R', 'A', 'S', 'P'][i]}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-foreground/70">2,500+ Students Trust Us</span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
                  Transform Your
                  <br />
                  <span className="text-gradient-primary">Career with</span>
                  <br />
                  Expert Learning
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Master in-demand skills with industry experts. Interactive courses, real projects, and a community that drives your success forward.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white text-base h-14 px-8 rounded-2xl shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-1 gap-2 font-semibold">
                    Explore Courses
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Button
                  onClick={() => setShowVideo(true)}
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl border-2 border-foreground/10 hover:border-primary/40 hover:bg-primary/5 text-base font-semibold gap-3 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Play size={16} className="text-primary ml-0.5" />
                  </div>
                  Watch Demo
                </Button>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-border/60">
                {[
                  { icon: Users, number: '2,500+', label: 'Active Students' },
                  { icon: BookOpen, number: '50+', label: 'Expert Courses' },
                  { icon: Award, number: '4.8', label: 'Avg Rating', suffix: '★' },
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                      <stat.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">{stat.number}{stat.suffix}</p>
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Video Thumbnail & Interactive Card */}
            <div className="hidden lg:block animate-fade-in-right" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                {/* Main video thumbnail card */}
                <div className="relative rounded-3xl overflow-hidden shadow-premium-lg group cursor-pointer" onClick={() => setShowVideo(true)}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-900 via-primary/90 to-accent/80 relative">
                    {/* Video mockup overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    
                    {/* Video thumbnail content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-play-pulse group-hover:bg-white/30 transition-all">
                        <Play size={32} className="text-white ml-1" />
                      </div>
                      <p className="mt-4 text-sm font-medium text-white/80">Watch Our Story</p>
                    </div>

                    {/* Abstract decoration inside */}
                    <div className="absolute top-8 left-8 flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>

                    {/* Course preview thumbnails */}
                    <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                      {['Python Mastery', 'Java Pro', 'Full Stack'].map((title, i) => (
                        <div key={i} className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                          <div className={`w-8 h-8 rounded-lg ${['bg-blue-500', 'bg-orange-500', 'bg-purple-500'][i]} flex items-center justify-center mb-2`}>
                            <BookOpen size={14} className="text-white" />
                          </div>
                          <p className="text-xs font-medium text-white/90">{title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 shadow-premium animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <CheckCircle2 size={22} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Course Completed!</p>
                      <p className="text-xs text-muted-foreground">+250 students this week</p>
                    </div>
                  </div>
                </div>

                {/* Floating rating card */}
                <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 shadow-premium animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-foreground">4.8/5 Rating</p>
                  <p className="text-xs text-muted-foreground">From 1,200+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by logos */}
        <div className="absolute bottom-0 left-0 right-0 py-6 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-950/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-4">
              Trusted by leading companies
            </p>
            <div className="flex justify-center items-center gap-8 sm:gap-12 opacity-40">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
                <span key={company} className="text-sm sm:text-base font-bold text-foreground/60 tracking-wider">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-scale-in" onClick={() => setShowVideo(false)}>
          <div className="relative w-full max-w-4xl mx-4 aspect-video rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X size={20} />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Academy Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
