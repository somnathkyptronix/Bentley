import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, Dog, Sparkles, Check, ArrowRight, ShieldCheck, 
  Clock, Coffee, Flame, AlertCircle, Phone, MessageSquare, X, CheckCircle2 
} from 'lucide-react';
import { tracker } from '../services/analytics';

// Sample booked dates (mock realistic availability)
const BOOKED_DATES = [
  '2026-09-18', '2026-09-19', '2026-09-20',
  '2026-09-25', '2026-09-26', '2026-09-27',
  '2026-10-09', '2026-10-10', '2026-10-11',
  '2026-10-23', '2026-10-24', '2026-10-25'
];

export default function BookingCalendarEngine({ 
  isOpen, 
  onClose, 
  initialBookingData = {},
  appliedOffer = null 
}) {
  const [step, setStep] = useState(1); // 1: Dates & Guests, 2: Preferences & Extras, 3: Guest Info, 4: Confirmed
  
  // Date selection state
  const [checkIn, setCheckIn] = useState(initialBookingData.checkIn || '');
  const [checkOut, setCheckOut] = useState(initialBookingData.checkOut || '');
  const [guests, setGuests] = useState(initialBookingData.guests || 2);
  const [hasDog, setHasDog] = useState(initialBookingData.dog !== undefined ? initialBookingData.dog : true);
  
  // Extras
  const [hamperChoice, setHamperChoice] = useState('Derbyshire Artisan Sweet & Savoury');
  const [extraLogs, setExtraLogs] = useState(false);
  const [lateCheckout, setLateCheckout] = useState(false);
  const [promoCode, setPromoCode] = useState(appliedOffer ? appliedOffer.promoCode : '');
  const [promoApplied, setPromoApplied] = useState(!!appliedOffer);

  // Guest Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  // Update if initial data changes
  useEffect(() => {
    if (initialBookingData.checkIn) setCheckIn(initialBookingData.checkIn);
    if (initialBookingData.checkOut) setCheckOut(initialBookingData.checkOut);
    if (initialBookingData.guests) setGuests(initialBookingData.guests);
  }, [initialBookingData]);

  useEffect(() => {
    if (appliedOffer) {
      setPromoCode(appliedOffer.promoCode);
      setPromoApplied(true);
    }
  }, [appliedOffer]);

  // Pricing calculations
  const calculateStay = () => {
    if (!checkIn || !checkOut) return null;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
    
    if (nights <= 0) return null;

    // Base rate £155 midweek, £185 weekend
    const baseRatePerNight = 165; 
    let subtotal = nights * baseRatePerNight;
    
    // Dog fee: £25 flat unless promo applied
    let dogFee = hasDog ? 25 : 0;
    if (promoCode === 'DOGFREE' || (appliedOffer && appliedOffer.id === 'offer-dogfriendly')) {
      dogFee = 0;
    }

    // Extras
    const logsFee = extraLogs ? 15 : 0;
    const lateCheckoutFee = lateCheckout ? 25 : 0;

    // Discount
    let discount = 0;
    if (promoApplied) {
      if (promoCode === 'AUTUMN15' || promoCode === 'LAST15') {
        discount = Math.round(subtotal * 0.15);
      } else if (promoCode === 'WEEKENDESC' || promoCode === 'MIDWEEK4') {
        discount = 45;
      }
    }

    // OTA savings estimate vs Booking.com/Airbnb
    const directSavings = Math.round(subtotal * 0.15);
    const total = subtotal + dogFee + logsFee + lateCheckoutFee - discount;

    return {
      nights,
      baseRatePerNight,
      subtotal,
      dogFee,
      logsFee,
      lateCheckoutFee,
      discount,
      directSavings,
      total
    };
  };

  const stayCalculation = calculateStay();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (['AUTUMN15', 'WEEKENDESC', 'MIDWEEK4', 'DOGFREE', 'LAST15', 'WINTER26'].includes(promoCode.toUpperCase())) {
      setPromoCode(promoCode.toUpperCase());
      setPromoApplied(true);
      tracker.track('promo_code_applied', { promo: promoCode.toUpperCase() });
    } else {
      alert('Invalid promo code. Valid codes include: AUTUMN15, WEEKENDESC, MIDWEEK4, DOGFREE');
    }
  };

  const handleStep1Next = () => {
    if (!checkIn || !checkOut) {
      alert('Please select both Check-in and Check-out dates.');
      return;
    }
    if (stayCalculation && stayCalculation.nights < 2) {
      alert('A minimum 2-night stay is required at 2 Bentley Bridge Cottages.');
      return;
    }
    tracker.trackEnquiryStep(1, 'Dates and Party Selected');
    setStep(2);
  };

  const handleStep2Next = () => {
    tracker.trackEnquiryStep(2, 'Preferences and Extras Confirmed');
    setStep(3);
  };

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    if (!firstName || !email || !phone) {
      alert('Please provide your name, email, and contact telephone number.');
      return;
    }

    const ref = `BBC-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);

    const bookingPayload = {
      refId: ref,
      checkIn,
      checkOut,
      nights: stayCalculation ? stayCalculation.nights : 3,
      guests,
      hasDog,
      totalPrice: stayCalculation ? stayCalculation.total : 495,
      firstName,
      lastName,
      email,
      phone,
      hamperChoice,
      specialRequests
    };

    // Track conversion event for Meta Pixel, GA4, Google Ads
    tracker.trackEnquirySubmitted(bookingPayload);
    setStep(4);
  };

  if (!isOpen) return null;

  return (
    <div className="booking-modal-backdrop" onClick={onClose}>
      <div className="booking-modal-window" onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="booking-modal-header">
          <div className="modal-header-brand">
            <img src="/logo.jpg" alt="Logo" className="modal-logo" />
            <div>
              <h2 className="modal-title font-serif">Direct Booking &amp; Availability</h2>
              <p className="modal-subline">2 Bentley Bridge Cottages &bull; Upper Lumsdale, Matlock, DE4 5LB</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close booking modal">
            <X size={24} />
          </button>
        </div>

        {/* Multi-Step Indicator */}
        {step < 4 && (
          <div className="step-progress-bar">
            <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
              <span className="step-num">1</span>
              <span className="step-name">Dates &amp; Guests</span>
            </div>
            <div className="step-line"></div>
            <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
              <span className="step-num">2</span>
              <span className="step-name">Extras &amp; Hamper</span>
            </div>
            <div className="step-line"></div>
            <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
              <span className="step-num">3</span>
              <span className="step-name">Guest Details</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="booking-modal-body">

          {/* STEP 1: DATES & GUESTS */}
          {step === 1 && (
            <div className="step-content">
              <div className="step-grid">
                
                {/* Left: Input Selection */}
                <div className="step-left-form">
                  <h3 className="step-heading font-serif">Select Your Stay Dates</h3>
                  <p className="step-info">
                    Select your preferred arrival and departure dates. Minimum stay: 3 nights over weekends, 
                    or 4 nights midweek.
                  </p>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="modal-checkin" className="form-label">
                        <Calendar size={14} /> Check-in Date
                      </label>
                      <input 
                        type="date"
                        id="modal-checkin"
                        value={checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => setCheckIn(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="modal-checkout" className="form-label">
                        <Calendar size={14} /> Check-out Date
                      </label>
                      <input 
                        type="date"
                        id="modal-checkout"
                        value={checkOut}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        onChange={e => setCheckOut(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="modal-guests" className="form-label">
                        <Users size={14} /> Guests
                      </label>
                      <select 
                        id="modal-guests"
                        value={guests}
                        onChange={e => setGuests(parseInt(e.target.value))}
                        className="form-control"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests (Couple / Friends)</option>
                        <option value="3">3 Guests (Family)</option>
                        <option value="4">4 Guests (Max Capacity)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Dog size={14} /> Dog Friendly
                      </label>
                      <button
                        type="button"
                        onClick={() => setHasDog(!hasDog)}
                        className={`dog-select-pill ${hasDog ? 'selected' : ''}`}
                      >
                        {hasDog ? <Check size={16} /> : null}
                        <span>{hasDog ? 'Yes, bringing our dog' : 'No dogs'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="promo-box">
                    <label className="promo-label">Have a Special Offer / Promo Code?</label>
                    <div className="promo-input-row">
                      <input 
                        type="text" 
                        placeholder="e.g. AUTUMN15, DOGFREE" 
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        className="form-control uppercase"
                      />
                      <button 
                        type="button" 
                        onClick={handleApplyPromo} 
                        className="btn-secondary apply-btn"
                      >
                        {promoApplied ? 'Applied ✓' : 'Apply'}
                      </button>
                    </div>
                    {promoApplied && (
                      <span className="promo-success-text">
                        <Sparkles size={13} /> Special discount code activated!
                      </span>
                    )}
                  </div>

                  {/* Direct Booking Value Guarantee Box */}
                  <div className="direct-perks-box">
                    <div className="perks-title">
                      <ShieldCheck size={17} className="shield-icon" />
                      <span>Direct Booking Price &amp; Experience Guarantee</span>
                    </div>
                    <ul className="perks-bullets">
                      <li>Best Rate Guarantee (10-15% cheaper than Airbnb / Booking.com)</li>
                      <li>Complimentary Derbyshire Farmhouse Welcome Hamper</li>
                      <li>Zero service fees or hidden charges</li>
                      <li>Flexible 48-hour provisional hold while you organise travel</li>
                    </ul>
                  </div>

                </div>

                {/* Right: Stay Summary & Price Breakdown */}
                <div className="step-right-summary">
                  <div className="quote-card">
                    <div className="quote-card-header">
                      <span className="font-serif quote-title">Stay Summary</span>
                      <span className="property-rating-mini">★ 4.98 (48 reviews)</span>
                    </div>

                    {stayCalculation ? (
                      <div className="quote-body">
                        <div className="quote-dates-box">
                          <div>
                            <span className="qd-label">Check-in</span>
                            <span className="qd-val">{checkIn}</span>
                          </div>
                          <div className="qd-arrow">&rarr;</div>
                          <div>
                            <span className="qd-label">Check-out</span>
                            <span className="qd-val">{checkOut}</span>
                          </div>
                        </div>

                        <div className="quote-lines">
                          <div className="quote-line">
                            <span>£{stayCalculation.baseRatePerNight} &times; {stayCalculation.nights} nights</span>
                            <span>£{stayCalculation.subtotal}</span>
                          </div>

                          {hasDog && (
                            <div className="quote-line">
                              <span>Dog fee (up to 2 dogs)</span>
                              <span>{stayCalculation.dogFee === 0 ? 'FREE (Offer)' : `£${stayCalculation.dogFee}`}</span>
                            </div>
                          )}

                          {stayCalculation.discount > 0 && (
                            <div className="quote-line discount">
                              <span>Special Offer Discount</span>
                              <span>-£{stayCalculation.discount}</span>
                            </div>
                          )}

                          <div className="quote-line fee-zero">
                            <span>Booking &amp; Service Fee</span>
                            <span className="free-tag">£0 (Direct Booking)</span>
                          </div>

                          <div className="quote-line savings-line">
                            <span>Direct Booking Saving vs OTAs</span>
                            <span className="savings-val">Save ~£{stayCalculation.directSavings}</span>
                          </div>

                          <div className="quote-total-line">
                            <span className="total-label">Estimated Total</span>
                            <span className="total-amount">£{stayCalculation.total}</span>
                          </div>
                        </div>

                        <button 
                          onClick={handleStep1Next}
                          className="btn-primary w-full proceed-btn"
                        >
                          <span>Continue to Extras &amp; Preferences</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="quote-empty-state">
                        <Calendar size={32} className="empty-cal-icon" />
                        <p>Select your Check-in and Check-out dates above to view live pricing and availability.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 2: PREFERENCES & EXTRAS */}
          {step === 2 && (
            <div className="step-content">
              <h3 className="step-heading font-serif">Tailor Your Stay Experience</h3>
              <p className="step-info">
                Personalise your countryside stay at 2 Bentley Bridge Cottages. No extra fees for welcome hampers.
              </p>

              <div className="extras-selection-grid">
                
                {/* Hamper Selection */}
                <div className="extra-item-card">
                  <div className="extra-header">
                    <Coffee size={22} className="extra-icon" />
                    <div>
                      <h4>Complimentary Welcome Hamper</h4>
                      <p>Included with all direct bookings at no extra charge.</p>
                    </div>
                  </div>
                  <div className="radio-options-list">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="hamper" 
                        value="Derbyshire Artisan Sweet & Savoury"
                        checked={hamperChoice === 'Derbyshire Artisan Sweet & Savoury'}
                        onChange={e => setHamperChoice(e.target.value)}
                      />
                      <span>Traditional Derbyshire (Local oatcakes, farm butter, local honey &amp; artisan cider)</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="hamper" 
                        value="Breakfast & Bakery Hamper"
                        checked={hamperChoice === 'Breakfast & Bakery Hamper'}
                        onChange={e => setHamperChoice(e.target.value)}
                      />
                      <span>Artisan Breakfast &amp; Bakery (Fresh sourdough loaf, local preserves, fresh eggs &amp; tea)</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="hamper" 
                        value="Vegan & Gluten Free Hamper"
                        checked={hamperChoice === 'Vegan & Gluten Free Hamper'}
                        onChange={e => setHamperChoice(e.target.value)}
                      />
                      <span>Vegan &amp; Gluten-Free Country Selection</span>
                    </label>
                  </div>
                </div>

                {/* Extra Firewood */}
                <div className="extra-item-card">
                  <div className="extra-header">
                    <Flame size={22} className="extra-icon" />
                    <div>
                      <h4>Kiln-Dried Hardwood Firewood Bundle</h4>
                      <p>Starter crate and kindling are always free. Add an extra winter stockpile.</p>
                    </div>
                  </div>
                  <div className="checkbox-option">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox"
                        checked={extraLogs}
                        onChange={e => setExtraLogs(e.target.checked)}
                      />
                      <span>Add extra large crate of seasoned logs &amp; natural firelighters (+£15)</span>
                    </label>
                  </div>
                </div>

                {/* Late Check-out */}
                <div className="extra-item-card">
                  <div className="extra-header">
                    <Clock size={22} className="extra-icon" />
                    <div>
                      <h4>Lazy Sunday / Late Check-out</h4>
                      <p>Standard checkout is 10:00 AM. Extend your relaxation until 1:00 PM.</p>
                    </div>
                  </div>
                  <div className="checkbox-option">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox"
                        checked={lateCheckout}
                        onChange={e => setLateCheckout(e.target.checked)}
                      />
                      <span>Extend check-out to 1:00 PM (+£25, subject to housekeeping schedule)</span>
                    </label>
                  </div>
                </div>

              </div>

              <div className="step-actions-footer">
                <button onClick={() => setStep(1)} className="btn-secondary">
                  Back to Dates
                </button>
                <button onClick={handleStep2Next} className="btn-primary">
                  <span>Continue to Guest Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST DETAILS & DIRECT ENQUIRY */}
          {step === 3 && (
            <div className="step-content">
              <h3 className="step-heading font-serif">Confirm Your Direct Booking Enquiry</h3>
              <p className="step-info">
                We confirm all direct enquiries within 2 hours. No immediate payment taken today — 
                your dates are provisionally held while we confirm details.
              </p>

              <form onSubmit={handleSubmitEnquiry} className="guest-details-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="form-control"
                      placeholder="e.g. Eleanor"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="form-control"
                      placeholder="e.g. Bennett"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="e.g. eleanor@example.co.uk"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Phone / WhatsApp *</label>
                    <input 
                      type="tel" 
                      required 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="form-control"
                      placeholder="e.g. 07700 900123"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Requests, Dog Breed or Occasion (Optional)</label>
                  <textarea 
                    rows="3"
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    className="form-control"
                    placeholder="e.g. Celebrating a wedding anniversary; travelling with 1 friendly Labrador; need cot set up."
                  ></textarea>
                </div>

                <div className="booking-review-pill">
                  <CheckCircle2 size={16} className="pill-check" />
                  <span>
                    Booking for <strong>{stayCalculation ? stayCalculation.nights : 3} nights</strong> ({checkIn} to {checkOut}), 
                    {guests} guests {hasDog ? '+ Dog' : ''} &bull; Total: <strong>£{stayCalculation ? stayCalculation.total : 495}</strong>
                  </span>
                </div>

                <div className="step-actions-footer">
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary">
                    Back to Extras
                  </button>
                  <button type="submit" className="btn-primary submit-enquiry-btn">
                    <Sparkles size={16} />
                    <span>Send Direct Booking Enquiry</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: ENQUIRY CONFIRMED */}
          {step === 4 && (
            <div className="step-content success-view">
              <div className="success-icon-badge">
                <Check size={40} />
              </div>
              <h3 className="success-title font-serif">Your Cottage Enquiry is Received!</h3>
              <div className="ref-code-box">
                <span className="ref-label">Enquiry Reference Number:</span>
                <span className="ref-code font-serif">{bookingRef}</span>
              </div>
              <p className="success-desc">
                Thank you, <strong>{firstName}</strong>. We have sent a confirmation email to <strong>{email}</strong>. 
                Your requested dates ({checkIn} to {checkOut}) have been provisionally placed on hold.
              </p>

              <div className="next-steps-card">
                <h4>What happens next?</h4>
                <ol>
                  <li>Our cottage manager will review your request and confirm availability within 2 hours.</li>
                  <li>You will receive a direct booking confirmation with payment link (credit card, debit, bank transfer).</li>
                  <li>7 days prior to arrival, full check-in guides, key safe code, and valley directions will be sent.</li>
                </ol>
              </div>

              <div className="concierge-contact-row">
                <a href="https://wa.me/441629828450" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <MessageSquare size={16} /> Chat on WhatsApp
                </a>
                <a href="tel:+441629828450" className="btn-secondary">
                  <Phone size={16} /> Call Cottage Concierge (01629 828 450)
                </a>
                <button onClick={onClose} className="btn-primary">
                  Return to Website
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      <style>{`
        .booking-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 150;
          background-color: rgba(34, 50, 61, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.2rem;
          overflow-y: auto;
        }

        .booking-modal-window {
          background-color: var(--bg-cream);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 960px;
          max-height: 92vh;
          overflow-y: auto;
          box-shadow: var(--shadow-xl);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .booking-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.4rem 2rem;
          background-color: #FFFFFF;
          border-bottom: 1px solid var(--color-sand);
        }

        .modal-header-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .modal-logo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid var(--color-sand);
          object-fit: cover;
        }

        .modal-title {
          font-size: 1.4rem;
          color: var(--color-primary);
          line-height: 1.15;
        }

        .modal-subline {
          font-size: 0.78rem;
          color: var(--color-sage);
          font-weight: 600;
        }

        .modal-close-btn {
          color: var(--color-primary);
          padding: 0.4rem;
          border-radius: 50%;
        }

        .modal-close-btn:hover {
          background-color: var(--bg-cream);
        }

        /* Step Progress */
        .step-progress-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1rem 2rem;
          background-color: rgba(213, 202, 174, 0.25);
          border-bottom: 1px solid var(--color-sand);
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-text-muted);
        }

        .step-item.active {
          color: var(--color-primary);
        }

        .step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--color-sand);
          color: var(--color-text-body);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }

        .step-item.active .step-num {
          background-color: var(--color-primary);
          color: #FFFFFF;
        }

        .step-line {
          width: 40px;
          height: 1px;
          background-color: var(--color-sand);
        }

        .booking-modal-body {
          padding: 2.2rem 2.2rem;
          flex: 1;
        }

        .step-heading {
          font-size: 1.8rem;
          color: var(--color-primary);
          margin-bottom: 0.4rem;
        }

        .step-info {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          margin-bottom: 1.8rem;
        }

        .step-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 2.2rem;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
          margin-bottom: 1.2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-primary);
        }

        .form-control {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: var(--color-text-body);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .form-control:focus {
          border-color: var(--color-primary);
        }

        .form-control.uppercase {
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .dog-select-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          height: 48px;
          border-radius: var(--radius-sm);
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-body);
          cursor: pointer;
        }

        .dog-select-pill.selected {
          background-color: var(--color-sage-bg);
          border-color: var(--color-sage);
          color: var(--color-olive);
        }

        /* Promo Box */
        .promo-box {
          background: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-sm);
          padding: 1rem;
          margin-bottom: 1.4rem;
        }

        .promo-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
        }

        .promo-input-row {
          display: flex;
          gap: 0.6rem;
        }

        .apply-btn {
          padding: 0.6rem 1.1rem;
          font-size: 0.85rem;
        }

        .promo-success-text {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: #2F6F4E;
          font-weight: 600;
          margin-top: 0.4rem;
        }

        /* Direct Perks Box */
        .direct-perks-box {
          background-color: rgba(255, 255, 255, 0.6);
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-sm);
          padding: 1.1rem;
        }

        .perks-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.6rem;
        }

        .shield-icon {
          color: var(--color-sage);
        }

        .perks-bullets {
          list-style-type: disc;
          padding-left: 1.2rem;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        /* Quote Summary Card */
        .quote-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 1.6rem;
          box-shadow: var(--shadow-sm);
        }

        .quote-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--color-sand);
          margin-bottom: 1.2rem;
        }

        .quote-title {
          font-size: 1.3rem;
          color: var(--color-primary);
        }

        .property-rating-mini {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-primary);
          background: var(--bg-cream);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .quote-dates-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-cream);
          padding: 0.8rem 1rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.2rem;
        }

        .qd-label {
          display: block;
          font-size: 0.72rem;
          text-transform: uppercase;
          color: var(--color-sage);
          font-weight: 700;
        }

        .qd-val {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-body);
        }

        .qd-arrow {
          color: var(--color-sand);
          font-size: 1.2rem;
        }

        .quote-lines {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
        }

        .quote-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.88rem;
          color: var(--color-text-body);
        }

        .quote-line.discount {
          color: #2F6F4E;
          font-weight: 600;
        }

        .free-tag {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-sage);
        }

        .savings-line {
          background-color: var(--color-sage-bg);
          padding: 0.4rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-olive);
        }

        .savings-val {
          font-weight: 700;
        }

        .quote-total-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 2px solid var(--color-sand);
          margin-top: 0.5rem;
        }

        .total-label {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .total-amount {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-primary);
          font-family: var(--font-serif);
        }

        .proceed-btn {
          margin-top: 1rem;
          padding: 0.85rem;
        }

        .quote-empty-state {
          text-align: center;
          padding: 2.5rem 1rem;
          color: var(--color-text-muted);
        }

        .empty-cal-icon {
          color: var(--color-sand);
          margin: 0 auto 0.8rem auto;
        }

        /* Step 2 Extras */
        .extras-selection-grid {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          margin-bottom: 2rem;
        }

        .extra-item-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 1.4rem;
        }

        .extra-header {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }

        .extra-icon {
          color: var(--color-sage);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .extra-header h4 {
          font-size: 1.15rem;
          color: var(--color-primary);
          margin-bottom: 0.2rem;
        }

        .extra-header p {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .radio-options-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .radio-label, .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: var(--color-text-body);
          cursor: pointer;
        }

        .step-actions-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-sand);
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Step 3 Form */
        .booking-review-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          padding: 0.8rem 1.2rem;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          color: var(--color-text-body);
          margin-bottom: 1.5rem;
        }

        .pill-check {
          color: var(--color-sage);
          flex-shrink: 0;
        }

        /* Step 4 Success */
        .success-view {
          text-align: center;
          max-width: 680px;
          margin: 0 auto;
          padding: 1rem 0;
        }

        .success-icon-badge {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: var(--color-sage-bg);
          color: var(--color-olive);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.4rem auto;
        }

        .success-title {
          font-size: 2.2rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .ref-code-box {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background-color: #FFFFFF;
          border: 1px dashed var(--color-stone);
          padding: 0.6rem 1.4rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.2rem;
        }

        .ref-label {
          font-size: 0.82rem;
          text-transform: uppercase;
          color: var(--color-sage);
          font-weight: 700;
        }

        .ref-code {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .success-desc {
          font-size: 0.96rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .next-steps-card {
          text-align: left;
          background-color: #FFFFFF;
          border: 1px solid var(--color-sand);
          border-radius: var(--radius-md);
          padding: 1.6rem;
          margin-bottom: 2rem;
        }

        .next-steps-card h4 {
          font-size: 1.15rem;
          color: var(--color-primary);
          margin-bottom: 0.8rem;
        }

        .next-steps-card ol {
          padding-left: 1.2rem;
          font-size: 0.88rem;
          color: var(--color-text-body);
          line-height: 1.65;
        }

        .concierge-contact-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 800px) {
          .step-grid {
            grid-template-columns: 1fr;
          }
          .booking-modal-body {
            padding: 1.5rem 1.2rem;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .booking-modal-backdrop {
            padding: 0;
            align-items: flex-end;
          }
          .booking-modal-window {
            max-height: 96vh;
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          }
          .booking-modal-header {
            padding: 1rem 1.2rem;
          }
          .modal-logo {
            width: 38px;
            height: 38px;
          }
          .modal-title {
            font-size: 1.15rem;
          }
          .modal-subline {
            display: none;
          }
          .step-progress-bar {
            padding: 0.75rem 1rem;
            gap: 0.5rem;
          }
          .step-name {
            display: none;
          }
          .calendar-month {
            padding: 0.6rem;
          }
          .calendar-day {
            font-size: 0.78rem;
          }
          .step-actions {
            flex-direction: column;
            gap: 0.6rem;
          }
          .step-actions button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
