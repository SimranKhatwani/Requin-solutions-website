import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  BarChart3,
  CheckCircle2,
  Users,
  Award,
  Building2,
  AppWindow,
  ArrowRight,
} from 'lucide-react';

interface ExperienceSectionProps {
  onLearnMore?: () => void;
  onContact?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onLearnMore,
  onContact,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasCounted, setHasCounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Animated counters state
  const [appsCount, setAppsCount] = useState(0);
  const [consultantsCount, setConsultantsCount] = useState(0);
  const [awardsCount, setAwardsCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);

  // Intersection observer for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Count-up animation on entrance
  useEffect(() => {
    if (!isVisible || hasCounted) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setAppsCount(2);
      setConsultantsCount(40);
      setAwardsCount(12);
      setEmployeesCount(100);
      setHasCounted(true);
      return;
    }

    setHasCounted(true);
    const duration = 1400; // ms
    const startTime = performance.now();

    const targetApps = 2;
    const targetConsultants = 40;
    const targetAwards = 12;
    const targetEmployees = 100;

    const animateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAppsCount(Math.floor(easeOut * targetApps));
      setConsultantsCount(Math.floor(easeOut * targetConsultants));
      setAwardsCount(Math.floor(easeOut * targetAwards));
      setEmployeesCount(Math.floor(easeOut * targetEmployees));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setAppsCount(targetApps);
        setConsultantsCount(targetConsultants);
        setAwardsCount(targetAwards);
        setEmployeesCount(targetEmployees);
      }
    };

    requestAnimationFrame(animateCounters);
  }, [isVisible, hasCounted]);

  const handleContactAction = () => {
    if (onContact) {
      onContact();
      return;
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onLearnMore) {
      onLearnMore();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-6 sm:py-10 lg:py-14 bg-[#F5FAFD] text-[#061827] relative overflow-hidden font-sans select-none"
    >
      {/* ========================================================
          BACKGROUND LAYER 1: Soft Cyan Ambient Gradients
      ======================================================== */}
      <div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-[#08B9E8]/[0.08] blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-[560px] h-[560px] bg-[#00c2ff]/[0.09] blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[#E0F2FE]/40 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================
          BACKGROUND LAYER 2: Technology Constellation Network
      ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="netGradExp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#08B9E8" stopOpacity="0.05" />
          </linearGradient>
          <filter id="nodeGlowExp" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
          </filter>
        </defs>

        {/* TOP-LEFT NETWORK CONSTELLATION */}
        <g stroke="url(#netGradExp)" strokeWidth="1" fill="none">
          <line x1="3%" y1="8%" x2="10%" y2="15%" />
          <line x1="10%" y1="15%" x2="6%" y2="28%" />
          <line x1="10%" y1="15%" x2="18%" y2="22%" />
          <line x1="18%" y1="22%" x2="14%" y2="38%" />
          <line x1="6%" y1="28%" x2="14%" y2="38%" />
          <line x1="18%" y1="22%" x2="26%" y2="14%" />
          <line x1="3%" y1="8%" x2="2%" y2="24%" />
          <line x1="2%" y1="24%" x2="6%" y2="28%" />
        </g>
        <g fill="#08B9E8">
          <circle cx="3%" cy="8%" r="3" fillOpacity="0.35" />
          <circle cx="3%" cy="8%" r="1.5" fillOpacity="0.8" />
          <circle cx="10%" cy="15%" r="4" fillOpacity="0.3" filter="url(#nodeGlowExp)" />
          <circle cx="10%" cy="15%" r="2" fillOpacity="0.85" />
          <circle cx="6%" cy="28%" r="3" fillOpacity="0.35" />
          <circle cx="18%" cy="22%" r="3.5" fillOpacity="0.3" />
          <circle cx="18%" cy="22%" r="1.5" fillOpacity="0.8" />
          <circle cx="14%" cy="38%" r="2.5" fillOpacity="0.4" />
          <circle cx="26%" cy="14%" r="3" fillOpacity="0.25" />
          <circle cx="2%" cy="24%" r="2" fillOpacity="0.35" />
        </g>

        {/* TOP-RIGHT NETWORK CONSTELLATION */}
        <g stroke="url(#netGradExp)" strokeWidth="1" fill="none">
          <line x1="96%" y1="12%" x2="88%" y2="20%" />
          <line x1="88%" y1="20%" x2="92%" y2="34%" />
          <line x1="88%" y1="20%" x2="80%" y2="24%" />
          <line x1="80%" y1="24%" x2="84%" y2="38%" />
          <line x1="92%" y1="34%" x2="84%" y2="38%" />
          <line x1="80%" y1="24%" x2="72%" y2="16%" />
          <line x1="96%" y1="12%" x2="98%" y2="28%" />
          <line x1="98%" y1="28%" x2="92%" y2="34%" />
        </g>
        <g fill="#00c2ff">
          <circle cx="96%" cy="12%" r="3" fillOpacity="0.35" />
          <circle cx="96%" cy="12%" r="1.5" fillOpacity="0.8" />
          <circle cx="88%" cy="20%" r="4" fillOpacity="0.3" filter="url(#nodeGlowExp)" />
          <circle cx="88%" cy="20%" r="2" fillOpacity="0.85" />
          <circle cx="92%" cy="34%" r="3" fillOpacity="0.35" />
          <circle cx="80%" cy="24%" r="3.5" fillOpacity="0.3" />
          <circle cx="80%" cy="24%" r="1.5" fillOpacity="0.8" />
          <circle cx="84%" cy="38%" r="2.5" fillOpacity="0.4" />
          <circle cx="72%" cy="16%" r="3" fillOpacity="0.25" />
          <circle cx="98%" cy="28%" r="2" fillOpacity="0.35" />
        </g>

        {/* BOTTOM-LEFT & BOTTOM-RIGHT CORNER NODES */}
        <g stroke="url(#netGradExp)" strokeWidth="1" fill="none">
          <line x1="4%" y1="76%" x2="10%" y2="88%" />
          <line x1="10%" y1="88%" x2="18%" y2="80%" />
          <line x1="96%" y1="74%" x2="90%" y2="86%" />
          <line x1="90%" y1="86%" x2="81%" y2="78%" />
        </g>
        <g fill="#08B9E8">
          <circle cx="4%" cy="76%" r="2.5" fillOpacity="0.35" />
          <circle cx="10%" cy="88%" r="3" fillOpacity="0.3" />
          <circle cx="18%" cy="80%" r="2" fillOpacity="0.4" />
          <circle cx="96%" cy="74%" r="2.5" fillOpacity="0.35" />
          <circle cx="90%" cy="86%" r="3" fillOpacity="0.3" />
          <circle cx="81%" cy="78%" r="2" fillOpacity="0.4" />
        </g>
      </svg>

      {/* ========================================================
          BACKGROUND LAYER 3: Flowing Decorative Curves (Near Bottom)
      ======================================================== */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-0 overflow-hidden opacity-50">
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M-50,110 C240,60 560,150 900,90 C1200,30 1370,120 1500,80"
            stroke="#08B9E8"
            strokeWidth="1.2"
            strokeOpacity="0.08"
            strokeDasharray="4 6"
          />
          <path
            d="M-50,140 C320,95 680,180 1020,115 C1320,60 1430,135 1500,110"
            stroke="#00c2ff"
            strokeWidth="1"
            strokeOpacity="0.06"
          />
        </svg>
      </div>

      {/* ========================================================
          MAIN CONTENT: 2-Column Split Layout
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Large Team Workspace Image & 3 Floating Callouts
          ======================================================== */}
          <div
            className={`lg:col-span-6 relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Ambient Cyan Soft Glow behind image */}
            <div
              className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#08B9E8]/25 blur-3xl rounded-full pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-8 -left-8 w-56 h-56 bg-[#00c2ff]/20 blur-2xl rounded-full pointer-events-none"
              aria-hidden="true"
            />

            {/* Main Rounded Image Container with Smooth Curved Ends */}
            <div className="relative rounded-[32px] overflow-hidden bg-white border border-white/90 shadow-[0_24px_54px_rgba(8,185,232,0.18)] group">
              <img
                src="/images/experience-team-collaboration.jpg"
                alt="Requin Solutions Engineering Team Collaborating"
                className="w-full h-[360px] sm:h-[430px] md:h-[470px] lg:h-[450px] xl:h-[480px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Soft cyan bottom atmospheric gradient matching reference */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08B9E8]/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* ----------------------------------------------------
                FLOATING CALLOUT 1: Top-Left ("Clean Code / Better Solutions")
            ---------------------------------------------------- */}
            <div className="absolute -top-4 -left-3 sm:-top-6 sm:-left-6 z-20 animate-float-gentle">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/90 shadow-[0_12px_32px_rgba(8,185,232,0.18)] flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E1F7FD] flex items-center justify-center text-[#08B9E8] shadow-inner shrink-0">
                  <Code2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#061827] leading-tight">
                    Clean Code
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    Better Solutions
                  </div>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------
                FLOATING CALLOUT 2: Top-Right (Chart Graphic + Plan / Build / Launch)
            ---------------------------------------------------- */}
            <div className="absolute -top-4 -right-3 sm:-top-6 sm:-right-6 z-20 animate-float-gentle-alt">
              <div className="bg-[#EBF8FD]/95 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/90 shadow-[0_12px_32px_rgba(8,185,232,0.18)] flex items-center gap-3.5 transition-transform duration-300 hover:scale-105">
                {/* Mini upward line chart box */}
                <div className="w-12 h-11 rounded-xl bg-white/90 p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                  <svg
                    viewBox="0 0 36 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M2 20 L10 14 L18 18 L26 8 L34 4"
                      stroke="#08B9E8"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 20 L10 14 L18 18 L26 8 L34 4 V24 H2 Z"
                      fill="#08B9E8"
                      fillOpacity="0.18"
                    />
                  </svg>
                </div>
                {/* 3 Step Checklist: Plan, Build, Launch */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#061827]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#08B9E8] fill-[#08B9E8]/15 shrink-0" />
                    <span>Plan</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#061827]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#08B9E8] fill-[#08B9E8]/15 shrink-0" />
                    <span>Build</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#061827]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#08B9E8] fill-[#08B9E8]/15 shrink-0" />
                    <span>Launch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------
                FLOATING CALLOUT 3: Bottom-Left ("Turning Ideas into Scalable Products")
            ---------------------------------------------------- */}
            <div className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 z-20 animate-float-gentle">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/90 shadow-[0_12px_32px_rgba(8,185,232,0.18)] flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E1F7FD] flex items-center justify-center text-[#08B9E8] shadow-inner shrink-0">
                  <BarChart3 className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#061827] leading-tight">
                    Turning Ideas
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    into Scalable Products
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Eyebrow, Main Headline, Description, Metrics, CTA
          ======================================================== */}
          <div
            className={`lg:col-span-6 space-y-6 sm:space-y-7 text-left transition-all duration-1000 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* 1. Rounded Pale-Cyan Eyebrow Pill */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E1F7FD] border border-[#08B9E8]/30 text-[#08B9E8] text-xs sm:text-sm font-bold tracking-wide">
                <span>5+ Years of Excellence</span>
              </div>
            </div>

            {/* 2. Main Large Dark Navy Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold text-[#061827] leading-[1.14] tracking-[-0.03em]">
              Requin Solutions: Crafting Innovative Software for Your Business
            </h2>

            {/* 3. Professional Description */}
            <p className="text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-xl font-normal">
              With a strong track record of delivering high-quality, scalable, and
              innovative solutions, we have helped businesses across industries turn
              their ideas into powerful digital products.
            </p>

            {/* 4. Horizontal Verified Metrics with Icons & Count-Up Animation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-3 pb-2">
              {/* Metric 1: Apps Developed */}
              <div className="space-y-2 group">
                <div className="w-10 h-10 rounded-xl bg-[#E1F7FD] flex items-center justify-center text-[#08B9E8] group-hover:scale-110 transition-transform duration-300">
                  <AppWindow className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#061827] tracking-tight">
                    {appsCount}K+
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    Apps Developed
                  </div>
                </div>
              </div>

              {/* Metric 2: Expert Consultants */}
              <div className="space-y-2 group">
                <div className="w-10 h-10 rounded-xl bg-[#E1F7FD] flex items-center justify-center text-[#08B9E8] group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#061827] tracking-tight">
                    {consultantsCount}+
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    Expert Consultants
                  </div>
                </div>
              </div>

              {/* Metric 3: Industry Awards */}
              <div className="space-y-2 group">
                <div className="w-10 h-10 rounded-xl bg-[#E1F7FD] flex items-center justify-center text-[#08B9E8] group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#061827] tracking-tight">
                    {awardsCount}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    Industry Awards
                  </div>
                </div>
              </div>

              {/* Metric 4: Talented Employees */}
              <div className="space-y-2 group">
                <div className="w-10 h-10 rounded-xl bg-[#E1F7FD] flex items-center justify-center text-[#08B9E8] group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#061827] tracking-tight">
                    {employeesCount}+
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                    Talented Employees
                  </div>
                </div>
              </div>
            </div>

            {/* 5. CTA Button: "Get in Touch →" */}
            <div className="pt-2">
              <button
                onClick={handleContactAction}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border-2 border-[#08B9E8] text-[#08B9E8] font-semibold text-sm hover:bg-[#08B9E8] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_8px_24px_rgba(8,185,232,0.3)] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#08B9E8]/50 active:scale-95"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
