import React, { useState, useEffect } from 'react';
import { 
  X, Check, Plus, Trash2, Edit3, Settings, DollarSign, 
  Percent, AlertCircle, TrendingUp, Calendar, ShieldCheck, 
  ToggleLeft, ToggleRight, Layers, Package, Users
} from 'lucide-react';
import { extrasService } from '../../services/extrasService';

export default function AdminDashboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('overview'); // overview | bookings | products | services | settings
  const [adminConfig, setAdminConfig] = useState(extrasService.getAdminConfig());
  const [products, setProducts] = useState(extrasService.getPropertyExtras());
  const [bookings, setBookings] = useState(extrasService.getBookings());
  const [statusFilter, setStatusFilter] = useState('All');

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Wellness & Outdoor');
  const [newProdPrice, setNewProdPrice] = useState(25);
  const [newProdUnit, setNewProdUnit] = useState('per stay');
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('/web/sc_1786456245_1205377_27.webp');
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = extrasService.subscribe(() => {
      setAdminConfig(extrasService.getAdminConfig());
      setProducts(extrasService.getPropertyExtras());
      setBookings(extrasService.getBookings());
    });
    return unsubscribe;
  }, []);

  const metrics = extrasService.getAdminMetrics();

  const handleToggleService = (serviceId) => {
    extrasService.toggleService(serviceId);
  };

  const handleAddNewProduct = (e) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    extrasService.addPropertyExtra({
      name: newProdName,
      category: newProdCategory,
      price: Number(newProdPrice),
      unit: newProdUnit,
      stock: Number(newProdStock),
      desc: newProdDesc || 'Custom luxury extra amenity prepared for your stay.',
      image: newProdImage
    });

    setNewProdName('');
    setNewProdDesc('');
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 3000);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this property extra?')) {
      extrasService.deletePropertyExtra(id);
    }
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    extrasService.updateBookingStatus(bookingId, newStatus);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    extrasService.updateAdminConfig(adminConfig);
    alert('Admin configurations updated successfully!');
  };

  const filteredBookings = statusFilter === 'All'
    ? bookings
    : bookings.filter(b => b.status === statusFilter);

  return (
    <div className="eys-modal-backdrop" onClick={onClose}>
      <div className="eys-modal-window eys-admin-dashboard" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="eys-modal-header" style={{ background: '#0d291e', color: '#fff' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="eys-eyebrow" style={{ color: 'var(--eys-gold)', margin: 0 }}>ADMINISTRATION &amp; CONCIERGE</span>
              <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 999 }}>LIVE OPS</span>
            </div>
            <h3 className="eys-modal-title" style={{ color: '#fff' }}>Enhance Stay Management Portal</h3>
            <p className="eys-modal-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Manage products, bookings, commissions, and activate/deactivate services in real-time
            </p>
          </div>
          <button onClick={onClose} className="eys-modal-close-btn" style={{ color: '#fff' }} aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="eys-modal-body">
          
          {/* TABS */}
          <div className="eys-dashboard-tabs">
            <button 
              className={`eys-dtab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview &amp; Revenue
            </button>
            <button 
              className={`eys-dtab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              Bookings &amp; Orders ({bookings.length})
            </button>
            <button 
              className={`eys-dtab-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Dynamic Products ({products.length})
            </button>
            <button 
              className={`eys-dtab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              Services Master Switches
            </button>
            <button 
              className={`eys-dtab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Commission &amp; Policies
            </button>
          </div>

          {/* TAB 1: OVERVIEW & STATS */}
          {activeTab === 'overview' && (
            <div>
              <div className="eys-stats-grid">
                <div className="eys-stat-card">
                  <div className="eys-stat-title">Total Extras Revenue</div>
                  <div className="eys-stat-value">£{metrics.totalRevenue}</div>
                  <span style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: 600 }}>Gross booking volume</span>
                </div>

                <div className="eys-stat-card">
                  <div className="eys-stat-title">Concierge Commission ({adminConfig.commissionPercentage}%)</div>
                  <div className="eys-stat-value" style={{ color: 'var(--eys-gold)' }}>£{metrics.totalCommission.toFixed(2)}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>Net property earnings</span>
                </div>

                <div className="eys-stat-card">
                  <div className="eys-stat-title">Active Bookings</div>
                  <div className="eys-stat-value">{metrics.activeCount}</div>
                  <span style={{ fontSize: '0.75rem', color: '#f57f17', fontWeight: 600 }}>Upcoming to fulfill</span>
                </div>

                <div className="eys-stat-card">
                  <div className="eys-stat-title">Fulfilled / Cancelled</div>
                  <div className="eys-stat-value">{metrics.completedCount} / {metrics.cancelledCount}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>History tally</span>
                </div>
              </div>

              {/* QUICK INSIGHTS */}
              <div style={{ background: 'var(--eys-cream)', borderRadius: 12, padding: 20, border: '1px solid var(--eys-border)', marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: 'var(--eys-forest)' }}>
                  Performance Summary
                </h4>
                <p style={{ color: 'var(--eys-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Property extras and local supplier commissions generate additional high-margin revenue on top of cottage rental income. 
                  Top performing items: <strong>E-Bike Hire</strong> and <strong>Firewood Bundles</strong>. 
                  All customer payments are routed directly to your primary merchant account with automated partner vouchers.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS MANAGEMENT */}
          {activeTab === 'bookings' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--eys-forest)' }}>Filter by Status:</span>
                  {['All', 'Confirmed', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'].map(s => (
                    <button 
                      key={s}
                      className={`eys-tab-btn ${statusFilter === s ? 'active' : ''}`}
                      onClick={() => setStatusFilter(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="eys-table-wrapper">
                <table className="eys-data-table">
                  <thead>
                    <tr>
                      <th>Ref &amp; Service</th>
                      <th>Guest &amp; Stay</th>
                      <th>Date / Time</th>
                      <th>Supplier</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map(b => (
                      <tr key={b.id}>
                        <td>
                          <strong>{b.serviceName}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>ID: {b.id}</div>
                        </td>
                        <td>
                          <div>{b.guestName || 'Valued Guest'}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>Stay: {b.bookingRef}</div>
                        </td>
                        <td>
                          <div>{b.bookedDate}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>{b.timeSlot}</div>
                        </td>
                        <td>
                          <div>{b.supplierName}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--eys-text-muted)' }}>{b.supplierContact}</div>
                        </td>
                        <td>
                          <strong>£{b.amountPaid}</strong>
                        </td>
                        <td>
                          <span className={`eys-booking-badge ${b.status.toLowerCase()}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <select 
                            value={b.status} 
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                            style={{ padding: '4px 8px', fontSize: '0.8rem', borderRadius: 4, border: '1px solid var(--eys-border)' }}
                          >
                            <option>Confirmed</option>
                            <option>Scheduled</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DYNAMIC PRODUCTS & PROPERTY EXTRAS */}
          {activeTab === 'products' && (
            <div>
              {/* ADD NEW PRODUCT FORM */}
              <div style={{ background: 'var(--eys-cream)', borderRadius: 12, padding: 22, border: '1px solid var(--eys-border)', marginBottom: 28 }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', color: 'var(--eys-forest)' }}>
                  Add New Property Extra (No Code Change Required)
                </h4>
                <p style={{ color: 'var(--eys-text-muted)', fontSize: '0.85rem', marginBottom: 16 }}>
                  Create custom hampers, equipment rentals, or seasonal packages that instantly appear on the guest-facing website.
                </p>

                {showAddSuccess && (
                  <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '8px 14px', borderRadius: 6, marginBottom: 14, fontSize: '0.86rem', fontWeight: 600 }}>
                    ✓ New product published live to guest extras catalogue!
                  </div>
                )}

                <form onSubmit={handleAddNewProduct}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 14 }}>
                    <div className="eys-form-group">
                      <label className="eys-form-label">Product Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Stargazing Telescope &amp; Warm Blanket Kit" 
                        value={newProdName} 
                        onChange={(e) => setNewProdName(e.target.value)} 
                        className="eys-input" 
                      />
                    </div>

                    <div className="eys-form-group">
                      <label className="eys-form-label">Category</label>
                      <select value={newProdCategory} onChange={(e) => setNewProdCategory(e.target.value)} className="eys-select">
                        <option>Wellness &amp; Outdoor</option>
                        <option>Comfort &amp; Lounging</option>
                        <option>Celebration Packages</option>
                        <option>Hearth &amp; Fire</option>
                        <option>Outdoor Equipment</option>
                        <option>Food &amp; Hampers</option>
                      </select>
                    </div>

                    <div className="eys-form-group">
                      <label className="eys-form-label">Price (£ GBP)</label>
                      <input 
                        type="number" 
                        min="1" 
                        required 
                        value={newProdPrice} 
                        onChange={(e) => setNewProdPrice(e.target.value)} 
                        className="eys-input" 
                      />
                    </div>

                    <div className="eys-form-group">
                      <label className="eys-form-label">Price Unit / Frequency</label>
                      <input 
                        type="text" 
                        placeholder="e.g. per stay / per day" 
                        value={newProdUnit} 
                        onChange={(e) => setNewProdUnit(e.target.value)} 
                        className="eys-input" 
                      />
                    </div>
                  </div>

                  <div className="eys-form-group">
                    <label className="eys-form-label">Short Description</label>
                    <input 
                      type="text" 
                      placeholder="Brief details of what is provided to the guest..." 
                      value={newProdDesc} 
                      onChange={(e) => setNewProdDesc(e.target.value)} 
                      className="eys-input" 
                    />
                  </div>

                  <button type="submit" className="eys-btn-primary">
                    <Plus size={15} />
                    <span>Publish New Extra Product</span>
                  </button>
                </form>
              </div>

              {/* EXISTING PRODUCTS LIST */}
              <h4 style={{ margin: '0 0 14px 0', fontSize: '1.1rem', color: 'var(--eys-forest)' }}>
                Active Property Extras List ({products.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {products.map(p => (
                  <div key={p.id} className="eys-product-item">
                    <div className="eys-product-info">
                      <img src={p.image} alt={p.name} className="eys-product-thumb" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <h4 className="eys-product-title">{p.name}</h4>
                          <span style={{ fontSize: '0.72rem', background: 'var(--eys-cream-dark)', padding: '2px 8px', borderRadius: 4 }}>
                            {p.category}
                          </span>
                        </div>
                        <p className="eys-product-desc">{p.desc}</p>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--eys-gold)' }}>
                          £{p.price} <span style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>({p.unit})</span>
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDeleteProduct(p.id)}
                      className="eys-btn-outline" 
                      style={{ color: '#c62828', borderColor: '#ffcdd2' }}
                    >
                      <Trash2 size={15} style={{ marginRight: 4 }} />
                      <span>Delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES MASTER SWITCHES */}
          {activeTab === 'services' && (
            <div>
              <p style={{ color: 'var(--eys-text-muted)', fontSize: '0.92rem', marginBottom: 20 }}>
                Enable or disable entire service categories instantly. Deactivated services will disappear from the guest-facing “Enhance Your Stay” catalog.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                {[
                  { id: 'ebike-hire', title: 'E-Bike Hire', desc: 'Allow guests to rent electric hybrid & mountain bikes.' },
                  { id: 'hot-tub-extras', title: 'Hot Tub & Property Extras', desc: 'Show optional patio hot tub, bathrobes, and luxury extras.' },
                  { id: 'logs-burner', title: 'Logs for the Burner', desc: 'Accept orders for firewood bundles delivered to hearth.' },
                  { id: 'private-chef', title: 'Private Chef Services', desc: 'Show private chef culinary menus and in-cottage dining.' },
                  { id: 'fridge-filled', title: 'Fridge Filled Before Arrival', desc: 'Offer pre-stocked grocery and breakfast hampers.' },
                  { id: 'local-attractions', title: 'Local Attractions Directory', desc: 'Showcase curated nearby destinations and booking links.' },
                  { id: 'ebike-guide', title: 'Local E-Bike Guide', desc: 'Offer British Cycling guided tours through Peak trails.' },
                  { id: 'walking-guide', title: 'Local Walking Guide', desc: 'Offer historian & nature guided walking excursions.' }
                ].map(s => {
                  const isActive = extrasService.isServiceActive(s.id);
                  return (
                    <div key={s.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 16,
                      background: '#ffffff',
                      border: '1px solid var(--eys-border)',
                      borderRadius: 10
                    }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: 'var(--eys-forest)' }}>{s.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--eys-text-muted)', maxWidth: 260 }}>{s.desc}</p>
                      </div>

                      <label className="eys-switch">
                        <input 
                          type="checkbox" 
                          checked={isActive} 
                          onChange={() => handleToggleService(s.id)} 
                        />
                        <span className="eys-slider"></span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: COMMISSION & POLICIES */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings}>
              <div style={{ maxWidth: 540 }}>
                <div className="eys-form-group">
                  <label className="eys-form-label">Concierge Commission Rate (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="50" 
                    value={adminConfig.commissionPercentage} 
                    onChange={(e) => setAdminConfig({ ...adminConfig, commissionPercentage: Number(e.target.value) })} 
                    className="eys-input" 
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--eys-text-muted)' }}>
                    Calculated on 3rd party services (e-bike guides, private chefs, attraction referrals).
                  </span>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Free Cancellation Window (Hours)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="168" 
                    value={adminConfig.cancellationNoticeHours} 
                    onChange={(e) => setAdminConfig({ ...adminConfig, cancellationNoticeHours: Number(e.target.value) })} 
                    className="eys-input" 
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--eys-text-muted)' }}>
                    Standard notice period required before guest can cancel without charge (default 48 hours).
                  </span>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Concierge Notification Email</label>
                  <input 
                    type="email" 
                    value={adminConfig.supplierNotificationEmail} 
                    onChange={(e) => setAdminConfig({ ...adminConfig, supplierNotificationEmail: e.target.value })} 
                    className="eys-input" 
                  />
                </div>

                <button type="submit" className="eys-btn-primary">
                  <Check size={15} />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* FOOTER */}
        <div className="eys-modal-footer">
          <span style={{ fontSize: '0.84rem', color: 'var(--eys-text-muted)' }}>
            2 Bentley Bridge Cottages &bull; Property Concierge Administration
          </span>
          <button className="eys-btn-outline" onClick={onClose}>
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
}
