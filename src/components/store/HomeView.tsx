import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { LuxuryImage } from '../common/LuxuryImage';
import { PRESS_CITATIONS } from '../../data/mockData';
import { 
  ArrowRight, 
  Heart, 
  Eye, 
  Sparkles, 
  Shield, 
  Feather,
  Compass
} from 'lucide-react';

interface HomeViewProps {
  onQuickView: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onQuickView }) => {
  const { 
    products, 
    setCurrentView, 
    setSelectedCategory, 
    navigateToProduct, 
    formatPrice, 
    toggleWishlist, 
    isInWishlist,
    addToCart
  } = useStore();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const featuredProducts = products.filter((p) => p.featured);
  const displayProducts = activeCategoryFilter === 'all' 
    ? featuredProducts 
    : products.filter((p) => p.category === activeCategoryFilter);

  const heroProduct = products[0];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO CAMPAIGN SECTION */}
      <section className="relative bg-[#141413] text-[#F9F7F2] overflow-hidden">
        {/* Subtle warm architectural lighting gradient */}
        <div className="absolute inset-0 bg-radial-at-t from-[#26211A] via-[#141413] to-[#0A0A09] opacity-80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#C5A880]">
                <span>Autumn / Winter Salon Collection</span>
                <span className="text-[#8C7A5E]">·</span>
                <span>Tuscan Atelier</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F9F7F2] leading-[1.12] tracking-tight max-w-2xl">
                The Architecture of Quiet Luxury
              </h1>

              <p className="text-[#B3ABA0] text-sm sm:text-base leading-relaxed max-w-xl font-light">
                Sculpted from the finest French box calfskin and slow-cured vegetable-tanned Italian hides. Precision-milled 24k gold-plated brass closures hand-finished for generational durability.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 bg-[#C5A880] text-[#141413] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#D4AF37] transition-all duration-200 flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 border border-[#4D473E] text-[#E8E2D5] text-xs font-medium tracking-[0.2em] uppercase hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  Atelier Heritage
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#292621] text-left">
                <div>
                  <span className="font-serif text-xl sm:text-2xl text-[#EAE4D7] block">18 Hours</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A8275]">Artisan Hand-Stitch Time</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl text-[#EAE4D7] block">24-Karat</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A8275]">Gold-Plated Hardware</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl text-[#EAE4D7] block">Lifetime</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A8275]">Maison Reconditioning</span>
                </div>
              </div>
            </div>

            {/* Visual Showcase column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none group cursor-pointer" onClick={() => navigateToProduct(heroProduct.id)}>
                {/* Decorative border frame */}
                <div className="absolute -inset-2 border border-[#C5A880]/30 rounded-none pointer-events-none" />
                
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1E1C1A]">
                  <LuxuryImage
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    aspectRatioClass="h-full w-full"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Overlay Product Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#141413]/90 backdrop-blur-md border border-[#3A352C] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] block">Featured Icon</span>
                      <h3 className="font-serif text-base text-[#F5F2EA]">{heroProduct.name}</h3>
                      <span className="font-mono text-xs text-[#E8E2D5] tabular-nums">{formatPrice(heroProduct.price)}</span>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-[#C5A880] border-b border-[#C5A880] pb-0.5">
                      Inspect
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORY SPOTLIGHT TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.24em] text-[#9F7A3E] font-medium">
            Curated Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#141413]">
            Exquisite Forms for Every Occasion
          </h2>
          <p className="text-xs sm:text-sm text-[#6E675B] leading-relaxed">
            From architectural work totes to jewel-like evening minaudières, crafted without compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Crossbody */}
          <div
            onClick={() => {
              setSelectedCategory('crossbody');
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative cursor-pointer overflow-hidden bg-[#F3F0EA] border border-[#E4DFD4] transition-all hover:border-[#C5A880]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <LuxuryImage
                src={products[0]?.image}
                alt="Crossbody & Satchels"
                aspectRatioClass="h-full w-full"
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] block">Signature</span>
              <h3 className="font-serif text-xl tracking-wide">Crossbody & Satchels</h3>
              <p className="text-xs text-stone-300">Fluid hands-free balance</p>
            </div>
          </div>

          {/* Card 2: Totes */}
          <div
            onClick={() => {
              setSelectedCategory('totes');
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative cursor-pointer overflow-hidden bg-[#F3F0EA] border border-[#E4DFD4] transition-all hover:border-[#C5A880]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <LuxuryImage
                src={products[1]?.image}
                alt="Structured Totes"
                aspectRatioClass="h-full w-full"
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] block">Architectural</span>
              <h3 className="font-serif text-xl tracking-wide">Structured Totes</h3>
              <p className="text-xs text-stone-300">Executive proportions</p>
            </div>
          </div>

          {/* Card 3: Clutches */}
          <div
            onClick={() => {
              setSelectedCategory('clutches');
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative cursor-pointer overflow-hidden bg-[#F3F0EA] border border-[#E4DFD4] transition-all hover:border-[#C5A880]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <LuxuryImage
                src={products[2]?.image}
                alt="Evening Minaudières"
                aspectRatioClass="h-full w-full"
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] block">Soirée</span>
              <h3 className="font-serif text-xl tracking-wide">Evening Minaudières</h3>
              <p className="text-xs text-stone-300">Jewelry-like vermeil clasps</p>
            </div>
          </div>

          {/* Card 4: Small Leather */}
          <div
            onClick={() => {
              setSelectedCategory('wallets');
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative cursor-pointer overflow-hidden bg-[#F3F0EA] border border-[#E4DFD4] transition-all hover:border-[#C5A880]"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <LuxuryImage
                src={products[4]?.image}
                alt="Small Leather Goods"
                aspectRatioClass="h-full w-full"
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] block">Refined Essentials</span>
              <h3 className="font-serif text-xl tracking-wide">Small Leather Goods</h3>
              <p className="text-xs text-stone-300">Skived accordion organizers</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SIGNATURE CREATIONS / FEATURED CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E8E4DA] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[#9F7A3E] font-medium block mb-1">
              Permanent Collection
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#141413]">
              Signature Creations
            </h2>
          </div>

          {/* Filter Tabs (Interactive filter control allowed) */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'crossbody', label: 'Crossbody' },
              { id: 'totes', label: 'Totes' },
              { id: 'clutches', label: 'Evening' },
              { id: 'travel', label: 'Travel' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id)}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors rounded-none ${
                  activeCategoryFilter === tab.id
                    ? 'bg-[#141413] text-white'
                    : 'bg-[#F1EFEA] text-[#635E54] hover:text-[#141413] hover:bg-[#E5E1D5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Desktop Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product) => {
            const inWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-white border border-[#E8E4DA] hover:border-[#C5A880] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] bg-[#F7F5F0] overflow-hidden cursor-pointer" onClick={() => navigateToProduct(product.id)}>
                  <LuxuryImage
                    src={product.image}
                    alt={product.name}
                    aspectRatioClass="h-full w-full"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Actions overlay */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="p-2 bg-white/90 backdrop-blur-sm text-[#141413] hover:text-[#9F7A3E] transition-colors shadow-sm"
                      aria-label="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${inWish ? 'fill-[#9F7A3E] text-[#9F7A3E]' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="p-2 bg-white/90 backdrop-blur-sm text-[#141413] hover:text-[#9F7A3E] transition-colors shadow-sm"
                      aria-label="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Stock or Edition Badge (clean unboxed tag) */}
                  {product.stock <= 5 && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#141413]/85 text-[#E8E2D5] text-[10px] tracking-wider uppercase backdrop-blur-sm">
                      Limited Edition ({product.stock} available)
                    </div>
                  )}
                </div>

                {/* Card Content & Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Unboxed metadata separator */}
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#7C7568]">
                      <span>{product.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.leather.split(' ')[0]}</span>
                    </div>

                    <h3
                      onClick={() => navigateToProduct(product.id)}
                      className="font-serif text-lg text-[#141413] hover:text-[#9F7A3E] transition-colors cursor-pointer mt-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#6E675B] line-clamp-2 mt-1 font-light leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm tabular-nums font-semibold text-[#141413]">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product, product.colors[0].name, product.hardware[0])}
                      className="text-xs uppercase tracking-wider text-[#141413] hover:text-[#9F7A3E] border-b border-[#141413] hover:border-[#9F7A3E] pb-0.5 transition-colors font-medium"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#141413] text-[#141413] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#141413] hover:text-white transition-all duration-200"
          >
            <span>View Full Maison Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. ATELIER & HERITAGE SPOTLIGHT */}
      <section className="bg-[#F4F1EA] border-y border-[#E2DDD2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Atelier collage */}
            <div className="relative aspect-[4/3] bg-[#E8E2D5] border border-[#D5CEBF] overflow-hidden">
              <LuxuryImage
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85"
                alt="Artisan at work in Tuscan Atelier"
                aspectRatioClass="h-full w-full"
                fallbackTitle="Tuscan Atelier Craft"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-4 max-w-xs border border-[#E5E0D5]">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#9F7A3E] block">Workshop Registry</span>
                <p className="font-serif text-sm text-[#141413]">
                  Florence Atelier № 4 · Santa Croce sull’Arno
                </p>
                <p className="text-[11px] text-[#706A5F] mt-0.5">Vegetable-tanned certified Tuscan hides</p>
              </div>
            </div>

            {/* Story text */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.24em] text-[#9F7A3E] font-medium block">
                The Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#141413] leading-snug">
                Saddle-Stitched by Hand. Conceived to Endure Generations.
              </h2>
              <p className="text-xs sm:text-sm text-[#5C564B] leading-relaxed">
                Modern luxury has largely surrendered to synthetic fillers and industrial mass-stamping. Luxe Haven preserves the uncompromising standards of classical French and Italian maroquinerie.
              </p>

              {/* 3 Pillars */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EAE5D9] flex items-center justify-center shrink-0 text-[#9F7A3E]">
                    <Feather className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#141413]">Natural Vegetable Tannins</h4>
                    <p className="text-xs text-[#706A5F]">Treated with chestnut and bark extracts, developing a rich, unique patina over decades.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EAE5D9] flex items-center justify-center shrink-0 text-[#9F7A3E]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#141413]">Solid 24k Gold-Plated Brass</h4>
                    <p className="text-xs text-[#706A5F]">Custom-machined architectural hardware with protective scratch-resistant ceramic coating.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EAE5D9] flex items-center justify-center shrink-0 text-[#9F7A3E]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#141413]">Complimentary Lifetime Maison Spa</h4>
                    <p className="text-xs text-[#706A5F]">Every bag is registered for lifetime complimentary leather nourishing and edge re-burnishing.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-[#141413] hover:text-[#9F7A3E] border-b border-[#141413] hover:border-[#9F7A3E] pb-1 transition-colors"
                >
                  Read The Atelier Chronicle
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRESS & CRITICAL ACCLAIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.24em] text-[#9F7A3E] font-medium">
            Critical Reception
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#141413] mt-1">
            As Recognized by Leading Publications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRESS_CITATIONS.map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E8E4DA] p-8 flex flex-col justify-between space-y-6">
              <p className="font-serif italic text-base sm:text-lg text-[#2A2723] leading-relaxed">
                "{item.quote}"
              </p>
              <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
                <span className="font-serif text-base font-semibold text-[#141413] tracking-wide">
                  {item.source}
                </span>
                <span className="text-[#878073]">{item.season}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BESPOKE SALON & CONCIERGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1B19] text-[#F9F7F2] p-8 sm:p-14 border border-[#332F28] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C5A880]">
              Private Appointments & Styling
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
              Experience Luxe Haven at Our Salons Privés
            </h3>
            <p className="text-xs sm:text-sm text-[#AFA79B] leading-relaxed">
              Book a personal consultation with a Maison stylist in Paris, Milan, or New York, or schedule a secure private digital viewing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#C5A880] text-[#141413] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-colors"
            >
              Book Salon Appointment
            </button>
            <button
              onClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 border border-[#524B40] text-[#E8E2D5] text-xs font-medium uppercase tracking-[0.2em] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
            >
              Contact Concierge
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
