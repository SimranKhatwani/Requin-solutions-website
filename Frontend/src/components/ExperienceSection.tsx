import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { REQUIN_COMPANY_INFO } from '../data/requinData';

interface ExperienceSectionProps {
  onLearnMore: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onLearnMore }) => {
  return (
    <section id="experience" className="py-28 md:py-36 bg-[#071827] text-white relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 bg-[#08B9E8]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Large Company / Team / Project Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/images/requin_software_team_1790576614688.jpg"
                alt="Requin Solutions Engineering Team"
                className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Caption Tag */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#071827]/90 border border-white/15 backdrop-blur-md">
                <div className="text-xs font-semibold text-[#08B9E8] uppercase tracking-wider">
                  Jaipur Headquarters
                </div>
                <div className="text-sm font-medium text-slate-200 mt-1">
                  Engineers & digital architects building enterprise software systems.
                </div>
              </div>
            </div>

            {/* Subtle Cyan Offset Border Accent */}
            <div
              className="hidden sm:block absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-[#08B9E8]/40 rounded-bl-3xl -z-10 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* RIGHT: Visual Storytelling Text & Verified Metrics */}
          <div className="lg:col-span-6 space-y-7 text-left">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-3">
                Proven Track Record
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em]">
                Our Experience
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-[1.65] font-normal">
              With over half a decade of hands-on software engineering, Requin Solutions has partnered with businesses across the globe to conceptualize, engineer, and deploy high-stakes digital infrastructure.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-[1.65]">
              We focus on clean software architecture, deterministic delivery sprints, and measurable commercial return—ensuring our partners lead rather than adapt to technological shifts.
            </p>

            {/* Core Capability Checkmarks */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#08B9E8] shrink-0" />
                <span>End-to-end product engineering from MVP to enterprise scale</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#08B9E8] shrink-0" />
                <span>Multi-region cloud infrastructure and DevOps automation</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#08B9E8] shrink-0" />
                <span>Proprietary business systems: Requin Ops CRM & Requin AMS</span>
              </div>
            </div>

            {/* Small Statistics Underneath (Actual Website Data) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              {REQUIN_COMPANY_INFO.experienceMetrics.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#08B9E8] font-mono tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#08B9E8] transition-colors group"
              >
                <span>Discover our journey in Our Story</span>
                <ArrowRight className="w-4 h-4 text-[#08B9E8] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
