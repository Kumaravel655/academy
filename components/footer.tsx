import Link from 'next/link';
import { Mail, Linkedin, Twitter, Github, GraduationCap, MapPin, Phone, ArrowRight, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

      {/* Background decoration */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* CTA Banner */}
      <div className="relative z-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-2xl p-8 border border-slate-700/50">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Your Journey?</h3>
              <p className="text-slate-400 max-w-lg">
                Join 2,500+ students who are already building their dream careers with expert-led courses.
              </p>
            </div>
            <Link
              href="/courses"
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <GraduationCap className="text-white" size={22} />
              </div>
              <div>
                <span className="font-bold text-white text-lg leading-tight">Sunshine</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">Academy</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering the next generation of tech professionals through expert-led, hands-on courses that transform careers.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Mail, label: 'Email', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Github, label: 'GitHub', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-primary/20 flex items-center justify-center text-slate-400 hover:text-primary transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/courses', label: 'All Courses' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/admin', label: 'Admin Portal' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-3.5">
              {[
                'Python Development',
                'Java & Spring Boot',
                'Full Stack Web Dev',
                'Data Science & ML',
                'Mobile Development',
                'Cloud Computing',
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href="/courses"
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Get In Touch</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-400">Arakkonam, Tamil Nadu - 631001</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <p className="text-sm text-slate-400">+91 95003 47142</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <p className="text-sm text-slate-400">hello@sunshineacademy.in</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-3 font-medium">Subscribe to our newsletter</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-slate-700"
              />
              <button className="px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:opacity-90 transition-all text-sm font-medium shadow-lg shadow-primary/20">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} Sunshine Academy (Velandev). All rights reserved.
            </p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              Made with <Heart size={12} className="text-red-400 fill-red-400" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
