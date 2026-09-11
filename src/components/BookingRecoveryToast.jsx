import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, X, Clock } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function BookingRecoveryToast({ onOpenBooking }) {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show recovery toast after 22 seconds of browsing if not dismissed
    const timer = setTimeout(() => {
      const alreadyDismissed = sessionStorage.getItem('bbc_recovery_dismissed');
      if (!alreadyDismissed && !dismissed) {
        setIsVisible(true);
        tracker.track('view_booking_recovery_prompt', { prompt: 'Autumn/Winter Dates Urgency' });
      }
    }, 22000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    sessionStorage.setItem('bbc_recovery_dismissed', 'true');
    tracker.track('dismiss_booking_recovery_prompt');
  };

  const handleAction = () => {
    setIsVisible(false);
    setDismissed(true);
    tracker.track('click_booking_recovery_cta');
    onOpenBooking();
  };

  if (!isVisible) return null;

  return (
    <div className="recovery-toast animate-fade-in">
      <button onClick={handleDismiss} className="toast-close" aria-label="Dismiss">
        <X size={16} />
      </button>

      <div className="toast-content">
        <div className="toast-badge">
          <Clock size={12} /> High Demand
        </div>
        <h4 className="toast-title font-serif">Planning a Peak District Getaway?</h4>
        <p className="toast-desc">
          Weekend dates for Autumn &amp; Winter 2026 are filling up. Reserve your stay direct today to enjoy our 
          <strong> Best Rate Guarantee</strong> + free firewood &amp; welcome hamper.
        </p>
        <button onClick={handleAction} className="btn-primary toast-btn">
          <Calendar size={14} /> Check Dates Before They Fill
        </button>
      </div>

      <style>{`
        .recovery-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          max-width: 360px;
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          box-shadow: 0 16px 36px rgba(47, 69, 83, 0.22);
          padding: 1.4rem;
          z-index: 92;
        }

        .toast-close {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          color: var(--color-text-muted);
          padding: 0.2rem;
          border-radius: 50%;
        }

        .toast-close:hover {
          color: var(--color-primary);
          background-color: var(--bg-cream);
        }

        .toast-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background-color: #FFF2D6;
          color: #8C5E0D;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.6rem;
        }

        .toast-title {
          font-size: 1.2rem;
          color: var(--color-primary);
          margin-bottom: 0.4rem;
        }

        .toast-desc {
          font-size: 0.84rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .toast-desc strong {
          color: var(--color-primary);
        }

        .toast-btn {
          width: 100%;
          padding: 0.75rem;
          font-size: 0.86rem;
        }

        @media (max-width: 768px) {
          .recovery-toast {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
