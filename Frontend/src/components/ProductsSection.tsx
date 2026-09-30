import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Laptop, Smartphone, MessageSquare, Users2, Shield, Sparkles } from 'lucide-react';
import { REQUIN_PRODUCTS, ProductItem } from '../data/requinData';

interface ProductsSectionProps {
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProduct }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(REQUIN_PRODUCTS[0].id);

  const activeProduct =
    REQUIN_PRODUCTS.find((p) => p.id === selectedProductId) || REQUIN_PRODUCTS[0];

  return (
    <section id="products" className="py-28 md:py-36 bg-[#0B2235] text-white relative overflow-hidden">
      {/* Subtle Glow Backdrop */}
      <div
        className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#08B9E8]/10 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-3">
            Proprietary Software Suite
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em]">
            Our Products
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-[1.65]">
            In-house enterprise software systems designed to solve workforce operational bottlenecks, accelerate deal cycles, and unify team communication.
          </p>
        </div>

        {/* Product Navigation Switcher */}
        <div className="flex flex-wrap gap-2 sm:gap-3 p-1.5 bg-[#071827] rounded-xl border border-white/10 max-w-2xl mb-12">
          {REQUIN_PRODUCTS.map((product) => {
            const isActive = product.id === activeProduct.id;
            return (
              <button
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-[#08B9E8] text-[#071827] shadow-md shadow-[#08B9E8]/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {product.title}
              </button>
            );
          })}
        </div>

        {/* Large Product Showcase Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#071827]/80 rounded-3xl border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
          {/* LEFT: Product Description, Features & Actions */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-[#08B9E8] mb-3">
                {activeProduct.category}
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activeProduct.title}
              </h3>
              <div className="text-sm font-medium text-[#4DD4F5] mt-1">
                {activeProduct.tagline}
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {activeProduct.description}
            </p>

            {/* 3 Key Features */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Core Capabilities
              </div>
              {activeProduct.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8] mt-0.5 shrink-0" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
              {activeProduct.metrics.map((m, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-2.5 border border-white/5 text-center sm:text-left">
                  <div className="text-base sm:text-lg font-bold text-[#08B9E8] font-mono tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => onSelectProduct(activeProduct)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-md shadow-[#08B9E8]/20 focus:outline-none active:scale-[0.98]"
              >
                <span>Explore {activeProduct.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: Large Product UI Screenshot & Device Mockup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-[#0B2235] border border-white/15 shadow-2xl overflow-hidden group">
              {/* Product Browser Chrome */}
              <div className="bg-[#071827] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#08B9E8]" />
                  <span>app.requinsolutions.com/{activeProduct.id}</span>
                </div>
                <div className="text-[11px] text-slate-400">Enterprise Live</div>
              </div>

              {/* Realistic High-Fidelity UI Interface */}
              <div className="relative h-[340px] sm:h-[400px] w-full overflow-hidden bg-[#071827]">
                <img
                  src={activeProduct.image}
                  alt={`${activeProduct.title} Interface`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/90 via-transparent to-black/20" />

                {/* Overlaid Realistic App Canvas Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B2235]/95 border border-white/15 backdrop-blur-md flex items-center justify-between shadow-xl">
                  <div>
                    <div className="text-xs font-semibold text-[#08B9E8] uppercase tracking-wider">
                      Module Active
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {activeProduct.tagline}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {activeProduct.architectureDetails[0]}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#08B9E8]/10 border border-[#08B9E8]/30 text-xs font-medium text-[#4DD4F5]">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Role-Based Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
