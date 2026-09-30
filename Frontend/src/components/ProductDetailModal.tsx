import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, Laptop, Server, CheckCircle2 } from 'lucide-react';
import { ProductItem } from '../data/requinData';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestDemo: (productTitle: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestDemo,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/85 backdrop-blur-md">
      <div className="bg-[#0B2235] text-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative border border-white/15 text-left overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-[#08B9E8] mb-2">
              {product.category}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em]">
              {product.title}
            </h3>
            <p className="text-sm font-medium text-[#4DD4F5] mt-1">
              {product.tagline}
            </p>
            <p className="mt-3 text-sm text-slate-300 leading-[1.65]">
              {product.description}
            </p>
          </div>

          {/* Product UI Preview Screen */}
          <div className="rounded-2xl overflow-hidden h-52 sm:h-64 w-full bg-[#071827] relative border border-white/10">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-[#0B2235]/90 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
              <span className="font-semibold text-white">Verified Live Architecture</span>
              <span className="text-[#08B9E8]">Enterprise Ready</span>
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Core Platform Capabilities
            </div>
            <div className="space-y-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8] mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Performance Metrics
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.metrics.map((m, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                    <div className="text-sm font-bold text-[#08B9E8]">{m.value}</div>
                    <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Technical Highlights
              </div>
              <ul className="text-xs text-slate-300 space-y-1">
                {product.architectureDetails.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#08B9E8]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              Deployment options: Cloud SaaS or On-Premises enterprise cluster.
            </div>
            <button
              onClick={() => {
                onRequestDemo(product.title);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-colors"
            >
              <span>Schedule Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
