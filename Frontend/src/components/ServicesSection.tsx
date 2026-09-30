import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { REQUIN_SERVICES, ServiceItem } from '../data/requinData';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-28 md:py-36 bg-[#F5F9FC] text-[#0B1726] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-3">
            What We Deliver
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1726] tracking-[-0.03em]">
            Our Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] font-normal leading-[1.65]">
            Technology solutions designed around your business. From greenfield application architecture to full-lifecycle modernization.
          </p>
        </div>

        {/* Six Services Grid - Sophisticated Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {REQUIN_SERVICES.map((service, index) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between text-left"
            >
              <div>
                {/* Visual Area with smooth 3% zoom on hover */}
                <div className="relative h-60 sm:h-68 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed category badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-[#0B1726] shadow-sm">
                    {service.category}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-2xl font-bold text-[#0B1726] group-hover:text-[#08B9E8] transition-colors duration-200">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  {/* Highlights list - clean and concise */}
                  <div className="pt-3 space-y-2">
                    {service.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                        <Check className="w-3.5 h-3.5 text-[#08B9E8] shrink-0" />
                        <span className="truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with Cyan Line & Moving Arrow */}
              <div className="px-6 sm:px-8 pb-6 pt-2">
                <div className="flex items-center justify-between text-sm font-semibold text-[#0B1726] group-hover:text-[#08B9E8] transition-colors duration-200">
                  <span>Explore Service</span>
                  <div className="flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1.5">
                    <ArrowRight className="w-4 h-4 text-[#08B9E8]" />
                  </div>
                </div>

                {/* Animated Cyan Accent Line */}
                <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-[#08B9E8] transition-all duration-300 ease-out group-hover:w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
