import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutPillarsSection from './components/AboutPillarsSection';
import LuxuryRedefinedSection from './components/LuxuryRedefinedSection';
import CategorizedEscapesSection from './components/CategorizedEscapesSection';
import StatementBannerSection from './components/StatementBannerSection';
import ConnectivitySection from './components/ConnectivitySection';
import ResidenceSpotlightSection from './components/ResidenceSpotlightSection';
import InteractiveGallery from './components/InteractiveGallery';
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
import { tracker } from './services/analytics';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [initialBookingData, setInitialBookingData] = useState({});
  const [appliedOffer, setAppliedOffer] = useState(null);

  useEffect(() => {
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
  }, []);

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
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="emarat-clone-layout">
      {/* 1. Floating Transparent & Sticky Navbar (Emarat Style) */}
      <Header 
        onOpenBooking={() => handleOpenBooking()} 
        onNavigate={handleNavigate}
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

        {/* 4. Section 3: "Country Luxury Redefined" (Emarat 3-Photo Trio) */}
        <LuxuryRedefinedSection 
          onExploreRooms={() => handleNavigate('spaces')}
        />

        {/* 5. Section 4: Categorized Escapes Showcase Grid (Emarat Holiday Homes Grid) */}
        <CategorizedEscapesSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6. Section 5: Statement Architectural Banner (Emarat Where Life Falls Perfectly) */}
        <StatementBannerSection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 7. Section 6: Location & Connectivity (Emarat Expressway & Badges) */}
        <ConnectivitySection 
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 8. Section 7: Room & Space Spotlight (Emarat "Find Your Dream Home") */}
        <ResidenceSpotlightSection 
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
