import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, Linkedin, Mail, Phone, MapPin, CheckCircle2, Globe } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenQuiz }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
    }, 500);
  };

  const servicesList = [
    'Custom Software Development',
    'Cloud & SaaS Solutions',
    'AI & Machine Learning',
    'ERP & CRM Systems',
    'Blockchain & Web3 Development',
    'IoT & Smart Infrastructure',
    'Cybersecurity & Risk Management',
  ];

  return (
    <footer className="bg-[#071827] text-white border-t border-white/10 pt-20 pb-10 relative overflow-hidden text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            TOP PRE-FOOTER SECTION (As shown in Reference Image 2)
            Left: Let's Start Your Growth Journey CTA
            Right: Subscribe to Our Newsletter Card
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 items-start">
          {/* Left Column: Heading, Subtitle & Action Buttons */}
          <div className="lg:col-span-6 space-y-6">
            {/* Outline Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-slate-300">
              Ready to Transform Your Business?
            </div>

            {/* Large Bold Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-tight">
              Let's Start Your Growth Journey
            </h2>

            {/* Subtitle / Paragraph */}
            <p className="text-sm sm:text-base text-slate-400 font-normal leading-[1.65] max-w-lg">
              Schedule a consultation with our experts to discuss your specific needs and how we can help you achieve your business goals.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigateSection('contact')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-lg shadow-[#08B9E8]/20 focus:outline-none active:scale-[0.98]"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateSection('services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#0B2235] hover:bg-white/10 border border-white/20 transition-all duration-200 focus:outline-none"
              >
                <span>Our Services</span>
              </button>
            </div>
          </div>

          {/* Right Column: Newsletter Subscription Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#0B2235]/80 rounded-2xl border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed mt-2 mb-6">
                Stay updated with the latest business insights, trends, and exclusive content.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-[#071827] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#08B9E8] transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-md shadow-[#08B9E8]/20 focus:outline-none active:scale-[0.98] disabled:opacity-50 shrink-0"
                    >
                      {submitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal pt-1">
                    By subscribing, you agree to our{' '}
                    <button
                      type="button"
                      onClick={() => setActiveModal('Privacy Policy')}
                      className="text-slate-400 hover:text-white underline"
                    >
                      Privacy Policy
                    </button>{' '}
                    and consent to receive updates from our company.
                  </p>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Thank you for subscribing! You are now subscribed to our monthly tech & business briefing.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            MAIN 4-COLUMN FOOTER SECTION (As shown in Reference Images 2 & 3)
            Col 1: Logo (Image 1) + Tagline + Social Icons
            Col 2: Company links
            Col 3: Services links
            Col 4: Contact info (Email, Phone, Malviya Nagar Address)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-16 border-t border-white/10">
          
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-4 space-y-5">
            {/* Official Requin Logo (As It Is) */}
            <div className="cursor-pointer inline-block" onClick={() => onNavigateSection('hero')}>
              <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 inline-flex items-center transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
                <img
                  src="/images/logo.png"
                  alt="Requin Solutions Pvt Ltd"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
            </div>

            {/* Tagline from Reference Image 3 */}
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs font-normal">
              Building a better future with innovative solutions.
            </p>

            {/* Circular Social Media Buttons: Instagram, Facebook, LinkedIn */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#08B9E8]/50 hover:bg-[#08B9E8]/10 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#08B9E8]/50 hover:bg-[#08B9E8]/10 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#08B9E8]/50 hover:bg-[#08B9E8]/10 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-normal">
              <li>
                <button
                  onClick={() => navigate('/our-stories')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/projects')}
                  className="hover:text-white transition-colors text-left"
                >
                  Projects & Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/blogs')}
                  className="hover:text-white transition-colors text-left"
                >
                  Blog & Insights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => navigate('/admin')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#08B9E8] hover:text-[#4DD4F5] transition-colors text-left"
                >
                  <span>Admin CMS Portal →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (Exact items from Reference Images 2 & 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-normal">
              {servicesList.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigateSection('services')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact (Exact details from Reference Images 2 & 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-400 leading-relaxed font-normal">
              <div>
                <span className="text-slate-500">Email: </span>
                <a
                  href="mailto:skorokrylsolutions@gmail.com"
                  className="text-slate-300 hover:text-[#08B9E8] transition-colors"
                >
                  skorokrylsolutions@gmail.com
                </a>
                <div className="text-xs text-slate-500 mt-0.5">
                  <a href="mailto:info@requinsolutions.com" className="hover:text-[#08B9E8]">
                    info@requinsolutions.com
                  </a>
                </div>
              </div>

              <div>
                <span className="text-slate-500">Phone: </span>
                <a
                  href="tel:+918387934095"
                  className="text-slate-300 hover:text-[#08B9E8] transition-colors"
                >
                  +91 83879 34095
                </a>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide leading-relaxed pt-1">
                  GROUND FLOOR 6/397 SEC 6, MALVIYA NAGAR, JAIPUR
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            BOTTOM SUB-FOOTER BAR (As shown in Reference Image 3)
            Left: Copyright
            Right: PRIVACY POLICY | DISCLAIMER | BUILDING TRUST | India English
        ======================================================== */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Requin Solutions. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs tracking-wider">
            <button
              onClick={() => setActiveModal('Privacy Policy')}
              className="hover:text-slate-300 uppercase transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal('Disclaimer')}
              className="hover:text-slate-300 uppercase transition-colors"
            >
              Disclaimer
            </button>
            <button
              onClick={() => setActiveModal('Building Trust')}
              className="hover:text-slate-300 uppercase transition-colors"
            >
              Building Trust
            </button>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#08B9E8]" />
                <span>India</span>
              </span>
              <span>English</span>
            </div>
          </div>
        </div>

      </div>

      {/* Lightweight Info Modal for Footer Links */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/85 backdrop-blur-md">
          <div className="bg-[#0B2235] text-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/15 text-left relative">
            <h3 className="text-xl font-bold text-white mb-3">{activeModal}</h3>
            <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
              {activeModal === 'Privacy Policy' && (
                <p>
                  At Requin Solutions, client confidentiality and proprietary intellectual property protection are foundational. We never sell, lease, or monetize client data. All client communication and code repositories are governed by strict nondisclosure covenants.
                </p>
              )}
              {activeModal === 'Disclaimer' && (
                <p>
                  Information published across this platform is intended for technical consulting and architectural evaluation. Performance metrics and system SLAs may vary based on custom client requirements, infrastructure scale, and tier selection.
                </p>
              )}
              {activeModal === 'Building Trust' && (
                <p>
                  Trust is engineered through transparent development sprints, milestone deliverables, continuous automated QA testing, and direct communication with lead architects in our Jaipur headquarters.
                </p>
              )}
              {activeModal === 'Blog' && (
                <p>
                  Our engineering blog features architectural analyses, cloud migration case studies, and modern frontend best practices authored by our technical team. New articles published bi-weekly.
                </p>
              )}
            </div>
            <div className="pt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
