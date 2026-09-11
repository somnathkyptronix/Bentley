import React, { useState } from 'react';
import { Waves, Mountain, Compass, ArrowRight, MapPin, Clock, ExternalLink } from 'lucide-react';
import { tracker } from '../services/analytics';

const categories = [
  { id: 'waterfalls', name: 'VALLEYS & WATERFALLS', icon: Waves },
  { id: 'trails', name: 'PEAK DISTRICT TRAILS', icon: Mountain },
  { id: 'towns', name: 'HISTORIC TOWNS & PUBS', icon: Compass }
];

const escapesData = {
  waterfalls: [
    {
      id: 1,
      tag: 'UPPER LUMSDALE',
      title: 'Lumsdale Valley & Waterfall Gorge',
      desc: 'Enchanting cascading waterfalls and moss-covered ruins of 18th-century stone watermills right outside your front gate.',
      distance: '300 metres',
      time: '3 min walk',
      image: '/images/lumsdale_valley.jpg',
      mapsUrl: 'https://maps.google.com/?q=Lumsdale+Valley+Matlock'
    },
    {
      id: 2,
      tag: 'DERWENT VALLEY',
      title: 'Cromford Mills & Historic Canal',
      desc: 'UNESCO World Heritage Site where industrial pioneer Sir Richard Arkwright birthed the water-powered factory system in 1771.',
      distance: '3.2 miles',
      time: '9 min drive',
      image: '/images/hero_cottage.jpg',
      mapsUrl: 'https://maps.google.com/?q=Cromford+Mills+Matlock'
    },
    {
      id: 3,
      tag: 'PEAK DISTRICT',
      title: 'Monsal Dale & Water Mill',
      desc: 'Dramatically sculpted valley where the River Wye winds under the famous stone railway viaduct.',
      distance: '11 miles',
      time: '24 min drive',
      image: '/images/peak_district.jpg',
      mapsUrl: 'https://maps.google.com/?q=Monsal+Dale+Bakewell'
    },
    {
      id: 4,
      tag: 'MATLOCK',
      title: 'Hall Leys Riverside Gardens',
      desc: 'Award-winning riverside public park with boating lake, sunken floral gardens, and riverside promenade.',
      distance: '1.2 miles',
      time: '4 min drive',
      image: '/images/garden_patio.jpg',
      mapsUrl: 'https://maps.google.com/?q=Hall+Leys+Park+Matlock'
    }
  ],
  trails: [
    {
      id: 5,
      tag: 'HIGH PEAKS',
      title: 'Mam Tor & The Great Ridge',
      desc: 'One of England’s most celebrated ridge walks with 360-degree panoramic views over the Hope Valley and Edale.',
      distance: '22 miles',
      time: '38 min drive',
      image: '/images/peak_district.jpg',
      mapsUrl: 'https://maps.google.com/?q=Mam+Tor+Peak+District'
    },
    {
      id: 6,
      tag: 'MONSAL TRAIL',
      title: 'Headstone Viaduct & Tunnels Trail',
      desc: 'Traffic-free 8.5-mile trail along the former Midland Railway through dramatic limestone tunnels. Perfect for walking and cycling.',
      distance: '10 miles',
      time: '22 min drive',
      image: '/images/peak_district.jpg',
      mapsUrl: 'https://maps.google.com/?q=Monsal+Trail+Bakewell'
    },
    {
      id: 7,
      tag: 'CURBAR EDGE',
      title: 'Curbar & Froggatt Gritstone Edges',
      desc: 'Dramatic gritstone escarpments overlooking heather moors and ancient silver birch woodlands.',
      distance: '12 miles',
      time: '25 min drive',
      image: '/images/peak_district.jpg',
      mapsUrl: 'https://maps.google.com/?q=Curbar+Edge+Derbyshire'
    },
    {
      id: 8,
      tag: 'LIMESTONE WAY',
      title: 'High Peak Trail & National Cycle Way',
      desc: 'Historic railway trackbed traversing the White Peak limestone plateau, suitable for dogs and family strollers.',
      distance: '6 miles',
      time: '14 min drive',
      image: '/images/garden_patio.jpg',
      mapsUrl: 'https://maps.google.com/?q=High+Peak+Trail+Derbyshire'
    }
  ],
  towns: [
    {
      id: 9,
      tag: 'MATLOCK',
      title: 'Matlock Town & Crown Square',
      desc: 'Vibrant historic spa market town filled with independent bakeries, vintage antiquaries, and riverside bistros.',
      distance: '1.2 miles',
      time: '4 min drive',
      image: '/images/hero_cottage.jpg',
      mapsUrl: 'https://maps.google.com/?q=Crown+Square+Matlock'
    },
    {
      id: 10,
      tag: 'MATLOCK BATH',
      title: 'Heights of Abraham & Cable Cars',
      desc: 'Alpine-style cable cars soaring over the limestone gorge to hilltop caverns, fossil exhibitions, and cliffside cafes.',
      distance: '2.5 miles',
      time: '8 min drive',
      image: '/images/lumsdale_valley.jpg',
      mapsUrl: 'https://maps.google.com/?q=Heights+of+Abraham+Matlock'
    },
    {
      id: 11,
      tag: 'BAKEWELL',
      title: 'Historic Bakewell & Market Town',
      desc: 'Famed riverside market town on the River Wye, home of original warm almond puddings and Monday livestock markets.',
      distance: '8 miles',
      time: '18 min drive',
      image: '/images/kitchen.jpg',
      mapsUrl: 'https://maps.google.com/?q=Bakewell+Derbyshire'
    },
    {
      id: 12,
      tag: 'CHATSWORTH',
      title: 'Chatsworth House & Parkland',
      desc: 'Celebrated stately home of the Duke of Devonshire with 105-acre gardens, deer park, and famous farm shop.',
      distance: '9.5 miles',
      time: '20 min drive',
      image: '/images/bedroom_master.jpg',
      mapsUrl: 'https://maps.google.com/?q=Chatsworth+House+Bakewell'
    }
  ]
};

export default function CategorizedEscapesSection({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('waterfalls');

  const currentItems = escapesData[activeTab] || escapesData.waterfalls;

  return (
    <section id="escapes" className="escapes-section section-padding">
      <div className="container-wide">
        
        {/* Emarat-style Header */}
        <div className="escapes-header">
          <div className="header-text-group">
            <span className="eyebrow">EXPLORE DERBYSHIRE</span>
            <h2 className="escapes-title font-serif">Curated Local Escapes &amp; Trails</h2>
            <p className="escapes-subtitle">
              From romantic waterfall gorges directly outside your gate to stately homes and country taverns.
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
          .escapes-cards-grid {
            grid-template-columns: 1fr;
          }
          .category-tabs-row {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
