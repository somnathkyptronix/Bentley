import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Bike, Flame, UtensilsCrossed, ShoppingBag, 
  Compass, Navigation, Footprints, ShoppingCart, UserCheck, 
  Settings, ArrowRight, Check, Eye
} from 'lucide-react';
import { extrasService } from '../services/extrasService';
import ServiceBookingModal from './extras/ServiceBookingModal';
import ExtrasBasketModal from './extras/ExtrasBasketModal';
import GuestDashboardModal from './extras/GuestDashboardModal';
import AdminDashboardModal from './extras/AdminDashboardModal';

export default function EnhanceYourStaySection({ onOpenAdmin, onOpenGuest }) {
  const [services, setServices] = useState(extrasService.services);
  const [activeCategory, setActiveCategory] = useState('All');
  const [basketCount, setBasketCount] = useState(extrasService.getBasketCount());
  
  // Modals state
  const [selectedService, setSelectedService] = useState(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [basketModalOpen, setBasketModalOpen] = useState(false);
  const [guestDashboardOpen, setGuestDashboardOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Subscribe to service changes (active/inactive toggles from admin) and basket open events
  useEffect(() => {
    const unsubscribe = extrasService.subscribe(() => {
      setBasketCount(extrasService.getBasketCount());
      // Re-filter services based on active admin configuration
      setServices(extrasService.services.filter(s => extrasService.isServiceActive(s.id)));
    });

    const handleOpenBasket = () => {
      setBasketModalOpen(true);
    };
    window.addEventListener('bentley:open-basket', handleOpenBasket);

    return () => {
      unsubscribe();
      window.removeEventListener('bentley:open-basket', handleOpenBasket);
    };
  }, []);

  const categories = [
    'All', 
    'Property Extras', 
    'Food & Dining', 
    'Active & Adventure', 
    'Guided Tours', 
    'Local Attractions'
  ];

  const filteredServices = services
    .filter(s => extrasService.isServiceActive(s.id))
    .filter(s => activeCategory === 'All' || s.category === activeCategory);

  const handleOpenService = (service) => {
    setSelectedService(service);
    setServiceModalOpen(true);
  };

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Bike': return <Bike size={16} />;
      case 'Sparkles': return <Sparkles size={16} />;
      case 'Flame': return <Flame size={16} />;
      case 'UtensilsCrossed': return <UtensilsCrossed size={16} />;
      case 'ShoppingBag': return <ShoppingBag size={16} />;
      case 'Compass': return <Compass size={16} />;
      case 'Navigation': return <Navigation size={16} />;
      case 'Footprints': return <Footprints size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  return (
    <section id="enhance-stay" className="enhance-stay-section section-padding">
      <div className="container-wide">
        
        {/* SECTION HEADER */}
        <div className="eys-header">
          <div className="eys-eyebrow">
            <Sparkles size={14} />
            <span>ENHANCE YOUR STAY &bull; CONCIERGE SERVICES</span>
          </div>
          <h2 className="eys-title">
            Tailor Your Derbyshire Holiday
          </h2>
          <p className="eys-lead">
            Allow yourself to slow down and indulge. Book optional property extras, private chefs, 
            local grocery hampers, and guided excursions before arrival or throughout your stay.
          </p>
        </div>

        {/* ACTION & NAVIGATION BAR */}
        <div className="eys-action-bar">
          
          {/* CATEGORY TABS */}
          <div className="eys-category-tabs" role="tablist">
            {categories.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`eys-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* BASKET BUTTON */}
          <div className="eys-portal-buttons">
            <button 
              className="eys-btn-basket" 
              onClick={() => setBasketModalOpen(true)}
              title="View stay basket"
            >
              <ShoppingCart size={16} />
              <span>Stay Basket</span>
              {basketCount > 0 && (
                <span className="eys-basket-badge">{basketCount}</span>
              )}
            </button>
          </div>

        </div>

        {/* SERVICES CARD GRID */}
        <div className="eys-services-grid">
          {filteredServices.map(service => (
            <article key={service.id} className="eys-card">
              
              {/* CARD MEDIA */}
              <div className="eys-card-media" onClick={() => handleOpenService(service)} style={{ cursor: 'pointer' }}>
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="eys-card-img"
                  loading="lazy" 
                />

                <span className="eys-card-category-badge">
                  {getServiceIcon(service.icon)}
                  <span>{service.category}</span>
                </span>

                <span className={`eys-status-pill ${service.statusType}`}>
                  {service.availabilityStatus}
                </span>
              </div>

              {/* CARD BODY */}
              <div className="eys-card-body">
                <h3 
                  className="eys-card-title" 
                  onClick={() => handleOpenService(service)} 
                  style={{ cursor: 'pointer' }}
                >
                  {service.name}
                </h3>
                
                <p className="eys-card-desc">
                  {service.shortDesc}
                </p>

                {/* CARD FOOTER */}
                <div className="eys-card-footer">
                  <div className="eys-card-price-block">
                    <span className="eys-price-label">Starting from</span>
                    <span className="eys-price-amount">{service.priceUnit}</span>
                  </div>

                  <div className="eys-card-actions">
                    <button 
                      className="eys-btn-outline" 
                      onClick={() => handleOpenService(service)}
                    >
                      <span>View Details</span>
                    </button>

                    <button 
                      className="eys-btn-primary" 
                      onClick={() => handleOpenService(service)}
                    >
                      <span>Book Now</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>

      {/* MODALS */}
      <ServiceBookingModal 
        service={selectedService}
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        onOpenBasket={() => setBasketModalOpen(true)}
      />

      <ExtrasBasketModal 
        isOpen={basketModalOpen}
        onClose={() => setBasketModalOpen(false)}
        onOpenGuestDashboard={() => setGuestDashboardOpen(true)}
      />

      <GuestDashboardModal 
        isOpen={guestDashboardOpen}
        onClose={() => setGuestDashboardOpen(false)}
        onOpenExploreServices={() => {
          const el = document.getElementById('enhance-stay');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <AdminDashboardModal 
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
      />

    </section>
  );
}
