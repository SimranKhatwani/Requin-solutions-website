import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Smartphone,
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
  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const gallery = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [{ title: 'Interface Overview', caption: product.description, image: product.image }];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-[#071827]/80 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
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
        {/* ========================================================
            MODAL HEADER BAR (Light Blue Tint)
        ======================================================== */}
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

        {/* ========================================================
            SCROLLABLE CONTENT BODY
        ======================================================== */}
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

              {/* Performance Metrics Pills (2 Columns without 18h/wk) */}
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

            {/* Right: Key Features Bullet Card (Image 3 reference) */}
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

          {/* MIDDLE SECTION: Full Multi-Screen Application Showcase (No Screen Tabs, No Bottom Descriptions) */}
          <div className="space-y-4 pt-4 border-t border-[#BAE6FD]/70">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-[#082842] tracking-tight flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#0284C7]" />
                <span>Application Interface & Live Screens</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Explore verified production interfaces and workflows
              </p>
            </div>

            {/* 3-Screen Full Height Display Grid (Fully visible, uncropped screenshots) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6 pt-2">
              {gallery.map((screen, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl sm:rounded-3xl p-2 bg-white border border-[#BAE6FD] shadow-md hover:shadow-xl hover:border-[#08B9E8] transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================
            MODAL FOOTER ACTION BAR
        ======================================================== */}
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
  );
};
