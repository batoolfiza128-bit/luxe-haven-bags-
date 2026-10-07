import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { LuxuryImage } from '../common/LuxuryImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    formatPrice,
    setCurrentView
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUXE10' || promoCode.trim().toUpperCase() === 'HAVEN10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else {
      alert('Valid invitation codes: LUXE10 or HAVEN10');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finalTotal = Math.max(0, cartSubtotal - promoDiscount);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBFBFA] border-l border-[#E2DDD2] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E4DA] flex items-center justify-between bg-[#F8F6F0]">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg tracking-[0.14em] uppercase text-[#141413]">
                Your Maison Bag
              </h2>
              <span className="text-xs text-[#7A7468]">
                ({cart.reduce((s, i) => s + i.quantity, 0)} {cart.length === 1 ? 'creation' : 'creations'})
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#6E685C] hover:text-[#141413] transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EBE6DB]">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EFECE3] flex items-center justify-center text-[#8C8476]">
                  <Gift className="w-7 h-7 stroke-1" />
                </div>
                <h3 className="font-serif text-xl text-[#2B2925]">Your bag is currently empty</h3>
                <p className="text-xs text-[#787163] max-w-xs mx-auto leading-relaxed">
                  Explore our handcrafted leather collections and discover an enduring heirloom for your wardrobe.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('catalog');
                  }}
                  className="mt-4 inline-block px-6 py-2.5 bg-[#141413] text-white text-xs uppercase tracking-widest hover:bg-[#38342D] transition-colors"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 shrink-0 bg-[#F3F0EA] border border-[#E0DBD0] overflow-hidden">
                    <LuxuryImage
                      src={item.product.image}
                      alt={item.product.name}
                      aspectRatioClass="h-full w-full"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-semibold text-[#141413] tracking-wide">
                          {item.product.name}
                        </h4>
                        <span className="font-mono text-xs tabular-nums font-semibold text-[#141413]">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                      
                      {/* Selected Options */}
                      <div className="mt-1 text-[11px] text-[#706A5F] space-y-0.5">
                        <p>{item.selectedColor} · {item.selectedHardware}</p>
                        {item.monogram && (
                          <p className="text-[#9F7A3E] font-medium">
                            Personalized Foil: "{item.monogram}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#D5CEBF] bg-white">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#524E46] hover:bg-[#F2EFE8] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono tabular-nums text-[#141413]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#524E46] hover:bg-[#F2EFE8] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-[#8C8476] hover:text-[#B22222] transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {cart.length > 0 && (
            <div className="border-t border-[#E8E4DA] bg-[#F8F6F0] p-6 space-y-4">
              
              {/* Gift wrapping option */}
              <label className="flex items-center gap-2.5 text-xs text-[#524E46] cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="rounded border-[#C5A880] text-[#141413] focus:ring-0"
                />
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Complimentary Maison Gift Packaging & Satin Ribbon</span>
                </span>
              </label>

              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Privilege Code (try LUXE10)"
                  className="flex-1 bg-white border border-[#D5CEBF] px-3 py-1.5 text-xs text-[#141413] focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs uppercase tracking-wider bg-[#262421] text-white hover:bg-[#141413] transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-1 border-t border-[#E8E4DA]">
                <div className="flex justify-between text-[#706A5F]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
                </div>
                
                {promoApplied && (
                  <div className="flex justify-between text-[#9F7A3E]">
                    <span>Privilege Courtesy (10%)</span>
                    <span className="font-mono tabular-nums">-{formatPrice(promoDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#706A5F]">
                  <span>Insured White-Glove Courier</span>
                  <span className="text-[#2F6142] uppercase text-[10px] tracking-wider font-medium">Complimentary</span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-[#141413] pt-2 border-t border-[#E8E4DA]">
                  <span>Total</span>
                  <span className="font-mono tabular-nums text-base">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full bg-[#141413] hover:bg-[#2C2925] text-white py-3 px-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C8476] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Delivered Duty Paid (DDP) · Insured Transit</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
