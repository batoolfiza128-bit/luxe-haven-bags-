import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, CategoryType } from '../../types';
import { LuxuryImage } from '../common/LuxuryImage';
import { 
  Heart, 
  Eye, 
  SlidersHorizontal, 
  X, 
  LayoutGrid, 
  Grid2X2,
  Check
} from 'lucide-react';

interface CatalogViewProps {
  onQuickView: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ onQuickView }) => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    navigateToProduct,
    formatPrice,
    toggleWishlist,
    isInWishlist,
    addToCart,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [selectedLeather, setSelectedLeather] = useState<string>('all');
  const [selectedHardware, setSelectedHardware] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(4000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<2 | 3>(3);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Available unique attributes
  const leathers = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.leather));
    return Array.from(set);
  }, [products]);

  const hardwares = ['Brushed 24k Gold', 'Polished Palladium', 'Champagne Brass', 'Rose Vermeil'];

  const colors = [
    { name: 'Noir Intemporel', hex: '#141414' },
    { name: 'Crème de Lait', hex: '#F0ECE1' },
    { name: 'Cognac Toscano', hex: '#8B4D2B' },
    { name: 'Vert Émeraude', hex: '#1E382B' },
    { name: 'Bordeaux Impérial', hex: '#581825' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.leather.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q);
        if (!match) return false;
      }
      // Leather
      if (selectedLeather !== 'all' && p.leather !== selectedLeather) return false;
      // Hardware
      if (selectedHardware !== 'all' && !p.hardware.includes(selectedHardware as any)) return false;
      // Color
      if (selectedColor !== 'all' && !p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) return false;
      // Price
      if (p.price > priceMax) return false;
      // Stock
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, selectedLeather, selectedHardware, selectedColor, priceMax, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLeather('all');
    setSelectedHardware('all');
    setSelectedColor('all');
    setPriceMax(4000);
    setInStockOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedLeather !== 'all' || 
    selectedHardware !== 'all' || 
    selectedColor !== 'all' || 
    priceMax < 4000 || 
    inStockOnly || 
    Boolean(searchQuery);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Breadcrumb */}
      <div className="border-b border-[#E8E4DA] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C8476]">
          <span>Maison Collection</span>
          <span>/</span>
          <span className="text-[#141413] font-medium">
            {selectedCategory === 'all' ? 'All Handbags & Leather Goods' : selectedCategory}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#141413]">
              The Haute Maroquinerie Catalog
            </h1>
            <p className="text-xs sm:text-sm text-[#6E675B] mt-1 font-light">
              Showing {filteredProducts.length} handcrafted creations
            </p>
          </div>

          {/* Search bar tag indicator if active */}
          {searchQuery && (
            <div className="flex items-center gap-2 bg-[#F1EFEA] px-3 py-1.5 text-xs text-[#524E46]">
              <span>Search query: "{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="hover:text-black">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Pills Bar (Allowed as interactive filter tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EFECE5]">
        {[
          { id: 'all', label: 'All Silhouettes' },
          { id: 'crossbody', label: 'Crossbody & Satchels' },
          { id: 'totes', label: 'Structured Totes' },
          { id: 'clutches', label: 'Evening Minaudières' },
          { id: 'wallets', label: 'Small Leather Goods' },
          { id: 'travel', label: 'Travel & Weekend' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as CategoryType)}
            className={`px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap transition-colors rounded-none ${
              selectedCategory === cat.id
                ? 'bg-[#141413] text-white'
                : 'bg-[#F4F1EA] text-[#635E54] hover:bg-[#EAE5D8] hover:text-[#141413]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Controls Bar: Filter Toggle, Sort, Grid View */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[#E8E4DA] text-xs">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className={`flex items-center gap-2 px-3 py-2 border transition-colors ${
              hasActiveFilters ? 'border-[#9F7A3E] text-[#9F7A3E]' : 'border-[#D5CEBF] text-[#2E2B27] hover:border-[#141413]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">Refine Filters</span>
            {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-[#9F7A3E]" />}
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[#8C8476] hover:text-[#141413] uppercase tracking-wider underline underline-offset-2"
            >
              Reset All
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[#8C8476] uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border border-[#D5CEBF] py-1.5 px-3 text-xs text-[#141413] focus:outline-none focus:border-[#9F7A3E]"
            >
              <option value="featured">Maison Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Acclaim</option>
            </select>
          </div>

          {/* Grid View toggle */}
          <div className="hidden sm:flex items-center border border-[#D5CEBF]">
            <button
              type="button"
              onClick={() => setGridCols(2)}
              className={`p-1.5 ${gridCols === 2 ? 'bg-[#141413] text-white' : 'text-[#706A5F] hover:text-[#141413]'}`}
              title="2 Columns (Editorial Detail)"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setGridCols(3)}
              className={`p-1.5 ${gridCols === 3 ? 'bg-[#141413] text-white' : 'text-[#706A5F] hover:text-[#141413]'}`}
              title="3 Columns (Catalog Grid)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FILTER DRAWER / ACCORDION */}
      {isFilterDrawerOpen && (
        <div className="bg-[#F8F6F1] border border-[#E0DBD0] p-6 grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeIn">
          {/* 1. Leather Material */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.18em] text-[#9F7A3E] font-semibold block">
              Leather Sourcing
            </label>
            <div className="space-y-1 text-xs text-[#524E46]">
              <button
                onClick={() => setSelectedLeather('all')}
                className={`block text-left w-full py-1 ${selectedLeather === 'all' ? 'font-semibold text-[#141413]' : 'hover:text-[#141413]'}`}
              >
                All Hides
              </button>
              {leathers.map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLeather(l)}
                  className={`block text-left w-full py-1 ${selectedLeather === l ? 'font-semibold text-[#141413]' : 'hover:text-[#141413]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Hardware Finish */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.18em] text-[#9F7A3E] font-semibold block">
              Hardware Plating
            </label>
            <div className="space-y-1 text-xs text-[#524E46]">
              <button
                onClick={() => setSelectedHardware('all')}
                className={`block text-left w-full py-1 ${selectedHardware === 'all' ? 'font-semibold text-[#141413]' : 'hover:text-[#141413]'}`}
              >
                All Finishes
              </button>
              {hardwares.map((hw) => (
                <button
                  key={hw}
                  onClick={() => setSelectedHardware(hw)}
                  className={`block text-left w-full py-1 ${selectedHardware === hw ? 'font-semibold text-[#141413]' : 'hover:text-[#141413]'}`}
                >
                  {hw}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Color Swatch */}
          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-[0.18em] text-[#9F7A3E] font-semibold block">
              Color Tone
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setSelectedColor('all')}
                className={`px-2 py-1 text-[11px] border ${selectedColor === 'all' ? 'border-[#141413] bg-white font-medium' : 'border-transparent text-[#666]'}`}
              >
                All
              </button>
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-transform ${
                    selectedColor === c.name ? 'ring-2 ring-[#9F7A3E] scale-110' : 'border-[#C5A880]/30 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColor === c.name && <Check className="w-3 h-3 text-white drop-shadow" />}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Price & In Stock */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-[#524E46] mb-1">
                <span className="uppercase tracking-wider">Max Price</span>
                <span className="font-mono tabular-nums font-semibold text-[#141413]">{formatPrice(priceMax)}</span>
              </div>
              <input
                type="range"
                min="300"
                max="4000"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#141413] cursor-pointer"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-[#44403C] cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#141413]"
              />
              <span>In-Stock Creations Only</span>
            </label>
          </div>
        </div>
      )}

      {/* PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center space-y-4 bg-white border border-[#E8E4DA] p-8">
          <p className="font-serif text-2xl text-[#292622]">No matching creations found</p>
          <p className="text-xs text-[#706A5F] max-w-sm mx-auto">
            Try adjusting your refinement filters or resetting the catalog to view all available pieces.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#141413] text-white text-xs uppercase tracking-widest hover:bg-[#38342D] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-8 ${
            gridCols === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredProducts.map((product) => {
            const inWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-white border border-[#E8E4DA] hover:border-[#C5A880] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Media Container */}
                <div
                  className="relative aspect-[4/3] bg-[#F7F5F0] overflow-hidden cursor-pointer"
                  onClick={() => navigateToProduct(product.id)}
                >
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

                  {/* Stock notice */}
                  {product.stock <= 4 && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#141413]/85 text-[#E8E2D5] text-[10px] tracking-wider uppercase backdrop-blur-sm">
                      Only {product.stock} left in atelier
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
                      className="font-serif text-lg text-[#141413] hover:text-[#9F7A3E] transition-colors cursor-pointer mt-1 font-semibold"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#6E675B] line-clamp-2 mt-1 font-light leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Color options preview */}
                    <div className="flex items-center gap-1.5 pt-2">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-2.5 h-2.5 rounded-full border border-[#D5CEBF]"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                      <span className="text-[10px] text-[#8C8476] ml-1">
                        {product.colors.length} shades
                      </span>
                    </div>
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
      )}

    </div>
  );
};
