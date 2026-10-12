import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  CheckCircle2,
  Building2,
  MapPin,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { testimonialService, TestimonialItem } from '../services/testimonialService';

// Enriched initial dataset with prominent roles, companies, locations, and high-impact quotes
export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rohan-agarwal',
    name: 'Rohan Agarwal',
    role: 'Managing Director & Founder',
    company: 'Spice Symphony Hospitality Group',
    location: 'Jaipur, India',
    quote: 'Requin Solutions completely overhauled our digital dining platform. Our online reservations and automated table order processing surged by 45% within the first eight weeks, creating an effortlessly synchronized guest experience across all four branches.',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    isHighlighted: true,
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Founder & Chief Executive Officer',
    company: 'Lumina Luxe Apparel',
    location: 'Austin, Texas',
    quote: 'The custom enterprise web store engineered by Requin handled over 25,000 concurrent orders during Black Friday without a single second of latency. Their architecture is resilient, and their engineering team is exceptional.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    isHighlighted: true,
  },
  {
    id: 'lucas-miller',
    name: 'Lucas Miller',
    role: 'Director of Supply Chain & Ops',
    company: 'Apex Global Wholesale B2B',
    location: 'Frankfurt, Germany',
    quote: 'Inventory synchronization across three European fulfillment hubs and automated bulk invoicing became 10x faster. What used to take our dispatch crew hours every morning is now finished in just a few clicks.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    isHighlighted: false,
  },
  {
    id: 'vikram-rathore',
    name: 'Vikramaditya Rathore',
    role: 'Managing Director',
    company: 'Rathore Heritage Exports',
    location: 'Jodhpur, India',
    quote: 'Our international buyers now explore high-resolution 3D catalogs and finalize multi-currency purchase orders smoothly. The platform Requin built elevated our brand authority on the global trade stage.',
    image: 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    isHighlighted: false,
  },
  {
    id: 'marco-rossi',
    name: 'Marco Rossi',
    role: 'Vice President of Logistics',
    company: 'Rossi Trans-Continental Freight',
    location: 'Milan, Italy',
    quote: 'Real-time telemetry, automated driver route optimization, and proactive client notifications cut our missed delivery windows to near zero. Requin delivered enterprise-grade excellence on time.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    isHighlighted: false,
  },
  {
    id: 'suresh-patel',
    name: 'Suresh Patel',
    role: 'Chief Operating Officer',
    company: 'MegaMart Retail Superstores',
    location: 'Ahmedabad, India',
    quote: 'The high-speed barcode POS, dynamic stock forecasting, and daily financial audit dashboards save our store managers over two hours every night. It has become our business backbone.',
    image: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    isHighlighted: false,
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'Chief Executive Officer',
    company: 'Pacifica Cross-Border Trade Links',
    location: 'Singapore',
    quote: 'Their multi-currency billing and automated quote engine cut our client negotiation cycle in half. Requin understood the nuances of cross-border compliance and executed with surgical precision.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    isHighlighted: false,
  },
  {
    id: 'pooja-sharma',
    name: 'Pooja Sharma',
    role: 'Co-Founder & Creative Director',
    company: 'Vogue Craft Studio',
    location: 'New Delhi, India',
    quote: 'From custom inventory tracking to omnichannel customer notifications, our retail workflows are now completely automated. Requin gave our boutique label the technical scale of a major brand.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    isHighlighted: false,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isFading, setIsFading] = useState(false);

  // Mobile touch swipe gestures
  const touchStartXRef = React.useRef<number | null>(null);
  const touchEndXRef = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      if (distance > 45) {
        handleNext();
      } else if (distance < -45) {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

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

  const triggerSlide = useCallback(
    (newIndex: number, dir: 'next' | 'prev') => {
      setDirection(dir);
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setIsFading(false);
      }, 180);
    },
    []
  );

  const handlePrev = useCallback(() => {
    if (testimonials.length === 0) return;
    const nextIdx = currentIndex <= 0 ? testimonials.length - 1 : currentIndex - 1;
    triggerSlide(nextIdx, 'prev');
  }, [currentIndex, testimonials.length, triggerSlide]);

  const handleNext = useCallback(() => {
    if (testimonials.length === 0) return;
    const nextIdx = currentIndex >= testimonials.length - 1 ? 0 : currentIndex + 1;
    triggerSlide(nextIdx, 'next');
  }, [currentIndex, testimonials.length, triggerSlide]);

  const handleSelect = (index: number) => {
    if (index === currentIndex) return;
    triggerSlide(index, index > currentIndex ? 'next' : 'prev');
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Autoplay loop with hover-pause
  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length, isPaused, handleNext]);

  const current = testimonials[currentIndex] || DEFAULT_TESTIMONIALS[0];

  // Helper to resolve company name cleanly if not explicitly set
  const resolveCompany = (item: TestimonialItem) => {
    if (item.company && item.company.trim()) return item.company;
    if (item.role && item.role.includes(' at ')) {
      return item.role.split(' at ')[1];
    }
    if (item.role && item.role.includes(',')) {
      return item.role.split(',')[1].trim();
    }
    return 'Enterprise Partner';
  };

  return (
    <section
      id="testimonials"
      className="pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28 bg-[#F5FAFD] text-[#0B1726] relative overflow-hidden selection:bg-[#0088EE]/20 selection:text-[#0088EE]"
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
      `}</style>

      {/* ========================================================
          BACKGROUND LAYER 1: Soft Ambient Light Blue & Cyan Glows
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Center Ambient Cyan Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-[radial-gradient(circle,rgba(0,136,238,0.10),transparent_70%)] blur-3xl animate-testimonial-float" />
        
        {/* Top-Left Sky Blue Accent */}
        <div className="absolute top-10 -left-20 w-[520px] h-[460px] bg-[radial-gradient(circle,rgba(0,194,255,0.08),transparent_65%)] blur-3xl" />
        
        {/* Bottom-Right Soft Cyan Glow */}
        <div className="absolute -bottom-20 -right-20 w-[620px] h-[520px] bg-[radial-gradient(circle,rgba(8,185,232,0.08),transparent_70%)] blur-3xl animate-testimonial-float" style={{ animationDelay: '-5s' }} />

        {/* Center subtle light depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.75),transparent_70%)] pointer-events-none" />
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
            <stop offset="0%" stopColor="#0088EE" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.08" />
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
        <g fill="#0088EE">
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
          HEADER CONTENT & TRUST BANNER
      ======================================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0088EE]/10 border border-[#0088EE]/20 text-[#0088EE] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0088EE] animate-pulse" />
          Client Stories & Trust
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-[1.15]">
          Our Clients <span className="bg-gradient-to-r from-[#0088EE] via-[#00A3FF] to-[#08B9E8] bg-clip-text text-transparent">Love Us</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
          Read verified experiences from founders, directors, and enterprise executives who scale their businesses with Requin Solutions.
        </p>

        {/* Trust summary pill badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-700">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span><strong className="text-[#0B1726]">4.9 / 5</strong> Rating (150+ Reviews)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span><strong className="text-[#0B1726]">98%</strong> Client Retention</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-700">
            <Award className="w-3.5 h-3.5 text-[#0088EE]" />
            <span><strong className="text-[#0B1726]">100%</strong> Verified Feedback</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          LARGE FEATURED TESTIMONIAL CARD
      ======================================================== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/90 shadow-[0_25px_65px_-15px_rgba(0,136,238,0.14),0_10px_25px_-5px_rgba(11,23,38,0.04)] overflow-hidden transition-all duration-300"
        >
          {/* Top Brand Radiant Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#0088EE] via-[#00C2FF] to-[#08B9E8]" />

          <div className="p-5 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: Client Visual Anchor (35% width on large screens) */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                
                {/* Portrait Container with Ambient Ring & Floating Verified Badge */}
                <div className="relative mb-5 group">
                  <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-4 ring-[#0088EE]/15 bg-slate-100 transition-all duration-500">
                    <img
                      src={current.image}
                      alt={current.name}
                      key={current.id}
                      className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                        isFading ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                      }`}
                      loading="lazy"
                    />
                  </div>

                  {/* Verified Partner Badge */}
                  <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Client
                    </span>
                  </div>
                </div>

                {/* 5 Stars Rating Display */}
                <div className="flex items-center gap-1 mt-2 mb-2 text-amber-400">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current filter drop-shadow-sm" />
                  ))}
                </div>

                {/* Location Badge */}
                {current.location && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium px-3 py-1 rounded-lg bg-[#F5FAFD] border border-slate-200/80 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0088EE] shrink-0" />
                    <span>{current.location}</span>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: The Large Readable Quote & Hierarchy (65% width) */}
              <div
                className={`lg:col-span-7 flex flex-col justify-between text-left transition-all duration-300 ${
                  isFading
                    ? direction === 'next'
                      ? 'opacity-30 translate-x-3'
                      : 'opacity-30 -translate-x-3'
                    : 'opacity-100 translate-x-0'
                }`}
              >
                {/* Watermark Quote Icon */}
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 flex items-center justify-center shadow-sm">
                    <Quote className="w-6 h-6 rotate-180" />
                  </div>

                  {/* Story Counter Badge */}
                  <div className="text-xs font-extrabold tracking-widest text-[#0088EE] uppercase px-3 py-1 rounded-full bg-[#E0F2FE]/60 border border-[#0088EE]/20">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                  </div>
                </div>

                {/* Large, Readable, Impactful Quote */}
                <blockquote className="text-base sm:text-xl lg:text-[22px] text-[#0B1726] font-medium leading-[1.65] sm:leading-[1.6] italic my-4 sm:my-5 select-text">
                  "{current.quote}"
                </blockquote>

                {/* Visual Hierarchy: Name, Designation, and Company */}
                <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                  <div className="space-y-1">
                    {/* 1. Client's Full Name (Primary Level) */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1726] tracking-tight">
                      {current.name}
                    </h3>

                    {/* 2. Designation / Role (Secondary Level - Vibrant Brand Cyan/Blue) */}
                    <div className="text-sm sm:text-base font-bold text-[#0088EE] tracking-wide">
                      {current.role}
                    </div>

                    {/* 3. Company Name (Tertiary Level - Clean Enterprise Typography) */}
                    <div className="text-sm font-semibold text-slate-700 flex items-center gap-1.5 pt-0.5">
                      <Building2 className="w-4 h-4 text-[#0088EE] shrink-0" />
                      <span>{resolveCompany(current)}</span>
                    </div>
                  </div>

                  {/* Prominent Navigation Arrow Buttons */}
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 shrink-0 self-center sm:self-auto pt-2 sm:pt-0">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="group w-12 h-12 rounded-2xl bg-[#F5FAFD] border border-slate-200/90 text-slate-700 hover:text-[#0088EE] hover:bg-white hover:border-[#0088EE]/40 hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0088EE]/40"
                    >
                      <ChevronLeft className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-x-0.5" />
                    </button>

                    <button
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="group w-12 h-12 rounded-2xl bg-gradient-to-r from-[#0088EE] via-[#0099FF] to-[#08B9E8] hover:from-[#0077CC] hover:to-[#0099FF] text-white shadow-md shadow-[#0088EE]/30 hover:shadow-lg hover:shadow-[#0088EE]/45 hover:scale-105 transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0088EE]/40"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            CLICKABLE PAGINATION DOTS
        ======================================================== */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((item, dotIndex) => (
            <button
              key={`dot-${item.id}`}
              onClick={() => handleSelect(dotIndex)}
              aria-label={`View testimonial from ${item.name}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                currentIndex === dotIndex
                  ? 'w-10 bg-gradient-to-r from-[#0088EE] to-[#08B9E8] shadow-sm shadow-[#0088EE]/40'
                  : 'w-2.5 bg-slate-200 hover:bg-[#0088EE]/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
