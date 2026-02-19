'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.contact.submit(formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center min-h-96 shadow-premium">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Thank you for reaching out. We will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-8 sm:p-12 shadow-premium"
    >
      <h3 className="text-2xl font-bold text-foreground mb-8">Get in Touch</h3>

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-700 text-foreground placeholder-muted-foreground border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-700 text-foreground placeholder-muted-foreground border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="john@example.com"
          />
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-700 text-foreground border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            <option value="">Select a subject...</option>
            <option value="course-inquiry">Course Inquiry</option>
            <option value="pricing">Pricing Question</option>
            <option value="technical">Technical Support</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-700 text-foreground placeholder-muted-foreground border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            placeholder="Please share your message or question here..."
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white h-12 text-base rounded-xl shadow-lg transition-all hover:shadow-xl font-semibold"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>

        {/* Note */}
        <p className="text-sm text-muted-foreground text-center">
          We typically respond within 24 hours. Thank you for your patience!
        </p>
      </div>
    </form>
  );
}
