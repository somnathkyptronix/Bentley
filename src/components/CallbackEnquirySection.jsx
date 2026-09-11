import React, { useState } from 'react';
import { Calendar, Phone, Mail, MessageSquare, ShieldCheck, Check, Sparkles, ArrowRight } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function CallbackEnquirySection({ onOpenBooking }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2 Guests');
  const [dogSelected, setDogSelected] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const generatedRef = `BBC-EM-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(generatedRef);

    tracker.track('Lead', {
      content_name: 'Emarat Callback Direct Enquiry',
      guest_name: name,
      phone,
      email,
      preferred_dates: dates,
      guests,
      dog: dogSelected,
      reference: generatedRef
    });

    setSubmitted(true);
  };

  return (
    <section id="enquiry" className="callback-section section-padding">
      <div className="container-wide">
        
        <div className="callback-card">
          <div className="callback-grid">
            
            {/* Left: Narrative & Contact Info */}
            <div className="callback-info-col">
              <span className="eyebrow-gold">DIRECT RESERVATIONS</span>
              <h2 className="callback-title font-serif">
                Reserve Your Countryside Retreat
              </h2>
              <p className="callback-desc">
                Plan your peaceful stay at 2 Bentley Bridge Cottages. Direct enquiries enjoy 
                our Best Rate Guarantee, £0 service fees, complimentary welcome hampers, and 
                a flexible 48-hour provisional hold.
              </p>

              <div className="callback-perks-list">
                <div className="perk-row">
                  <div className="perk-icon-ring">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="perk-title font-serif">Best Price Direct Match</span>
                    <span className="perk-sub">Always 10–15% lower than Airbnb &amp; Booking.com</span>
                  </div>
                </div>

                <div className="perk-row">
                  <div className="perk-icon-ring">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <span className="perk-title font-serif">Complimentary Welcome Hamper</span>
                    <span className="perk-sub">Derbyshire oatcakes, local honey &amp; farm produce</span>
                  </div>
                </div>

                <div className="perk-row">
                  <div className="perk-icon-ring">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="perk-title font-serif">Direct Host Concierge</span>
                    <span className="perk-sub">Personal assistance for arrivals, walks &amp; dog care</span>
                  </div>
                </div>
              </div>

              <div className="direct-call-box">
                <span className="call-box-label">Prefer to speak directly with our team?</span>
                <a href="tel:+441629828450" className="call-phone-link font-serif">
                  <Phone size={16} /> 01629 828 450
                </a>
              </div>
            </div>

            {/* Right: Emarat High-Conversion Form */}
            <div className="callback-form-col">
              {submitted ? (
                <div className="enquiry-success-state">
                  <div className="success-icon-badge">
                    <Check size={36} />
                  </div>
                  <h3 className="success-title font-serif">Direct Enquiry Received</h3>
                  <div className="ref-pill font-serif">Reference: {refId}</div>
                  <p className="success-message">
                    Thank you, <strong>{name}</strong>. Our cottage manager will review your requested dates 
                    and reply via WhatsApp or email within 2 hours with our best direct quote.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      onOpenBooking();
                    }}
                    className="btn-primary"
                  >
                    View Interactive Calendar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="emarat-enquiry-form">
                  <h3 className="form-heading font-serif">Request Direct Booking / Callback</h3>
                  <p className="form-subtext">No payment taken today &bull; Dates held provisionally for 48 hours</p>

                  <div className="form-group">
                    <label className="emarat-label">FULL NAME *</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Eleanor Bennett"
                      className="emarat-input"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="emarat-label">CONTACT TELEPHONE *</label>
                      <input 
                        type="tel" 
                        required 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="07700 900123"
                        className="emarat-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="emarat-label">EMAIL ADDRESS *</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="eleanor@example.co.uk"
                        className="emarat-input"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="emarat-label">ESTIMATED DATES</label>
                      <input 
                        type="text" 
                        value={dates}
                        onChange={e => setDates(e.target.value)}
                        placeholder="e.g. 16 Oct – 19 Oct 2026"
                        className="emarat-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="emarat-label">PARTY SIZE</label>
                      <select 
                        value={guests} 
                        onChange={e => setGuests(e.target.value)}
                        className="emarat-input"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests (Couple / Friends)</option>
                        <option value="3 Guests">3 Guests (Family)</option>
                        <option value="4 Guests">4 Guests (Max Capacity)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="emarat-label">BRINGING A DOG?</label>
                    <button 
                      type="button" 
                      onClick={() => setDogSelected(!dogSelected)}
                      className={`dog-toggle-button ${dogSelected ? 'active' : ''}`}
                    >
                      {dogSelected ? <Check size={14} /> : null}
                      <span>{dogSelected ? 'Yes &bull; Up to 2 dogs welcome' : 'No dogs'}</span>
                    </button>
                  </div>

                  <button 
                    type="submit" 
                    id="callback-submit-btn"
                    className="emarat-submit-btn"
                  >
                    <span>REQUEST DIRECT RESERVATION</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .callback-section {
          background-color: var(--bg-cream);
          border-bottom: 1px solid var(--color-sand);
        }

        .callback-card {
          background-color: #FFFFFF;
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-sand);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .callback-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
        }

        .callback-info-col {
          padding: 4.5rem 4rem;
          background-color: var(--color-forest);
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .callback-title {
          font-size: clamp(2.4rem, 4vw, 3.4rem);
          color: #FFFFFF;
          line-height: 1.15;
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .callback-desc {
          font-size: 1.05rem;
          color: #E2DAC5;
          line-height: 1.65;
          margin-bottom: 2.8rem;
        }

        .callback-perks-list {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          margin-bottom: 3rem;
        }

        .perk-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .perk-icon-ring {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid var(--color-gold);
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .perk-title {
          font-size: 1.25rem;
          color: #FFFFFF;
          display: block;
          line-height: 1.2;
        }

        .perk-sub {
          font-size: 0.82rem;
          color: #D2CBC0;
        }

        .direct-call-box {
          padding-top: 1.8rem;
          border-top: 1px solid rgba(197, 162, 103, 0.3);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .call-box-label {
          font-size: 0.78rem;
          color: #D2CBC0;
        }

        .call-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.35rem;
          color: var(--color-gold);
          font-weight: 600;
        }

        /* Form Column */
        .callback-form-col {
          padding: 4.5rem 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: #FFFFFF;
        }

        .emarat-enquiry-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .form-heading {
          font-size: 2rem;
          color: var(--color-forest);
          line-height: 1.15;
          margin-bottom: 0.2rem;
        }

        .form-subtext {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          margin-bottom: 0.8rem;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .emarat-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-forest);
        }

        .emarat-input {
          width: 100%;
          background-color: var(--bg-cream-light);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-sm);
          padding: 0.85rem 1rem;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: var(--color-text-body);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .emarat-input:focus {
          border-color: var(--color-forest);
        }

        .dog-toggle-button {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 48px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-sand);
          background-color: var(--bg-cream-light);
          padding: 0 1rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-body);
          cursor: pointer;
        }

        .dog-toggle-button.active {
          background-color: #EDF7F2;
          border-color: #2F6F4E;
          color: #144231;
        }

        .emarat-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          width: 100%;
          padding: 1.05rem;
          background-color: var(--color-forest);
          color: #FFFFFF;
          border-radius: var(--radius-full);
          font-size: 0.84rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          box-shadow: 0 6px 20px rgba(20, 66, 49, 0.25);
          margin-top: 0.6rem;
          transition: all var(--transition-smooth);
        }

        .emarat-submit-btn:hover {
          background-color: var(--color-forest-dark);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(20, 66, 49, 0.35);
        }

        .enquiry-success-state {
          text-align: center;
          padding: 2rem 1rem;
        }

        .success-icon-badge {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #EDF7F2;
          color: #2F6F4E;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.2rem auto;
        }

        .success-title {
          font-size: 2.2rem;
          color: var(--color-forest);
          margin-bottom: 0.5rem;
        }

        .ref-pill {
          display: inline-block;
          font-size: 1.1rem;
          color: var(--color-gold-dark);
          background: var(--bg-cream);
          padding: 0.3rem 1rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-sand);
          margin-bottom: 1.2rem;
        }

        .success-message {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 1.8rem;
        }

        @media (max-width: 1024px) {
          .callback-grid {
            grid-template-columns: 1fr;
          }
          .callback-info-col, .callback-form-col {
            padding: 3rem 2rem;
          }
        }

        @media (max-width: 640px) {
          .callback-info-col, .callback-form-col {
            padding: 2rem 1.25rem;
          }
          .callback-title {
            font-size: 1.95rem;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .emarat-submit-btn {
            padding: 0.85rem;
            font-size: 0.84rem;
          }
        }
      `}</style>
    </section>
  );
}
