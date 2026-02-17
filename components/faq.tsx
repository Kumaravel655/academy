'use client';

import { useState } from 'react';
import { FAQ } from '@/lib/types';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  faqs: FAQ[];
}

export function FAQComponent({ faqs }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs.length) return null;

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold text-foreground mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-border rounded-lg overflow-hidden bg-card/50 hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() =>
                  setOpenId(openId === faq.id ? null : faq.id)
                }
                className="w-full flex items-center justify-between p-5 hover:bg-background/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground text-left">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openId === faq.id && (
                <div className="px-5 pb-5 border-t border-border/50 bg-background/30">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
