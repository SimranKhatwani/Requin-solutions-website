import React from 'react';
import { X, Check, ArrowRight, Code2, Layers, Cpu } from 'lucide-react';
import { ServiceItem } from '../data/requinData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuote,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/85 backdrop-blur-md">
      <div className="bg-white text-[#0B1726] rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative border border-slate-200 text-left overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0088EE] tracking-[-0.02em]">
              {service.title}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-[1.65]">
              {service.overview}
            </p>
          </div>

          {/* Visual Showcase */}
          <div className="rounded-2xl overflow-hidden h-52 sm:h-64 w-full bg-slate-900 relative">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Deliverables & Capabilities */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#0B1726] uppercase tracking-wider">
              Engineering Deliverables
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F5F9FC] border border-slate-100">
                  <Check className="w-4 h-4 text-[#08B9E8] mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Primary Technology Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-[#F5F9FC] border border-slate-200 text-xs font-medium text-[#0B1726]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Custom scope and fixed-price or sprint-based engagement models available.
            </div>
            <button
              onClick={() => {
                onRequestQuote(service.title);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-colors"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
