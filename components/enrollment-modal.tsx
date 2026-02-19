'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, X, AlertCircle } from 'lucide-react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  courseName: string;
  coursePrice: number;
  loading?: boolean;
}

export function EnrollmentModal({
  isOpen,
  onClose,
  onConfirm,
  courseName,
  coursePrice,
  loading = false,
}: EnrollmentModalProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 border border-border/60 rounded-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-foreground">Confirm Enrollment</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 border border-border/60">
            <h3 className="font-semibold text-foreground mb-2">{courseName}</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">₹{coursePrice}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Lifetime Access</p>
                <p className="text-sm text-muted-foreground">Learn at your own pace</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Certificate</p>
                <p className="text-sm text-muted-foreground">Upon completion</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">30-Day Money Back</p>
                <p className="text-sm text-muted-foreground">Full refund guarantee</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border/60 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-muted-foreground">
                I agree to the course terms and conditions. I understand this is a non-refundable
                purchase after 30 days.
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-border/60 hover:bg-slate-50 dark:hover:bg-gray-700 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={!agreedToTerms || loading}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl shadow-lg"
            >
              {loading ? 'Enrolling...' : 'Confirm Enrollment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
