'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User, GraduationCap, ChevronRight, Sparkles, Sun, Moon, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from 'next-themes';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary text-white text-center py-2 text-sm font-medium relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-center gap-2">
          <Sparkles size={14} />
          <span>New Courses Available — Enroll Now & Get 40% Off</span>
          <ChevronRight size={14} />
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass dark:glass-dark shadow-premium py-2'
            : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className={`relative w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-glow-primary ${scrolled ? 'w-10 h-10' : ''}`}>
                <GraduationCap className="text-white" size={22} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-white animate-pulse" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-lg text-foreground leading-tight tracking-tight">
                  Sunshine
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Academy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-5 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 rounded-lg hover:bg-primary/5 group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-6" />
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2.5 rounded-xl hover:bg-muted transition-colors text-foreground/70 hover:text-foreground"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              {isAuthenticated ? (
                <>
                  {user?.isAdmin && (
                    <Link href="/admin">
                      <Button
                        variant="outline"
                        className="border-purple-400/40 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-xl transition-all duration-300"
                      >
                        <Shield size={16} className="mr-2" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary hover:text-white rounded-xl transition-all duration-300 hover:shadow-glow-primary"
                    >
                      <User size={16} className="mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-foreground hover:text-primary hover:bg-primary/5 rounded-xl font-medium"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl px-6 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-0.5">
                      Get Started Free
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 text-foreground rounded-xl hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="pb-6 pt-2 border-t border-border/50">
              <div className="flex flex-col gap-1 pt-4">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 px-4 py-3 rounded-xl font-medium"
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex gap-3 pt-4 mt-2 border-t border-border/50">
                  {/* Mobile theme toggle */}
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="p-2.5 rounded-xl hover:bg-muted transition-colors text-foreground/70"
                      aria-label="Toggle theme"
                    >
                      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                  )}
                  {isAuthenticated ? (
                    <>
                      <Link href="/dashboard" className="flex-1">
                        <Button variant="outline" className="w-full border-primary/30 text-primary rounded-xl">
                          Dashboard
                        </Button>
                      </Link>
                      <Button onClick={handleLogout} className="flex-1 bg-gradient-to-r from-primary to-accent text-white rounded-xl">
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="flex-1">
                        <Button variant="outline" className="w-full rounded-xl">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-primary to-accent text-white rounded-xl">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
