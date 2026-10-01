import React from 'react';
import { ArrowRight, Monitor, Smartphone, Cloud, Cpu } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onViewProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onViewProducts }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-16 md:pt-36 md:pb-20 flex flex-col justify-between overflow-hidden bg-[#061523]">
      {/* Background Image Composition with Deep Navy Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Desk Workspace Photo positioned cleanly on the right with full clarity and visibility */}
        <img
          src="/images/hero-developer-desk.jpg?v=3"
          alt="Software Development Workspace"
          className="absolute inset-0 w-full h-full object-cover object-right opacity-85 sm:opacity-95 lg:opacity-100"
        />
        {/* Left gradient specifically protecting text readability while leaving workspace objects 100% clear */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] xl:w-[52%] bg-gradient-to-r from-[#061523] via-[#061523]/95 via-70% to-transparent" />
        {/* Subtle top/bottom edge blend */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#061523] to-transparent opacity-70" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#061523] to-transparent opacity-60" />
        {/* Radial Cyan Lighting behind headline */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-[#00c2ff]/10 blur-[130px] rounded-full" />
      </div>

      {/* Main Hero Content */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: Headline & Value Proposition */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 text-left">
            {/* Small Top Branded Label */}
            <div className="text-xs sm:text-sm font-bold tracking-widest text-[#00c2ff] uppercase">
              DIGITAL SOLUTIONS • SOFTWARE • CLOUD
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-[800] tracking-[-0.03em] text-white leading-[1.08] max-w-2xl">
              Building Digital Solutions That Move Businesses{' '}
              <span className="text-[#00c2ff]">Forward.</span>
            </h1>

            {/* Sub-headline Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              At Requin Solutions Pvt Ltd , we build modern software, cloud and digital solutions that help businesses operate, grow and transform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreServices}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[#05131f] bg-[#00c2ff] hover:bg-[#38d4ff] transition-all duration-200 shadow-lg shadow-[#00c2ff]/25 hover:shadow-[#00c2ff]/40 focus:outline-none active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewProducts}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-transparent hover:bg-white/5 border border-[#00c2ff]/50 hover:border-[#00c2ff] transition-all duration-200 focus:outline-none cursor-pointer"
              >
                <span>View Our Products</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: 4-Icon Feature Strip */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 pt-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 max-w-4xl">
          {/* 1. Web Development */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer" onClick={onExploreServices}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#00c2ff] group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6 stroke-[1.75]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-200 mt-1">Web Development</span>
          </div>

          {/* 2. Mobile Apps */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer" onClick={onExploreServices}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#00c2ff] group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6 stroke-[1.75]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-200 mt-1">Mobile Apps</span>
          </div>

          {/* 3. Cloud Solutions */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer" onClick={onExploreServices}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#00c2ff] group-hover:scale-110 transition-transform">
              <Cloud className="w-6 h-6 stroke-[1.75]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-200 mt-1">Cloud Solutions</span>
          </div>

          {/* 4. Software Solutions */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer" onClick={onExploreServices}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#00c2ff] group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6 stroke-[1.75]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-200 mt-1">Software Solutions</span>
          </div>
        </div>
      </div>
    </section>
  );
};
