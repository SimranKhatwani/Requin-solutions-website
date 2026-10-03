import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialService, TestimonialItem } from '../services/testimonialService';

// Default initial dataset (Indian + Foreign business clients)
export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rohan-agarwal',
    name: 'Rohan Agarwal',
    role: 'Restaurant Owner',
    quote: 'Our table booking and online food orders grew by 45% within two months.',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80',
    isHighlighted: false,
  },
  {
    id: 'lucas-miller',
    name: 'Lucas Miller',
    role: 'Wholesaler',
    quote: 'Inventory tracking and bulk supply invoices became 10x faster for our business.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    isHighlighted: false,
  },
  {
    id: 'vikram-rathore',
    name: 'Vikramaditya Rathore',
    role: 'Businessman',
    quote: 'The digital catalog and billing system made festive sales completely smooth.',
    image: 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?auto=format&fit=crop&w=600&q=80',
    isHighlighted: false,
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'E-Commerce Founder',
    quote: 'The custom web store handled 20,000+ daily orders seamlessly without lagging.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    isHighlighted: false,
  },
  {
    id: 'suresh-patel',
    name: 'Suresh Patel',
    role: 'Supermarket Owner',
    quote: 'Barcode billing and profit reports save us over 2 hours every evening.',
    image: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=600&q=80',
    isHighlighted: false,
  },
  {
    id: 'marco-rossi',
    name: 'Marco Rossi',
    role: 'Logistics Director',
    quote: 'Live fleet route tracking and automated dispatch eliminated delivery delays.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    isHighlighted: false,
  },
  {
    id: 'pooja-sharma',
    name: 'Pooja Sharma',
    role: 'Retail Store Owner',
    quote: 'Customer order management and stock alerts are now completely automated.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    isHighlighted: false,
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'Import-Export Trader',
    quote: 'Multi-currency billing and quote generator cut our client reply time in half.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    isHighlighted: false,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isNudgingRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);

  // Fetch dynamic testimonials from CMS API (falls back gracefully to DEFAULT_TESTIMONIALS)
  useEffect(() => {
    testimonialService
      .getPublishedTestimonials()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTestimonials(res.data);
        }
      })
      .catch((err) => {
        console.warn('Using default client reviews list:', err);
      });
  }, []);

  // Continuous Seamless Infinite Auto-Scroll Loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || testimonials.length === 0) return;

    // Center scroll position at Set 1 initially so user can scroll left or right immediately
    const initPosition = () => {
      const setWidth = container.scrollWidth / 4;
      if (setWidth > 0 && (container.scrollLeft === 0 || container.scrollLeft < setWidth / 2)) {
        container.scrollLeft = setWidth;
      }
    };
    const initTimer = setTimeout(initPosition, 80);

    const speed = 0.75; // px per frame: silky smooth 60fps movement

    const step = () => {
      if (container && !isHoveredRef.current && !isNudgingRef.current) {
        const setWidth = container.scrollWidth / 4;
        if (setWidth > 0) {
          container.scrollLeft += speed;
          // When we pass Set 2, seamlessly wrap back to Set 1 without any visual flicker
          if (container.scrollLeft >= setWidth * 2) {
            container.scrollLeft -= setWidth;
          } else if (container.scrollLeft < setWidth) {
            container.scrollLeft += setWidth;
          }
        }
      }
      animationFrameIdRef.current = requestAnimationFrame(step);
    };

    animationFrameIdRef.current = requestAnimationFrame(step);

    return () => {
      clearTimeout(initTimer);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [testimonials]);

  // Cycle active dot periodically
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Smooth Nudge Left or Right without ever hitting empty bounds
  const handleNudge = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    isNudgingRef.current = true;
    const nudgeAmount = 330; // 1 card + gap
    const target = direction === 'left' ? container.scrollLeft - nudgeAmount : container.scrollLeft + nudgeAmount;

    container.scrollTo({
      left: target,
      behavior: 'smooth',
    });

    setTimeout(() => {
      if (container) {
        const setWidth = container.scrollWidth / 4;
        if (setWidth > 0) {
          if (container.scrollLeft >= setWidth * 2) {
            container.scrollLeft -= setWidth;
          } else if (container.scrollLeft < setWidth) {
            container.scrollLeft += setWidth;
          }
        }
      }
      isNudgingRef.current = false;
    }, 420);

    setActiveDot((prev) =>
      direction === 'left' ? (prev <= 0 ? testimonials.length - 1 : prev - 1) : (prev + 1) % testimonials.length
    );
  };

  // Render a single testimonial card
  const renderCard = (item: TestimonialItem, prefix: string) => {
    const isSelected = selectedCardId === item.id;

    return (
      <div
        key={`${prefix}-${item.id}`}
        onClick={() => setSelectedCardId((prev) => (prev === item.id ? null : item.id))}
        className={`w-[270px] sm:w-[300px] lg:w-[320px] shrink-0 rounded-3xl overflow-hidden text-left transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group cursor-pointer select-none ${
          isSelected
            ? 'bg-white border-2 border-[#08B9E8] shadow-[0_12px_35px_-4px_rgba(8,185,232,0.4),0_0_20px_2px_rgba(8,185,232,0.25)] ring-2 ring-[#08B9E8]/30 scale-[1.02]'
            : 'bg-white border border-slate-200/90 hover:border-[#08B9E8]/60 shadow-[0_4px_20px_-4px_rgba(8,185,232,0.08),0_2px_8px_-2px_rgba(11,23,38,0.04)] hover:shadow-[0_20px_45px_-10px_rgba(8,185,232,0.22)]'
        }`}
      >
        {/* Client Portrait Photo */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent opacity-40" />
        </div>

        {/* Testimonial Quote & Info Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
          <div>
            <h3
              className={`text-lg font-bold transition-colors ${
                isSelected ? 'text-[#0284c7]' : 'text-[#0B1726] group-hover:text-[#0284c7]'
              }`}
            >
              {item.name}
            </h3>
            <div className="text-xs text-[#08B9E8] font-bold uppercase tracking-wider mt-0.5 mb-3">
              {item.role}
            </div>
          </div>

          {/* 1-Line Clean Quote */}
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed italic border-t border-slate-100 pt-3">
            "{item.quote}"
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      className="pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28 bg-[#F5FAFD] text-[#0B1726] relative overflow-hidden selection:bg-[#08B9E8]/20 selection:text-[#08B9E8]"
    >
      {/* Dynamic Keyframes for ambient lighting */}
      <style>{`
        @keyframes ambientTestimonialFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-12px, -10px) scale(1.04);
          }
        }
        @keyframes testimonialNetworkPulse {
          0%, 100% {
            opacity: 0.65;
          }
          50% {
            opacity: 0.95;
          }
        }
        .animate-testimonial-float {
          animation: ambientTestimonialFloat 14s ease-in-out infinite;
        }
        .animate-testimonial-pulse {
          animation: testimonialNetworkPulse 12s ease-in-out infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* ========================================================
          BACKGROUND LAYER 1: Soft Ambient Light Blue & Cyan Radial Glows
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Center Ambient Cyan Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(8,185,232,0.12),transparent_70%)] blur-3xl animate-testimonial-float" />
        
        {/* Top-Left Sky Blue Accent */}
        <div className="absolute top-10 -left-20 w-[500px] h-[450px] bg-[radial-gradient(circle,rgba(0,194,255,0.08),transparent_65%)] blur-3xl" />
        
        {/* Bottom-Right Soft Cyan Glow */}
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(2,132,199,0.08),transparent_70%)] blur-3xl animate-testimonial-float" style={{ animationDelay: '-5s' }} />

        {/* Center subtle light depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] pointer-events-none" />
      </div>

      {/* ========================================================
          BACKGROUND LAYER 2: Digital Network Constellation Web
      ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-testimonial-pulse"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lightBlueNetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
          </linearGradient>

          <filter id="lightNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Network Constellation */}
        <g stroke="url(#lightBlueNetGrad)" strokeWidth="1" fill="none">
          <line x1="2%" y1="12%" x2="10%" y2="24%" />
          <line x1="10%" y1="24%" x2="5%" y2="38%" />
          <line x1="10%" y1="24%" x2="18%" y2="18%" />
          <line x1="18%" y1="18%" x2="15%" y2="42%" />
          <line x1="5%" y1="38%" x2="15%" y2="42%" />
          <line x1="18%" y1="18%" x2="26%" y2="10%" />
          <line x1="2%" y1="12%" x2="1%" y2="30%" />
          <line x1="1%" y1="30%" x2="5%" y2="38%" />
        </g>
        <g fill="#08B9E8">
          <circle cx="2%" cy="12%" r="2.5" fillOpacity="0.4" />
          <circle cx="10%" cy="24%" r="3.5" fillOpacity="0.3" filter="url(#lightNodeGlow)" />
          <circle cx="10%" cy="24%" r="2" fillOpacity="0.7" />
          <circle cx="5%" cy="38%" r="2.5" fillOpacity="0.4" />
          <circle cx="18%" cy="18%" r="3" fillOpacity="0.5" />
          <circle cx="15%" cy="42%" r="2" fillOpacity="0.4" />
          <circle cx="26%" cy="10%" r="3" fillOpacity="0.4" />
        </g>

        {/* Right Network Constellation */}
        <g stroke="url(#lightBlueNetGrad)" strokeWidth="1" fill="none">
          <line x1="98%" y1="14%" x2="90%" y2="22%" />
          <line x1="90%" y1="22%" x2="94%" y2="36%" />
          <line x1="90%" y1="22%" x2="82%" y2="26%" />
          <line x1="82%" y1="26%" x2="86%" y2="42%" />
          <line x1="94%" y1="36%" x2="86%" y2="42%" />
          <line x1="82%" y1="26%" x2="76%" y2="16%" />
        </g>
        <g fill="#00c2ff">
          <circle cx="98%" cy="14%" r="2.5" fillOpacity="0.4" />
          <circle cx="90%" cy="22%" r="3.5" fillOpacity="0.3" filter="url(#lightNodeGlow)" />
          <circle cx="90%" cy="22%" r="2" fillOpacity="0.7" />
          <circle cx="94%" cy="36%" r="2.5" fillOpacity="0.4" />
          <circle cx="82%" cy="26%" r="3" fillOpacity="0.5" />
          <circle cx="86%" cy="42%" r="2" fillOpacity="0.4" />
          <circle cx="76%" cy="16%" r="3" fillOpacity="0.4" />
        </g>
      </svg>

      {/* ========================================================
          HEADER CONTENT
      ======================================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 mb-12 sm:mb-16">
        <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] text-[#08B9E8] uppercase mb-3">
          Client Feedback
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1726] tracking-[-0.03em] leading-tight">
          Our Clients Love Us
        </h2>

        

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
          See what our clients have to say about their experience working with us.
          <br className="hidden sm:inline" />
          {' '}We pride ourselves on delivering exceptional service and results.
        </p>
      </div>

      {/* ========================================================
          CONTINUOUS MOVING CONVEYOR BELT TRACK
      ======================================================== */}
      <div className="relative w-full overflow-hidden py-4 z-10">
        
        {/* Left Circular Navigation Button */}
        <button
          onClick={() => handleNudge('left')}
          aria-label="Previous client review"
          className="absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 border border-slate-200 text-[#08B9E8] hover:text-[#00c2ff] hover:border-[#08B9E8] hover:scale-110 transition-all duration-200 shadow-xl flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#08B9E8]/50 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Right Circular Navigation Button */}
        <button
          onClick={() => handleNudge('right')}
          aria-label="Next client review"
          className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 border border-slate-200 text-[#08B9E8] hover:text-[#00c2ff] hover:border-[#08B9E8] hover:scale-110 transition-all duration-200 shadow-xl flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#08B9E8]/50 active:scale-95"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Left & Right Edge Seamless Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-[#F5FAFD] via-[#F5FAFD]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-[#F5FAFD] via-[#F5FAFD]/80 to-transparent z-20" />

        {/* Moving Track Container with 4x Buffer for True Infinite Wrap */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          className="overflow-x-auto scrollbar-none flex select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Set 1 */}
          <div className="flex shrink-0 gap-6 sm:gap-7 pr-6 sm:pr-7">
            {testimonials.map((item) => renderCard(item, 'set1'))}
          </div>

          {/* Set 2 */}
          <div className="flex shrink-0 gap-6 sm:gap-7 pr-6 sm:pr-7">
            {testimonials.map((item) => renderCard(item, 'set2'))}
          </div>

          {/* Set 3 */}
          <div className="flex shrink-0 gap-6 sm:gap-7 pr-6 sm:pr-7">
            {testimonials.map((item) => renderCard(item, 'set3'))}
          </div>

          {/* Set 4 */}
          <div className="flex shrink-0 gap-6 sm:gap-7 pr-6 sm:pr-7">
            {testimonials.map((item) => renderCard(item, 'set4'))}
          </div>
        </div>
      </div>

      {/* ========================================================
          BOTTOM PAGINATION INDICATOR DOTS
      ======================================================== */}
      <div className="flex items-center justify-center gap-2 mt-8 z-10 relative">
        {testimonials.map((item, dotIndex) => (
          <button
            key={`dot-${item.id}`}
            onClick={() => handleNudge(dotIndex > activeDot ? 'right' : 'left')}
            aria-label={`View feedback from ${item.name}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
              activeDot === dotIndex
                ? 'w-8 bg-[#08B9E8] shadow-sm shadow-[#08B9E8]/40'
                : 'w-2.5 bg-[#BAE6FD]/70 hover:bg-[#BAE6FD]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
