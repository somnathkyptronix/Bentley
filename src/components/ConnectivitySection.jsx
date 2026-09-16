import React from 'react';
import { Navigation, Car, Train, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function ConnectivitySection({ onOpenBooking }) {
  return (
    <section id="connectivity" className="connectivity-section">
      <div className="connectivity-bg-wrapper">
        <img 
          src="/web/sc_1786456264_1205377_30.webp" 
          alt="Scenic Peak District and Lumsdale Valley hills" 
          className="connectivity-bg-img"
          loading="lazy"
        />
        <div className="connectivity-overlay"></div>
      </div>

      <div className="container-wide connectivity-container">
        <div className="connectivity-content">
          
          <span className="eyebrow-gold">LOCATION &amp; CONNECTIVITY</span>
          <h2 className="connectivity-title font-serif">
            Unrivalled Countryside Proximity
          </h2>
          <p className="connectivity-lead">
            Positioned in the quiet conservation sanctuary of Upper Lumsdale, 2 Bentley Bridge Cottages provides 
            profound valley stillness while remaining effortlessly accessible via major road networks.
          </p>

          {/* 4 Connectivity Metrics Cards (Emarat Style) */}
          <div className="connectivity-metrics-grid">
            
            <div className="metric-card">
              <span className="metric-big font-serif">300m</span>
              <span className="metric-tag">IMMEDIATE WALKS</span>
              <p className="metric-desc">Direct footpaths lead straight from your gate into Lumsdale Waterfall gorge.</p>
            </div>

            <div className="metric-card">
              <span className="metric-big font-serif">4 min</span>
              <span className="metric-tag">MATLOCK CENTRE</span>
              <p className="metric-desc">Bustling bakeries, Crown Square, supermarkets, and artisan bistros.</p>
            </div>

            <div className="metric-card">
              <span className="metric-big font-serif">18 min</span>
              <span className="metric-tag">BAKEWELL &amp; ESTATES</span>
              <p className="metric-desc">Chatsworth House, riverside puddings, and Monsal Head viaduct.</p>
            </div>

            <div className="metric-card">
              <span className="metric-big font-serif">&lt;2.5h</span>
              <span className="metric-tag">CITY ESCAPE</span>
              <p className="metric-desc">Straightforward highway access from London, Birmingham, and Manchester.</p>
            </div>

          </div>

          {/* 3 Outlined Circular Feature Badges (Emarat Style) */}
          <div className="circular-badges-row">
            <div className="circular-feature-badge">
              <div className="circle-icon-ring">
                <Compass size={24} />
              </div>
              <div className="circle-badge-text">
                <span className="circle-tag">PEAK DISTRICT THRESHOLD</span>
                <span className="circle-title font-serif">Well-Connected Trails</span>
              </div>
            </div>

            <div className="circular-feature-badge">
              <div className="circle-icon-ring">
                <ShieldCheck size={24} />
              </div>
              <div className="circle-badge-text">
                <span className="circle-tag">GENUINELY DOG-FRIENDLY</span>
                <span className="circle-title font-serif">Enclosed Stone Garden</span>
              </div>
            </div>

            <div className="circular-feature-badge">
              <div className="circle-icon-ring">
                <Navigation size={24} />
              </div>
              <div className="circle-badge-text">
                <span className="circle-tag">ROADSIDE PARKING</span>
                <span className="circle-title font-serif">First-Come, First-Served</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .connectivity-section {
          position: relative;
          padding: 8rem 0;
          overflow: hidden;
          color: #FFFFFF;
        }

        .connectivity-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .connectivity-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 60%;
        }

        .connectivity-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(13, 44, 32, 0.88) 0%,
            rgba(13, 44, 32, 0.72) 45%,
            rgba(13, 44, 32, 0.95) 100%
          );
        }

        .connectivity-container {
          position: relative;
          z-index: 2;
        }

        .connectivity-content {
          max-width: 1100px;
        }

        .eyebrow-gold {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-gold);
          display: block;
          margin-bottom: 0.8rem;
        }

        .connectivity-title {
          font-size: clamp(2.4rem, 4.4vw, 3.8rem);
          color: #FFFFFF;
          margin-bottom: 1.2rem;
          line-height: 1.1;
          font-weight: 400;
        }

        .connectivity-lead {
          font-size: 1.1rem;
          color: #E2DAC5;
          max-width: 740px;
          line-height: 1.65;
          margin-bottom: 3.5rem;
        }

        /* 4 Metrics Grid (Emarat Style) */
        .connectivity-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 4.5rem;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(197, 162, 103, 0.3);
          border-radius: var(--radius-md);
          padding: 2rem 1.6rem;
          display: flex;
          flex-direction: column;
          transition: all var(--transition-smooth);
        }

        .metric-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.14);
          border-color: var(--color-gold);
        }

        .metric-big {
          font-size: 2.8rem;
          color: var(--color-gold);
          line-height: 1;
          margin-bottom: 0.6rem;
        }

        .metric-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FFFFFF;
          margin-bottom: 0.6rem;
        }

        .metric-desc {
          font-size: 0.84rem;
          color: #D2CBC0;
          line-height: 1.5;
        }

        /* 3 Circular Badges (Emarat Style) */
        .circular-badges-row {
          display: flex;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .circular-feature-badge {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .circle-icon-ring {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 1.5px solid var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold);
          background: rgba(197, 162, 103, 0.1);
          flex-shrink: 0;
        }

        .circle-badge-text {
          display: flex;
          flex-direction: column;
        }

        .circle-tag {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-gold);
        }

        .circle-title {
          font-size: 1.25rem;
          color: #FFFFFF;
          font-weight: 400;
        }

        @media (max-width: 1024px) {
          .connectivity-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .circular-badges-row {
            gap: 2rem;
          }
        }

        @media (max-width: 640px) {
          .connectivity-title {
            font-size: 2.1rem;
          }
          .connectivity-lead {
            font-size: 0.94rem;
            margin-bottom: 2rem;
          }
          .connectivity-metrics-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem;
            margin-bottom: 2.5rem;
          }
          .metric-card {
            padding: 1.2rem 1rem;
          }
          .metric-big {
            font-size: 2.1rem;
            margin-bottom: 0.35rem;
          }
          .metric-tag {
            font-size: 0.65rem;
            margin-bottom: 0.35rem;
          }
          .metric-desc {
            font-size: 0.76rem;
          }
          .circular-badges-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.2rem;
          }
          .circle-icon-ring {
            width: 48px;
            height: 48px;
          }
          .circle-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
}
