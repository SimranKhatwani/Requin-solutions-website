import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QUIZ_QUESTIONS, REQUIN_SERVICES, ServiceItem } from '../data/requinData';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  ShieldCheck,
} from 'lucide-react';

export const PublicQuizPage: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = { ...answers, [currentStep]: optionIndex };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
    setIsQuizStarted(true);
  };

  // Determine recommendation based on first answer
  const targetServiceId =
    QUIZ_QUESTIONS[0]?.options[answers[0] || 0]?.targetService || 'web-development';
  const recommendedService: ServiceItem =
    REQUIN_SERVICES.find((s) => s.id === targetServiceId) || REQUIN_SERVICES[0];

  return (
    <div className="min-h-screen bg-[#071827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5]">
      {/* Sticky Top Navbar */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={handleStartQuiz}
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
      />

      {/* Main Quiz Hub Section */}
      <main className="flex-1 pt-28 sm:pt-36 pb-20 md:pb-28 relative overflow-hidden flex items-center justify-center">
        {/* Soft Cyan Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(circle,rgba(8,185,232,0.14),transparent_70%)] blur-[120px]" />
          <div className="absolute -top-20 -left-20 w-[600px] h-[450px] bg-[radial-gradient(circle,rgba(0,194,255,0.09),transparent_65%)] blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-[650px] h-[500px] bg-[radial-gradient(circle,rgba(2,132,199,0.1),transparent_70%)] blur-[100px]" />
        </div>

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mb-8 sm:mb-10">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#08B9E8]">Solution Diagnostic Quiz</span>
          </div>

          {/* ========================================================
              QUIZ CARD CONTAINER (Matching user screenshot)
          ======================================================== */}
          <div className="rounded-3xl bg-gradient-to-b from-[#0B2235]/95 to-[#071827]/95 border border-white/15 p-6 sm:p-10 md:p-16 text-center shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(8,185,232,0.12)] backdrop-blur-xl relative overflow-hidden transition-all duration-500">
            {/* Ambient Cyan Corner Glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-[#08B9E8]/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {!isQuizStarted ? (
              /* ========================================================
                 STATE 1: INITIAL LANDING SCREEN (From User Screenshot)
              ======================================================== */
              <div className="max-w-3xl mx-auto space-y-6 py-4 sm:py-8 animate-fadeIn">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08B9E8]/15 border border-[#08B9E8]/35 text-xs font-bold tracking-wider text-[#4DD4F5] uppercase shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#08B9E8]" />
                  <span>Interactive Solution Finder</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.03em] leading-tight">
                  Not Sure What You Need?
                </h1>

                {/* Subtitle Description */}
                <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                  Tell us about your business goals and technical landscape. In under two minutes, we will diagnose your architecture needs and recommend the right roadmap.
                </p>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 pb-2 text-left max-w-2xl mx-auto">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#08B9E8] shrink-0" />
                    <span className="text-xs font-medium text-slate-300">Under 2 Minutes</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Layers className="w-5 h-5 text-[#08B9E8] shrink-0" />
                    <span className="text-xs font-medium text-slate-300">3 Fast Questions</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#08B9E8] shrink-0" />
                    <span className="text-xs font-medium text-slate-300">Custom Roadmap</span>
                  </div>
                </div>

                {/* Start the Quiz Action CTA */}
                <div className="pt-4">
                  <button
                    onClick={handleStartQuiz}
                    className="inline-flex items-center gap-3 px-9 py-4 rounded-xl font-bold text-base sm:text-lg text-[#071827] bg-[#00c2ff] hover:bg-[#38d4ff] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#00c2ff]/30 hover:shadow-[#00c2ff]/50 focus:outline-none cursor-pointer group"
                  >
                    <span>Start the Quiz</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ) : !isCompleted ? (
              /* ========================================================
                 STATE 2: INTERACTIVE MULTI-STEP QUESTIONS
              ======================================================== */
              <div className="max-w-2xl mx-auto text-left animate-fadeIn">
                {/* Header & Progress Indicator */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span className="text-[#08B9E8] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Solution Diagnostic
                    </span>
                    <span>Step {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#08B9E8] to-[#00c2ff] transition-all duration-400 rounded-full shadow-[0_0_10px_rgba(8,185,232,0.5)]"
                      style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.02em] pt-3 leading-snug">
                    {currentQ.question}
                  </h2>
                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    {currentQ.subtitle}
                  </p>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-3.5 mb-8">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = answers[currentStep] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 group flex items-start justify-between gap-4 cursor-pointer ${
                          isSelected
                            ? 'bg-[#08B9E8]/15 border-[#08B9E8] shadow-lg shadow-[#08B9E8]/15 ring-1 ring-[#08B9E8]'
                            : 'bg-white/5 border-white/10 hover:border-[#08B9E8]/50 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="text-base sm:text-lg font-bold text-white group-hover:text-[#4DD4F5] transition-colors">
                            {option.label}
                          </div>
                          <div className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                            {option.description}
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'border-[#08B9E8] bg-[#08B9E8] text-[#071827]'
                              : 'border-white/30 group-hover:border-[#08B9E8]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      currentStep === 0
                        ? 'opacity-30 cursor-not-allowed text-slate-500'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Question</span>
                  </button>

                  <button
                    onClick={() => setIsQuizStarted(false)}
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ========================================================
                 STATE 3: COMPLETION & TAILORED RECOMMENDATION
              ======================================================== */
              <div className="max-w-2xl mx-auto text-left space-y-6 py-2 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#08B9E8]/20 border border-[#08B9E8]/40 flex items-center justify-center text-[#08B9E8] shadow-[0_0_20px_rgba(8,185,232,0.3)]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider block">
                      Diagnostic Complete
                    </span>
                    <span className="text-sm text-slate-300 font-medium">
                      Here is your tailored technology recommendation
                    </span>
                  </div>
                </div>

                {/* Recommended Service Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B2235] to-[#071827] border border-[#08B9E8]/40 shadow-xl">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#08B9E8]/15 border border-[#08B9E8]/40 text-[#08B9E8] text-xs font-bold uppercase tracking-wide">
                      {recommendedService.category || 'Strategic Engineering'}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 98% Match
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    {recommendedService.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-200 mt-2.5 leading-relaxed">
                    {recommendedService.overview || recommendedService.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {recommendedService.highlights && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Key Capabilities for Your Initiative:
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                        {recommendedService.highlights.slice(0, 3).map((hl, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#08B9E8] font-bold mt-0.5">•</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack pills */}
                  {recommendedService.technologies && (
                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                      {recommendedService.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-[#071827] bg-[#00c2ff] hover:bg-[#38d4ff] shadow-lg shadow-[#00c2ff]/30 transition-all cursor-pointer"
                  >
                    <span>Book Diagnostic Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Dark Navy Footer */}
      <Footer
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
        onOpenQuiz={handleStartQuiz}
      />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};
