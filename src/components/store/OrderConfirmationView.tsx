import React from 'react';
import { useStore } from '../../context/StoreContext';
import { LuxuryImage } from '../common/LuxuryImage';
import { 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  Package, 
  Sparkles, 
  ShieldCheck,
  Clock
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { currentOrder, orders, setCurrentView, formatPrice } = useStore();

  const order = currentOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#141413]">No Order Found</h2>
        <button
          onClick={() => setCurrentView('catalog')}
          className="px-6 py-2.5 bg-[#141413] text-white text-xs uppercase tracking-widest"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Banner */}
      <div className="text-center space-y-4 border-b border-[#E8E4DA] pb-10">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#F3EFE6] border border-[#C5A880] flex items-center justify-center text-[#9F7A3E]">
          <CheckCircle2 className="w-8 h-8 stroke-1" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#9F7A3E] font-medium block">
          Order Confirmed · Registration № {order.orderNumber}
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#141413]">
          Thank You, {order.customerName}
        </h1>

        <p className="text-xs sm:text-sm text-[#6E675B] max-w-lg mx-auto font-light leading-relaxed">
          Your order has been registered at our Maison. Master artisans have been assigned to prepare, inspect, and wax-seal your creation for insured white-glove transit.
        </p>

        <div className="pt-2 flex items-center justify-center gap-4 text-xs">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#D5CEBF] text-[#2C2925] hover:border-[#141413] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">Print Receipt</span>
          </button>

          <button
            onClick={() => setCurrentView('account')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#141413] text-white hover:bg-[#33302B] transition-colors uppercase tracking-wider"
          >
            <span>View In Maison Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TRACKING PROGRESSION BAR */}
      <div className="bg-[#FAF9F6] border border-[#E8E4DA] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0ECE1] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C8476] block">
              Estimated Delivery
            </span>
            <span className="font-serif text-base text-[#141413] font-semibold">
              Expected Within 3–5 Business Days
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#8C8476] block">
              Liaison Tracking Code
            </span>
            <span className="font-mono text-xs text-[#9F7A3E] font-medium">
              {order.trackingNumber}
            </span>
          </div>
        </div>

        {/* 4-Step Journey */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="space-y-1.5 border-l-2 border-[#141413] pl-3">
            <span className="text-[10px] uppercase tracking-wider text-[#2F6142] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Step 1: Complete</span>
            </span>
            <h4 className="font-serif text-sm text-[#141413]">Order Logged</h4>
            <p className="text-[11px] text-[#706A5F]">Payment settled & verified</p>
          </div>

          <div className="space-y-1.5 border-l-2 border-[#9F7A3E] pl-3">
            <span className="text-[10px] uppercase tracking-wider text-[#9F7A3E] font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Step 2: In Progress</span>
            </span>
            <h4 className="font-serif text-sm text-[#141413]">Atelier Preparation</h4>
            <p className="text-[11px] text-[#706A5F]">Polishing & gold foil stamp</p>
          </div>

          <div className="space-y-1.5 border-l-2 border-[#D5CEBF] pl-3 opacity-60">
            <span className="text-[10px] uppercase tracking-wider text-[#8C8476]">
              Step 3
            </span>
            <h4 className="font-serif text-sm text-[#141413]">Insured Dispatch</h4>
            <p className="text-[11px] text-[#706A5F]">Customs cleared (DDP)</p>
          </div>

          <div className="space-y-1.5 border-l-2 border-[#D5CEBF] pl-3 opacity-60">
            <span className="text-[10px] uppercase tracking-wider text-[#8C8476]">
              Step 4
            </span>
            <h4 className="font-serif text-sm text-[#141413]">White-Glove Handover</h4>
            <p className="text-[11px] text-[#706A5F]">Signature verified at door</p>
          </div>
        </div>
      </div>

      {/* RECEIPT BREAKDOWN */}
      <div className="bg-white border border-[#E8E4DA] p-6 sm:p-8 space-y-6">
        <h3 className="font-serif text-xl text-[#141413] border-b border-[#F0ECE1] pb-3">
          Detailed Itemization
        </h3>

        <div className="divide-y divide-[#F0ECE1]">
          {order.items.map((item) => (
            <div key={item.id} className="py-4 flex gap-4">
              <div className="w-16 h-20 bg-[#F7F5F0] border border-[#E0DBD0] overflow-hidden shrink-0">
                <LuxuryImage
                  src={item.product.image}
                  alt={item.product.name}
                  aspectRatioClass="h-full w-full"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-[#141413]">
                    <span className="font-serif text-base">{item.product.name}</span>
                    <span className="font-mono tabular-nums text-sm">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                  <p className="text-[#706A5F] mt-0.5">
                    {item.selectedColor} · {item.selectedHardware}
                  </p>
                  {item.monogram && (
                    <p className="text-[#9F7A3E] font-medium mt-0.5">
                      Personalized 24k Gold Monogram: "{item.monogram}"
                    </p>
                  )}
                </div>

                <div className="text-[11px] text-[#8C8476]">
                  Qty: {item.quantity} × {formatPrice(item.unitPrice)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Financial calculations */}
        <div className="border-t border-[#E8E4DA] pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-[#706A5F]">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums">{formatPrice(order.subtotal)}</span>
          </div>

          <div className="flex justify-between text-[#706A5F]">
            <span>White-Glove Delivery Method ({order.shippingMethod})</span>
            <span className="font-mono tabular-nums">
              {order.shippingCost === 0 ? 'Complimentary' : formatPrice(order.shippingCost)}
            </span>
          </div>

          <div className="flex justify-between text-[#706A5F]">
            <span>Estimated VAT & Customs (Delivered Duty Paid)</span>
            <span className="font-mono tabular-nums">{formatPrice(order.tax)}</span>
          </div>

          <div className="flex justify-between text-base font-semibold text-[#141413] pt-3 border-t border-[#E8E4DA]">
            <span>Total Settled</span>
            <span className="font-mono tabular-nums text-xl">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Delivery destination & Gift notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#F0ECE1] text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#8C8476] font-semibold block">
              Recipient & Address
            </span>
            <p className="font-semibold text-[#141413]">{order.customerName}</p>
            <p className="text-[#706A5F]">{order.shippingAddress.address} {order.shippingAddress.apartment || ''}</p>
            <p className="text-[#706A5F]">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p className="text-[#706A5F]">{order.shippingAddress.country}</p>
            <p className="text-[#706A5F]">{order.shippingAddress.phone}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#8C8476] font-semibold block">
              Settlement & Packaging
            </span>
            <p className="text-[#141413] font-medium">{order.paymentMethod}</p>
            {order.giftWrapping && (
              <div className="p-3 bg-[#FAF9F6] border border-[#E8E4DA] mt-2 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#9F7A3E] font-semibold block">
                  Gift Calligraphy Card Note:
                </span>
                <p className="font-serif italic text-xs text-[#292622]">
                  "{order.giftNote || 'With warmest regards.'}"
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Return to store button */}
      <div className="text-center pt-4">
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 bg-[#141413] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#38342D] transition-colors"
        >
          Return to Maison Storefront
        </button>
      </div>

    </div>
  );
};
