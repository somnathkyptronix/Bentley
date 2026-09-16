import React from 'react';
import { 
  Wifi, Tv, Flame, Wind, Sparkles, Check, 
  Dog, AlertCircle, ShieldAlert, MapPin, Beer, ShoppingBag, 
  Utensils, Bed, Baby, Sun, Calendar, Clock, Car, Ban
} from 'lucide-react';
import { tracker } from '../services/analytics';

export default function AmenitiesAndEssentialsSection({ onOpenBooking }) {
  const amenitiesList = [
    { icon: Wifi, title: 'High-Speed Wi-Fi', desc: 'Fast, reliable connectivity throughout the cottage.' },
    { icon: Tv, title: 'Smart TV in Living Room', desc: 'Stream your favourite films and shows.' },
    { icon: Tv, title: 'Smart TVs in Both Bedrooms', desc: 'Wind down with shows in bed before sleep.' },
    { icon: Wind, title: 'Central Heating', desc: 'Keep comfortably warm throughout every season.' },
    { icon: Flame, title: 'Woodburning Stove', desc: 'Cosy authentic warmth for memorable evenings.' },
    { icon: Sparkles, title: 'Bed Linen & Towels', desc: 'Fresh crisp bed linens and plush bath towels provided.' },
    { icon: Sparkles, title: 'Fuel & Electricity Included', desc: 'All utilities, heating, and logs included in your stay.' },
    { icon: Utensils, title: 'Fully Equipped Kitchen', desc: 'Electric oven, gas hob, microwave, fridge/freezer.' },
    { icon: Sparkles, title: 'Dishwasher & Washing Machine', desc: 'Practical modern facilities making holidays easy.' },
    { icon: Baby, title: 'Travel Cot, Highchair & Stairgate', desc: 'Thoughtful family-friendly equipment available.' },
    { icon: Sun, title: 'Patio Garden with Furniture', desc: 'Private outdoor patio for morning coffee and sunsets.' },
    { icon: Dog, title: 'One Well-Behaved Pet Welcome', desc: 'Bring your dog to explore Derbyshire\'s trails together.' },
    { icon: Car, title: 'Roadside Parking', desc: 'Available on a first-come, first-served basis.' }
  ];

  const goodToKnowSpecs = [
    { label: 'Sleeps', value: '4 Guests', icon: Bed },
    { label: 'Bedrooms', value: '2 (Double + Twin)', icon: Bed },
    { label: 'Pets', value: '1 Well-Behaved Pet', icon: Dog },
    { label: 'Wi-Fi', value: 'Included', icon: Wifi },
    { label: 'Parking', value: 'Roadside (First-come)', icon: Car },
    { label: 'Garden', value: 'Private Patio Garden', icon: Sun },
    { label: 'Smoking', value: 'Not Permitted', icon: Ban },
    { label: 'Nearest Shop', value: '1.2 Miles', icon: ShoppingBag },
    { label: 'Nearest Pub', value: '0.6 Miles', icon: Beer },
  ];

  return (
    <section id="amenities" className="amenities-essentials-section section-padding">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">PRACTICAL DETAILS &amp; COMFORT</span>
          <h2 className="section-title font-serif">
            Everything You Need for an Easy Stay
          </h2>
          <p className="section-lead">
            We've thought about the practical details so you can simply arrive, relax, and make yourself at home.
          </p>
        </div>

        {/* Proximity Pill Bar */}
        <div className="proximity-pills-row">
          <div className="proximity-pill">
            <Beer size={16} className="pill-icon" />
            <span>Nearest Pub: <strong>~0.6 miles away</strong></span>
          </div>
          <div className="proximity-pill">
            <ShoppingBag size={16} className="pill-icon" />
            <span>Local Shop: <strong>~1.2 miles away</strong></span>
          </div>
          <div className="proximity-pill">
            <Dog size={16} className="pill-icon" />
            <span>Dog Friendly: <strong>1 well-behaved pet welcome</strong></span>
          </div>
        </div>

        {/* 2-Column Split: Amenities Grid + Good to Know Card */}
        <div className="amenities-split-layout">
          
          {/* Left: Interactive Checklist Grid */}
          <div className="amenities-grid-wrap">
            <h3 className="subheading font-serif">Included Amenities &amp; Facilities</h3>
            <div className="amenities-cards-grid">
              {amenitiesList.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="amenity-item-card">
                    <div className="amenity-icon-box">
                      <Icon size={20} />
                    </div>
                    <div className="amenity-text">
                      <h4 className="amenity-title">{item.title}</h4>
                      <p className="amenity-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Good to Know Card */}
          <div className="good-to-know-sidebar">
            <div className="good-to-know-card">
              <div className="card-header">
                <span className="eyebrow-gold">KEY STAY FACTS</span>
                <h3 className="good-to-know-title font-serif">Good to Know</h3>
                <p className="card-intro">
                  Essential details and stay notes for 2 Bentley Bridge Cottages.
                </p>
              </div>

              <div className="good-to-know-list">
                {goodToKnowSpecs.map((spec, idx) => {
                  const Icon = spec.icon;
                  return (
                    <div key={idx} className="spec-row">
                      <div className="spec-row-label">
                        <Icon size={15} className="spec-icon" />
                        <span>{spec.label}:</span>
                      </div>
                      <span className="spec-row-value">{spec.value}</span>
                    </div>
                  );
                })}
              </div>

              {/* Garden Steps Notice */}
              <div className="important-alert-box warning-box">
                <AlertCircle size={18} className="alert-icon" />
                <div className="alert-text">
                  <strong>Please note:</strong> There are steps leading down to the garden, so please take care when accessing the patio.
                </div>
              </div>

              {/* Good Housekeeping Bond Notice */}
              <div className="important-alert-box bond-box">
                <ShieldAlert size={18} className="alert-icon" />
                <div className="alert-text">
                  A <strong>£250 Good Housekeeping bond</strong> applies to your stay, fully refundable post-departure.
                </div>
              </div>

              <div className="sidebar-cta-wrap">
                <button 
                  onClick={() => {
                    tracker.trackCheckAvailability('Good To Know Sidebar CTA');
                    onOpenBooking();
                  }}
                  className="good-to-know-btn"
                >
                  <Calendar size={16} />
                  <span>Check Availability</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      <style>{`
        .amenities-essentials-section {
          background-color: var(--bg-cream);
          border-top: 1px solid var(--color-sand);
          border-bottom: 1px solid var(--color-sand);
        }

        .section-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 2.5rem auto;
        }

        .proximity-pills-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .proximity-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #FFFFFF;
          border: 1px solid var(--color-sand);
          padding: 0.65rem 1.3rem;
          border-radius: var(--radius-full);
          font-size: 0.92rem;
          color: var(--color-charcoal);
          box-shadow: var(--shadow-sm);
        }

        .proximity-pill strong {
          color: var(--color-forest);
        }

        .pill-icon {
          color: var(--color-gold);
        }

        .amenities-split-layout {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3.5rem;
          align-items: flex-start;
        }

        .subheading {
          font-size: 1.6rem;
          color: var(--color-forest);
          margin-bottom: 1.8rem;
        }

        .amenities-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
        }

        .amenity-item-card {
          background: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .amenity-item-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-gold);
        }

        .amenity-icon-box {
          background: rgba(20, 66, 49, 0.07);
          color: var(--color-forest);
          padding: 0.65rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .amenity-title {
          font-size: 0.98rem;
          font-weight: 600;
          color: var(--color-forest);
          margin-bottom: 0.25rem;
        }

        .amenity-desc {
          font-size: 0.84rem;
          color: var(--color-charcoal);
          opacity: 0.8;
          line-height: 1.45;
          margin: 0;
        }

        /* Good to Know Sidebar Card */
        .good-to-know-sidebar {
          position: sticky;
          top: 6rem;
        }

        .good-to-know-card {
          background: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-lg);
          padding: 2.2rem;
          box-shadow: var(--shadow-md);
        }

        .good-to-know-title {
          font-size: 1.85rem;
          color: var(--color-forest);
          margin: 0.3rem 0 0.5rem 0;
        }

        .card-intro {
          font-size: 0.9rem;
          color: var(--color-charcoal);
          opacity: 0.75;
          margin-bottom: 1.6rem;
        }

        .good-to-know-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.6rem;
          border-bottom: 1px solid var(--color-sand);
          padding-bottom: 1.4rem;
        }

        .spec-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.92rem;
        }

        .spec-row-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-charcoal);
          opacity: 0.85;
        }

        .spec-icon {
          color: var(--color-gold);
        }

        .spec-row-value {
          font-weight: 600;
          color: var(--color-forest);
        }

        .important-alert-box {
          display: flex;
          gap: 0.75rem;
          padding: 0.95rem 1.1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .warning-box {
          background: rgba(197, 162, 103, 0.12);
          border: 1px solid rgba(197, 162, 103, 0.35);
          color: #5D4316;
        }

        .bond-box {
          background: rgba(20, 66, 49, 0.08);
          border: 1px solid rgba(20, 66, 49, 0.2);
          color: var(--color-forest);
        }

        .alert-icon {
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .sidebar-cta-wrap {
          margin-top: 1.4rem;
        }

        .good-to-know-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: var(--color-forest);
          color: #FFFFFF;
          border: none;
          padding: 0.95rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.92rem;
          letter-spacing: 0.04em;
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }

        .good-to-know-btn:hover {
          background: var(--color-forest-light);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .amenities-split-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .good-to-know-sidebar {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .amenities-cards-grid {
            grid-template-columns: 1fr;
          }
          .good-to-know-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
