import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { ProductVideoModal } from '../components/ProductVideoModal';
import { ProductItem, SHOWCASE_PRODUCTS } from '../data/requinData';
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  Play,
} from 'lucide-react';

export const PublicProductsPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenDemo = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsVideoModalOpen(true);
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
            <span className="text-[#08B9E8]">All Products</span>
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

            {/* Small Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08B9E8]/10 border border-[#08B9E8]/30 text-[#08B9E8] text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proprietary Software Suite</span>
            </div>

            {/* Large White Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
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

            {/* Subtitle Description */}
            <p className="mt-7 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Engineered in-house to eliminate operational bottlenecks, automate high-stakes
              workflows, and deliver scalable enterprise intelligence.
            </p>
          </div>

          {/* ========================================================
              PRODUCTS SHOWCASE LIST (Exact Reference Matching Layout)
          ======================================================== */}
          <div className="space-y-12 sm:space-y-16">
            {SHOWCASE_PRODUCTS.map((product) => {
              const isVisualLeft = product.visualSide === 'left';

              // Visual Mockup Container with Video Play Overlay
              const visualBlock = (
                <div
                  onClick={() => handleOpenDemo(product)}
                  className="relative rounded-[28px] overflow-hidden bg-[#0A1826] border border-white/15 shadow-2xl group cursor-pointer aspect-video sm:aspect-[16/10] flex items-center justify-center"
                >
                  {/* Product Visual Image */}
                  <img
                    src={product.image}
                    alt={`${product.title} Demo`}
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
                      onClick={() => handleOpenDemo(product)}
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
      <ProductVideoModal
        product={selectedProduct}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onRequestQuote={() => {
          setIsVideoModalOpen(false);
          navigate('/#contact');
        }}
      />
    </div>
  );
};
