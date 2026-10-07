import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ViewState, 
  Product, 
  CartItem, 
  Order, 
  Customer, 
  HardwareFinish,
  OrderStatus
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CUSTOMERS } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface StoreContextType {
  // Navigation & Routing
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  selectedProductId: string | null;
  navigateToProduct: (productId: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, colorName: string, hardware: HardwareFinish, monogram?: string, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Currency
  currency: 'USD' | 'EUR' | 'GBP';
  setCurrency: (c: 'USD' | 'EUR' | 'GBP') => void;
  formatPrice: (amount: number) => string;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'trackingNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Products (Admin & Store)
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  // Customer / VIP
  customer: Customer;
  updateCustomerProfile: (updated: Partial<Customer>) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Toasts
  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current View
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('luxe_haven_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('luxe_haven_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('luxe_haven_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('luxe_haven_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('luxe_haven_wishlist');
      return saved ? JSON.parse(saved) : ['lh-001', 'lh-003'];
    } catch {
      return ['lh-001', 'lh-003'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('luxe_haven_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('luxe_haven_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('luxe_haven_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const [currentOrder, setCurrentOrder] = useState<Order | null>(orders[0] || null);

  // Customer
  const [customer, setCustomer] = useState<Customer>(() => {
    try {
      const saved = localStorage.getItem('luxe_haven_customer');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS[0];
    } catch {
      return INITIAL_CUSTOMERS[0];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('luxe_haven_customer', JSON.stringify(customer));
    } catch {
      // ignore
    }
  }, [customer]);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigations
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Currency Formatter
  const formatPrice = (amount: number): string => {
    let rate = 1;
    let symbol = '$';
    if (currency === 'EUR') {
      rate = 0.92;
      symbol = '€';
    } else if (currency === 'GBP') {
      rate = 0.79;
      symbol = '£';
    }
    const converted = Math.round(amount * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  // Cart operations
  const addToCart = (
    product: Product, 
    colorName: string, 
    hardware: HardwareFinish, 
    monogram?: string, 
    qty: number = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === colorName &&
          item.selectedHardware === hardware &&
          item.monogram === (monogram || undefined)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString().slice(2, 5)}`,
          product,
          selectedColor: colorName,
          selectedHardware: hardware,
          monogram: monogram?.trim() ? monogram.trim().toUpperCase() : undefined,
          quantity: qty,
          unitPrice: product.price
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${product.name} to your Maison Bag`, 'gold');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from your bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartTotal = cartSubtotal;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your private wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your private wishlist', 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Orders
  const createOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'trackingNumber'>
  ): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `LH-${randomSuffix}`,
      date: new Date().toISOString(),
      status: 'Atelier Crafting',
      trackingNumber: `LH-COURIER-${randomSuffix}-GLOBAL`
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    
    // Update customer stats
    setCustomer((prev) => ({
      ...prev,
      totalSpent: prev.totalSpent + newOrder.total,
      orderCount: prev.orderCount + 1
    }));

    showToast(`Order #${newOrder.orderNumber} confirmed. Handcrafting underway.`, 'gold');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order status updated to ${status}`, 'info');
  };

  // Products
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`New creation "${newProduct.name}" added to catalog`, 'gold');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast(`Updated "${updatedProduct.name}" specifications`, 'info');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from active catalog', 'info');
  };

  const updateCustomerProfile = (updated: Partial<Customer>) => {
    setCustomer((prev) => ({ ...prev, ...updated }));
    showToast('Maison Privé profile updated', 'gold');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        navigateToProduct,
        selectedCategory,
        setSelectedCategory,
        isAdmin,
        setIsAdmin,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartSubtotal,
        cartCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currency,
        setCurrency,
        formatPrice,
        orders,
        currentOrder,
        createOrder,
        updateOrderStatus,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        customer,
        updateCustomerProfile,
        searchQuery,
        setSearchQuery,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
