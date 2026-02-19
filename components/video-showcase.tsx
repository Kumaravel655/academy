'use client';

import { useState } from 'react';
import { Play, X, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  instructor: string;
  category: string;
  youtubeId: string;
}

const sampleVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Introduction to Python Programming',
    thumbnail: '',
    duration: '12:30',
    views: '24.5K',
    instructor: 'Rajesh Kumar',
    category: 'Python',
    youtubeId: 'kqtD5dpn9C8',
  },
  {
    id: '2',
    title: 'Building REST APIs with Java Spring Boot',
    thumbnail: '',
    duration: '18:45',
    views: '18.2K',
    instructor: 'Deepak Sinha',
    category: 'Java',
    youtubeId: '9SGDpanrc8U',
  },
  {
    id: '3',
    title: 'React.js Full Course for Beginners',
    thumbnail: '',
    duration: '25:15',
    views: '32.1K',
    instructor: 'Anita Desai',
    category: 'React',
    youtubeId: 'w7ejDZ8SWv8',
  },
  {
    id: '4',
    title: 'Data Science with Machine Learning',
    thumbnail: '',
    duration: '20:00',
    views: '15.8K',
    instructor: 'Vikram Rathi',
    category: 'Data Science',
    youtubeId: 'ua-CiDNNj30',
  },
];

export function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categoryColors: Record<string, string> = {
    Python: 'from-blue-500 to-cyan-500',
    Java: 'from-orange-500 to-red-500',
    React: 'from-cyan-500 to-blue-500',
    'Data Science': 'from-purple-500 to-pink-500',
  };

  return (
    <>
      <section className="py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-accent/3 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                <Play size={14} />
                Free Preview Lessons
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                Watch & <span className="text-gradient-primary">Learn</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get a taste of our premium content with free video previews from top-rated courses.
              </p>
            </div>
          </ScrollReveal>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sampleVideos.map((video, idx) => (
              <ScrollReveal key={video.id} delay={idx * 100}>
                <div
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-primary/30 transition-all duration-500 hover-lift cursor-pointer card-shimmer"
                  onClick={() => setActiveVideo(video)}
                  onMouseEnter={() => setHoveredId(video.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[video.category] || 'from-primary to-accent'} opacity-80`} />
                    
                    {/* Category pattern overlay */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                        hoveredId === video.id ? 'scale-110 bg-white/35' : ''
                      }`}>
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-100 flex items-center justify-center shadow-lg">
                          <Play size={20} className="text-foreground ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                      <Clock size={12} />
                      {video.duration}
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider">
                      {video.category}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{video.instructor[0]}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{video.instructor}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          4.8
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* View All */}
          <ScrollReveal delay={400}>
            <div className="flex justify-center mt-12">
              <button className="group flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300">
                View All Free Lessons
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-scale-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="bg-card p-6">
              <h3 className="text-xl font-bold text-foreground">{activeVideo.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">By {activeVideo.instructor}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
