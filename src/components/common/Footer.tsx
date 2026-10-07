import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setIsAdmin, isAdmin, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thank you for joining the Maison Privé register.', 'gold');
      setEmail('');
    }
  };

  const navigate = (view: any, cat?: string) => {
    if (cat) setSelectedCategory(cat);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121211] text-[#E8E4DA] border-t border-[#262420] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Service Pillars / Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-[#2A2824] text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-serif text-base tracking-wider uppercase text-[#E8E4DA]">Heritage Guarantee</span>
            </div>
            <p className="text-xs text-[#9E978B] leading-relaxed max-w-xs">
              Every creation includes lifetime reconditioning and official certificate of authenticity with serialized registry.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <Sparkles className="w-5 h-5" />
              <span className="font-serif text-base tracking-wider uppercase text-[#E8E4DA]">Complimentary Personalization</span>
            </div>
            <p className="text-xs text-[#9E978B] leading-relaxed max-w-xs">
              Hand-applied 24k gold leaf or blind debossed monogramming executed in our atelier at no additional charge.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <RefreshCw className="w-5 h-5" />
              <span className="font-serif text-base tracking-wider uppercase text-[#E8E4DA]">White-Glove Discretion</span>
            </div>
            <p className="text-xs text-[#9E978B] leading-relaxed max-w-xs">
              Insured priority courier delivery in signature museum-grade packaging with dedicated concierge tracking.
            </p>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-[#262420]">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.24em] uppercase text-[#F2EEE4] block">
              Luxe Haven
            </span>
            <p className="text-xs text-[#A39C8F] leading-relaxed max-w-sm">
              Maison de haute maroquinerie founded on the quiet purity of form, Italian vegetable-tanned hides, and French architectural precision.
            </p>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#C5A880] block mb-2 font-medium">
                The Maison Gazette
              </span>
              <p className="text-xs text-[#878073] mb-3">
                Receive private invitations to seasonal salon previews and limited artisan editions.
              </p>
              <form onSubmit={handleNewsletter} className="flex max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[#1A1A18] border border-[#33302A] px-3 py-2 text-xs text-[#E8E4DA] placeholder-[#6E675B] focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="bg-[#C5A880] text-[#141413] px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-[#D4AF37] transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#9E978B]">
              <li>
                <button onClick={() => navigate('catalog', 'crossbody')} className="hover:text-[#F2EEE4] transition-colors">
                  Crossbody & Satchels
                </button>
              </li>
              <li>
                <button onClick={() => navigate('catalog', 'totes')} className="hover:text-[#F2EEE4] transition-colors">
                  Structured Totes
                </button>
              </li>
              <li>
                <button onClick={() => navigate('catalog', 'clutches')} className="hover:text-[#F2EEE4] transition-colors">
                  Evening Minaudières
                </button>
              </li>
              <li>
                <button onClick={() => navigate('catalog', 'wallets')} className="hover:text-[#F2EEE4] transition-colors">
                  Small Leather Goods
                </button>
              </li>
              <li>
                <button onClick={() => navigate('catalog', 'travel')} className="hover:text-[#F2EEE4] transition-colors">
                  Travel & Weekend
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Maison */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs text-[#9E978B]">
              <li>
                <button onClick={() => navigate('about')} className="hover:text-[#F2EEE4] transition-colors">
                  Tuscan Atelier Story
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-[#F2EEE4] transition-colors">
                  Ethical Sourcing & Tanneries
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-[#F2EEE4] transition-colors">
                  Flagship Boutiques
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-[#F2EEE4] transition-colors">
                  Maison Leather Spa
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              Client Services
            </h4>
            <ul className="space-y-2 text-xs text-[#9E978B]">
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-[#F2EEE4] transition-colors">
                  Private Appointments
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faq')} className="hover:text-[#F2EEE4] transition-colors">
                  White-Glove Shipping & Returns
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faq')} className="hover:text-[#F2EEE4] transition-colors">
                  Care & Leather Conditioning
                </button>
              </li>
              <li>
                <button onClick={() => navigate('account')} className="hover:text-[#F2EEE4] transition-colors">
                  Maison Privé Account
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setIsAdmin(!isAdmin);
                    setCurrentView(isAdmin ? 'home' : 'admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="text-[#C5A880] hover:text-[#D4AF37] transition-colors flex items-center gap-1 font-medium"
                >
                  <span>{isAdmin ? 'Storefront View' : 'Admin Console'}</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Boutiques */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#787163] gap-4">
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <span>Paris · Rue du Faubourg Saint-Honoré</span>
            <span>·</span>
            <span>Milano · Via Montenapoleone</span>
            <span>·</span>
            <span>New York · Madison Avenue</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© 2026 Luxe Haven Maroquinerie. All rights reserved.</span>
            <button onClick={() => navigate('faq')} className="hover:text-[#F2EEE4] transition-colors">Privacy</button>
            <button onClick={() => navigate('faq')} className="hover:text-[#F2EEE4] transition-colors">Terms of Atelier</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
