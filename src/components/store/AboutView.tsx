import React from 'react';
import { useStore } from '../../context/StoreContext';
import { LuxuryImage } from '../common/LuxuryImage';
import { Shield, Sparkles, Feather, Compass, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Header */}
      <section className="bg-[#141413] text-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#2C2925]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
            Maison de Haute Maroquinerie · Fondée en 1984
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#FAF8F5] leading-tight">
            The Philosophy of Pure Form & Heirloom Integrity
          </h1>
          <p className="text-xs sm:text-sm text-[#A8A092] max-w-2xl mx-auto font-light leading-relaxed">
            In an era driven by industrial mass production and disposable fashion, Luxe Haven exists as a sanctuary of authentic leathercraft.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Founding */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-left">
            <span className="text-xs uppercase tracking-[0.22em] text-[#9F7A3E] font-medium block">
              Chapter 01 · Heritage
            </span>
            <h2 className="font-serif text-3xl text-[#141413]">
              Four Generations by the Banks of the Arno
            </h2>
            <p className="text-xs sm:text-sm text-[#524E46] leading-relaxed">
              Our atelier was established along the storied tanning corridors of Santa Croce sull’Arno, just outside Florence. Here, artisan families have perfected the alchemy of vegetable tanning using chestnut wood tannins and pristine river waters for centuries.
            </p>
            <p className="text-xs sm:text-sm text-[#524E46] leading-relaxed">
              Unlike commercial chrome-tanned leathers that degrade after a few seasons, our hides are treated with natural botanical extracts. Over decades of wear, they develop a luminous, caramel-rich patina that reflects the journeys of their owner.
            </p>
          </div>

          <div className="aspect-[4/3] bg-[#F7F5F0] border border-[#E8E4DA] overflow-hidden">
            <LuxuryImage
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85"
              alt="Tuscan Leather Artisan Craftsmanship"
              aspectRatioClass="h-full w-full"
              fallbackTitle="Tuscan Workshop"
            />
          </div>
        </div>
      </section>

      {/* Chapter 2: The Principles */}
      <section className="bg-[#FAF9F6] border-y border-[#E8E4DA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.22em] text-[#9F7A3E] font-medium block">
              Chapter 02 · The Canon
            </span>
            <h2 className="font-serif text-3xl text-[#141413] mt-1">
              The Four Pillars of Luxe Haven
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-[#E8E4DA] p-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F2EB] flex items-center justify-center text-[#9F7A3E]">
                <Shield className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-lg text-[#141413]">The Top 2% of Hides</h3>
              <p className="text-xs text-[#635E54] leading-relaxed">
                We reject 98% of candidate skins, selecting exclusively pristine full-grain calfskin free from artificial polyurethane coatings.
              </p>
            </div>

            <div className="bg-white border border-[#E8E4DA] p-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F2EB] flex items-center justify-center text-[#9F7A3E]">
                <Feather className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-lg text-[#141413]">Beeswax Saddle Stitch</h3>
              <p className="text-xs text-[#635E54] leading-relaxed">
                Hand-pierced with diamond awls and sewn with two needles. If a single stitch ever wears, the remainder cannot unravel.
              </p>
            </div>

            <div className="bg-white border border-[#E8E4DA] p-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F2EB] flex items-center justify-center text-[#9F7A3E]">
                <Sparkles className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-lg text-[#141413]">Architectural 24k Gold</h3>
              <p className="text-xs text-[#635E54] leading-relaxed">
                Solid brass alloy precision-milled from billets, plated in 24k gold, and protected by nanometric scratch-resistant ceramic glaze.
              </p>
            </div>

            <div className="bg-white border border-[#E8E4DA] p-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F2EB] flex items-center justify-center text-[#9F7A3E]">
                <Compass className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-lg text-[#141413]">Generational Spa Care</h3>
              <p className="text-xs text-[#635E54] leading-relaxed">
                Every creation comes with complimentary bi-annual reconditioning, leather nourishing, and edge burnishing at our salons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Call to action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#141413]">
          Acquire an Enduring Heirloom
        </h2>
        <p className="text-xs sm:text-sm text-[#706A5F] max-w-lg mx-auto font-light leading-relaxed">
          Explore our seasonal curation or schedule a private salon appointment to touch our leathers in person.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-[#141413] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#33302B]"
          >
            Explore Catalog
          </button>
          <button
            onClick={() => {
              setCurrentView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 border border-[#141413] text-[#141413] text-xs uppercase tracking-[0.2em] hover:bg-[#141413] hover:text-white"
          >
            Salon Appointments
          </button>
        </div>
      </section>

    </div>
  );
};
