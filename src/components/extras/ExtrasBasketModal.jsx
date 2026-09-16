import React, { useState, useEffect } from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, CheckCircle2, Calendar, ShoppingBag, CreditCard } from 'lucide-react';
import { extrasService } from '../../services/extrasService';

export default function ExtrasBasketModal({ 
  isOpen, 
  onClose, 
  onOpenGuestDashboard 
}) {
  if (!isOpen) return null;

  const [basket, setBasket] = useState(extrasService.getBasket());
  const [step, setStep] = useState('basket'); // basket | checkout | success
  const [guestName, setGuestName] = useState('Sarah Jenkins');
  const [guestEmail, setGuestEmail] = useState('sarah.jenkins@example.com');
  const [guestPhone, setGuestPhone] = useState('+44 7700 900123');
  const [bookingRef, setBookingRef] = useState('BB-2026-8492');
  const [paymentMethod, setPaymentMethod] = useState('card'); // card | cottage_bill
  const [confirmedBookings, setConfirmedBookings] = useState([]);

  // Subscribe to basket changes
  useEffect(() => {
    const unsubscribe = extrasService.subscribe(() => {
      setBasket(extrasService.getBasket());
    });
    return unsubscribe;
  }, []);

  const subtotal = extrasService.getBasketSubtotal();

  const handleUpdateQty = (basketId, newQty) => {
    extrasService.updateBasketQuantity(basketId, newQty);
  };

  const handleRemove = (basketId) => {
    extrasService.removeFromBasket(basketId);
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const result = extrasService.checkout({
      name: guestName,
      email: guestEmail,
      phone: guestPhone,
      bookingRef: bookingRef
    });
    setConfirmedBookings(result || []);
    setStep('success');
  };

  return (
    <div className="eys-modal-backdrop" onClick={onClose}>
      <div className="eys-modal-window eys-basket-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* MODAL HEADER */}
        <div className="eys-modal-header">
          <div>
            <span className="eys-eyebrow">STAY EXTRAS BASKET</span>
            <h3 className="eys-modal-title">
              {step === 'basket' && 'Your Selected Extras'}
              {step === 'checkout' && 'Guest & Payment Details'}
              {step === 'success' && 'Booking Confirmed!'}
            </h3>
          </div>
          <button onClick={onClose} className="eys-modal-close-btn" aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="eys-modal-body">

          {/* STEP 1: BASKET ITEMS REVIEW */}
          {step === 'basket' && (
            <div>
              {basket.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <ShoppingBag size={48} style={{ color: 'var(--eys-gold)', margin: '0 auto 16px auto' }} />
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--eys-forest)', marginBottom: 8 }}>Your stay basket is empty</h4>
                  <p style={{ color: 'var(--eys-text-muted)', fontSize: '0.92rem', marginBottom: 20 }}>
                    Browse our curated property extras, guided tours, local groceries and private chefs to enhance your Peak District holiday.
                  </p>
                  <button className="eys-btn-primary" onClick={onClose}>
                    Explore Services
                  </button>
                </div>
              ) : (
                <div>
                  <div className="eys-basket-items-list">
                    {basket.map(item => (
                      <div key={item.basketId} className="eys-basket-item">
                        <div style={{ flexGrow: 1, paddingRight: 12 }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: 'var(--eys-forest)' }}>
                            {item.name}
                          </h4>
                          <div style={{ fontSize: '0.8rem', color: 'var(--eys-text-muted)', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {item.timeSlot && <span>⏱ {item.timeSlot}</span>}
                            {item.bookingDate && <span>📅 {item.bookingDate}</span>}
                            {item.deliveryLocation && <span>📍 {item.deliveryLocation}</span>}
                          </div>
                          <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--eys-gold)', marginTop: 6, display: 'inline-block' }}>
                            £{item.price * item.quantity} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--eys-text-muted)' }}>(£{item.price} each)</span>
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div className="eys-stepper">
                            <button className="eys-stepper-btn" onClick={() => handleUpdateQty(item.basketId, item.quantity - 1)}>-</button>
                            <span className="eys-stepper-val">{item.quantity}</span>
                            <button className="eys-stepper-btn" onClick={() => handleUpdateQty(item.basketId, item.quantity + 1)}>+</button>
                          </div>

                          <button 
                            onClick={() => handleRemove(item.basketId)} 
                            style={{ background: 'none', border: 'none', color: '#c62828', cursor: 'pointer', padding: 4 }}
                            title="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PRICE SUMMARY */}
                  <div className="eys-basket-summary">
                    <div className="eys-summary-row">
                      <span>Extras Subtotal</span>
                      <span>£{subtotal}</span>
                    </div>
                    <div className="eys-summary-row">
                      <span>Cottage Delivery &amp; Setup</span>
                      <span style={{ color: '#2e7d32', fontWeight: 600 }}>FREE</span>
                    </div>
                    <div className="eys-summary-row total">
                      <span>Total to Pay</span>
                      <span>£{subtotal}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                    <button className="eys-btn-outline" onClick={() => extrasService.clearBasket()}>
                      Clear Basket
                    </button>
                    <button className="eys-btn-primary" onClick={() => setStep('checkout')}>
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: CHECKOUT & GUEST DETAILS */}
          {step === 'checkout' && (
            <form onSubmit={handleCompleteOrder}>
              <p style={{ marginBottom: 20, color: 'var(--eys-text-muted)', fontSize: '0.9rem' }}>
                Link these extras to your cottage stay so our housekeeping and local suppliers can prepare everything seamless for you.
              </p>

              <div className="eys-form-group">
                <label className="eys-form-label">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={guestName} 
                  onChange={(e) => setGuestName(e.target.value)} 
                  className="eys-input" 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="eys-form-group">
                  <label className="eys-form-label">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={guestEmail} 
                    onChange={(e) => setGuestEmail(e.target.value)} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    value={guestPhone} 
                    onChange={(e) => setGuestPhone(e.target.value)} 
                    className="eys-input" 
                  />
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Cottage Booking Reference (Optional)</label>
                <input 
                  type="text" 
                  value={bookingRef} 
                  onChange={(e) => setBookingRef(e.target.value)} 
                  className="eys-input" 
                  placeholder="e.g. BB-2026-STAY"
                />
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Payment Option</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, border: '1px solid var(--eys-border)', borderRadius: 8, cursor: 'pointer', background: paymentMethod === 'card' ? 'var(--eys-cream)' : '#fff' }}>
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')} 
                    />
                    <CreditCard size={18} style={{ color: 'var(--eys-forest)' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Pay Now Online (Debit / Credit Card / Apple Pay)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, border: '1px solid var(--eys-border)', borderRadius: 8, cursor: 'pointer', background: paymentMethod === 'cottage_bill' ? 'var(--eys-cream)' : '#fff' }}>
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'cottage_bill'} 
                      onChange={() => setPaymentMethod('cottage_bill')} 
                    />
                    <ShieldCheck size={18} style={{ color: 'var(--eys-forest)' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Charge to Cottage Reservation Balance</span>
                  </label>
                </div>
              </div>

              <div className="eys-basket-summary">
                <div className="eys-summary-row total">
                  <span>Total Due Today</span>
                  <span>£{subtotal}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <button type="button" className="eys-btn-outline" onClick={() => setStep('basket')}>
                  Back to Basket
                </button>
                <button type="submit" className="eys-btn-primary">
                  <span>Confirm &amp; Pay £{subtotal}</span>
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMATION & RECEIPT */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#e8f5e9',
                color: '#2e7d32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <CheckCircle2 size={34} />
              </div>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--eys-forest)', marginBottom: 6 }}>
                Your Extras are Confirmed!
              </h4>
              <p style={{ color: 'var(--eys-text-muted)', fontSize: '0.92rem', marginBottom: 20 }}>
                A digital confirmation has been emailed to <strong>{guestEmail}</strong> and linked to your reservation.
              </p>

              <div style={{ background: 'var(--eys-cream)', borderRadius: 10, padding: 16, textAlign: 'left', marginBottom: 24, fontSize: '0.86rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--eys-forest)', marginBottom: 8 }}>Confirmed Items:</div>
                <ul style={{ paddingLeft: 16, margin: 0, lineHeight: 1.7, color: 'var(--eys-text-main)' }}>
                  {confirmedBookings.map(b => (
                    <li key={b.id}>
                      <strong>{b.serviceName}</strong> — £{b.amountPaid} <span style={{ color: '#2e7d32', fontWeight: 600 }}>({b.id})</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button 
                  className="eys-btn-outline"
                  onClick={() => {
                    onClose();
                    setStep('basket');
                  }}
                >
                  Close
                </button>

                <button 
                  className="eys-btn-primary"
                  onClick={() => {
                    onClose();
                    setStep('basket');
                    if (onOpenGuestDashboard) onOpenGuestDashboard();
                  }}
                >
                  <span>View in Guest Dashboard</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
