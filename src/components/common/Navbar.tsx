import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  SlidersHorizontal,
  X,
  Menu
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    cartCount, 
    setIsCartDrawerOpen, 
    wishlist, 
    currency, 
    setCurrency,
    isAdmin,
    setIsAdmin,
    setSelectedCategory,
    setSearchQuery
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      setSelectedCategory('all');
      setCurrentView('catalog');
      setIsSearchOpen(false);
    }
  };

  const handleNavClick = (view: 'catalog' | 'about' | 'contact' | 'faq', cat?: string) => {
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('all');
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#E8E4DA] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Zone 1: Single text element wordmark (Display Face) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#141413] hover:text-[#9F7A3E] transition-colors uppercase select-none text-left"
              >
                Luxe Haven
              </button>
            </div>

            {/* Zone 2: 4–6 clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-[0.16em] uppercase text-[#33302A]">
              <button
                onClick={() => handleNavClick('catalog', 'all')}
                className={`py-1 transition-all duration-200 hover:text-[#9F7A3E] relative ${
                  currentView === 'catalog' ? 'text-[#9F7A3E] border-b border-[#9F7A3E]' : ''
                }`}
              >
                Handbags
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'wallets')}
                className="py-1 transition-all duration-200 hover:text-[#9F7A3E]"
              >
                Small Leather
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'clutches')}
                className="py-1 transition-all duration-200 hover:text-[#9F7A3E]"
              >
                Evening
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'travel')}
                className="py-1 transition-all duration-200 hover:text-[#9F7A3E]"
              >
                Travel
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`py-1 transition-all duration-200 hover:text-[#9F7A3E] ${
                  currentView === 'about' ? 'text-[#9F7A3E] border-b border-[#9F7A3E]' : ''
                }`}
              >
                Atelier
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`py-1 transition-all duration-200 hover:text-[#9F7A3E] ${
                  currentView === 'contact' ? 'text-[#9F7A3E] border-b border-[#9F7A3E]' : ''
                }`}
              >
                Concierge
              </button>
            </nav>

            {/* Zone 3: 1–2 primary actions + functional client affordances */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Currency Selector */}
              <div className="hidden sm:flex items-center text-xs tracking-wider text-[#6B655B]">
                <button
                  onClick={() => setCurrency(currency === 'USD' ? 'EUR' : currency === 'EUR' ? 'GBP' : 'USD')}
                  className="px-2 py-1 hover:text-[#141413] transition-colors border border-transparent hover:border-[#D5CEBF] rounded-sm"
                  title="Switch Currency"
                >
                  {currency}
                </button>
              </div>

              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-[#2D2A26] hover:text-[#9F7A3E] transition-colors"
                aria-label="Search Catalog"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => {
                  setCurrentView('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative p-2 text-[#2D2A26] hover:text-[#9F7A3E] transition-colors"
                aria-label="Private Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" strokeWidth={1.75} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1 w-2 h-2 rounded-full bg-[#9F7A3E]" />
                )}
              </button>

              {/* Account */}
              <button
                type="button"
                onClick={() => {
                  setCurrentView('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-2 text-[#2D2A26] hover:text-[#9F7A3E] transition-colors"
                aria-label="Maison Account"
              >
                <User className="w-[18px] h-[18px]" strokeWidth={1.75} />
              </button>

              {/* Cart Bag Trigger */}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-[#141413] bg-[#F1EFEA] hover:bg-[#E7E2D6] transition-colors rounded-sm"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
                <span className="font-mono text-xs tabular-nums font-semibold tracking-wider text-[#141413]">
                  {cartCount}
                </span>
              </button>

              {/* Admin Mode Switch (Discreet luxury pill for easy app evaluation) */}
              <button
                type="button"
                onClick={() => {
                  setIsAdmin(!isAdmin);
                  setCurrentView(isAdmin ? 'home' : 'admin');
                }}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] tracking-wider uppercase transition-colors border ${
                  isAdmin 
                    ? 'bg-[#141413] text-[#D4AF37] border-[#9F7A3E]' 
                    : 'bg-transparent text-[#666056] border-[#DCD6C8] hover:border-[#9F7A3E] hover:text-[#141413]'
                }`}
                title="Toggle Maison Admin Dashboard"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>{isAdmin ? 'Admin View' : 'Admin'}</span>
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#2D2A26]"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-[#E8E4DA] bg-[#F8F6F0] py-4 px-4 sm:px-8">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#888174] shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search sovereign totes, box calfskin, evening clutches..."
                autoFocus
                className="w-full bg-transparent text-sm text-[#141413] placeholder-[#888174] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white bg-[#141413] hover:bg-[#33302A] transition-colors shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-[#888174] hover:text-[#141413]"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E4DA] bg-[#FBFBFA] px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3 text-sm font-medium tracking-[0.14em] uppercase text-[#2C2925]">
              <button
                onClick={() => handleNavClick('catalog', 'all')}
                className="text-left py-2 border-b border-[#F0ECE1]"
              >
                Handbags Collection
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'wallets')}
                className="text-left py-2 border-b border-[#F0ECE1]"
              >
                Small Leather Goods
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'clutches')}
                className="text-left py-2 border-b border-[#F0ECE1]"
              >
                Evening & Minaudières
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'travel')}
                className="text-left py-2 border-b border-[#F0ECE1]"
              >
                Travel & Weekend
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-left py-2 border-b border-[#F0ECE1]"
              >
                Maison Atelier Heritage
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-left py-2 border-b border-[#F0ECE1]"
              >
                Private Concierge
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="text-left py-2 border-b border-[#F0ECE1]"
              >
                Maison Client FAQ
              </button>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#E8E4DA]">
              <div className="text-xs text-[#7A7468]">
                Currency: <span className="font-semibold text-[#141413]">{currency}</span>
              </div>
              <button
                onClick={() => {
                  setIsAdmin(!isAdmin);
                  setCurrentView(isAdmin ? 'home' : 'admin');
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs uppercase tracking-wider text-[#9F7A3E] font-medium"
              >
                {isAdmin ? 'Exit Admin' : 'Switch to Admin Panel'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
