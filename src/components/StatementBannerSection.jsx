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
            <Sparkles size={14} className="sparkle-gold" /> UPPER LUMSDALE CONSERVATION SANCTUARY
          </span>

          <h2 className="statement-title font-serif">
            Where Country Life Falls<br />
            <span className="title-gold-italic">Perfectly Into Place.</span>
          </h2>

          <p className="statement-subtext">
            Stay at 2 Bentley Bridge Cottages — a cosy countryside retreat in Upper Lumsdale, 
            minutes from Matlock and within easy reach of the Peak District.
          </p>

          <div className="statement-specs-pill-bar">
            <span className="spec-item"><Users size={14} /> Sleeps 4</span>
            <span className="spec-dot">&bull;</span>
            <span className="spec-item"><Bed size={14} /> 2 Bedrooms</span>
            <span className="spec-dot">&bull;</span>
            <span className="spec-item"><Dog size={14} /> Dog Friendly</span>
            <span className="spec-dot">&bull;</span>
            <span className="spec-item"><Flame size={14} /> Wood-Burning Stove</span>
            <span className="spec-dot">&bull;</span>
            <span className="spec-item"><Wifi size={14} /> Wi-Fi</span>
            <span className="spec-dot">&bull;</span>
            <span className="spec-item"><MapPin size={14} /> Matlock &bull; DE4 5LB</span>
          </div>

          <div className="statement-cta-wrap">
            <button 
              onClick={() => {
                tracker.trackCheckAvailability('Statement Banner CTA');
                onOpenBooking();
              }}
              className="statement-gold-pill-btn"
            >
              <Calendar size={16} />
              <span>CHECK AVAILABILITY &amp; RATES</span>
            </button>
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

        .statement-specs-pill-bar {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(197, 162, 103, 0.35);
          padding: 0.75rem 1.8rem;
          border-radius: var(--radius-full);
          margin-bottom: 2.8rem;
        }

        .spec-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .spec-item svg {
          color: var(--color-gold);
        }

        .spec-dot {
          color: rgba(197, 162, 103, 0.5);
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
