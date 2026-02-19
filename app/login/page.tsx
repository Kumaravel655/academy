'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Once user is set after login, redirect based on role
  useEffect(() => {
    if (redirecting && user) {
      setTimeout(() => {
        router.push(user.isAdmin ? '/admin' : '/dashboard');
      }, 800);
    }
  }, [redirecting, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.email.trim()) {
        throw new Error('Please enter your email');
      }
      if (!formData.password) {
        throw new Error('Please enter your password');
      }

      await login(formData.email, formData.password);
      setSuccess('Login successful! Redirecting...');
      setRedirecting(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials
  const fillDemoAccount = () => {
    setFormData({
      email: 'demo@velandev.com',
      password: 'demo123',
    });
  };

  const fillAdminAccount = () => {
    setFormData({
      email: 'admin@velandev.com',
      password: 'admin123',
    });
  };

  return (
    <main>
      <Header />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-900 via-primary/80 to-slate-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome Back</h1>
          <p className="text-lg text-white/70">Sign in to continue your learning journey</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
        <div className="max-w-md mx-auto -mt-28 relative z-20">
          <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-8 shadow-premium-lg">

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-xl flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-slate-50 dark:bg-gray-700 border-border/60 text-foreground rounded-xl h-12 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-gray-700 border-border/60 text-foreground rounded-xl h-12 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold h-12 rounded-xl shadow-lg transition-all hover:shadow-xl"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 border-t border-border/60 pt-6">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Quick Login Options
              </p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={fillDemoAccount}
                  variant="outline"
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/5 rounded-xl h-11 font-medium"
                >
                  Demo User
                </Button>
                <Button
                  type="button"
                  onClick={fillAdminAccount}
                  variant="outline"
                  className="flex-1 border-purple-400/50 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl h-11 font-medium"
                >
                  Admin Login
                </Button>
              </div>
            </div>

            <p className="text-center text-muted-foreground mt-6 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
