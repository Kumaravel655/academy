'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

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
      // Validate form
      if (!formData.name.trim()) {
        throw new Error('Please enter your name');
      }
      if (!formData.email.trim()) {
        throw new Error('Please enter your email');
      }
      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email');
      }
      if (!formData.password) {
        throw new Error('Please enter a password');
      }
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await signup(formData.email, formData.password, formData.name);
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Create Account</h1>
          <p className="text-lg text-white/70">Join Sunshine Academy and start learning today</p>
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
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 dark:bg-gray-700 border-border/60 text-foreground rounded-xl h-12 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={loading}
                />
              </div>

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

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-6 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
