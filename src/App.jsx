import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutPillarsSection from './components/AboutPillarsSection';
import LuxuryRedefinedSection from './components/LuxuryRedefinedSection';
import ResidenceSpotlightSection from './components/ResidenceSpotlightSection';
import AmenitiesAndEssentialsSection from './components/AmenitiesAndEssentialsSection';
import CategorizedEscapesSection from './components/CategorizedEscapesSection';
import StatementBannerSection from './components/StatementBannerSection';
import ConnectivitySection from './components/ConnectivitySection';
import InteractiveGallery from './components/InteractiveGallery';
import EnhanceYourStaySection from './components/EnhanceYourStaySection';
import SpecialOffersSection, { offersData } from './components/SpecialOffersSection';
import LocalGuideSection from './components/LocalGuideSection';
import CallbackEnquirySection from './components/CallbackEnquirySection';
import GuestReviewsSection from './components/GuestReviewsSection';
import EmailCaptureSection from './components/EmailCaptureSection';
import SEOHubSection from './components/SEOHubSection';
import Footer from './components/Footer';
import BookingCalendarEngine from './components/BookingCalendarEngine';
import MobileStickyCTA from './components/MobileStickyCTA';
import AnalyticsTrackerInspector from './components/AnalyticsTrackerInspector';
import BookingRecoveryToast from './components/BookingRecoveryToast';
import LoginPage from './components/auth/LoginPage';
import AdminPortalView from './components/admin/AdminPortalView';
import GuestPortalView from './components/guest/GuestPortalView';
import { tracker } from './services/analytics';
import { extrasService } from './services/extrasService';

// Helper to resolve route from browser path or URL hash
function resolveRoute() {
  if (typeof window === 'undefined') return 'main';
  const path = (window.location.pathname || '').toLowerCase();
  const hash = (window.location.hash || '').toLowerCase().replace('#', '');

  if (path === '/admin' || path.startsWith('/admin/') || hash === 'admin') {
    return 'admin';
  }
  if (path === '/guest' || path.startsWith('/guest/') || hash === 'guest') {
    return 'guest';
  }
  if (path === '/login' || path.startsWith('/login/') || hash === 'login') {
    return 'login';
  }
  return 'main';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(resolveRoute);
  const [isAdminAuthed, setIsAdminAuthed] = useState(() => extrasService.isAdminAuthenticated());
  const [isGuestAuthed, setIsGuestAuthed] = useState(() => extrasService.isGuestAuthenticated());
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [initialBookingData, setInitialBookingData] = useState({});
  const [appliedOffer, setAppliedOffer] = useState(null);

  // Sync route and auth state on popstate & hashchange & extrasService notifications
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(resolveRoute());
      setIsAdminAuthed(extrasService.isAdminAuthenticated());
      setIsGuestAuthed(extrasService.isGuestAuthenticated());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Initial PageView tracking for Meta Pixel, GA4, Google Ads
    tracker.trackPageView('2 Bentley Bridge Cottages - Official Luxury Website');

    // Check if landing directly with an offer hash e.g. #offer-autumn
    const hash = window.location.hash.replace('#', '');
    if (hash && hash.startsWith('offer-')) {
      const matchedOffer = offersData.find(o => o.hash === hash);
      if (matchedOffer) {
        setAppliedOffer(matchedOffer);
      }
    }

    // Subscribe to extrasService state changes (e.g. loginAdmin, logoutAdmin, loginGuest)
    const unsub = extrasService.subscribe(() => {
      setIsAdminAuthed(extrasService.isAdminAuthenticated());
      setIsGuestAuthed(extrasService.isGuestAuthenticated());
    });

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      unsub();
    };
  }, []);

  const navigateTo = (route, targetHash = '') => {
    setCurrentRoute(route);
    let target = '/';
    if (route === 'admin') target = '#admin';
    else if (route === 'guest') target = '#guest';
    else if (route === 'login') target = '#login';
    else if (targetHash) target = `#${targetHash}`;

    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', target);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (customData = null) => {
    if (customData) {
      setInitialBookingData(customData);
    }
    setBookingModalOpen(true);
  };

  const handleClaimOffer = (offer) => {
    setAppliedOffer(offer);
    setInitialBookingData({
      checkIn: '',
      checkOut: '',
      guests: 2,
      dog: offer.id === 'offer-dogfriendly'
    });
    setBookingModalOpen(true);
  };

  const handleNavigate = (sectionId) => {
    // If currently in a portal view, switch back to main view first
    if (currentRoute !== 'main') {
      setCurrentRoute('main');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 50);
      return;
    }
    scrollToSection(sectionId);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = Math.max(0, elementPosition + window.pageYOffset - headerOffset);

      try {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } catch (err) {
        el.scrollIntoView({ behavior: 'smooth' });
      }

      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, `#${sectionId}`);
      }
    }
  };

  // --- ROUTE 1: ADMIN PORTAL ---
  if (currentRoute === 'admin') {
    if (!isAdminAuthed) {
      return (
        <LoginPage 
          initialRole="admin"
          onSuccess={() => {
            setIsAdminAuthed(true);
            setCurrentRoute('admin');
            if (window.history && window.history.pushState) {
              window.history.pushState(null, '', '#admin');
            }
          }}
          onReturnToHome={() => navigateTo('main')}
        />
      );
    }
    return (
      <AdminPortalView 
        onReturnToHome={() => navigateTo('main')}
        onLogout={() => {
          extrasService.logoutAdmin();
          setIsAdminAuthed(false);
          navigateTo('main');
        }}
      />
    );
  }

  // --- ROUTE 2: GUEST CONCIERGE HUB ---
  if (currentRoute === 'guest') {
    if (!isGuestAuthed) {
      return (
        <LoginPage 
          initialRole="guest"
          onSuccess={() => {
            setIsGuestAuthed(true);
            setCurrentRoute('guest');
            if (window.history && window.history.pushState) {
              window.history.pushState(null, '', '#guest');
            }
          }}
          onReturnToHome={() => navigateTo('main')}
        />
      );
    }
    return (
      <GuestPortalView 
        onReturnToHome={() => navigateTo('main')}
        onLogout={() => {
          extrasService.logoutGuest();
          setIsGuestAuthed(false);
          navigateTo('main');
        }}
        onBrowseExtras={() => {
          navigateTo('main');
          setTimeout(() => scrollToSection('enhance-stay'), 100);
        }}
      />
    );
  }

  // --- ROUTE 3: DEDICATED LOGIN HUB ---
  if (currentRoute === 'login') {
    return (
      <LoginPage 
        initialRole="admin"
        onSuccess={(role) => {
          if (role === 'admin') {
            setIsAdminAuthed(true);
            navigateTo('admin');
          } else {
            setIsGuestAuthed(true);
            navigateTo('guest');
          }
        }}
        onReturnToHome={() => navigateTo('main')}
      />
    );
  }

  // --- ROUTE 4: MAIN COTTAGE WEBSITE ---
  return (
    <div className="emarat-clone-layout">
      {/* 1. Floating Transparent & Sticky Navbar (Emarat Style) */}
      <Header 
        onOpenBooking={() => handleOpenBooking()} 
        onNavigate={handleNavigate}
        onOpenAdmin={() => navigateTo('admin')}
        onOpenGuest={() => navigateTo('guest')}
      />

      <main id="main-content">
        
        {/* 2. Hero Section: 100vh Full-Bleed + Bottom-Left Stacked Serif + SCROLL Line */}
        <HeroSection 
          onOpenBooking={handleOpenBooking}
          onExploreCottage={() => handleNavigate('spaces')}
        />

        {/* 3. Section 2: About & 3 Value Pillars (Emarat About Layout) */}
        <AboutPillarsSection 
          onOpenBooking={() => handleOpenBooking()}
          onExploreRooms={() => handleNavigate('spaces')}
        />

        {/* 4. Section 3: Character & Signature Spaces */}
        <LuxuryRedefinedSection 
          onExploreRooms={() => handleNavigate('spaces')}
        />

        {/* 5. Section 4: Room & Space Spotlight (Sitting Room, Double & Twin Bedrooms, Kitchen/Diner, Patio, Pets) */}
        <ResidenceSpotlightSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6. Section 5: Everything You Need for an Easy Stay & Good to Know */}
        <AmenitiesAndEssentialsSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6B. Enhance Your Stay: Book Extras, Local Services & Experiences */}
        <EnhanceYourStaySection />

        {/* 7. Section 6: Step Outside and Start Exploring (Walks, Local Matlock, Beyond Matlock) */}
        <CategorizedEscapesSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 8. Section 7: Your Perfect Derbyshire Base - Walk. Explore. Relax. Repeat. */}
        <StatementBannerSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 9. Section 8: Location & Connectivity */}
        <ConnectivitySection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 9. Visual Gallery with Fullscreen Lightbox */}
        <InteractiveGallery 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 10. Special Offers Campaigns */}
        <SpecialOffersSection 
          onClaimOffer={handleClaimOffer}
        />

        {/* 11. 48 Hours in Matlock Itinerary */}
        <LocalGuideSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 12. Section 9: High-Conversion Callback / Direct Enquiry Section */}
        <CallbackEnquirySection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 13. Verified Guest Reviews & Ratings */}
        <GuestReviewsSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 14. VIP Priority Dates Email Capture */}
        <EmailCaptureSection />

        {/* 15. Search & Destination Guides Hub */}
        <SEOHubSection 
          onOpenBooking={() => handleOpenBooking()}
        />

      </main>

      {/* 16. Section 11: 5-Column Luxury Deep Green Footer (#144231) */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleNavigate}
        onOpenAdmin={() => navigateTo('admin')}
        onOpenGuest={() => navigateTo('guest')}
      />

      {/* Interactive Direct Booking Calendar Engine Modal */}
      <BookingCalendarEngine 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialBookingData={initialBookingData}
        appliedOffer={appliedOffer}
      />

      {/* Mobile Sticky Bottom CTA */}
      <MobileStickyCTA 
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking Recovery Urgency Toast */}
      <BookingRecoveryToast 
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Real-time Marketing & Conversion Pixel Inspector */}
      <AnalyticsTrackerInspector />
    </div>
  );
}
