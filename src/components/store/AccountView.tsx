import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { LuxuryImage } from '../common/LuxuryImage';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Send, 
  ExternalLink, 
  Trash2,
  Edit2,
  Check
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    customer,
    updateCustomerProfile,
    orders,
    wishlist,
    products,
    navigateToProduct,
    addToCart,
    toggleWishlist,
    formatPrice,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'concierge'>('orders');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(customer.name);
  const [phoneInput, setPhoneInput] = useState(customer.phone);

  // Concierge message
  const [conciergeMsg, setConciergeMsg] = useState('');

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name: nameInput,
      phone: phoneInput
    });
    setIsEditingProfile(false);
  };

  const handleSendConcierge = (e: React.FormEvent) => {
    e.preventDefault();
    if (conciergeMsg.trim()) {
      showToast(`Message transmitted to your stylist ${customer.assignedStylist}`, 'gold');
      setConciergeMsg('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Client Header / VIP Banner */}
      <div className="bg-[#1C1A18] text-[#F9F7F2] p-8 border border-[#332E27] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#C5A880] font-semibold">
              {customer.tier}
            </span>
            <span className="text-[#8C8476]">·</span>
            <span className="text-xs text-[#A8A092]">Member Since {customer.memberSince.split('-')[0]}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]">
            {customer.name}
          </h1>

          <p className="text-xs text-[#BDB5A8]">
            {customer.email} · {customer.phone}
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs border-t border-[#2E2B26] mt-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C8476] block">Lifetime Value</span>
              <span className="font-mono text-sm font-semibold tabular-nums text-[#D4AF37]">
                {formatPrice(customer.totalSpent)}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C8476] block">Atelier Orders</span>
              <span className="font-mono text-sm font-semibold tabular-nums text-[#FAF8F5]">
                {orders.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8C8476] block">Assigned Stylist</span>
              <span className="text-sm text-[#FAF8F5]">
                {customer.assignedStylist}
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-4 py-2 border border-[#4D453A] text-xs uppercase tracking-wider text-[#E8E2D5] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Form Modal */}
      {isEditingProfile && (
        <form onSubmit={handleSaveProfile} className="bg-white border border-[#E8E4DA] p-6 space-y-4 max-w-xl">
          <h3 className="font-serif text-lg text-[#141413]">Update Maison Record</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Phone Number</label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-5 py-2 bg-[#141413] text-white text-xs uppercase tracking-wider hover:bg-[#38342D]"
            >
              Save Record
            </button>
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 border border-[#D5CEBF] text-xs uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-3 border-b border-[#E8E4DA] text-xs uppercase tracking-wider overflow-x-auto scrollbar-none pb-0.5">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-4 font-medium transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'orders'
              ? 'border-[#141413] text-[#141413]'
              : 'border-transparent text-[#7A7468] hover:text-[#141413]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Atelier Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`py-3 px-4 font-medium transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'wishlist'
              ? 'border-[#141413] text-[#141413]'
              : 'border-transparent text-[#7A7468] hover:text-[#141413]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Private Wishlist ({wishlistProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`py-3 px-4 font-medium transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'addresses'
              ? 'border-[#141413] text-[#141413]'
              : 'border-transparent text-[#7A7468] hover:text-[#141413]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Delivery Residences</span>
        </button>

        <button
          onClick={() => setActiveTab('concierge')}
          className={`py-3 px-4 font-medium transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'concierge'
              ? 'border-[#141413] text-[#141413]'
              : 'border-transparent text-[#7A7468] hover:text-[#141413]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Personal Stylist Liaison</span>
        </button>
      </div>

      {/* TAB CONTENT */}
      <div>
        {/* 1. ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white border border-[#E8E4DA] p-12 text-center space-y-3">
                <p className="font-serif text-xl text-[#2B2925]">No Orders Recorded Yet</p>
                <p className="text-xs text-[#7A7468]">Explore our permanent collection to acquire your first creation.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white border border-[#E8E4DA] p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0ECE1] pb-3 text-xs">
                    <div>
                      <span className="font-serif text-base text-[#141413] font-semibold mr-3">
                        Order #{order.orderNumber}
                      </span>
                      <span className="text-[#7A7468]">
                        Placed {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold bg-[#F5F2EB] text-[#8C6D37] border border-[#DFD8C8]">
                        {order.status}
                      </span>
                      <span className="font-mono text-sm font-semibold tabular-nums text-[#141413]">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-[#F0ECE1]">
                    {order.items.map((it) => (
                      <div key={it.id} className="py-3 flex gap-4">
                        <div
                          className="w-14 h-16 bg-[#F7F5F0] border border-[#E0DBD0] overflow-hidden shrink-0 cursor-pointer"
                          onClick={() => navigateToProduct(it.product.id)}
                        >
                          <LuxuryImage
                            src={it.product.image}
                            alt={it.product.name}
                            aspectRatioClass="h-full w-full"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between text-xs">
                          <div>
                            <h4
                              onClick={() => navigateToProduct(it.product.id)}
                              className="font-serif text-sm font-semibold text-[#141413] hover:text-[#9F7A3E] cursor-pointer"
                            >
                              {it.product.name}
                            </h4>
                            <p className="text-[#706A5F] mt-0.5">
                              {it.selectedColor} · {it.selectedHardware}
                            </p>
                            {it.monogram && (
                              <p className="text-[#9F7A3E]">Foil Monogram: "{it.monogram}"</p>
                            )}
                          </div>
                          <span className="font-mono text-[11px] text-[#8C8476]">
                            Qty: {it.quantity} · {formatPrice(it.unitPrice)} each
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer with tracking code */}
                  <div className="pt-3 border-t border-[#F0ECE1] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#706A5F] gap-2">
                    <div className="flex items-center gap-2">
                      <span>Liaison Tracker:</span>
                      <span className="font-mono text-[#141413]">{order.trackingNumber}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span>Delivered To: {order.shippingAddress.city}, {order.shippingAddress.country}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 2. WISHLIST */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white border border-[#E8E4DA] p-12 text-center space-y-3">
                <p className="font-serif text-xl text-[#2B2925]">Your Private Wishlist is Empty</p>
                <p className="text-xs text-[#7A7468]">Save silhouettes to your wishlist while exploring the collection.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <div key={p.id} className="bg-white border border-[#E8E4DA] p-4 flex flex-col justify-between space-y-3">
                    <div
                      className="aspect-[4/3] bg-[#F7F5F0] overflow-hidden cursor-pointer"
                      onClick={() => navigateToProduct(p.id)}
                    >
                      <LuxuryImage
                        src={p.image}
                        alt={p.name}
                        aspectRatioClass="h-full w-full"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C8476]">{p.categoryLabel}</span>
                      <h4
                        onClick={() => navigateToProduct(p.id)}
                        className="font-serif text-base text-[#141413] hover:text-[#9F7A3E] cursor-pointer font-semibold"
                      >
                        {p.name}
                      </h4>
                      <span className="font-mono text-xs tabular-nums font-semibold text-[#141413] block mt-1">
                        {formatPrice(p.price)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#F0ECE1] flex items-center justify-between">
                      <button
                        onClick={() => addToCart(p, p.colors[0].name, p.hardware[0])}
                        className="text-xs uppercase tracking-wider text-[#141413] hover:text-[#9F7A3E] border-b border-[#141413] pb-0.5"
                      >
                        Add to Bag
                      </button>

                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-xs text-[#8C8476] hover:text-[#B22222] flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. RESIDENCES / ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customer.savedAddresses.map((addr, idx) => (
              <div key={idx} className="bg-white border border-[#E8E4DA] p-6 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-2">
                  <span className="font-serif text-sm font-semibold text-[#141413]">
                    Primary Residence ({addr.city})
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#2F6142] font-semibold">
                    Default Delivery
                  </span>
                </div>

                <p className="font-semibold text-[#141413]">{addr.firstName} {addr.lastName}</p>
                <p className="text-[#706A5F]">{addr.address} {addr.apartment || ''}</p>
                <p className="text-[#706A5F]">{addr.city}, {addr.state} {addr.postalCode}</p>
                <p className="text-[#706A5F]">{addr.country}</p>
                <p className="text-[#706A5F] pt-1">Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        )}

        {/* 4. CONCIERGE STYLIST */}
        {activeTab === 'concierge' && (
          <div className="bg-white border border-[#E8E4DA] p-6 sm:p-8 space-y-6 max-w-2xl">
            <div className="flex items-center gap-4 border-b border-[#F0ECE1] pb-4">
              <div className="w-12 h-12 rounded-full bg-[#F3EFE6] border border-[#C5A880] flex items-center justify-center font-serif text-lg text-[#9F7A3E]">
                BV
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9F7A3E] font-semibold block">
                  Private Salon Stylist
                </span>
                <h3 className="font-serif text-lg text-[#141413] font-semibold">
                  {customer.assignedStylist}
                </h3>
                <p className="text-xs text-[#706A5F]">Based at Paris Flagship · Rue du Faubourg Saint-Honoré</p>
              </div>
            </div>

            <p className="text-xs text-[#524E46] leading-relaxed">
              As a Maison Privé Client, you have direct correspondence with your assigned stylist for personalized hide allocations, private trunk show previews, and bespoke monogramming requests.
            </p>

            <form onSubmit={handleSendConcierge} className="space-y-3">
              <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block font-semibold">
                Direct Correspondence
              </label>
              <textarea
                rows={4}
                required
                value={conciergeMsg}
                onChange={(e) => setConciergeMsg(e.target.value)}
                placeholder="Inquire regarding bespoke leather finishes, salon appointments, or private vault reserves..."
                className="w-full bg-[#FAF9F6] border border-[#D5CEBF] p-3 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#141413] text-white text-xs uppercase tracking-widest hover:bg-[#38342D] transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit to Stylist</span>
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};
