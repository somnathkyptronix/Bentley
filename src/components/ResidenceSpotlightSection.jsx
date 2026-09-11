import React, { useState } from 'react';
import { Bed, Flame, Bath, Sun, Calendar, ArrowRight, Check, Heart, Shield } from 'lucide-react';
import { tracker } from '../services/analytics';

const spaces = [
  {
    id: 'living',
    num: '01',
    tabName: 'The Living Room',
    title: 'The Living Room & Inglenook Hearth',
    sub: 'ACCOMMODATES 4 GUESTS &bull; CAST-IRON STOVE',
    lead: 'The heart of the cottage — where muddy boots come off and time slows down.',
    desc: 'Sink into the deep sage wool sofa as dry Derbyshire birch logs crackle in the original stone inglenook. Soft lamplight warms the exposed timber ceiling, while an artisan woven throw and steaming mug of tea wait on the low oak coffee table. Curated library of Peak District walking maps and board games included.',
    image: '/images/living_room.jpg',
    specs: [
      { label: 'HEARTH & FIRE', value: 'Complimentary Kiln Logs' },
      { label: 'COMFORT', value: 'Plush Sage Wool Sofa' },
      { label: 'MEDIA', value: '43" 4K Smart TV & Netflix' },
      { label: 'PET AMENITIES', value: 'Hound Bed & Fleece Blanket' }
    ]
  },
  {
    id: 'master',
    num: '02',
    tabName: 'Master Bedroom',
    title: 'Master King Bed Sanctuary',
    sub: 'KING SIZE BED &bull; DERBYSHIRE VALLEY VIEWS',
    lead: 'Wake up to morning birdsong and mist rising over Upper Lumsdale.',
    desc: 'A quiet sanctuary of restorative rest. Features a handcrafted king-sized wooden bed dressed with crisp 400-thread-count Egyptian cotton linens, a textured wool runner, and hypoallergenic cloud-soft pillows. An exposed limestone feature wall and antique bedside reading lamps create an intimate, timeless atmosphere.',
    image: '/images/bedroom_master.jpg',
    specs: [
      { label: 'BED TYPE', value: 'King Pocket-Sprung' },
      { label: 'LINENS', value: '400TC Egyptian Cotton' },
      { label: 'OUTLOOK', value: 'Upper Lumsdale Valley' },
      { label: 'STORAGE', value: 'Handcrafted Oak Wardrobe' }
    ]
  },
  {
    id: 'kitchen',
    num: '03',
    tabName: 'Country Kitchen',
    title: 'Country Kitchen & Dining Table',
    sub: 'FARMHOUSE DINING &bull; BELFAST CERAMIC SINK',
    lead: 'Bespoke shaker craftsmanship designed for leisurely country breakfasts.',
    desc: 'Golden morning light streams through cottage casement windows as you brew fresh cafetiere coffee. Features bespoke sage cabinetry, solid oak worktops, a deep Belfast ceramic sink, and a pine farmhouse dining table that seats four comfortably. Includes your Derbyshire Welcome Hamper with local oatcakes and honey.',
    image: '/images/kitchen.jpg',
    specs: [
      { label: 'WORKTOPS', value: 'Solid Oiled Oak' },
      { label: 'SINK', value: 'Deep Belfast Ceramic' },
      { label: 'APPLIANCES', value: 'Dishwasher, Hob, Oven' },
      { label: 'WELCOME', value: 'Derbyshire Artisan Hamper' }
    ]
  },
  {
    id: 'bath',
    num: '04',
    tabName: 'Heritage Bathroom',
    title: 'Heritage Blue Roll-Top Clawfoot Bath',
    sub: 'CAST-IRON SOAKING &bull; RAINFALL SHOWER',
    lead: 'Soak away tired trail legs in a deep freestanding roll-top tub.',
    desc: 'Step onto warm stone tiles and enjoy the restorative ritual of a long bath. Featuring an authentic cast-iron roll-top clawfoot tub painted in deep heritage blue with antique brass taps, plus a separate glass-enclosed rainfall shower. Plush oversized white towels and organic Bramley botanical infusions complete the experience.',
    image: '/images/bathroom.jpg',
    specs: [
      { label: 'BATH', value: 'Freestanding Roll-Top' },
      { label: 'SHOWER', value: 'Walk-In Rain Shower' },
      { label: 'FIXTURES', value: 'Antique Polished Brass' },
      { label: 'TOILETRIES', value: 'Organic Bramley Botanicals' }
    ]
  },
  {
    id: 'garden',
    num: '05',
    tabName: 'Garden Patio',
    title: 'Private Garden Patio & Terrace',
    sub: 'ENCLOSED LIMESTONE WALLS &bull; ALFRESCO DINING',
    lead: 'Your own private sun-trap facing the tranquil Derbyshire rolling hills.',
    desc: 'Bordered by traditional limestone dry stone walls and overflowing with lavender, climbing roses, and hydrangeas. A weathered teak outdoor dining table invites long al fresco lunches and chilled wine as the sun sets over the valley. Fully enclosed and secure, so your dog can safely roam and sunbathe.',
    image: '/images/garden_patio.jpg',
    specs: [
      { label: 'SECURITY', value: 'Fully Enclosed Dry Stone' },
      { label: 'FURNITURE', value: 'Teak Dining for Four' },
      { label: 'PAW CARE', value: 'Warm-Water Outdoor Hose' },
      { label: 'VIEW', value: 'Panoramic Valley Hills' }
    ]
  }
];

export default function ResidenceSpotlightSection({ onOpenBooking }) {
  const [activeSpaceId, setActiveSpaceId] = useState('living');
  const activeSpace = spaces.find(s => s.id === activeSpaceId) || spaces[0];

  return (
    <section id="spaces" className="residence-spotlight-section section-padding">
      <div className="container-wide">
        
        {/* Section Header (Emarat Style) */}
        <div className="spotlight-header">
          <span className="eyebrow">RESIDENCE OVERVIEW</span>
          <h2 className="spotlight-title font-serif">The Cottage Specifications &amp; Spaces.</h2>
          <p className="spotlight-subtitle">
            Explore each carefully appointed room at 2 Bentley Bridge Cottages.
          </p>
        </div>

        {/* Side-by-Side Split Showcase (Emarat Style) */}
        <div className="spotlight-split-card">
          
          {/* Left Column: Room Photo */}
          <div className="spotlight-media-col">
            <div className="spotlight-img-frame">
              <img 
                src={activeSpace.image} 
                alt={activeSpace.title} 
                className="spotlight-img"
                key={activeSpace.id}
              />
              <span className="spotlight-float-tag font-serif">{activeSpace.num} &bull; {activeSpace.tabName}</span>
            </div>
          </div>

          {/* Right Column: Room Details & 4 Specs Boxes */}
          <div className="spotlight-content-col">
            <span className="spotlight-kicker font-serif">{activeSpace.sub}</span>
            <h3 className="spotlight-room-title font-serif">{activeSpace.title}</h3>
            <p className="spotlight-lead-quote font-serif">"{activeSpace.lead}"</p>
            <p className="spotlight-desc">{activeSpace.desc}</p>

            {/* 4 Icon Specification Boxes (Emarat Style) */}
            <div className="specs-boxes-grid">
              {activeSpace.specs.map((sp, idx) => (
                <div key={idx} className="spec-box">
                  <span className="spec-box-label">{sp.label}</span>
                  <span className="spec-box-value font-serif">{sp.value}</span>
                </div>
              ))}
            </div>

            {/* Action Row */}
            <div className="spotlight-action-row">
              <button 
                onClick={() => {
                  tracker.trackCheckAvailability(`Residence Spotlight: ${activeSpace.tabName}`);
                  onOpenBooking();
                }}
                className="spotlight-pill-btn"
              >
                <Calendar size={16} />
                <span>BOOK THIS RETREAT</span>
              </button>
              <div className="spotlight-perk-badge">
                <Shield size={14} className="shield-icon" />
                <span>Direct Booking Guarantee &bull; £0 Service Fees</span>
              </div>
            </div>

          </div>

        </div>

        {/* Horizontal Room Switcher Tabs at Bottom (Emarat Style) */}
        <div className="spotlight-tabs-bar">
          {spaces.map(sp => (
            <button
              key={sp.id}
              onClick={() => {
                setActiveSpaceId(sp.id);
                tracker.track('view_residence_tab', { room: sp.tabName });
              }}
              className={`spotlight-tab ${activeSpaceId === sp.id ? 'active' : ''}`}
            >
              <span className="tab-num font-serif">{sp.num}</span>
              <span className="tab-name">{sp.tabName}</span>
            </button>
          ))}
        </div>

      </div>

      <style>{`
        .residence-spotlight-section {
          background-color: var(--bg-cream);
          border-bottom: 1px solid var(--color-sand);
        }

        .spotlight-header {
          text-align: left;
          max-width: 800px;
          margin-bottom: 3.5rem;
        }

        .spotlight-title {
          font-size: clamp(2.4rem, 4.2vw, 3.4rem);
          color: var(--color-forest);
          line-height: 1.15;
          margin-bottom: 0.6rem;
        }

        .spotlight-subtitle {
          font-size: 1.05rem;
          color: var(--color-text-muted);
        }

        /* Split Card (Emarat Style) */
        .spotlight-split-card {
          background-color: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-sand);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          box-shadow: var(--shadow-md);
          margin-bottom: 2rem;
        }

        .spotlight-media-col {
          position: relative;
          min-height: 520px;
          background-color: var(--bg-cream-dark);
        }

        .spotlight-img-frame {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .spotlight-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .spotlight-split-card:hover .spotlight-img {
          transform: scale(1.02);
        }

        .spotlight-float-tag {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(20, 66, 49, 0.9);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          padding: 0.45rem 1.1rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          letter-spacing: 0.05em;
        }

        .spotlight-content-col {
          padding: 3.5rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .spotlight-kicker {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-gold-dark);
          margin-bottom: 0.6rem;
          display: block;
        }

        .spotlight-room-title {
          font-size: 2.2rem;
          color: var(--color-forest);
          margin-bottom: 0.8rem;
          line-height: 1.18;
        }

        .spotlight-lead-quote {
          font-size: 1.1rem;
          font-style: italic;
          color: var(--color-forest);
          line-height: 1.5;
          margin-bottom: 1.2rem;
          padding-left: 1rem;
          border-left: 2px solid var(--color-gold);
        }

        .spotlight-desc {
          font-size: 0.94rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin-bottom: 2rem;
        }

        /* 4 Specification Boxes (Emarat Style) */
        .specs-boxes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2.2rem;
        }

        .spec-box {
          background-color: var(--bg-cream-light);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-sm);
          padding: 0.9rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .spec-box-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-gold-dark);
        }

        .spec-box-value {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-forest);
        }

        .spotlight-action-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .spotlight-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background-color: var(--color-forest);
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.9rem 2rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 16px rgba(20, 66, 49, 0.25);
          transition: all var(--transition-smooth);
        }

        .spotlight-pill-btn:hover {
          background-color: var(--color-forest-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(20, 66, 49, 0.35);
        }

        .spotlight-perk-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .shield-icon {
          color: var(--color-gold-dark);
        }

        /* Bottom Horizontal Tab Bar (Emarat Style) */
        .spotlight-tabs-bar {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .spotlight-tab {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1.1rem 1.4rem;
          border-right: 1px solid var(--color-sand);
          transition: all var(--transition-fast);
        }

        .spotlight-tab:last-child {
          border-right: none;
        }

        .spotlight-tab:hover {
          background-color: var(--bg-cream-light);
        }

        .spotlight-tab.active {
          background-color: var(--color-forest);
          color: #FFFFFF;
        }

        .tab-num {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-gold);
        }

        .tab-name {
          font-size: 0.88rem;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .spotlight-split-card {
            grid-template-columns: 1fr;
          }
          .spotlight-media-col {
            min-height: 380px;
          }
          .spotlight-tabs-bar {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .spotlight-content-col {
            padding: 2rem 1.5rem;
          }
          .spotlight-tabs-bar {
            grid-template-columns: 1fr;
          }
          .specs-boxes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
