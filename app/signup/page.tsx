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
      <section className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-md mx-auto mt-10">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
              Create Account
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Join Velandev Academy and start learning
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-900/20 border border-green-900/50 rounded-lg flex items-start gap-3">
                <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-green-200">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-background border-border text-foreground"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-background border-border text-foreground"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-background border-border text-foreground"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-background border-border text-foreground"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
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
