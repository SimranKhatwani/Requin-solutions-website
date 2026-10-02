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
  Sparkles,
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
    <div className="min-h-screen bg-[#071827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5]">
      {/* Navbar */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
      />

      <main className="flex-1 pt-32 pb-24 text-left">
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
              HERO HEADER TITLE
          ======================================================== */}
          <div className="text-center py-10 sm:py-16 relative overflow-hidden mb-12">
            {/* Ambient Cyan Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#08B9E8]/10 blur-[130px] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* Large White Heading */}
            <h1 className="text-4xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight">
            Our Products
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
          </div>

          {/* ========================================================
              PRODUCTS SHOWCASE LIST
          ======================================================== */}
          <div className="space-y-12 sm:space-y-16">
            {EXPLORE_MORE_PRODUCTS.map((product) => {
              const isVisualLeft = product.visualSide === 'left';

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
                <div
                  key={product.id}
                  className="rounded-[32px] bg-[#0A1B2D]/85 border border-[#08B9E8]/20 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#08B9E8]/45"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Left Column: Title, Description, Bullet Checklist & Explore Button */}
                    <div className="lg:col-span-6 order-2 lg:order-1">{contentBlock}</div>
                    
                    {/* Right Column: Visual Product Image Card */}
                    <div className="lg:col-span-6 order-1 lg:order-2">{visualBlock}</div>
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
