import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Monitor,
  Smartphone,
  Cpu,
  Cloud,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { REQUIN_SERVICES, ServiceItem } from '../data/requinData';

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
}

// Icon mapping per service ID
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'web-development': <Monitor className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />,
  'mobile-development': <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />,
  'software-solutions': <Cpu className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />,
  'cloud-solutions': <Cloud className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />,
  'digital-marketing': <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />,
  'academic-assistance': <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  // Interval to update active pagination indicator dot
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(dotInterval);
  }, []);

  const handleCardClick = (service: ServiceItem) => {
    if (onSelectService) {
      onSelectService(service);
    }
    navigate(`/service/${service.id}`);
  };

  const handleNudge = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setActiveDot((prev) => (direction === 'left' ? (prev <= 0 ? 3 : prev - 1) : (prev + 1) % 4));
    }
  };

  // Helper renderer for a single service card
  const renderServiceCard = (service: ServiceItem, keyPrefix: string) => {
    const icon = SERVICE_ICONS[service.id] || <Monitor className="w-7 h-7" />;

    return (
      <div
        key={`${keyPrefix}-${service.id}`}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick(service)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(service);
          }
        }}
        className="group w-[320px] sm:w-[360px] lg:w-[390px] h-[380px] flex-shrink-0 bg-gradient-to-br from-white via-[#FCFDFE] to-[#F0F9FF]/85 rounded-3xl border border-slate-200/80 hover:border-[#00c2ff]/60 p-7 sm:p-8 flex flex-col justify-between text-left shadow-[0_4px_20px_-4px_rgba(8,185,232,0.06),0_2px_8px_-2px_rgba(11,23,38,0.04)] hover:shadow-[0_20px_45px_-10px_rgba(0,194,255,0.25),0_8px_16px_-4px_rgba(11,23,38,0.06)] transition-all duration-300 ease-out hover:-translate-y-2 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#08B9E8]/50 cursor-pointer select-none"
      >
        {/* Subtle Upper-Right Service-Specific Visual Illustration & Ambient Glow */}
        <div className="absolute -top-1 -right-1 w-44 h-44 sm:w-48 sm:h-48 pointer-events-none overflow-hidden select-none">
          {/* Soft ambient cyan glow behind the visual */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-[#00c2ff]/15 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
          
          {/* Transparent 3D Tech Service Illustration */}
          <img
            src={`/images/services/${service.id}.png`}
            alt=""
            className="w-full h-full object-contain object-top-right opacity-30 group-hover:opacity-75 transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:-translate-y-1 group-hover:translate-x-1 select-none"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Card Content Top */}
        <div className="relative z-10">
          {/* Icon Container with Pale Cyan/Blue Gradient */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#E0F7FE] to-[#BAE6FD]/80 border border-[#08B9E8]/25 flex items-center justify-center text-[#0284c7] group-hover:text-[#00c2ff] group-hover:scale-105 group-hover:border-[#00c2ff]/50 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-[#00c2ff]/20">
            <div className="transition-transform duration-300 group-hover:rotate-3">
              {icon}
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B1726] group-hover:text-[#0284c7] transition-colors duration-200 mt-6 tracking-[-0.01em]">
            {service.title}
          </h3>

          {/* Description */}
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Card Footer: Explore Service Link with Moving Arrow & Animated Bottom Accent Line */}
        <div className="pt-6 mt-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#0284c7] group-hover:text-[#00a6e0] transition-colors duration-200">
            <span>Explore Service</span>
            <ArrowRight className="w-4 h-4 text-[#08B9E8] transition-transform duration-200 group-hover:translate-x-2" />
          </div>

          {/* Animated Bottom Cyan Progress Line */}
          <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-gradient-to-r from-[#08B9E8] to-[#00c2ff] transition-all duration-400 ease-out group-hover:w-full" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="pt-12 sm:pt-16 md:pt-20 pb-24 sm:pb-28 md:pb-32 bg-[#F5FAFD] text-[#0B1726] relative overflow-hidden selection:bg-[#08B9E8]/20 selection:text-[#08B9E8]"
    >
      {/* Background Technology-Inspired Ambience & Conveyor Keyframes */}
      <style>{`
        @keyframes conveyorInfinite {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes ambientFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-10px, -8px) scale(1.03);
          }
        }
        @keyframes networkPulse {
          0%, 100% {
            opacity: 0.65;
          }
          50% {
            opacity: 0.95;
          }
        }
        @keyframes waveFloat {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25px);
          }
        }
        .conveyor-track {
          display: flex;
          width: max-content;
          animation: conveyorInfinite 28s linear infinite;
        }
        .conveyor-track:hover {
          animation-play-state: paused;
        }
        .animate-ambient-float {
          animation: ambientFloat 16s ease-in-out infinite;
        }
        .animate-network-pulse {
          animation: networkPulse 12s ease-in-out infinite;
        }
        .animate-wave-float {
          animation: waveFloat 20s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .conveyor-track,
          .animate-ambient-float,
          .animate-network-pulse,
          .animate-wave-float {
            animation: none !important;
          }
        }
      `}</style>

      {/* ========================================================
          BACKGROUND LAYER 1: Soft Ambient Radial Gradients
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left Ambient Cyan Glow */}
        <div className="absolute -top-24 -left-24 w-[650px] h-[500px] bg-[radial-gradient(circle_at_30%_30%,rgba(8,185,232,0.08),transparent_65%)] blur-3xl animate-ambient-float" />
        
        {/* Top-Right Soft Blue/Cyan Glow */}
        <div className="absolute -top-16 -right-16 w-[600px] h-[450px] bg-[radial-gradient(circle_at_70%_30%,rgba(0,194,255,0.07),transparent_65%)] blur-3xl animate-ambient-float" style={{ animationDelay: '-6s' }} />
        
        {/* Bottom-Left Ambient Cyan Glow */}
        <div className="absolute -bottom-20 -left-12 w-[550px] h-[450px] bg-[radial-gradient(circle_at_40%_70%,rgba(8,185,232,0.06),transparent_65%)] blur-3xl animate-ambient-float" style={{ animationDelay: '-10s' }} />
        
        {/* Bottom-Right Subtle Blue Glow */}
        <div className="absolute -bottom-20 -right-12 w-[600px] h-[480px] bg-[radial-gradient(circle_at_70%_70%,rgba(2,132,199,0.05),transparent_65%)] blur-3xl animate-ambient-float" style={{ animationDelay: '-3s' }} />

        {/* Center subtle light depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] pointer-events-none" />
      </div>

      {/* ========================================================
          BACKGROUND LAYER 2: Subtle Digital Network & Flowing Lines Pattern
      ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-network-pulse"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.07" />
          </linearGradient>

          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* TOP-LEFT NETWORK CONSTELLATION */}
        <g stroke="url(#netGrad)" strokeWidth="1" fill="none">
          <line x1="4%" y1="8%" x2="11%" y2="16%" />
          <line x1="11%" y1="16%" x2="7%" y2="28%" />
          <line x1="11%" y1="16%" x2="18%" y2="20%" />
          <line x1="18%" y1="20%" x2="15%" y2="34%" />
          <line x1="7%" y1="28%" x2="15%" y2="34%" />
          <line x1="18%" y1="20%" x2="25%" y2="12%" />
          <line x1="4%" y1="8%" x2="2%" y2="22%" />
          <line x1="2%" y1="22%" x2="7%" y2="28%" />
        </g>
        <g fill="#08B9E8">
          <circle cx="4%" cy="8%" r="3" fillOpacity="0.3" />
          <circle cx="4%" cy="8%" r="1.5" fillOpacity="0.7" />
          <circle cx="11%" cy="16%" r="4" fillOpacity="0.25" filter="url(#nodeGlow)" />
          <circle cx="11%" cy="16%" r="2" fillOpacity="0.8" />
          <circle cx="7%" cy="28%" r="3" fillOpacity="0.3" />
          <circle cx="18%" cy="20%" r="3.5" fillOpacity="0.3" />
          <circle cx="18%" cy="20%" r="1.5" fillOpacity="0.8" />
          <circle cx="15%" cy="34%" r="2.5" fillOpacity="0.4" />
          <circle cx="25%" cy="12%" r="3" fillOpacity="0.25" />
          <circle cx="2%" cy="22%" r="2" fillOpacity="0.3" />
        </g>

        {/* TOP-RIGHT NETWORK CONSTELLATION */}
        <g stroke="url(#netGrad)" strokeWidth="1" fill="none">
          <line x1="96%" y1="10%" x2="88%" y2="18%" />
          <line x1="88%" y1="18%" x2="92%" y2="30%" />
          <line x1="88%" y1="18%" x2="80%" y2="22%" />
          <line x1="80%" y1="22%" x2="84%" y2="36%" />
          <line x1="92%" y1="30%" x2="84%" y2="36%" />
          <line x1="80%" y1="22%" x2="74%" y2="14%" />
          <line x1="96%" y1="10%" x2="98%" y2="25%" />
          <line x1="98%" y1="25%" x2="92%" y2="30%" />
        </g>
        <g fill="#00c2ff">
          <circle cx="96%" cy="10%" r="3" fillOpacity="0.3" />
          <circle cx="96%" cy="10%" r="1.5" fillOpacity="0.7" />
          <circle cx="88%" cy="18%" r="4" fillOpacity="0.25" filter="url(#nodeGlow)" />
          <circle cx="88%" cy="18%" r="2" fillOpacity="0.8" />
          <circle cx="92%" cy="30%" r="3" fillOpacity="0.3" />
          <circle cx="80%" cy="22%" r="3.5" fillOpacity="0.3" />
          <circle cx="80%" cy="22%" r="1.5" fillOpacity="0.8" />
          <circle cx="84%" cy="36%" r="2.5" fillOpacity="0.4" />
          <circle cx="74%" cy="14%" r="3" fillOpacity="0.25" />
          <circle cx="98%" cy="25%" r="2" fillOpacity="0.3" />
        </g>

        {/* BOTTOM-LEFT & BOTTOM-RIGHT CORNER NODES */}
        <g stroke="url(#netGrad)" strokeWidth="1" fill="none">
          <line x1="3%" y1="78%" x2="9%" y2="88%" />
          <line x1="9%" y1="88%" x2="16%" y2="82%" />
          <line x1="97%" y1="76%" x2="91%" y2="86%" />
          <line x1="91%" y1="86%" x2="83%" y2="80%" />
        </g>
        <g fill="#08B9E8">
          <circle cx="3%" cy="78%" r="2.5" fillOpacity="0.3" />
          <circle cx="9%" cy="88%" r="3" fillOpacity="0.25" />
          <circle cx="16%" cy="82%" r="2" fillOpacity="0.4" />
          <circle cx="97%" cy="76%" r="2.5" fillOpacity="0.3" />
          <circle cx="91%" cy="86%" r="3" fillOpacity="0.25" />
          <circle cx="83%" cy="80%" r="2" fillOpacity="0.4" />
        </g>
      </svg>

      {/* ========================================================
          BACKGROUND LAYER 3: Subtle Flowing Wave Curves (Near Bottom)
      ======================================================== */}
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-0 overflow-hidden opacity-60 animate-wave-float">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <path
            d="M-50,130 C220,70 540,170 880,100 C1180,40 1350,140 1500,90"
            stroke="#08B9E8"
            strokeWidth="1.2"
            strokeOpacity="0.07"
            strokeDasharray="5 7"
          />
          <path
            d="M-50,165 C300,110 650,200 1000,125 C1300,65 1420,150 1500,120"
            stroke="#00c2ff"
            strokeWidth="1"
            strokeOpacity="0.05"
          />
        </svg>
      </div>

      {/* ========================================================
          MAIN CONTENT LAYER (z-10 above all background effects)
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8 sm:mb-12">
        {/* Section Header */}
        <div
          className={`max-w-3xl text-left transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Eyebrow */}
          <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] text-[#08B9E8] uppercase mb-3">
            WHAT WE DO
          </div>
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1726] tracking-[-0.03em] leading-tight">
            Our Services
          </h2>
          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            End-to-end technology solutions that help businesses build, transform, and grow in a digital-first world.
          </p>
        </div>
      </div>

      {/* Full-width Conveyor Belt Track Container with Navigation Controls */}
      <div className="relative w-full overflow-hidden py-4 z-10">
        {/* Left Side Circular Navigation Control */}
        <button
          onClick={() => handleNudge('left')}
          aria-label="Previous service"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 border border-slate-200/90 text-[#08B9E8] hover:text-[#00c2ff] hover:border-[#00c2ff] hover:scale-105 transition-all duration-200 shadow-lg shadow-black/5 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#08B9E8]/50 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Right Side Circular Navigation Control */}
        <button
          onClick={() => handleNudge('right')}
          aria-label="Next service"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 border border-slate-200/90 text-[#08B9E8] hover:text-[#00c2ff] hover:border-[#00c2ff] hover:scale-105 transition-all duration-200 shadow-lg shadow-black/5 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#08B9E8]/50 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Seamless Edge Gradient Fades for Conveyor Belt Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#F5FAFD] via-[#F5FAFD]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#F5FAFD] via-[#F5FAFD]/80 to-transparent z-20" />

        {/* Continuous Seamless Infinite Moving Track */}
        <div ref={scrollContainerRef} className="overflow-hidden">
          <div className="conveyor-track">
            {/* First Set of 6 Services */}
            <div className="flex shrink-0 gap-6 sm:gap-8 pr-6 sm:pr-8">
              {REQUIN_SERVICES.map((service) => renderServiceCard(service, 'set1'))}
            </div>

            {/* Second Set of 6 Services (Exact clone for mathematically seamless infinite loop) */}
            <div className="flex shrink-0 gap-6 sm:gap-8 pr-6 sm:pr-8">
              {REQUIN_SERVICES.map((service) => renderServiceCard(service, 'set2'))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Pagination Indicator Pills (matching reference) */}
      <div className="flex items-center justify-center gap-2 mt-8 z-10 relative">
        {[0, 1, 2, 3].map((dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => {
              setActiveDot(dotIndex);
              handleNudge(dotIndex > activeDot ? 'right' : 'left');
            }}
            aria-label={`Go to slide page ${dotIndex + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
              activeDot === dotIndex
                ? 'w-8 bg-[#08B9E8] shadow-sm shadow-[#08B9E8]/30'
                : 'w-6 bg-[#BAE6FD]/60 hover:bg-[#BAE6FD]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
