import React, { useEffect, useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { ProductItem } from '../data/requinData';

interface ProductFeatureModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote?: (productTitle: string) => void;
}

export const ProductFeatureModal: React.FC<ProductFeatureModalProps> = ({
  product,
  isOpen,
  onClose,
  onRequestQuote,
}) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Handle escape key to close modal or lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeLightboxIndex !== null) {
          setActiveLightboxIndex(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, activeLightboxIndex]);

  if (!isOpen || !product) return null;

  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [{ title: 'Interface Overview', caption: product.description, image: product.image }];

  const currentLightboxItem = activeLightboxIndex !== null ? gallery[activeLightboxIndex] : null;

  return (
    <>
      {/* ========================================================
          MAIN FEATURE MODAL
      ======================================================== */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-[#071827]/85 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="relative w-full max-w-5xl bg-gradient-to-b from-[#EDF7FC] via-[#F4F9FD] to-[#FFFFFF] border border-[#BAE6FD] rounded-[32px] shadow-[0_24px_70px_rgba(8,185,232,0.22)] overflow-hidden flex flex-col my-auto max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* MODAL HEADER BAR */}
          <div className="px-6 sm:px-8 py-5 bg-[#E0F2FE]/80 border-b border-[#BAE6FD]/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08B9E8]/15 border border-[#08B9E8]/40 text-[#0284C7] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{product.category}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#082842] tracking-tight">
                {product.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200/80 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SCROLLABLE CONTENT BODY */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-left scrollbar-thin scrollbar-thumb-slate-300">
            
            {/* TOP SECTION: Description & Key Features */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left: Product Description & Highlights */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-[#0284C7] uppercase tracking-wider mb-1">
                    Product Overview
                  </h4>
                  <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed">
                    {product.description}
                  </p>
                  {product.tagline && (
                    <p className="text-sm text-[#0284C7] mt-1 font-medium">
                      {product.tagline}
                    </p>
                  )}
                </div>

                {/* Performance Metrics */}
                {product.metrics && product.metrics.length > 0 && (
                  <div className={`grid grid-cols-${Math.min(product.metrics.length, 2)} gap-3 pt-2`}>
                    {product.metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white border border-[#BAE6FD] shadow-sm text-center"
                      >
                        <div className="text-xl sm:text-2xl font-extrabold text-[#0284C7]">
                          {m.value}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 truncate font-semibold">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Key Features Bullet Card */}
              <div className="lg:col-span-6 rounded-2xl bg-white border border-[#BAE6FD] p-5 sm:p-6 shadow-md space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#082842] uppercase tracking-wider border-b border-slate-100 pb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Key Features</span>
                </div>

                <ul className="space-y-2.5 pt-1">
                  {(product.bullets || product.features.slice(0, 4)).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#08B9E8] mt-2 shrink-0 shadow-[0_0_8px_#08B9E8]" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* MIDDLE SECTION: Live Interface Cards with 1-Line Description */}
            <div className="space-y-4 pt-4 border-t border-[#BAE6FD]/70">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#082842] tracking-tight flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-[#0284C7]" />
                    <span>Application Interface & Live Screens</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Click any screen card to view full-resolution preview
                  </p>
                </div>
              </div>

              {/* Grid of Screen Cards with Title & One-Line Description */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${gallery.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-5 lg:gap-6 pt-2`}>
                {gallery.map((screen, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="group rounded-2xl sm:rounded-3xl bg-white border border-[#BAE6FD] hover:border-[#08B9E8] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1"
                  >
                    {/* Image Preview Container */}
                    <div className="relative overflow-hidden bg-slate-100 border-b border-slate-100 flex items-center justify-center aspect-[16/10] sm:aspect-video">
                      <img
                        src={screen.image}
                        alt={screen.title}
                        className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Hover Overlay with Zoom Icon */}
                      <div className="absolute inset-0 bg-[#082842]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#082842] text-xs font-bold shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-200">
                          <ZoomIn className="w-3.5 h-3.5 text-[#0284C7]" />
                          <span>Click to View</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content: Title + One Line Description */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-1.5 bg-gradient-to-b from-white to-[#F8FAFC]">
                      <h5 className="text-sm sm:text-base font-bold text-[#082842] tracking-tight group-hover:text-[#0284C7] transition-colors line-clamp-1">
                        {screen.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-2">
                        {screen.caption || product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* MODAL FOOTER ACTION BAR */}
          <div className="px-6 sm:px-8 py-4 bg-[#E0F2FE]/60 border-t border-[#BAE6FD]/80 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-xs sm:text-sm text-slate-600 text-left font-medium">
              Ready to deploy <span className="text-[#082842] font-bold">{product.title}</span> in your organization?
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-sm"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onRequestQuote) {
                    onRequestQuote(product.title);
                  } else {
                    const contactEl = document.getElementById('contact');
                    if (contactEl) {
                      contactEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#08B9E8] hover:bg-[#00c2ff] text-[#061827] text-xs sm:text-sm font-bold shadow-md shadow-[#08B9E8]/25 hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                <span>Inquire for Deployment</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          FULL-SCREEN HIGH-RES LIGHTBOX VIEWER
      ======================================================== */}
      {currentLightboxItem && activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-[#020B14]/95 backdrop-blur-xl animate-fade-in select-none"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Lightbox Bar */}
            <div className="w-full flex items-center justify-between pb-3 text-white border-b border-white/10 mb-4">
              <div className="text-left">
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  {currentLightboxItem.title}
                </h4>
                {currentLightboxItem.caption && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {currentLightboxItem.caption}
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 ml-4 shrink-0"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Screenshot Container */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-[#0A1826] border border-white/20 shadow-2xl flex items-center justify-center max-h-[75vh]">
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                className="max-h-[72vh] w-auto max-w-full object-contain p-2"
              />

              {/* Prev / Next Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex((prev) =>
                        prev !== null ? (prev === 0 ? gallery.length - 1 : prev - 1) : 0
                      );
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#061827]/80 hover:bg-[#08B9E8] hover:text-[#061827] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex((prev) =>
                        prev !== null ? (prev === gallery.length - 1 ? 0 : prev + 1) : 0
                      );
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#061827]/80 hover:bg-[#08B9E8] hover:text-[#061827] text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Gallery Thumbnail Counter */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2 mt-4">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveLightboxIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeLightboxIndex
                        ? 'w-8 bg-[#08B9E8]'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
