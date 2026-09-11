import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function MobileStickyCTA({ onOpenBooking }) {
  return (
    <div className="mobile-sticky-bar">
      <div className="mobile-bar-inner">
        <div className="mobile-price-preview">
          <span className="from-label">From</span>
          <span className="price-tag font-serif">£155<small>/night</small></span>
          <span className="rate-guarantee">Best Rate Guarantee</span>
        </div>
        <div className="mobile-bar-actions">
          <a href="tel:+441629828450" className="mobile-quick-call-btn" aria-label="Call host">
            <Phone size={17} />
          </a>
          <button 
            id="mobile-sticky-check-avail-btn"
            onClick={() => {
              tracker.trackCheckAvailability('Mobile Sticky Bottom Bar');
              onOpenBooking();
            }}
            className="btn-primary mobile-sticky-cta"
          >
            <Calendar size={16} />
            <span>Check Availability</span>
          </button>
        </div>
      </div>

      <style>{`
        .mobile-sticky-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 85;
          background-color: rgba(248, 245, 229, 0.98);
          backdrop-filter: blur(12px);
          border-top: 1px solid var(--color-sand);
          padding: 0.75rem 1rem;
          box-shadow: 0 -4px 18px rgba(46, 42, 28, 0.12);
        }

        .mobile-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 500px;
          margin: 0 auto;
          gap: 0.8rem;
        }

        .mobile-price-preview {
          display: flex;
          flex-direction: column;
        }

        .from-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-sage);
          font-weight: 700;
        }

        .price-tag {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
        }

        .price-tag small {
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--color-text-muted);
        }

        .rate-guarantee {
          font-size: 0.65rem;
          color: var(--color-olive);
          font-weight: 600;
        }

        .mobile-bar-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-quick-call-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--color-primary);
          background-color: transparent;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-sticky-cta {
          padding: 0.75rem 1.25rem;
          font-size: 0.88rem;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .mobile-sticky-bar {
            display: block;
          }
          body {
            padding-bottom: 68px;
          }
        }
      `}</style>
    </div>
  );
}
