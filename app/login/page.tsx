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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      if (!formData.email.trim()) {
        throw new Error('Please enter your email');
      }
      if (!formData.password) {
        throw new Error('Please enter your password');
      }

      await login(formData.email, formData.password);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
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

  return (
    <main>
      <Header />
      <section className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-md mx-auto mt-10">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Sign in to your Velandev Academy account
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

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Demo Account Available
              </p>
              <Button
                type="button"
                onClick={fillDemoAccount}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
              >
                Fill Demo Credentials
              </Button>
            </div>

            <p className="text-center text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline font-medium">
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
