import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, HardwareFinish } from '../../types';
import { LuxuryImage } from '../common/LuxuryImage';
import { 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Check, 
  Calendar,
  MessageCircle
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    navigateToProduct,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    showToast
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Noir Intemporel');
  const [selectedHardware, setSelectedHardware] = useState<HardwareFinish>(product.hardware[0] || 'Brushed 24k Gold');
  const [monogram, setMonogram] = useState<string>('');
  const [isMonogramActive, setIsMonogramActive] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  // Accordion states
  const [openSection, setOpenSection] = useState<'dimensions' | 'craft' | 'features' | 'shipping' | null>('dimensions');

  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedColor,
      selectedHardware,
      isMonogramActive && monogram.trim() ? monogram.trim().toUpperCase() : undefined,
      quantity
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Creation link copied to clipboard', 'info');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      location: 'Verified Client',
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      title: newReviewTitle.trim() || 'Exceptional craftsmanship',
      comment: newReviewComment.trim(),
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsReviewFormOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Your review has been registered with the Maison', 'gold');
  };

  // Recommended products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C8476]">
        <button onClick={() => setCurrentView('home')} className="hover:text-[#141413]">Maison</button>
        <span>/</span>
        <button onClick={() => setCurrentView('catalog')} className="hover:text-[#141413]">
          {product.categoryLabel}
        </button>
        <span>/</span>
        <span className="text-[#141413] font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* PRIMARY CONTIGUOUS PRODUCT MODULE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: MULTI-IMAGE GALLERY */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Display */}
          <div className="relative aspect-[4/3] bg-[#F7F5F0] border border-[#E8E4DA] overflow-hidden">
            <LuxuryImage
              src={activeImage}
              alt={product.name}
              aspectRatioClass="h-full w-full"
            />
            {/* Wishlist floating button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md shadow-sm text-[#141413] hover:text-[#9F7A3E] transition-colors"
              aria-label="Toggle Wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#9F7A3E] text-[#9F7A3E]' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {product.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(imgUrl)}
                className={`relative aspect-[4/3] bg-[#F7F5F0] border overflow-hidden transition-all ${
                  activeImage === imgUrl ? 'border-[#9F7A3E] ring-1 ring-[#9F7A3E]' : 'border-[#E0DBD0] opacity-75 hover:opacity-100'
                }`}
              >
                <LuxuryImage
                  src={imgUrl}
                  alt={`${product.name} view ${idx + 1}`}
                  aspectRatioClass="h-full w-full"
                />
              </button>
            ))}
          </div>

          {/* Atelier Trust Note beneath imagery */}
          <div className="p-4 bg-[#F8F6F1] border border-[#E8E4DA] flex items-center justify-between text-xs text-[#706A5F]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Reference SKU: <strong className="font-mono text-[#141413]">{product.sku}</strong></span>
            </span>
            <span className="text-[#9F7A3E] font-medium">Certified Tuscan Leatherwork</span>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTIGUOUS PURCHASE MODULE (Sticky on Desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 bg-white p-6 sm:p-8 border border-[#E8E4DA]">
          
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.22em] text-[#9F7A3E] font-medium">
                {product.categoryLabel}
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-[#8C8476] hover:text-[#141413] flex items-center gap-1"
                title="Share this creation"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#141413] mt-1">
              {product.name}
            </h1>

            <p className="text-xs text-[#6E675B] mt-1 font-light leading-relaxed">
              {product.tagline}
            </p>

            {/* Price & Rating */}
            <div className="mt-4 flex items-center justify-between border-y border-[#F0ECE1] py-3">
              <div>
                <span className="font-mono text-2xl tabular-nums font-semibold text-[#141413]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[11px] text-[#8C8476] ml-2">Delivered Duty Paid</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs text-[#524E46]">
                <div className="flex text-[#C5A880]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                  ))}
                </div>
                <span className="font-mono tabular-nums font-medium">{product.rating}</span>
                <span className="text-[#8C8476]">({reviewsList.length})</span>
              </div>
            </div>
          </div>

          {/* 1. Color Selection */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="uppercase tracking-[0.18em] text-[#706A5F] font-semibold">
                Leather Color:
              </span>
              <span className="text-[#141413] font-medium">{selectedColor}</span>
            </div>

            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(c.name);
                    if (c.image) setActiveImage(c.image);
                  }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor === c.name
                      ? 'ring-2 ring-[#9F7A3E] ring-offset-2 scale-110'
                      : 'border-[#D5CEBF] hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && <Check className="w-4 h-4 text-white drop-shadow" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Hardware Finish */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.18em] text-[#706A5F] font-semibold block">
              Hardware Plating:
            </span>
            <div className="flex flex-wrap gap-2">
              {product.hardware.map((hw) => (
                <button
                  key={hw}
                  type="button"
                  onClick={() => setSelectedHardware(hw)}
                  className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors border ${
                    selectedHardware === hw
                      ? 'bg-[#141413] text-white border-[#141413]'
                      : 'bg-[#F9F7F2] text-[#524E46] border-[#D5CEBF] hover:border-[#141413]'
                  }`}
                >
                  {hw}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Complimentary Monogramming Option */}
          <div className="border border-[#E2DDD2] bg-[#FBFBFA] p-3.5 space-y-2">
            <label className="flex items-center justify-between text-xs text-[#2B2925] cursor-pointer">
              <span className="flex items-center gap-2 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Complimentary 24k Gold Foil Monogramming</span>
              </span>
              <input
                type="checkbox"
                checked={isMonogramActive}
                onChange={(e) => setIsMonogramActive(e.target.checked)}
                className="accent-[#141413]"
              />
            </label>

            {isMonogramActive && (
              <div className="pt-2 flex items-center gap-3">
                <input
                  type="text"
                  maxLength={3}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  placeholder="E.G. G.V"
                  className="w-24 bg-white border border-[#D5CEBF] px-2 py-1 text-xs tracking-widest text-center font-mono font-semibold uppercase text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
                <span className="text-[11px] text-[#7C7568]">
                  Up to 3 initials applied by atelier master stamp
                </span>
              </div>
            )}
          </div>

          {/* 4. Quantity & Buy Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#D5CEBF] bg-[#FBFBFA]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs text-[#524E46] hover:bg-[#F2EFE8]"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono tabular-nums font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs text-[#524E46] hover:bg-[#F2EFE8]"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-[#141413] hover:bg-[#2C2925] text-white py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.22em] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Add to Maison Bag</span>
                <span>—</span>
                <span className="font-mono tabular-nums">{formatPrice(product.price * quantity)}</span>
              </button>
            </div>

            {/* In-store appointment action */}
            <button
              type="button"
              onClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full border border-[#B3ABA0] hover:border-[#141413] text-[#2C2925] hover:text-[#141413] py-2.5 text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#9F7A3E]" />
              <span>Reserve In-Store Salon Viewing</span>
            </button>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F0ECE1] text-[11px] text-[#706A5F]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>Complimentary insured shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>Lifetime Maison Spa service</span>
            </div>
          </div>

        </div>
      </div>

      {/* ACCORDION SPECIFICATIONS & CRAFTSMANSHIP TABS */}
      <div className="border-t border-[#E8E4DA] pt-12">
        <h2 className="font-serif text-2xl text-[#141413] mb-6">Maison Specifications & Details</h2>
        
        <div className="divide-y divide-[#E8E4DA] border-y border-[#E8E4DA] bg-white">
          
          {/* 1. Dimensions */}
          <div>
            <button
              onClick={() => setOpenSection(openSection === 'dimensions' ? null : 'dimensions')}
              className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-[#F9F7F2] transition-colors"
            >
              <span className="font-serif text-lg text-[#141413]">Dimensions & Fit Capacity</span>
              {openSection === 'dimensions' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'dimensions' && (
              <div className="px-6 pb-6 pt-2 text-xs text-[#524E46] space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F8F6F1] p-4 border border-[#E8E4DA]">
                  <div>
                    <span className="uppercase text-[10px] tracking-wider text-[#8C8476] block">Height</span>
                    <span className="font-mono text-sm text-[#141413]">{product.dimensions.height}</span>
                  </div>
                  <div>
                    <span className="uppercase text-[10px] tracking-wider text-[#8C8476] block">Width</span>
                    <span className="font-mono text-sm text-[#141413]">{product.dimensions.width}</span>
                  </div>
                  <div>
                    <span className="uppercase text-[10px] tracking-wider text-[#8C8476] block">Depth</span>
                    <span className="font-mono text-sm text-[#141413]">{product.dimensions.depth}</span>
                  </div>
                  <div>
                    <span className="uppercase text-[10px] tracking-wider text-[#8C8476] block">Strap Drop</span>
                    <span className="font-mono text-sm text-[#141413]">{product.dimensions.strapDrop}</span>
                  </div>
                </div>
                <p className="leading-relaxed">
                  Total empty weight: <strong className="font-mono">{product.dimensions.weight}</strong>. Calibrated to distribute weight ergonomically across the shoulder or in hand.
                </p>
              </div>
            )}
          </div>

          {/* 2. Craftsmanship */}
          <div>
            <button
              onClick={() => setOpenSection(openSection === 'craft' ? null : 'craft')}
              className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-[#F9F7F2] transition-colors"
            >
              <span className="font-serif text-lg text-[#141413]">Atelier Craftsmanship & Sourcing</span>
              {openSection === 'craft' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'craft' && (
              <div className="px-6 pb-6 pt-2 text-xs text-[#524E46] space-y-3">
                <p className="leading-relaxed text-[#2B2925]">{product.description}</p>
                <ul className="space-y-2 list-disc list-inside text-[#524E46]">
                  {product.craftsmanshipNotes.map((note, idx) => (
                    <li key={idx} className="leading-relaxed">{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 3. Features */}
          <div>
            <button
              onClick={() => setOpenSection(openSection === 'features' ? null : 'features')}
              className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-[#F9F7F2] transition-colors"
            >
              <span className="font-serif text-lg text-[#141413]">Interior Architecture & Storage</span>
              {openSection === 'features' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'features' && (
              <div className="px-6 pb-6 pt-2 text-xs text-[#524E46] space-y-2">
                <ul className="space-y-2 list-disc list-inside text-[#524E46]">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="leading-relaxed">{feat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 4. Shipping & Guarantee */}
          <div>
            <button
              onClick={() => setOpenSection(openSection === 'shipping' ? null : 'shipping')}
              className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-[#F9F7F2] transition-colors"
            >
              <span className="font-serif text-lg text-[#141413]">White-Glove Delivery & Returns</span>
              {openSection === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openSection === 'shipping' && (
              <div className="px-6 pb-6 pt-2 text-xs text-[#524E46] space-y-3 leading-relaxed">
                <p>
                  Orders over $500 receive complimentary insured international courier transit. Hand-delivered in a museum-grade rigid storage box with ribbon and dust cover.
                </p>
                <p>
                  Unpersonalized creations may be returned within 30 days of receipt in original, pristine unworn condition with security seals intact.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* CLIENT REVIEWS SECTION */}
      <div className="border-t border-[#E8E4DA] pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#141413]">
              Client Appraisals ({reviewsList.length})
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-[#C5A880]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A880]" />
                ))}
              </div>
              <span className="text-xs text-[#524E46]">4.95 out of 5 based on verified salon purchases</span>
            </div>
          </div>

          <button
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
            className="px-5 py-2.5 border border-[#141413] text-[#141413] text-xs uppercase tracking-wider hover:bg-[#141413] hover:text-white transition-colors"
          >
            {isReviewFormOpen ? 'Close Form' : 'Write Client Review'}
          </button>
        </div>

        {/* Review Submission Form */}
        {isReviewFormOpen && (
          <form onSubmit={handleAddReview} className="bg-[#F8F6F1] border border-[#E8E4DA] p-6 space-y-4 max-w-2xl">
            <h3 className="font-serif text-lg text-[#141413]">Submit Your Appraisal</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Victoria Sterling"
                  className="w-full bg-white border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full bg-white border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
                >
                  <option value={5}>5 Stars — Exquisite Masterpiece</option>
                  <option value={4}>4 Stars — Very High Craftsmanship</option>
                  <option value={3}>3 Stars — Satisfactory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Review Title</label>
              <input
                type="text"
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                placeholder="e.g. Peerless leather aroma and gold lock"
                className="w-full bg-white border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#706A5F] block mb-1">Your Impressions</label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Share your experience with the leather touch, hardware feel, and styling..."
                className="w-full bg-white border border-[#D5CEBF] px-3 py-2 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-[#141413] text-white text-xs uppercase tracking-widest hover:bg-[#33302B] transition-colors"
            >
              Post Review
            </button>
          </form>
        )}

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-white border border-[#E8E4DA] p-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base text-[#141413] font-semibold">{rev.author}</span>
                  <span className="text-[11px] text-[#706A5F]">({rev.location})</span>
                  {rev.verified && (
                    <span className="text-[10px] uppercase tracking-wider text-[#9F7A3E] bg-[#F7F5EE] px-1.5 py-0.5 border border-[#E2DDD2]">
                      Verified Purchaser
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#8C8476] font-mono">{rev.date}</span>
              </div>

              <div className="flex text-[#C5A880]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                ))}
              </div>

              <h4 className="font-serif text-sm font-medium text-[#141413] pt-1">{rev.title}</h4>
              <p className="text-xs text-[#524E46] leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CURATED PAIRINGS / RELATED PRODUCTS */}
      <div className="border-t border-[#E8E4DA] pt-12 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#9F7A3E] font-medium block">
            Curated Ensemble
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#141413] mt-1">
            You May Also Admire
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => navigateToProduct(rel.id)}
              className="group cursor-pointer bg-white border border-[#E8E4DA] hover:border-[#C5A880] transition-all p-4 space-y-3"
            >
              <div className="aspect-[4/3] bg-[#F7F5F0] overflow-hidden">
                <LuxuryImage
                  src={rel.image}
                  alt={rel.name}
                  aspectRatioClass="h-full w-full"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C8476]">{rel.categoryLabel}</span>
                <h3 className="font-serif text-base text-[#141413] group-hover:text-[#9F7A3E] transition-colors font-semibold">
                  {rel.name}
                </h3>
                <span className="font-mono text-xs tabular-nums text-[#141413] font-medium block mt-1">
                  {formatPrice(rel.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
