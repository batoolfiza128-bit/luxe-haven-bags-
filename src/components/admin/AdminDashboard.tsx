import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, OrderStatus, CategoryType, LeatherType } from '../../types';
import { LuxuryImage } from '../common/LuxuryImage';
import { 
  BarChart3, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  ArrowLeft, 
  Search, 
  Filter, 
  AlertCircle,
  CheckCircle2,
  X,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    customer,
    formatPrice,
    setCurrentView,
    setIsAdmin,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers' | 'settings'>('overview');

  // Order filters
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Product management modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form state
  const [newProductName, setNewProductName] = useState('');
  const [newProductSku, setNewProductSku] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(1500);
  const [newProductCategory, setNewProductCategory] = useState<CategoryType>('crossbody');
  const [newProductLeather, setNewProductLeather] = useState<LeatherType>('Full-Grain Box Calfskin');
  const [newProductStock, setNewProductStock] = useState(8);
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85');
  const [newProductTagline, setNewProductTagline] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');

  // Overview metrics
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, ord) => sum + ord.total, 0) + 142500; // base historical + active
  }, [orders]);

  const totalOrdersCount = orders.length + 84;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      if (orderStatusFilter !== 'all' && ord.status !== orderStatusFilter) return false;
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        return (
          ord.orderNumber.toLowerCase().includes(q) ||
          ord.customerName.toLowerCase().includes(q) ||
          ord.customerEmail.toLowerCase().includes(q) ||
          ord.trackingNumber.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: Product = {
      id: `lh-${Date.now()}`,
      sku: newProductSku.trim() || `LH-${Math.floor(100 + Math.random() * 900)}`,
      name: newProductName.trim(),
      tagline: newProductTagline.trim() || 'Handcrafted luxury creation',
      category: newProductCategory,
      categoryLabel: newProductCategory === 'crossbody' ? 'Crossbody & Satchels' : newProductCategory === 'totes' ? 'Structured Totes' : 'Small Leather Goods',
      price: Number(newProductPrice),
      rating: 5.0,
      reviewCount: 0,
      featured: true,
      stock: Number(newProductStock),
      image: newProductImage.trim(),
      secondaryImage: newProductImage.trim(),
      gallery: [newProductImage.trim()],
      leather: newProductLeather,
      hardware: ['Brushed 24k Gold', 'Polished Palladium'],
      colors: [
        { name: 'Noir Intemporel', hex: '#141414', image: newProductImage.trim() },
        { name: 'Crème de Lait', hex: '#F0ECE1', image: newProductImage.trim() }
      ],
      dimensions: {
        height: '20 cm',
        width: '28 cm',
        depth: '10 cm',
        strapDrop: '52 cm',
        weight: '650 g'
      },
      description: newProductDesc.trim() || 'Handmade in our Tuscan atelier with French box calfskin and 24k gold hardware.',
      craftsmanshipNotes: ['Hand-burnished edges', 'Saddle-stitched seams'],
      features: ['Lined in nappa lambskin', 'Internal zip partition'],
      reviews: []
    };

    addProduct(newProd);
    setIsAddProductOpen(false);
    // Reset form
    setNewProductName('');
    setNewProductTagline('');
    setNewProductDesc('');
  };

  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#141413]">
      
      {/* Top Bar for Admin */}
      <header className="bg-[#141413] text-[#FAF8F5] border-b border-[#292621] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsAdmin(false);
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#C5A880] hover:text-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </button>
          <span className="text-[#4D453A]">|</span>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-[0.16em] uppercase text-[#FAF8F5]">
              Luxe Haven
            </span>
            <span className="text-[10px] uppercase tracking-wider bg-[#2B2721] text-[#D4AF37] px-2 py-0.5 border border-[#4A4234]">
              Maison Console
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-[#8C8476] hidden sm:inline">
            Logged in as <strong>Director of Atelier</strong>
          </span>
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="bg-[#C5A880] hover:bg-[#D4AF37] text-[#141413] px-3.5 py-1.5 font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 text-[11px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Creation</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#DDD8CC] pb-1 overflow-x-auto scrollbar-none text-xs uppercase tracking-wider font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-4 flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-[#141413] text-[#141413] font-semibold'
                : 'border-transparent text-[#706A5F] hover:text-[#141413]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2.5 px-4 flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === 'orders'
                ? 'border-[#141413] text-[#141413] font-semibold'
                : 'border-transparent text-[#706A5F] hover:text-[#141413]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders Queue ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-2.5 px-4 flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === 'products'
                ? 'border-[#141413] text-[#141413] font-semibold'
                : 'border-transparent text-[#706A5F] hover:text-[#141413]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Catalog Items ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`py-2.5 px-4 flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === 'customers'
                ? 'border-[#141413] text-[#141413] font-semibold'
                : 'border-transparent text-[#706A5F] hover:text-[#141413]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>VIP Clientele</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-4 flex items-center gap-2 transition-colors border-b-2 ${
              activeTab === 'settings'
                ? 'border-[#141413] text-[#141413] font-semibold'
                : 'border-transparent text-[#706A5F] hover:text-[#141413]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Maison Settings</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Key Figures (Strict Tabular Numerals) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-[#E2DDD2] p-6 space-y-1">
                <div className="flex items-center justify-between text-[#706A5F] text-xs uppercase tracking-wider">
                  <span>Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-[#9F7A3E]" />
                </div>
                <div className="font-mono text-2xl font-bold tabular-nums text-[#141413] pt-1">
                  {formatPrice(totalRevenue)}
                </div>
                <span className="text-[11px] text-[#2F6142] flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+18.4% vs last quarter</span>
                </span>
              </div>

              <div className="bg-white border border-[#E2DDD2] p-6 space-y-1">
                <div className="flex items-center justify-between text-[#706A5F] text-xs uppercase tracking-wider">
                  <span>Total Orders</span>
                  <Package className="w-4 h-4 text-[#9F7A3E]" />
                </div>
                <div className="font-mono text-2xl font-bold tabular-nums text-[#141413] pt-1">
                  {totalOrdersCount}
                </div>
                <span className="text-[11px] text-[#706A5F]">99.2% on-time white-glove transit</span>
              </div>

              <div className="bg-white border border-[#E2DDD2] p-6 space-y-1">
                <div className="flex items-center justify-between text-[#706A5F] text-xs uppercase tracking-wider">
                  <span>Average Order Value</span>
                  <TrendingUp className="w-4 h-4 text-[#9F7A3E]" />
                </div>
                <div className="font-mono text-2xl font-bold tabular-nums text-[#141413] pt-1">
                  {formatPrice(avgOrderValue)}
                </div>
                <span className="text-[11px] text-[#706A5F]">High-ticket leather goods</span>
              </div>

              <div className="bg-white border border-[#E2DDD2] p-6 space-y-1">
                <div className="flex items-center justify-between text-[#706A5F] text-xs uppercase tracking-wider">
                  <span>Atelier Inventory Alerts</span>
                  <AlertCircle className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div className="font-mono text-2xl font-bold tabular-nums text-[#141413] pt-1">
                  {lowStockProducts.length} Silhouettes
                </div>
                <span className="text-[11px] text-[#B22222]">Requires hide restock</span>
              </div>
            </div>

            {/* Inventory Alerts & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Recent Orders Queue (2 cols) */}
              <div className="lg:col-span-2 bg-white border border-[#E2DDD2] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                  <h3 className="font-serif text-lg text-[#141413]">Recent Client Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs uppercase tracking-wider text-[#9F7A3E] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E8E4DA] text-[#8C8476] uppercase tracking-wider text-[10px]">
                        <th className="py-2.5">Order</th>
                        <th className="py-2.5">Client</th>
                        <th className="py-2.5">Total</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F2EA]">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF9F6]">
                          <td className="py-3 font-mono font-medium">{ord.orderNumber}</td>
                          <td className="py-3 font-medium text-[#141413]">{ord.customerName}</td>
                          <td className="py-3 font-mono tabular-nums font-semibold">{formatPrice(ord.total)}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-[#F5F2EB] text-[#8C6D37] border border-[#DFD8C8]">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="text-xs text-[#141413] hover:text-[#9F7A3E] underline font-medium"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Low stock alerts panel (1 col) */}
              <div className="bg-white border border-[#E2DDD2] p-6 space-y-4">
                <div className="border-b border-[#F0ECE1] pb-3">
                  <h3 className="font-serif text-lg text-[#141413]">Low Stock Runs</h3>
                  <p className="text-[11px] text-[#706A5F]">Limited runs approaching atelier exhaustion</p>
                </div>

                <div className="space-y-3">
                  {lowStockProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-xs p-2.5 bg-[#FAF9F6] border border-[#E8E4DA]">
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-semibold text-[#141413]">{p.name}</h4>
                        <span className="text-[10px] text-[#706A5F]">{p.leather.split(' ')[0]}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-[#B22222] tabular-nums">
                          {p.stock} left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-[#E2DDD2] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0ECE1] pb-4">
              <div>
                <h2 className="font-serif text-xl text-[#141413]">Order Fulfillment Queue</h2>
                <p className="text-xs text-[#706A5F]">Monitor handcrafting, foil monogram stamping, and international courier dispatch</p>
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search order number or client..."
                    className="bg-[#FAF9F6] border border-[#D5CEBF] pl-8 pr-3 py-1.5 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#8C8476] absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-1.5 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                >
                  <option value="all">All Statuses</option>
                  <option value="Atelier Crafting">Atelier Crafting</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E4DA] text-[#8C8476] uppercase tracking-wider text-[10px]">
                    <th className="py-3">Order Code</th>
                    <th className="py-3">Client</th>
                    <th className="py-3">Items</th>
                    <th className="py-3">Total Amount</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Tracking</th>
                    <th className="py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EA]">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF9F6]">
                      <td className="py-3.5 font-mono font-medium">{ord.orderNumber}</td>
                      <td className="py-3.5">
                        <p className="font-medium text-[#141413]">{ord.customerName}</p>
                        <p className="text-[10px] text-[#706A5F]">{ord.customerEmail}</p>
                      </td>
                      <td className="py-3.5">
                        {ord.items.map((i) => i.product.name).join(', ')}
                        {ord.giftWrapping && <span className="ml-1 text-[#9F7A3E] font-medium">(Gift)</span>}
                      </td>
                      <td className="py-3.5 font-mono tabular-nums font-semibold">{formatPrice(ord.total)}</td>
                      <td className="py-3.5">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-white border border-[#D5CEBF] px-2 py-1 text-xs text-[#141413] font-medium"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Atelier Crafting">Atelier Crafting</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 font-mono text-[11px] text-[#706A5F]">{ord.trackingNumber}</td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-2.5 py-1 text-xs border border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-white transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white border border-[#E2DDD2] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0ECE1] pb-4">
              <div>
                <h2 className="font-serif text-xl text-[#141413]">Maison Catalog Management</h2>
                <p className="text-xs text-[#706A5F]">Inspect, add, and calibrate leather goods stock and specifications</p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#141413] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[#38342D] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Add New Creation</span>
              </button>
            </div>

            {/* Products Grid / Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E4DA] text-[#8C8476] uppercase tracking-wider text-[10px]">
                    <th className="py-3">Silhouette</th>
                    <th className="py-3">SKU</th>
                    <th className="py-3">Category</th>
                    <th className="py-3">Leather Hide</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Stock Count</th>
                    <th className="py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EA]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF9F6]">
                      <td className="py-3 flex items-center gap-3">
                        <div className="w-10 h-12 bg-[#F7F5F0] border border-[#E0DBD0] overflow-hidden shrink-0">
                          <LuxuryImage
                            src={p.image}
                            alt={p.name}
                            aspectRatioClass="h-full w-full"
                          />
                        </div>
                        <div>
                          <p className="font-serif font-semibold text-sm text-[#141413]">{p.name}</p>
                          <p className="text-[10px] text-[#706A5F]">{p.colors.length} shades</p>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-xs">{p.sku}</td>
                      <td className="py-3 text-[#706A5F]">{p.categoryLabel}</td>
                      <td className="py-3 text-[#706A5F]">{p.leather}</td>
                      <td className="py-3 font-mono tabular-nums font-semibold">{formatPrice(p.price)}</td>
                      <td className="py-3 font-mono tabular-nums font-semibold">
                        <span className={p.stock <= 4 ? 'text-[#B22222]' : 'text-[#141413]'}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1 text-[#706A5F] hover:text-[#141413]"
                          title="Edit creation"
                        >
                          <Edit3 className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1 text-[#8C8476] hover:text-[#B22222]"
                          title="Remove from catalog"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: VIP CLIENTELE */}
        {activeTab === 'customers' && (
          <div className="bg-white border border-[#E2DDD2] p-6 space-y-6">
            <div className="border-b border-[#F0ECE1] pb-4">
              <h2 className="font-serif text-xl text-[#141413]">VIP Clientele & Collectors</h2>
              <p className="text-xs text-[#706A5F]">Maison Privé registries and dedicated styling representatives</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E4DA] text-[#8C8476] uppercase tracking-wider text-[10px]">
                    <th className="py-3">Client Name</th>
                    <th className="py-3">Tier</th>
                    <th className="py-3">Lifetime Spend</th>
                    <th className="py-3">Orders</th>
                    <th className="py-3">Assigned Stylist</th>
                    <th className="py-3">Private Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EA]">
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="py-3 font-medium text-[#141413]">{customer.name}</td>
                    <td className="py-3 text-[#9F7A3E] font-medium">{customer.tier}</td>
                    <td className="py-3 font-mono tabular-nums font-semibold">{formatPrice(customer.totalSpent)}</td>
                    <td className="py-3 font-mono tabular-nums">{customer.orderCount}</td>
                    <td className="py-3">{customer.assignedStylist}</td>
                    <td className="py-3 text-[#706A5F] italic">"{customer.notes || 'Prefers gold hardware.'}"</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="py-3 font-medium text-[#141413]">Marcus Sterling</td>
                    <td className="py-3 text-[#9F7A3E] font-medium">Signature Collector</td>
                    <td className="py-3 font-mono tabular-nums font-semibold">{formatPrice(8900)}</td>
                    <td className="py-3 font-mono tabular-nums">3</td>
                    <td className="py-3">Jean-Luc Moreau</td>
                    <td className="py-3 text-[#706A5F] italic">"Inquiring about bespoke luggage trunks."</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="py-3 font-medium text-[#141413]">Evelyn St. Claire</td>
                    <td className="py-3 text-[#9F7A3E] font-medium">Maison Privé Client</td>
                    <td className="py-3 font-mono tabular-nums font-semibold">{formatPrice(19400)}</td>
                    <td className="py-3 font-mono tabular-nums">8</td>
                    <td className="py-3">Béatrice de Valois</td>
                    <td className="py-3 text-[#706A5F] italic">"Attends annual Paris salon shows."</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: MAISON SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[#E2DDD2] p-6 space-y-6 max-w-2xl">
            <div className="border-b border-[#F0ECE1] pb-3">
              <h2 className="font-serif text-xl text-[#141413]">Maison Operational Parameters</h2>
              <p className="text-xs text-[#706A5F]">Commerce configuration and shipping rules</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">
                  Complimentary White-Glove Threshold
                </label>
                <input
                  type="text"
                  defaultValue="$500 USD"
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">
                  Standard VAT / Duty Calculation (DDP)
                </label>
                <input
                  type="text"
                  defaultValue="10.0% (Inclusive in catalog checkout)"
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">
                  Complimentary Monogramming Lead Time
                </label>
                <input
                  type="text"
                  defaultValue="24 Hours (Atelier Hot Foil Stamping)"
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => showToast('Maison configuration updated', 'gold')}
                  className="px-6 py-2 bg-[#141413] text-white text-xs uppercase tracking-widest hover:bg-[#38342D]"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E8E4DA] w-full max-w-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <h3 className="font-serif text-xl text-[#141413]">Introduce New Creation to Catalog</h3>
              <button onClick={() => setIsAddProductOpen(false)}>
                <X className="w-5 h-5 text-[#8C8476]" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Creation Name *</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. The Vendôme Top Handle"
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">SKU Reference</label>
                  <input
                    type="text"
                    value={newProductSku}
                    onChange={(e) => setNewProductSku(e.target.value)}
                    placeholder="e.g. LH-VEN-09"
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Category *</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value as any)}
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413]"
                  >
                    <option value="crossbody">Crossbody & Satchels</option>
                    <option value="totes">Structured Totes</option>
                    <option value="clutches">Evening Minaudières</option>
                    <option value="wallets">Small Leather Goods</option>
                    <option value="travel">Travel & Weekend</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Leather Type *</label>
                  <select
                    value={newProductLeather}
                    onChange={(e) => setNewProductLeather(e.target.value as any)}
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413]"
                  >
                    <option value="Full-Grain Box Calfskin">Full-Grain Box Calfskin</option>
                    <option value="Grained Epsom Leather">Grained Epsom Leather</option>
                    <option value="Supple Nappa Leather">Supple Nappa Leather</option>
                    <option value="Tuscan Vegetable-Tanned">Tuscan Vegetable-Tanned</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    required
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value))}
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs font-mono tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(Number(e.target.value))}
                    className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs font-mono tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={newProductImage}
                  onChange={(e) => setNewProductImage(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Tagline</label>
                <input
                  type="text"
                  value={newProductTagline}
                  onChange={(e) => setNewProductTagline(e.target.value)}
                  placeholder="Architectural trapezoid silhouette with brushed turnlock"
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  placeholder="Describe the French calfskin sourcing, edge burnishing, and capacity..."
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border border-[#D5CEBF] text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#141413] text-white text-xs uppercase tracking-widest hover:bg-[#38342D]"
                >
                  Save Creation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E8E4DA] w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <h3 className="font-serif text-lg text-[#141413]">Edit Creation: {editingProduct.name}</h3>
              <button onClick={() => setEditingProduct(null)}>
                <X className="w-5 h-5 text-[#8C8476]" />
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Price (USD)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Stock Count</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-[#D5CEBF] text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#141413] text-white text-xs uppercase tracking-widest hover:bg-[#38342D]"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ORDER DETAILS */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#E8E4DA] w-full max-w-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <div>
                <h3 className="font-serif text-xl text-[#141413]">Order Dossier: #{selectedOrder.orderNumber}</h3>
                <span className="text-[11px] text-[#706A5F]">Placed {new Date(selectedOrder.date).toLocaleString()}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5 text-[#8C8476]" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-[#FAF9F6] p-4 border border-[#E8E4DA]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8476] block">Client Name</span>
                  <p className="font-semibold text-sm text-[#141413]">{selectedOrder.customerName}</p>
                  <p className="text-[#706A5F]">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8476] block">Destination</span>
                  <p className="text-[#141413]">{selectedOrder.shippingAddress.address}</p>
                  <p className="text-[#706A5F]">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.country}</p>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-sm font-semibold text-[#141413] mb-2">Itemized Creations</h4>
                <div className="divide-y divide-[#F0ECE1] border border-[#E8E4DA]">
                  {selectedOrder.items.map((it) => (
                    <div key={it.id} className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-[#141413]">{it.product.name}</p>
                        <p className="text-[11px] text-[#706A5F]">{it.selectedColor} · {it.selectedHardware}</p>
                        {it.monogram && (
                          <p className="text-[11px] text-[#9F7A3E]">Personalized Monogram Foil: "{it.monogram}"</p>
                        )}
                      </div>
                      <span className="font-mono tabular-nums font-semibold">
                        {it.quantity} × {formatPrice(it.unitPrice)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.giftWrapping && selectedOrder.giftNote && (
                <div className="p-3 bg-[#FAF9F6] border border-[#C5A880] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#9F7A3E] font-semibold block">
                    Hand-Penned Gift Note Request
                  </span>
                  <p className="font-serif italic text-xs text-[#2A2723]">"{selectedOrder.giftNote}"</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t border-[#F0ECE1]">
                <div>
                  <span className="text-xs text-[#706A5F] mr-2">Update Status:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value as OrderStatus);
                      setSelectedOrder({ ...selectedOrder, status: e.target.value as OrderStatus });
                    }}
                    className="bg-white border border-[#D5CEBF] px-2 py-1 text-xs"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Atelier Crafting">Atelier Crafting</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#706A5F] block">Total Settled</span>
                  <span className="font-mono text-lg font-bold tabular-nums text-[#141413]">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
