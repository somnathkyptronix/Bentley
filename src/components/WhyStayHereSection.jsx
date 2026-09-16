import React from 'react';
import { Mountain, Dog, Flame, Clock, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { tracker } from '../services/analytics';

const reasons = [
  {
    id: 'peak-district',
    icon: Mountain,
    title: 'Peak District on Your Doorstep',
    tag: 'Location & Trails',
    image: '/web/sc_1786456264_1205377_30.webp',
    description: 'Tucked away in the quiet conservation sanctuary of Upper Lumsdale, yet moments from world-class National Park trails, Mam Tor, Chatsworth, and Curbar Edge.',
    perks: ['Direct footpaths leading into Lumsdale Valley gorge', '4 mins to Matlock & Crown Square', '18 mins to Chatsworth House & Bakewell'],
    ctaText: 'Explore Local Trails',
    action: 'explore'
  },
  {
    id: 'dog-friendly',
    icon: Dog,
    title: 'Genuinely Dog-Friendly Stay',
    tag: 'Paws Welcome',
    image: '/web/sc_1785924008_1205377_2.webp',
    description: 'We believe family holidays mean bringing your four-legged best friends. Enclosed stone garden, warm paw wash, hound bed, and complimentary artisan dog treats.',
    perks: ['Fully enclosed safe limestone walled garden', 'Dog bowls, drying towels & organic treats provided', 'Endless woodland & waterfall trails straight from door'],
    ctaText: 'Dog-Friendly Perks',
    action: 'book'
  },
  {
    id: 'cosy-fire',
    icon: Flame,
    title: 'Cosy Evenings by the Fire',
    tag: 'Fireside Atmosphere',
    image: '/web/sc_1785924019_1205377_4.webp',
    description: 'After a crisp day traversing the dales, return to light the cast-iron wood stove. We provide complimentary kiln-dried hardwood logs, wool blankets, and board games.',
    perks: ['Complimentary crate of seasoned Derbyshire logs & kindling', 'Deep pocket-sprung sofa & ambient lamplight', 'Selection of local history books, maps & games'],
    ctaText: 'View Cottage Comforts',
    action: 'cottage'
  },
  {
    id: 'weekend-escapes',
    icon: Clock,
    title: 'Perfect for Weekend Escapes',
    tag: 'Effortless Getaway',
    image: '/web/sc_1785924000_1205377_1.webp',
    description: 'Under 2.5 hours from London, Birmingham, and Manchester with straightforward road links. Easy keyless self check-in, dedicated private parking, and early arrival options.',
    perks: ['Seamless 24/7 keyless keypad entry', 'Dedicated private parking bay beside the cottage', 'Late Sunday checkout available on weekend packages'],
    ctaText: 'View Weekend Breaks',
    action: 'offers'
  },
  {
    id: 'matlock-derbyshire',
    icon: Compass,
    title: 'Explore Matlock & Derbyshire',
    tag: 'Spa Towns & Culture',
    image: '/web/sc_1786348558_1205377_23.webp',
    description: 'The ideal launchpad for the very best of Derbyshire: ride the Heights of Abraham cable cars, sample traditional Bakewell pudding, and discover artisan riverside cafes.',
    perks: ['Historic Victorian spa town heritage of Matlock Bath', 'Renowned gastropubs and farm-to-table dining nearby', 'Famous Monsal Trail for leisurely cycling and walking'],
    ctaText: 'See 48h Matlock Guide',
    action: 'itinerary'
  }
];

export default function WhyStayHereSection({ onOpenBooking, onNavigate }) {
  const handleCardAction = (reason) => {
    tracker.track('click_why_stay_card', { card_title: reason.title, action: reason.action });
    if (reason.action === 'book') {
      onOpenBooking();
    } else {
      onNavigate(reason.action);
    }
  };

  return (
    <section id="why-stay" className="why-stay-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">Why Guests Choose Us</span>
          <h2 className="section-title">The Quintessential Countryside Escape</h2>
          <p className="section-lead">
            Here at 2 Bentley Bridge Cottages, we have thought of every detail so you can disconnect, 
            breathe the fresh hill air, and make memories with loved ones and your dog.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="why-grid">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={reason.id} className={`why-card ${index === 0 ? 'featured-wide' : ''}`}>
                <div className="why-card-media">
                  <img src={reason.image} alt={reason.title} className="why-card-img" loading="lazy" />
                  <div className="why-card-tag font-serif">{reason.tag}</div>
                </div>

                <div className="why-card-body">
                  <div className="why-icon-badge">
                    <Icon size={22} />
                  </div>
                  <h3 className="why-card-title">{reason.title}</h3>
                  <p className="why-card-desc">{reason.description}</p>

                  <ul className="why-perks-list">
                    {reason.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="why-perk-item">
                        <CheckCircle2 size={15} className="why-check" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleCardAction(reason)}
                    className="why-action-btn"
                  >
                    <span>{reason.ctaText}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .why-stay-section {
          background-color: var(--bg-cream);
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .why-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-smooth);
        }

        .why-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-stone);
        }

        .why-card.featured-wide {
          grid-column: span 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .why-card-media {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .why-card.featured-wide .why-card-media {
          height: 100%;
          min-height: 280px;
        }

        .why-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .why-card:hover .why-card-img {
          transform: scale(1.05);
        }

        .why-card-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(47, 69, 83, 0.88);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-style: italic;
          padding: 0.25rem 0.8rem;
          border-radius: var(--radius-full);
        }

        .why-card-body {
          padding: 2.2rem 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .why-icon-badge {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-sm);
          background-color: var(--color-sage-bg);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
        }

        .why-card-title {
          font-size: 1.45rem;
          color: var(--color-primary);
          margin-bottom: 0.8rem;
          line-height: 1.25;
        }

        .why-card-desc {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin-bottom: 1.4rem;
        }

        .why-perks-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-bottom: 1.8rem;
        }

        .why-perk-item {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-size: 0.85rem;
          color: var(--color-text-body);
        }

        .why-check {
          color: var(--color-sage);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .why-action-btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-primary);
          padding: 0.5rem 0;
          border-bottom: 2px solid transparent;
          transition: all var(--transition-fast);
        }

        .why-action-btn:hover {
          color: var(--color-primary-dark);
          border-bottom-color: var(--color-primary);
          gap: 0.75rem;
        }

        @media (max-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .why-card.featured-wide {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .why-grid {
            grid-template-columns: 1fr;
          }
          .why-card.featured-wide {
            grid-column: span 1;
            display: flex;
            flex-direction: column;
          }
          .why-card.featured-wide .why-card-media {
            height: 220px;
          }
        }
      `}</style>
    </section>
  );
}
