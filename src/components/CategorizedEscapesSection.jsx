import React, { useState } from 'react';
import { Waves, Mountain, Compass, ArrowRight, MapPin, Clock, ExternalLink } from 'lucide-react';
import { tracker } from '../services/analytics';

const categories = [
  { id: 'walks', name: 'STEP OUTSIDE & EXPLORE', icon: Mountain },
  { id: 'local', name: 'MORE THAN A PLACE TO STAY', icon: Compass },
  { id: 'daytrips', name: 'MAKE A DAY OF IT', icon: Waves }
];

const escapesData = {
  walks: [
    {
      id: 1,
      tag: 'ON YOUR DOORSTEP',
      title: 'Lumsdale Valley & Waterfalls',
      desc: 'Explore Lumsdale Valley, known for its woodland scenery, historic mill ruins and beautiful waterfalls right outside your front gate.',
      distance: '300 metres',
      time: '3 min walk',
      image: '/web/sc_1786456264_1205377_30.webp',
      mapsUrl: 'https://maps.google.com/?q=Lumsdale+Valley+Matlock'
    },
    {
      id: 2,
      tag: 'LOCAL LANDMARK',
      title: 'High Tor & Footpaths',
      desc: 'Follow the surrounding footpaths up to High Tor, offering dramatic limestone cliffs and panoramic views over Derbyshire.',
      distance: '1.5 miles',
      time: '5 min drive',
      image: '/web/sc_1786456238_1205377_26.webp',
      mapsUrl: 'https://maps.google.com/?q=High+Tor+Matlock'
    },
    {
      id: 3,
      tag: 'HISTORIC LANDMARK',
      title: 'Riber Castle & Country Trails',
      desc: 'Set off along countryside bridleways towards the iconic 19th-century Riber Castle overlooking Matlock and the valley.',
      distance: '1.8 miles',
      time: '6 min drive',
      image: '/web/sc_1785924000_1205377_1.webp',
      mapsUrl: 'https://maps.google.com/?q=Riber+Castle+Matlock'
    },
    {
      id: 4,
      tag: 'CYCLING & BRIDLEWAYS',
      title: 'Derbyshire Countryside Cycling',
      desc: 'Cyclists can enjoy scenic routes through the surrounding Derbyshire countryside and into the wider Peak District trail network.',
      distance: 'On Doorstep',
      time: 'Immediate access',
      image: '/web/sc_1785924117_1205377_22.webp',
      mapsUrl: 'https://maps.google.com/?q=Matlock+Derbyshire+Cycling+Routes'
    }
  ],
  local: [
    {
      id: 5,
      tag: 'LOCAL TOWN',
      title: 'Matlock Town & Hall Leys Park',
      desc: 'Explore independent shops, cafés, pubs and restaurants, or take a relaxing walk through Hall Leys Park.',
      distance: '1.2 miles',
      time: '4 min drive',
      image: '/web/sc_1785924008_1205377_2.webp',
      mapsUrl: 'https://maps.google.com/?q=Matlock+Town+Centre'
    },
    {
      id: 6,
      tag: 'RIVERSIDE DESTINATION',
      title: 'Matlock Bath',
      desc: 'Enjoy the riverside atmosphere, traditional attractions and independent eateries of this distinctive Derbyshire destination.',
      distance: '2.5 miles',
      time: '8 min drive',
      image: '/web/sc_1786348558_1205377_23.webp',
      mapsUrl: 'https://maps.google.com/?q=Matlock+Bath+Derbyshire'
    },
    {
      id: 7,
      tag: 'CABLE CAR & CAVERNS',
      title: 'Heights of Abraham',
      desc: 'Take the famous cable car into the hills and enjoy spectacular Peak District views, woodland walks and cavern experiences.',
      distance: '2.8 miles',
      time: '8 min drive',
      image: '/web/sc_1785924110_1205377_21.webp',
      mapsUrl: 'https://maps.google.com/?q=Heights+of+Abraham+Matlock+Bath'
    },
    {
      id: 8,
      tag: 'FAMILY ADVENTURE',
      title: 'Gulliver\'s Kingdom & Farm Park',
      desc: 'A fun family day out with rides for younger visitors at Gulliver\'s Kingdom, or meet the animals at Matlock Farm Park.',
      distance: '3.0 miles',
      time: '9 min drive',
      image: '/web/sc_1785924014_1205377_3.webp',
      mapsUrl: 'https://maps.google.com/?q=Gullivers+Kingdom+Matlock+Bath'
    }
  ],
  daytrips: [
    {
      id: 9,
      tag: 'HISTORIC MARKET TOWN',
      title: 'Bakewell',
      desc: 'Head to Bakewell for its historic streets, traditional buildings, independent courtyard shops, and famous local character.',
      distance: '8 miles',
      time: '18 min drive',
      image: '/web/sc_1785924031_1205377_6.webp',
      mapsUrl: 'https://maps.google.com/?q=Bakewell+Derbyshire'
    },
    {
      id: 10,
      tag: 'STATELY ESTATE',
      title: 'Chatsworth House',
      desc: 'Visit Chatsworth House and spend the day exploring its magnificent stately estate, grand gardens and surrounding countryside.',
      distance: '9.5 miles',
      time: '20 min drive',
      image: '/web/sc_1786456245_1205377_27.webp',
      mapsUrl: 'https://maps.google.com/?q=Chatsworth+House+Bakewell'
    },
    {
      id: 11,
      tag: 'UNESCO WORLD HERITAGE',
      title: 'Cromford Mill',
      desc: 'Discover Cromford Mill and the fascinating industrial heritage of the Derwent Valley Mills UNESCO World Heritage Site.',
      distance: '3.2 miles',
      time: '9 min drive',
      image: '/web/sc_1785924104_1205377_20.webp',
      mapsUrl: 'https://maps.google.com/?q=Cromford+Mills+Matlock'
    },
    {
      id: 12,
      tag: 'PEAK CAVERNS & CASTLE',
      title: 'Castleton',
      desc: 'Venture to Castleton, surrounded by spectacular Peak District scenery and home to Peak Cavern, Speedwell Cavern and Peveril Castle.',
      distance: '21 miles',
      time: '35 min drive',
      image: '/web/sc_1786456264_1205377_30.webp',
      mapsUrl: 'https://maps.google.com/?q=Castleton+Hope+Valley'
    }
  ]
};

export default function CategorizedEscapesSection({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('walks');

  const currentItems = escapesData[activeTab] || escapesData.walks;

  return (
    <section id="escapes" className="escapes-section section-padding">
      <div className="container-wide">
        
        {/* Section Header */}
        <div className="escapes-header">
          <div className="header-text-group">
            <span className="eyebrow">STEP OUTSIDE AND START EXPLORING</span>
            <h2 className="escapes-title font-serif">The Peak District is Waiting</h2>
            <p className="escapes-subtitle">
              You don't have to travel far to find beautiful countryside. From the cottage, you're ideally placed to explore Lumsdale Valley, local landmarks, and the best of Derbyshire.
            </p>
          </div>

          {/* Category Tabs with Emarat Icons & Pill Style */}
          <div className="category-tabs-row">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                    tracker.track('escapes_category_tab', { category: cat.name });
                  }}
                  className={`emarat-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Card Grid (Emarat Style) */}
        <div className="escapes-cards-grid">
          {currentItems.map(item => (
            <div key={item.id} className="escape-card">
              <div className="escape-thumb-wrap">
                <img src={item.image} alt={item.title} className="escape-img" loading="lazy" />
                <span className="escape-location-tag font-serif">{item.tag}</span>
              </div>

              <div className="escape-card-body">
                <div className="escape-meta-badges">
                  <span className="badge-item">
                    <MapPin size={12} /> {item.distance}
                  </span>
                  <span className="badge-item">
                    <Clock size={12} /> {item.time}
                  </span>
                </div>

                <h3 className="escape-card-title font-serif">{item.title}</h3>
                <p className="escape-card-desc">{item.desc}</p>

                <div className="escape-card-footer">
                  <a 
                    href={item.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="escape-link"
                    onClick={() => tracker.track('click_google_maps', { destination: item.title })}
                  >
                    <span>EXPLORE MAP</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .escapes-section {
          background-color: var(--bg-cream);
          border-bottom: 1px solid var(--color-sand);
        }

        .escapes-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .header-text-group {
          max-width: 620px;
        }

        .escapes-title {
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          color: var(--color-forest);
          line-height: 1.15;
          margin-bottom: 0.6rem;
        }

        .escapes-subtitle {
          font-size: 0.98rem;
          color: var(--color-text-muted);
        }

        .category-tabs-row {
          display: flex;
          gap: 0.6rem;
          background: rgba(20, 66, 49, 0.08);
          padding: 0.4rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-sand);
          flex-wrap: wrap;
        }

        .emarat-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.3rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-forest);
          transition: all var(--transition-fast);
        }

        .emarat-tab-btn:hover {
          color: var(--color-forest-dark);
        }

        .emarat-tab-btn.active {
          background-color: var(--color-forest);
          color: #FFFFFF;
          box-shadow: 0 4px 14px rgba(20, 66, 49, 0.25);
        }

        /* 4 Column Cards (Emarat Style) */
        .escapes-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.8rem;
        }

        .escape-card {
          background-color: #FFFFFF;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--color-sand);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-smooth);
        }

        .escape-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-gold);
        }

        .escape-thumb-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .escape-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .escape-card:hover .escape-img {
          transform: scale(1.06);
        }

        .escape-location-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(20, 66, 49, 0.9);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(197, 162, 103, 0.3);
        }

        .escape-card-body {
          padding: 1.6rem 1.4rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .escape-meta-badges {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }

        .badge-item {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-gold-dark);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .escape-card-title {
          font-size: 1.35rem;
          color: var(--color-forest);
          margin-bottom: 0.6rem;
          line-height: 1.2;
        }

        .escape-card-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.55;
          margin-bottom: 1.4rem;
        }

        .escape-card-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(213, 202, 174, 0.4);
        }

        .escape-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--color-forest);
          text-transform: uppercase;
          transition: all var(--transition-fast);
        }

        .escape-link:hover {
          color: var(--color-gold-dark);
          gap: 0.65rem;
        }

        @media (max-width: 1200px) {
          .escapes-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .escapes-header {
            gap: 1.2rem;
            margin-bottom: 2rem;
          }
          .escapes-title {
            font-size: 1.85rem;
          }
          .category-tabs-row {
            width: 100%;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 0.3rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            justify-content: flex-start;
          }
          .category-tabs-row::-webkit-scrollbar {
            display: none;
          }
          .emarat-tab-btn {
            white-space: nowrap;
            padding: 0.5rem 0.95rem;
            font-size: 0.74rem;
            flex-shrink: 0;
          }
          .escapes-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.4rem;
          }
          .escape-thumb-wrap {
            height: 190px;
          }
          .escape-card-body {
            padding: 1.2rem 1.1rem;
          }
        }
      `}</style>
    </section>
  );
}
