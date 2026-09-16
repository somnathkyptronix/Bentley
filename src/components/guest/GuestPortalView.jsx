import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, ShieldCheck, Phone, Mail, MapPin, Sparkles, 
  ChevronRight, ArrowLeft, Printer, RefreshCw, XCircle, CheckCircle,
  Package, AlertTriangle, ExternalLink, LogOut, Info, HeartHandshake
} from 'lucide-react';
import { extrasService } from '../../services/extrasService';

export default function GuestPortalView({ onReturnToHome, onLogout, onBrowseExtras }) {
  const [session, setSession] = useState(extrasService.getGuestSession());
  const [bookings, setBookings] = useState(extrasService.getBookings());
  const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'completed' | 'cancelled'
  const [notification, setNotification] = useState(null);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    const unsub = extrasService.subscribe(() => {
      setSession(extrasService.getGuestSession());
      setBookings(extrasService.getBookings());
    });
    return unsub;
  }, []);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Filter bookings for this guest session
  // If guest has a bookingRef, match by ref or guest name, or show all if demo
  const guestBookings = bookings.filter(b => {
    if (!session?.bookingRef) return true;
    if (b.bookingRef === session.bookingRef) return true;
    // For demo convenience, include all recent bookings if list is small
    return true;
  });

  const filteredBookings = guestBookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return b.status === 'Confirmed' || b.status === 'Scheduled' || b.status === 'In Progress';
    if (filter === 'completed') return b.status === 'Completed';
    if (filter === 'cancelled') return b.status === 'Cancelled';
    return true;
  });

  const totalSpent = guestBookings
    .filter(b => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const activeCount = guestBookings.filter(b => 
    b.status === 'Confirmed' || b.status === 'Scheduled' || b.status === 'In Progress'
  ).length;

  const handleCancelBooking = (bookingId) => {
    const res = extrasService.cancelBooking(bookingId, cancelReason || 'Guest requested cancellation via Concierge Hub');
    if (res.success) {
      showToast('Booking cancelled successfully. Refund will be processed as per policy.', 'info');
      setCancelModalBooking(null);
      setCancelReason('');
    } else {
      showToast(res.error || 'Failed to cancel booking.', 'error');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="eys-guest-app">
      {/* Top Notification Toast */}
      {notification && (
        <div className={`eys-admin-toast ${notification.type === 'error' ? 'toast-err' : 'toast-ok'}`} style={{ zIndex: 9999 }}>
          {notification.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* GUEST PORTAL TOPBAR */}
      <header className="eys-guest-topbar">
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img 
              src="/logo.jpg" 
              alt="Bentley Bridge Cottages" 
              style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #c5a880', objectFit: 'cover' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 className="font-serif" style={{ fontSize: '1.25rem', color: '#fff', margin: 0, fontWeight: 600 }}>
                  2 BENTLEY BRIDGE
                </h1>
                <span className="eys-badge-gold">Guest Concierge</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#c5a880', margin: 0, letterSpacing: '0.08em' }}>
                Lumsdale Valley &bull; Peak District Stay
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button 
              onClick={onReturnToHome} 
              className="eys-btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Cottage Website</span>
            </button>

            <button 
              onClick={handlePrint}
              className="eys-btn-ghost"
              title="Print Itinerary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}
            >
              <Printer size={16} />
              <span className="hide-mobile">Print Itinerary</span>
            </button>

            <button 
              onClick={onLogout} 
              className="eys-btn-danger-outline"
              title="Sign Out"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}
            >
              <LogOut size={16} />
              <span className="hide-mobile">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="container-wide eys-guest-body">
        {/* WELCOME BANNER */}
        <section className="eys-guest-welcome-card">
          <div className="eys-guest-welcome-content">
            <div className="eys-guest-tag">
              <Sparkles size={14} />
              <span>Personalized Stay Concierge</span>
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.9rem', color: '#fff', margin: '8px 0 6px' }}>
              Welcome back, {session?.guestName || 'Guest'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', maxWidth: 650, lineHeight: 1.6, margin: 0 }}>
              Manage your confirmed experiences, property extras, bespoke dining, and local tours for your stay at <strong>2 Bentley Bridge Cottages</strong>. All arrangements are synced directly with cottage management.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
              <div className="eys-guest-ref-chip">
                <span style={{ color: '#c5a880', fontSize: '0.75rem', textTransform: 'uppercase' }}>Booking Ref:</span>
                <strong>{session?.bookingRef || 'BB-2026-STAY'}</strong>
              </div>
              <div className="eys-guest-ref-chip">
                <span style={{ color: '#c5a880', fontSize: '0.75rem', textTransform: 'uppercase' }}>Key Safe Code:</span>
                <strong>Sent 48h prior (SMS)</strong>
              </div>
              <div className="eys-guest-ref-chip">
                <span style={{ color: '#c5a880', fontSize: '0.75rem', textTransform: 'uppercase' }}>Wi-Fi Access:</span>
                <strong>BentleyBridge_Guest (Password: Lumsdale2026)</strong>
              </div>
            </div>
          </div>

          {/* QUICK CTA */}
          <div className="eys-guest-welcome-actions">
            <button 
              onClick={onBrowseExtras}
              className="eys-btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 22px', fontSize: '0.95rem' }}
            >
              <Sparkles size={18} />
              <span>Book More Extras</span>
            </button>
            <a 
              href="tel:+441629884210" 
              className="eys-btn-outline" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px', fontSize: '0.85rem' }}
            >
              <Phone size={16} />
              <span>Concierge: +44 (0)1629 884210</span>
            </a>
          </div>
        </section>

        {/* METRICS ROW */}
        <section className="eys-guest-metrics-row">
          <div className="eys-guest-stat-card">
            <div className="eys-stat-icon-wrap" style={{ background: 'rgba(197, 168, 128, 0.15)', color: '#c5a880' }}>
              <Package size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Active Extras</span>
              <h3 style={{ fontSize: '1.6rem', color: '#144231', margin: '2px 0 0', fontWeight: 700 }}>{activeCount}</h3>
            </div>
          </div>

          <div className="eys-guest-stat-card">
            <div className="eys-stat-icon-wrap" style={{ background: 'rgba(20, 66, 49, 0.12)', color: '#144231' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Extras Value</span>
              <h3 style={{ fontSize: '1.6rem', color: '#144231', margin: '2px 0 0', fontWeight: 700 }}>£{totalSpent.toFixed(2)}</h3>
            </div>
          </div>

          <div className="eys-guest-stat-card">
            <div className="eys-stat-icon-wrap" style={{ background: 'rgba(46, 125, 50, 0.12)', color: '#2e7d32' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Stay Assurance</span>
              <h3 style={{ fontSize: '1.2rem', color: '#2e7d32', margin: '4px 0 0', fontWeight: 600 }}>100% Guaranteed</h3>
            </div>
          </div>

          <div className="eys-guest-stat-card">
            <div className="eys-stat-icon-wrap" style={{ background: 'rgba(230, 81, 0, 0.12)', color: '#e65100' }}>
              <Clock size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Check-in Arrival</span>
              <h3 style={{ fontSize: '1.2rem', color: '#144231', margin: '4px 0 0', fontWeight: 600 }}>From 16:00 PM</h3>
            </div>
          </div>
        </section>

        {/* BOOKINGS LIST SECTION */}
        <section className="eys-guest-bookings-section">
          <div className="eys-guest-section-header">
            <div>
              <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#144231', margin: 0 }}>
                Your Booked Experiences & Services
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#666', margin: '4px 0 0' }}>
                Review schedule, delivery notes, meeting locations, and cottage fulfillment details.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="eys-filter-tabs">
              <button 
                className={`eys-filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({guestBookings.length})
              </button>
              <button 
                className={`eys-filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
                onClick={() => setFilter('upcoming')}
              >
                Upcoming / Active ({activeCount})
              </button>
              <button 
                className={`eys-filter-tab ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed ({guestBookings.filter(b => b.status === 'Completed').length})
              </button>
              <button 
                className={`eys-filter-tab ${filter === 'cancelled' ? 'active' : ''}`}
                onClick={() => setFilter('cancelled')}
              >
                Cancelled ({guestBookings.filter(b => b.status === 'Cancelled').length})
              </button>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="eys-guest-empty-state">
              <div className="eys-empty-icon-wrap">
                <Package size={36} color="#c5a880" />
              </div>
              <h4 className="font-serif" style={{ fontSize: '1.3rem', color: '#144231', margin: '12px 0 6px' }}>
                No extras found in this category
              </h4>
              <p style={{ color: '#666', fontSize: '0.9rem', maxWidth: 460, margin: '0 auto 20px' }}>
                You have not booked any items in this view. Browse our bespoke offerings to arrange electric bikes, firewood bundles, or private chef dining!
              </p>
              <button onClick={onBrowseExtras} className="eys-btn-primary" style={{ padding: '12px 24px' }}>
                Explore Experiences & Extras
              </button>
            </div>
          ) : (
            <div className="eys-guest-cards-grid">
              {filteredBookings.map((b) => {
                const isCancelled = b.status === 'Cancelled';
                const isCompleted = b.status === 'Completed';
                const isCanCancel = !isCancelled && !isCompleted;

                return (
                  <div key={b.id} className={`eys-guest-card ${isCancelled ? 'eys-card-cancelled' : ''}`}>
                    {/* Header Row */}
                    <div className="eys-guest-card-header">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                          <span className={`eys-badge-status eys-status-${(b.status || '').toLowerCase().replace(' ', '-')}`}>
                            {b.status || 'Confirmed'}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#888' }}>
                            Ref: <strong>{b.id}</strong>
                          </span>
                        </div>
                        <h4 className="font-serif" style={{ fontSize: '1.25rem', color: '#144231', margin: 0, fontWeight: 600 }}>
                          {b.serviceName || b.serviceId || 'Property Extra'}
                        </h4>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#144231' }}>
                          £{Number(b.totalAmount || 0).toFixed(2)}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: 500 }}>
                          {b.paymentStatus === 'Paid' ? '✓ Paid Online' : 'Settlement on Arrival'}
                        </span>
                      </div>
                    </div>

                    {/* Meta Row: Date, Time, Location */}
                    <div className="eys-guest-meta-grid">
                      <div className="eys-guest-meta-item">
                        <Calendar size={15} color="#c5a880" />
                        <div>
                          <span style={{ fontSize: '0.72rem', color: '#888' }}>Scheduled Date</span>
                          <strong style={{ display: 'block', fontSize: '0.85rem', color: '#333' }}>
                            {b.date ? new Date(b.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible / Check-in'}
                          </strong>
                        </div>
                      </div>

                      <div className="eys-guest-meta-item">
                        <Clock size={15} color="#c5a880" />
                        <div>
                          <span style={{ fontSize: '0.72rem', color: '#888' }}>Start / Delivery Time</span>
                          <strong style={{ display: 'block', fontSize: '0.85rem', color: '#333' }}>
                            {b.time || 'Prepared before arrival'}
                          </strong>
                        </div>
                      </div>

                      <div className="eys-guest-meta-item">
                        <MapPin size={15} color="#c5a880" />
                        <div>
                          <span style={{ fontSize: '0.72rem', color: '#888' }}>Meeting / Drop-off</span>
                          <strong style={{ display: 'block', fontSize: '0.85rem', color: '#333' }}>
                            {b.location || '2 Bentley Bridge Cottages (Hearth / Patio)'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Items Breakdown */}
                    {b.items && b.items.length > 0 && (
                      <div className="eys-guest-items-box">
                        <span style={{ fontSize: '0.75rem', color: '#777', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                          Selected Package Details
                        </span>
                        <ul style={{ margin: '6px 0 0', paddingLeft: 18, fontSize: '0.85rem', color: '#444' }}>
                          {b.items.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: 4 }}>
                              <strong>{item.qty || item.quantity || 1}x {item.name || item.title}</strong>
                              {item.duration ? ` (${item.duration})` : ''}
                              {item.selectedExtras ? ` &bull; Extras: ${item.selectedExtras.join(', ')}` : ''}
                              {item.options ? ` &bull; ${item.options}` : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Special Notes & Fulfillment Instructions */}
                    {b.specialRequests && (
                      <div style={{ background: '#fcfbf7', padding: '10px 14px', borderRadius: 8, border: '1px solid #ebd9c5', fontSize: '0.82rem', color: '#555', marginTop: 10 }}>
                        <strong style={{ color: '#144231' }}>Guest Requests: </strong>
                        {b.specialRequests}
                      </div>
                    )}

                    {/* Supplier Dispatch Info */}
                    <div className="eys-guest-supplier-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#555' }}>
                        <HeartHandshake size={16} color="#c5a880" />
                        <span>Fulfilled by: <strong>{b.supplierName || 'Bentley Bridge Operations'}</strong></span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {b.supplierPhone && (
                          <a 
                            href={`tel:${b.supplierPhone}`} 
                            style={{ color: '#144231', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'underline' }}
                          >
                            <Phone size={13} />
                            <span>{b.supplierPhone}</span>
                          </a>
                        )}

                        {isCanCancel && (
                          <button 
                            onClick={() => setCancelModalBooking(b)} 
                            className="eys-btn-cancel-link"
                            title="Review cancellation terms"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* COTTAGE CONCIERGE ASSISTANCE CARD */}
        <section className="eys-guest-help-card">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ background: 'rgba(197, 168, 128, 0.2)', padding: 12, borderRadius: 12, color: '#144231' }}>
              <Info size={28} />
            </div>
            <div>
              <h4 className="font-serif" style={{ fontSize: '1.25rem', color: '#144231', margin: '0 0 6px' }}>
                Need Help or Custom Itinerary Requests?
              </h4>
              <p style={{ color: '#555', fontSize: '0.88rem', margin: 0, lineHeight: 1.6, maxWidth: 680 }}>
                Our local Matlock concierge team is available seven days a week to arrange private transport, secure sold-out restaurant tables, adjust scheduled e-bike delivery times, or add special champagne and celebration touches before you unlock the door.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14 }}>
                <a href="tel:+441629884210" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#144231', fontWeight: 600, fontSize: '0.88rem' }}>
                  <Phone size={15} color="#c5a880" />
                  <span>+44 (0) 1629 884210</span>
                </a>
                <a href="mailto:stay@bentleybridge.co.uk" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#144231', fontWeight: 600, fontSize: '0.88rem' }}>
                  <Mail size={15} color="#c5a880" />
                  <span>stay@bentleybridge.co.uk</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CANCELLATION MODAL */}
      {cancelModalBooking && (
        <div className="eys-modal-backdrop" onClick={() => setCancelModalBooking(null)}>
          <div className="eys-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div className="eys-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertTriangle color="#c62828" size={22} />
                <h3 className="font-serif" style={{ margin: 0, fontSize: '1.3rem', color: '#144231' }}>
                  Cancel Service Booking
                </h3>
              </div>
              <button className="eys-btn-close" onClick={() => setCancelModalBooking(null)}>&times;</button>
            </div>

            <div className="eys-modal-body" style={{ padding: '20px 24px' }}>
              <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.5, marginTop: 0 }}>
                Are you sure you wish to cancel <strong>{cancelModalBooking.serviceName || cancelModalBooking.serviceId}</strong> (Ref: {cancelModalBooking.id})?
              </p>

              <div style={{ background: '#fdf7f4', borderLeft: '3px solid #e65100', padding: '10px 14px', borderRadius: 4, margin: '14px 0', fontSize: '0.82rem', color: '#666' }}>
                <strong>Cottage Cancellation Policy:</strong> Cancellations made at least 48 hours before scheduled start receive a 100% refund. Cancellations inside 48 hours are subject to partner supplier confirmation.
              </div>

              <div className="eys-form-group">
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#333', display: 'block', marginBottom: 6 }}>
                  Reason for Cancellation (Optional)
                </label>
                <textarea 
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Schedule change, weather concerns, etc."
                  rows={3}
                  className="eys-input"
                  style={{ width: '100%', resize: 'none' }}
                />
              </div>
            </div>

            <div className="eys-modal-footer" style={{ padding: '16px 24px', background: '#fbfaf7', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button 
                onClick={() => setCancelModalBooking(null)} 
                className="eys-btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Keep Booking
              </button>
              <button 
                onClick={() => handleCancelBooking(cancelModalBooking.id)} 
                className="eys-btn-danger"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
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
