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
    image: '/web/sc_1785924019_1205377_4.webp',
    lead: 'The heart of the cottage — where muddy boots come off and time slows down.',
    description: 'Sink into the deep leather sofa as dry Derbyshire logs crackle in the original stone fireplace with woodburning stove. Soft warm lighting illuminates the characterful exposed stone wall, while a steaming mug of tea waits on the table. Ideal for curling up with a book, enjoying family board games, or unwinding with a film on the Smart TV after exploring the valley.',
    highlights: [
      'Cast-iron woodburning stove with complimentary dry seasoned logs',
      'Plush deep-seated leather seating and cosy ambient lighting',
      'Smart TV with Netflix, BBC iPlayer & streaming entertainment',
      'Curated library of Peak District walking maps and board games',
      'One well-behaved pet warmly welcome with countryside walks nearby'
    ]
  },
  {
    id: 'kitchen',
    title: 'Country Kitchen & Dining',
    subtitle: 'Sage shaker kitchen & Belfast sink',
    image: '/web/sc_1785924051_1205377_10.webp',
    lead: 'Bespoke sage shaker cabinetry designed for leisurely country breakfasts and shared suppers.',
    description: 'Golden morning light filters through the cottage casement windows as you brew fresh cafetière coffee. Featuring bespoke sage green shaker cabinetry, solid wooden worktops, a classic deep Belfast ceramic sink, electric oven, gas hob, microwave, dishwasher, and washing machine. Fully equipped for cooking delicious meals together.',
    highlights: [
      'Bespoke sage green shaker units with classic Belfast ceramic sink',
      'Electric oven, gas hob, microwave, fridge/freezer & quiet dishwasher',
      'Washing machine, electric kettle and toaster for easy stays',
      'Dining table positioned beside the stone archway seating four guests',
      'Walking distance to Matlock town bakeries, butchers and markets'
    ]
  },
  {
    id: 'double-bed',
    title: 'Master Double Bedroom',
    subtitle: 'Crisp linens & peaceful valley rest',
    image: '/web/sc_1785924057_1205377_11.webp',
    lead: 'A peaceful sanctuary designed for deep, restorative sleep after active days in Derbyshire.',
    description: 'A sanctuary of deep, uninterrupted rest. Features a handcrafted solid wooden double bed dressed with fresh, comfortable bed linens and fluffy towels. Equipped with a dedicated Smart TV on the chest of drawers so you can wind down in comfort before sleep.',
    highlights: [
      'Solid handcrafted wooden double bed with comfortable mattress',
      'Dedicated bedroom Smart TV for cosy bedtime streaming',
      'Crisp bed linens and plush fresh towels provided for all guests',
      'Peaceful, quiet countryside setting in Upper Lumsdale',
      'Full wardrobe storage and bedside reading lamps'
    ]
  },
  {
    id: 'twin-bed',
    title: 'Charming Twin Bedroom',
    subtitle: 'Flexible comfort for family or friends',
    image: '/web/sc_1785924072_1205377_14.webp',
    lead: 'A light-filled haven styled with warm accents, ideal for children, friends or walking companions.',
    description: 'Equally welcoming for children, friends, or family travelling together. Two solid single beds dressed in soft cotton sheets with cheerful accent cushions. Includes a wall-mounted Smart TV so everyone can enjoy their own favourite entertainment.',
    highlights: [
      'Two comfortable full-size single beds with supportive mattresses',
      'Wall-mounted Smart TV with streaming capabilities',
      'Travel cot, highchair and stairgate available for young families',
      'Peaceful residential setting in Upper Lumsdale',
      'Bright natural daylight and bedside lighting'
    ]
  },
  {
    id: 'dining',
    title: 'Dining Area & Period Archway',
    subtitle: 'Exposed stone arch & shared meal times',
    image: '/web/sc_1785924031_1205377_6.webp',
    lead: 'Gather around the dining table beneath authentic exposed stone arches.',
    description: 'Framed by a striking exposed gritstone archway, the dining area connects the warmth of the living room with the shaker kitchen. A solid wooden dining table and comfortable chairs offer the ideal setting for leisurely Derbyshire breakfasts, holiday planning over maps, or relaxed evening meals.',
    highlights: [
      'Handcrafted wooden dining table with seating for four guests',
      'Striking original exposed gritstone archway connecting living & kitchen',
      'Abundant natural light flowing through cottage casement windows',
      'Perfect for board game tournaments and slow morning coffees',
      'Located adjacent to the fitted kitchen for effortless serving'
    ]
  },
  {
    id: 'garden',
    title: 'Private Garden & Patio',
    subtitle: 'Enclosed stone terrace & morning coffee',
    image: '/web/sc_1786456245_1205377_27.webp',
    lead: 'Your own private sun-trap facing the tranquil Derbyshire rolling hills.',
    description: 'Step outside and enjoy your private patio garden. It is a lovely place to start the morning slowly with a cup of coffee or sit back after a day exploring the countryside. Outdoor bistro furniture means you can make the most of the garden whenever the weather allows. Please note there are stone steps leading down to the patio.',
    highlights: [
      'Private enclosed rear patio with outdoor bistro table and chairs',
      'Picturesque stone steps with sturdy safety handrail',
      'Peaceful backdrop of drystone walls and green Derbyshire hills',
      'Sunny spot for morning coffees and evening drinks',
      'Enclosed outdoor area for your four-legged companion'
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
