import React from 'react';
import { ArrowUpRight, Bed, Bath, Utensils } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function LuxuryRedefinedSection({ onExploreRooms }) {
  const cards = [
    {
      id: 'bed',
      title: 'Master Double Sanctuary',
      subtitle: 'Egyptian Cotton & Valley Mist',
      image: '/images/bedroom_master.jpg',
      icon: Bed,
      linkText: 'View Bed Chambers'
    },
    {
      id: 'bath',
      title: 'Heritage Blue Roll-Top Bath',
      subtitle: 'Clawfoot Soaking & Rain Shower',
      image: '/images/bathroom.jpg',
      icon: Bath,
      isCenterWithButton: true,
      linkText: 'Explore All Spaces'
    },
    {
      id: 'kitchen',
      title: 'Bespoke Shaker Kitchen',
      subtitle: 'Belfast Sink & Farmhouse Dining',
      image: '/images/kitchen.jpg',
      icon: Utensils,
      linkText: 'View Country Kitchen'
    }
  ];

  return (
    <section className="luxury-redefined-section section-padding">
      <div className="container-wide">
        
        {/* Large Overlapping Display Heading (Emarat Style) */}
        <div className="luxury-header">
          <span className="eyebrow-gold">SIGNATURE SPACES</span>
          <h2 className="luxury-title font-serif">
            Country Luxury Redefined
          </h2>
          <p className="luxury-subtitle">
            An elevated rural escape where authentic Derbyshire architectural character meets 
            contemporary boutique craftsmanship.
          </p>
        </div>

        {/* 3 Tall Vertical Photo Cards (Emarat Style) */}
        <div className="trio-cards-grid">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id} 
                className={`trio-card ${card.isCenterWithButton ? 'featured-center' : ''}`}
                onClick={onExploreRooms}
              >
                <div className="trio-media">
                  <img src={card.image} alt={card.title} className="trio-img" loading="lazy" />
                  <div className="trio-overlay"></div>

                  {/* Circular Floating Action Button on Center Card (Emarat Style) */}
                  {card.isCenterWithButton && (
                    <div className="center-floating-circle-btn">
                      <span className="circle-btn-text font-serif">EXPLORE<br />ROOMS</span>
                      <ArrowUpRight size={18} className="circle-arrow" />
                    </div>
                  )}

                  <div className="trio-card-content">
                    <div className="trio-icon-badge">
                      <Icon size={18} />
                    </div>
                    <span className="trio-card-sub font-serif">{card.subtitle}</span>
                    <h3 className="trio-card-title font-serif">{card.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .luxury-redefined-section {
          background-color: var(--color-forest);
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
        }

        .luxury-header {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 4rem auto;
        }

        .eyebrow-gold {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 0.8rem;
        }

        .luxury-title {
          font-size: clamp(2.6rem, 4.8vw, 4.2rem);
          color: #FFFFFF;
          line-height: 1.08;
          margin-bottom: 1.2rem;
          font-weight: 400;
        }

        .luxury-subtitle {
          font-size: 1.05rem;
          color: #E2DAC5;
          line-height: 1.65;
        }

        /* 3 Vertical Cards Grid (Emarat Style) */
        .trio-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .trio-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(197, 162, 103, 0.25);
          background: rgba(14, 45, 34, 0.6);
          box-shadow: var(--shadow-md);
          transition: all var(--transition-smooth);
        }

        .trio-card:hover {
          transform: translateY(-8px);
          border-color: var(--color-gold);
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.4);
        }

        .trio-media {
          position: relative;
          height: 520px;
          overflow: hidden;
        }

        .trio-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .trio-card:hover .trio-img {
          transform: scale(1.08);
        }

        .trio-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(14, 45, 34, 0.1) 0%, rgba(14, 45, 34, 0.3) 50%, rgba(14, 45, 34, 0.95) 100%);
          transition: background var(--transition-fast);
        }

        .trio-card:hover .trio-overlay {
          background: linear-gradient(180deg, rgba(14, 45, 34, 0.05) 0%, rgba(14, 45, 34, 0.25) 45%, rgba(14, 45, 34, 0.98) 100%);
        }

        /* Center Card Circular Floating Button (Emarat Style) */
        .center-floating-circle-btn {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
          transition: all var(--transition-smooth);
          z-index: 5;
        }

        .trio-card:hover .center-floating-circle-btn {
          background-color: var(--color-gold);
          color: var(--color-forest-dark);
          transform: translate(-50%, -50%) scale(1.08);
        }

        .circle-btn-text {
          font-size: 0.8rem;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-align: center;
        }

        .circle-arrow {
          margin-top: 4px;
        }

        .trio-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.2rem 2rem;
          z-index: 2;
        }

        .trio-icon-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(197, 162, 103, 0.25);
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.8rem;
        }

        .trio-card-sub {
          display: block;
          font-size: 0.9rem;
          font-style: italic;
          color: var(--color-gold);
          margin-bottom: 0.35rem;
        }

        .trio-card-title {
          font-size: 1.65rem;
          color: #FFFFFF;
          line-height: 1.2;
        }

        @media (max-width: 1024px) {
          .trio-cards-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .trio-media {
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
}
