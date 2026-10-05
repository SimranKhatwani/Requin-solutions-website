import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const faqItems = [
    {
      question: 'What services does Requin Solutions provide?',
      answer:
        'We offer comprehensive software development, cloud solutions, digital transformation, and IT consulting services tailored to your business needs.',
    },
    {
      question: 'How quickly can you respond to inquiries?',
      answer:
        'Our team typically responds to all inquiries within 24 hours during business days. For urgent matters, please call us directly.',
    },
    {
      question: 'Do you provide support after project completion?',
      answer:
        'Yes, we offer comprehensive maintenance and support packages to ensure your solutions continue to perform optimally after launch.',
    },
    {
      question: 'Can I request a demo or consultation?',
      answer:
        'Absolutely! Fill out our contact form or call us directly to schedule a demo or consultation with our expert team.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full p-6 sm:p-10 lg:p-12 shadow-2xl relative text-left animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          aria-label="Close FAQs modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title & Subtitle */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 font-medium">
            Find quick answers to common questions
          </p>
        </div>

        {/* 2x2 Question & Answer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#F0F7FF] border border-[#E0EEFC] rounded-2xl p-6 sm:p-7 transition-all hover:border-[#BFDCFA] hover:shadow-xs flex flex-col justify-start"
            >
              <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] mb-3 leading-snug">
                {item.question}
              </h3>
              <p className="text-sm sm:text-[14.5px] text-slate-600 leading-relaxed font-normal">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FAQModal;
