import React from 'react';
import { ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface QuizCTAProps {
  onStartQuiz: () => void;
}

export const QuizCTA: React.FC<QuizCTAProps> = ({ onStartQuiz }) => {
  return (
    <section id="quiz" className="py-20 md:py-28 bg-[#071827] text-white relative overflow-hidden scroll-mt-20">
      {/* Abstract Cyan / Blue Visual & Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#08B9E8]/20 via-[#0B2235]/60 to-[#4DD4F5]/10 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-[#0B2235]/90 to-[#071827]/90 border border-white/15 p-8 sm:p-12 md:p-16 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle cyan geometric accent */}
          <div
            className="absolute top-0 right-0 w-48 h-48 bg-[#08B9E8]/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#4DD4F5] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#08B9E8]" />
              <span>Interactive Solution Finder</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[-0.03em] leading-tight">
              Not Sure What You Need?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-[1.65]">
              Tell us about your business goals and technical landscape. In under two minutes, we will diagnose your architecture needs and recommend the right roadmap.
            </p>

            <div className="pt-2">
              <button
                onClick={onStartQuiz}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-xl shadow-[#08B9E8]/25 hover:shadow-[#08B9E8]/40 focus:outline-none active:scale-[0.98]"
              >
                <span>Start the Quiz</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
