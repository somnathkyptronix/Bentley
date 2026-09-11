import React, { useState } from 'react';
import { 
  Flame, Wifi, Tv, Coffee, Utensils, Bath, Wind, Sun, 
  Sparkles, CheckCircle2, ChevronRight, Shield, Heart 
} from 'lucide-react';
import { tracker } from '../services/analytics';

const spaces = [
  {
    id: 'living',
    title: 'The Living Room',
    subtitle: 'Cast-iron stove & candlelit evenings',
    image: '/images/living_room.jpg',
    lead: 'The heart of the cottage — where muddy boots come off and time slows down.',
    description: 'Sink into the deep sage wool sofa as dry Derbyshire birch logs crackle in the original stone inglenook. Soft lamplight warms the exposed timber ceiling, while an artisan woven throw and steaming mug of tea wait on the low oak table. Ideal for curling up with a book, enjoying family board games, or unwinding with a film after climbing the valley gorge.',
    highlights: [
      'Cast-iron wood-burning stove with complimentary kiln-dried logs & kindling',
      'Plush deep-seated sofa, vintage armchair & woven woolen throws',
      '43" 4K Smart TV with Netflix, BBC iPlayer & streaming apps',
      'Curated library of Peak District walking maps, local nature books & board games',
      'Dedicated cosy hound bed and fleece blanket for your dog'
    ]
  },
  {
    id: 'kitchen',
    title: 'Country Kitchen & Dining',
    subtitle: 'Farmhouse table & morning light',
    image: '/images/kitchen.jpg',
    lead: 'Bespoke shaker craftsmanship designed for leisurely country breakfasts and shared suppers.',
    description: 'Golden morning light filters through the cottage casement windows as you brew fresh cafetière coffee. Featuring bespoke sage cabinetry, solid oak worktops, a classic deep Belfast ceramic sink, and an antique pine farmhouse dining table that seats four comfortably. Fully equipped with modern culinary touches for cooking fresh produce picked up from Bakewell farmers market.',
    highlights: [
      'Solid oak worktops with deep ceramic Belfast sink overlooking the valley',
      'Full modern oven, ceramic induction hob, microwave & quiet dishwasher',
      'Cafetière coffee press with fresh locally roasted Peak District blend',
      'Pine farmhouse dining table comfortably seating four guests',
      'Derbyshire Welcome Hamper: local oatcakes, farm butter, jam & artisan cider'
    ]
  },
  {
    id: 'double-bed',
    title: 'Master Double Bedroom',
    subtitle: 'Egyptian cotton & valley silence',
    image: '/images/bedroom_master.jpg',
    lead: 'Wake up to birdsong and panoramic views of mist rising over Upper Lumsdale.',
    description: 'A sanctuary of deep, uninterrupted rest. Features a handcrafted king-sized wooden bed dressed with crisp 400-thread-count Egyptian cotton linens, a textured wool runner, and hypoallergenic cloud-soft pillows. An authentic exposed gritstone feature wall and antique bedside reading lamps create an intimate, timeless atmosphere.',
    highlights: [
      'King-sized artisan bed with deep pocket-sprung orthopaedic mattress',
      'Crisp white 400-thread-count Egyptian cotton bed linens & wool runner',
      'Sash window framing unobstructed views across the Derbyshire hillside',
      'Exposed heritage stone wall and original heavy timber ceiling beam',
      'Ample handcrafted wooden wardrobe and vintage luggage bench'
    ]
  },
  {
    id: 'twin-bed',
    title: 'Charming Twin Bedroom',
    subtitle: 'Flexible comfort for family or friends',
    image: '/images/bedroom_twin.jpg',
    lead: 'A light-filled haven styled with warm checked wool blankets and botanical prints.',
    description: 'Equally welcoming for children, friends, or walking companions. Two solid oak single beds dressed in soft cotton sheets and classic checked sage blankets. Peaceful woodland views from the window make waking up a joy, with gentle natural light and bedside reading sconces for quiet bedtime stories.',
    highlights: [
      'Two full-size single beds with comfortable premium pocket-sprung mattresses',
      'Sage green checked British wool throws & plush feather-down pillows',
      'Cottage sash window looking out onto ancient oak and beech trees',
      'Solid oak chest of drawers and vintage bedside lamp with USB charging',
      'Can accommodate travel cot on request for travelling with infants'
    ]
  },
  {
    id: 'bathroom',
    title: 'Heritage Bathroom',
    subtitle: 'Freestanding roll-top tub & rain shower',
    image: '/images/bathroom.jpg',
    lead: 'Soak away tired trail legs in a deep heritage blue roll-top bath.',
    description: 'Step onto warm flagstone tiles and enjoy the restorative ritual of a hot bath. Featuring an authentic cast-iron roll-top clawfoot tub painted in deep heritage blue with polished brass taps, plus a separate glass-enclosed rainfall shower. Fluffy oversized white bath towels and botanical bath infusions add a boutique hotel touch.',
    highlights: [
      'Freestanding cast-iron roll-top bath with brass handheld shower attachment',
      'Walk-in rainfall shower with stone subway tiles and generous water pressure',
      'Heated towel radiator with generous plush bath sheets and bathrobes',
      'Complimentary organic Bramley botanical hand wash, body wash & shampoo',
      'Natural light from frosted cottage sash window'
    ]
  },
  {
    id: 'garden',
    title: 'Private Garden & Patio',
    subtitle: 'Enclosed stone terrace & sunset birdsong',
    image: '/images/garden_patio.jpg',
    lead: 'Your own private sun-trap facing the tranquil Derbyshire rolling hills.',
    description: 'Bordered by traditional limestone dry stone walls and overflowing with fragrant lavender, climbing roses, and hydrangeas. A weathered teak outdoor dining table invites long al fresco lunches and chilled glasses of wine as the sun sets behind the hills. Fully enclosed and secure, so your dog can safely sniff and sunbathe.',
    highlights: [
      'Fully enclosed dry stone walled garden — secure for dogs and toddlers',
      'Teak dining table & four armchairs with weather-resistant cushions',
      'Private charcoal barbecue for warm summer evening cookouts',
      'Warm exterior festoon lanterns for magical candlelit al fresco dining',
      'Dedicated warm-water outdoor hose for washing muddy boots and paws'
    ]
  }
];

export default function TheCottageSection({ onOpenBooking }) {
  const [activeSpaceId, setActiveSpaceId] = useState('living');
  const activeSpace = spaces.find(s => s.id === activeSpaceId) || spaces[0];

  const handleSpaceChange = (id) => {
    setActiveSpaceId(id);
    tracker.track('view_cottage_feature', { room: id });
  };

  return (
    <section id="cottage" className="cottage-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">Life at 2 Bentley Bridge</span>
          <h2 className="section-title">The Cottage Experience</h2>
          <p className="section-lead">
            Every room has been thoughtfully curated to balance English countryside character with modern, 
            understated luxury. Here is what your stay feels like.
          </p>
        </div>

        {/* Room Switcher Tabs */}
        <div className="room-nav-wrapper">
          <div className="room-nav" role="tablist">
            {spaces.map(space => (
              <button
                key={space.id}
                role="tab"
                aria-selected={activeSpaceId === space.id}
                onClick={() => handleSpaceChange(space.id)}
                className={`room-tab-btn ${activeSpaceId === space.id ? 'active' : ''}`}
              >
                <span>{space.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Feature Showcase */}
        <div className="editorial-showcase-card">
          <div className="editorial-grid">
            
            {/* Image Column */}
            <div className="editorial-media">
              <div className="media-frame">
                <img 
                  src={activeSpace.image} 
                  alt={`${activeSpace.title} at 2 Bentley Bridge Cottages`} 
                  className="editorial-image"
                  key={activeSpace.id}
                />
                <div className="media-tag font-serif">{activeSpace.subtitle}</div>
              </div>
            </div>

            {/* Narrative Content Column */}
            <div className="editorial-content">
              <span className="editorial-kicker font-serif">{activeSpace.subtitle}</span>
              <h3 className="editorial-heading">{activeSpace.title}</h3>
              <p className="editorial-lead-quote font-serif">
                "{activeSpace.lead}"
              </p>
              <p className="editorial-body">
                {activeSpace.description}
              </p>

              {/* Highlights List */}
              <div className="editorial-highlights">
                <div className="highlights-title">What you’ll love:</div>
                <ul className="highlights-list">
                  {activeSpace.highlights.map((item, idx) => (
                    <li key={idx} className="highlight-item">
                      <CheckCircle2 size={17} className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Room Specific CTA */}
              <div className="editorial-cta-row">
                <button 
                  onClick={() => {
                    tracker.trackCheckAvailability(`Room Showcase: ${activeSpace.title}`);
                    onOpenBooking();
                  }}
                  className="btn-primary"
                >
                  <span>Book Your Stay at the Cottage</span>
                  <ChevronRight size={16} />
                </button>
                <div className="editorial-trust-micro">
                  <Heart size={14} className="heart-icon" />
                  <span>Dog friendly &bull; Sleeps 4</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Everyday Cottage Luxuries & Specs Grid */}
        <div className="cottage-amenities-grid">
          
          <div className="amenity-card">
            <div className="amenity-icon-box">
              <Flame size={24} />
            </div>
            <h4>Wood-Burning Stove</h4>
            <p>Traditional cast-iron stove with complimentary kiln-dried hardwood logs, kindling, firelighters, and hearth tools.</p>
          </div>

          <div className="amenity-card">
            <div className="amenity-icon-box">
              <Wifi size={24} />
            </div>
            <h4>High-Speed Wi-Fi</h4>
            <p>Reliable high-speed fibre broadband covering the entire cottage and patio. Ideal for streaming or remote country work.</p>
          </div>

          <div className="amenity-card">
            <div className="amenity-icon-box">
              <Tv size={24} />
            </div>
            <h4>Smart Entertainment</h4>
            <p>4K Smart TVs with built-in Netflix, iPlayer, Prime &amp; Disney+ apps, plus bluetooth speaker for ambient music.</p>
          </div>

          <div className="amenity-card">
            <div className="amenity-icon-box">
              <Coffee size={24} />
            </div>
            <h4>Artisan Welcome Hamper</h4>
            <p>Locally sourced Derbyshire oatcakes, artisan jams, farmhouse butter, freshly roasted coffee beans, and tea.</p>
          </div>

          <div className="amenity-card">
            <div className="amenity-icon-box">
              <Bath size={24} />
            </div>
            <h4>Roll-Top Bath &amp; Linens</h4>
            <p>Deep heritage blue cast-iron bathtub, fluffy bath sheets, and organic botanical Bramley bath amenities.</p>
          </div>

          <div className="amenity-card">
            <div className="amenity-icon-box">
              <Sun size={24} />
            </div>
            <h4>Enclosed Dog-Safe Garden</h4>
            <p>Private limestone-walled patio with outdoor teak dining, dog shower hose, and sunset views over the valley.</p>
          </div>

        </div>

      </div>

      <style>{`
        .cottage-section {
          background-color: var(--bg-cream);
          position: relative;
        }

        .room-nav-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .room-nav {
          display: inline-flex;
          background-color: rgba(213, 202, 174, 0.35);
          padding: 0.4rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-sand);
          gap: 0.3rem;
          max-width: 100%;
        }

        .room-tab-btn {
          padding: 0.65rem 1.35rem;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-body);
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .room-tab-btn:hover {
          color: var(--color-primary);
        }

        .room-tab-btn.active {
          background-color: var(--color-primary);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(47, 69, 83, 0.25);
        }

        /* Editorial Card */
        .editorial-showcase-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          margin-bottom: 4rem;
        }

        .editorial-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          align-items: stretch;
        }

        .editorial-media {
          position: relative;
          min-height: 480px;
          background-color: var(--color-sand-light);
        }

        .media-frame {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .editorial-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .editorial-showcase-card:hover .editorial-image {
          transform: scale(1.02);
        }

        .media-tag {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(47, 69, 83, 0.88);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          padding: 0.45rem 1.1rem;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-style: italic;
        }

        .editorial-content {
          padding: 3.2rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .editorial-kicker {
          font-size: 1.05rem;
          font-style: italic;
          color: var(--color-sage);
          margin-bottom: 0.4rem;
        }

        .editorial-heading {
          font-size: 2.2rem;
          margin-bottom: 0.8rem;
          color: var(--color-primary);
        }

        .editorial-lead-quote {
          font-size: 1.18rem;
          font-style: italic;
          color: var(--color-text-body);
          line-height: 1.5;
          margin-bottom: 1.2rem;
          padding-left: 1rem;
          border-left: 2px solid var(--color-stone);
        }

        .editorial-body {
          font-size: 0.96rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          margin-bottom: 1.6rem;
        }

        .editorial-highlights {
          background-color: var(--bg-cream);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 1.3rem;
          margin-bottom: 1.8rem;
        }

        .highlights-title {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-primary);
          margin-bottom: 0.8rem;
        }

        .highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.88rem;
          color: var(--color-text-body);
          line-height: 1.45;
        }

        .check-icon {
          color: var(--color-sage);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .editorial-cta-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .editorial-trust-micro {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--color-sage);
          font-weight: 600;
        }

        .heart-icon {
          color: #B2533E;
        }

        /* Amenities Grid */
        .cottage-amenities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.8rem;
        }

        .amenity-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 1.8rem;
          transition: all var(--transition-smooth);
        }

        .amenity-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-stone);
        }

        .amenity-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-sm);
          background-color: var(--color-sage-bg);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
        }

        .amenity-card h4 {
          font-size: 1.25rem;
          margin-bottom: 0.6rem;
          color: var(--color-primary);
        }

        .amenity-card p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .editorial-grid {
            grid-template-columns: 1fr;
          }
          .editorial-media {
            min-height: 360px;
          }
          .cottage-amenities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .editorial-content {
            padding: 1.8rem 1.4rem;
          }
          .editorial-heading {
            font-size: 1.8rem;
          }
          .cottage-amenities-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
