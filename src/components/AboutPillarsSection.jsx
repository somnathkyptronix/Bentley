import React from 'react';
import { Home, Shield, Sparkles, ArrowRight, Check } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function AboutPillarsSection({ onOpenBooking, onExploreRooms }) {
  return (
    <section id="about" className="about-pillars-section section-padding">
      <div className="container-wide">
        
        {/* Section Header (Emarat Style) */}
        <div className="section-header emarat-align-left">
          <span className="eyebrow">ABOUT THE PROPERTY</span>
          <h2 className="section-title font-serif">
            Peaceful Country Living, Crafted With Purpose
          </h2>
          <p className="section-lead">
            2 Bentley Bridge Cottages is an authentic two-bedroom stone holiday retreat nestled in Upper Lumsdale, 
            Derbyshire. Designed for couples, small families, and guests travelling with a dog who seek genuine 
            Peak District seclusion without sacrificing modern luxury.
          </p>
        </div>

        {/* Large Wide Lifestyle Feature Card (Emarat Style) */}
        <div className="lifestyle-render-card">
          <div className="render-image-container">
            <img 
              src="/images/living_room.jpg" 
              alt="Cosy living room at 2 Bentley Bridge Cottages with roaring wood stove" 
              className="render-img"
              loading="lazy"
            />
            <div className="render-overlay-badge font-serif">
              <span>Authentic Derbyshire Hearth &bull; Logs Provided</span>
            </div>
          </div>
        </div>

        {/* 3 Value Columns Divided by Hairline Rules (Emarat Style) */}
        <div id="pillars" className="pillars-grid">
          
          <div className="pillar-column">
            <span className="pillar-index font-serif">01</span>
            <div className="pillar-meta">
              <span className="pillar-tag">SANCTUARY</span>
              <h3 className="pillar-title font-serif">A Quiet Countryside Retreat</h3>
            </div>
            <p className="pillar-text">
              Tucked away in the conservation seclusion of Upper Lumsdale, enjoy profound night sky quiet 
              and morning valley birdsong, while remaining just minutes from Matlock and trail networks.
            </p>
            <ul className="pillar-bullets">
              <li><Check size={14} className="bullet-check" /> 300m walk to romantic Lumsdale waterfall gorge</li>
              <li><Check size={14} className="bullet-check" /> 4 minutes to Matlock cafes &amp; Crown Square</li>
              <li><Check size={14} className="bullet-check" /> Effortless 2.5h escape from London &amp; Midlands</li>
            </ul>
          </div>

          <div className="pillar-divider"></div>

          <div className="pillar-column">
            <span className="pillar-index font-serif">02</span>
            <div className="pillar-meta">
              <span className="pillar-tag">ARCHITECTURE</span>
              <h3 className="pillar-title font-serif">Authentic Stone Heritage</h3>
            </div>
            <p className="pillar-text">
              Traditional limestone walls, exposed dark timber beams, gritstone inglenook fireplace, 
              and climbing wisteria that celebrate centuries of English countryside character.
            </p>
            <ul className="pillar-bullets">
              <li><Check size={14} className="bullet-check" /> Cast-iron wood burner with kiln-dried birch logs</li>
              <li><Check size={14} className="bullet-check" /> Bespoke country shaker kitchen &amp; Belfast sink</li>
              <li><Check size={14} className="bullet-check" /> Private limestone-walled dog-safe garden patio</li>
            </ul>
          </div>

          <div className="pillar-divider"></div>

          <div className="pillar-column">
            <span className="pillar-index font-serif">03</span>
            <div className="pillar-meta">
              <span className="pillar-tag">EXPERIENCE</span>
              <h3 className="pillar-title font-serif">Luxury In Every Detail</h3>
            </div>
            <p className="pillar-text">
              Curated like a boutique countryside hotel. From 400-thread Egyptian cotton linens and roll-top 
              clawfoot soaking tubs to thoughtful dog welcome packs and artisan local hampers.
            </p>
            <ul className="pillar-bullets">
              <li><Check size={14} className="bullet-check" /> King-size master bed with panoramic valley vista</li>
              <li><Check size={14} className="bullet-check" /> Bramley botanical bath amenities &amp; rain shower</li>
              <li><Check size={14} className="bullet-check" /> High-speed fibre Wi-Fi &amp; 4K Smart TVs</li>
            </ul>
          </div>

        </div>

      </div>

      <style>{`
        .about-pillars-section {
          background-color: var(--bg-cream);
          border-bottom: 1px solid var(--color-sand);
        }

        .emarat-align-left {
          text-align: left;
          max-width: 820px;
          margin: 0 0 3.2rem 0;
        }

        .lifestyle-render-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 4.5rem;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-sand);
        }

        .render-image-container {
          position: relative;
          width: 100%;
          height: 480px;
        }

        .render-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 45%;
          transition: transform 0.8s ease;
        }

        .lifestyle-render-card:hover .render-img {
          transform: scale(1.02);
        }

        .render-overlay-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(20, 66, 49, 0.9);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          padding: 0.5rem 1.2rem;
          border-radius: var(--radius-full);
          font-size: 0.92rem;
          letter-spacing: 0.03em;
        }

        /* 3 Columns Divided by Hairline Rules (Emarat Style) */
        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: stretch;
          gap: 2rem;
        }

        .pillar-column {
          display: flex;
          flex-direction: column;
          padding: 0 0.5rem;
        }

        .pillar-index {
          font-size: 2.6rem;
          color: var(--color-gold);
          line-height: 1;
          margin-bottom: 0.8rem;
          font-weight: 400;
        }

        .pillar-meta {
          margin-bottom: 0.8rem;
        }

        .pillar-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-forest);
          display: block;
          margin-bottom: 0.35rem;
        }

        .pillar-title {
          font-size: 1.65rem;
          color: var(--color-forest);
          line-height: 1.2;
        }

        .pillar-text {
          font-size: 0.94rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin-bottom: 1.4rem;
        }

        .pillar-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(213, 202, 174, 0.4);
        }

        .pillar-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.86rem;
          color: var(--color-text-body);
        }

        .bullet-check {
          color: var(--color-forest);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .pillar-divider {
          width: 1px;
          background-color: var(--color-sand);
          opacity: 0.6;
        }

        @media (max-width: 1024px) {
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .pillar-divider {
            display: none;
          }
          .render-image-container {
            height: 340px;
          }
        }
      `}</style>
    </section>
  );
}
