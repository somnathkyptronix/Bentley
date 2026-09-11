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
          background-color: rgba(20, 66, 49, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(197, 162, 103, 0.4);
          padding: 0.65rem 1rem;
          box-shadow: 0 -6px 25px rgba(0, 0, 0, 0.35);
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
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 700;
        }

        .price-tag {
          font-size: 1.22rem;
          font-weight: 700;
          color: var(--color-gold);
          line-height: 1;
        }

        .price-tag small {
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
        }

        .rate-guarantee {
          font-size: 0.62rem;
          color: #DFCA9B;
          font-weight: 600;
        }

        .mobile-bar-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-quick-call-btn {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--color-gold);
          background-color: rgba(197, 162, 103, 0.15);
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .mobile-quick-call-btn:hover {
          background-color: var(--color-gold);
          color: var(--color-forest-dark);
        }

        .mobile-sticky-cta {
          padding: 0.65rem 1.15rem;
          font-size: 0.82rem;
          font-weight: 700;
          white-space: nowrap;
          background-color: var(--color-gold);
          color: var(--color-forest-dark);
          border-radius: var(--radius-full);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .mobile-sticky-cta:hover {
          background-color: #D8B77D;
        }

        @media (max-width: 768px) {
          .mobile-sticky-bar {
            display: block;
          }
          body {
            padding-bottom: 64px;
          }
        }
      `}</style>
    </div>
  );
}
