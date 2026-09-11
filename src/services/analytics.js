// Marketing & Conversion Tracking Dispatcher
// Simulates and interfaces with Meta Pixel (fbq), Google Analytics 4 (gtag), and Google Ads

class ConversionTracker {
  constructor() {
    this.eventsHistory = [];
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(eventData) {
    this.listeners.forEach(l => l(eventData, this.eventsHistory));
  }

  track(eventName, params = {}) {
    const timestamp = new Date().toLocaleTimeString();
    const eventRecord = {
      id: Math.random().toString(36).substring(2, 9),
      eventName,
      params,
      timestamp,
      channels: ['Meta Pixel (fbq)', 'Google Analytics 4 (gtag)', 'Google Ads Tag']
    };

    this.eventsHistory.unshift(eventRecord);
    if (this.eventsHistory.length > 30) this.eventsHistory.pop();

    // Call real window.fbq if available
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', eventName, params);
      } catch (e) {
        console.warn('fbq error', e);
      }
    }

    // Call real window.gtag if available
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', eventName, params);
      } catch (e) {
        console.warn('gtag error', e);
      }
    }

    // Inform listeners (like our conversion inspector drawer)
    this.notify(eventRecord);

    console.log(`[Conversion Event Fired] ${eventName}`, params);
  }

  // Pre-configured conversion triggers
  trackPageView(pageName = 'Home') {
    this.track('PageView', { page_title: pageName, property: '2 Bentley Bridge Cottages' });
  }

  trackCheckAvailability(source = 'Hero') {
    this.track('ViewContent', {
      content_name: 'Availability Calendar',
      content_category: 'Booking Funnel',
      source
    });
  }

  trackDateSelected(checkIn, checkOut, nights, guests) {
    this.track('InitiateCheckout', {
      content_name: '2 Bentley Bridge Cottages Stay',
      check_in: checkIn,
      check_out: checkOut,
      num_nights: nights,
      guests_count: guests,
      currency: 'GBP'
    });
  }

  trackOfferView(offerTitle, promoCode) {
    this.track('ViewOffer', {
      offer_name: offerTitle,
      promo_code: promoCode
    });
  }

  trackEnquiryStep(stepNumber, stepName) {
    this.track('EnquiryStepCompleted', {
      step: stepNumber,
      step_name: stepName
    });
  }

  trackEnquirySubmitted(bookingData) {
    this.track('Lead', {
      content_name: 'Direct Booking Enquiry',
      value: bookingData.totalPrice,
      currency: 'GBP',
      dates: `${bookingData.checkIn} to ${bookingData.checkOut}`,
      guests: bookingData.guests,
      has_dog: bookingData.hasDog,
      reference: bookingData.refId
    });
  }

  trackEmailLead(email, name) {
    this.track('CompleteRegistration', {
      form_name: 'VIP Available Dates Newsletter',
      lead_type: 'Email Capture'
    });
  }
}

export const tracker = new ConversionTracker();
