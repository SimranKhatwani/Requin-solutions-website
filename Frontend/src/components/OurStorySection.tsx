import React from 'react';
import { Sparkles } from 'lucide-react';
import { OUR_STORY_MILESTONES } from '../data/requinData';

export const OurStorySection: React.FC = () => {
  return (
    <section
      id="our-story"
      className="pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-28 bg-[#F5FAFD] text-[#0B1726] relative overflow-hidden selection:bg-[#08B9E8]/20 selection:text-[#08B9E8]"
    >
      {/* Background Technology-Inspired Ambience Keyframes */}
      <style>{`
        @keyframes ambientFloatStory {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-10px, -8px) scale(1.03);
          }
        }
        @keyframes networkPulseStory {
          0%, 100% {
            opacity: 0.65;
          }
          50% {
            opacity: 0.95;
          }
        }
        @keyframes waveFloatStory {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25px);
          }
        }
        .animate-ambient-float-story {
          animation: ambientFloatStory 16s ease-in-out infinite;
        }
        .animate-network-pulse-story {
          animation: networkPulseStory 12s ease-in-out infinite;
        }
        .animate-wave-float-story {
          animation: waveFloatStory 20s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ambient-float-story,
          .animate-network-pulse-story,
          .animate-wave-float-story {
            animation: none !important;
          }
        }
      `}</style>

      {/* ========================================================
          BACKGROUND LAYER 1: Soft Ambient Radial Gradients
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left Ambient Cyan Glow */}
        <div className="absolute -top-24 -left-24 w-[650px] h-[500px] bg-[radial-gradient(circle_at_30%_30%,rgba(8,185,232,0.08),transparent_65%)] blur-3xl animate-ambient-float-story" />
        
        {/* Top-Right Soft Blue/Cyan Glow */}
        <div className="absolute -top-16 -right-16 w-[600px] h-[450px] bg-[radial-gradient(circle_at_70%_30%,rgba(0,194,255,0.07),transparent_65%)] blur-3xl animate-ambient-float-story" style={{ animationDelay: '-6s' }} />
        
        {/* Bottom-Left Ambient Cyan Glow */}
        <div className="absolute -bottom-20 -left-12 w-[550px] h-[450px] bg-[radial-gradient(circle_at_40%_70%,rgba(8,185,232,0.06),transparent_65%)] blur-3xl animate-ambient-float-story" style={{ animationDelay: '-10s' }} />
        
        {/* Bottom-Right Subtle Blue Glow */}
        <div className="absolute -bottom-20 -right-12 w-[600px] h-[480px] bg-[radial-gradient(circle_at_70%_70%,rgba(2,132,199,0.05),transparent_65%)] blur-3xl animate-ambient-float-story" style={{ animationDelay: '-3s' }} />

        {/* Center subtle light depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] pointer-events-none" />
      </div>

      {/* ========================================================
          BACKGROUND LAYER 2: Subtle Digital Network & Flowing Lines Pattern
      ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-network-pulse-story"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="netGradStory" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.07" />
          </linearGradient>

          <filter id="nodeGlowStory" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* TOP-LEFT NETWORK CONSTELLATION */}
        <g stroke="url(#netGradStory)" strokeWidth="1" fill="none">
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
          <circle cx="11%" cy="16%" r="4" fillOpacity="0.25" filter="url(#nodeGlowStory)" />
          <circle cx="11%" cy="16%" r="2" fillOpacity="0.8" />
          <circle cx="7%" cy="28%" r="3" fillOpacity="0.3" />
          <circle cx="18%" cy="20%" r="3.5" fillOpacity="0.3" />
          <circle cx="18%" cy="20%" r="1.5" fillOpacity="0.8" />
          <circle cx="15%" cy="34%" r="2.5" fillOpacity="0.4" />
          <circle cx="25%" cy="12%" r="3" fillOpacity="0.25" />
          <circle cx="2%" cy="22%" r="2" fillOpacity="0.3" />
        </g>

        {/* TOP-RIGHT NETWORK CONSTELLATION */}
        <g stroke="url(#netGradStory)" strokeWidth="1" fill="none">
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
          <circle cx="88%" cy="18%" r="4" fillOpacity="0.25" filter="url(#nodeGlowStory)" />
          <circle cx="88%" cy="18%" r="2" fillOpacity="0.8" />
          <circle cx="92%" cy="30%" r="3" fillOpacity="0.3" />
          <circle cx="80%" cy="22%" r="3.5" fillOpacity="0.3" />
          <circle cx="80%" cy="22%" r="1.5" fillOpacity="0.8" />
          <circle cx="84%" cy="36%" r="2.5" fillOpacity="0.4" />
          <circle cx="74%" cy="14%" r="3" fillOpacity="0.25" />
          <circle cx="98%" cy="25%" r="2" fillOpacity="0.3" />
        </g>

        {/* BOTTOM-LEFT & BOTTOM-RIGHT CORNER NODES */}
        <g stroke="url(#netGradStory)" strokeWidth="1" fill="none">
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
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-0 overflow-hidden opacity-60 animate-wave-float-story">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 md:mb-14 text-left">
          <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] text-[#08B9E8] uppercase mb-3">
            WHAT WE DID
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1726] tracking-[-0.03em] leading-tight">
            Our Story
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-[1.65]">
            From our founding in Jaipur to delivering mission-critical platforms worldwide.
          </p>
        </div>

        {/* Elegant Editorial Timeline with Perfect Node Alignment */}
        <div className="relative ml-4 sm:ml-8 md:ml-64 space-y-10 sm:space-y-14">
          {/* Continuous Timeline Connecting Line (Starts at first dot center, ends at last dot center) */}
          <div
            className="absolute left-0 top-2.5 bottom-8 w-[2px] bg-[#BAE6FD]"
            aria-hidden="true"
          />

          {OUR_STORY_MILESTONES.map((milestone, idx) => (
            <div key={idx} className="relative pl-7 sm:pl-10 group">
              {/* Timeline Accent Node */}
              <div className="absolute -left-[7px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#0284c7] group-hover:bg-[#0284c7] transition-colors duration-200 shadow-sm z-10" />

              {/* Year Label Placed on the Left (Right-Aligned with generous spacing) */}
              <div className="md:absolute md:-left-64 md:w-56 md:top-0 md:text-right pr-0 md:pr-8 mb-2 md:mb-0">
                <span className="text-xl sm:text-2xl font-extrabold text-[#0284c7] font-mono tracking-tight block">
                  {milestone.year}
                </span>
                <div className="text-[13px] sm:text-sm font-bold text-slate-500 uppercase tracking-wider hidden md:block mt-1 leading-snug">
                  {milestone.tag}
                </div>
              </div>

              {/* Milestone Content Container */}
              <div className="bg-white/95 rounded-2xl border border-slate-200/90 hover:border-[#00c2ff]/60 p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(8,185,232,0.08),0_2px_8px_-2px_rgba(11,23,38,0.04)] hover:shadow-[0_16px_35px_-8px_rgba(0,194,255,0.22)] transition-all duration-300 hover:-translate-y-1 text-left max-w-3xl backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1726] group-hover:text-[#0284c7] transition-colors">
                    {milestone.title}
                  </h3>
                  <span className="text-sm sm:text-base font-bold px-3.5 py-1.5 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284c7] shadow-sm">
                    {milestone.tag}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {milestone.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-start sm:items-center gap-2 text-xs text-slate-600">
                  <Sparkles className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5 sm:mt-0" />
                  <span className="font-medium text-slate-800 leading-snug">{milestone.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
