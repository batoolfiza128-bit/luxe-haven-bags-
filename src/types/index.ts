export type ViewState = 
  | 'home' 
  | 'catalog' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'account' 
  | 'about' 
  | 'contact' 
  | 'faq' 
  | 'admin';

export type CategoryType = 
  | 'all'
  | 'totes' 
  | 'crossbody' 
  | 'clutches' 
  | 'wallets' 
  | 'travel';

export type LeatherType = 
  | 'Full-Grain Box Calfskin'
  | 'Supple Nappa Leather'
  | 'Grained Epsom Leather'
  | 'Tuscan Vegetable-Tanned'
  | 'Suede & Velvet Calfskin';

export type HardwareFinish = 
  | 'Brushed 24k Gold' 
  | 'Polished Palladium' 
  | 'Champagne Brass' 
  | 'Rose Vermeil';

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  tagline: string;
  category: CategoryType;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isNewArrival?: boolean;
  stock: number;
  image: string;
  secondaryImage: string;
  gallery: string[];
  leather: LeatherType;
  hardware: HardwareFinish[];
  colors: ProductColor[];
  dimensions: {
    height: string;
    width: string;
    depth: string;
    strapDrop: string;
    weight: string;
  };
  description: string;
  craftsmanshipNotes: string[];
  features: string[];
  reviews: Review[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: string;
  selectedHardware: HardwareFinish;
  monogram?: string;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 'Processing' | 'Atelier Crafting' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shippingMethod: 'white-glove' | 'express' | 'concierge';
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  status: OrderStatus;
  trackingNumber: string;
  giftWrapping: boolean;
  giftNote?: string;
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'Maison Privé Client' | 'Signature Collector' | 'Guest';
  memberSince: string;
  totalSpent: number;
  orderCount: number;
  savedAddresses: ShippingAddress[];
  assignedStylist: string;
  notes?: string;
}

export interface FilterState {
  category: CategoryType;
  color: string;
  leather: string;
  hardware: string;
  priceRange: [number, number];
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'new';
  inStockOnly: boolean;
}
