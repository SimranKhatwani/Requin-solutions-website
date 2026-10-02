import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';
import { SHOWCASE_PRODUCTS, ShowcaseProductItem, ProductItem } from '../data/requinData';
import { ProductVideoModal } from './ProductVideoModal';

interface ProductsSectionProps {
  onSelectProduct?: (product: ProductItem) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProduct }) => {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<string>(SHOWCASE_PRODUCTS[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeProduct: ShowcaseProductItem =
    SHOWCASE_PRODUCTS.find((p) => p.id === selectedProductId) || SHOWCASE_PRODUCTS[0];

  // Intersection observer for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (productId: string) => {
    if (productId === selectedProductId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProductId(productId);
      setIsTransitioning(false);
    }, 180);
  };

  const handleOpenDemo = (product: ProductItem) => {
    setSelectedProductForModal(product);
    setIsVideoModalOpen(true);
  };

  const isVisualLeft = activeProduct.visualSide === 'left';

  // Visual Mockup Container with Video Play Overlay matching the "See More Products" page
  const visualBlock = (
    <div
      onClick={() => handleOpenDemo(activeProduct)}
      className="relative rounded-[28px] overflow-hidden bg-[#0A1826] border border-white/15 shadow-2xl group cursor-pointer aspect-video sm:aspect-[16/10] flex items-center justify-center"
    >
      {/* Product Visual Image */}
      <img
        src={activeProduct.image}
        alt={`${activeProduct.title} Demo`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Top-Right Cyan "Demo Available" Pill Tag */}
      <div className="absolute top-4 right-4 z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#08B9E8] text-[#061827] text-xs font-bold shadow-lg shadow-[#08B9E8]/30 backdrop-blur-sm">
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Demo Available</span>
        </span>
      </div>

      {/* Center Luminous Video Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white/20 group-hover:bg-white/35 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-[0_0_40px_rgba(8,185,232,0.6)] transition-all duration-300 group-hover:scale-110">
          <Play className="w-7 sm:w-8 h-7 sm:h-8 fill-white translate-x-0.5" />
        </div>
      </div>
    </div>
  );

  // Content Block matching the exact content & typography on the "See More Products" page
  const contentBlock = (
    <div className="space-y-6 text-left flex flex-col justify-center py-2 sm:py-4">
      {/* Title & Tagline/Description */}
      <div>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {activeProduct.title}
        </h3>
        <p className="text-base sm:text-lg text-slate-300 mt-2.5 font-normal leading-relaxed">
          {activeProduct.description}
        </p>
      </div>

      {/* Bullet Checklist with Glowing Cyan Dots */}
      <ul className="space-y-3 pt-1">
        {activeProduct.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-200">
            <span className="w-2 h-2 rounded-full bg-[#08B9E8] mt-2 shrink-0 shadow-[0_0_8px_#08B9E8]" />
            <span className="leading-snug">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Gradient "Explore Features →" Action Button */}
      <div className="pt-3">
        <button
          onClick={() => handleOpenDemo(activeProduct)}
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#08B9E8] to-[#00c2ff] text-[#061827] font-bold text-sm sm:text-base shadow-lg shadow-[#08B9E8]/25 hover:shadow-[#08B9E8]/40 hover:scale-105 transition-all duration-300 cursor-pointer focus:outline-none"
        >
          <span>Explore Features</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-24 sm:py-32 bg-[#061827] text-white relative overflow-hidden font-sans select-none"
    >
      {/* ========================================================
          BACKGROUND LAYER 1: Deep Ambient Radial Glows
      ======================================================== */}
      {/* Center soft glow behind product card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#08B9E8]/[0.08] blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      {/* Top Left Ambience */}
      <div
        className="absolute -top-36 -left-36 w-[500px] h-[500px] bg-[#00c2ff]/[0.06] blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      {/* Bottom Right Ambience */}
      <div
        className="absolute -bottom-36 -right-36 w-[550px] h-[550px] bg-[#08B9E8]/[0.07] blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================
          BACKGROUND LAYER 2: Left & Right Flowing Cyan Wave Lines & Nodes
      ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cyanWaveLeftMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#00c2ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#08B9E8" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="cyanWaveRightMain" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#00c2ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#08B9E8" stopOpacity="0.02" />
          </linearGradient>
          <filter id="nodeGlowProdMain" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* LEFT SIDE FLOWING CURVED WAVES */}
        <g stroke="url(#cyanWaveLeftMain)" fill="none" strokeWidth="1.2">
          <path d="M-60,220 C80,180 140,320 60,480 C-20,640 180,680 280,560 C360,460 220,380 320,280" strokeOpacity="0.25" />
          <path d="M-80,290 C60,240 110,380 30,530 C-50,680 150,730 250,620 C330,520 200,430 300,340" strokeOpacity="0.18" />
          <path d="M-40,160 C100,120 180,260 90,420 C0,580 210,620 310,500" strokeOpacity="0.14" strokeDasharray="3 5" />
        </g>

        {/* LEFT SIDE NODES & CONSTELLATION POINTS */}
        <g fill="#08B9E8">
          <circle cx="70" cy="270" r="4" fillOpacity="0.4" filter="url(#nodeGlowProdMain)" />
          <circle cx="70" cy="270" r="2" fillOpacity="0.9" />
          <circle cx="280" cy="560" r="3.5" fillOpacity="0.3" filter="url(#nodeGlowProdMain)" />
          <circle cx="280" cy="560" r="1.5" fillOpacity="0.85" />
          <circle cx="160" cy="420" r="2" fillOpacity="0.5" />
          <circle cx="20" cy="480" r="2.5" fillOpacity="0.4" />
        </g>

        {/* RIGHT SIDE FLOWING CURVED WAVES */}
        <g stroke="url(#cyanWaveRightMain)" fill="none" strokeWidth="1.2">
          <path d="M1500,220 C1360,180 1300,320 1380,480 C1460,640 1260,680 1160,560 C1080,460 1220,380 1120,280" strokeOpacity="0.25" />
          <path d="M1520,290 C1380,240 1330,380 1410,530 C1490,680 1290,730 1190,620 C1110,520 1240,430 1140,340" strokeOpacity="0.18" />
          <path d="M1480,160 C1340,120 1260,260 1350,420 C1440,580 1230,620 1130,500" strokeOpacity="0.14" strokeDasharray="3 5" />
        </g>

        {/* RIGHT SIDE NODES & CONSTELLATION POINTS */}
        <g fill="#00c2ff">
          <circle cx="1370" cy="270" r="4" fillOpacity="0.4" filter="url(#nodeGlowProdMain)" />
          <circle cx="1370" cy="270" r="2" fillOpacity="0.9" />
          <circle cx="1160" cy="560" r="3.5" fillOpacity="0.3" filter="url(#nodeGlowProdMain)" />
          <circle cx="1160" cy="560" r="1.5" fillOpacity="0.85" />
          <circle cx="1280" cy="420" r="2" fillOpacity="0.5" />
          <circle cx="1420" cy="480" r="2.5" fillOpacity="0.4" />
        </g>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            1. SECTION HEADER (Centered)
        ======================================================== */}
        <div
          className={`max-w-3xl mx-auto text-center mb-10 sm:mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Eyebrow */}
          <div className="text-sm sm:text-base font-bold tracking-[0.2em] text-[#08B9E8] uppercase mb-3.5">
            OUR PRODUCTS
          </div>
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-[-0.03em] leading-tight">
            Powerful Solutions for Your Business
          </h2>
          {/* Subtitle / Description */}
          <p className="mt-4 text-sm sm:text-base text-[#A9C8DA] font-normal leading-relaxed max-w-2xl mx-auto">
            Our digital solutions empower businesses with cutting-edge web applications,
            leveraging modern technologies to create seamless, scalable, and secure
            experiences.
          </p>
        </div>

        {/* ========================================================
            2. PRODUCT TABS (Horizontal Pill Switcher)
        ======================================================== */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#061827]/90 border border-[#08B9E8]/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] max-w-full overflow-x-auto scrollbar-none">
            {SHOWCASE_PRODUCTS.map((product) => {
              const isActive = product.id === activeProduct.id;
              return (
                <button
                  key={product.id}
                  onClick={() => handleTabChange(product.id)}
                  className={`px-5 sm:px-7 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer focus:outline-none ${
                    isActive
                      ? 'bg-[#08B9E8] text-[#061827] font-bold shadow-[0_0_24px_rgba(8,185,232,0.5)]'
                      : 'text-[#A9C8DA] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {product.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            3. MAIN PRODUCT PRESENTATION CARD (Exact layout & styling from See More Products page)
        ======================================================== */}
        <div className="rounded-[32px] bg-[#0A1B2D]/85 border border-[#08B9E8]/20 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#08B9E8]/45 relative overflow-hidden">
          
          {/* Ambient Soft Glow inside card */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#08B9E8]/10 blur-[120px] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div
            className={`transition-all duration-300 ${
              isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {isVisualLeft ? (
                <>
                  <div className="lg:col-span-6">{visualBlock}</div>
                  <div className="lg:col-span-6">{contentBlock}</div>
                </>
              ) : (
                <>
                  <div className="lg:col-span-6 order-2 lg:order-1">{contentBlock}</div>
                  <div className="lg:col-span-6 order-1 lg:order-2">{visualBlock}</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            4. RIGHT BOTTOM "SEE MORE PRODUCTS" BUTTON
        ======================================================== */}
        <div className="flex justify-end mt-8 sm:mt-10">
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-[#071F33]/90 hover:bg-[#08B9E8] border border-[#08B9E8]/40 hover:border-[#08B9E8] text-[#08B9E8] hover:text-[#061827] font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-[0_0_30px_rgba(8,185,232,0.45)] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#08B9E8]/50 active:scale-95"
          >
            <span>See More Products</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>

      </div>

      {/* Interactive Video Demo Modal */}
      <ProductVideoModal
        product={selectedProductForModal || activeProduct}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onRequestQuote={() => {
          setIsVideoModalOpen(false);
          const contactEl = document.getElementById('contact');
          if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </section>
  );
};
