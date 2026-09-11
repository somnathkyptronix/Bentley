import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Mail, MessageSquare, ChevronDown, Sparkles } from 'lucide-react';
import { tracker } from '../services/analytics';

export default function Header({ onOpenBooking, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cottageDropdownOpen, setCottageDropdownOpen] = useState(false);
  const [spacesDropdownOpen, setSpacesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    setCottageDropdownOpen(false);
    setSpacesDropdownOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingClick = () => {
    tracker.trackCheckAvailability('Header Pill CTA');
    setMobileMenuOpen(false);
    onOpenBooking();
  };

  return (
    <>
      {/* Top Floating / Sticky Header (Emarat Style) */}
      <header className={`emarat-header ${isScrolled ? 'scrolled' : 'transparent-top'}`}>
        <div className="container-wide">
          <div className="header-inner">
            
            {/* Brand Logo with Emarat Gold Badge Accent */}
            <a 
              href="#home" 
              className="brand-link" 
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            >
              <img 
                src="/logo.jpg" 
                alt="2 Bentley Bridge Cottages Logo" 
                className="brand-logo-badge"
              />
              <div className="brand-text">
                <span className="brand-name font-serif">2 BENTLEY BRIDGE</span>
                <span className="brand-location">UPPER LUMSDALE &bull; MATLOCK &bull; PEAKS</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <ul className="nav-list">
                <li>
                  <button onClick={() => handleNavClick('home')} className="nav-link">
                    Home
                  </button>
                </li>

                {/* Dropdown: The Cottage */}
                <li 
                  className="nav-item-dropdown"
                  onMouseEnter={() => setCottageDropdownOpen(true)}
                  onMouseLeave={() => setCottageDropdownOpen(false)}
                >
                  <button 
                    onClick={() => handleNavClick('about')} 
                    className="nav-link dropdown-trigger"
                  >
                    <span>The Cottage</span>
                    <ChevronDown size={14} className="dropdown-caret" />
                  </button>
                  {cottageDropdownOpen && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleNavClick('about')} className="dropdown-item">About the Retreat</button>
                      <button onClick={() => handleNavClick('pillars')} className="dropdown-item">Design &amp; Philosophy</button>
                      <button onClick={() => handleNavClick('statement')} className="dropdown-item">Cottage Manifesto</button>
                      <button onClick={() => handleNavClick('connectivity')} className="dropdown-item">Location &amp; Roads</button>
                    </div>
                  )}
                </li>

                {/* Dropdown: Spaces */}
                <li 
                  className="nav-item-dropdown"
                  onMouseEnter={() => setSpacesDropdownOpen(true)}
                  onMouseLeave={() => setSpacesDropdownOpen(false)}
                >
                  <button 
                    onClick={() => handleNavClick('spaces')} 
                    className="nav-link dropdown-trigger"
                  >
                    <span>Spaces</span>
                    <ChevronDown size={14} className="dropdown-caret" />
                  </button>
                  {spacesDropdownOpen && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleNavClick('spaces')} className="dropdown-item">Living Room &amp; Fireplace</button>
                      <button onClick={() => handleNavClick('spaces')} className="dropdown-item">Country Kitchen</button>
                      <button onClick={() => handleNavClick('spaces')} className="dropdown-item">Master Bedroom</button>
                      <button onClick={() => handleNavClick('spaces')} className="dropdown-item">Twin Bedroom</button>
                      <button onClick={() => handleNavClick('spaces')} className="dropdown-item">Heritage Roll-Top Bath</button>
                      <button onClick={() => handleNavClick('spaces')} className="dropdown-item">Enclosed Garden Patio</button>
                    </div>
                  )}
                </li>

                <li>
                  <button onClick={() => handleNavClick('gallery')} className="nav-link">
                    Gallery
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('escapes')} className="nav-link">
                    Area Escapes
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('offers')} className="nav-link">
                    Special Offers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('reviews')} className="nav-link">
                    Reviews
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('enquiry')} className="nav-link">
                    Contact
                  </button>
                </li>
              </ul>
            </nav>

            {/* Header Right Action - Emarat Pill Button */}
            <div className="header-actions">
              <button 
                id="header-check-availability-btn"
                onClick={handleBookingClick} 
                className="emarat-pill-btn"
              >
                <span>CHECK AVAILABILITY</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button 
                className="mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Floating Right Action Dock (Emarat Style) */}
      <div className="emarat-floating-dock">
        <a 
          href="https://wa.me/441629828450" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="dock-btn whatsapp"
          title="Chat with Cottage Concierge on WhatsApp"
        >
          <MessageSquare size={18} />
        </a>
        <a 
          href="tel:+441629828450" 
          className="dock-btn phone"
          title="Direct Phone Callback"
        >
          <Phone size={18} />
        </a>
        <button 
          onClick={handleBookingClick}
          className="dock-btn cal"
          title="Instant Availability Calendar"
        >
          <Calendar size={18} />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <div className="mobile-brand">
              <img src="/logo.jpg" alt="Logo" className="brand-logo-badge small" />
              <div>
                <div className="brand-name font-serif">2 Bentley Bridge</div>
                <div className="brand-location">Upper Lumsdale, Matlock</div>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-close-btn"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="mobile-nav">
            <button onClick={() => handleNavClick('home')} className="mobile-nav-link">Home</button>
            <button onClick={() => handleNavClick('about')} className="mobile-nav-link">The Cottage &amp; Philosophy</button>
            <button onClick={() => handleNavClick('spaces')} className="mobile-nav-link">Bedrooms &amp; Spaces</button>
            <button onClick={() => handleNavClick('gallery')} className="mobile-nav-link">Visual Gallery</button>
            <button onClick={() => handleNavClick('escapes')} className="mobile-nav-link">Curated Area Escapes</button>
            <button onClick={() => handleNavClick('connectivity')} className="mobile-nav-link">Location &amp; Connectivity</button>
            <button onClick={() => handleNavClick('offers')} className="mobile-nav-link">Special Offers &amp; Rates</button>
            <button onClick={() => handleNavClick('reviews')} className="mobile-nav-link">Guest Reviews</button>
            <button onClick={() => handleNavClick('enquiry')} className="mobile-nav-link">Direct Booking / Callback</button>
          </nav>

          <div className="mobile-drawer-footer">
            <button onClick={handleBookingClick} className="btn-primary w-full mobile-book-cta">
              <Calendar size={18} /> Check Availability &amp; Rates
            </button>
            <div className="mobile-quick-contacts">
              <a href="tel:+441629828450" className="mobile-contact-item">
                <Phone size={15} /> 01629 828 450
              </a>
              <a href="mailto:stay@2bentleybridgecottages.co.uk" className="mobile-contact-item">
                <Mail size={15} /> stay@2bentleybridgecottages.co.uk
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .emarat-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .emarat-header.transparent-top {
          background: linear-gradient(180deg, rgba(14, 30, 24, 0.82) 0%, rgba(14, 30, 24, 0.35) 65%, transparent 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0.85rem 0;
        }

        .emarat-header.scrolled {
          background-color: var(--color-forest);
          padding: 0.75rem 0;
          box-shadow: 0 10px 30px rgba(10, 35, 25, 0.35);
          border-bottom: 1px solid rgba(197, 162, 103, 0.2);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .brand-link {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .brand-logo-badge {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--color-gold);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: transform var(--transition-fast);
        }

        .brand-logo-badge.small {
          width: 44px;
          height: 44px;
        }

        .brand-link:hover .brand-logo-badge {
          transform: rotate(4deg) scale(1.04);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 1.28rem;
          letter-spacing: 0.08em;
          color: #FFFFFF;
          line-height: 1.15;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .brand-location {
          font-size: 0.68rem;
          color: var(--color-gold);
          letter-spacing: 0.16em;
          font-weight: 700;
          text-transform: uppercase;
        }

        .desktop-nav .nav-list {
          display: flex;
          align-items: center;
          list-style: none;
          gap: 1.5rem;
        }

        .nav-link {
          font-size: 0.88rem;
          font-weight: 500;
          color: #FFFFFF;
          padding: 0.4rem 0.2rem;
          position: relative;
          letter-spacing: 0.02em;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--color-gold-light);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--color-gold);
          transition: width var(--transition-smooth);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-item-dropdown {
          position: relative;
        }

        .dropdown-trigger {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .dropdown-caret {
          transition: transform var(--transition-fast);
        }

        .nav-item-dropdown:hover .dropdown-caret {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: -10px;
          background-color: var(--color-forest-dark);
          border: 1px solid rgba(197, 162, 103, 0.3);
          border-radius: var(--radius-sm);
          padding: 0.6rem 0;
          min-width: 220px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
          animation: fadeIn 0.25s ease;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 0.55rem 1.2rem;
          color: #FFFFFF;
          font-size: 0.84rem;
          transition: background var(--transition-fast);
        }

        .dropdown-item:hover {
          background-color: rgba(197, 162, 103, 0.15);
          color: var(--color-gold);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Emarat Pill Border Button */
        .emarat-pill-btn {
          border: 1.5px solid rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.7rem 1.6rem;
          transition: all var(--transition-smooth);
        }

        .emarat-pill-btn:hover {
          background-color: #FFFFFF;
          color: var(--color-forest);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .scrolled .emarat-pill-btn {
          border-color: var(--color-gold);
          color: #FFFFFF;
        }

        .scrolled .emarat-pill-btn:hover {
          background-color: var(--color-gold);
          color: var(--color-forest-dark);
        }

        .mobile-toggle {
          display: none;
          color: #FFFFFF;
          padding: 0.4rem;
        }

        /* Floating Right Action Dock (Emarat Style) */
        .emarat-floating-dock {
          position: fixed;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          z-index: 95;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .dock-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          background: rgba(20, 66, 49, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(197, 162, 103, 0.4);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          transition: all var(--transition-smooth);
        }

        .dock-btn:hover {
          transform: scale(1.1);
          background-color: var(--color-gold);
          color: var(--color-forest-dark);
        }

        .dock-btn.whatsapp:hover {
          background-color: #25D366;
          color: #FFFFFF;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          max-width: 380px;
          height: 100vh;
          background-color: var(--color-forest);
          color: #FFFFFF;
          z-index: 120;
          box-shadow: -8px 0 35px rgba(0, 0, 0, 0.4);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }

        .mobile-drawer.open {
          right: 0;
        }

        .mobile-drawer-content {
          padding: 2rem 1.6rem;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid rgba(197, 162, 103, 0.3);
          margin-bottom: 1.6rem;
        }

        .mobile-brand {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .mobile-close-btn {
          color: #FFFFFF;
          padding: 0.3rem;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 2rem;
        }

        .mobile-nav-link {
          text-align: left;
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #FFFFFF;
          padding: 0.55rem 0.6rem;
          border-radius: var(--radius-xs);
          transition: background var(--transition-fast);
        }

        .mobile-nav-link:hover {
          background: rgba(197, 162, 103, 0.15);
          color: var(--color-gold);
          padding-left: 0.9rem;
        }

        .mobile-drawer-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(197, 162, 103, 0.3);
        }

        .mobile-book-cta {
          width: 100%;
          padding: 0.9rem;
          background-color: var(--color-gold);
          color: var(--color-forest-dark);
        }

        .mobile-quick-contacts {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .mobile-contact-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: #D2CBC0;
        }

        @media (max-width: 1100px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .emarat-floating-dock {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .emarat-pill-btn {
            display: none;
          }
          .brand-name {
            font-size: 1.05rem;
            letter-spacing: 0.04em;
          }
          .brand-location {
            font-size: 0.58rem;
            letter-spacing: 0.08em;
          }
          .brand-logo-badge {
            width: 40px;
            height: 40px;
          }
          .mobile-drawer {
            width: 88vw;
            max-width: 360px;
          }
          .mobile-drawer-content {
            padding: 1.5rem 1.2rem;
          }
          .mobile-nav-link {
            font-size: 1.2rem;
            padding: 0.45rem 0.5rem;
          }
        }

        @media (max-width: 380px) {
          .brand-location {
            display: none;
          }
          .brand-name {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
