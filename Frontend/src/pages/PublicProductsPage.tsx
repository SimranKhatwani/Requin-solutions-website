import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { ProductFeatureModal } from '../components/ProductFeatureModal';
import { ProductItem, EXPLORE_MORE_PRODUCTS } from '../data/requinData';
import {
  ChevronRight,
  ArrowRight,
  Layers,
} from 'lucide-react';

export const PublicProductsPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenFeatures = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsFeatureModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#061827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5] relative overflow-hidden">
      {/* Global Top-level ambient background glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#08B9E8]/[0.08] blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -left-36 w-[600px] h-[600px] bg-[#00c2ff]/[0.06] blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 -right-36 w-[600px] h-[600px] bg-[#08B9E8]/[0.06] blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#00c2ff]/[0.07] blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Navbar */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
      />

      <main className="flex-1 pt-32 pb-24 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#products" className="hover:text-white transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#08B9E8]">More Products</span>
          </div>

          {/* ========================================================
              HERO HEADER TITLE (With Cyber Waves & Ambient Constellation)
          ======================================================== */}
          <div className="text-center py-10 sm:py-16 relative mb-12">
            {/* Ambient Cyan Radial Blooms directly behind header */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#08B9E8]/15 blur-[130px] rounded-full pointer-events-none -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute top-1/2 -left-20 -translate-y-1/2 w-[400px] h-[300px] bg-[#00c2ff]/10 blur-[100px] rounded-full pointer-events-none -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute top-1/2 -right-20 -translate-y-1/2 w-[400px] h-[300px] bg-[#08B9E8]/10 blur-[100px] rounded-full pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Header Cyber Waves & Constellation Nodes */}
            <div className="absolute inset-0 -inset-x-8 sm:-inset-x-16 pointer-events-none -z-10 overflow-visible">
              <svg
                className="w-full h-full min-h-[300px] pointer-events-none opacity-85"
                viewBox="0 0 1440 300"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="cyanWaveLeft_Hero" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#00c2ff" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#08B9E8" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="cyanWaveRight_Hero" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#00c2ff" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#08B9E8" stopOpacity="0.02" />
                  </linearGradient>
                  <filter id="nodeGlow_Hero" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                  </filter>
                </defs>

                {/* Left Side Header Waves */}
                <g stroke="url(#cyanWaveLeft_Hero)" strokeWidth="1.2">
                  <path d="M-60,80 C80,40 140,160 60,240 C-20,320 180,340 280,260 C360,200 220,140 320,80" strokeOpacity="0.25" />
                  <path d="M-80,130 C60,90 110,210 30,280 C-50,350 150,370 250,300" strokeOpacity="0.18" />
                  <path d="M-40,40 C100,10 180,120 90,200 C0,280 210,300 310,220" strokeOpacity="0.14" strokeDasharray="3 5" />
                </g>

                {/* Left Side Header Nodes */}
                <g fill="#08B9E8">
                  <circle cx="70" cy="110" r="4" fillOpacity="0.4" filter="url(#nodeGlow_Hero)" />
                  <circle cx="70" cy="110" r="2" fillOpacity="0.9" />
                  <circle cx="280" cy="260" r="3.5" fillOpacity="0.3" filter="url(#nodeGlow_Hero)" />
                  <circle cx="280" cy="260" r="1.5" fillOpacity="0.85" />
                  <circle cx="160" cy="180" r="2" fillOpacity="0.5" />
                  <circle cx="20" cy="240" r="2.5" fillOpacity="0.4" />
                </g>

                {/* Right Side Header Waves */}
                <g stroke="url(#cyanWaveRight_Hero)" strokeWidth="1.2">
                  <path d="M1500,80 C1360,40 1300,160 1380,240 C1460,320 1260,340 1160,260 C1080,200 1220,140 1120,80" strokeOpacity="0.25" />
                  <path d="M1520,130 C1380,90 1330,210 1410,280 C1490,350 1290,370 1190,300" strokeOpacity="0.18" />
                  <path d="M1480,40 C1340,10 1260,120 1350,200 C1440,280 1230,300 1130,220" strokeOpacity="0.14" strokeDasharray="3 5" />
                </g>

                {/* Right Side Header Nodes */}
                <g fill="#00c2ff">
                  <circle cx="1370" cy="110" r="4" fillOpacity="0.4" filter="url(#nodeGlow_Hero)" />
                  <circle cx="1370" cy="110" r="2" fillOpacity="0.9" />
                  <circle cx="1160" cy="260" r="3.5" fillOpacity="0.3" filter="url(#nodeGlow_Hero)" />
                  <circle cx="1160" cy="260" r="1.5" fillOpacity="0.85" />
                  <circle cx="1280" cy="180" r="2" fillOpacity="0.5" />
                  <circle cx="1420" cy="240" r="2.5" fillOpacity="0.4" />
                </g>
              </svg>
            </div>

            {/* Eyebrow badge matching homepage products */}
            <div className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#08B9E8] uppercase mb-3">
              REQUIN PRODUCT SUITE
            </div>

            {/* Large White Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              More Products
            </h1>

            {/* Glowing Luminous Laser-Shine Line below Title */}
            <div className="relative mt-5 flex items-center justify-center w-full max-w-xl mx-auto">
              {/* Outer soft ambient halo */}
              <div
                className="absolute w-64 sm:w-96 h-6 bg-[#08B9E8]/35 blur-lg rounded-full pointer-events-none"
                aria-hidden="true"
              />
              {/* Medium glow bloom */}
              <div
                className="absolute w-44 sm:w-72 h-3 bg-[#00c2ff]/50 blur-sm rounded-full pointer-events-none"
                aria-hidden="true"
              />
              {/* Full width gradient cyan baseline */}
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#08B9E8] to-transparent" />
              {/* High-intensity central white/cyan laser shine core */}
              <div className="absolute w-32 sm:w-56 h-[2.5px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_14px_#08B9E8,0_0_28px_#00c2ff]" />
            </div>

            {/* Subtitle description */}
            <p className="mt-5 text-sm sm:text-base text-[#A9C8DA] font-normal leading-relaxed max-w-2xl mx-auto">
              Explore our full ecosystem of tailored business management, enterprise billing, retail POS, and industry ERP platforms.
            </p>
          </div>

          {/* ========================================================
              PRODUCTS SHOWCASE LIST (Alternating Right & Left Images with Full-Height Cyber Background)
          ======================================================== */}
          <div className="space-y-16 sm:space-y-24">
            {EXPLORE_MORE_PRODUCTS.map((product, index) => {
              // Alternate: Index 0 (Vastra) -> Image Right, Index 1 (Dine & Dusk) -> Image Left, etc.
              const isImageRight = index % 2 === 0;

              // Visual Mockup Container (Crisp, fully legible screenshot showcase)
              const visualBlock = (
                <div
                  onClick={() => handleOpenFeatures(product)}
                  className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#0A1826] border border-[#08B9E8]/30 shadow-2xl group cursor-pointer aspect-[16/10] sm:aspect-video flex items-center justify-center p-2 sm:p-3.5 transition-all duration-300 hover:border-[#08B9E8] hover:shadow-[0_0_40px_rgba(8,185,232,0.3)]"
                >
                  {/* Product Visual Image - Object Contain to preserve full UI, text, and header */}
                  <img
                    src={product.image}
                    alt={`${product.title} Interface`}
                    className="w-full h-full object-contain rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Subtle Bottom Hover Indicator */}
                  <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#061827]/95 text-[#08B9E8] border border-[#08B9E8]/60 text-xs font-bold shadow-xl backdrop-blur-md">
                      <Layers className="w-3.5 h-3.5" />
                      <span>View Feature Gallery</span>
                    </span>
                  </div>
                </div>
              );

              // Content Block
              const contentBlock = (
                <div className="space-y-6 text-left flex flex-col justify-center py-2 sm:py-4">
                  {/* Title & Tagline */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {product.title}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-300 mt-2.5 font-normal leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Bullet Checklist with Cyan Dots */}
                  <ul className="space-y-3 pt-1">
                    {product.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-[#08B9E8] mt-2 shrink-0 shadow-[0_0_8px_#08B9E8]" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Gradient "Explore Features →" Action Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => handleOpenFeatures(product)}
                      className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#08B9E8] to-[#00c2ff] text-[#061827] font-bold text-sm sm:text-base shadow-lg shadow-[#08B9E8]/25 hover:shadow-[#08B9E8]/40 hover:scale-105 transition-all duration-300 cursor-pointer focus:outline-none"
                    >
                      <span>Explore Features</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              );

              return (
                <div key={product.id} className="relative">
                  {/* ========================================================
                      ROW-LEVEL CYBER WAVES & CONSTELLATION NODES (Guaranteed Full Coverage for EVERY Project)
                  ======================================================== */}
                  <div className="absolute inset-0 -inset-x-8 sm:-inset-x-16 pointer-events-none -z-10 overflow-visible">
                    {/* Ambient Glows behind each product */}
                    <div
                      className={`absolute top-1/2 ${
                        isImageRight ? '-left-20 sm:-left-32' : '-right-20 sm:-right-32'
                      } -translate-y-1/2 w-[650px] h-[450px] bg-[#08B9E8]/[0.08] blur-[150px] rounded-full pointer-events-none`}
                      aria-hidden="true"
                    />
                    <div
                      className={`absolute top-1/2 ${
                        isImageRight ? '-right-20 sm:-right-32' : '-left-20 sm:-left-32'
                      } -translate-y-1/2 w-[550px] h-[400px] bg-[#00c2ff]/[0.06] blur-[140px] rounded-full pointer-events-none`}
                      aria-hidden="true"
                    />

                    {/* Cyber Wave & Constellation Node SVGs on sides */}
                    <svg
                      className="w-full h-full min-h-[500px] pointer-events-none opacity-80"
                      viewBox="0 0 1440 600"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id={`cyanWaveLeft_${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.4" />
                          <stop offset="60%" stopColor="#00c2ff" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#08B9E8" stopOpacity="0.02" />
                        </linearGradient>
                        <linearGradient id={`cyanWaveRight_${product.id}`} x1="100%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.4" />
                          <stop offset="60%" stopColor="#00c2ff" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#08B9E8" stopOpacity="0.02" />
                        </linearGradient>
                        <filter id={`nodeGlow_${product.id}`} x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                        </filter>
                      </defs>

                      {/* LEFT SIDE FLOWING CURVED WAVES */}
                      <g stroke={`url(#cyanWaveLeft_${product.id})`} strokeWidth="1.2">
                        <path d="M-60,180 C80,140 140,280 60,400 C-20,520 180,560 280,460 C360,380 220,300 320,220" strokeOpacity="0.25" />
                        <path d="M-80,240 C60,190 110,330 30,450 C-50,570 150,600 250,500 C330,420 200,340 300,260" strokeOpacity="0.18" />
                        <path d="M-40,120 C100,80 180,220 90,340 C0,460 210,500 310,400" strokeOpacity="0.14" strokeDasharray="3 5" />
                      </g>

                      {/* LEFT SIDE NODES & CONSTELLATION POINTS */}
                      <g fill="#08B9E8">
                        <circle cx="70" cy="220" r="4" fillOpacity="0.4" filter={`url(#nodeGlow_${product.id})`} />
                        <circle cx="70" cy="220" r="2" fillOpacity="0.9" />
                        <circle cx="280" cy="460" r="3.5" fillOpacity="0.3" filter={`url(#nodeGlow_${product.id})`} />
                        <circle cx="280" cy="460" r="1.5" fillOpacity="0.85" />
                        <circle cx="160" cy="340" r="2" fillOpacity="0.5" />
                        <circle cx="20" cy="400" r="2.5" fillOpacity="0.4" />
                      </g>

                      {/* RIGHT SIDE FLOWING CURVED WAVES */}
                      <g stroke={`url(#cyanWaveRight_${product.id})`} strokeWidth="1.2">
                        <path d="M1500,180 C1360,140 1300,280 1380,400 C1460,520 1260,560 1160,460 C1080,380 1220,300 1120,220" strokeOpacity="0.25" />
                        <path d="M1520,240 C1380,190 1330,330 1410,450 C1490,570 1290,600 1190,500 C1110,420 1240,340 1140,260" strokeOpacity="0.18" />
                        <path d="M1480,120 C1340,80 1260,220 1350,340 C1440,460 1230,500 1130,400" strokeOpacity="0.14" strokeDasharray="3 5" />
                      </g>

                      {/* RIGHT SIDE NODES & CONSTELLATION POINTS */}
                      <g fill="#00c2ff">
                        <circle cx="1370" cy="220" r="4" fillOpacity="0.4" filter={`url(#nodeGlow_${product.id})`} />
                        <circle cx="1370" cy="220" r="2" fillOpacity="0.9" />
                        <circle cx="1160" cy="460" r="3.5" fillOpacity="0.3" filter={`url(#nodeGlow_${product.id})`} />
                        <circle cx="1160" cy="460" r="1.5" fillOpacity="0.85" />
                        <circle cx="1280" cy="340" r="2" fillOpacity="0.5" />
                        <circle cx="1420" cy="400" r="2.5" fillOpacity="0.4" />
                      </g>
                    </svg>
                  </div>

                  {/* Main Product Card */}
                  <div className="rounded-[32px] bg-[#0A1B2D]/85 border border-[#08B9E8]/20 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#08B9E8]/45 relative overflow-hidden">
                    {/* Ambient Soft Glow inside card */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#08B9E8]/10 blur-[120px] rounded-full pointer-events-none"
                      aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
                      {isImageRight ? (
                        <>
                          {/* Left Column: Content */}
                          <div className="lg:col-span-6 order-2 lg:order-1">{contentBlock}</div>
                          {/* Right Column: Visual Product Image Card */}
                          <div className="lg:col-span-6 order-1 lg:order-2">{visualBlock}</div>
                        </>
                      ) : (
                        <>
                          {/* Left Column: Visual Product Image Card */}
                          <div className="lg:col-span-6 order-1 lg:order-1">{visualBlock}</div>
                          {/* Right Column: Content */}
                          <div className="lg:col-span-6 order-2 lg:order-2">{contentBlock}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================
              BOTTOM ENTERPRISE CONSULTATION CTA
          ======================================================== */}
          <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#0B2235] via-[#071F33] to-[#0B2235] border border-[#08B9E8]/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#08B9E8]/10 blur-[100px] rounded-full pointer-events-none"
              aria-hidden="true"
            />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight relative z-10">
              Need a Custom Product or Tailored Enterprise Solution?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed relative z-10">
              Our engineering team architects custom CRM platforms, automated workforce
              portals, and high-performance business applications.
            </p>
            <div className="mt-6 relative z-10">
              <button
                onClick={() => navigate('/#contact')}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#08B9E8] hover:bg-[#4DD4F5] text-[#071827] font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-[#08B9E8]/25 cursor-pointer"
              >
                <span>Consult with Our Engineers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectService={() => {
          setIsQuizOpen(false);
          navigate('/#contact');
        }}
      />
      <ProductFeatureModal
        product={selectedProduct}
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
        onRequestQuote={() => {
          setIsFeatureModalOpen(false);
          navigate('/#contact');
        }}
      />
    </div>
  );
};
