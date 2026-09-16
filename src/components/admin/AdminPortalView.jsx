import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, LogOut, ArrowLeft, Plus, Check, Trash2, 
  Edit3, Settings, DollarSign, Percent, AlertCircle, TrendingUp, 
  Calendar, Layers, Package, Users, Compass, UtensilsCrossed, 
  Bike, Flame, ShoppingBag, Eye, RefreshCw, Filter, Search, 
  Clock, MapPin, Phone, Mail, CheckCircle2, XCircle
} from 'lucide-react';
import { extrasService } from '../../services/extrasService';

export default function AdminPortalView({ onReturnToHome, onLogout }) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview'); 
  // 'overview' | 'services' | 'products' | 'attractions' | 'guides' | 'chefs' | 'pricing' | 'inventory' | 'bookings' | 'payments' | 'suppliers' | 'policies'

  // Reactive data
  const [services, setServices] = useState(extrasService.getServices());
  const [products, setProducts] = useState(extrasService.getPropertyExtras());
  const [attractions, setAttractions] = useState(extrasService.getAttractions());
  const [guides, setGuides] = useState(extrasService.getGuides());
  const [chefs, setChefs] = useState(extrasService.getChefs());
  const [suppliers, setSuppliers] = useState(extrasService.getSuppliers());
  const [bookings, setBookings] = useState(extrasService.getBookings());
  const [adminConfig, setAdminConfig] = useState(extrasService.getAdminConfig());

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingFilter, setBookingFilter] = useState('All');
  const [successToast, setSuccessToast] = useState('');

  // Modals for creation
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [addAttractionModal, setAddAttractionModal] = useState(false);
  const [addGuideModal, setAddGuideModal] = useState(false);
  const [addChefModal, setAddChefModal] = useState(false);

  // Form states for adding new items
  const [newService, setNewService] = useState({
    name: '', category: 'Property Extras', startingPrice: 30, priceUnit: 'from £30',
    availabilityStatus: 'Available Today', leadTime: 'Instant confirmation', shortDesc: '', image: '/images/extras/ebike_hire.jpg'
  });

  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Wellness & Outdoor', price: 25, unit: 'per stay', stock: 15,
    desc: '', image: '/images/extras/hottub_extras.jpg'
  });

  const [newAttraction, setNewAttraction] = useState({
    name: '', category: 'Family attractions', distance: '3 miles', duration: '2 hours',
    price: 'From £15', location: 'Matlock', desc: '', familyFriendly: true, image: '/images/extras/local_attractions.jpg'
  });

  const [newGuide, setNewGuide] = useState({
    name: '', role: 'Walking & Nature Guide', qualification: 'Mountain Leader (ML)',
    phone: '+44 7700 900000', email: 'guide@peakwalks.co.uk', bio: '', rating: '5.0', availableDays: 'Daily upon request'
  });

  const [newChef, setNewChef] = useState({
    name: '', specialities: 'Modern British Fine Dining', bio: '', pricePerGuest: 70,
    rating: '5.0', sampleMenu: 'Canapés, Seasonal Main, Dessert'
  });

  // Subscribe to service updates
  useEffect(() => {
    const unsubscribe = extrasService.subscribe(() => {
      setServices(extrasService.getServices());
      setProducts(extrasService.getPropertyExtras());
      setAttractions(extrasService.getAttractions());
      setGuides(extrasService.getGuides());
      setChefs(extrasService.getChefs());
      setSuppliers(extrasService.getSuppliers());
      setBookings(extrasService.getBookings());
      setAdminConfig(extrasService.getAdminConfig());
    });
    return unsubscribe;
  }, []);

  const notifySuccess = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const metrics = extrasService.getAdminMetrics();

  // --- Handlers ---
  const handleToggleService = (serviceId) => {
    extrasService.toggleService(serviceId);
    notifySuccess(`Service visibility toggled`);
  };

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newService.name) return;
    extrasService.addService(newService);
    setNewService({
      name: '', category: 'Property Extras', startingPrice: 30, priceUnit: 'from £30',
      availabilityStatus: 'Available Today', leadTime: 'Instant confirmation', shortDesc: '', image: '/images/extras/ebike_hire.jpg'
    });
    setAddServiceModal(false);
    notifySuccess(`New service "${newService.name}" published to website!`);
  };

  const handleDeleteService = (id, name) => {
    if (confirm(`Remove service "${name}" from website?`)) {
      extrasService.deleteService(id);
      notifySuccess(`Service removed`);
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name) return;
    extrasService.addPropertyExtra(newProduct);
    setNewProduct({
      name: '', category: 'Wellness & Outdoor', price: 25, unit: 'per stay', stock: 15,
      desc: '', image: '/images/extras/hottub_extras.jpg'
    });
    setAddProductModal(false);
    notifySuccess(`Dynamic product published to Hot Tub & Property Extras!`);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Delete this product extra?')) {
      extrasService.deletePropertyExtra(id);
      notifySuccess('Product extra deleted');
    }
  };

  const handleCreateAttraction = (e) => {
    e.preventDefault();
    if (!newAttraction.name) return;
    extrasService.addAttraction(newAttraction);
    setNewAttraction({
      name: '', category: 'Family attractions', distance: '3 miles', duration: '2 hours',
      price: 'From £15', location: 'Matlock', desc: '', familyFriendly: true, image: '/images/extras/local_attractions.jpg'
    });
    setAddAttractionModal(false);
    notifySuccess(`Attraction added to regional directory!`);
  };

  const handleDeleteAttraction = (id) => {
    if (confirm('Delete this attraction from directory?')) {
      extrasService.deleteAttraction(id);
      notifySuccess('Attraction removed');
    }
  };

  const handleCreateGuide = (e) => {
    e.preventDefault();
    if (!newGuide.name) return;
    extrasService.addGuide(newGuide);
    setNewGuide({
      name: '', role: 'Walking & Nature Guide', qualification: 'Mountain Leader (ML)',
      phone: '+44 7700 900000', email: 'guide@peakwalks.co.uk', bio: '', rating: '5.0', availableDays: 'Daily upon request'
    });
    setAddGuideModal(false);
    notifySuccess(`Guide added to team!`);
  };

  const handleDeleteGuide = (id) => {
    if (confirm('Remove guide?')) {
      extrasService.deleteGuide(id);
      notifySuccess('Guide removed');
    }
  };

  const handleCreateChef = (e) => {
    e.preventDefault();
    if (!newChef.name) return;
    const menuArray = typeof newChef.sampleMenu === 'string' 
      ? newChef.sampleMenu.split(',').map(s => s.trim()).filter(Boolean)
      : newChef.sampleMenu;
    
    extrasService.addChef({ ...newChef, sampleMenu: menuArray });
    setNewChef({
      name: '', specialities: 'Modern British Fine Dining', bio: '', pricePerGuest: 70,
      rating: '5.0', sampleMenu: 'Canapés, Seasonal Main, Dessert'
    });
    setAddChefModal(false);
    notifySuccess(`Chef profile created!`);
  };

  const handleDeleteChef = (id) => {
    if (confirm('Remove chef profile?')) {
      extrasService.deleteChef(id);
      notifySuccess('Chef profile removed');
    }
  };

  const handleUpdateBooking = (id, status) => {
    extrasService.updateBookingStatus(id, status);
    notifySuccess(`Booking ${id} marked as ${status}`);
  };

  const handleSavePolicies = (e) => {
    e.preventDefault();
    extrasService.updateAdminConfig(adminConfig);
    notifySuccess('Commission rates and property policies saved!');
  };

  const filteredBookings = bookings.filter(b => {
    const matchStatus = bookingFilter === 'All' || b.status === bookingFilter;
    const matchSearch = searchTerm === '' || 
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.supplierName && b.supplierName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStatus && matchSearch;
  });

  return (
    <div className="eys-admin-app">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {successToast && (
        <div className="eys-admin-toast animate-fade-in">
          <CheckCircle2 size={16} />
          <span>{successToast}</span>
        </div>
      )}

      {/* TOP ADMIN NAVBAR */}
      <header className="eys-admin-topbar">
        <div className="eys-admin-topbar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src="/logo.jpg" alt="Logo" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #c5a880' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="font-serif" style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 600 }}>2 BENTLEY BRIDGE</span>
                <span className="eys-admin-badge-live">OPS PORTAL</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)' }}>
                Concierge, Bookings &amp; Extras Administration
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="eys-admin-user-pill">
              <ShieldCheck size={14} style={{ color: 'var(--eys-gold)' }} />
              <span>Logged in as <strong>Admin</strong></span>
            </div>

            <button onClick={onReturnToHome} className="eys-admin-header-btn secondary">
              <ArrowLeft size={14} />
              <span>Cottage Website</span>
            </button>

            <button onClick={onLogout} className="eys-admin-header-btn danger" title="Sign out of Admin Portal">
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ADMIN BODY LAYOUT (SIDEBAR + MAIN CONTENT) */}
      <div className="eys-admin-layout">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="eys-admin-sidebar">
          <div className="eys-admin-menu-label">MANAGEMENT TOOLS</div>

          <nav className="eys-admin-nav-list">
            <button 
              className={`eys-admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <TrendingUp size={16} />
              <span>Overview &amp; Metrics</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <Layers size={16} />
              <span>Services ({services.length})</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={16} />
              <span>Property Extras ({products.length})</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar size={16} />
              <span>Bookings ({bookings.length})</span>
              {bookings.filter(b => b.status === 'Confirmed').length > 0 && (
                <span className="eys-nav-badge">{bookings.filter(b => b.status === 'Confirmed').length}</span>
              )}
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              <Flame size={16} />
              <span>Inventory &amp; Stock</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'pricing' ? 'active' : ''}`}
              onClick={() => setActiveTab('pricing')}
            >
              <DollarSign size={16} />
              <span>Pricing &amp; Availability</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'attractions' ? 'active' : ''}`}
              onClick={() => setActiveTab('attractions')}
            >
              <Compass size={16} />
              <span>Attractions ({attractions.length})</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'guides' ? 'active' : ''}`}
              onClick={() => setActiveTab('guides')}
            >
              <Users size={16} />
              <span>Tour Guides ({guides.length})</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'chefs' ? 'active' : ''}`}
              onClick={() => setActiveTab('chefs')}
            >
              <UtensilsCrossed size={16} />
              <span>Private Chefs ({chefs.length})</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <DollarSign size={16} />
              <span>Payments &amp; Ledger</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'suppliers' ? 'active' : ''}`}
              onClick={() => setActiveTab('suppliers')}
            >
              <MapPin size={16} />
              <span>Supplier Directory</span>
            </button>

            <button 
              className={`eys-admin-nav-item ${activeTab === 'policies' ? 'active' : ''}`}
              onClick={() => setActiveTab('policies')}
            >
              <Percent size={16} />
              <span>Commissions &amp; Rules</span>
            </button>
          </nav>

          <div className="eys-admin-sidebar-footer">
            <span style={{ fontSize: '0.72rem', color: 'var(--eys-text-muted)' }}>
              2 Bentley Bridge Concierge v2.4<br />
              Derbyshire DE4 5LB
            </span>
          </div>
        </aside>

        {/* MAIN ADMIN WORKSPACE */}
        <main className="eys-admin-workspace">
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Executive Overview</h2>
                  <p className="eys-admin-page-sub">Performance metrics, revenue, active reservations, and operations</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setAddProductModal(true)} className="eys-btn-outline" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                    <Plus size={14} /> Add Product Extra
                  </button>
                  <button onClick={() => setAddServiceModal(true)} className="eys-btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                    <Plus size={14} /> Add New Service
                  </button>
                </div>
              </div>

              {/* KPI STATS ROW */}
              <div className="eys-admin-stats-grid">
                <div className="eys-kpi-card">
                  <span className="eys-kpi-label">Gross Extras Sales</span>
                  <span className="eys-kpi-value">£{metrics.totalRevenue}</span>
                  <span className="eys-kpi-sub positive">From {metrics.totalBookings} guest reservations</span>
                </div>

                <div className="eys-kpi-card">
                  <span className="eys-kpi-label">Concierge Commission ({adminConfig.commissionPercentage}%)</span>
                  <span className="eys-kpi-value">£{metrics.totalCommission.toFixed(2)}</span>
                  <span className="eys-kpi-sub positive">Net concierge commission earned</span>
                </div>

                <div className="eys-kpi-card">
                  <span className="eys-kpi-label">Active / Upcoming Bookings</span>
                  <span className="eys-kpi-value">{metrics.activeCount}</span>
                  <span className="eys-kpi-sub">Fulfillments scheduled</span>
                </div>

                <div className="eys-kpi-card">
                  <span className="eys-kpi-label">Active Services</span>
                  <span className="eys-kpi-value">
                    {services.filter(s => extrasService.isServiceActive(s.id)).length} / {services.length}
                  </span>
                  <span className="eys-kpi-sub">Live on cottage website</span>
                </div>
              </div>

              {/* RECENT BOOKINGS TABLE */}
              <div className="eys-admin-card" style={{ marginTop: 24 }}>
                <div className="eys-admin-card-header">
                  <h3 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--eys-forest)', margin: 0 }}>
                    Recent Service Bookings
                  </h3>
                  <button onClick={() => setActiveTab('bookings')} className="eys-btn-subtle" style={{ fontSize: '0.85rem' }}>
                    View All Bookings &rarr;
                  </button>
                </div>

                <div className="eys-table-responsive">
                  <table className="eys-admin-table">
                    <thead>
                      <tr>
                        <th>Booking Ref</th>
                        <th>Service</th>
                        <th>Date &amp; Time</th>
                        <th>Amount</th>
                        <th>Supplier</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map(b => (
                        <tr key={b.id}>
                          <td><strong>{b.id}</strong></td>
                          <td>{b.serviceName}</td>
                          <td>{b.bookedDate} &bull; {b.timeSlot}</td>
                          <td>£{b.amountPaid}</td>
                          <td>{b.supplierName || 'In-House'}</td>
                          <td>
                            <span className={`eys-status-tag ${b.status.toLowerCase()}`}>{b.status}</span>
                          </td>
                          <td>
                            <select 
                              value={b.status} 
                              onChange={(e) => handleUpdateBooking(b.id, e.target.value)}
                              className="eys-select"
                              style={{ padding: '4px 8px', fontSize: '0.8rem', minWidth: 120 }}
                            >
                              <option>Confirmed</option>
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
            </div>
          )}

          {/* TAB 2: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Services Catalogue</h2>
                  <p className="eys-admin-page-sub">
                    Activate, deactivate, edit pricing, or add new concierge services to the website.
                  </p>
                </div>
                <button onClick={() => setAddServiceModal(true)} className="eys-btn-primary">
                  <Plus size={16} /> Add New Service
                </button>
              </div>

              <div className="eys-table-responsive eys-admin-card">
                <table className="eys-admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Service Name</th>
                      <th>Category</th>
                      <th>Starting Price</th>
                      <th>Lead Time</th>
                      <th>Website Status</th>
                      <th>Toggle Visibility</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(s => {
                      const isActive = extrasService.isServiceActive(s.id);
                      return (
                        <tr key={s.id}>
                          <td>
                            <img src={s.image} alt={s.name} style={{ width: 52, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                          </td>
                          <td>
                            <strong>{s.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>ID: {s.id}</div>
                          </td>
                          <td>{s.category}</td>
                          <td><strong>{s.priceUnit}</strong></td>
                          <td>{s.leadTime}</td>
                          <td>
                            <span className={`eys-status-tag ${isActive ? 'confirmed' : 'cancelled'}`}>
                              {isActive ? 'Active on Web' : 'Hidden / Inactive'}
                            </span>
                          </td>
                          <td>
                            <button 
                              onClick={() => handleToggleService(s.id)}
                              className={`eys-btn-toggle ${isActive ? 'on' : 'off'}`}
                              title={isActive ? 'Deactivate Service' : 'Activate Service'}
                            >
                              {isActive ? 'ENABLED' : 'DISABLED'}
                            </button>
                          </td>
                          <td>
                            <button 
                              onClick={() => handleDeleteService(s.id, s.name)} 
                              className="eys-btn-icon-danger" 
                              title="Delete service"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS (DYNAMIC PROPERTY EXTRAS) */}
          {activeTab === 'products' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Property Extras (Dynamic Products)</h2>
                  <p className="eys-admin-page-sub">
                    Products guests can order for "Hot Tub &amp; Property Extras". Admins can add new products without changing code.
                  </p>
                </div>
                <button onClick={() => setAddProductModal(true)} className="eys-btn-primary">
                  <Plus size={16} /> Add New Product Extra
                </button>
              </div>

              <div className="eys-table-responsive eys-admin-card">
                <table className="eys-admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Unit</th>
                      <th>In Stock</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>
                          <img src={p.image} alt={p.name} style={{ width: 50, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                        </td>
                        <td><strong>{p.name}</strong></td>
                        <td>{p.category}</td>
                        <td><strong>£{p.price}</strong></td>
                        <td>{p.unit}</td>
                        <td>
                          <span className={`eys-stock-badge ${p.stock < 10 ? 'low' : 'ok'}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td style={{ maxWidth: 260, fontSize: '0.8rem', color: 'var(--eys-text-muted)' }}>
                          {p.desc}
                        </td>
                        <td>
                          <button 
                            onClick={() => handleDeleteProduct(p.id)} 
                            className="eys-btn-icon-danger"
                            title="Delete extra"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: BOOKINGS & FULFILLMENT */}
          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Guest Service Reservations</h2>
                  <p className="eys-admin-page-sub">Review incoming requests, change status, and oversee dispatch</p>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <div className="eys-search-box">
                    <Search size={14} />
                    <input 
                      type="text" 
                      placeholder="Search ref or service..." 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                  </div>

                  <select 
                    value={bookingFilter} 
                    onChange={(e) => setBookingFilter(e.target.value)}
                    className="eys-select"
                    style={{ minWidth: 140 }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="eys-table-responsive eys-admin-card">
                <table className="eys-admin-table">
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Service Name</th>
                      <th>Scheduled Date &amp; Slot</th>
                      <th>Amount Paid</th>
                      <th>Supplier Contact</th>
                      <th>Meeting / Delivery Point</th>
                      <th>Status</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map(b => (
                      <tr key={b.id}>
                        <td><strong>{b.id}</strong></td>
                        <td>{b.serviceName}</td>
                        <td>
                          <div>{b.bookedDate}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>{b.timeSlot}</div>
                        </td>
                        <td><strong>£{b.amountPaid}</strong></td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>{b.supplierName || 'In-House Concierge'}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>{b.supplierContact}</div>
                        </td>
                        <td style={{ fontSize: '0.8rem', maxWidth: 200 }}>{b.meetingPoint}</td>
                        <td>
                          <span className={`eys-status-tag ${b.status.toLowerCase()}`}>{b.status}</span>
                        </td>
                        <td>
                          <select 
                            value={b.status} 
                            onChange={(e) => handleUpdateBooking(b.id, e.target.value)}
                            className="eys-select"
                            style={{ padding: '5px 8px', fontSize: '0.8rem' }}
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

          {/* TAB 5: INVENTORY & STOCK */}
          {activeTab === 'inventory' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Property Inventory &amp; Gear Stock</h2>
                  <p className="eys-admin-page-sub">Manage available quantities for rental equipment, firewood, and linens</p>
                </div>
                <button onClick={() => setAddProductModal(true)} className="eys-btn-primary">
                  <Plus size={16} /> Add Inventory Item
                </button>
              </div>

              <div className="eys-inventory-grid">
                <div className="eys-admin-card">
                  <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--eys-forest)', marginBottom: 12 }}>
                    Electric Mountain Bikes (Fleet)
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--eys-forest)' }}>4</span>
                      <span style={{ color: 'var(--eys-text-muted)', marginLeft: 8 }}>Bikes in cottage fleet</span>
                    </div>
                    <span className="eys-status-tag confirmed">Fully Charged</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--eys-text-muted)', marginTop: 8 }}>
                    Specialized Turbo Levo alloy e-bikes. Includes chargers and outbuilding wall brackets.
                  </p>
                </div>

                <div className="eys-admin-card">
                  <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--eys-forest)', marginBottom: 12 }}>
                    Kiln-Dried Hardwood Firewood
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--eys-forest)' }}>45</span>
                      <span style={{ color: 'var(--eys-text-muted)', marginLeft: 8 }}>Crates in log store</span>
                    </div>
                    <span className="eys-status-tag confirmed">Ample Stock</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--eys-text-muted)', marginTop: 8 }}>
                    Kiln-dried Derbyshire birch (&lt;15% moisture). Sourced from Tansley Mill timber yard.
                  </p>
                </div>

                <div className="eys-admin-card">
                  <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--eys-forest)', marginBottom: 12 }}>
                    Luxury Waffle Spa Bathrobes
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--eys-forest)' }}>12</span>
                      <span style={{ color: 'var(--eys-text-muted)', marginLeft: 8 }}>Sets laundered</span>
                    </div>
                    <span className="eys-status-tag confirmed">Freshly Pressed</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--eys-text-muted)', marginTop: 8 }}>
                    White organic cotton waffle robes for fireside relaxation and patio hot tub use.
                  </p>
                </div>

                <div className="eys-admin-card">
                  <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--eys-forest)', marginBottom: 12 }}>
                    Trekking Pole Sets &amp; OS Maps
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--eys-forest)' }}>8</span>
                      <span style={{ color: 'var(--eys-text-muted)', marginLeft: 8 }}>Kits in gear cupboard</span>
                    </div>
                    <span className="eys-status-tag confirmed">Ready for Trails</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--eys-text-muted)', marginTop: 8 }}>
                    Carbon walking poles, waterproof OS Explorer Peak maps, and stainless thermal flasks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PRICING & AVAILABILITY */}
          {activeTab === 'pricing' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Pricing Matrix &amp; Availability Schedules</h2>
                  <p className="eys-admin-page-sub">Set standard tariffs, price units, and advance lead-time conditions</p>
                </div>
              </div>

              <div className="eys-table-responsive eys-admin-card">
                <table className="eys-admin-table">
                  <thead>
                    <tr>
                      <th>Service / Product</th>
                      <th>Current Tariff</th>
                      <th>Price Unit</th>
                      <th>Live Web Status</th>
                      <th>Notice Requirement</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(s => (
                      <tr key={s.id}>
                        <td><strong>{s.name}</strong></td>
                        <td>£{s.startingPrice}</td>
                        <td>{s.priceUnit}</td>
                        <td>
                          <span className="eys-status-tag confirmed">{s.availabilityStatus}</span>
                        </td>
                        <td>{s.leadTime}</td>
                        <td>
                          <button 
                            onClick={() => {
                              const newPrice = prompt(`Enter new price for ${s.name}:`, s.startingPrice);
                              if (newPrice) {
                                extrasService.updateService(s.id, { 
                                  startingPrice: Number(newPrice),
                                  priceUnit: `from £${newPrice}`
                                });
                                notifySuccess(`Updated price for ${s.name}`);
                              }
                            }}
                            className="eys-btn-outline" 
                            style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                          >
                            <Edit3 size={13} /> Edit Price
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: ATTRACTIONS DIRECTORY */}
          {activeTab === 'attractions' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Peak District Attractions Directory</h2>
                  <p className="eys-admin-page-sub">Curate recommendations, booking links, and partner admissions</p>
                </div>
                <button onClick={() => setAddAttractionModal(true)} className="eys-btn-primary">
                  <Plus size={16} /> Add Attraction
                </button>
              </div>

              <div className="eys-table-responsive eys-admin-card">
                <table className="eys-admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Attraction Name</th>
                      <th>Category</th>
                      <th>Distance</th>
                      <th>Duration</th>
                      <th>Admission</th>
                      <th>Family Friendly</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attractions.map(a => (
                      <tr key={a.id}>
                        <td>
                          <img src={a.image} alt={a.name} style={{ width: 50, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                        </td>
                        <td>
                          <strong>{a.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>{a.location}</div>
                        </td>
                        <td>{a.category}</td>
                        <td>{a.distance}</td>
                        <td>{a.duration}</td>
                        <td><strong>{a.price}</strong></td>
                        <td>{a.familyFriendly ? '✓ Yes' : 'No'}</td>
                        <td>
                          <button 
                            onClick={() => handleDeleteAttraction(a.id)}
                            className="eys-btn-icon-danger"
                            title="Delete attraction"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: TOUR GUIDES */}
          {activeTab === 'guides' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Tour Guides &amp; Route Specialists</h2>
                  <p className="eys-admin-page-sub">Manage certified guides for e-bike excursions and heritage walks</p>
                </div>
                <button onClick={() => setAddGuideModal(true)} className="eys-btn-primary">
                  <Plus size={16} /> Add Tour Guide
                </button>
              </div>

              <div className="eys-table-responsive eys-admin-card">
                <table className="eys-admin-table">
                  <thead>
                    <tr>
                      <th>Guide Name</th>
                      <th>Specialist Role</th>
                      <th>Qualification</th>
                      <th>Contact Phone / Email</th>
                      <th>Availability</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guides.map(g => (
                      <tr key={g.id}>
                        <td><strong>{g.name}</strong></td>
                        <td>{g.role}</td>
                        <td>{g.qualification}</td>
                        <td>
                          <div>{g.phone}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--eys-text-muted)' }}>{g.email}</div>
                        </td>
                        <td>{g.availableDays}</td>
                        <td>⭐ {g.rating}</td>
                        <td>
                          <button 
                            onClick={() => handleDeleteGuide(g.id)} 
                            className="eys-btn-icon-danger"
                            title="Remove guide"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: PRIVATE CHEFS */}
          {activeTab === 'chefs' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Private Chef Profiles &amp; Menus</h2>
                  <p className="eys-admin-page-sub">Manage local private culinary partners, pricing per head, and dining styles</p>
                </div>
                <button onClick={() => setAddChefModal(true)} className="eys-btn-primary">
                  <Plus size={16} /> Add Chef Profile
                </button>
              </div>

              <div className="eys-table-responsive eys-admin-card">
                <table className="eys-admin-table">
                  <thead>
                    <tr>
                      <th>Chef Name</th>
                      <th>Specialities</th>
                      <th>Price Per Head</th>
                      <th>Rating</th>
                      <th>Sample Menu Highlights</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chefs.map(c => (
                      <tr key={c.id}>
                        <td><strong>{c.name}</strong></td>
                        <td>{c.specialities}</td>
                        <td><strong>£{c.pricePerGuest} / guest</strong></td>
                        <td>⭐ {c.rating}</td>
                        <td style={{ maxWidth: 280, fontSize: '0.8rem', color: 'var(--eys-text-muted)' }}>
                          {Array.isArray(c.sampleMenu) ? c.sampleMenu.join('; ') : c.sampleMenu}
                        </td>
                        <td>
                          <button 
                            onClick={() => handleDeleteChef(c.id)} 
                            className="eys-btn-icon-danger"
                            title="Remove chef"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: PAYMENTS & FINANCIAL LEDGER */}
          {activeTab === 'payments' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Payments &amp; Settlement Ledger</h2>
                  <p className="eys-admin-page-sub">Detailed breakdown of payments, payment methods, and owner vs concierge share</p>
                </div>
              </div>

              <div className="eys-admin-card">
                <div className="eys-table-responsive">
                  <table className="eys-admin-table">
                    <thead>
                      <tr>
                        <th>Booking Ref</th>
                        <th>Service</th>
                        <th>Total Paid</th>
                        <th>Payment Method</th>
                        <th>Commission ({adminConfig.commissionPercentage}%)</th>
                        <th>Net Supplier Payout</th>
                        <th>Settlement Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => {
                        const commission = (b.amountPaid * (adminConfig.commissionPercentage / 100)).toFixed(2);
                        const netPayout = (b.amountPaid - commission).toFixed(2);
                        return (
                          <tr key={b.id}>
                            <td><strong>{b.id}</strong></td>
                            <td>{b.serviceName}</td>
                            <td><strong>£{b.amountPaid}</strong></td>
                            <td>Credit Card (Stripe Verified)</td>
                            <td style={{ color: 'var(--eys-gold)', fontWeight: 700 }}>£{commission}</td>
                            <td>£{netPayout}</td>
                            <td>
                              <span className="eys-status-tag confirmed">Settled</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SUPPLIERS & PARTNERS */}
          {activeTab === 'suppliers' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Suppliers &amp; Local Concierge Partners</h2>
                  <p className="eys-admin-page-sub">Contact directory and cottage arrival dispatch protocols</p>
                </div>
              </div>

              <div className="eys-suppliers-grid">
                {suppliers.map(s => (
                  <div key={s.id} className="eys-admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--eys-gold)', textTransform: 'uppercase' }}>
                          {s.service}
                        </span>
                        <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--eys-forest)', margin: '4px 0' }}>
                          {s.name}
                        </h3>
                      </div>
                      <span className="eys-status-tag confirmed">Verified</span>
                    </div>

                    <div style={{ margin: '12px 0', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div><strong>Lead Contact:</strong> {s.contactPerson}</div>
                      <div><strong>Phone:</strong> {s.phone}</div>
                      <div><strong>Email:</strong> {s.email}</div>
                      <div><strong>Address:</strong> {s.address}</div>
                    </div>

                    <div style={{ background: 'var(--eys-cream)', padding: 12, borderRadius: 8, fontSize: '0.8rem', color: 'var(--eys-text-muted)' }}>
                      <strong>Dispatch Protocol:</strong> {s.instructions}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: COMMISSIONS & POLICIES */}
          {activeTab === 'policies' && (
            <div className="animate-fade-in">
              <div className="eys-admin-header-row">
                <div>
                  <h2 className="eys-admin-page-title font-serif">Concierge Policies &amp; Financial Rates</h2>
                  <p className="eys-admin-page-sub">Update commission percentage, cancellation rules, and dispatch email</p>
                </div>
              </div>

              <div className="eys-admin-card" style={{ maxWidth: 700 }}>
                <form onSubmit={handleSavePolicies} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div className="eys-form-group">
                    <label className="eys-form-label">Concierge Commission Percentage (%)</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="50"
                      value={adminConfig.commissionPercentage} 
                      onChange={(e) => setAdminConfig({ ...adminConfig, commissionPercentage: Number(e.target.value) })} 
                      className="eys-input"
                    />
                    <small style={{ color: 'var(--eys-text-muted)' }}>
                      Default is 15%. Calculated automatically across all service bookings.
                    </small>
                  </div>

                  <div className="eys-form-group">
                    <label className="eys-form-label">Minimum Free Cancellation Notice (Hours)</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="168"
                      value={adminConfig.cancellationNoticeHours} 
                      onChange={(e) => setAdminConfig({ ...adminConfig, cancellationNoticeHours: Number(e.target.value) })} 
                      className="eys-input"
                    />
                    <small style={{ color: 'var(--eys-text-muted)' }}>
                      Notice required for guests to cancel bookings without penalty (Default: 48h).
                    </small>
                  </div>

                  <div className="eys-form-group">
                    <label className="eys-form-label">Central Supplier Notification Email</label>
                    <input 
                      type="email" 
                      value={adminConfig.supplierNotificationEmail || 'stay@2bentleybridgecottages.co.uk'} 
                      onChange={(e) => setAdminConfig({ ...adminConfig, supplierNotificationEmail: e.target.value })} 
                      className="eys-input"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="eys-btn-primary" 
                    style={{ alignSelf: 'flex-start', padding: '12px 24px', fontSize: '0.9rem' }}
                  >
                    Save Changes &amp; Publish Policies
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --- MODALS FOR CREATING NEW ENTITIES --- */}

      {/* 1. ADD NEW SERVICE MODAL */}
      {addServiceModal && (
        <div className="eys-modal-backdrop" onClick={() => setAddServiceModal(false)}>
          <div className="eys-modal-window" style={{ maxWidth: 620 }} onClick={(e) => e.stopPropagation()}>
            <div className="eys-modal-header">
              <h3 className="eys-modal-title">Publish New Concierge Service</h3>
              <button onClick={() => setAddServiceModal(false)} className="eys-modal-close-btn">&times;</button>
            </div>
            <form onSubmit={handleCreateService} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="eys-form-group">
                <label className="eys-form-label">Service Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Clay Pigeon Shooting Experience" 
                  value={newService.name} 
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })} 
                  className="eys-input" 
                />
              </div>

              <div className="eys-form-row">
                <div className="eys-form-group">
                  <label className="eys-form-label">Category</label>
                  <select 
                    value={newService.category} 
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })} 
                    className="eys-select"
                  >
                    <option>Property Extras</option>
                    <option>Food &amp; Dining</option>
                    <option>Active &amp; Adventure</option>
                    <option>Guided Tours</option>
                    <option>Local Attractions</option>
                  </select>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Starting Price (£)</label>
                  <input 
                    type="number" 
                    required 
                    value={newService.startingPrice} 
                    onChange={(e) => setNewService({ ...newService, startingPrice: Number(e.target.value), priceUnit: `from £${e.target.value}` })} 
                    className="eys-input" 
                  />
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Short Description</label>
                <textarea 
                  rows={3} 
                  required 
                  placeholder="Describe this bespoke offering for Derbyshire cottage guests..." 
                  value={newService.shortDesc} 
                  onChange={(e) => setNewService({ ...newService, shortDesc: e.target.value })} 
                  className="eys-textarea" 
                />
              </div>

              <div className="eys-form-row">
                <div className="eys-form-group">
                  <label className="eys-form-label">Lead Time Notice</label>
                  <input 
                    type="text" 
                    value={newService.leadTime} 
                    onChange={(e) => setNewService({ ...newService, leadTime: e.target.value })} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Image URL</label>
                  <input 
                    type="text" 
                    value={newService.image} 
                    onChange={(e) => setNewService({ ...newService, image: e.target.value })} 
                    className="eys-input" 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button type="button" onClick={() => setAddServiceModal(false)} className="eys-btn-outline">Cancel</button>
                <button type="submit" className="eys-btn-primary">Publish Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ADD DYNAMIC PRODUCT EXTRA MODAL */}
      {addProductModal && (
        <div className="eys-modal-backdrop" onClick={() => setAddProductModal(false)}>
          <div className="eys-modal-window" style={{ maxWidth: 580 }} onClick={(e) => e.stopPropagation()}>
            <div className="eys-modal-header">
              <h3 className="eys-modal-title">Add Property Extra Product</h3>
              <button onClick={() => setAddProductModal(false)} className="eys-modal-close-btn">&times;</button>
            </div>
            <form onSubmit={handleCreateProduct} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="eys-form-group">
                <label className="eys-form-label">Product Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Afternoon Tea Cream Scones Hamper" 
                  value={newProduct.name} 
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                  className="eys-input" 
                />
              </div>

              <div className="eys-form-row">
                <div className="eys-form-group">
                  <label className="eys-form-label">Price (£)</label>
                  <input 
                    type="number" 
                    required 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Initial Stock</label>
                  <input 
                    type="number" 
                    required 
                    value={newProduct.stock} 
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} 
                    className="eys-input" 
                  />
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Description</label>
                <textarea 
                  rows={2} 
                  placeholder="Details for the guest..." 
                  value={newProduct.desc} 
                  onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })} 
                  className="eys-textarea" 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button type="button" onClick={() => setAddProductModal(false)} className="eys-btn-outline">Cancel</button>
                <button type="submit" className="eys-btn-primary">Add Product Extra</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ADD ATTRACTION MODAL */}
      {addAttractionModal && (
        <div className="eys-modal-backdrop" onClick={() => setAddAttractionModal(false)}>
          <div className="eys-modal-window" style={{ maxWidth: 580 }} onClick={(e) => e.stopPropagation()}>
            <div className="eys-modal-header">
              <h3 className="eys-modal-title">Add Local Attraction</h3>
              <button onClick={() => setAddAttractionModal(false)} className="eys-modal-close-btn">&times;</button>
            </div>
            <form onSubmit={handleCreateAttraction} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="eys-form-group">
                <label className="eys-form-label">Attraction Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Haddon Hall &amp; Medieval Gardens" 
                  value={newAttraction.name} 
                  onChange={(e) => setNewAttraction({ ...newAttraction, name: e.target.value })} 
                  className="eys-input" 
                />
              </div>

              <div className="eys-form-row">
                <div className="eys-form-group">
                  <label className="eys-form-label">Category</label>
                  <select 
                    value={newAttraction.category} 
                    onChange={(e) => setNewAttraction({ ...newAttraction, category: e.target.value })} 
                    className="eys-select"
                  >
                    <option>Family attractions</option>
                    <option>Museums</option>
                    <option>Boat trips</option>
                    <option>Outdoor experiences</option>
                    <option>Restaurants</option>
                    <option>Adventure activities</option>
                  </select>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Distance</label>
                  <input 
                    type="text" 
                    value={newAttraction.distance} 
                    onChange={(e) => setNewAttraction({ ...newAttraction, distance: e.target.value })} 
                    className="eys-input" 
                  />
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Description</label>
                <textarea 
                  rows={2} 
                  value={newAttraction.desc} 
                  onChange={(e) => setNewAttraction({ ...newAttraction, desc: e.target.value })} 
                  className="eys-textarea" 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button type="button" onClick={() => setAddAttractionModal(false)} className="eys-btn-outline">Cancel</button>
                <button type="submit" className="eys-btn-primary">Add Attraction</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. ADD GUIDE MODAL */}
      {addGuideModal && (
        <div className="eys-modal-backdrop" onClick={() => setAddGuideModal(false)}>
          <div className="eys-modal-window" style={{ maxWidth: 580 }} onClick={(e) => e.stopPropagation()}>
            <div className="eys-modal-header">
              <h3 className="eys-modal-title">Register New Tour Guide</h3>
              <button onClick={() => setAddGuideModal(false)} className="eys-modal-close-btn">&times;</button>
            </div>
            <form onSubmit={handleCreateGuide} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="eys-form-group">
                <label className="eys-form-label">Guide Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Jessica Hughes" 
                  value={newGuide.name} 
                  onChange={(e) => setNewGuide({ ...newGuide, name: e.target.value })} 
                  className="eys-input" 
                />
              </div>

              <div className="eys-form-row">
                <div className="eys-form-group">
                  <label className="eys-form-label">Role / Specialty</label>
                  <input 
                    type="text" 
                    value={newGuide.role} 
                    onChange={(e) => setNewGuide({ ...newGuide, role: e.target.value })} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Qualification</label>
                  <input 
                    type="text" 
                    value={newGuide.qualification} 
                    onChange={(e) => setNewGuide({ ...newGuide, qualification: e.target.value })} 
                    className="eys-input" 
                  />
                </div>
              </div>

              <div className="eys-form-row">
                <div className="eys-form-group">
                  <label className="eys-form-label">Phone Number</label>
                  <input 
                    type="text" 
                    value={newGuide.phone} 
                    onChange={(e) => setNewGuide({ ...newGuide, phone: e.target.value })} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Email</label>
                  <input 
                    type="email" 
                    value={newGuide.email} 
                    onChange={(e) => setNewGuide({ ...newGuide, email: e.target.value })} 
                    className="eys-input" 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button type="button" onClick={() => setAddGuideModal(false)} className="eys-btn-outline">Cancel</button>
                <button type="submit" className="eys-btn-primary">Register Guide</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ADD CHEF MODAL */}
      {addChefModal && (
        <div className="eys-modal-backdrop" onClick={() => setAddChefModal(false)}>
          <div className="eys-modal-window" style={{ maxWidth: 580 }} onClick={(e) => e.stopPropagation()}>
            <div className="eys-modal-header">
              <h3 className="eys-modal-title">Add Private Chef Profile</h3>
              <button onClick={() => setAddChefModal(false)} className="eys-modal-close-btn">&times;</button>
            </div>
            <form onSubmit={handleCreateChef} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="eys-form-group">
                <label className="eys-form-label">Chef Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Chef Oliver Barnes" 
                  value={newChef.name} 
                  onChange={(e) => setNewChef({ ...newChef, name: e.target.value })} 
                  className="eys-input" 
                />
              </div>

              <div className="eys-form-row">
                <div className="eys-form-group">
                  <label className="eys-form-label">Specialities</label>
                  <input 
                    type="text" 
                    value={newChef.specialities} 
                    onChange={(e) => setNewChef({ ...newChef, specialities: e.target.value })} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Starting Price Per Guest (£)</label>
                  <input 
                    type="number" 
                    value={newChef.pricePerGuest} 
                    onChange={(e) => setNewChef({ ...newChef, pricePerGuest: Number(e.target.value) })} 
                    className="eys-input" 
                  />
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Sample Menu (Comma separated)</label>
                <textarea 
                  rows={2} 
                  placeholder="Canapés, Venison loin, Artisan Bakewell tart" 
                  value={newChef.sampleMenu} 
                  onChange={(e) => setNewChef({ ...newChef, sampleMenu: e.target.value })} 
                  className="eys-textarea" 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button type="button" onClick={() => setAddChefModal(false)} className="eys-btn-outline">Cancel</button>
                <button type="submit" className="eys-btn-primary">Save Chef Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
