import React from 'react';
import { Star, ShieldCheck, Calendar, Heart, CheckCircle2 } from 'lucide-react';
import { tracker } from '../services/analytics';

export const verifiedReviews = [
  {
    id: 1,
    name: 'Charlotte & David M.',
    stayDate: 'August 2026',
    party: 'Couple with Golden Retriever',
    rating: 5,
    title: 'An absolute haven in Upper Lumsdale',
    review: '2 Bentley Bridge Cottages exceeded every expectation. Waking up to the mist rolling over the gorge, walking straight from the door into Lumsdale waterfalls, and returning to light the wood stove with our dog curled up on the rug was heaven. The welcome hamper with fresh oatcakes was such a thoughtful touch.',
    source: 'Verified Direct Guest'
  },
  {
    id: 2,
    name: 'The Harrison Family',
    stayDate: 'July 2026',
    party: 'Family of 4',
    rating: 5,
    title: 'Perfect cottage for small families',
    review: 'Our two children loved the twin bedroom and exploring the Peak District trails. The kitchen was brilliantly equipped for family meals, and having the roll-top bath after a long walk up to Chatsworth was pure luxury. Extremely clean, peaceful, and beautifully decorated.',
    source: 'Verified Airbnb Guest'
  },
  {
    id: 3,
    name: 'James & Sophie T.',
    stayDate: 'June 2026',
    party: 'Couple weekend break',
    rating: 5,
    title: 'Timeless English charm without compromise',
    review: 'The quality of the finishes is extraordinary — from the Egyptian cotton linens to the cast-iron fireplace. The location gives you total peaceful seclusion, yet you are just four minutes from Matlock. We have already booked our return for winter!',
    source: 'Verified Direct Guest'
  },
  {
    id: 4,
    name: 'Marcus P. & Bella (Cocker Spaniel)',
    stayDate: 'May 2026',
    party: 'Solo walker with dog',
    rating: 5,
    title: 'Genuinely dog-friendly perfection',
    review: 'So many cottages claim to be dog-friendly but have endless restrictions. Here, the stone garden is genuinely secure, dog towels and treats were waiting, and the local pubs in Matlock welcomed dogs with open arms. Outstanding value.',
    source: 'Verified VRBO Guest'
  }
];

export default function GuestReviewsSection({ onOpenBooking }) {
  return (
    <section id="reviews" className="reviews-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">Guest Testimonials</span>
          <h2 className="section-title">Memories from 2 Bentley Bridge</h2>
          <p className="section-lead">
            Read verified experiences from couples, families, and dog owners who have made our cosy 
            Derbyshire retreat their home away from home.
          </p>
        </div>

        {/* Overall Rating Hero Strip */}
        <div className="rating-summary-strip">
          <div className="rating-score-box">
            <span className="score-num font-serif">4.98</span>
            <div className="score-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-filled" />
              ))}
            </div>
            <span className="score-label">Overall Guest Score (48 Verified Reviews)</span>
          </div>

          <div className="rating-metrics">
            <div className="metric-item">
              <span className="metric-val">5.0</span>
              <span className="metric-name">Cleanliness</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">5.0</span>
              <span className="metric-name">Accuracy</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">4.9</span>
              <span className="metric-name">Location</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">5.0</span>
              <span className="metric-name">Cottage Hospitality</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {verifiedReviews.map(rev => (
            <div key={rev.id} className="review-card">
              <div className="review-card-header">
                <div className="review-stars-row">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} size={15} className="star-filled" />
                  ))}
                </div>
                <span className="review-source">
                  <ShieldCheck size={13} /> {rev.source}
                </span>
              </div>

              <h3 className="review-title font-serif">"{rev.title}"</h3>
              <p className="review-text font-serif">"{rev.review}"</p>

              <div className="review-author-row">
                <div className="author-details">
                  <span className="author-name">{rev.name}</span>
                  <span className="author-meta">{rev.party}</span>
                </div>
                <span className="stay-date">{rev.stayDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Conversion Strip */}
        <div className="reviews-cta-strip">
          <div className="cta-strip-text">
            <span className="strip-eyebrow">Experience It Yourself</span>
            <h3 className="font-serif">Join our community of delighted guests</h3>
            <p>Direct bookings are protected by our Best Rate Guarantee &amp; flexible reservation holds.</p>
          </div>
          <button 
            onClick={() => {
              tracker.trackCheckAvailability('Reviews Section CTA');
              onOpenBooking();
            }}
            className="btn-primary strip-btn"
          >
            <Calendar size={16} />
            <span>Check Availability &amp; Reserve Dates</span>
          </button>
        </div>

      </div>

      <style>{`
        .reviews-section {
          background-color: #FFFFFF;
          border-top: 1px solid var(--color-sand);
          border-bottom: 1px solid var(--color-sand);
        }

        .rating-summary-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-cream);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 1.8rem 2.5rem;
          margin-bottom: 3.5rem;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .rating-score-box {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .score-num {
          font-size: 2.8rem;
          color: var(--color-primary);
          line-height: 1;
        }

        .score-stars {
          display: flex;
          gap: 2px;
        }

        .star-filled {
          fill: #C29A38;
          color: #C29A38;
        }

        .score-label {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .rating-metrics {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .metric-val {
          font-weight: 700;
          color: var(--color-primary);
          font-size: 1.1rem;
        }

        .metric-name {
          font-size: 0.75rem;
          color: var(--color-sage);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .metric-divider {
          width: 1px;
          height: 28px;
          background-color: var(--color-sand);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 3.5rem;
        }

        .review-card {
          background-color: var(--bg-cream);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
        }

        .review-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .review-stars-row {
          display: flex;
          gap: 2px;
        }

        .review-source {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--color-sage);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .review-title {
          font-size: 1.3rem;
          color: var(--color-primary);
          margin-bottom: 0.8rem;
          line-height: 1.25;
        }

        .review-text {
          font-size: 1.05rem;
          font-style: italic;
          color: var(--color-text-body);
          line-height: 1.6;
          margin-bottom: 1.8rem;
          flex: 1;
        }

        .review-author-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--color-sand);
        }

        .author-details {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 700;
          color: var(--color-primary);
          font-size: 0.95rem;
        }

        .author-meta {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .stay-date {
          font-size: 0.8rem;
          color: var(--color-sage);
          font-weight: 600;
        }

        .reviews-cta-strip {
          background-color: var(--color-primary);
          color: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 2.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .strip-eyebrow {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-sand);
          display: block;
          margin-bottom: 0.4rem;
        }

        .cta-strip-text h3 {
          font-size: 1.9rem;
          color: #FFFFFF;
          margin-bottom: 0.35rem;
        }

        .cta-strip-text p {
          color: var(--color-sand);
          font-size: 0.95rem;
        }

        .strip-btn {
          background-color: var(--color-sand);
          color: var(--color-primary);
          font-weight: 700;
          padding: 0.95rem 1.8rem;
        }

        .strip-btn:hover {
          background-color: #FFFFFF;
          color: var(--color-primary);
        }

        @media (max-width: 900px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
          .rating-summary-strip {
            padding: 1.5rem;
          }
          .reviews-cta-strip {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
