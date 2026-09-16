import React from 'react';
import { Calendar, Users, Bed, Dog, Flame, Wifi, MapPin, Sparkles } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function StatementBannerSection({ onOpenBooking }) {
  return (
    <section id="statement" className="statement-banner-section">
      <div className="statement-line-art-overlay"></div>

      <div className="container statement-container">
        <div className="statement-content">
          <span className="statement-eyebrow">
            <Sparkles size={14} className="sparkle-gold" /> YOUR PERFECT DERBYSHIRE BASE
          </span>

          <h2 className="statement-title font-serif">
            Walk. Explore. Relax.<br />
            <span className="title-gold-italic">Repeat.</span>
          </h2>

          <p className="statement-subtext">
            Whether your ideal holiday means early morning walks, long lunches, family adventures, cosy evenings by the fire or simply escaping the everyday routine, <strong>2 Bentley Bridge Cottages gives you the freedom to enjoy Derbyshire your way.</strong>
          </p>

          <div className="statement-cadence-pills">
            <span className="cadence-item">Wake up somewhere peaceful.</span>
            <span className="cadence-dot">&bull;</span>
            <span className="cadence-item">Spend the day exploring.</span>
            <span className="cadence-dot">&bull;</span>
            <span className="cadence-item">Come home and get cosy.</span>
            <span className="cadence-dot">&bull;</span>
            <span className="cadence-item">Then do it all again tomorrow.</span>
          </div>

          <div className="statement-ready-box">
            <h3 className="statement-ready-title font-serif">Ready for your Peak District escape?</h3>
            <div className="statement-cta-wrap">
              <button 
                onClick={() => {
                  tracker.trackCheckAvailability('Statement Banner Check Availability');
                  onOpenBooking();
                }}
                className="statement-gold-pill-btn"
              >
                <Calendar size={16} />
                <span>CHECK AVAILABILITY</span>
              </button>

              <button 
                onClick={() => {
                  tracker.trackCheckAvailability('Statement Banner Book Your Stay');
                  onOpenBooking();
                }}
                className="statement-white-pill-btn"
              >
                <span>BOOK YOUR STAY</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .statement-banner-section {
          background-color: var(--color-forest);
          position: relative;
          padding: 8rem 0;
          overflow: hidden;
          text-align: center;
          color: #FFFFFF;
        }

        .statement-line-art-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 50% 50%, rgba(197, 162, 103, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .statement-container {
          position: relative;
          z-index: 2;
        }

        .statement-content {
          max-width: 920px;
          margin: 0 auto;
        }

        .statement-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1.5rem;
        }

        .sparkle-gold {
          color: var(--color-gold);
        }

        .statement-title {
          font-size: clamp(2.8rem, 5.8vw, 4.8rem);
          color: #FFFFFF;
          line-height: 1.08;
          margin-bottom: 1.4rem;
          font-weight: 400;
          letter-spacing: -0.015em;
        }

        .title-gold-italic {
          color: var(--color-gold);
          font-style: italic;
        }

        .statement-subtext {
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          color: #E2DAC5;
          max-width: 720px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.65;
        }

        .statement-cadence-pills {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(197, 162, 103, 0.3);
          padding: 0.85rem 1.8rem;
          border-radius: var(--radius-full);
          margin-bottom: 2.8rem;
        }

        .cadence-item {
          font-family: var(--font-serif);
          font-size: 0.98rem;
          font-style: italic;
          color: #F8F5E5;
        }

        .cadence-dot {
          color: var(--color-gold);
          opacity: 0.6;
        }

        .statement-ready-box {
          margin-top: 1rem;
        }

        .statement-ready-title {
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          color: #FFFFFF;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .statement-cta-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .statement-gold-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background-color: var(--color-gold);
          color: var(--color-forest-dark);
          font-size: 0.84rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 1rem 2.4rem;
          border-radius: var(--radius-full);
          box-shadow: 0 8px 26px rgba(0, 0, 0, 0.3);
          transition: all var(--transition-smooth);
        }

        .statement-gold-pill-btn:hover {
          background-color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
        }

        .statement-white-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background-color: transparent;
          border: 2px solid rgba(255, 255, 255, 0.65);
          color: #FFFFFF;
          font-size: 0.84rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.95rem 2.2rem;
          border-radius: var(--radius-full);
          transition: all var(--transition-smooth);
        }

        .statement-white-pill-btn:hover {
          background-color: #FFFFFF;
          color: var(--color-forest-dark);
          border-color: #FFFFFF;
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .statement-banner-section {
            padding: 5rem 0;
          }
          .statement-specs-pill-bar {
            border-radius: var(--radius-md);
            padding: 0.9rem;
          }
          .spec-dot {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
