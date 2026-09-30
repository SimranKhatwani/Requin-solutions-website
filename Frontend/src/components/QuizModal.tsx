import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS, REQUIN_SERVICES, REQUIN_PRODUCTS } from '../data/requinData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onSelectService }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({ ...answers, [currentStep]: optionIndex });
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
  };

  // Determine recommendation based on first answer
  const targetServiceId =
    QUIZ_QUESTIONS[0].options[answers[0] || 0]?.targetService || 'web-development';
  const recommendedService =
    REQUIN_SERVICES.find((s) => s.id === targetServiceId) || REQUIN_SERVICES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/85 backdrop-blur-md">
      <div className="bg-[#0B2235] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-white/15 relative overflow-hidden text-left">
        {/* Subtle Ambient Glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-[#08B9E8]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Close Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Header & Progress Indicator */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="text-[#08B9E8] uppercase tracking-wider">Solution Diagnostic</span>
                <span>Step {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#08B9E8] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] pt-2">
                {currentQ.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-normal leading-[1.6]">
                {currentQ.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentStep] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#08B9E8]/15 border-[#08B9E8] shadow-md shadow-[#08B9E8]/10'
                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-white group-hover:text-[#4DD4F5]">
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {option.description}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-[#08B9E8] bg-[#08B9E8] text-[#071827]'
                          : 'border-white/20'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                  currentStep === 0
                    ? 'opacity-30 cursor-not-allowed text-slate-500'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <span className="text-xs text-slate-400">
                Click any option to proceed
              </span>
            </div>
          </div>
        ) : (
          /* Completion & Recommendation State */
          <div className="space-y-6 text-left py-2">
            <div className="w-12 h-12 rounded-2xl bg-[#08B9E8]/20 border border-[#08B9E8]/40 flex items-center justify-center text-[#08B9E8]">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider">
                Tailored Recommendation
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {recommendedService.title}
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Based on your operational goals, {recommendedService.title} represents the highest-leverage roadmap for your system architecture.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase">Recommended Focus</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {recommendedService.overview}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {recommendedService.technologies.map((t, idx) => (
                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="#contact"
                onClick={() => {
                  onClose();
                  onSelectService(recommendedService.id);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-colors"
              >
                <span>Book Diagnostic Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
