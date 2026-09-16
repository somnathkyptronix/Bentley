// extrasService.js - Central Data, State & Persistence Layer for "Enhance Your Stay"

const STORAGE_KEYS = {
  BASKET: 'bentley_extras_basket_v1',
  BOOKINGS: 'bentley_extras_bookings_v1',
  ADMIN_CONFIG: 'bentley_extras_admin_config_v1',
  PRODUCTS: 'bentley_extras_products_v2',
  SERVICES: 'bentley_extras_services_v2',
  ATTRACTIONS: 'bentley_extras_attractions_v2',
  GUIDES: 'bentley_extras_guides_v2',
  CHEFS: 'bentley_extras_chefs_v2',
  SUPPLIERS: 'bentley_extras_suppliers_v2',
  ADMIN_AUTH: 'bentley_admin_auth_v1',
  GUEST_AUTH: 'bentley_guest_auth_v1'
};

// Initial catalogue of the 8 services
export const initialServices = [
  {
    id: 'ebike-hire',
    name: 'E-Bike Hire',
    category: 'Active & Adventure',
    image: '/images/extras/ebike_hire.jpg',
    icon: 'Bike',
    shortDesc: 'Top-tier electric mountain & touring bikes to conquer Peak District hills and trails with ease.',
    startingPrice: 35,
    priceUnit: 'from £35 / half-day',
    availabilityStatus: 'Available Today',
    statusType: 'available', // available | instant | advance
    leadTime: 'Instant or same-day delivery',
    featured: true
  },
  {
    id: 'hot-tub-extras',
    name: 'Hot Tub & Property Extras',
    category: 'Property Extras',
    image: '/images/extras/hottub_extras.jpg',
    icon: 'Sparkles',
    shortDesc: 'Elevate your relaxation with private patio hot tub access, fluffy waffle robes, luxury towels, and celebration packages.',
    startingPrice: 15,
    priceUnit: 'from £15',
    availabilityStatus: 'Instant Confirmation',
    statusType: 'instant',
    leadTime: 'Prepared ready for check-in',
    featured: true
  },
  {
    id: 'logs-burner',
    name: 'Logs for the Burner',
    category: 'Property Extras',
    image: '/images/extras/firewood_logs.jpg',
    icon: 'Flame',
    shortDesc: 'Extra crates of kiln-dried Derbyshire birch firewood, kindling, and natural firelighters delivered directly to your hearth.',
    startingPrice: 14,
    priceUnit: '£14 / bundle',
    availabilityStatus: 'Available Today',
    statusType: 'available',
    leadTime: 'Delivered within 2 hours',
    featured: false
  },
  {
    id: 'private-chef',
    name: 'Private Chef Services',
    category: 'Food & Dining',
    image: '/images/extras/private_chef.jpg',
    icon: 'UtensilsCrossed',
    shortDesc: 'Acclaimed local private chefs creating bespoke fine dining, hearty fireside suppers, or celebratory summer BBQs in the cottage.',
    startingPrice: 65,
    priceUnit: 'from £65 / guest',
    availabilityStatus: 'Advance Notice Required',
    statusType: 'advance',
    leadTime: '48 hours advance notice',
    featured: true
  },
  {
    id: 'fridge-filled',
    name: 'Fridge Filled Before Arrival',
    category: 'Food & Dining',
    image: '/images/extras/fridge_hamper.jpg',
    icon: 'ShoppingBag',
    shortDesc: 'Arrive to a fully stocked kitchen with artisan Peak District bakery goods, farm cheeses, breakfast packages, or custom groceries.',
    startingPrice: 38,
    priceUnit: 'packs from £38',
    availabilityStatus: 'Instant Confirmation',
    statusType: 'instant',
    leadTime: '24 hours prior to arrival',
    featured: false
  },
  {
    id: 'local-attractions',
    name: 'Local Attractions Directory',
    category: 'Local Attractions',
    image: '/images/extras/local_attractions.jpg',
    icon: 'Compass',
    shortDesc: 'Discover and reserve nearby world-class experiences, cable cars, cavern boat trips, historic mills, and Michelin-rated pubs.',
    startingPrice: 12,
    priceUnit: 'entry from £12',
    availabilityStatus: 'Live Booking Links',
    statusType: 'available',
    leadTime: 'Direct partner reservations',
    featured: true
  },
  {
    id: 'ebike-guide',
    name: 'Local E-Bike Guided Tour',
    category: 'Guided Tours',
    image: '/images/extras/ebike_tour.jpg',
    icon: 'Navigation',
    shortDesc: 'Expert-led e-bike excursions exploring the Monsal Trail viaducts, High Peak trails, and secluded limestone valley tracks.',
    startingPrice: 55,
    priceUnit: 'from £55 / person',
    availabilityStatus: '24h Advance Notice',
    statusType: 'advance',
    leadTime: 'Scheduled departure times',
    featured: false
  },
  {
    id: 'walking-guide',
    name: 'Local Walking Guided Tour',
    category: 'Guided Tours',
    image: '/images/extras/walking_tour.jpg',
    icon: 'Footprints',
    shortDesc: 'Immersive guided heritage & nature walks through Lumsdale Waterfall gorge, Matlock history, and hidden scenic Peak view points.',
    startingPrice: 28,
    priceUnit: 'from £28 / person',
    availabilityStatus: 'Instant Confirmation',
    statusType: 'instant',
    leadTime: 'Small intimate group tours',
    featured: false
  }
];

// Initial dynamic products for "Hot Tub & Property Extras" (Admin can add more without code changes!)
export const initialPropertyExtras = [
  {
    id: 'extra-hottub',
    name: 'Private Hot Tub Session Access',
    category: 'Wellness & Outdoor',
    price: 65,
    unit: 'per day',
    stock: 10,
    icon: 'Waves',
    desc: 'Exclusive heated hydrotherapy access on the enclosed rear patio terrace with fresh towelling and mood lighting.',
    image: '/images/extras/hottub_extras.jpg'
  },
  {
    id: 'extra-robes',
    name: 'Luxury Waffle Spa Robes (Set of 2)',
    category: 'Comfort & Lounging',
    price: 18,
    unit: 'per stay',
    stock: 12,
    icon: 'Sparkles',
    desc: 'Plush 100% organic cotton waffle robes for fireside lounging or post-bath and patio relaxation.',
    image: '/web/sc_1785924057_1205377_11.webp'
  },
  {
    id: 'extra-towels',
    name: 'Extra Fluffy Bath Sheet Towel Set',
    category: 'Comfort & Lounging',
    price: 12,
    unit: 'bundle of 4',
    stock: 20,
    icon: 'ShieldCheck',
    desc: 'Oversized 700gsm combed Egyptian cotton bath sheets, washed in eco lavender botanical softener.',
    image: '/web/sc_1785924072_1205377_14.webp'
  },
  {
    id: 'extra-celebration',
    name: 'Cottage Celebration Champagne & Truffles',
    category: 'Celebration Packages',
    price: 52,
    unit: 'package',
    stock: 15,
    icon: 'Gift',
    desc: 'Chilled bottle of premier English sparkling wine, artisan Derbyshire handmade chocolate truffles, and fresh valley roses.',
    image: '/images/extras/hottub_extras.jpg'
  },
  {
    id: 'extra-logbundle',
    name: 'Extra Seasoned Hardwood Firewood Bundle',
    category: 'Hearth & Fire',
    price: 14,
    unit: 'crate + kindling',
    stock: 45,
    icon: 'Flame',
    desc: 'Kiln-dried Derbyshire birch and oak logs guaranteed under 15% moisture for a long, crackling burn in the wood stove.',
    image: '/images/extras/firewood_logs.jpg'
  },
  {
    id: 'extra-hikinggear',
    name: 'Peak District Explorer Trekking Kit',
    category: 'Outdoor Equipment',
    price: 16,
    unit: 'per day',
    stock: 8,
    icon: 'Compass',
    desc: 'Two pairs of lightweight carbon trekking poles, OS Landranger waterproof Peak maps, and thermal beverage flasks.',
    image: '/images/extras/walking_tour.jpg'
  }
];

// Initial Grocery Fridge Fill Packages
export const initialFridgePackages = [
  {
    id: 'pack-breakfast',
    name: 'Peak District Breakfast Essentials',
    price: 38,
    desc: 'Free-range local farm eggs, dry-cured Derbyshire bacon, artisan sourdough loaf, Derbyshire farm butter, fresh milk, and local strawberry preserve.',
    serves: '2-4 guests for 2 mornings'
  },
  {
    id: 'pack-family',
    name: 'Family Cottage Welcome Pack',
    price: 64,
    desc: 'Complete pantry and fridge set: local milk, cereals, farmhouse bread, artisan cheddar, sliced ham, crisp apples, fruit juices, and Bakewell shortbread biscuits.',
    serves: 'Family of 4 for 3-4 days'
  },
  {
    id: 'pack-bbq',
    name: 'Butcher’s Gourmet BBQ Feast Pack',
    price: 58,
    desc: 'Selected Matlock butcher steak burgers, Derbyshire herb sausages, marinated chicken skewers, brioche buns, gourmet coleslaw, and relish.',
    serves: '4 generous portions'
  },
  {
    id: 'pack-local',
    name: 'Artisan Derbyshire Cheese & Produce Board',
    price: 46,
    desc: 'Handmade Sage Derby, Hartington Blue, Peakland White cheeses, oatcakes, locally churned butter, fig chutney, and honeycomb.',
    serves: 'Perfect with wine for 4'
  },
  {
    id: 'pack-drinks',
    name: 'Sommelier Wine & Craft Ale Selection',
    price: 55,
    desc: '2 bottles of hand-selected European wine (1 Crisp White, 1 Rich Red) plus 4 bottles of Peak Ales craft beer brewed in Chatsworth.',
    serves: '6 premium bottles'
  },
  {
    id: 'pack-custom',
    name: 'Bespoke Personal Shopper List',
    price: 25,
    desc: 'Submit your specific supermarket or local farm shop grocery list; our concierge hand-picks and unpacks it before you step inside (+ grocery receipt at cost).',
    serves: 'Custom requests'
  }
];

// Initial Private Chefs
export const initialChefs = [
  {
    id: 'chef-julian',
    name: 'Chef Julian Wright',
    bio: 'Former Michelin-star sous chef with 15 years experience celebrating Peak District terroir, game, and wild foraged herbs.',
    specialities: 'Modern British, Peak Game, Tasting Menus',
    rating: '5.0 (38 cottage dinners)',
    pricePerGuest: 75,
    sampleMenu: [
      'Canapés: Smoked Derbyshire trout & pickled fennel tartlet',
      'Starter: Wild garlic & forest mushroom soup with warm sourdough',
      'Main: Roast Derbyshire venison loin with parsnip purée & blackberry jus',
      'Dessert: Warm spiced Bakewell tart with clotted cream'
    ]
  },
  {
    id: 'chef-clare',
    name: 'Chef Clare Pemberton',
    bio: 'Renowned Derbyshire private caterer specialising in relaxed family banquets, gourmet al fresco patio BBQs, and plant-based feasts.',
    specialities: 'Relaxed Farmhouse Suppers, Al Fresco BBQ, Vegetarian',
    rating: '4.9 (44 cottage dinners)',
    pricePerGuest: 65,
    sampleMenu: [
      'Sharing Boards: Artisan cured meats, local cheeses & charred flatbreads',
      'Main: Slow-braised Derbyshire beef blade in red wine with dauphinoise potatoes',
      'Side: Roasted heritage heritage carrots with thyme and local honey',
      'Dessert: Dark chocolate ganache with salted caramel & hazelnut crumble'
    ]
  }
];

// Initial Attractions Directory
export const initialAttractions = [
  {
    id: 'attract-heights',
    name: 'Heights of Abraham & Alpine Cable Cars',
    category: 'Family attractions',
    distance: '2.5 miles (8 min drive)',
    duration: '3-4 hours',
    price: 'From £24',
    availability: 'Open Daily',
    location: 'Matlock Bath',
    image: '/images/extras/local_attractions.jpg',
    desc: 'Famous 60-acre woodland estate reached by cable cars flying over Derwent valley gorge. Cavern tours and cliff-top restaurant.',
    familyFriendly: true,
    activityType: 'Adventure'
  },
  {
    id: 'attract-chatsworth',
    name: 'Chatsworth House & Parkland',
    category: 'Museums',
    distance: '9.5 miles (20 min drive)',
    duration: 'Full day',
    price: 'From £29',
    availability: 'Pre-booking advised',
    location: 'Bakewell',
    image: '/web/sc_1785924117_1205377_22.webp',
    desc: 'The Jewel of the Peak District: magnificent baroque state rooms, 105 acres of gardens, farmyard, and world-famous farm shop.',
    familyFriendly: true,
    activityType: 'Sightseeing'
  },
  {
    id: 'attract-cromford-canal',
    name: 'Cromford Mills & Historic Canal Boat',
    category: 'Boat trips',
    distance: '3.2 miles (9 min drive)',
    duration: '2-3 hours',
    price: 'From £9',
    availability: 'Wed-Sun',
    location: 'Cromford',
    image: '/web/sc_1786348558_1205377_23.webp',
    desc: 'Sir Richard Arkwright’s cradle of the Industrial Revolution with horse-drawn boat trips on the peaceful Cromford Canal.',
    familyFriendly: true,
    activityType: 'Culture'
  },
  {
    id: 'attract-monsal-trail',
    name: 'Monsal Trail Railway Tunnels & Bike Hire',
    category: 'Outdoor experiences',
    distance: '10 miles (22 min drive)',
    duration: 'Half to full day',
    price: 'Free Access / Hire from £20',
    availability: 'Open Year-Round',
    location: 'Bakewell to Blackwell Mill',
    image: '/images/extras/ebike_tour.jpg',
    desc: '8.5 miles of traffic-free walking and cycling over dramatic railway viaducts and through lit historic limestone tunnels.',
    familyFriendly: true,
    activityType: 'Adventure'
  },
  {
    id: 'attract-packhorse',
    name: 'The Packhorse Inn (Award-Winning Gastropub)',
    category: 'Restaurants',
    distance: '12 miles (22 min drive)',
    duration: '2 hours',
    price: 'A la carte',
    availability: 'Lunch & Dinner',
    location: 'Little Longstone',
    image: '/images/extras/private_chef.jpg',
    desc: 'Michelin Guide featured country inn serving hyper-seasonal Peak District dishes with craft ales and roaring inglenook fires.',
    familyFriendly: true,
    activityType: 'Dining'
  },
  {
    id: 'attract-waterfalls',
    name: 'Lumsdale Valley Waterfall Gorge',
    category: 'Adventure activities',
    distance: '300 metres (3 min walk)',
    duration: '1-2 hours',
    price: 'Free Access',
    availability: 'Open daylight hours',
    location: 'Upper Lumsdale',
    image: '/images/extras/walking_tour.jpg',
    desc: 'A romantic, mysterious wooded valley gorge with cascading stone waterfalls and ancient ruined watermills right outside your door.',
    familyFriendly: true,
    activityType: 'Nature'
  }
];

// Initial Guided Tours
export const initialTours = {
  ebike: [
    {
      id: 'tour-ebike-monsal',
      title: 'Monsal Viaduct & Secret Valley Loop',
      duration: '3.5 hours',
      distance: '18 miles',
      difficulty: 'Moderate',
      maxGroup: 6,
      price: 55,
      guide: 'Marcus Vance (British Cycling Level 3 Guide)',
      desc: 'Glide effortlessly along the former Midland railway viaducts, through cool lit limestone tunnels, and into picturesque Peak stone villages.'
    },
    {
      id: 'tour-ebike-lumsdale-ridge',
      title: 'Lumsdale Valley & High Peak Ridge Explorer',
      duration: '4.5 hours',
      distance: '24 miles',
      difficulty: 'Challenging (e-assisted)',
      maxGroup: 5,
      price: 70,
      guide: 'Marcus Vance',
      desc: 'Panoramic ridge views over Matlock and Riber Castle, dropping into ancient woodland valleys with a traditional tea room stop.'
    }
  ],
  walking: [
    {
      id: 'walk-lumsdale-ruins',
      title: 'Lumsdale Industrial Heritage & Waterfalls Walk',
      category: 'Local history',
      duration: '2 hours',
      difficulty: 'Easy to Moderate (steps)',
      meetingPoint: 'Bentley Bridge Cottage Gate',
      price: 28,
      guide: 'Dr. Eleanor Bailey (Derbyshire Historian)',
      desc: 'Discover the secrets of the 18th-century cotton, bleach, and corn watermills, geology of the gorge, and hidden cascade pools.'
    },
    {
      id: 'walk-peak-food',
      title: 'Bakewell Courtyards & Artisan Food Walk',
      category: 'Food tours',
      duration: '3 hours',
      difficulty: 'Easy / Flat',
      meetingPoint: 'Bakewell Riverside Bridge',
      price: 45,
      guide: 'Sam Robinson (Local Foodie & Forager)',
      desc: 'Taste traditional 1860 puddings, artisan raw-milk cheeses, local craft gins, and visit hidden courtyard producers.'
    },
    {
      id: 'walk-high-tor',
      title: 'High Tor Limestone Cliff & Gorge Hike',
      category: 'Countryside walks',
      duration: '2.5 hours',
      difficulty: 'Moderate',
      meetingPoint: 'Matlock Town Park Gates',
      price: 32,
      guide: 'Dr. Eleanor Bailey',
      desc: 'Ascend the dramatic cliff edge above Matlock Bath, traverse Giddy Edge (optional path), and enjoy breathtaking 360-degree views.'
    }
  ]
};

// Initial Tour Guides
export const initialGuides = [
  {
    id: 'guide-ben',
    name: 'Ben Walker',
    role: 'Peak Trail & E-Bike Specialist',
    qualification: 'British Cycling Mountain Bike Level 3 Leader',
    phone: '+44 7700 900211',
    email: 'ben@peakadventures.co.uk',
    bio: '12 years guiding cycling groups across High Peak, White Peak limestone trails, and railway viaducts. First-aid certified.',
    experienceYears: 12,
    rating: '5.0 (52 reviews)',
    availableDays: 'Tue, Thu, Sat, Sun',
    status: 'Active'
  },
  {
    id: 'guide-eleanor',
    name: 'Dr. Eleanor Bailey',
    role: 'Heritage & Nature Walking Leader',
    qualification: 'Mountain Leader (ML) & Derbyshire Archaeologist',
    phone: '+44 7700 900591',
    email: 'eleanor@peakwalks.co.uk',
    bio: 'Specialist in Lumsdale industrial archaeology, Peak District flora, and Derwent Valley Mills UNESCO World Heritage.',
    experienceYears: 15,
    rating: '4.98 (64 reviews)',
    availableDays: 'Daily upon request',
    status: 'Active'
  },
  {
    id: 'guide-sam',
    name: 'Sam Robinson',
    role: 'Artisan Food & Country Walking Guide',
    qualification: 'Peak Food Historian & Wilderness First Responder',
    phone: '+44 7700 900744',
    email: 'sam@bakewellwalks.co.uk',
    bio: 'Passionate about foraging, historic Bakewell puddings, and uncovering hidden artisan food producers.',
    experienceYears: 8,
    rating: '4.95 (39 reviews)',
    availableDays: 'Wed, Fri, Sat',
    status: 'Active'
  }
];

// Initial Suppliers & Partners Directory
export const initialSuppliers = [
  {
    id: 'supp-ebikes',
    name: 'Peak E-Bikes Matlock',
    service: 'E-Bike Hire & Tours',
    contactPerson: 'David Miller',
    phone: '+44 1629 828450',
    email: 'rentals@peakebikes.co.uk',
    address: 'Unit 4, Station Yard, Matlock DE4 3NA',
    instructions: 'Deliver to 2 Bentley Bridge Cottages 15 minutes before slot. Ensure batteries are at 100% and provide lock keys in outbuilding key safe.'
  },
  {
    id: 'supp-logs',
    name: 'Derbyshire Hardwood Co.',
    service: 'Logs for the Burner',
    contactPerson: 'Tom Fletcher',
    phone: '+44 1629 823119',
    email: 'orders@derbyshirehardwood.co.uk',
    address: 'Tansley Mill, Matlock DE4 5EX',
    instructions: 'Stack crates in hearth alcove beside woodburner. Leave kindling and firelighters in the fireside copper bucket.'
  },
  {
    id: 'supp-chef-julian',
    name: 'Chef Julian Wright Fine Dining',
    service: 'Private Chef Services',
    contactPerson: 'Chef Julian Wright',
    phone: '+44 7700 900142',
    email: 'julian@wrightdining.co.uk',
    address: 'Cromford, Derbyshire',
    instructions: 'Arrive 1.5 hours prior to dining time to prep in kitchen. Bring all cookware, crockery, and clean kitchen to spotless handover standard.'
  },
  {
    id: 'supp-chef-clare',
    name: 'Pemberton Farmhouse Catering',
    service: 'Private Chef & BBQ',
    contactPerson: 'Clare Pemberton',
    phone: '+44 7700 900388',
    email: 'clare@pembertoncatering.co.uk',
    address: 'Bakewell, Derbyshire',
    instructions: 'Liaise directly with guest for dietary preferences. Use patio outdoor gas BBQ or kitchen gas range.'
  },
  {
    id: 'supp-guides',
    name: 'Derbyshire Heritage & Trail Walks',
    service: 'Walking & Nature Guides',
    contactPerson: 'Dr. Eleanor Bailey',
    phone: '+44 7700 900591',
    email: 'eleanor@peakwalks.co.uk',
    address: 'Matlock Bath, Derbyshire',
    instructions: 'Meet guests at 2 Bentley Bridge Cottage front garden gate. Check weather forecast and carry spare waterproof maps.'
  },
  {
    id: 'supp-hampers',
    name: 'Matlock Farmhouse Larder',
    service: 'Fridge Filled Hampers',
    contactPerson: 'Sarah Jenkins',
    phone: '+44 1629 825700',
    email: 'orders@matlocklarder.co.uk',
    address: 'Crown Square, Matlock DE4 3AT',
    instructions: 'Deliver unpacked perishables into the cottage fridge before 3:00 PM check-in. Sourdough loaf on cutting board with cover.'
  }
];

// Seed Bookings for Guest Dashboard
export const initialGuestBookings = [
  {
    id: 'BK-EX-8492',
    serviceId: 'ebike-hire',
    serviceName: 'E-Bike Hire (2 Premium Mountain E-Bikes)',
    status: 'Confirmed', // Confirmed | In Progress | Completed | Cancelled
    bookedDate: '2026-09-20',
    timeSlot: '10:00 AM – 2:00 PM (Half-Day)',
    amountPaid: 70,
    supplierName: 'Peak E-Bikes Matlock',
    supplierContact: '+44 1629 828450 / hello@peakebikes.co.uk',
    meetingPoint: 'Delivered directly to 2 Bentley Bridge Cottages (Parking Bay)',
    instructions: 'Both bikes charged to 100%. Helmets, locks, and pannier bags included. Battery charger provided in the stone outbuilding.',
    cancellable: true
  },
  {
    id: 'BK-EX-9104',
    serviceId: 'logs-burner',
    serviceName: 'Logs for the Burner (2 Extra Crates + Kindling)',
    status: 'Scheduled',
    bookedDate: '2026-09-19',
    timeSlot: 'Prior to 4:00 PM Arrival',
    amountPaid: 28,
    supplierName: 'Derbyshire Hardwood Co.',
    supplierContact: '+44 1629 823119',
    meetingPoint: 'Cottage Hearth Inglenook',
    instructions: 'Placed beside the woodburning stove ready for your first evening fire. Complimentary firelighters and matches included.',
    cancellable: true
  }
];

// Initial Admin Settings
export const initialAdminConfig = {
  activeServices: {
    'ebike-hire': true,
    'hot-tub-extras': true,
    'logs-burner': true,
    'private-chef': true,
    'fridge-filled': true,
    'local-attractions': true,
    'ebike-guide': true,
    'walking-guide': true
  },
  commissionPercentage: 15,
  cancellationNoticeHours: 48,
  deliveryFee: 0,
  taxRatePercentage: 0,
  currency: '£',
  allowGuestCustomRequests: true,
  supplierNotificationEmail: 'concierge@bentleycottages.co.uk'
};

// Safe localStorage helpers
function getStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Failed reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed writing ${key} to localStorage:`, e);
  }
}

// Service API & Event Dispatcher for Realtime Reactivity
class ExtrasService {
  constructor() {
    this.listeners = new Set();
    this.basket = getStorage(STORAGE_KEYS.BASKET, []);
    this.bookings = getStorage(STORAGE_KEYS.BOOKINGS, initialGuestBookings);
    this.adminConfig = getStorage(STORAGE_KEYS.ADMIN_CONFIG, initialAdminConfig);
    this.propertyExtras = getStorage(STORAGE_KEYS.PRODUCTS, initialPropertyExtras);
    this.services = getStorage(STORAGE_KEYS.SERVICES, initialServices);
    this.attractions = getStorage(STORAGE_KEYS.ATTRACTIONS, initialAttractions);
    this.guides = getStorage(STORAGE_KEYS.GUIDES, initialGuides);
    this.chefs = getStorage(STORAGE_KEYS.CHEFS, initialChefs);
    this.suppliers = getStorage(STORAGE_KEYS.SUPPLIERS, initialSuppliers);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  // --- Basket Management ---
  getBasket() {
    return [...this.basket];
  }

  getBasketCount() {
    return this.basket.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  getBasketSubtotal() {
    return this.basket.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

  openBasket() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bentley:open-basket'));
    }
  }

  addToBasket(item) {
    // Generate unique basket item key
    const basketId = item.basketId || `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newItem = {
      ...item,
      basketId,
      quantity: item.quantity || 1,
      addedAt: new Date().toISOString()
    };
    this.basket.push(newItem);
    setStorage(STORAGE_KEYS.BASKET, this.basket);
    this.notify();
    return newItem;
  }

  updateBasketQuantity(basketId, quantity) {
    if (quantity <= 0) {
      this.removeFromBasket(basketId);
      return;
    }
    this.basket = this.basket.map(item => 
      item.basketId === basketId ? { ...item, quantity } : item
    );
    setStorage(STORAGE_KEYS.BASKET, this.basket);
    this.notify();
  }

  removeFromBasket(basketId) {
    this.basket = this.basket.filter(item => item.basketId !== basketId);
    setStorage(STORAGE_KEYS.BASKET, this.basket);
    this.notify();
  }

  clearBasket() {
    this.basket = [];
    setStorage(STORAGE_KEYS.BASKET, this.basket);
    this.notify();
  }

  // --- Checkout & Bookings ---
  checkout(guestDetails = {}) {
    if (this.basket.length === 0) return null;

    const newBookings = this.basket.map(item => ({
      id: `BK-EX-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: item.id || item.serviceId,
      serviceName: item.name,
      status: 'Confirmed',
      bookedDate: item.bookingDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timeSlot: item.timeSlot || 'Scheduled as requested',
      amountPaid: item.price * (item.quantity || 1),
      quantity: item.quantity || 1,
      details: item.details || {},
      guestName: guestDetails.name || 'Valued Guest',
      guestEmail: guestDetails.email || '',
      bookingRef: guestDetails.bookingRef || 'BB-2026-STAY',
      supplierName: item.supplierName || '2 Bentley Bridge Concierge',
      supplierContact: '+44 1629 828450 / concierge@bentleycottages.co.uk',
      meetingPoint: item.deliveryLocation || '2 Bentley Bridge Cottages, Matlock',
      instructions: item.instructions || 'All details confirmed with concierge.',
      cancellable: true,
      createdAt: new Date().toISOString()
    }));

    this.bookings = [...newBookings, ...this.bookings];
    setStorage(STORAGE_KEYS.BOOKINGS, this.bookings);
    this.clearBasket();
    this.notify();
    return newBookings;
  }

  // --- Guest Dashboard Queries ---
  getBookings() {
    return [...this.bookings];
  }

  getUpcomingBookings() {
    return this.bookings.filter(b => b.status === 'Confirmed' || b.status === 'Scheduled' || b.status === 'In Progress');
  }

  getCompletedBookings() {
    return this.bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');
  }

  cancelBooking(bookingId, reason = '') {
    this.bookings = this.bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'Cancelled',
          cancelReason: reason,
          cancelledAt: new Date().toISOString()
        };
      }
      return b;
    });
    setStorage(STORAGE_KEYS.BOOKINGS, this.bookings);
    this.notify();
  }

  // --- Dynamic Products (Property Extras) ---
  getPropertyExtras() {
    return [...this.propertyExtras];
  }

  addPropertyExtra(product) {
    const newProduct = {
      ...product,
      id: `extra-${Date.now()}`,
      stock: Number(product.stock) || 10,
      price: Number(product.price) || 20,
      image: product.image || '/web/sc_1786456245_1205377_27.webp'
    };
    this.propertyExtras.push(newProduct);
    setStorage(STORAGE_KEYS.PRODUCTS, this.propertyExtras);
    this.notify();
    return newProduct;
  }

  updatePropertyExtra(id, updates) {
    this.propertyExtras = this.propertyExtras.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    setStorage(STORAGE_KEYS.PRODUCTS, this.propertyExtras);
    this.notify();
  }

  deletePropertyExtra(id) {
    this.propertyExtras = this.propertyExtras.filter(p => p.id !== id);
    setStorage(STORAGE_KEYS.PRODUCTS, this.propertyExtras);
    this.notify();
  }

  // --- Admin Configuration & Tools ---
  getAdminConfig() {
    return { ...this.adminConfig };
  }

  updateAdminConfig(newConfig) {
    this.adminConfig = { ...this.adminConfig, ...newConfig };
    setStorage(STORAGE_KEYS.ADMIN_CONFIG, this.adminConfig);
    this.notify();
  }

  toggleService(serviceId, activeState) {
    const currentActive = { ...this.adminConfig.activeServices };
    currentActive[serviceId] = activeState !== undefined ? activeState : !currentActive[serviceId];
    this.updateAdminConfig({ activeServices: currentActive });
  }

  isServiceActive(serviceId) {
    return this.adminConfig.activeServices[serviceId] !== false;
  }

  // Revenue & Reporting Metrics for Admin Dashboard
  getAdminMetrics() {
    const totalRevenue = this.bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + b.amountPaid : sum, 0);
    const commissionRate = (this.adminConfig.commissionPercentage || 15) / 100;
    const totalCommission = totalRevenue * commissionRate;
    const activeCount = this.getUpcomingBookings().length;
    const completedCount = this.bookings.filter(b => b.status === 'Completed').length;
    const cancelledCount = this.bookings.filter(b => b.status === 'Cancelled').length;

    return {
      totalRevenue,
      totalCommission,
      activeCount,
      completedCount,
      cancelledCount,
      totalBookings: this.bookings.length
    };
  }

  // Update Booking Status directly by Admin
  updateBookingStatus(bookingId, status) {
    this.bookings = this.bookings.map(b => 
      b.id === bookingId ? { ...b, status } : b
    );
    setStorage(STORAGE_KEYS.BOOKINGS, this.bookings);
    this.notify();
  }

  // --- Services Management ---
  getServices() {
    return [...this.services];
  }

  addService(serviceData) {
    const newService = {
      ...serviceData,
      id: serviceData.id || `service-${Date.now()}`,
      startingPrice: Number(serviceData.startingPrice) || 25,
      priceUnit: serviceData.priceUnit || 'from £25',
      availabilityStatus: serviceData.availabilityStatus || 'Available Today',
      statusType: serviceData.statusType || 'available',
      leadTime: serviceData.leadTime || 'Instant confirmation',
      image: serviceData.image || '/images/extras/ebike_hire.jpg',
      icon: serviceData.icon || 'Sparkles',
      featured: Boolean(serviceData.featured)
    };
    this.services.push(newService);
    setStorage(STORAGE_KEYS.SERVICES, this.services);
    
    // Automatically enable the new service in adminConfig
    const activeServices = { ...this.adminConfig.activeServices, [newService.id]: true };
    this.updateAdminConfig({ activeServices });
    this.notify();
    return newService;
  }

  updateService(id, updates) {
    this.services = this.services.map(s => s.id === id ? { ...s, ...updates } : s);
    setStorage(STORAGE_KEYS.SERVICES, this.services);
    this.notify();
  }

  deleteService(id) {
    this.services = this.services.filter(s => s.id !== id);
    setStorage(STORAGE_KEYS.SERVICES, this.services);
    this.notify();
  }

  // --- Attractions Management ---
  getAttractions() {
    return [...this.attractions];
  }

  addAttraction(attraction) {
    const newAttraction = {
      ...attraction,
      id: attraction.id || `attract-${Date.now()}`,
      image: attraction.image || '/images/extras/local_attractions.jpg',
      familyFriendly: Boolean(attraction.familyFriendly)
    };
    this.attractions.push(newAttraction);
    setStorage(STORAGE_KEYS.ATTRACTIONS, this.attractions);
    this.notify();
    return newAttraction;
  }

  updateAttraction(id, updates) {
    this.attractions = this.attractions.map(a => a.id === id ? { ...a, ...updates } : a);
    setStorage(STORAGE_KEYS.ATTRACTIONS, this.attractions);
    this.notify();
  }

  deleteAttraction(id) {
    this.attractions = this.attractions.filter(a => a.id !== id);
    setStorage(STORAGE_KEYS.ATTRACTIONS, this.attractions);
    this.notify();
  }

  // --- Guides Management ---
  getGuides() {
    return [...this.guides];
  }

  addGuide(guide) {
    const newGuide = {
      ...guide,
      id: guide.id || `guide-${Date.now()}`,
      status: guide.status || 'Active',
      rating: guide.rating || '5.0'
    };
    this.guides.push(newGuide);
    setStorage(STORAGE_KEYS.GUIDES, this.guides);
    this.notify();
    return newGuide;
  }

  updateGuide(id, updates) {
    this.guides = this.guides.map(g => g.id === id ? { ...g, ...updates } : g);
    setStorage(STORAGE_KEYS.GUIDES, this.guides);
    this.notify();
  }

  deleteGuide(id) {
    this.guides = this.guides.filter(g => g.id !== id);
    setStorage(STORAGE_KEYS.GUIDES, this.guides);
    this.notify();
  }

  // --- Chefs Management ---
  getChefs() {
    return [...this.chefs];
  }

  addChef(chef) {
    const newChef = {
      ...chef,
      id: chef.id || `chef-${Date.now()}`,
      pricePerGuest: Number(chef.pricePerGuest) || 65,
      sampleMenu: Array.isArray(chef.sampleMenu) ? chef.sampleMenu : [
        'Canapés & sharing board',
        'Seasonal Derbyshire main course',
        'Artisan country dessert'
      ]
    };
    this.chefs.push(newChef);
    setStorage(STORAGE_KEYS.CHEFS, this.chefs);
    this.notify();
    return newChef;
  }

  updateChef(id, updates) {
    this.chefs = this.chefs.map(c => c.id === id ? { ...c, ...updates } : c);
    setStorage(STORAGE_KEYS.CHEFS, this.chefs);
    this.notify();
  }

  deleteChef(id) {
    this.chefs = this.chefs.filter(c => c.id !== id);
    setStorage(STORAGE_KEYS.CHEFS, this.chefs);
    this.notify();
  }

  // --- Suppliers Management ---
  getSuppliers() {
    return [...this.suppliers];
  }

  addSupplier(supplier) {
    const newSupplier = {
      ...supplier,
      id: supplier.id || `supp-${Date.now()}`
    };
    this.suppliers.push(newSupplier);
    setStorage(STORAGE_KEYS.SUPPLIERS, this.suppliers);
    this.notify();
    return newSupplier;
  }

  updateSupplier(id, updates) {
    this.suppliers = this.suppliers.map(s => s.id === id ? { ...s, ...updates } : s);
    setStorage(STORAGE_KEYS.SUPPLIERS, this.suppliers);
    this.notify();
  }

  deleteSupplier(id) {
    this.suppliers = this.suppliers.filter(s => s.id !== id);
    setStorage(STORAGE_KEYS.SUPPLIERS, this.suppliers);
    this.notify();
  }

  // --- Authentication System (Admin & Guest) ---
  isAdminAuthenticated() {
    if (this._adminAuthed) return true;
    if (typeof window === 'undefined') return false;
    try {
      const session = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      const local = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      return session === 'true' || local === 'true';
    } catch {
      return Boolean(this._adminAuthed);
    }
  }

  loginAdmin(username, password, remember = true) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim().toLowerCase();

    // Required Credentials: User: Admin, Password: Admin
    if (cleanUser === 'admin' && cleanPass === 'admin') {
      this._adminAuthed = true;
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
        }
        if (remember && typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
        }
      } catch (e) {
        console.warn('Auth storage warning:', e);
      }
      this.notify();
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Invalid credentials. Please enter Username: Admin and Password: Admin.' 
    };
  }

  logoutAdmin() {
    this._adminAuthed = false;
    try {
      if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch (e) {
      console.warn('Auth clear warning:', e);
    }
    this.notify();
  }

  isGuestAuthenticated() {
    if (this._guestSession) return true;
    if (typeof window === 'undefined') return false;
    try {
      return Boolean(sessionStorage.getItem(STORAGE_KEYS.GUEST_AUTH) || localStorage.getItem(STORAGE_KEYS.GUEST_AUTH));
    } catch {
      return Boolean(this._guestSession);
    }
  }

  getGuestSession() {
    if (this._guestSession) return this._guestSession;
    if (typeof window === 'undefined') return null;
    try {
      const data = sessionStorage.getItem(STORAGE_KEYS.GUEST_AUTH) || localStorage.getItem(STORAGE_KEYS.GUEST_AUTH);
      return data ? JSON.parse(data) : null;
    } catch {
      return this._guestSession || null;
    }
  }

  loginGuest(bookingRef, guestName = 'Guest') {
    const cleanRef = (bookingRef || '').trim().toUpperCase();
    if (!cleanRef) {
      return { success: false, error: 'Please enter a valid Booking Reference (e.g. BB-2026-STAY).' };
    }

    const sessionData = {
      bookingRef: cleanRef,
      guestName: guestName.trim() || 'Guest',
      loginTime: new Date().toISOString()
    };

    this._guestSession = sessionData;

    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEYS.GUEST_AUTH, JSON.stringify(sessionData));
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.GUEST_AUTH, JSON.stringify(sessionData));
      }
    } catch (e) {
      console.warn('Guest auth warning:', e);
    }

    this.notify();
    return { success: true, guest: sessionData };
  }

  logoutGuest() {
    this._guestSession = null;
    try {
      if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(STORAGE_KEYS.GUEST_AUTH);
      if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEYS.GUEST_AUTH);
    } catch (e) {
      console.warn('Guest auth clear warning:', e);
    }
    this.notify();
  }
}

export const extrasService = new ExtrasService();
