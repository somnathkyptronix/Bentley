import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Users, ArrowRight, Dog, Flame, Wifi, MapPin, 
  Bed, Star, ShieldCheck, Check, Sparkles, Compass, Eye, ChevronDown, RotateCcw
} from 'lucide-react';
import { tracker } from '../services/analytics';

export default function HeroSection({ onOpenBooking, onExploreCottage }) {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Quick hero search state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [dogSelected, setDogSelected] = useState(true);

  // Track scroll position inside the 220vh track
  useEffect(() => {
    let animationFrameId = null;

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;
      
      // Calculate normalized progress 0 to 1
      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Subtle 3D mouse parallax when near top
  const handleMouseMove = (e) => {
    if (scrollProgress > 0.3) return; // disable during zoom
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 6; // max 6 deg
    const y = (clientY / innerHeight - 0.5) * -6;
    setMouseOffset({ x, y });
  };

  const handleHeroAvailabilityCheck = (e) => {
    e.preventDefault();
    tracker.trackCheckAvailability('Hero Compact Bar');
    if (checkIn && checkOut) {
      tracker.trackDateSelected(checkIn, checkOut, 3, guests);
    }
    onOpenBooking({ checkIn, checkOut, guests: parseInt(guests), dog: dogSelected });
  };

  // Automated 3D Tour Step Inside Button
  const handleStepInsideTour = () => {
    tracker.track('3DStepInsideClick', { source: 'Hero Button' });
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const targetScrollY = window.scrollY + rect.top + (rect.height - window.innerHeight) * 0.72;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  // Reset back to exterior view
  const handleResetToExterior = () => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top,
      behavior: 'smooth'
    });
  };

  const handleScrollDownToNext = () => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const bottomOfHero = window.scrollY + rect.top + rect.height;
    window.scrollTo({
      top: bottomOfHero,
      behavior: 'smooth'
    });
  };

  // --- Dynamic Mathematical Calculations for 3D Camera ---
  // Exterior Cottage Zoom: scale 1.0 -> 3.2 targeting entrance porch (49% 63%)
  const exteriorScale = 1 + scrollProgress * 3.8;
  const exteriorOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.32) / 0.22));
  
  // Hero UI Overlay (headline, booking form): fades out in first 30% of scroll
  const heroUiOpacity = Math.max(0, Math.min(1, 1 - scrollProgress * 3.4));
  const heroUiTranslateY = -scrollProgress * 140;
  const heroUiScale = Math.max(0.85, 1 - scrollProgress * 0.2);

  // Interior Living Room: begins crossfading at p=0.30, settles at p=0.75
  const interiorOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.28) / 0.26));
  const interiorScale = Math.max(1.0, 1.35 - (scrollProgress - 0.28) * 0.55);

  // Room Spotlight Card: appears at p=0.45 to p=0.92
  const roomCardOpacity = scrollProgress >= 0.42 && scrollProgress <= 0.98
    ? Math.min(1, Math.min((scrollProgress - 0.42) / 0.15, (0.98 - scrollProgress) / 0.12))
    : 0;
  const roomCardTranslateY = scrollProgress >= 0.42 ? Math.max(0, 40 - (scrollProgress - 0.42) * 80) : 40;

  const isInsideRoom = scrollProgress >= 0.48;

  return (
    <section 
      id="home" 
      ref={trackRef} 
      className="hero-3d-track"
      onMouseMove={handleMouseMove}
    >
      {/* Sticky Fullscreen Camera Viewport */}
      <div className="hero-sticky-frame">

        {/* 3D Visual Stage */}
        <div className="hero-camera-viewport">

          {/* LAYER 1: Exterior Cottage (Zooms into Porch & Entrance Door) */}
          <div 
            className="camera-layer exterior-layer"
            style={{
              opacity: exteriorOpacity,
              transform: `perspective(1200px) rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg) scale(${exteriorScale})`,
              transformOrigin: '49% 63%', // Exact coordinates of cottage front door & porch
            }}
          >
            <img 
              src="/images/hero_cottage.jpg" 
              alt="2 Bentley Bridge Cottages - Picturesque Exterior in Upper Lumsdale" 
              className="stage-bg-image"
            />
            {/* Cinematic natural vignette */}
            <div className="camera-vignette exterior-vignette"></div>
          </div>

          {/* LAYER 2: Interior Living Room (Dissolves in as you cross threshold) */}
          <div 
            className="camera-layer interior-layer"
            style={{
              opacity: interiorOpacity,
              transform: `perspective(1200px) scale(${interiorScale})`,
              transformOrigin: 'center center',
            }}
          >
            <img 
              src="/images/living_room.jpg" 
              alt="2 Bentley Bridge Cottages - Cosy Living Room with Wood-Burning Stove" 
              className="stage-bg-image"
            />
            {/* Hearth fire ambient lighting overlay */}
            <div className="camera-vignette interior-vignette"></div>
            <div className="hearth-glow-effect"></div>
          </div>

        </div>

        {/* --- FOREGROUND UI LAYERS --- */}

        {/* UI Phase 1: Main Hero Presentation (Fades out into 3D as you scroll) */}
        <div 
          className="hero-foreground-content"
          style={{
            opacity: heroUiOpacity,
            transform: `translateY(${heroUiTranslateY}px) scale(${heroUiScale})`,
            pointerEvents: heroUiOpacity < 0.15 ? 'none' : 'auto'
          }}
        >
          <div className="container-wide hero-container">
            <div className="hero-content-bottom-left">
              
              {/* Rating / Trust pill */}
              <div className="hero-rating-badge animate-fade-in">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="star-filled" />
                  ))}
                </div>
                <span className="rating-score">4.98 / 5.0</span>
                <span className="rating-divider">&bull;</span>
                <span className="rating-count">48 Verified Reviews</span>
              </div>

              {/* Master Headline - Stacked Luxury Serif */}
              <h1 className="hero-title font-serif animate-fade-in">
                Escape to the Quiet<br />
                Side of the Peak District
              </h1>

              {/* Supporting Copy */}
              <p className="hero-subtitle animate-fade-in">
                Stay at <strong>2 Bentley Bridge Cottages</strong>, a cosy countryside retreat in Upper Lumsdale, 
                minutes from Matlock and within easy reach of the Peak District.
              </p>

              {/* Primary Actions + 3D Interactive Tour Pill */}
              <div className="hero-actions animate-fade-in">
                <button 
                  id="hero-primary-availability-btn"
                  onClick={() => {
                    tracker.trackCheckAvailability('Hero Primary CTA');
                    onOpenBooking();
                  }}
                  className="hero-pill-cta primary"
                >
                  <Calendar size={16} />
                  <span>Check Availability</span>
                </button>

                <button 
                  id="hero-explore-cottage-btn"
                  onClick={() => {
                    tracker.track('ExploreCottageClick', { source: 'Hero Secondary CTA' });
                    onExploreCottage();
                  }}
                  className="hero-pill-cta secondary"
                >
                  <span>Explore the Cottage</span>
                  <ArrowRight size={16} />
                </button>

                {/* Direct 3D Room Entry Trigger */}
                <button
                  id="hero-3d-step-inside-trigger"
                  onClick={handleStepInsideTour}
                  className="hero-pill-cta tour-trigger"
                  title="Experience smooth 3D camera zoom through the front door"
                >
                  <Sparkles size={15} className="sparkle-icon" />
                  <span>Step Inside (3D)</span>
                </button>
              </div>

              {/* Compact Hero Booking Bar - Sleek Glassmorphic Card */}
              <div className="hero-booking-bar-card animate-fade-in">
                <form onSubmit={handleHeroAvailabilityCheck} className="hero-booking-form">
                  {/* Check-in input */}
                  <div className="hero-form-field">
                    <label htmlFor="hero-checkin" className="hero-field-label">
                      <Calendar size={13} /> Check-in
                    </label>
                    <input 
                      type="date" 
                      id="hero-checkin"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="hero-field-input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="hero-field-separator"></div>

                  {/* Check-out input */}
                  <div className="hero-form-field">
                    <label htmlFor="hero-checkout" className="hero-field-label">
                      <Calendar size={13} /> Check-out
                    </label>
                    <input 
                      type="date" 
                      id="hero-checkout"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="hero-field-input"
                      min={checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="hero-field-separator"></div>

                  {/* Guests Selector */}
                  <div className="hero-form-field">
                    <label htmlFor="hero-guests" className="hero-field-label">
                      <Users size={13} /> Guests
                    </label>
                    <select 
                      id="hero-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="hero-field-input select-input"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests (Couple / Friends)</option>
                      <option value="3">3 Guests (Small Family)</option>
                      <option value="4">4 Guests (Max Capacity)</option>
                    </select>
                  </div>

                  <div className="hero-field-separator"></div>

                  {/* Dog Toggle */}
                  <div className="hero-form-field dog-toggle-field">
                    <label className="hero-field-label">
                      <Dog size={13} /> Dog Friendly
                    </label>
                    <button
                      type="button"
                      onClick={() => setDogSelected(!dogSelected)}
                      className={`dog-checkbox-btn ${dogSelected ? 'active' : ''}`}
                    >
                      {dogSelected ? <Check size={14} /> : null}
                      <span>{dogSelected ? 'Yes (Paws Welcome)' : 'No Dogs'}</span>
                    </button>
                  </div>

                  {/* Submit CTA */}
                  <button 
                    type="submit" 
                    id="hero-bar-submit-btn"
                    className="hero-bar-submit"
                  >
                    <span>Check Availability</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              </div>

              {/* Key Property Highlights Bar */}
              <div className="property-specs-banner animate-fade-in">
                <div className="spec-pill">
                  <Users size={14} className="spec-icon" />
                  <span>Sleeps 4</span>
                </div>
                <span className="spec-dot">&bull;</span>
                <div className="spec-pill">
                  <Bed size={14} className="spec-icon" />
                  <span>2 Bedrooms</span>
                </div>
                <span className="spec-dot">&bull;</span>
                <div className="spec-pill">
                  <Dog size={14} className="spec-icon" />
                  <span>Dog Friendly</span>
                </div>
                <span className="spec-dot">&bull;</span>
                <div className="spec-pill">
                  <Flame size={14} className="spec-icon" />
                  <span>Wood-Burning Stove</span>
                </div>
                <span className="spec-dot">&bull;</span>
                <div className="spec-pill">
                  <Wifi size={14} className="spec-icon" />
                  <span>Wi-Fi</span>
                </div>
                <span className="spec-dot">&bull;</span>
                <div className="spec-pill">
                  <MapPin size={14} className="spec-icon" />
                  <span>Matlock &bull; DE4 5LB</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* UI Phase 2: "Step Inside" Living Room Spotlight (Revealed once camera crosses doorway) */}
        <div 
          className="room-entry-spotlight-layer"
          style={{
            opacity: roomCardOpacity,
            transform: `translateY(${roomCardTranslateY}px)`,
            pointerEvents: roomCardOpacity > 0.3 ? 'auto' : 'none'
          }}
        >
          <div className="container-wide">
            <div className="room-entry-card glass-panel">
              <div className="room-entry-header">
                <div className="room-badge">
                  <Sparkles size={14} className="sparkle-gold" />
                  <span>STEPPING INSIDE &bull; 2 BENTLEY BRIDGE</span>
                </div>
                <span className="room-tag">The Living Room &bull; Hearth Sanctuary</span>
              </div>

              <h2 className="room-entry-title font-serif">
                The Inglenook Fireside Retreat
              </h2>

              <p className="room-entry-desc">
                Cross the stone threshold into quiet luxury. A roaring cast-iron wood-burning stove, 
                authentic exposed Derbyshire gritstone, deep plush seating, and warm woollen throws await 
                after a day exploring Lumsdale Valley waterfalls and Peak District trails.
              </p>

              <div className="room-specs-row">
                <span className="room-spec-chip"><Flame size={14} /> Wood-Burning Stove + Kiln Logs</span>
                <span className="room-spec-chip"><Users size={14} /> Cosy 4-Person Seating</span>
                <span className="room-spec-chip"><Dog size={14} /> Fireside Dog Bed Included</span>
                <span className="room-spec-chip"><Wifi size={14} /> High-Speed Wi-Fi &amp; 4K TV</span>
              </div>

              <div className="room-entry-actions">
                <button 
                  onClick={() => {
                    tracker.trackCheckAvailability('3D Room Entry Card');
                    onOpenBooking();
                  }}
                  className="room-action-btn primary"
                >
                  <Calendar size={15} />
                  <span>Book This Cottage</span>
                </button>
                <button 
                  onClick={handleScrollDownToNext}
                  className="room-action-btn secondary"
                >
                  <span>Explore All Spaces &darr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Emarat-Style Centered "SCROLL" Indicator at Bottom */}
        <div 
          className="emarat-scroll-indicator" 
          onClick={handleStepInsideTour}
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 3.5),
            pointerEvents: scrollProgress > 0.2 ? 'none' : 'auto'
          }}
        >
          <span className="scroll-text">SCROLL TO STEP INSIDE</span>
          <div className="scroll-line-container">
            <div className="scroll-line-animated"></div>
          </div>
        </div>

      </div>

      <style>{`
        /* The Outer Track: 220vh provides smooth scroll distance for camera travel */
        .hero-3d-track {
          position: relative;
          height: 220vh;
          background-color: var(--color-forest-dark);
        }

        /* Sticky Viewport locks at top=0 while scrolling through the track */
        .hero-sticky-frame {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* 3D Camera Viewport */
        .hero-camera-viewport {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          background-color: #0A140F;
        }

        .camera-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          will-change: transform, opacity;
          transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stage-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 32%;
          display: block;
        }

        /* Exterior layer vignette */
        .exterior-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(14, 30, 24, 0.45) 0%,
            rgba(14, 30, 24, 0.05) 30%,
            rgba(14, 30, 24, 0.35) 60%,
            rgba(14, 30, 24, 0.88) 90%,
            rgba(14, 30, 24, 0.98) 100%
          );
        }

        /* Interior living room vignette & fireplace warmth */
        .interior-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 55%,
            rgba(255, 180, 80, 0.12) 0%,
            rgba(14, 30, 24, 0.4) 60%,
            rgba(10, 22, 18, 0.85) 100%
          );
        }

        .hearth-glow-effect {
          position: absolute;
          bottom: 18%;
          left: 42%;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 140, 40, 0.28) 0%, transparent 70%);
          filter: blur(28px);
          pointer-events: none;
          animation: hearthPulse 4s ease-in-out infinite alternate;
        }

        @keyframes hearthPulse {
          0% { transform: scale(0.95); opacity: 0.65; }
          100% { transform: scale(1.15); opacity: 0.95; }
        }

        /* Foreground Content */
        .hero-foreground-content {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding-top: 6.8rem;
          padding-bottom: 2.2rem;
          box-sizing: border-box;
          will-change: transform, opacity;
          transition: transform 0.15s ease-out, opacity 0.15s ease-out;
        }

        .hero-container {
          position: relative;
          width: 100%;
          margin-top: auto;
        }

        .hero-content-bottom-left {
          max-width: 860px;
          text-align: left;
          padding-left: 0.5rem;
          margin-bottom: 0.6rem;
        }

        .hero-rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.3rem 0.85rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.85rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .stars-row {
          display: flex;
          gap: 2px;
        }

        .star-filled {
          fill: #E7C970;
          color: #E7C970;
        }

        .rating-score {
          font-weight: 700;
          font-size: 0.84rem;
          color: #FFFFFF;
        }

        .rating-divider {
          color: rgba(255, 255, 255, 0.4);
        }

        .rating-count {
          font-size: 0.8rem;
          color: #F8F5E5;
          font-weight: 500;
        }

        /* Grand Luxury Serif Title */
        .hero-title {
          font-size: clamp(2.3rem, 4.4vw, 3.9rem);
          font-weight: 400;
          line-height: 1.08;
          color: #FFFFFF;
          margin-bottom: 0.85rem;
          letter-spacing: -0.015em;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.65), 0 1px 3px rgba(0, 0, 0, 0.5);
        }

        .hero-subtitle {
          font-size: clamp(0.96rem, 1.4vw, 1.15rem);
          color: #E8E2D0;
          max-width: 660px;
          line-height: 1.5;
          margin-bottom: 1.2rem;
          font-weight: 400;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6);
        }

        .hero-subtitle strong {
          color: #FFFFFF;
          font-weight: 700;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.1rem;
          flex-wrap: wrap;
        }

        .hero-pill-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.72rem 1.5rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          transition: all var(--transition-smooth);
        }

        .hero-pill-cta.primary {
          background-color: var(--color-primary);
          color: #FFFFFF;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
        }

        .hero-pill-cta.primary:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.45);
        }

        .hero-pill-cta.secondary {
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          color: #FFFFFF;
          border: 1.5px solid rgba(255, 255, 255, 0.65);
        }

        .hero-pill-cta.secondary:hover {
          background-color: #FFFFFF;
          color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .hero-pill-cta.tour-trigger {
          background: linear-gradient(135deg, rgba(197, 162, 103, 0.35) 0%, rgba(20, 66, 49, 0.5) 100%);
          backdrop-filter: blur(10px);
          color: #FFFFFF;
          border: 1.5px solid rgba(197, 162, 103, 0.7);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .hero-pill-cta.tour-trigger:hover {
          background: var(--color-gold);
          color: var(--color-forest-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(197, 162, 103, 0.4);
        }

        .sparkle-icon {
          color: #E7C970;
        }

        /* Compact Hero Booking Bar */
        .hero-booking-bar-card {
          background-color: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(14px);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.95rem;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.5);
          margin-bottom: 0.95rem;
          max-width: 820px;
        }

        .hero-booking-form {
          display: grid;
          grid-template-columns: 1.2fr auto 1.2fr auto 1.3fr auto 1.3fr 1.6fr;
          align-items: center;
          gap: 0.7rem;
        }

        .hero-form-field {
          text-align: left;
          padding: 0.25rem 0.5rem;
        }

        .hero-field-label {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-sage);
          margin-bottom: 0.25rem;
        }

        .hero-field-input {
          width: 100%;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-body);
          outline: none;
          cursor: pointer;
        }

        .hero-field-separator {
          width: 1px;
          height: 32px;
          background-color: var(--color-sand);
        }

        .dog-checkbox-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid var(--color-sand);
          background-color: var(--bg-cream);
          color: var(--color-primary);
          transition: all var(--transition-fast);
        }

        .dog-checkbox-btn.active {
          background-color: var(--color-sage-bg);
          border-color: var(--color-sage);
          color: var(--color-olive);
        }

        .hero-bar-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          height: 46px;
          padding: 0.7rem 1.1rem;
          font-size: 0.9rem;
          font-weight: 700;
          white-space: nowrap;
          background-color: var(--color-primary);
          color: #FFFFFF;
          border-radius: var(--radius-sm);
          box-shadow: 0 4px 14px rgba(47, 69, 83, 0.25);
          transition: all var(--transition-smooth);
        }

        .hero-bar-submit:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
        }

        /* Property specs ribbon */
        .property-specs-banner {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.65rem;
          background-color: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 0.42rem 1.1rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.65rem;
        }

        .spec-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .spec-icon {
          color: #E7C970;
        }

        .spec-dot {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.75rem;
        }

        /* --- UI Phase 2: Room Entry Spotlight Card --- */
        .room-entry-spotlight-layer {
          position: absolute;
          inset: 0;
          z-index: 15;
          display: flex;
          align-items: flex-end;
          padding-bottom: 4rem;
          will-change: transform, opacity;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .room-entry-card {
          max-width: 720px;
          background: rgba(14, 30, 24, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1.5px solid rgba(197, 162, 103, 0.4);
          border-radius: var(--radius-lg);
          padding: 2rem 2.4rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          text-align: left;
        }

        .room-entry-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.9rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .room-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(197, 162, 103, 0.2);
          border: 1px solid var(--color-gold);
          padding: 0.28rem 0.8rem;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--color-gold);
        }

        .sparkle-gold {
          color: #E7C970;
        }

        .room-tag {
          font-size: 0.78rem;
          color: #DDD6C6;
          letter-spacing: 0.08em;
          font-weight: 600;
        }

        .room-entry-title {
          font-size: clamp(1.8rem, 3.2vw, 2.7rem);
          color: #FFFFFF;
          margin-bottom: 0.8rem;
          line-height: 1.15;
        }

        .room-entry-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #E6E0D2;
          margin-bottom: 1.4rem;
        }

        .room-specs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.6rem;
        }

        .room-spec-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .room-entry-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .room-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.75rem 1.6rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-smooth);
        }

        .room-action-btn.primary {
          background: var(--color-gold);
          color: var(--color-forest-dark);
          border: 1.5px solid var(--color-gold);
          box-shadow: 0 6px 20px rgba(197, 162, 103, 0.35);
        }

        .room-action-btn.primary:hover {
          background: #D8B77D;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(197, 162, 103, 0.5);
        }

        .room-action-btn.secondary {
          background: transparent;
          color: #FFFFFF;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
        }

        .room-action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* Bottom Centered Scroll Prompt */
        .emarat-scroll-indicator {
          position: absolute;
          bottom: 1.2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity var(--transition-fast);
        }

        .emarat-scroll-indicator:hover {
          opacity: 1;
        }

        .scroll-text {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #FFFFFF;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        .scroll-line-container {
          width: 1px;
          height: 28px;
          background-color: rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        .scroll-line-animated {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background-color: #FFFFFF;
          animation: scrollDown 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }

        @media (max-height: 800px) {
          .hero-foreground-content {
            padding-top: 5.6rem;
            padding-bottom: 1.5rem;
          }
          .hero-title {
            font-size: clamp(2rem, 3.6vw, 2.9rem);
            margin-bottom: 0.5rem;
          }
          .hero-subtitle {
            font-size: 0.92rem;
            margin-bottom: 0.75rem;
            line-height: 1.45;
          }
          .hero-rating-badge {
            margin-bottom: 0.5rem;
            padding: 0.25rem 0.75rem;
          }
          .hero-actions {
            margin-bottom: 0.75rem;
          }
          .hero-pill-cta {
            padding: 0.55rem 1.1rem;
            font-size: 0.82rem;
          }
          .hero-booking-bar-card {
            padding: 0.5rem 0.8rem;
            margin-bottom: 0.7rem;
          }
          .property-specs-banner {
            padding: 0.32rem 0.85rem;
            margin-bottom: 0.5rem;
          }
          .emarat-scroll-indicator {
            display: none;
          }
          .room-entry-card {
            padding: 1.4rem 1.8rem;
          }
        }

        @media (max-width: 1024px) {
          .hero-booking-form {
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem;
          }
          .hero-field-separator {
            display: none;
          }
          .hero-bar-submit {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .hero-3d-track {
            height: 160vh;
          }
          .hero-foreground-content {
            padding: 5.2rem 0.5rem 1.8rem 0.5rem;
          }
          .hero-content-bottom-left {
            padding-left: 0;
            margin-bottom: 0.4rem;
          }
          .hero-rating-badge {
            margin-bottom: 0.5rem;
            padding: 0.25rem 0.65rem;
          }
          .hero-title {
            font-size: clamp(1.85rem, 7vw, 2.35rem);
            line-height: 1.1;
            margin-bottom: 0.5rem;
          }
          .hero-subtitle {
            font-size: 0.88rem;
            line-height: 1.45;
            margin-bottom: 0.8rem;
          }
          .hero-booking-form {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .hero-bar-submit {
            grid-column: span 1;
            height: 42px;
            font-size: 0.86rem;
          }
          .emarat-scroll-indicator {
            display: none;
          }
          .room-entry-spotlight-layer {
            padding-bottom: 4.8rem;
          }
          .room-entry-card {
            padding: 1.15rem 1.15rem;
            margin: 0 0.35rem;
          }
          .room-entry-title {
            font-size: 1.35rem;
            margin-bottom: 0.5rem;
          }
          .room-entry-desc {
            font-size: 0.82rem;
            line-height: 1.48;
            margin-bottom: 0.9rem;
          }
          .room-specs-row {
            gap: 0.4rem;
            margin-bottom: 1rem;
          }
          .room-spec-chip {
            font-size: 0.72rem;
            padding: 0.25rem 0.5rem;
          }
          .room-entry-actions {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
          }
          .room-action-btn {
            width: 100%;
            justify-content: center;
            padding: 0.65rem;
            font-size: 0.82rem;
          }
        }

        @media (max-width: 540px) {
          .hero-actions {
            flex-direction: column;
            gap: 0.45rem;
            margin-bottom: 0.75rem;
          }
          .hero-pill-cta {
            width: 100%;
            justify-content: center;
            padding: 0.6rem 1rem;
            font-size: 0.82rem;
          }
          .hero-booking-bar-card {
            padding: 0.6rem 0.75rem;
            margin-bottom: 0.55rem;
          }
          .property-specs-banner {
            padding: 0.35rem 0.6rem;
            gap: 0.4rem;
            justify-content: center;
          }
          .spec-dot {
            display: none;
          }
          .spec-pill {
            background: rgba(255, 255, 255, 0.12);
            padding: 0.2rem 0.5rem;
            border-radius: var(--radius-full);
            font-size: 0.72rem;
          }
        }
      `}</style>
    </section>
  );
}
