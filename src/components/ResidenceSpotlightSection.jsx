import React, { useState, useEffect, useRef } from 'react';
import { Bed, Flame, Bath, Sun, Calendar, ArrowRight, Check, Heart, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { tracker } from '../services/analytics';

const spaces = [
  {
    id: 'living',
    num: '01',
    tabName: 'Sitting Room',
    title: 'Cosy Evenings, Happy Memories',
    sub: 'SITTING ROOM &bull; WOODBURNING STOVE &bull; SMART TV',
    lead: 'Come together after a day outdoors.',
    desc: 'There\'s something special about returning to a cosy cottage after exploring the countryside. Gather in the sitting room, get comfortable and enjoy the warmth of the woodburning stove. Put on a film, catch up over a drink or simply enjoy being together without having anywhere else to be. Because sometimes the best part of a holiday is doing absolutely nothing.',
    image: '/web/sc_1785924019_1205377_4.webp',
    specs: [
      { label: 'HEARTH', value: 'Woodburning Stove' },
      { label: 'MEDIA', value: 'Smart TV & Streaming' },
      { label: 'ATMOSPHERE', value: 'Original Stone Walls' },
      { label: 'COMFORT', value: 'Cosy Deep Sofas' }
    ]
  },
  {
    id: 'double-bed',
    num: '02',
    tabName: 'Double Bedroom',
    title: 'Sleep Well. Wake Refreshed.',
    sub: 'DOUBLE BEDROOM &bull; SMART TV &bull; COUPLES ESCAPE',
    lead: 'Two bedrooms for a comfortable night\'s rest.',
    desc: 'After a day discovering Derbyshire, you\'ll want somewhere peaceful to recharge. A comfortable double bedroom for couples looking for a relaxing night\'s sleep. Both bedrooms feature Smart TVs, so you can wind down with your favourite shows before bed.',
    image: '/web/sc_1785924057_1205377_11.webp',
    specs: [
      { label: 'BED', value: 'Comfortable Double' },
      { label: 'MEDIA', value: 'Dedicated Smart TV' },
      { label: 'COMFORT', value: 'Bed Linen & Towels' },
      { label: 'HEATING', value: 'Central Heating' }
    ]
  },
  {
    id: 'twin-bed',
    num: '03',
    tabName: 'Twin Bedroom',
    title: 'Sleep Well. Wake Refreshed.',
    sub: 'TWIN BEDROOM &bull; SMART TV &bull; FAMILY & FRIENDS',
    lead: 'Ideal for children, friends or family travelling together.',
    desc: 'A twin bedroom offering complete comfort for children, walking companions, or friends. Features its own Smart TV so everyone can unwind with their favourite entertainment at the end of an adventurous day.',
    image: '/web/sc_1785924072_1205377_14.webp',
    specs: [
      { label: 'BEDS', value: 'Two Single Beds' },
      { label: 'MEDIA', value: 'Dedicated Smart TV' },
      { label: 'FAMILY', value: 'Travel Cot & Highchair' },
      { label: 'SAFETY', value: 'Stairgate Provided' }
    ]
  },
  {
    id: 'kitchen',
    num: '04',
    tabName: 'Kitchen/Diner',
    title: 'Start the Day Your Way',
    sub: 'KITCHEN/DINER &bull; FULLY EQUIPPED &bull; FREEDOM & EASE',
    lead: 'Breakfast, brunch or a relaxed evening meal.',
    desc: 'The kitchen/diner gives you the freedom to enjoy your holiday at your own pace. Make breakfast before heading out for a morning walk. Prepare a packed lunch for your Peak District adventure. Or come home, cook together and enjoy a relaxed meal around the table. Fully equipped with an electric oven, gas hob, microwave, fridge/freezer, dishwasher, washing machine, kettle and toaster.',
    image: '/web/sc_1785924051_1205377_10.webp',
    specs: [
      { label: 'COOKING', value: 'Electric Oven & Gas Hob' },
      { label: 'APPLIANCES', value: 'Microwave, Kettle, Toaster' },
      { label: 'CLEANING', value: 'Dishwasher & Washer' },
      { label: 'COOLING', value: 'Fridge / Freezer' }
    ]
  },
  {
    id: 'garden',
    num: '05',
    tabName: 'Patio Garden',
    title: 'A Little Space Outdoors',
    sub: 'PRIVATE PATIO &bull; OUTDOOR FURNITURE &bull; FRESH AIR',
    lead: 'Morning coffee. Evening sunsets. Fresh Derbyshire air.',
    desc: 'Step outside and enjoy your private patio garden. It\'s a lovely place to start the morning slowly with a cup of coffee or sit back after a day exploring the countryside. Outdoor furniture means you can make the most of the garden whenever the weather allows. Please take care when accessing the garden, as there are steps leading down to it.',
    image: '/web/sc_1786456245_1205377_27.webp',
    specs: [
      { label: 'SETTING', value: 'Private Patio Garden' },
      { label: 'DINING', value: 'Outdoor Furniture Set' },
      { label: 'CAUTION', value: 'Steps Lead Down to Garden' },
      { label: 'ATMOSPHERE', value: 'Valley Fresh Air' }
    ]
  },
  {
    id: 'pet',
    num: '06',
    tabName: 'Pet Friendly',
    title: 'Bring Your Four-Legged Friend',
    sub: '1 WELL-BEHAVED PET WELCOME &bull; WALKS NEARBY',
    lead: 'Adventures are better together.',
    desc: 'Don\'t leave your best friend behind. One well-behaved pet is welcome, giving you the opportunity to enjoy Derbyshire\'s beautiful countryside together. With walking routes and scenic landscapes nearby, there\'s plenty for both two-legged and four-legged guests to discover.',
    image: '/web/sc_1785924008_1205377_2.webp',
    specs: [
      { label: 'PET WELCOME', value: '1 Well-Behaved Pet' },
      { label: 'WALKS', value: 'Woodland & Waterfall Paths' },
      { label: 'LOCAL PUBS', value: 'Dog-Friendly Pubs (0.6m)' },
      { label: 'PATIO', value: 'Enclosed Garden Space' }
    ]
  }
];

export default function ResidenceSpotlightSection({ onOpenBooking }) {
  const [activeSpaceId, setActiveSpaceId] = useState('living');
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tabsBarRef = useRef(null);
  const tabRefs = useRef({});
  const pauseTimeoutRef = useRef(null);
  const touchStartX = useRef(0);

  const activeSpace = spaces.find(s => s.id === activeSpaceId) || spaces[0];
  const currentIndex = spaces.findIndex(s => s.id === activeSpaceId);

  // Detect mobile viewport (<= 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pause auto-slide upon user interaction
  const handleUserInteraction = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 7000);
  };

  // Auto-slide ONLY for mobile responsive (cycles through all 6 options automatically)
  useEffect(() => {
    if (!isMobile || isPaused) return;

    const interval = setInterval(() => {
      setActiveSpaceId(prevId => {
        const idx = spaces.findIndex(s => s.id === prevId);
        const nextIdx = (idx + 1) % spaces.length;
        return spaces[nextIdx].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, isPaused]);

  // Auto-scroll the mobile tabs bar so the active tab is always centered into view
  useEffect(() => {
    if (isMobile && tabRefs.current[activeSpaceId] && tabsBarRef.current) {
      const tabEl = tabRefs.current[activeSpaceId];
      const container = tabsBarRef.current;
      const containerWidth = container.offsetWidth;
      const tabLeft = tabEl.offsetLeft;
      const tabWidth = tabEl.offsetWidth;
      const targetScroll = tabLeft - (containerWidth / 2) + (tabWidth / 2);

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [activeSpaceId, isMobile]);

  const handleNextSpace = () => {
    handleUserInteraction();
    setActiveSpaceId(prevId => {
      const idx = spaces.findIndex(s => s.id === prevId);
      return spaces[(idx + 1) % spaces.length].id;
    });
  };

  const handlePrevSpace = () => {
    handleUserInteraction();
    setActiveSpaceId(prevId => {
      const idx = spaces.findIndex(s => s.id === prevId);
      return spaces[(idx - 1 + spaces.length) % spaces.length].id;
    });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    handleUserInteraction();
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextSpace();
      } else {
        handlePrevSpace();
      }
    }
  };

  return (
    <section id="spaces" className="residence-spotlight-section section-padding">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="spotlight-header">
          <span className="eyebrow">ROOMS &amp; LIVING SPACES</span>
          <h2 className="spotlight-title font-serif">Crafted for Memorable Escapes.</h2>
          <p className="spotlight-subtitle">
            Characterful rooms, cosy evenings by the fire, and comfortable spaces to feel right at home.
          </p>
        </div>

        {/* Side-by-Side Split Showcase (Emarat Style) */}
        <div 
          className="spotlight-split-card"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* Left Column: Room Photo */}
          <div className="spotlight-media-col">
            <div className="spotlight-img-frame">
              <img 
                src={activeSpace.image} 
                alt={activeSpace.title} 
                className="spotlight-img"
                key={activeSpace.id}
              />
              <span className="spotlight-float-tag font-serif">
                {activeSpace.num} &bull; {activeSpace.tabName}
              </span>

              {/* Mobile Slide Arrows */}
              {isMobile && (
                <div className="spotlight-mobile-arrows">
                  <button 
                    className="spotlight-arrow-btn prev"
                    onClick={(e) => { e.stopPropagation(); handlePrevSpace(); }}
                    aria-label="Previous room"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    className="spotlight-arrow-btn next"
                    onClick={(e) => { e.stopPropagation(); handleNextSpace(); }}
                    aria-label="Next room"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
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

        {/* Mobile Slide Progress & Dots */}
        {isMobile && (
          <div className="spotlight-mobile-dots-bar">
            <div className="spotlight-dots-track">
              {spaces.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => {
                    handleUserInteraction();
                    setActiveSpaceId(sp.id);
                  }}
                  className={`spotlight-dot ${activeSpaceId === sp.id ? 'active' : ''}`}
                  aria-label={`Switch to ${sp.tabName}`}
                />
              ))}
            </div>
            <span className="spotlight-mobile-counter font-serif">
              {spaces[currentIndex].num} / 06 &bull; {spaces[currentIndex].tabName}
            </span>
          </div>
        )}

        {/* Horizontal Room Switcher Tabs at Bottom (Emarat Style) */}
        <div 
          className="spotlight-tabs-bar"
          ref={tabsBarRef}
          onTouchStart={handleUserInteraction}
        >
          {spaces.map(sp => (
            <button
              key={sp.id}
              ref={el => { tabRefs.current[sp.id] = el; }}
              onClick={() => {
                handleUserInteraction();
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
          grid-template-columns: repeat(6, 1fr);
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .spotlight-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 1.1rem 0.75rem;
          border-right: 1px solid var(--color-sand);
          border-top: none;
          border-bottom: none;
          border-left: none;
          background: none;
          cursor: pointer;
          white-space: nowrap;
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
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-gold);
        }

        .tab-name {
          font-size: 0.85rem;
          font-weight: 600;
        }

        @media (max-width: 1200px) {
          .spotlight-tab {
            padding: 0.95rem 0.5rem;
            gap: 0.45rem;
          }
          .tab-num {
            font-size: 1.05rem;
          }
          .tab-name {
            font-size: 0.78rem;
          }
        }

        @media (max-width: 1024px) {
          .spotlight-split-card {
            grid-template-columns: 1fr;
          }
          .spotlight-media-col {
            min-height: 380px;
          }
        }

        @media (max-width: 960px) {
          .spotlight-tabs-bar {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .spotlight-tabs-bar::-webkit-scrollbar {
            display: none;
          }
          .spotlight-tab {
            flex-shrink: 0;
            white-space: nowrap;
            padding: 0.85rem 1.2rem;
            border-right: 1px solid var(--color-sand);
          }
        }

        @media (max-width: 640px) {
          .spotlight-media-col {
            min-height: 250px;
            height: 250px;
          }
          .spotlight-float-tag {
            bottom: 0.8rem;
            left: 0.8rem;
            font-size: 0.74rem;
            padding: 0.3rem 0.8rem;
          }
          .spotlight-content-col {
            padding: 1.5rem 1.15rem;
          }
          .spotlight-room-title {
            font-size: 1.8rem;
          }
          .spotlight-tabs-bar {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            border-radius: var(--radius-md);
          }
          .spotlight-tabs-bar::-webkit-scrollbar {
            display: none;
          }
          .spotlight-tab {
            flex-shrink: 0;
            white-space: nowrap;
            padding: 0.75rem 1.1rem;
            border-bottom: none;
            border-right: 1px solid var(--color-sand);
          }
          .specs-boxes-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.6rem;
          }
          .spec-box {
            padding: 0.75rem 0.85rem;
          }
          .spec-box-label {
            font-size: 0.62rem;
          }
          .spec-box-value {
            font-size: 0.82rem;
          }
          .spotlight-actions-row {
            flex-direction: column;
            width: 100%;
            gap: 0.6rem;
          }
          .spotlight-actions-row button {
            width: 100%;
            justify-content: center;
          }
        }
      /* Mobile Slide Navigation & Dots */
        .spotlight-mobile-arrows {
          display: none;
        }
        .spotlight-mobile-dots-bar {
          display: none;
        }

        @media (max-width: 768px) {
          .spotlight-mobile-arrows {
            display: flex;
            position: absolute;
            inset: 0;
            align-items: center;
            justify-content: space-between;
            padding: 0 0.75rem;
            pointer-events: none;
            z-index: 5;
          }
          .spotlight-arrow-btn {
            pointer-events: auto;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: rgba(14, 30, 24, 0.75);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(197, 162, 103, 0.4);
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all var(--transition-fast);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
          .spotlight-arrow-btn:active {
            transform: scale(0.92);
            background: var(--color-forest);
          }
          
          .spotlight-mobile-dots-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0.35rem 0.75rem 0.35rem;
            margin-bottom: 0.15rem;
          }
          .spotlight-dots-track {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .spotlight-dot {
            width: 8px;
            height: 8px;
            border-radius: var(--radius-full);
            background: var(--color-sand);
            border: none;
            padding: 0;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .spotlight-dot.active {
            width: 22px;
            background: var(--color-gold);
            border-radius: 4px;
          }
          .spotlight-mobile-counter {
            font-size: 0.78rem;
            color: var(--color-forest);
            font-weight: 600;
            letter-spacing: 0.04em;
          }

          .spotlight-tabs-bar {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            border-radius: var(--radius-md);
            scroll-behavior: smooth;
            box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          }
          .spotlight-tabs-bar::-webkit-scrollbar {
            display: none;
          }
          .spotlight-tab {
            flex-shrink: 0;
            white-space: nowrap;
            padding: 0.8rem 1.25rem;
            border-bottom: none;
            border-right: 1px solid var(--color-sand);
            transition: all 0.3s ease;
          }
          .spotlight-tab.active {
            background-color: var(--color-forest);
            color: #FFFFFF;
          }
          .spotlight-tab.active .tab-num {
            color: var(--color-gold);
          }
          .spotlight-img {
            animation: fadeIn 0.45s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0.65; transform: scale(1.02); }
            to { opacity: 1; transform: scale(1); }
          }
        }
      `}</style>
    </section>
  );
}
