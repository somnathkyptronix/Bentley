import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, MapPin, Phone, Mail, AlertTriangle, 
  CheckCircle2, XCircle, ChevronRight, PlusCircle, ShieldCheck, Download
} from 'lucide-react';
import { extrasService } from '../../services/extrasService';

export default function GuestDashboardModal({ 
  isOpen, 
  onClose, 
  onOpenExploreServices 
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming | completed | all
  const [bookings, setBookings] = useState(extrasService.getBookings());
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('Change of travel plans');

  useEffect(() => {
    const unsubscribe = extrasService.subscribe(() => {
      setBookings(extrasService.getBookings());
    });
    return unsubscribe;
  }, []);

  const upcomingBookings = extrasService.getUpcomingBookings();
  const completedBookings = extrasService.getCompletedBookings();

  const currentList = activeTab === 'upcoming' 
    ? upcomingBookings 
    : activeTab === 'completed' 
    ? completedBookings 
    : bookings;

  const handleConfirmCancel = () => {
    if (cancelModalBooking) {
      extrasService.cancelBooking(cancelModalBooking.id, cancelReason);
      setCancelModalBooking(null);
    }
  };

  return (
    <div className="eys-modal-backdrop" onClick={onClose}>
      <div className="eys-modal-window eys-guest-dashboard" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="eys-modal-header">
          <div>
            <span className="eys-eyebrow">GUEST CONCIERGE HUB</span>
            <h3 className="eys-modal-title">Extras &amp; Experiences</h3>
            <p className="eys-modal-subtitle">Manage your booked extras, view supplier instructions, and track schedules</p>
          </div>
          <button onClick={onClose} className="eys-modal-close-btn" aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="eys-modal-body">
          
          {/* TAB BAR */}
          <div className="eys-dashboard-tabs">
            <button 
              className={`eys-dtab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Extras ({upcomingBookings.length})
            </button>
            <button 
              className={`eys-dtab-btn ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed &amp; History ({completedBookings.length})
            </button>
            <button 
              className={`eys-dtab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Records ({bookings.length})
            </button>
          </div>

          {/* LIST OF BOOKINGS */}
          {currentList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', background: 'var(--eys-cream)', borderRadius: 12 }}>
              <CheckCircle2 size={44} style={{ color: 'var(--eys-gold)', margin: '0 auto 12px auto' }} />
              <h4 style={{ fontSize: '1.2rem', color: 'var(--eys-forest)', marginBottom: 6 }}>No bookings found in this view</h4>
              <p style={{ color: 'var(--eys-text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>
                You have not booked any extras in this category yet. Explore our curated local services to make the most of your stay.
              </p>
              <button 
                className="eys-btn-primary" 
                onClick={() => {
                  onClose();
                  if (onOpenExploreServices) onOpenExploreServices();
                }}
              >
                <span>Browse Extras &amp; Experiences</span>
                <ChevronRight size={15} />
              </button>
            </div>
          ) : (
            <div>
              {currentList.map(item => (
                <div key={item.id} className="eys-booking-card">
                  
                  {/* CARD HEADER */}
                  <div className="eys-booking-card-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--eys-forest)', fontFamily: 'var(--font-serif)' }}>
                          {item.serviceName}
                        </h4>
                        <span className={`eys-booking-badge ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--eys-text-muted)', fontWeight: 600 }}>
                        Ref: {item.id} &bull; Cottage Stay: {item.bookingRef || 'BB-2026-STAY'}
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className="eys-price-amount" style={{ fontSize: '1.2rem' }}>£{item.amountPaid}</span>
                      <span style={{ display: 'block', fontSize: '0.74rem', color: '#2e7d32', fontWeight: 600 }}>✓ Paid via Stay Portal</span>
                    </div>
                  </div>

                  {/* DETAILS GRID */}
                  <div className="eys-booking-details-grid">
                    <div className="eys-detail-item">
                      <span className="eys-detail-label">Scheduled Date &amp; Time</span>
                      <span className="eys-detail-val">{item.bookedDate} at {item.timeSlot}</span>
                    </div>

                    <div className="eys-detail-item">
                      <span className="eys-detail-label">Supplier / Host</span>
                      <span className="eys-detail-val">{item.supplierName}</span>
                    </div>

                    <div className="eys-detail-item">
                      <span className="eys-detail-label">Supplier Contact</span>
                      <span className="eys-detail-val">{item.supplierContact}</span>
                    </div>

                    <div className="eys-detail-item">
                      <span className="eys-detail-label">Meeting Point / Delivery</span>
                      <span className="eys-detail-val">{item.meetingPoint}</span>
                    </div>
                  </div>

                  {/* INSTRUCTIONS */}
                  {item.instructions && (
                    <div style={{ background: '#ffffff', border: '1px dashed var(--eys-border)', padding: '10px 14px', borderRadius: 8, fontSize: '0.84rem', color: 'var(--eys-text-main)' }}>
                      <strong>Specific Instructions:</strong> {item.instructions}
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--eys-text-muted)' }}>
                      Free cancellation up to 48 hours prior to service time.
                    </span>

                    <div style={{ display: 'flex', gap: 10 }}>
                      {item.status !== 'Cancelled' && (
                        <button 
                          className="eys-btn-outline"
                          style={{ color: '#c62828', borderColor: '#ffcdd2' }}
                          onClick={() => setCancelModalBooking(item)}
                        >
                          Cancel Booking
                        </button>
                      )}

                      <button 
                        className="eys-btn-outline" 
                        onClick={() => alert(`Receipt downloaded for ${item.id} - £${item.amountPaid}`)}
                        title="Download receipt"
                      >
                        <Download size={14} style={{ marginRight: 4 }} />
                        <span>Receipt</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="eys-modal-footer">
          <span style={{ fontSize: '0.86rem', color: 'var(--eys-text-muted)' }}>
            Need custom arrangements? Contact concierge at <strong>+44 1629 828450</strong>
          </span>

          <button 
            className="eys-btn-primary"
            onClick={() => {
              onClose();
              if (onOpenExploreServices) onOpenExploreServices();
            }}
          >
            <PlusCircle size={15} />
            <span>Add More Extras</span>
          </button>
        </div>

      </div>

      {/* CANCEL CONFIRMATION MODAL */}
      {cancelModalBooking && (
        <div className="eys-modal-backdrop" style={{ zIndex: 10001 }} onClick={() => setCancelModalBooking(null)}>
          <div className="eys-modal-window" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <div className="eys-modal-header" style={{ background: '#ffebee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertTriangle size={24} style={{ color: '#c62828' }} />
                <h4 style={{ margin: 0, color: '#c62828', fontSize: '1.2rem' }}>Cancel Extra Booking?</h4>
              </div>
              <button onClick={() => setCancelModalBooking(null)} className="eys-modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="eys-modal-body">
              <p style={{ color: 'var(--eys-text-main)', fontSize: '0.92rem', marginBottom: 14 }}>
                Are you sure you wish to cancel <strong>{cancelModalBooking.serviceName}</strong> (Ref: {cancelModalBooking.id})?
              </p>
              <p style={{ color: 'var(--eys-text-muted)', fontSize: '0.85rem', marginBottom: 18 }}>
                Your payment of <strong>£{cancelModalBooking.amountPaid}</strong> will be refunded to your original payment method within 3–5 working days in accordance with the 48-hour cancellation policy.
              </p>

              <div className="eys-form-group">
                <label className="eys-form-label">Reason for cancellation (optional)</label>
                <select value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} className="eys-select">
                  <option>Change of travel plans</option>
                  <option>Booked alternative date/time</option>
                  <option>Unfavourable weather forecast</option>
                  <option>Personal circumstances</option>
                </select>
              </div>
            </div>

            <div className="eys-modal-footer">
              <button className="eys-btn-outline" onClick={() => setCancelModalBooking(null)}>
                Keep Booking
              </button>
              <button 
                className="eys-btn-primary" 
                style={{ background: '#c62828' }} 
                onClick={handleConfirmCancel}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
