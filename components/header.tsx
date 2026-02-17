'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

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
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center animate-sun-glow">
              <span className="text-white font-bold text-lg">☀️</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-foreground">Sunshine</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <User size={18} className="mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  className="bg-primary hover:bg-primary/90"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors px-2 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="flex-1">
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="flex-1">
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" className="flex-1">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
