import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

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
      details: '+91 1800 1234 5678',
      description: 'Monday to Friday, 9 AM to 6 PM IST',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Bangalore, India',
      description: 'Tech Hub, Building 42, 3rd Floor',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon - Fri, 9 AM - 6 PM',
      description: 'IST (Indian Standard Time)',
    },
  ];

  return (
    <main>
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our courses? Want to suggest a new topic? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary transition-colors"
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
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Quick Links</h3>

              <div className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4 hover:border-primary border border-border transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Course Enrollment</h4>
                  <p className="text-sm text-muted-foreground">
                    Questions about enrolling in a course?
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 hover:border-primary border border-border transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Technical Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Having issues with the platform?
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 hover:border-primary border border-border transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Billing & Refunds</h4>
                  <p className="text-sm text-muted-foreground">
                    Payment and refund related inquiries
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 hover:border-primary border border-border transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Course Suggestions</h4>
                  <p className="text-sm text-muted-foreground">
                    Suggest a new course or topic
                  </p>
                </div>

                <div className="bg-background/50 rounded-lg p-4 hover:border-primary border border-border transition-colors cursor-pointer">
                  <h4 className="font-semibold text-foreground mb-2">Partnerships</h4>
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
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <div key={idx}>
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Find Us
          </h2>

          <div className="bg-card border border-border rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-primary/20 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Bangalore, India
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Tech Hub, Building 42, 3rd Floor
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
