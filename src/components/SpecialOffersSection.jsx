import React, { useState, useEffect } from 'react';
import { Tag, Calendar, Sparkles, Copy, Check, ArrowRight, Share2, Flame, Gift, Clock, Dog } from 'lucide-react';
import { tracker } from '../services/analytics';

export const offersData = [
  {
    id: 'offer-autumn',
    hash: 'offer-autumn',
    title: 'Autumn in the Peak District',
    tag: 'Seasonal Special',
    savingsBadge: '15% Off + Fireside Hamper',
    promoCode: 'AUTUMN15',
    validity: 'Stays through 30 Nov 2026',
    image: '/images/living_room.jpg',
    lead: 'Watch the valley foliage turn amber and gold from your cosy cottage hearth.',
    inclusions: [
      '15% direct booking savings on 3+ night stays',
      'Complimentary crate of kiln-dried Derbyshire birch logs',
      'Artisan local mulled cider & spiced shortbread welcome gift',
      'Peak District autumn trail guidebook'
    ]
  },
  {
    id: 'offer-weekend',
    hash: 'offer-weekend',
    title: 'The Long Weekend Escape',
    tag: 'Friday to Monday',
    savingsBadge: 'Includes Late 1pm Sunday Checkout',
    promoCode: 'WEEKENDESC',
    validity: 'Available all year round',
    image: '/images/hero_cottage.jpg',
    lead: 'Leave work behind on Friday and linger without rushing on Sunday.',
    inclusions: [
      '3 nights (Friday 3:00 PM to Monday 10:00 AM)',
      'Complimentary late Sunday 1:00 PM checkout included',
      'Chilled bottle of English sparkling wine on arrival',
      'Bakewell bakery treats & organic ground coffee'
    ]
  },
  {
    id: 'offer-midweek',
    hash: 'offer-midweek',
    title: 'Peaceful Midweek Sanctuary',
    tag: 'Monday to Friday',
    savingsBadge: '4 Nights for the Price of 3',
    promoCode: 'MIDWEEK4',
    validity: 'Mon-Fri stays',
    image: '/images/kitchen.jpg',
    lead: 'Enjoy the uncrowded hills, tranquil valley gorge, and remote work peace.',
    inclusions: [
      '4 full nights for the price of 3 (Mon-Fri)',
      'High-speed Wi-Fi & quiet cottage work nooks',
      'Farmhouse breakfast welcome pack with fresh eggs',
      'Maximum valley seclusion while the world works'
    ]
  },
  {
    id: 'offer-dogfriendly',
    hash: 'offer-dogfriendly',
    title: 'The Dog-Friendly Break',
    tag: 'Canine VIP',
    savingsBadge: 'Zero Dog Surcharge + VIP Hamper',
    promoCode: 'DOGFREE',
    validity: 'All seasons',
    image: '/images/garden_patio.jpg',
    lead: 'Because the best walks in life are taken with four paws by your side.',
    inclusions: [
      'Waived pet fee for up to 2 well-behaved dogs',
      'Complimentary Canine Welcome Hamper (natural treats & ball)',
      'Use of warm-water outdoor paw wash & dog towels',
      'Enclosed limestone-walled private garden for safe sniffing'
    ]
  },
  {
    id: 'offer-lastminute',
    hash: 'offer-lastminute',
    title: 'Last-Minute Valley Getaway',
    tag: 'Next 14 Days',
    savingsBadge: 'Instant 15% Off Available Dates',
    promoCode: 'LAST15',
    validity: 'Valid within 14 days of arrival',
    image: '/images/bedroom_master.jpg',
    lead: 'Spontaneous escapes are often the most memorable.',
    inclusions: [
      '15% instant reduction on unreserved dates',
      'Full Derbyshire Welcome Hamper included',
      'Instant digital keycode check-in',
      'Subject to calendar gaps'
    ]
  },
  {
    id: 'offer-winter',
    hash: 'offer-winter',
    title: 'Winter Cottage Fireside Escape',
    tag: 'Dec – Feb Warmth',
    savingsBadge: 'Unlimited Logs & Festive Treats',
    promoCode: 'WINTER26',
    validity: '1 Dec 2026 – 28 Feb 2027',
    image: '/images/living_room.jpg',
    lead: 'Frosty morning rambles followed by roaring fires, wool blankets and hot cocoa.',
    inclusions: [
      'Unlimited kiln-dried hardwood firewood during your stay',
      'Artisan hot chocolate melts & Derbyshire Christmas fruit cake',
      'Cosy fleece blankets & festive cottage ambient lighting',
      'Board games & classic holiday films on 4K Smart TV'
    ]
  }
];

export default function SpecialOffersSection({ onClaimOffer }) {
  const [copiedHash, setCopiedHash] = useState(null);
  const [highlightedOfferId, setHighlightedOfferId] = useState(null);

  // Check URL hash on load for campaigns e.g. #offer-autumn
  useEffect(() => {
    const handleHashCheck = () => {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash && currentHash.startsWith('offer-')) {
        setHighlightedOfferId(currentHash);
        const match = offersData.find(o => o.hash === currentHash);
        if (match) {
          tracker.trackOfferView(match.title, match.promoCode);
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const copyShareableLink = (hash) => {
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    navigator.clipboard.writeText(url);
    setCopiedHash(hash);
    tracker.track('share_offer_link_copied', { hash });
    setTimeout(() => setCopiedHash(null), 3000);
  };

  const handleClaim = (offer) => {
    tracker.track('claim_offer_click', {
      offer_title: offer.title,
      promo_code: offer.promoCode
    });
    onClaimOffer(offer);
  };

  return (
    <section id="offers" className="offers-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">Direct Booking Exclusives</span>
          <h2 className="section-title">Special Offers &amp; Packages</h2>
          <p className="section-lead">
            Curated seasonal escapes with dedicated savings and thoughtful cottage extras. 
            All offers are exclusive to direct enquiries and include our Best Rate Guarantee.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="offers-grid">
          {offersData.map(offer => {
            const isHighlighted = highlightedOfferId === offer.hash;
            return (
              <div 
                key={offer.id} 
                id={offer.hash}
                className={`offer-card ${isHighlighted ? 'highlighted' : ''}`}
              >
                <div className="offer-media">
                  <img src={offer.image} alt={offer.title} className="offer-img" loading="lazy" />
                  <div className="offer-badges-top">
                    <span className="offer-tag font-serif">{offer.tag}</span>
                    <span className="offer-savings">{offer.savingsBadge}</span>
                  </div>
                </div>

                <div className="offer-body">
                  <div className="offer-promo-pill">
                    <Tag size={13} />
                    <span>Promo Code: <strong>{offer.promoCode}</strong></span>
                  </div>

                  <h3 className="offer-title font-serif">{offer.title}</h3>
                  <p className="offer-lead font-serif">"{offer.lead}"</p>

                  <div className="offer-inclusions">
                    <span className="inclusions-label">Package Inclusions:</span>
                    <ul className="inclusions-list">
                      {offer.inclusions.map((inc, iIdx) => (
                        <li key={iIdx} className="inclusion-item">
                          <Check size={14} className="inc-check" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="offer-validity">
                    <Clock size={14} />
                    <span>{offer.validity}</span>
                  </div>

                  {/* Actions Row */}
                  <div className="offer-actions">
                    <button 
                      onClick={() => handleClaim(offer)}
                      className="btn-primary offer-claim-btn"
                    >
                      <Calendar size={15} />
                      <span>Check Dates &amp; Book</span>
                    </button>

                    <button 
                      onClick={() => copyShareableLink(offer.hash)}
                      className="offer-share-btn"
                      title="Copy direct landing page link for ads/social"
                      aria-label="Share offer URL"
                    >
                      {copiedHash === offer.hash ? (
                        <span className="copied-tag"><Check size={14} /> Copied</span>
                      ) : (
                        <Share2 size={16} />
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .offers-section {
          background-color: var(--bg-cream);
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .offer-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-smooth);
        }

        .offer-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-stone);
        }

        .offer-card.highlighted {
          border: 2px solid var(--color-primary);
          box-shadow: 0 0 0 4px rgba(47, 69, 83, 0.15);
        }

        .offer-media {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .offer-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .offer-card:hover .offer-img {
          transform: scale(1.05);
        }

        .offer-badges-top {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .offer-tag {
          background: rgba(47, 69, 83, 0.9);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-style: italic;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .offer-savings {
          background: #C29A38;
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .offer-body {
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .offer-promo-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background-color: var(--color-sage-bg);
          color: var(--color-olive);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          width: fit-content;
        }

        .offer-title {
          font-size: 1.55rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .offer-lead {
          font-size: 0.95rem;
          font-style: italic;
          color: var(--color-text-body);
          margin-bottom: 1.2rem;
          line-height: 1.45;
        }

        .offer-inclusions {
          background-color: var(--bg-cream);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-sm);
          padding: 1rem;
          margin-bottom: 1.2rem;
        }

        .inclusions-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .inclusions-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .inclusion-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.84rem;
          color: var(--color-text-body);
        }

        .inc-check {
          color: var(--color-sage);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .offer-validity {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-bottom: 1.4rem;
        }

        .offer-actions {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .offer-claim-btn {
          flex: 1;
          padding: 0.75rem;
          font-size: 0.88rem;
        }

        .offer-share-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-sand);
          background-color: var(--bg-cream);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .offer-share-btn:hover {
          background-color: #FFFFFF;
          border-color: var(--color-stone);
        }

        .copied-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-sage);
        }

        @media (max-width: 1080px) {
          .offers-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 720px) {
          .offers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
