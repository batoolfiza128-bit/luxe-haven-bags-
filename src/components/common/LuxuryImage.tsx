import React, { useState } from 'react';

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  fallbackTitle?: string;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-[4/3]',
  fallbackTitle = 'Luxe Haven Handcraft'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#F3F0EA] border border-[#E5E0D5] text-[#141413] p-6 text-center select-none ${aspectRatioClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Subtle luxury geometric line motif */}
        <div className="absolute inset-2 border border-[#C5A880]/20 pointer-events-none" />
        
        {/* Luxury Handbag Silhouette SVG */}
        <div className="w-16 h-16 mb-3 text-[#A89274] opacity-90">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Bag Handle */}
            <path d="M22 28C22 18 26 12 32 12C38 12 42 18 42 28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            {/* Bag Body */}
            <path d="M12 28L15 52H49L52 28H12Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="#EAE5DA" />
            {/* Flap */}
            <path d="M14 28L20 40H44L50 28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            {/* 24k Gold Clasp */}
            <circle cx="32" cy="40" r="3.5" fill="#D4AF37" stroke="#9A7B20" strokeWidth="1" />
            {/* Stitching Line */}
            <path d="M17 50H47" stroke="#A89274" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>
        
        <span className="font-serif text-sm tracking-widest uppercase text-[#544F49]">
          {fallbackTitle}
        </span>
        <span className="text-[10px] tracking-wider uppercase text-[#8A847A] mt-1">
          Maison Haute Maroquinerie
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F3F0EA] ${aspectRatioClass} ${className}`}>
      {/* Skeleton / Ambient backdrop until loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0ECE3] via-[#E8E2D5] to-[#F0ECE3] animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
