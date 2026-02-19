import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Sunshine Academy in Arakkonam, Tamil Nadu. Call us at +91 95003 47142 or email support@velandev.com. We reply within 24 hours.',
  keywords: [
    'contact Sunshine Academy',
    'Sunshine Academy Arakkonam phone number',
    'online course support Tamil Nadu',
    'Sunshine Academy address',
  ],
  openGraph: {
    title: 'Contact Sunshine Academy — Arakkonam, Tamil Nadu',
    description: 'Reach out to our team. Phone: +91 95003 47142 | Arakkonam, Tamil Nadu.',
  },
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@velandev.com',
      description: 'We typically respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 95003 47142',
      description: 'Monday to Friday, 9 AM to 6 PM IST',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Arakkonam, Tamil Nadu',
      description: 'Arakkonam, Tamil Nadu - 631001',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon - Fri, 9 AM - 6 PM',
      description: 'IST (Indian Standard Time)',
    },
  ];

  return (
    <main className="overflow-hidden">
      <Header />

      {/* Page Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/95 to-slate-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Have questions about our courses? Want to suggest a new topic? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border/60 rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-500 hover-lift"
                >
                  <Icon size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="font-medium text-foreground mb-2">{info.details}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-6">Quick Links</h3>

              <div className="space-y-3">
                <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 hover:border-primary/40 border border-border/60 transition-all cursor-pointer hover:shadow-sm">
                  <h4 className="font-semibold text-foreground mb-1">Course Enrollment</h4>
                  <p className="text-sm text-muted-foreground">
                    Questions about enrolling in a course?
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 hover:border-primary/40 border border-border/60 transition-all cursor-pointer hover:shadow-sm">
                  <h4 className="font-semibold text-foreground mb-1">Technical Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Having issues with the platform?
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 hover:border-primary/40 border border-border/60 transition-all cursor-pointer hover:shadow-sm">
                  <h4 className="font-semibold text-foreground mb-1">Billing & Refunds</h4>
                  <p className="text-sm text-muted-foreground">
                    Payment and refund related inquiries
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 hover:border-primary/40 border border-border/60 transition-all cursor-pointer hover:shadow-sm">
                  <h4 className="font-semibold text-foreground mb-1">Course Suggestions</h4>
                  <p className="text-sm text-muted-foreground">
                    Suggest a new course or topic
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 hover:border-primary/40 border border-border/60 transition-all cursor-pointer hover:shadow-sm">
                  <h4 className="font-semibold text-foreground mb-1">Partnerships</h4>
                  <p className="text-sm text-muted-foreground">
                    Corporate training and collaborations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-20 bg-gradient-to-b from-slate-50/80 to-white dark:from-gray-900/80 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-12">Quick answers to common questions</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How do I enroll in a course?',
                a: 'Simply browse our courses, click "Enroll Now", and complete the payment. You get instant access to all course materials.',
              },
              {
                q: 'What is your refund policy?',
                a: 'We offer a 30-day money-back guarantee. If you are not satisfied with a course, contact us for a full refund.',
              },
              {
                q: 'Can I download course materials?',
                a: 'Yes! All course materials including videos, notes, and assignments can be downloaded for offline access.',
              },
              {
                q: 'Do you offer certificates?',
                a: 'Yes, upon completing a course, you receive a certificate of completion that you can share on LinkedIn and resumes.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Some courses offer free preview lessons. You can preview the first lesson of any course before enrolling.',
              },
              {
                q: 'How long do I have access?',
                a: 'You have lifetime access to all courses you enroll in, including future updates and new lessons.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 border border-border/60 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
            Find Us
          </h2>
          <p className="text-muted-foreground text-center mb-10">Visit our office in Arakkonam</p>

          <div className="bg-gradient-to-br from-slate-50 to-primary/5 dark:from-gray-800 dark:to-primary/10 border border-border/60 rounded-2xl h-96 flex items-center justify-center shadow-sm">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                <MapPin size={36} className="text-primary" />
              </div>
              <p className="text-foreground font-semibold text-lg">
                Arakkonam, Tamil Nadu
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Arakkonam, Tamil Nadu - 631001
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
