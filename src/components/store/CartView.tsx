import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { LuxuryImage } from '../common/LuxuryImage';
import { Trash2, ArrowRight, Gift, ShieldCheck, ShoppingBag } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    formatPrice,
    setCurrentView
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [giftWrapping, setGiftWrapping] = useState(true);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUXE10' || promoCode.trim().toUpperCase() === 'HAVEN10') {
      setPromoDiscount(Math.round(cartSubtotal * 0.1));
    } else {
      alert('Valid privileges: LUXE10 or HAVEN10');
    }
  };

  const finalTotal = Math.max(0, cartSubtotal - promoDiscount);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#EFECE3] flex items-center justify-center text-[#8C8476]">
          <ShoppingBag className="w-7 h-7 stroke-1" />
        </div>
        <h2 className="font-serif text-3xl text-[#141413]">Your Maison Bag is Empty</h2>
        <p className="text-xs text-[#706A5F] max-w-sm mx-auto leading-relaxed">
          Discover our permanent collection of handcrafted French box calfskin and Tuscan vegetable-tanned leather silhouettes.
        </p>
        <button
          onClick={() => setCurrentView('catalog')}
          className="px-8 py-3.5 bg-[#141413] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#38342D]"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-[#E8E4DA] pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#141413]">
          Your Maison Bag
        </h1>
        <p className="text-xs text-[#706A5F] mt-1 font-light">
          {cart.reduce((s, i) => s + i.quantity, 0)} {cart.length === 1 ? 'creation' : 'creations'} registered for checkout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 bg-white border border-[#E8E4DA] divide-y divide-[#EBE6DB]">
          {cart.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
              <div className="w-24 h-28 bg-[#F7F5F0] border border-[#E0DBD0] overflow-hidden shrink-0">
                <LuxuryImage
                  src={item.product.image}
                  alt={item.product.name}
                  aspectRatioClass="h-full w-full"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#9F7A3E] font-medium block">
                      {item.product.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-[#141413]">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#706A5F] mt-0.5">
                      {item.selectedColor} · {item.selectedHardware}
                    </p>
                    {item.monogram && (
                      <p className="text-xs text-[#9F7A3E] font-medium mt-0.5">
                        Personalized Monogram Foil: "{item.monogram}"
                      </p>
                    )}
                  </div>

                  <span className="font-mono text-base font-semibold tabular-nums text-[#141413]">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F5F2EB]">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#D5CEBF] bg-[#FBFBFA]">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-xs text-[#524E46] hover:bg-[#F2EFE8]"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono tabular-nums font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-xs text-[#524E46] hover:bg-[#F2EFE8]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-[#8C8476] hover:text-[#B22222] flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 bg-white border border-[#E8E4DA] p-6 space-y-6 lg:sticky lg:top-28">
          <h3 className="font-serif text-lg text-[#141413] border-b border-[#F0ECE1] pb-3">
            Summary
          </h3>

          {/* Promo code */}
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Invitation code (LUXE10)"
              className="flex-1 bg-[#FAF9F6] border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413]"
            />
            <button
              type="submit"
              className="bg-[#141413] text-white px-3 py-2 text-xs uppercase tracking-wider"
            >
              Apply
            </button>
          </form>

          {/* Pricing calculations */}
          <div className="space-y-2 text-xs border-t border-[#F0ECE1] pt-3">
            <div className="flex justify-between text-[#706A5F]">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
            </div>

            {promoDiscount > 0 && (
              <div className="flex justify-between text-[#9F7A3E]">
                <span>Privilege Courtesy (10%)</span>
                <span className="font-mono tabular-nums">-{formatPrice(promoDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#706A5F]">
              <span>White-Glove Insured Delivery</span>
              <span className="text-[#2F6142] uppercase text-[10px] tracking-wider font-semibold">Complimentary</span>
            </div>

            <div className="flex justify-between text-base font-semibold text-[#141413] pt-3 border-t border-[#E8E4DA]">
              <span>Estimated Total</span>
              <span className="font-mono tabular-nums text-lg">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full bg-[#141413] hover:bg-[#2C2925] text-white py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C8476] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Delivered Duty Paid · Insured Transit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
