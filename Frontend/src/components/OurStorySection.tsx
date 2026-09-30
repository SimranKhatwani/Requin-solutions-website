import React from 'react';
import { Calendar, Award, Sparkles, TrendingUp, Compass, Flag } from 'lucide-react';
import { OUR_STORY_MILESTONES } from '../data/requinData';

export const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="py-28 md:py-36 bg-[#071827] text-white relative overflow-hidden">
      {/* Subtle Glow */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#08B9E8]/5 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-3">
            Company Evolution
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em]">
            Our Story
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-[1.65]">
            From our founding in Jaipur to delivering mission-critical platforms worldwide. Explore the defining chapters of Requin Solutions.
          </p>
        </div>

        {/* Elegant Editorial Timeline */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 md:ml-32 space-y-12 sm:space-y-16">
          {OUR_STORY_MILESTONES.map((milestone, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              {/* Cyan Timeline Accent Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#071827] border-2 border-[#08B9E8] group-hover:bg-[#08B9E8] transition-colors duration-200" />

              {/* Year Label Placed Elegantly */}
              <div className="md:absolute md:-left-32 md:top-0 text-left mb-2 md:mb-0">
                <span className="text-xl sm:text-2xl font-extrabold text-[#08B9E8] font-mono tracking-tight">
                  {milestone.year}
                </span>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden md:block">
                  {milestone.tag}
                </div>
              </div>

              {/* Milestone Content Container */}
              <div className="bg-[#0B2235]/70 rounded-2xl border border-white/10 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-white/20 text-left max-w-3xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#4DD4F5] transition-colors">
                    {milestone.title}
                  </h3>
                  <span className="text-xs font-medium px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                    {milestone.tag}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {milestone.description}
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-300">
                  <Sparkles className="w-4 h-4 text-[#08B9E8] shrink-0" />
                  <span className="font-medium text-slate-200">{milestone.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
