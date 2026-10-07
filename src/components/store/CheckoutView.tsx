import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShippingAddress } from '../../types';
import { LuxuryImage } from '../common/LuxuryImage';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Building, 
  Truck, 
  Gift, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    formatPrice,
    createOrder,
    setCurrentView,
    customer
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Client info & Address
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: customer.savedAddresses[0]?.firstName || 'Charlotte',
    lastName: customer.savedAddresses[0]?.lastName || 'Hastings',
    email: customer.email || 'charlotte.hastings@mayfair.co.uk',
    phone: customer.phone || '+44 20 7946 0912',
    address: customer.savedAddresses[0]?.address || '14 Grosvenor Square',
    apartment: customer.savedAddresses[0]?.apartment || 'Penthouse B',
    city: customer.savedAddresses[0]?.city || 'London',
    state: customer.savedAddresses[0]?.state || 'Greater London',
    postalCode: customer.savedAddresses[0]?.postalCode || 'W1K 6LD',
    country: customer.savedAddresses[0]?.country || 'United Kingdom'
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'white-glove' | 'express' | 'concierge'>('white-glove');
  const shippingCosts = {
    'white-glove': 0,
    'express': 35,
    'concierge': 75
  };

  // Payment
  const [paymentType, setPaymentType] = useState<'card' | 'wire' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('892');

  // Gift options
  const [giftWrapping, setGiftWrapping] = useState(true);
  const [giftNote, setGiftNote] = useState('With deepest compliments.');

  // Calculations
  const shippingFee = shippingCosts[shippingMethod];
  const taxAmount = Math.round(cartSubtotal * 0.1);
  const totalAmount = cartSubtotal + shippingFee + taxAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let paymentMethodLabel = 'Visa Signature (•••• 8892)';
    if (paymentType === 'wire') paymentMethodLabel = 'Private Bank Wire Transfer';
    if (paymentType === 'cod') paymentMethodLabel = 'Concierge Delivery Signature';

    createOrder({
      customerName: `${formData.firstName} ${formData.lastName}`.trim(),
      customerEmail: formData.email,
      shippingAddress: formData,
      items: cart,
      subtotal: cartSubtotal,
      shippingMethod,
      shippingCost: shippingFee,
      discount: 0,
      tax: taxAmount,
      total: totalAmount,
      giftWrapping,
      giftNote: giftWrapping ? giftNote : undefined,
      paymentMethod: paymentMethodLabel
    });

    setCurrentView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#141413]">Your Maison Bag is Empty</h2>
        <p className="text-xs text-[#706A5F]">Please select a creation from our catalog before proceeding to checkout.</p>
        <button
          onClick={() => setCurrentView('catalog')}
          className="px-6 py-3 bg-[#141413] text-white text-xs uppercase tracking-widest hover:bg-[#33302B]"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Breadcrumb & Step Tracker */}
      <div className="flex items-center justify-between border-b border-[#E8E4DA] pb-6">
        <button
          onClick={() => setCurrentView('catalog')}
          className="text-xs uppercase tracking-wider text-[#706A5F] hover:text-[#141413] flex items-center gap-1.5 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Catalog</span>
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-4 text-xs font-medium tracking-wider uppercase">
          <span className={step >= 1 ? 'text-[#141413] font-semibold' : 'text-[#A0988A]'}>
            1. Client & Delivery
          </span>
          <span className="text-[#C5A880]">·</span>
          <span className={step >= 2 ? 'text-[#141413] font-semibold' : 'text-[#A0988A]'}>
            2. Method
          </span>
          <span className="text-[#C5A880]">·</span>
          <span className={step >= 3 ? 'text-[#141413] font-semibold' : 'text-[#A0988A]'}>
            3. Payment
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: FORM SECTIONS */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* STEP 1: CLIENT & ADDRESS */}
          <div className="bg-white border border-[#E8E4DA] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <h2 className="font-serif text-xl text-[#141413] flex items-center gap-2">
                <span>1. Client Information & Delivery Address</span>
              </h2>
              <span className="text-[11px] text-[#9F7A3E] uppercase tracking-wider">
                Maison Privé Client
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Telephone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Suite / Apartment</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="France">France</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Italy">Italy</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>
          </div>

          {/* STEP 2: SHIPPING METHODS */}
          <div className="bg-white border border-[#E8E4DA] p-6 sm:p-8 space-y-4">
            <h2 className="font-serif text-xl text-[#141413] border-b border-[#F0ECE1] pb-3">
              2. White-Glove Delivery Method
            </h2>

            <div className="space-y-3">
              {/* Method 1 */}
              <label
                onClick={() => setShippingMethod('white-glove')}
                className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                  shippingMethod === 'white-glove'
                    ? 'border-[#9F7A3E] bg-[#FBF9F4]'
                    : 'border-[#E0DBD0] hover:border-[#B5AEA0]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'white-glove'}
                    onChange={() => setShippingMethod('white-glove')}
                    className="mt-1 accent-[#141413]"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#141413]">
                      Standard Insured White-Glove Delivery
                    </h4>
                    <p className="text-xs text-[#706A5F]">
                      2–4 business days · Full insurance included · Signature required
                    </p>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-wider text-[#2F6142] font-semibold">
                  Complimentary
                </span>
              </label>

              {/* Method 2 */}
              <label
                onClick={() => setShippingMethod('express')}
                className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-[#9F7A3E] bg-[#FBF9F4]'
                    : 'border-[#E0DBD0] hover:border-[#B5AEA0]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="mt-1 accent-[#141413]"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#141413]">
                      Priority Dedicated Air Courier
                    </h4>
                    <p className="text-xs text-[#706A5F]">
                      Next morning dispatch · Dedicated liaison tracker
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs tabular-nums font-semibold text-[#141413]">
                  {formatPrice(35)}
                </span>
              </label>

              {/* Method 3 */}
              <label
                onClick={() => setShippingMethod('concierge')}
                className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                  shippingMethod === 'concierge'
                    ? 'border-[#9F7A3E] bg-[#FBF9F4]'
                    : 'border-[#E0DBD0] hover:border-[#B5AEA0]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'concierge'}
                    onChange={() => setShippingMethod('concierge')}
                    className="mt-1 accent-[#141413]"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#141413]">
                      Private Chauffeur Hand Delivery
                    </h4>
                    <p className="text-xs text-[#706A5F]">
                      Available in London, Paris, Milan & NY · By personal uniformed appointment
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs tabular-nums font-semibold text-[#141413]">
                  {formatPrice(75)}
                </span>
              </label>
            </div>
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className="bg-white border border-[#E8E4DA] p-6 sm:p-8 space-y-4">
            <h2 className="font-serif text-xl text-[#141413] border-b border-[#F0ECE1] pb-3">
              3. Secure Settlement
            </h2>

            {/* Payment Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentType('card')}
                className={`p-3 border text-xs uppercase tracking-wider flex flex-col items-center gap-1.5 transition-colors ${
                  paymentType === 'card' ? 'border-[#141413] bg-[#FAF9F6] text-[#141413] font-semibold' : 'border-[#E0DBD0] text-[#706A5F]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentType('wire')}
                className={`p-3 border text-xs uppercase tracking-wider flex flex-col items-center gap-1.5 transition-colors ${
                  paymentType === 'wire' ? 'border-[#141413] bg-[#FAF9F6] text-[#141413] font-semibold' : 'border-[#E0DBD0] text-[#706A5F]'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Private Wire</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentType('cod')}
                className={`p-3 border text-xs uppercase tracking-wider flex flex-col items-center gap-1.5 transition-colors ${
                  paymentType === 'cod' ? 'border-[#141413] bg-[#FAF9F6] text-[#141413] font-semibold' : 'border-[#E0DBD0] text-[#706A5F]'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Concierge COD</span>
              </button>
            </div>

            {/* Card Inputs */}
            {paymentType === 'card' && (
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] font-mono focus:outline-none focus:border-[#9F7A3E]"
                    />
                    <Lock className="w-3.5 h-3.5 text-[#9F7A3E] absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] font-mono focus:outline-none focus:border-[#9F7A3E]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">
                      Security Code (CVC)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] font-mono focus:outline-none focus:border-[#9F7A3E]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentType === 'wire' && (
              <div className="p-4 bg-[#FAF9F6] border border-[#E8E4DA] text-xs text-[#524E46] space-y-2">
                <p>Wire transfer instructions will be transmitted via encrypted correspondence to your email upon order registration.</p>
                <p className="font-mono text-[11px] text-[#141413]">IBAN: CH93 0024 0240 1928 3491 A · Banque Privée Edmond de Rothschild</p>
              </div>
            )}

            {paymentType === 'cod' && (
              <div className="p-4 bg-[#FAF9F6] border border-[#E8E4DA] text-xs text-[#524E46] space-y-1">
                <p>Payment will be settled in person with our private courier liaison upon delivery inspection.</p>
                <p className="text-[11px] text-[#9F7A3E]">Personal identification match required upon receipt.</p>
              </div>
            )}

            {/* Gift Wrapping note */}
            <div className="pt-4 border-t border-[#F0ECE1] space-y-2">
              <label className="flex items-center gap-2 text-xs text-[#3D3A34] cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  className="accent-[#141413]"
                />
                <span className="flex items-center gap-1.5 font-medium">
                  <Gift className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Complimentary Hand-Penned Gift Card & Rigid Ivory Box</span>
                </span>
              </label>

              {giftWrapping && (
                <textarea
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Enter your personal message for the calligraphy note..."
                  className="w-full bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              )}
            </div>

          </div>

          {/* Place Order CTA */}
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-[#141413] hover:bg-[#2C2925] text-white py-4 px-6 text-xs font-semibold uppercase tracking-[0.22em] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Confirm Order & Begin Handcrafting — {formatPrice(totalAmount)}</span>
          </button>

        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="lg:col-span-5 bg-white border border-[#E8E4DA] p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
          <h3 className="font-serif text-lg text-[#141413] border-b border-[#F0ECE1] pb-3">
            Maison Order Summary
          </h3>

          {/* Items List */}
          <div className="divide-y divide-[#F0ECE1] max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-3 flex gap-3">
                <div className="w-14 h-16 shrink-0 bg-[#F7F5F0] border border-[#E0DBD0] overflow-hidden">
                  <LuxuryImage
                    src={item.product.image}
                    alt={item.product.name}
                    aspectRatioClass="h-full w-full"
                  />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex justify-between font-medium text-[#141413]">
                    <span className="font-serif">{item.product.name}</span>
                    <span className="font-mono tabular-nums">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                  <p className="text-[11px] text-[#706A5F] mt-0.5">
                    Qty: {item.quantity} · {item.selectedColor}
                  </p>
                  {item.monogram && (
                    <p className="text-[11px] text-[#9F7A3E]">Foil Monogram: "{item.monogram}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Calculations */}
          <div className="space-y-2 pt-3 border-t border-[#F0ECE1] text-xs">
            <div className="flex justify-between text-[#706A5F]">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
            </div>

            <div className="flex justify-between text-[#706A5F]">
              <span>White-Glove Delivery</span>
              <span className="font-mono tabular-nums">
                {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between text-[#706A5F]">
              <span>Estimated VAT / Duties (DDP)</span>
              <span className="font-mono tabular-nums">{formatPrice(taxAmount)}</span>
            </div>

            <div className="flex justify-between text-base font-semibold text-[#141413] pt-3 border-t border-[#E8E4DA]">
              <span>Total</span>
              <span className="font-mono tabular-nums text-lg">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          {/* Maison Discretion Guarantee */}
          <div className="p-4 bg-[#FAF9F6] border border-[#E8E4DA] space-y-2 text-[11px] text-[#706A5F]">
            <div className="flex items-center gap-2 text-[#9F7A3E] font-medium uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Certified Handcraft Guarantee</span>
            </div>
            <p className="leading-relaxed">
              Every creation is inspected by the Atelier Director before wax sealing and insured dispatch.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
