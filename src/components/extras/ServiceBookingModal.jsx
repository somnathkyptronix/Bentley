import React, { useState } from 'react';
import { 
  X, Check, Plus, Minus, Calendar, Clock, MapPin, 
  Bike, Flame, Sparkles, UtensilsCrossed, ShoppingBag, 
  Compass, Navigation, Footprints, ShieldCheck, Info, ArrowRight, ExternalLink
} from 'lucide-react';
import { 
  extrasService, 
  initialFridgePackages, 
  initialChefs, 
  initialAttractions, 
  initialTours 
} from '../../services/extrasService';

export default function ServiceBookingModal({ 
  service, 
  isOpen, 
  onClose, 
  onOpenBasket 
}) {
  if (!isOpen || !service) return null;

  const [notification, setNotification] = useState(null);

  // E-BIKE HIRE STATE
  const [ebikeQty, setEbikeQty] = useState(2);
  const [ebikeDate, setEbikeDate] = useState(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [ebikeTime, setEbikeTime] = useState('09:30 AM');
  const [ebikeDuration, setEbikeDuration] = useState('Half-day'); // Hourly | Half-day | Full-day | Multi-day
  const [ebikeHelmet, setEbikeHelmet] = useState(true);
  const [ebikePanniers, setEbikePanniers] = useState(false);
  const [ebikeChildSeat, setEbikeChildSeat] = useState(false);
  const [ebikeDelivery, setEbikeDelivery] = useState('cottage'); // cottage | depot

  // PROPERTY EXTRAS / HOT TUB STATE (Dynamic products from extrasService)
  const propertyExtrasList = extrasService.getPropertyExtras();
  const [extrasQuantities, setExtrasQuantities] = useState({});

  // LOGS FOR THE BURNER STATE
  const [logQty, setLogQty] = useState(2);
  const [logDate, setLogDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [logTime, setLogTime] = useState('Prior to Check-in (Before 4 PM)');
  const [logBookingRef, setLogBookingRef] = useState('');

  // PRIVATE CHEF STATE
  const [chefId, setChefId] = useState('chef-julian');
  const [chefMealType, setChefMealType] = useState('Dinner'); // Breakfast | Lunch | Dinner | BBQ | Celebration meal | Custom meal
  const [chefDate, setChefDate] = useState(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
  const [chefTime, setChefTime] = useState('7:00 PM');
  const [chefGuests, setChefGuests] = useState(4);
  const [chefDietary, setChefDietary] = useState([]);
  const [chefCustomNotes, setChefCustomNotes] = useState('');

  // FRIDGE FILLED STATE
  const [fridgeArrivalDate, setFridgeArrivalDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [fridgePackageId, setFridgePackageId] = useState('pack-breakfast');
  const [fridgePkgQty, setFridgePkgQty] = useState(1);
  const [fridgeDietary, setFridgeDietary] = useState('');
  const [fridgeCustomItems, setFridgeCustomItems] = useState('');

  // ATTRACTIONS STATE & FILTERS
  const [attractionCategory, setAttractionCategory] = useState('All');
  const [attractionFamilyOnly, setAttractionFamilyOnly] = useState(false);

  // E-BIKE GUIDE STATE
  const [ebikeTourId, setEbikeTourId] = useState('tour-ebike-monsal');
  const [ebikeTourDate, setEbikeTourDate] = useState(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [ebikeTourTime, setEbikeTourTime] = useState('10:00 AM');
  const [ebikeTourGuests, setEbikeTourGuests] = useState(2);
  const [ebikeTourIncludeBike, setEbikeTourIncludeBike] = useState(true);

  // WALKING GUIDE STATE
  const [walkTourId, setWalkTourId] = useState('walk-lumsdale-ruins');
  const [walkTourDate, setWalkTourDate] = useState(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [walkTourTime, setWalkTourTime] = useState('10:30 AM');
  const [walkTourGuests, setWalkTourGuests] = useState(2);
  const [walkSpecialReqs, setWalkSpecialReqs] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // CALCULATE SERVICE PRICE
  const calculatePrice = () => {
    switch (service.id) {
      case 'ebike-hire': {
        const rates = { 'Hourly': 15, 'Half-day': 35, 'Full-day': 55, 'Multi-day': 130 };
        const base = (rates[ebikeDuration] || 35) * ebikeQty;
        const gear = (ebikePanniers ? 5 : 0) + (ebikeChildSeat ? 10 : 0);
        return base + gear;
      }
      case 'hot-tub-extras': {
        return Object.entries(extrasQuantities).reduce((sum, [id, qty]) => {
          const item = propertyExtrasList.find(p => p.id === id);
          return sum + (item ? item.price * qty : 0);
        }, 0);
      }
      case 'logs-burner':
        return logQty * 14;
      case 'private-chef': {
        const selectedChef = initialChefs.find(c => c.id === chefId) || initialChefs[0];
        return selectedChef.pricePerGuest * chefGuests;
      }
      case 'fridge-filled': {
        const pkg = initialFridgePackages.find(p => p.id === fridgePackageId) || initialFridgePackages[0];
        return pkg.price * fridgePkgQty;
      }
      case 'ebike-guide': {
        const tour = initialTours.ebike.find(t => t.id === ebikeTourId) || initialTours.ebike[0];
        const bikeAddon = ebikeTourIncludeBike ? 25 : 0;
        return (tour.price + bikeAddon) * ebikeTourGuests;
      }
      case 'walking-guide': {
        const tour = initialTours.walking.find(t => t.id === walkTourId) || initialTours.walking[0];
        return tour.price * walkTourGuests;
      }
      default:
        return service.startingPrice || 0;
    }
  };

  // ADD TO BASKET HANDLER
  const handleAddToBasket = (proceedToCheckout = false) => {
    const calculated = calculatePrice();
    let basketPayload = null;

    switch (service.id) {
      case 'ebike-hire':
        basketPayload = {
          id: 'ebike-hire',
          name: `E-Bike Hire (${ebikeQty}x ${ebikeDuration})`,
          price: calculated / ebikeQty,
          quantity: ebikeQty,
          bookingDate: ebikeDate,
          timeSlot: `${ebikeTime} (${ebikeDuration})`,
          supplierName: 'Peak E-Bikes Matlock',
          deliveryLocation: ebikeDelivery === 'cottage' ? 'Delivered to 2 Bentley Bridge Cottages' : 'Collect at Depot (Matlock)',
          instructions: `Helmets: ${ebikeHelmet ? 'Yes' : 'Own'}, Panniers: ${ebikePanniers ? 'Yes' : 'No'}, Child Seat: ${ebikeChildSeat ? 'Yes' : 'No'}`
        };
        extrasService.addToBasket(basketPayload);
        break;

      case 'hot-tub-extras': {
        let addedCount = 0;
        Object.entries(extrasQuantities).forEach(([pId, qty]) => {
          if (qty > 0) {
            const product = propertyExtrasList.find(p => p.id === pId);
            if (product) {
              extrasService.addToBasket({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: qty,
                supplierName: '2 Bentley Bridge Housekeeping',
                deliveryLocation: '2 Bentley Bridge Cottages',
                instructions: 'Prepared prior to guest arrival'
              });
              addedCount += qty;
            }
          }
        });
        if (addedCount === 0) {
          alert('Please select at least one property extra to add.');
          return;
        }
        break;
      }

      case 'logs-burner':
        basketPayload = {
          id: 'logs-burner',
          name: `Logs for Burner (${logQty} Bundles)`,
          price: 14,
          quantity: logQty,
          bookingDate: logDate,
          timeSlot: logTime,
          supplierName: 'Derbyshire Hardwood Co.',
          deliveryLocation: 'Cottage Hearth Inglenook',
          instructions: `Booking Ref: ${logBookingRef || 'Current Stay'}`
        };
        extrasService.addToBasket(basketPayload);
        break;

      case 'private-chef': {
        const chef = initialChefs.find(c => c.id === chefId) || initialChefs[0];
        basketPayload = {
          id: 'private-chef',
          name: `Private Chef ${chefMealType} with ${chef.name}`,
          price: calculated / chefGuests,
          quantity: chefGuests,
          bookingDate: chefDate,
          timeSlot: chefTime,
          supplierName: chef.name,
          deliveryLocation: '2 Bentley Bridge Kitchen & Dining',
          instructions: `Guests: ${chefGuests}. Dietary: ${chefDietary.join(', ') || 'None'}. Notes: ${chefCustomNotes || 'None'}`
        };
        extrasService.addToBasket(basketPayload);
        break;
      }

      case 'fridge-filled': {
        const pkg = initialFridgePackages.find(p => p.id === fridgePackageId) || initialFridgePackages[0];
        basketPayload = {
          id: 'fridge-filled',
          name: `Fridge Fill: ${pkg.name}`,
          price: pkg.price,
          quantity: fridgePkgQty,
          bookingDate: fridgeArrivalDate,
          timeSlot: 'Unpacked Prior to 4 PM Check-in',
          supplierName: 'Peak District Farm Larder',
          deliveryLocation: 'Cottage Kitchen Refrigerator & Pantry',
          instructions: `Dietary: ${fridgeDietary || 'Standard'}. Custom requests: ${fridgeCustomItems || 'None'}`
        };
        extrasService.addToBasket(basketPayload);
        break;
      }

      case 'ebike-guide': {
        const tour = initialTours.ebike.find(t => t.id === ebikeTourId) || initialTours.ebike[0];
        basketPayload = {
          id: 'ebike-guide',
          name: `Guided E-Bike Tour: ${tour.title}`,
          price: calculated / ebikeTourGuests,
          quantity: ebikeTourGuests,
          bookingDate: ebikeTourDate,
          timeSlot: ebikeTourTime,
          supplierName: tour.guide,
          deliveryLocation: 'Departure from Cottage Gate',
          instructions: `Party of ${ebikeTourGuests}. E-Bike Hire Included: ${ebikeTourIncludeBike ? 'Yes' : 'Bring Own'}`
        };
        extrasService.addToBasket(basketPayload);
        break;
      }

      case 'walking-guide': {
        const tour = initialTours.walking.find(t => t.id === walkTourId) || initialTours.walking[0];
        basketPayload = {
          id: 'walking-guide',
          name: `Guided Walk: ${tour.title}`,
          price: tour.price,
          quantity: walkTourGuests,
          bookingDate: walkTourDate,
          timeSlot: walkTourTime,
          supplierName: tour.guide,
          deliveryLocation: tour.meetingPoint,
          instructions: `Party of ${walkTourGuests}. Notes: ${walkSpecialReqs || 'None'}`
        };
        extrasService.addToBasket(basketPayload);
        break;
      }

      default:
        break;
    }

    showNotification('Added to your Stay Basket!');
    if (proceedToCheckout) {
      setTimeout(() => {
        onClose();
        if (onOpenBasket) onOpenBasket();
      }, 400);
    }
  };

  const totalPrice = calculatePrice();

  return (
    <div className="eys-modal-backdrop" onClick={onClose}>
      <div className="eys-modal-window" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="eys-modal-header">
          <div>
            <span className="eys-eyebrow">{service.category}</span>
            <h3 className="eys-modal-title">{service.name}</h3>
            <p className="eys-modal-subtitle">{service.leadTime}</p>
          </div>
          <button onClick={onClose} className="eys-modal-close-btn" aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        {/* NOTIFICATION TOAST */}
        {notification && (
          <div style={{
            background: 'var(--eys-forest)',
            color: '#fff',
            padding: '10px 20px',
            textAlign: 'center',
            fontSize: '0.88rem',
            fontWeight: 700,
            animation: 'eysFadeIn 0.2s ease'
          }}>
            ✓ {notification}
          </div>
        )}

        {/* BODY */}
        <div className="eys-modal-body">

          {/* 1. E-BIKE HIRE */}
          {service.id === 'ebike-hire' && (
            <div>
              <p style={{ marginBottom: 20, color: 'var(--eys-text-muted)', lineHeight: 1.6 }}>
                Premium Cube and Trek electric hybrid bikes equipped with powerful Bosch motors and long-range batteries. 
                Perfect for effortlessly conquering the Peak District valleys and trails.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
                <div className="eys-form-group">
                  <label className="eys-form-label">Quantity of Bikes</label>
                  <div className="eys-stepper">
                    <button className="eys-stepper-btn" onClick={() => setEbikeQty(Math.max(1, ebikeQty - 1))}>-</button>
                    <span className="eys-stepper-val">{ebikeQty}</span>
                    <button className="eys-stepper-btn" onClick={() => setEbikeQty(Math.min(6, ebikeQty + 1))}>+</button>
                  </div>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Rental Date</label>
                  <input 
                    type="date" 
                    value={ebikeDate} 
                    onChange={(e) => setEbikeDate(e.target.value)} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Preferred Start Time</label>
                  <select value={ebikeTime} onChange={(e) => setEbikeTime(e.target.value)} className="eys-select">
                    <option>09:00 AM</option>
                    <option>09:30 AM</option>
                    <option>10:00 AM</option>
                    <option>01:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Hire Duration</label>
                <div className="eys-options-grid">
                  {[
                    { id: 'Hourly', label: '2-Hour Quick Spin', price: '£15 / bike' },
                    { id: 'Half-day', label: 'Half-Day (4 Hours)', price: '£35 / bike' },
                    { id: 'Full-day', label: 'Full-Day (8 Hours)', price: '£55 / bike' },
                    { id: 'Multi-day', label: '3-Day Adventure', price: '£130 / bike' }
                  ].map(d => (
                    <div 
                      key={d.id} 
                      className={`eys-option-pill ${ebikeDuration === d.id ? 'selected' : ''}`}
                      onClick={() => setEbikeDuration(d.id)}
                    >
                      <span style={{ fontWeight: 700, color: 'var(--eys-forest)' }}>{d.label}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--eys-gold)' }}>{d.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Included &amp; Optional Equipment</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={ebikeHelmet} onChange={(e) => setEbikeHelmet(e.target.checked)} />
                    <span>Complimentary Safety Helmet &amp; High-Security Gold Lock (Included)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={ebikePanniers} onChange={(e) => setEbikePanniers(e.target.checked)} />
                    <span>Waterproof Rear Pannier Bags (+£5)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={ebikeChildSeat} onChange={(e) => setEbikeChildSeat(e.target.checked)} />
                    <span>Child Trail Seat (+£10)</span>
                  </label>
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Delivery or Collection</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button 
                    type="button" 
                    className={`eys-btn-outline ${ebikeDelivery === 'cottage' ? 'active' : ''}`}
                    style={{ background: ebikeDelivery === 'cottage' ? 'var(--eys-forest)' : '#fff', color: ebikeDelivery === 'cottage' ? '#fff' : 'inherit' }}
                    onClick={() => setEbikeDelivery('cottage')}
                  >
                    Direct Cottage Delivery (Free)
                  </button>
                  <button 
                    type="button" 
                    className={`eys-btn-outline ${ebikeDelivery === 'depot' ? 'active' : ''}`}
                    style={{ background: ebikeDelivery === 'depot' ? 'var(--eys-forest)' : '#fff', color: ebikeDelivery === 'depot' ? '#fff' : 'inherit' }}
                    onClick={() => setEbikeDelivery('depot')}
                  >
                    Collect at Matlock Depot
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. HOT TUB & PROPERTY EXTRAS (Dynamic products from admin) */}
          {service.id === 'hot-tub-extras' && (
            <div>
              <p style={{ marginBottom: 20, color: 'var(--eys-text-muted)', lineHeight: 1.6 }}>
                Tailor your holiday with luxury touches. Select any extra amenities below to have them prepared 
                and waiting at 2 Bentley Bridge Cottages upon your arrival.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {propertyExtrasList.map(extra => {
                  const currentQty = extrasQuantities[extra.id] || 0;
                  return (
                    <div key={extra.id} className="eys-product-item">
                      <div className="eys-product-info">
                        <img src={extra.image} alt={extra.name} className="eys-product-thumb" />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <h4 className="eys-product-title">{extra.name}</h4>
                            <span style={{ fontSize: '0.72rem', background: 'var(--eys-cream-dark)', padding: '2px 8px', borderRadius: 4, color: 'var(--eys-forest)', fontWeight: 600 }}>
                              {extra.category}
                            </span>
                          </div>
                          <p className="eys-product-desc">{extra.desc}</p>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--eys-gold)' }}>
                            £{extra.price} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--eys-text-muted)' }}>({extra.unit})</span>
                          </span>
                        </div>
                      </div>

                      <div className="eys-stepper">
                        <button 
                          className="eys-stepper-btn" 
                          onClick={() => setExtrasQuantities({ ...extrasQuantities, [extra.id]: Math.max(0, currentQty - 1) })}
                        >
                          -
                        </button>
                        <span className="eys-stepper-val">{currentQty}</span>
                        <button 
                          className="eys-stepper-btn" 
                          onClick={() => setExtrasQuantities({ ...extrasQuantities, [extra.id]: currentQty + 1 })}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. LOGS FOR THE BURNER */}
          {service.id === 'logs-burner' && (
            <div>
              <p style={{ marginBottom: 20, color: 'var(--eys-text-muted)', lineHeight: 1.6 }}>
                Nothing compares to cosy evenings by the crackling cast-iron woodburning stove. 
                Order extra crates of kiln-dried Derbyshire birch logs and natural kindling delivered directly to your hearth.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
                <div className="eys-form-group">
                  <label className="eys-form-label">Crates of Logs (£14 / bundle)</label>
                  <div className="eys-stepper">
                    <button className="eys-stepper-btn" onClick={() => setLogQty(Math.max(1, logQty - 1))}>-</button>
                    <span className="eys-stepper-val">{logQty}</span>
                    <button className="eys-stepper-btn" onClick={() => setLogQty(Math.min(10, logQty + 1))}>+</button>
                  </div>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Delivery Date</label>
                  <input 
                    type="date" 
                    value={logDate} 
                    onChange={(e) => setLogDate(e.target.value)} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Preferred Delivery Time</label>
                  <select value={logTime} onChange={(e) => setLogTime(e.target.value)} className="eys-select">
                    <option>Prior to Check-in (Before 4 PM)</option>
                    <option>Morning (09:00 - 11:00 AM)</option>
                    <option>Evening (17:00 - 19:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Property / Booking Reference (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. BB-2026-STAY" 
                  value={logBookingRef} 
                  onChange={(e) => setLogBookingRef(e.target.value)} 
                  className="eys-input" 
                />
              </div>

              <div style={{ background: 'var(--eys-cream)', padding: 14, borderRadius: 8, fontSize: '0.85rem', color: 'var(--eys-text-muted)' }}>
                🪵 <strong>What's included:</strong> Kiln-dried hardwood logs (&lt;15% moisture), box of kiln-dried softwood kindling, and eco natural wood-wool firelighters.
              </div>
            </div>
          )}

          {/* 4. PRIVATE CHEF SERVICES */}
          {service.id === 'private-chef' && (
            <div>
              <p style={{ marginBottom: 20, color: 'var(--eys-text-muted)', lineHeight: 1.6 }}>
                Dine in complete seclusion without lifting a finger. Our celebrated private chefs will design, 
                cook, serve, and clean up a memorable meal right in the cottage dining room.
              </p>

              {/* Chef Profiles */}
              <div className="eys-form-group">
                <label className="eys-form-label">Select Your Chef</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                  {initialChefs.map(chef => (
                    <div 
                      key={chef.id}
                      className={`eys-option-pill ${chefId === chef.id ? 'selected' : ''}`}
                      onClick={() => setChefId(chef.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: 'var(--eys-forest)' }}>{chef.name}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--eys-gold)', fontWeight: 700 }}>£{chef.pricePerGuest} / guest</span>
                      </div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--eys-text-muted)' }}>{chef.bio}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--eys-forest)' }}>Specialities: {chef.specialities}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
                <div className="eys-form-group">
                  <label className="eys-form-label">Meal Style</label>
                  <select value={chefMealType} onChange={(e) => setChefMealType(e.target.value)} className="eys-select">
                    <option>Dinner (3-Course Fine Dining)</option>
                    <option>Celebration Feast (4-Course)</option>
                    <option>Gourmet Patio BBQ</option>
                    <option>Champagne Breakfast / Brunch</option>
                    <option>Casual Farmhouse Lunch</option>
                    <option>Custom Bespoke Menu</option>
                  </select>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Number of Guests</label>
                  <div className="eys-stepper">
                    <button className="eys-stepper-btn" onClick={() => setChefGuests(Math.max(2, chefGuests - 1))}>-</button>
                    <span className="eys-stepper-val">{chefGuests}</span>
                    <button className="eys-stepper-btn" onClick={() => setChefGuests(Math.min(6, chefGuests + 1))}>+</button>
                  </div>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Service Date</label>
                  <input 
                    type="date" 
                    value={chefDate} 
                    onChange={(e) => setChefDate(e.target.value)} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Service Time</label>
                  <select value={chefTime} onChange={(e) => setChefTime(e.target.value)} className="eys-select">
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>12:30 PM (Lunch)</option>
                  </select>
                </div>
              </div>

              {/* Sample Menu Preview */}
              <div style={{ background: 'var(--eys-cream)', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                <span className="eys-detail-label" style={{ marginBottom: 6, display: 'block' }}>Sample Menu: {chefId === 'chef-julian' ? 'Julian Wright Tasting Menu' : 'Clare Pemberton Farmhouse Feast'}</span>
                <ul style={{ paddingLeft: 18, fontSize: '0.85rem', color: 'var(--eys-text-main)', lineHeight: 1.6 }}>
                  {(initialChefs.find(c => c.id === chefId) || initialChefs[0]).sampleMenu.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Dietary Requirements &amp; Special Requests</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                  {['Vegetarian', 'Vegan', 'Gluten-Free', 'Nut Allergy', 'Dairy-Free', 'Pescatarian'].map(d => (
                    <label key={d} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={chefDietary.includes(d)} 
                        onChange={(e) => {
                          if (e.target.checked) setChefDietary([...chefDietary, d]);
                          else setChefDietary(chefDietary.filter(item => item !== d));
                        }} 
                      />
                      <span>{d}</span>
                    </label>
                  ))}
                </div>
                <textarea 
                  rows={2} 
                  placeholder="Tell us about celebratory occasions (anniversary, birthday) or favourite ingredients..." 
                  value={chefCustomNotes} 
                  onChange={(e) => setChefCustomNotes(e.target.value)} 
                  className="eys-textarea" 
                />
              </div>
            </div>
          )}

          {/* 5. FRIDGE FILLED BEFORE ARRIVAL */}
          {service.id === 'fridge-filled' && (
            <div>
              <p style={{ marginBottom: 20, color: 'var(--eys-text-muted)', lineHeight: 1.6 }}>
                Step inside to an already stocked refrigerator and pantry filled with authentic 
                Peak District farmhouse treats, fresh local milk, butter, cheeses, and artisanal bakes.
              </p>

              <div className="eys-form-group">
                <label className="eys-form-label">Select Curated Grocery Pack</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                  {initialFridgePackages.map(pkg => (
                    <div 
                      key={pkg.id} 
                      className={`eys-option-pill ${fridgePackageId === pkg.id ? 'selected' : ''}`}
                      onClick={() => setFridgePackageId(pkg.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, color: 'var(--eys-forest)' }}>{pkg.name}</span>
                        <span style={{ fontWeight: 700, color: 'var(--eys-gold)' }}>£{pkg.price}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--eys-text-muted)', margin: '4px 0' }}>{pkg.desc}</p>
                      <span style={{ fontSize: '0.72rem', color: 'var(--eys-forest)', fontWeight: 600 }}>{pkg.serves}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
                <div className="eys-form-group">
                  <label className="eys-form-label">Arrival Date for Delivery</label>
                  <input 
                    type="date" 
                    value={fridgeArrivalDate} 
                    onChange={(e) => setFridgeArrivalDate(e.target.value)} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Quantity of Packs</label>
                  <div className="eys-stepper">
                    <button className="eys-stepper-btn" onClick={() => setFridgePkgQty(Math.max(1, fridgePkgQty - 1))}>-</button>
                    <span className="eys-stepper-val">{fridgePkgQty}</span>
                    <button className="eys-stepper-btn" onClick={() => setFridgePkgQty(Math.min(5, fridgePkgQty + 1))}>+</button>
                  </div>
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Custom Shopping List / Dietary Preferences</label>
                <textarea 
                  rows={3} 
                  placeholder="Enter specific milk types (e.g. Oat/Soya), favourite wines, or custom groceries to pick up..." 
                  value={fridgeCustomItems} 
                  onChange={(e) => setFridgeCustomItems(e.target.value)} 
                  className="eys-textarea" 
                />
              </div>
            </div>
          )}

          {/* 6. LOCAL ATTRACTIONS DIRECTORY */}
          {service.id === 'local-attractions' && (
            <div>
              <p style={{ marginBottom: 16, color: 'var(--eys-text-muted)', lineHeight: 1.6 }}>
                Curated directory of the finest attractions, boat trips, and dining spots in the Peak District. 
                Filter by activity type and family suitability.
              </p>

              {/* Filters */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
                <select 
                  value={attractionCategory} 
                  onChange={(e) => setAttractionCategory(e.target.value)} 
                  className="eys-select"
                  style={{ maxWidth: 220 }}
                >
                  <option>All</option>
                  <option>Family attractions</option>
                  <option>Museums</option>
                  <option>Boat trips</option>
                  <option>Outdoor experiences</option>
                  <option>Restaurants</option>
                  <option>Adventure activities</option>
                </select>

                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={attractionFamilyOnly} 
                    onChange={(e) => setAttractionFamilyOnly(e.target.checked)} 
                  />
                  <span>Family-Friendly Only</span>
                </label>
              </div>

              {/* Attractions Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {initialAttractions
                  .filter(a => attractionCategory === 'All' || a.category === attractionCategory)
                  .filter(a => !attractionFamilyOnly || a.familyFriendly)
                  .map(a => (
                    <div key={a.id} className="eys-product-item" style={{ gap: 16 }}>
                      <img src={a.image} alt={a.name} style={{ width: 90, height: 90, borderRadius: 8, objectFit: 'cover' }} />
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--eys-forest)' }}>{a.name}</h4>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--eys-gold)' }}>{a.price}</span>
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--eys-text-muted)', margin: '4px 0 8px 0' }}>{a.desc}</p>
                        <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem', color: 'var(--eys-text-main)', flexWrap: 'wrap' }}>
                          <span>📍 {a.distance}</span>
                          <span>⏱ {a.duration}</span>
                          <span>✓ {a.availability}</span>
                        </div>
                      </div>
                      <a 
                        href={`https://maps.google.com/?q=${encodeURIComponent(a.name + ' ' + a.location)}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="eys-btn-outline" 
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                      >
                        <span>Explore &amp; Map</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 7. LOCAL E-BIKE GUIDE */}
          {service.id === 'ebike-guide' && (
            <div>
              <p style={{ marginBottom: 20, color: 'var(--eys-text-muted)', lineHeight: 1.6 }}>
                Experience the Peak District with a knowledgeable British Cycling certified guide. 
                Explore scenic railway viaducts, hidden limestone dales, and historic trails with full battery assistance.
              </p>

              <div className="eys-form-group">
                <label className="eys-form-label">Select Guided Route</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                  {initialTours.ebike.map(tour => (
                    <div 
                      key={tour.id} 
                      className={`eys-option-pill ${ebikeTourId === tour.id ? 'selected' : ''}`}
                      onClick={() => setEbikeTourId(tour.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, color: 'var(--eys-forest)' }}>{tour.title}</span>
                        <span style={{ fontWeight: 700, color: 'var(--eys-gold)' }}>£{tour.price} / person</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--eys-text-muted)', margin: '4px 0' }}>{tour.desc}</p>
                      <div style={{ display: 'flex', gap: 8, fontSize: '0.74rem', color: 'var(--eys-forest)', fontWeight: 600 }}>
                        <span>⏱ {tour.duration}</span>
                        <span>📏 {tour.distance}</span>
                        <span>⛰ {tour.difficulty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
                <div className="eys-form-group">
                  <label className="eys-form-label">Number of Participants</label>
                  <div className="eys-stepper">
                    <button className="eys-stepper-btn" onClick={() => setEbikeTourGuests(Math.max(1, ebikeTourGuests - 1))}>-</button>
                    <span className="eys-stepper-val">{ebikeTourGuests}</span>
                    <button className="eys-stepper-btn" onClick={() => setEbikeTourGuests(Math.min(6, ebikeTourGuests + 1))}>+</button>
                  </div>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Tour Date</label>
                  <input 
                    type="date" 
                    value={ebikeTourDate} 
                    onChange={(e) => setEbikeTourDate(e.target.value)} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Start Time</label>
                  <select value={ebikeTourTime} onChange={(e) => setEbikeTourTime(e.target.value)} className="eys-select">
                    <option>09:30 AM</option>
                    <option>10:00 AM</option>
                    <option>01:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="eys-form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={ebikeTourIncludeBike} 
                    onChange={(e) => setEbikeTourIncludeBike(e.target.checked)} 
                  />
                  <span>Include Premium E-Bike Rental &amp; Helmet for each rider (+£25 / person)</span>
                </label>
              </div>
            </div>
          )}

          {/* 8. LOCAL WALKING GUIDE */}
          {service.id === 'walking-guide' && (
            <div>
              <p style={{ marginBottom: 20, color: 'var(--eys-text-muted)', lineHeight: 1.6 }}>
                Enrich your walk with fascinating stories of Peak District geology, industrial history, 
                and folklore led by local expert guides directly from your doorstep.
              </p>

              <div className="eys-form-group">
                <label className="eys-form-label">Select Guided Walking Tour</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                  {initialTours.walking.map(tour => (
                    <div 
                      key={tour.id} 
                      className={`eys-option-pill ${walkTourId === tour.id ? 'selected' : ''}`}
                      onClick={() => setWalkTourId(tour.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, color: 'var(--eys-forest)' }}>{tour.title}</span>
                        <span style={{ fontWeight: 700, color: 'var(--eys-gold)' }}>£{tour.price} / person</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--eys-text-muted)', margin: '4px 0' }}>{tour.desc}</p>
                      <div style={{ display: 'flex', gap: 8, fontSize: '0.74rem', color: 'var(--eys-forest)', fontWeight: 600 }}>
                        <span>⏱ {tour.duration}</span>
                        <span>📍 {tour.meetingPoint}</span>
                        <span>👤 {tour.guide}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
                <div className="eys-form-group">
                  <label className="eys-form-label">Number of Walkers</label>
                  <div className="eys-stepper">
                    <button className="eys-stepper-btn" onClick={() => setWalkTourGuests(Math.max(1, walkTourGuests - 1))}>-</button>
                    <span className="eys-stepper-val">{walkTourGuests}</span>
                    <button className="eys-stepper-btn" onClick={() => setWalkTourGuests(Math.min(8, walkTourGuests + 1))}>+</button>
                  </div>
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Walk Date</label>
                  <input 
                    type="date" 
                    value={walkTourDate} 
                    onChange={(e) => setWalkTourDate(e.target.value)} 
                    className="eys-input" 
                  />
                </div>

                <div className="eys-form-group">
                  <label className="eys-form-label">Departure Time</label>
                  <select value={walkTourTime} onChange={(e) => setWalkTourTime(e.target.value)} className="eys-select">
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>02:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="eys-form-group">
                <label className="eys-form-label">Special Requirements (e.g. Dog companion, pace preference)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Bringing our retriever; prefer gentle photo stops" 
                  value={walkSpecialReqs} 
                  onChange={(e) => setWalkSpecialReqs(e.target.value)} 
                  className="eys-input" 
                />
              </div>
            </div>
          )}

        </div>

        {/* FOOTER & TOTAL ACTION */}
        {service.id !== 'local-attractions' && (
          <div className="eys-modal-footer">
            <div className="eys-card-price-block">
              <span className="eys-price-label">Estimated Total</span>
              <span className="eys-price-amount">£{totalPrice}</span>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                className="eys-btn-outline" 
                onClick={() => handleAddToBasket(false)}
              >
                Add to Stay Basket
              </button>

              <button 
                className="eys-btn-primary" 
                onClick={() => handleAddToBasket(true)}
              >
                <span>Book &amp; Checkout</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
