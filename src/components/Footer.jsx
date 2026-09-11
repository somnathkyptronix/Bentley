import React, { useState } from 'react';
import { MapPin, Phone, Mail, Calendar, Heart, ShieldCheck, ExternalLink, X, MessageSquare } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function Footer({ onOpenBooking, onNavigate }) {
  const [activeModal, setActiveModal] = useState(null); // 'privacy', 'cookie', 'terms'

  const handleLink = (id) => {
    if (onNavigate) onNavigate(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer id="contact" className="emarat-footer">
        
        {/* Top Pre-Footer Strip (Emarat Style) */}
        <div className="emarat-pre-footer">
          <div className="container-wide">
            <div className="pre-footer-content">
              <div className="pre-footer-text">
                <span className="font-serif pre-title">Plan Your Stay at 2 Bentley Bridge Cottages</span>
                <p>Upper Lumsdale &bull; Matlock, Derbyshire &bull; Direct Bookings Receive Guaranteed Best Rates</p>
              </div>
              <button 
                id="footer-book-cta-btn"
                onClick={() => {
                  tracker.trackCheckAvailability('Footer Pre-strip CTA');
                  onOpenBooking();
                }}
                className="footer-gold-pill-btn"
              >
                <Calendar size={15} />
                <span>CHECK AVAILABILITY &amp; RATES</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main 5-Column Luxury Footer (Emarat Style) */}
        <div className="container-wide footer-main">
          <div className="emarat-footer-grid">
            
            {/* Col 1: Brand Logo & Full Address */}
            <div className="footer-col brand-col">
              <div className="footer-brand-header">
                <img src="/logo.jpg" alt="2 Bentley Bridge Cottages Emblem" className="footer-logo" />
                <div>
                  <h3 className="footer-brand-name font-serif">2 BENTLEY BRIDGE</h3>
                  <span className="footer-brand-sub">UPPER LUMSDALE &bull; MATLOCK</span>
                </div>
              </div>

              <p className="footer-manifesto">
                A cosy two-bedroom English countryside retreat near Matlock and the Peak District, 
                suitable for couples, small families and guests travelling with a dog.
              </p>
              
              <div className="footer-address-box">
                <MapPin size={16} className="addr-icon" />
                <address className="cottage-address">
                  2 Bentley Bridge Cottages<br />
                  Upper Lumsdale<br />
                  Matlock, Derbyshire<br />
                  <strong>DE4 5LB</strong><br />
                  United Kingdom
                </address>
              </div>

              <div className="direct-seal-badge">
                <ShieldCheck size={16} className="seal-icon" />
                <span>Direct Booking Guarantee &bull; £0 Fees</span>
              </div>
            </div>

            {/* Col 2: The Cottage */}
            <div className="footer-col">
              <h4 className="footer-col-title font-serif">THE COTTAGE</h4>
              <ul className="footer-links-list">
                <li><button onClick={() => handleLink('spaces')} className="footer-link">The Living Room</button></li>
                <li><button onClick={() => handleLink('spaces')} className="footer-link">Country Kitchen</button></li>
                <li><button onClick={() => handleLink('spaces')} className="footer-link">Master Double Bedroom</button></li>
                <li><button onClick={() => handleLink('spaces')} className="footer-link">Charming Twin Room</button></li>
                <li><button onClick={() => handleLink('spaces')} className="footer-link">Heritage Roll-Top Bath</button></li>
                <li><button onClick={() => handleLink('spaces')} className="footer-link">Enclosed Garden Patio</button></li>
                <li><button onClick={() => handleLink('about')} className="footer-link">Design &amp; Philosophy</button></li>
              </ul>
            </div>

            {/* Col 3: Area Escapes */}
            <div className="footer-col">
              <h4 className="footer-col-title font-serif">AREA ESCAPES</h4>
              <ul className="footer-links-list">
                <li><button onClick={() => handleLink('escapes')} className="footer-link">Lumsdale Valley Waterfalls</button></li>
                <li><button onClick={() => handleLink('escapes')} className="footer-link">Matlock Town &amp; Square</button></li>
                <li><button onClick={() => handleLink('escapes')} className="footer-link">Heights of Abraham</button></li>
                <li><button onClick={() => handleLink('escapes')} className="footer-link">Bakewell &amp; Puddings</button></li>
                <li><button onClick={() => handleLink('escapes')} className="footer-link">Chatsworth House</button></li>
                <li><button onClick={() => handleLink('connectivity')} className="footer-link">Peak District Trails</button></li>
                <li><button onClick={() => handleLink('gallery')} className="footer-link">Visual Gallery</button></li>
              </ul>
            </div>

            {/* Col 4: Reservations */}
            <div className="footer-col">
              <h4 className="footer-col-title font-serif">RESERVATIONS</h4>
              <ul className="footer-links-list">
                <li><button onClick={() => handleLink('offers')} className="footer-link">Special Offers &amp; Rates</button></li>
                <li><button onClick={() => handleLink('offers')} className="footer-link">Autumn in the Peaks</button></li>
                <li><button onClick={() => handleLink('offers')} className="footer-link">Weekend Escape (Fri-Mon)</button></li>
                <li><button onClick={() => handleLink('offers')} className="footer-link">Dog-Friendly Break</button></li>
                <li><button onClick={() => handleLink('reviews')} className="footer-link">Verified Guest Reviews</button></li>
                <li><button onClick={() => onOpenBooking()} className="footer-link">Live Availability Calendar</button></li>
              </ul>
            </div>

            {/* Col 5: Get In Touch */}
            <div className="footer-col">
              <h4 className="footer-col-title font-serif">GET IN TOUCH</h4>
              <p className="contact-lead">
                Direct Host Concierge available daily for enquiries, arrival guidelines, and local tips.
              </p>

              <div className="footer-contact-items">
                <a href="tel:+441629828450" className="contact-item">
                  <Phone size={15} className="contact-icon" />
                  <span>01629 828 450</span>
                </a>
                <a href="mailto:stay@2bentleybridgecottages.co.uk" className="contact-item">
                  <Mail size={15} className="contact-icon" />
                  <span>stay@2bentleybridgecottages.co.uk</span>
                </a>
                <a href="https://wa.me/441629828450" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <MessageSquare size={15} className="contact-icon" />
                  <span>WhatsApp Concierge</span>
                </a>
                <a 
                  href="https://maps.google.com/?q=2+Bentley+Bridge+Cottages+Upper+Lumsdale+Matlock+DE4+5LB" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-item"
                >
                  <MapPin size={15} className="contact-icon" />
                  <span>Google Maps Directions</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Social Profiles */}
              <div className="social-profiles-row">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-btn"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-btn"
                  aria-label="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div className="footer-bottom-strip">
          <div className="container-wide">
            <div className="bottom-strip-content">
              <span className="copyright-text">
                &copy; {new Date().getFullYear()} 2 Bentley Bridge Cottages &bull; Upper Lumsdale, Matlock, Derbyshire DE4 5LB. All rights reserved.
              </span>

              <div className="policy-links-row">
                <button onClick={() => setActiveModal('privacy')} className="policy-link-btn">Privacy Policy</button>
                <span>&bull;</span>
                <button onClick={() => setActiveModal('cookie')} className="policy-link-btn">Cookie Policy</button>
                <span>&bull;</span>
                <button onClick={() => setActiveModal('terms')} className="policy-link-btn">Terms &amp; Conditions</button>
              </div>

              <span className="love-text">
                Peak District Countryside Living <Heart size={12} className="inline-heart" />
              </span>
            </div>
          </div>
        </div>

      </footer>

      {/* Legal Policy Modals */}
      {activeModal && (
        <div className="policy-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="policy-modal-card" onClick={e => e.stopPropagation()}>
            <div className="policy-modal-header">
              <h3 className="font-serif">
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'cookie' && 'Cookie & Tracking Policy'}
                {activeModal === 'terms' && 'Terms & Booking Conditions'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="policy-close-btn" aria-label="Close modal">
                <X size={22} />
              </button>
            </div>

            <div className="policy-modal-body">
              {activeModal === 'privacy' && (
                <div className="policy-content-text">
                  <p><strong>Last Updated: September 2026</strong></p>
                  <p>2 Bentley Bridge Cottages ("we", "our") respects your privacy. When you make an enquiry or reserve your stay, we collect your name, email address, contact telephone, and booking requirements.</p>
                  <h4>How We Use Your Data</h4>
                  <p>We use this information solely to process your booking enquiry, arrange your check-in, communicate arrival guidelines, and send relevant seasonal availability updates if you have opted in. We never sell your personal data to third parties.</p>
                  <h4>Data Retention &amp; Rights</h4>
                  <p>Under GDPR and the UK Data Protection Act 2018, you may request access to or deletion of your personal data at any time by contacting stay@2bentleybridgecottages.co.uk.</p>
                </div>
              )}

              {activeModal === 'cookie' && (
                <div className="policy-content-text">
                  <p><strong>Cookie &amp; Conversion Tracking Policy</strong></p>
                  <p>This website uses essential and performance cookies to provide a seamless browsing experience and monitor conversion performance.</p>
                  <h4>Analytics &amp; Remarketing</h4>
                  <p>We utilise Meta Pixel, Google Analytics 4, and Google Ads tags to evaluate website traffic, track booking enquiries, and present relevant advertisements to guests who have shown interest in our cottage.</p>
                  <h4>Managing Cookies</h4>
                  <p>You can choose to disable non-essential cookies via your browser preferences at any time.</p>
                </div>
              )}

              {activeModal === 'terms' && (
                <div className="policy-content-text">
                  <p><strong>Booking Terms &amp; Conditions</strong></p>
                  <h4>1. Reservation &amp; Payment</h4>
                  <p>A provisional hold is placed on your chosen dates upon enquiry submission. A 25% deposit secures your reservation, with the balance due 30 days prior to arrival.</p>
                  <h4>2. Cancellation Policy</h4>
                  <p>Full refund for cancellations made up to 14 days before check-in. For cancellations within 14 days, we will attempt to re-let the dates and refund you accordingly.</p>
                  <h4>3. Dog Policy</h4>
                  <p>Up to 2 house-trained dogs are welcome. Dogs must not be left unattended in the cottage unless crated, and are not permitted on soft furnishings or bedroom beds.</p>
                  <h4>4. Check-in &amp; Check-out</h4>
                  <p>Check-in from 3:00 PM; Check-out by 10:00 AM (unless extended checkout is included with your offer).</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .emarat-footer {
          background-color: var(--color-forest);
          color: #FFFFFF;
          margin-top: auto;
          border-top: 1px solid rgba(197, 162, 103, 0.2);
        }

        .emarat-pre-footer {
          background-color: var(--color-forest-dark);
          padding: 2.5rem 0;
          border-bottom: 1px solid rgba(197, 162, 103, 0.2);
        }

        .pre-footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .pre-title {
          font-size: 1.6rem;
          color: #FFFFFF;
          display: block;
          margin-bottom: 0.25rem;
        }

        .pre-footer-text p {
          color: #D2CBC0;
          font-size: 0.9rem;
        }

        .footer-gold-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background-color: var(--color-gold);
          color: var(--color-forest-dark);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.9rem 2rem;
          border-radius: var(--radius-full);
          transition: all var(--transition-smooth);
        }

        .footer-gold-pill-btn:hover {
          background-color: #FFFFFF;
          transform: translateY(-2px);
        }

        .footer-main {
          padding: 5rem 2rem 4rem 2rem;
        }

        .emarat-footer-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr 1fr 1fr 1.25fr;
          gap: 2.5rem;
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1.2rem;
        }

        .footer-logo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid var(--color-gold);
          object-fit: cover;
        }

        .footer-brand-name {
          font-size: 1.25rem;
          color: #FFFFFF;
          line-height: 1.15;
          letter-spacing: 0.08em;
        }

        .footer-brand-sub {
          font-size: 0.68rem;
          color: var(--color-gold);
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .footer-manifesto {
          font-size: 0.86rem;
          color: #D2CBC0;
          line-height: 1.55;
          margin-bottom: 1.2rem;
        }

        .footer-address-box {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          margin-bottom: 1.4rem;
        }

        .addr-icon {
          color: var(--color-gold);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .cottage-address {
          font-style: normal;
          font-size: 0.86rem;
          line-height: 1.55;
          color: #E2DAC5;
        }

        .direct-seal-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--color-gold);
          background: rgba(197, 162, 103, 0.12);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(197, 162, 103, 0.3);
        }

        .seal-icon {
          color: #55E6A5;
        }

        .footer-col-title {
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1.4rem;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-link {
          color: #D2CBC0;
          font-size: 0.86rem;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .footer-link:hover {
          color: #FFFFFF;
          padding-left: 4px;
        }

        .contact-lead {
          font-size: 0.86rem;
          color: #D2CBC0;
          line-height: 1.55;
          margin-bottom: 1.2rem;
        }

        .footer-contact-items {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          margin-bottom: 1.4rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #E2DAC5;
          transition: color var(--transition-fast);
        }

        .contact-item:hover {
          color: var(--color-gold);
        }

        .contact-icon {
          color: var(--color-gold);
          flex-shrink: 0;
        }

        .social-profiles-row {
          display: flex;
          gap: 0.6rem;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(197, 162, 103, 0.3);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .social-btn:hover {
          background-color: var(--color-gold);
          color: var(--color-forest-dark);
          transform: translateY(-2px);
        }

        .footer-bottom-strip {
          border-top: 1px solid rgba(197, 162, 103, 0.2);
          padding: 1.4rem 0;
          font-size: 0.8rem;
          color: #D2CBC0;
        }

        .bottom-strip-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .policy-links-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .policy-link-btn {
          color: #D2CBC0;
          font-size: 0.78rem;
          transition: color var(--transition-fast);
        }

        .policy-link-btn:hover {
          color: var(--color-gold);
        }

        .love-text {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #D2CBC0;
        }

        .inline-heart {
          color: #E07A5F;
        }

        /* Policy Modal */
        .policy-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 160;
          background-color: rgba(14, 45, 34, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .policy-modal-card {
          background-color: #FFFFFF;
          border-radius: var(--radius-md);
          width: 100%;
          max-width: 650px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: var(--shadow-xl);
          color: var(--color-text-body);
        }

        .policy-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.4rem 1.8rem;
          border-bottom: 1px solid var(--color-sand);
        }

        .policy-modal-header h3 {
          font-size: 1.4rem;
          color: var(--color-forest);
        }

        .policy-close-btn {
          color: var(--color-forest);
        }

        .policy-modal-body {
          padding: 1.8rem;
        }

        .policy-content-text {
          color: var(--color-text-body);
          font-size: 0.92rem;
          line-height: 1.65;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .policy-content-text h4 {
          font-size: 1.1rem;
          color: var(--color-forest);
          margin-top: 0.5rem;
        }

        @media (max-width: 1200px) {
          .emarat-footer-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .brand-col {
            grid-column: span 3;
          }
        }

        @media (max-width: 768px) {
          .emarat-footer-grid {
            grid-template-columns: 1fr;
          }
          .brand-col {
            grid-column: span 1;
          }
          .bottom-strip-content {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}
