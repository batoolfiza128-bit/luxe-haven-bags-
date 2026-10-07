import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, HardwareFinish } from '../../types';
import { LuxuryImage } from './LuxuryImage';
import { X, Check, Star, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, formatPrice, navigateToProduct } = useStore();

  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Noir Intemporel');
  const [selectedHardware, setSelectedHardware] = useState<HardwareFinish>(product.hardware[0] || 'Brushed 24k Gold');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(product, selectedColor, selectedHardware, undefined, quantity);
    onClose();
  };

  const handleViewFullPage = () => {
    onClose();
    navigateToProduct(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white border border-[#E8E4DA] shadow-2xl z-10 overflow-hidden animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A7468] hover:text-[#141413] transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="aspect-[4/3] md:aspect-auto h-full bg-[#F7F5F0] overflow-hidden">
            <LuxuryImage
              src={product.image}
              alt={product.name}
              aspectRatioClass="h-full w-full"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9F7A3E] font-medium block">
                {product.categoryLabel}
              </span>
              <h2 className="font-serif text-2xl text-[#141413] mt-1 font-semibold">{product.name}</h2>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#C5A880]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#C5A880]" />
                  ))}
                </div>
                <span className="text-xs text-[#706A5F]">{product.rating}</span>
                <span className="text-xs text-[#9E978B]">·</span>
                <span className="font-mono text-sm font-semibold text-[#141413] tabular-nums">
                  {formatPrice(product.price)}
                </span>
              </div>

              <p className="text-xs text-[#524E46] leading-relaxed mt-3 font-light">
                {product.tagline}
              </p>
            </div>

            {/* Colors */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#706A5F] font-semibold block">
                Color: <span className="font-normal text-[#141413]">{selectedColor}</span>
              </span>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      selectedColor === c.name ? 'ring-2 ring-[#9F7A3E] scale-105' : 'border-[#D5CEBF]'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && <Check className="w-3 h-3 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware */}
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#706A5F] font-semibold block">
                Hardware:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.hardware.map((hw) => (
                  <button
                    key={hw}
                    onClick={() => setSelectedHardware(hw)}
                    className={`px-2.5 py-1 text-[11px] uppercase tracking-wider border ${
                      selectedHardware === hw
                        ? 'bg-[#141413] text-white border-[#141413]'
                        : 'border-[#D5CEBF] text-[#524E46]'
                    }`}
                  >
                    {hw}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#F0ECE1]">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 bg-[#141413] hover:bg-[#33302B] text-white py-2.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
                >
                  Add to Bag
                </button>
              </div>

              <button
                type="button"
                onClick={handleViewFullPage}
                className="w-full text-center text-xs uppercase tracking-wider text-[#9F7A3E] hover:text-[#141413] py-1 flex items-center justify-center gap-1 font-medium"
              >
                <span>View Full Product Specifications</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
