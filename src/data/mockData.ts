import { Product, Order, Customer } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'lh-001',
    sku: 'LH-SOV-01',
    name: 'The Sovereign Flap Bag',
    tagline: 'Architectural silhouette with 24k gold-plated sculptural turnlock',
    category: 'crossbody',
    categoryLabel: 'Crossbody & Satchels',
    price: 1850,
    originalPrice: 2100,
    rating: 4.95,
    reviewCount: 38,
    featured: true,
    isNewArrival: true,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85'
    ],
    leather: 'Full-Grain Box Calfskin',
    hardware: ['Brushed 24k Gold', 'Polished Palladium'],
    colors: [
      { name: 'Noir Intemporel', hex: '#141414', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Crème de Lait', hex: '#F0ECE1', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Cognac Toscano', hex: '#8B4D2B', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85' }
    ],
    dimensions: {
      height: '18 cm / 7.1 in',
      width: '26 cm / 10.2 in',
      depth: '8.5 cm / 3.3 in',
      strapDrop: '48–56 cm / 18.9–22 in',
      weight: '620 g / 1.36 lbs'
    },
    description: 'The Sovereign is our definitive maison silhouette. Handcrafted over 18 hours in our Tuscan atelier, it pairs French box calfskin with custom-machined 24k gold-plated brass hardware that closes with a reassuring tactile click.',
    craftsmanshipNotes: [
      'Hand-stitched perimeter with beeswax-coated French linen thread',
      'Hand-painted edges burnished five successive times with heated irons',
      'Lined in glove-soft butterscotch nappa lambskin with foil-stamped serial code',
      'Reinforced internal accordion structure preventing sagging over decades'
    ],
    features: [
      'Accommodates iPhone 16 Pro Max, card holder, lip balm, compact keys',
      'Adjustable sliding leather-and-chain shoulder strap for crossbody or double-shoulder wear',
      'Back exterior magnetic slit pocket for quick phone or boarding pass access',
      'Internal zippered vanity compartment with dual card slip pockets'
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Eleanor Vance',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: '2026-09-14',
        title: 'Exceeds the finest Parisian heritage houses',
        comment: 'The leather grain and scent are peerless. The gold hardware feels substantial and silky to the touch, not hollow or tinny. It arrived wrapped like fine art in a heavy linen box.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Camille Laurent',
        location: 'Paris, France',
        rating: 5,
        date: '2026-08-29',
        title: 'An heirloom I will pass down to my daughter',
        comment: 'The craftsmanship is visibly superior to major luxury logos today. Clean lines, immaculate saddle stitching, and absolute quiet luxury.',
        verified: true
      }
    ]
  },
  {
    id: 'lh-002',
    sku: 'LH-AUR-02',
    name: 'The Aurelia Grand Tote',
    tagline: 'Sculpted carryall designed for seamless daily elegance and travel',
    category: 'totes',
    categoryLabel: 'Structured Totes',
    price: 2450,
    rating: 4.9,
    reviewCount: 42,
    featured: true,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    leather: 'Grained Epsom Leather',
    hardware: ['Brushed 24k Gold', 'Champagne Brass'],
    colors: [
      { name: 'Crème de Lait', hex: '#F0ECE1', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Noir Intemporel', hex: '#141414', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Vert Émeraude', hex: '#1E382B', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85' }
    ],
    dimensions: {
      height: '31 cm / 12.2 in',
      width: '41 cm / 16.1 in',
      depth: '16 cm / 6.3 in',
      strapDrop: '24 cm / 9.4 in handle drop',
      weight: '980 g / 2.16 lbs'
    },
    description: 'Designed for the discerning executive and traveler. The Aurelia maintains an architectural, upright composure even when carrying a 15-inch laptop, notebook, and personal effects.',
    craftsmanshipNotes: [
      'Scratch-resistant water-resistant Bavarian calfskin in fine Epsom embossing',
      'Reinforced rolled leather handles with hand-stitched bar tacks',
      'Solid brass feet protecting base leather from airport floors and tables',
      'Detachable zippered interior pouch in matching leather'
    ],
    features: [
      'Dedicated padded sleeve fits up to 15" MacBook Pro',
      'Center zip partition and magnetic snap side compartments',
      'Pass-through leather luggage sleeve for rollaboard trolley attachment',
      'Included removable leather clochette with key ring and monogram space'
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Vivienne Zhang',
        location: 'London, UK',
        rating: 5,
        date: '2026-09-02',
        title: 'The ultimate work bag of my career',
        comment: 'It stands proudly on its brass feet, fits my laptop effortlessly, and receives compliments in every boardroom.',
        verified: true
      }
    ]
  },
  {
    id: 'lh-003',
    sku: 'LH-CLT-03',
    name: 'The Minaudière Noire',
    tagline: 'Hand-sculpted evening clutch with 24k vermeil jewel clasp',
    category: 'clutches',
    categoryLabel: 'Evening & Minaudières',
    price: 1350,
    rating: 4.98,
    reviewCount: 29,
    featured: true,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    leather: 'Supple Nappa Leather',
    hardware: ['Brushed 24k Gold', 'Rose Vermeil'],
    colors: [
      { name: 'Noir Intemporel', hex: '#141414', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Bordeaux Impérial', hex: '#581825', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85' }
    ],
    dimensions: {
      height: '12 cm / 4.7 in',
      width: '21 cm / 8.3 in',
      depth: '5 cm / 2.0 in',
      strapDrop: '52 cm / 20.5 in detachable snake chain',
      weight: '410 g / 0.90 lbs'
    },
    description: 'An architectural evening companion inspired by 1930s high jewellery. The Minaudière balances buttery Italian nappa with an organic lost-wax cast gold clasp.',
    craftsmanshipNotes: [
      'Glove-soft plongé lambskin pleated by hand across rigid internal brass frame',
      'Lost-wax cast clasp hand-chiseled by Florentine goldsmiths',
      'Lined in silk-satin jacquard with woven maison crest'
    ],
    features: [
      'Fits iPhone 16, lipstick, compact mirror, and credit cards',
      'Concealable fine gold snake chain for hands-free cocktail soirees',
      'Interior beveled vanity mirror nestled in leather frame'
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Sofia Al-Mansoor',
        location: 'Dubai, UAE',
        rating: 5,
        date: '2026-09-18',
        title: 'A true piece of jewelry',
        comment: 'Carried this to the gala at the Opera Garnier. It is so striking and feather-light in hand.',
        verified: true
      }
    ]
  },
  {
    id: 'lh-004',
    sku: 'LH-PAL-04',
    name: 'The Palazzo Shoulder Bag',
    tagline: 'Curved baguette contour with integrated sculptural handle',
    category: 'crossbody',
    categoryLabel: 'Crossbody & Satchels',
    price: 1620,
    rating: 4.88,
    reviewCount: 31,
    featured: false,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
    ],
    leather: 'Tuscan Vegetable-Tanned',
    hardware: ['Brushed 24k Gold', 'Polished Palladium'],
    colors: [
      { name: 'Cognac Toscano', hex: '#8B4D2B', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Noir Intemporel', hex: '#141414', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85' }
    ],
    dimensions: {
      height: '15 cm / 5.9 in',
      width: '28 cm / 11.0 in',
      depth: '7 cm / 2.8 in',
      strapDrop: '23 cm / 9.0 in',
      weight: '490 g / 1.08 lbs'
    },
    description: 'A modern ode to mid-century Italian design. Its seamless curved bottom and structured arched handle nestle naturally under the arm for day-to-night movement.',
    craftsmanshipNotes: [
      'Slow-tanned in natural chestnut and mimosa bark tannins in Santa Croce',
      'Develops a deep, lustrous patina unique to its owner over years',
      'Magnetic bridge closure with subtle engraved logo underside'
    ],
    features: [
      'Ergonomic contour designed to sit smoothly against the ribcage',
      'Hidden key leash and twin card slip pockets',
      'Reinforced base preventing edge deformation'
    ],
    reviews: []
  },
  {
    id: 'lh-005',
    sku: 'LH-WAL-05',
    name: 'The Monogram Continental Wallet',
    tagline: 'Slimline accordion organizer crafted in mirror-finish calfskin',
    category: 'wallets',
    categoryLabel: 'Small Leather Goods',
    price: 680,
    rating: 4.92,
    reviewCount: 54,
    featured: false,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85'
    ],
    leather: 'Full-Grain Box Calfskin',
    hardware: ['Brushed 24k Gold'],
    colors: [
      { name: 'Noir Intemporel', hex: '#141414', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Crème de Lait', hex: '#F0ECE1', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85' }
    ],
    dimensions: {
      height: '10 cm / 3.9 in',
      width: '19.5 cm / 7.7 in',
      depth: '2.5 cm / 1.0 in',
      strapDrop: 'N/A',
      weight: '210 g / 0.46 lbs'
    },
    description: 'Engineered with 12 card slots, two full-length currency billfolds, and a central zippered coin pouch, wrapped in buttery leather with hand-painted edges.',
    craftsmanshipNotes: [
      'Ultra-thin skived leather partitions maintaining minimal bulk',
      'Gold foil-embossed personalization available at no charge',
      'Solid brass Raccagni zipper teeth with polished finish'
    ],
    features: [
      '12 card slots with RFID shielding interior lining',
      'Dual flat note compartments fit unfolded USD, EUR, and GBP bills',
      'Smooth zip-around security closure'
    ],
    reviews: []
  },
  {
    id: 'lh-006',
    sku: 'LH-TRV-06',
    name: 'The Ventimiglia Weekender',
    tagline: 'Hand-buffed saddlery duffle for transatlantic escapes',
    category: 'travel',
    categoryLabel: 'Travel & Weekend',
    price: 3200,
    rating: 4.97,
    reviewCount: 22,
    featured: true,
    isNewArrival: true,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    leather: 'Tuscan Vegetable-Tanned',
    hardware: ['Champagne Brass', 'Brushed 24k Gold'],
    colors: [
      { name: 'Cognac Toscano', hex: '#8B4D2B', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Noir Intemporel', hex: '#141414', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85' }
    ],
    dimensions: {
      height: '32 cm / 12.6 in',
      width: '52 cm / 20.5 in',
      depth: '24 cm / 9.4 in',
      strapDrop: '42–60 cm / 16.5–23.6 in adjustable canvas strap',
      weight: '1,850 g / 4.07 lbs'
    },
    description: 'An enduring cabin-sized companion crafted from thick 2.2mm vegetable-tanned hides. Outfitted with heavy-gauge brass zips and luggage tag ready for custom gold stamping.',
    craftsmanshipNotes: [
      'Full saddlery construction with continuous wrap-around base reinforcement',
      'Solid forged brass hardware with antique champagne luster',
      'Waterproof treated herringbone cotton canvas lining'
    ],
    features: [
      'Approved cabin baggage size for all major international airlines',
      'Separate base shoe compartment accessible via side zipper',
      'Includes solid brass padlock with twin keys and leather clochette'
    ],
    reviews: []
  },
  {
    id: 'lh-007',
    sku: 'LH-SAT-07',
    name: 'The Céline Satchel Mignon',
    tagline: 'Petite structured doctor-bag with articulated top frame',
    category: 'crossbody',
    categoryLabel: 'Crossbody & Satchels',
    price: 1580,
    rating: 4.89,
    reviewCount: 19,
    featured: false,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    leather: 'Full-Grain Box Calfskin',
    hardware: ['Brushed 24k Gold'],
    colors: [
      { name: 'Vert Émeraude', hex: '#1E382B', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Noir Intemporel', hex: '#141414', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85' }
    ],
    dimensions: {
      height: '17 cm / 6.7 in',
      width: '24 cm / 9.4 in',
      depth: '10 cm / 3.9 in',
      strapDrop: '50 cm / 19.7 in',
      weight: '580 g / 1.28 lbs'
    },
    description: 'A vintage silhouette modernized with crisp geometries and an easy spring-frame closure that pops open wide for effortless access to your essentials.',
    craftsmanshipNotes: [
      'Covered metal frame hand-wrapped in single pieces of box calfskin',
      'Dual magnetic stay tabs for secure one-handed closure',
      'Hand-burnished leather piping along structural seams'
    ],
    features: [
      'Structured top carry handle plus detachable crossbody shoulder strap',
      'Interior mirror pocket and key fob clasp',
      'Protective metal corner feet'
    ],
    reviews: []
  },
  {
    id: 'lh-008',
    sku: 'LH-CRD-08',
    name: 'The Maison Card Case',
    tagline: 'Four-slot minimalist holder with center cash pocket',
    category: 'wallets',
    categoryLabel: 'Small Leather Goods',
    price: 340,
    rating: 4.94,
    reviewCount: 67,
    featured: false,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85'
    ],
    leather: 'Grained Epsom Leather',
    hardware: ['Brushed 24k Gold'],
    colors: [
      { name: 'Crème de Lait', hex: '#F0ECE1', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Noir Intemporel', hex: '#141414', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Bordeaux Impérial', hex: '#581825', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85' }
    ],
    dimensions: {
      height: '7.5 cm / 3.0 in',
      width: '10.5 cm / 4.1 in',
      depth: '0.4 cm / 0.15 in',
      strapDrop: 'N/A',
      weight: '45 g / 0.1 lbs'
    },
    description: 'Slips imperceptibly into clutch or evening pocket. Features four curved card pockets and a central slip compartment for folded currency.',
    craftsmanshipNotes: [
      'Each slot skived to 0.4mm for zero pocket bulk',
      'Gold debossed maison serif wordmark on front facing',
      'Hand-stitched perimeter with contrast wax thread'
    ],
    features: [
      '4 card slots + 1 central note pocket',
      'Handcrafted in Tuscany from certified Italian hides',
      'Free gold foil monogramming (up to 3 initials)'
    ],
    reviews: []
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'LH-89214',
    date: '2026-10-06T14:32:00Z',
    customerName: 'Lady Charlotte Hastings',
    customerEmail: 'charlotte.hastings@mayfair.co.uk',
    shippingAddress: {
      firstName: 'Charlotte',
      lastName: 'Hastings',
      email: 'charlotte.hastings@mayfair.co.uk',
      phone: '+44 20 7946 0912',
      address: '14 Grosvenor Square',
      apartment: 'Penthouse B',
      city: 'London',
      state: 'Greater London',
      postalCode: 'W1K 6LD',
      country: 'United Kingdom'
    },
    items: [
      {
        id: 'cart-1',
        product: INITIAL_PRODUCTS[0],
        selectedColor: 'Noir Intemporel',
        selectedHardware: 'Brushed 24k Gold',
        monogram: 'C.H.',
        quantity: 1,
        unitPrice: 1850
      }
    ],
    subtotal: 1850,
    shippingMethod: 'white-glove',
    shippingCost: 0,
    discount: 0,
    tax: 185,
    total: 2035,
    status: 'Atelier Crafting',
    trackingNumber: 'LH-DHL-89214-GB',
    giftWrapping: true,
    giftNote: 'With warmest regards on your appointment to the board.',
    paymentMethod: 'Amex Centurion (•••• 8912)'
  },
  {
    id: 'ord-102',
    orderNumber: 'LH-89190',
    date: '2026-10-05T09:15:00Z',
    customerName: 'Marcus Sterling',
    customerEmail: 'm.sterling@sterlingholdings.ch',
    shippingAddress: {
      firstName: 'Marcus',
      lastName: 'Sterling',
      email: 'm.sterling@sterlingholdings.ch',
      phone: '+41 22 819 4000',
      address: 'Rue du Rhône 42',
      city: 'Geneva',
      state: 'GE',
      postalCode: '1204',
      country: 'Switzerland'
    },
    items: [
      {
        id: 'cart-2',
        product: INITIAL_PRODUCTS[5], // Ventimiglia Weekender
        selectedColor: 'Cognac Toscano',
        selectedHardware: 'Champagne Brass',
        monogram: 'M.S.',
        quantity: 1,
        unitPrice: 3200
      },
      {
        id: 'cart-3',
        product: INITIAL_PRODUCTS[4], // Monogram Wallet
        selectedColor: 'Noir Intemporel',
        selectedHardware: 'Brushed 24k Gold',
        quantity: 1,
        unitPrice: 680
      }
    ],
    subtotal: 3880,
    shippingMethod: 'concierge',
    shippingCost: 50,
    discount: 388,
    tax: 279,
    total: 3821,
    status: 'Dispatched',
    trackingNumber: 'LH-FEDEX-99201-CH',
    giftWrapping: true,
    paymentMethod: 'Private Wire Transfer'
  },
  {
    id: 'ord-103',
    orderNumber: 'LH-89052',
    date: '2026-10-02T18:40:00Z',
    customerName: 'Evelyn St. Claire',
    customerEmail: 'evelyn@stclaire.fr',
    shippingAddress: {
      firstName: 'Evelyn',
      lastName: 'St. Claire',
      email: 'evelyn@stclaire.fr',
      phone: '+33 1 42 68 55 00',
      address: '28 Avenue Montaigne',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75008',
      country: 'France'
    },
    items: [
      {
        id: 'cart-4',
        product: INITIAL_PRODUCTS[2], // Minaudière Noire
        selectedColor: 'Noir Intemporel',
        selectedHardware: 'Brushed 24k Gold',
        quantity: 1,
        unitPrice: 1350
      }
    ],
    subtotal: 1350,
    shippingMethod: 'white-glove',
    shippingCost: 0,
    discount: 0,
    tax: 270,
    total: 1620,
    status: 'Delivered',
    trackingNumber: 'LH-COURIER-7712-FR',
    giftWrapping: true,
    giftNote: 'Bonne soirée au Palais Garnier!',
    paymentMethod: 'Visa Signature (•••• 4018)'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-01',
    name: 'Lady Charlotte Hastings',
    email: 'charlotte.hastings@mayfair.co.uk',
    phone: '+44 20 7946 0912',
    tier: 'Maison Privé Client',
    memberSince: '2024-03-15',
    totalSpent: 14850,
    orderCount: 6,
    savedAddresses: [
      {
        firstName: 'Charlotte',
        lastName: 'Hastings',
        email: 'charlotte.hastings@mayfair.co.uk',
        phone: '+44 20 7946 0912',
        address: '14 Grosvenor Square',
        apartment: 'Penthouse B',
        city: 'London',
        state: 'Greater London',
        postalCode: 'W1K 6LD',
        country: 'United Kingdom'
      }
    ],
    assignedStylist: 'Béatrice de Valois',
    notes: 'Prefers gold-hardware finishes and blind embossed monogramming.'
  },
  {
    id: 'cust-02',
    name: 'Marcus Sterling',
    email: 'm.sterling@sterlingholdings.ch',
    phone: '+41 22 819 4000',
    tier: 'Signature Collector',
    memberSince: '2025-01-10',
    totalSpent: 8900,
    orderCount: 3,
    savedAddresses: [
      {
        firstName: 'Marcus',
        lastName: 'Sterling',
        email: 'm.sterling@sterlingholdings.ch',
        phone: '+41 22 819 4000',
        address: 'Rue du Rhône 42',
        city: 'Geneva',
        state: 'GE',
        postalCode: '1204',
        country: 'Switzerland'
      }
    ],
    assignedStylist: 'Jean-Luc Moreau',
    notes: 'Inquiring about bespoke luggage trunk series.'
  },
  {
    id: 'cust-03',
    name: 'Evelyn St. Claire',
    email: 'evelyn@stclaire.fr',
    phone: '+33 1 42 68 55 00',
    tier: 'Maison Privé Client',
    memberSince: '2023-11-20',
    totalSpent: 19400,
    orderCount: 8,
    savedAddresses: [
      {
        firstName: 'Evelyn',
        lastName: 'St. Claire',
        email: 'evelyn@stclaire.fr',
        phone: '+33 1 42 68 55 00',
        address: '28 Avenue Montaigne',
        city: 'Paris',
        state: 'Île-de-France',
        postalCode: '75008',
        country: 'France'
      }
    ],
    assignedStylist: 'Béatrice de Valois',
    notes: 'Attends annual haute maroquinerie private trunk shows.'
  }
];

export const FAQS = [
  {
    category: 'Craftsmanship & Materials',
    questions: [
      {
        q: 'Where are Luxe Haven leather goods crafted?',
        a: 'Every piece is entirely made by master artisans in our certified heritage atelier near Florence, Italy, and our specialty evening studio in the 8th Arrondissement of Paris. We adhere to classical saddle-stitching techniques passed down through four generations.'
      },
      {
        q: 'What types of leathers does the Maison use?',
        a: 'We select exclusively the top 2% of European hides from historic French and Italian tanneries certified by the Leather Working Group (LWG Gold standard). Our box calfskin, vegetable-tanned hides, and nappa leathers are treated with organic vegetable tannins and natural oils.'
      },
      {
        q: 'How are the hardware accents finished?',
        a: 'Our closures, locks, and chain links are precision-milled from solid architectural brass and electroplated with 24-karat gold or polished palladium with a protective microscopic ceramic sealant to resist oxidation and scratching.'
      }
    ]
  },
  {
    category: 'Delivery & White-Glove Service',
    questions: [
      {
        q: 'What does complimentary White-Glove delivery include?',
        a: 'Orders over $500 receive complimentary fully insured international courier delivery. Your handbag arrives presented in our signature ivory textured rigid gift box, tied with grosgrain ribbon, accompanied by a protective natural linen dustbag and a hand-signed certificate of authenticity.'
      },
      {
        q: 'Do you offer same-day or concierge delivery?',
        a: 'In select metropolitan areas (Paris, London, New York, Milan, and Geneva), our Private Client Concierge offers same-day hand delivery by personal chauffeur to your residence or hotel suite.'
      },
      {
        q: 'Are customs duties and taxes included?',
        a: 'Yes. All prices are calculated Delivered Duty Paid (DDP). There are no additional customs or import fees upon delivery.'
      }
    ]
  },
  {
    category: 'Personalization & Monogramming',
    questions: [
      {
        q: 'Can I personalize my handbag or wallet with monogramming?',
        a: 'Yes. We offer complimentary hot-foil personalization (in 24k gold, silver palladium, or blind subtle debossing) of up to three initials on clochettes, card cases, and leather tags. Please allow 24 additional hours for atelier embossing.'
      },
      {
        q: 'Can personalized items be returned?',
        a: 'Items that have been personalized with custom foil monogramming are bespoke creations and cannot be returned unless an error occurred in craftsmanship.'
      }
    ]
  },
  {
    category: 'Care, Warranty & Maison Spa',
    questions: [
      {
        q: 'What is the Luxe Haven lifetime commitment?',
        a: 'Every creation carries a lifetime guarantee against manufacturing defects. Furthermore, every registered client enjoys complimentary bi-annual leather conditioning and hardware re-polishing at any of our flagship boutiques.'
      },
      {
        q: 'How should I care for my handbag at home?',
        a: 'Store your bag in its linen dustbag when not in use, stuffed lightly with tissue paper to preserve its architectural structure. Keep away from direct excessive sunlight and moisture. If wet, blot immediately with a soft microfiber cloth.'
      }
    ]
  }
];

export const PRESS_CITATIONS = [
  {
    quote: 'The pinnacle of quiet luxury. Luxe Haven redefines French elegance and Tuscan leather mastery.',
    source: 'Vogue France',
    season: 'Autumn/Winter Issue'
  },
  {
    quote: 'Impeccable proportions, heavy 24k hardware, and zero overt branding. The connoisseur\'s modern handbag.',
    source: 'Harper\'s Bazaar',
    season: 'The Luxury Index'
  },
  {
    quote: 'A testament to heirloom craftsmanship in an era of ephemeral disposable luxury.',
    source: 'Architectural Digest',
    season: 'Design & Living'
  }
];
