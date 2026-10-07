import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="relative bg-[#141413] text-[#E8E2D5] text-[11px] sm:text-xs tracking-[0.18em] uppercase py-2 px-6 flex items-center justify-center border-b border-[#2B2925]">
      <p className="text-center font-normal truncate">
        <span>Complimentary White-Glove Global Delivery Over $500</span>
        <span className="mx-2 text-[#C5A880]">·</span>
        <span className="hidden md:inline">Handcrafted in Florence & Paris</span>
        <span className="mx-2 text-[#C5A880] hidden md:inline">·</span>
        <span className="text-[#C5A880]">Bespoke Gold Foil Monogramming Included</span>
      </p>
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8578] hover:text-[#E8E2D5] p-1 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
