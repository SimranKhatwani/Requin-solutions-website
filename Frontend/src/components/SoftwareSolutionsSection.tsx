import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, X, Check } from 'lucide-react';
import { SOFTWARE_PORTFOLIO_ITEMS, SoftwareSolutionItem } from '../data/requinData';

export const SoftwareSolutionsSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<SoftwareSolutionItem | null>(null);

  return (
    <section id="software-solutions" className="py-28 md:py-36 bg-[#F5F9FC] text-[#0B1726] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-3">
            Custom Software Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1726] tracking-[-0.03em]">
            Software Solutions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] font-normal leading-[1.65]">
            Tailored software applications built to solve complex organizational challenges, automate workflows, and connect systems.
          </p>
        </div>

        {/* Portfolio Showcase Grid: Image-First Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SOFTWARE_PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col text-left"
            >
              {/* Product Image Area */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-[#0B1726] shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Card Meta & Typography */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#0B1726] group-hover:text-[#08B9E8] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <div className="text-xs font-medium text-[#08B9E8]">
                    {item.subtitle}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Key Outcomes */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {item.keyOutcomes.slice(0, 1).map((outcome, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                      <Check className="w-3.5 h-3.5 text-[#08B9E8] shrink-0" />
                      <span className="truncate">{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Explore Link */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-medium text-slate-500">
                        {t} {idx < item.tags.length - 1 ? '·' : ''}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0B1726] group-hover:text-[#08B9E8] transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/80 backdrop-blur-md">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-left border border-slate-200 overflow-hidden">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider">
                {activeItem.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1726]">
                {activeItem.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {activeItem.description}
              </p>

              <div className="rounded-xl overflow-hidden h-52 bg-slate-100">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#0B1726] uppercase">Key Impact & Outcomes</div>
                <div className="space-y-2">
                  {activeItem.keyOutcomes.map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-[#08B9E8] mt-0.5 shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Tech Stack: {activeItem.tags.join(', ')}
                </div>
                <a
                  href="#contact"
                  onClick={() => setActiveItem(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#071827] hover:bg-[#0B2235] transition-colors"
                >
                  <span>Inquire About Similar Build</span>
                  <ArrowRight className="w-4 h-4 text-[#08B9E8]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
