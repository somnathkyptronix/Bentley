import React, { useState } from 'react';
import { 
  MapPin, Clock, ExternalLink, Navigation, Compass, Coffee, 
  Utensils, Mountain, Landmark, Sparkles, Calendar, ChevronRight 
} from 'lucide-react';
import { tracker } from '../services/analytics';

const attractions = [
  {
    id: 'lumsdale-valley',
    title: 'Lumsdale Valley & Waterfalls',
    category: 'Walking & Nature',
    distance: '300 metres',
    time: '3 min walk from door',
    image: '/web/sc_1786456264_1205377_30.webp',
    description: 'A deeply atmospheric wooded gorge featuring cascading waterfalls, mill ponds, and ruins of 18th-century stone watermills. A protected archaeological monument on your doorstep.',
    mapsUrl: 'https://maps.google.com/?q=Lumsdale+Valley+Matlock',
    tag: 'Must Visit'
  },
  {
    id: 'matlock-town',
    title: 'Matlock Town & Crown Square',
    category: 'Town & Shopping',
    distance: '1.2 miles',
    time: '4 min drive / 20 min walk',
    image: '/web/sc_1785924000_1205377_1.webp',
    description: 'Bustling historic market town with artisan independent bakeries, vintage boutiques, Hall Leys riverside park, and lively farmers markets.',
    mapsUrl: 'https://maps.google.com/?q=Crown+Square+Matlock+Derbyshire',
    tag: 'Local Town'
  },
  {
    id: 'matlock-bath',
    title: 'Matlock Bath & Heights of Abraham',
    category: 'Family & Heritage',
    distance: '2.5 miles',
    time: '8 min drive',
    image: '/web/sc_1786456238_1205377_26.webp',
    description: 'Famous Victorian spa resort known as "Little Switzerland". Ride cable cars over the limestone gorge to hilltop cavern tours, fossil gardens, and cliff-edge cafe terraces.',
    mapsUrl: 'https://maps.google.com/?q=Heights+of+Abraham+Matlock+Bath',
    tag: 'Attraction'
  },
  {
    id: 'bakewell',
    title: 'Bakewell & Famous Puddings',
    category: 'Dining & Heritage',
    distance: '8 miles',
    time: '18 min drive',
    image: '/web/sc_1785924036_1205377_7.webp',
    description: 'Picturesque riverside market town on the River Wye. Home to the original 1860 Old Original Bakewell Pudding Shop, courtyard cafes, and Monday livestock market.',
    mapsUrl: 'https://maps.google.com/?q=Bakewell+Derbyshire',
    tag: 'Foodie Favourite'
  },
  {
    id: 'chatsworth',
    title: 'Chatsworth House & Parkland',
    category: 'Historic Sights',
    distance: '9.5 miles',
    time: '20 min drive',
    image: '/web/sc_1785924117_1205377_22.webp',
    description: 'The celebrated stately home of the Duke and Duchess of Devonshire. Grand gilded state rooms, 105-acre gardens with gravity-fed cascade fountain, and world-renowned farm shop.',
    mapsUrl: 'https://maps.google.com/?q=Chatsworth+House+Bakewell',
    tag: 'Iconic Estate'
  },
  {
    id: 'packhorse-inn',
    title: 'The Packhorse Inn & Country Pubs',
    category: 'Country Pubs',
    distance: '3.5 miles',
    time: '9 min drive',
    image: '/web/sc_1785924019_1205377_4.webp',
    description: 'Traditional 15th-century gritstone country inn with roaring open fires, cask ales from Peak Ales brewery, and award-winning local Derbyshire venison and beef pies.',
    mapsUrl: 'https://maps.google.com/?q=Country+Pubs+Matlock+Derbyshire',
    tag: 'Cosy Pub'
  },
  {
    id: 'monsal-trail',
    title: 'Monsal Trail & Headstone Viaduct',
    category: 'Walking & Nature',
    distance: '10 miles',
    time: '22 min drive',
    image: '/web/sc_1786456245_1205377_27.webp',
    description: 'Traffic-free 8.5-mile trail along the former Midland Railway through dramatic limestone tunnels and soaring over the Monsal Dale viaduct. Bike hire available.',
    mapsUrl: 'https://maps.google.com/?q=Monsal+Trail+Bakewell',
    tag: 'Scenic Trail'
  },
  {
    id: 'cromford-mills',
    title: 'Cromford Mills & Arkwright Trail',
    category: 'Historic Sights',
    distance: '3.2 miles',
    time: '9 min drive',
    image: '/web/sc_1786348558_1205377_23.webp',
    description: 'UNESCO World Heritage Site where Sir Richard Arkwright birthed the modern factory system in 1771. Canal boat trips, artisan bookshops, and waterside coffee.',
    mapsUrl: 'https://maps.google.com/?q=Cromford+Mills+Matlock',
    tag: 'UNESCO Heritage'
  }
];

const itineraryDays = [
  {
    day: 'Friday Evening',
    title: 'Fireside Arrival & The Country Tavern',
    steps: [
      { time: '4:00 PM', text: 'Arrive at 2 Bentley Bridge Cottages via easy private parking. Unlock via your keyless code.' },
      { time: '5:30 PM', text: 'Unpack into Egyptian cotton bedrooms and brew fresh coffee with treats from your Derbyshire Welcome Hamper.' },
      { time: '7:30 PM', text: 'Stroll or short drive to a stone country pub for a pint of Peak Ales and slow-braised Derbyshire steak & ale pie beside the inglenook hearth.' },
      { time: '9:30 PM', text: 'Return to light the cottage wood stove, pour a glass of wine, and unwind in pure valley silence.' }
    ]
  },
  {
    day: 'Saturday',
    title: 'Waterfalls, Historic Bakewell & Chatsworth',
    steps: [
      { time: '8:30 AM', text: 'Leisurely breakfast on the sunny stone patio with birdsong and views of rolling mist.' },
      { time: '10:00 AM', text: 'Direct walk from the gate into Lumsdale Valley gorge to see the waterfalls and ancient ruined stone mills.' },
      { time: '1:00 PM', text: 'Drive to Bakewell (18 mins). Pick up authentic warm almond puddings and browse riverside antiquaries.' },
      { time: '3:00 PM', text: 'Explore Chatsworth House estate parkland and see the grazing deer herds against the dramatic hills.' },
      { time: '7:30 PM', text: 'Dinner at an intimate Matlock bistro or pick up fresh farm delicacies from Chatsworth Farm Shop to cook in the cottage kitchen.' }
    ]
  },
  {
    day: 'Sunday',
    title: 'Limestone Heights & Leisurely Departure',
    steps: [
      { time: '9:00 AM', text: 'Slow morning with coffee and a soak in the deep roll-top clawfoot bath with organic botanical Bramley soaps.' },
      { time: '11:00 AM', text: 'Visit Matlock Bath to ride the cable cars at the Heights of Abraham for panoramic 360-degree views of the Peak District.' },
      { time: '1:30 PM', text: 'Riverside Sunday roast at an idyllic village inn along the River Derwent.' },
      { time: '3:30 PM', text: 'Head home relaxed, recharged, and already planning your next countryside return.' }
    ]
  }
];

const categories = ['All', 'Walking & Nature', 'Historic Sights', 'Country Pubs', 'Dining & Heritage', 'Family & Heritage'];

export default function LocalGuideSection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeItineraryDay, setActiveItineraryDay] = useState(0);

  const filteredAttractions = activeCategory === 'All'
    ? attractions
    : attractions.filter(a => a.category === activeCategory);

  return (
    <section id="explore" className="local-guide-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">The Neighbourhood</span>
          <h2 className="section-title">Explore Upper Lumsdale &amp; Beyond</h2>
          <p className="section-lead">
            From secluded romantic waterfalls right outside your gate to historic spa towns and 
            grand country estates, the finest treasures of Derbyshire are minutes away.
          </p>
        </div>

        {/* Category Filters */}
        <div className="guide-filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                tracker.track('guide_category_filter', { category: cat });
              }}
              className={`guide-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Attractions Grid */}
        <div className="attractions-grid">
          {filteredAttractions.map(item => (
            <div key={item.id} className="attraction-card">
              <div className="attraction-media">
                <img src={item.image} alt={item.title} className="attraction-img" loading="lazy" />
                <span className="attraction-tag font-serif">{item.tag}</span>
              </div>

              <div className="attraction-body">
                <div className="attraction-meta-row">
                  <span className="distance-badge">
                    <MapPin size={13} /> {item.distance}
                  </span>
                  <span className="time-badge">
                    <Clock size={13} /> {item.time}
                  </span>
                </div>

                <h3 className="attraction-title">{item.title}</h3>
                <p className="attraction-desc">{item.description}</p>

                <div className="attraction-actions">
                  <a 
                    href={item.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="maps-link"
                    onClick={() => tracker.track('click_google_maps', { attraction: item.title })}
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 48 Hours in Matlock Itinerary Feature */}
        <div id="itinerary" className="itinerary-feature-wrapper">
          <div className="itinerary-card">
            
            <div className="itinerary-header">
              <div className="itinerary-header-text">
                <span className="eyebrow">Curated Experience</span>
                <h3 className="itinerary-title font-serif">48 Hours in Matlock &amp; The Peaks</h3>
                <p className="itinerary-subtitle">
                  Our recommended Friday afternoon to Sunday itinerary — crafted so you can envision 
                  your perfect countryside escape.
                </p>
              </div>

              {/* Day Selection Tabs */}
              <div className="itinerary-day-tabs">
                {itineraryDays.map((dayObj, dIdx) => (
                  <button
                    key={dIdx}
                    onClick={() => {
                      setActiveItineraryDay(dIdx);
                      tracker.track('view_itinerary_day', { day: dayObj.day });
                    }}
                    className={`day-tab-btn ${activeItineraryDay === dIdx ? 'active' : ''}`}
                  >
                    <span className="day-name">{dayObj.day}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div className="itinerary-body">
              <div className="itinerary-active-title">
                <Compass size={20} className="itinerary-compass" />
                <h4 className="font-serif">{itineraryDays[activeItineraryDay].title}</h4>
              </div>

              <div className="timeline-list">
                {itineraryDays[activeItineraryDay].steps.map((step, sIdx) => (
                  <div key={sIdx} className="timeline-item">
                    <div className="timeline-time-col">
                      <span className="timeline-time">{step.time}</span>
                      <div className="timeline-dot"></div>
                    </div>
                    <div className="timeline-content-col">
                      <p className="timeline-text">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="itinerary-footer-cta">
                <div className="itinerary-cta-note">
                  <strong>Ready to live this weekend?</strong>
                  <span>Direct bookings include flexible rebooking &amp; welcome hamper.</span>
                </div>
                <button 
                  onClick={() => {
                    tracker.trackCheckAvailability('48h Itinerary CTA');
                    onOpenBooking();
                  }}
                  className="btn-primary"
                >
                  <Calendar size={16} />
                  <span>Check Weekend Availability</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      <style>{`
        .local-guide-section {
          background-color: var(--bg-cream);
        }

        .guide-filter-tabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2.8rem;
          flex-wrap: wrap;
        }

        .guide-tab-btn {
          padding: 0.55rem 1.25rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-muted);
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          transition: all var(--transition-fast);
        }

        .guide-tab-btn:hover {
          color: var(--color-primary);
          border-color: var(--color-stone);
        }

        .guide-tab-btn.active {
          background-color: var(--color-primary);
          color: #FFFFFF;
          border-color: var(--color-primary);
        }

        .attractions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.6rem;
          margin-bottom: 4.5rem;
        }

        .attraction-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-smooth);
        }

        .attraction-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-stone);
        }

        .attraction-media {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .attraction-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .attraction-card:hover .attraction-img {
          transform: scale(1.05);
        }

        .attraction-tag {
          position: absolute;
          top: 0.8rem;
          left: 0.8rem;
          background: rgba(47, 69, 83, 0.88);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-style: italic;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .attraction-body {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .attraction-meta-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .distance-badge, .time-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          color: var(--color-sage);
          font-weight: 600;
        }

        .attraction-title {
          font-size: 1.25rem;
          color: var(--color-primary);
          margin-bottom: 0.6rem;
          line-height: 1.25;
        }

        .attraction-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.55;
          margin-bottom: 1.2rem;
        }

        .attraction-actions {
          margin-top: auto;
          padding-top: 0.8rem;
          border-top: 1px solid rgba(213, 202, 174, 0.4);
        }

        .maps-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-primary);
          transition: color var(--transition-fast);
        }

        .maps-link:hover {
          color: var(--color-sage);
        }

        /* 48 Hours Itinerary */
        .itinerary-feature-wrapper {
          margin-top: 1rem;
        }

        .itinerary-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-lg);
          padding: 3rem;
          box-shadow: var(--shadow-md);
        }

        .itinerary-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--color-sand);
          margin-bottom: 2rem;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .itinerary-header-text {
          max-width: 600px;
        }

        .itinerary-title {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
          color: var(--color-primary);
        }

        .itinerary-subtitle {
          font-size: 0.96rem;
          color: var(--color-text-muted);
        }

        .itinerary-day-tabs {
          display: flex;
          gap: 0.5rem;
          background-color: var(--bg-cream);
          padding: 0.35rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-sand);
        }

        .day-tab-btn {
          padding: 0.6rem 1.3rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-body);
          transition: all var(--transition-fast);
        }

        .day-tab-btn.active {
          background-color: var(--color-primary);
          color: #FFFFFF;
        }

        .itinerary-active-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.8rem;
        }

        .itinerary-compass {
          color: var(--color-sage);
        }

        .itinerary-active-title h4 {
          font-size: 1.5rem;
          color: var(--color-primary);
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
          position: relative;
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .timeline-time-col {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .timeline-time {
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--color-primary);
          background-color: var(--color-sage-bg);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--color-sage);
          border: 2px solid #FFFFFF;
          box-shadow: 0 0 0 2px var(--color-sand);
        }

        .timeline-text {
          font-size: 0.95rem;
          color: var(--color-text-body);
          line-height: 1.5;
          padding-top: 0.15rem;
        }

        .itinerary-footer-cta {
          background-color: var(--bg-cream);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .itinerary-cta-note {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .itinerary-cta-note strong {
          color: var(--color-primary);
          font-size: 1.05rem;
        }

        .itinerary-cta-note span {
          color: var(--color-text-muted);
          font-size: 0.88rem;
        }

        @media (max-width: 1200px) {
          .attractions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .attractions-grid {
            grid-template-columns: 1fr;
          }
          .itinerary-card {
            padding: 1.8rem;
          }
          .timeline-item {
            grid-template-columns: 1fr;
            gap: 0.4rem;
          }
          .timeline-time-col {
            justify-content: flex-start;
            gap: 0.6rem;
          }
          .timeline-dot {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
