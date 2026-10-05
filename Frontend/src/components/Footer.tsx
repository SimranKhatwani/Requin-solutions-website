import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenQuiz?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenQuiz }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#071827] text-white border-t border-white/10 pt-16 pb-0 relative overflow-hidden text-left font-sans selection:bg-[#08B9E8]/30 selection:text-[#4DD4F5]">
      {/* Background Soft Cyan Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(8,185,232,0.08),transparent_70%)] blur-3xl" />
        <div className="absolute top-20 -left-20 w-[500px] h-[450px] bg-[radial-gradient(circle,rgba(0,194,255,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(2,132,199,0.06),transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================
            MAIN 4-COLUMN FOOTER SECTION 
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          
          {/* Column 1: Brand & Contact Info & Socials (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo */}
            <div
              className="cursor-pointer inline-block"
              onClick={() => handleNav('hero')}
              aria-label="Requin Solutions Home"
            >
              <img
                src="/images/logo.png"
                alt="Requin Solutions Pvt Ltd"
                className="h-14 sm:h-16 md:h-18 w-auto object-contain block transition-opacity duration-200 hover:opacity-90"
              />
            </div>

            {/* Description Tagline */}
            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              Empowering businesses through innovative software and web development solutions designed for growth and efficiency.
            </p>

            {/* Contact Details List */}
            <div className="space-y-3 text-sm text-slate-400 pt-1">
              {/* Mail */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#08B9E8] shrink-0" />
                <a
                  href="mailto:info@requinsolutions.com"
                  className="text-slate-300 hover:text-[#08B9E8] transition-colors"
                >
                  info@requinsolutions.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#08B9E8] shrink-0" />
                <a
                  href="tel:+919352220187"
                  className="text-slate-300 hover:text-[#08B9E8] transition-colors"
                >
                  +91 9352220187
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#08B9E8] shrink-0" />
                <span className="text-slate-300">Jaipur, India</span>
              </div>
            </div>

            {/* Circular Social Media Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/requin-solutions-pvt-ltdd/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#08B9E8] hover:border-[#08B9E8]/50 hover:bg-[#08B9E8]/10 transition-all duration-200 cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/requin_solutions/"
                target="_blank"
                rel="noopener"
                aria-label="Follow Requin Solutions on Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#08B9E8] hover:border-[#08B9E8]/50 hover:bg-[#08B9E8]/10 transition-all duration-200 cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/requin_solutions/"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#08B9E8] hover:border-[#08B9E8]/50 hover:bg-[#08B9E8]/10 transition-all duration-200 cursor-pointer"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Site Map (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold text-white tracking-wider">
              Site Map
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-normal">
              <li>
                <button
                  onClick={() => handleNav('hero')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/our-stories')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => (onOpenQuiz ? onOpenQuiz() : handleNav('quiz'))}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/products')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Our Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('Terms and Conditions')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Terms and Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold text-white tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-normal">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Web Design & Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Mobile App Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Software Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Academic Assistance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Cloud Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#08B9E8] transition-colors cursor-pointer text-left"
                >
                  Digital Marketing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Updated & Quick Links (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold text-white tracking-wider">
              Stay Updated
            </h4>
            <p className="text-sm text-slate-400 font-normal leading-relaxed">
              Subscribe to our newsletter for the latest updates and insights.
            </p>

            {/* Newsletter Subscription Form */}
            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B2235] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#08B9E8] focus:ring-1 focus:ring-[#08B9E8]/50 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-[#08B9E8] hover:bg-[#4DD4F5] active:scale-[0.99] text-[#071827] font-semibold text-sm py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#071827]" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>

            {/* Quick Links Sub-Section */}
            <div className="pt-3">
              <h5 className="text-sm font-bold text-white tracking-wider mb-2.5">
                Quick Links
              </h5>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => navigate('/blogs')}
                  className="px-3.5 py-1 rounded-full bg-[#0B2235] border border-white/10 text-xs font-normal text-slate-300 hover:text-[#08B9E8] hover:border-[#08B9E8] hover:bg-[#08B9E8]/10 transition-all cursor-pointer"
                >
                  Blog
                </button>
                <button
                  onClick={() => setActiveModal('Career')}
                  className="px-3.5 py-1 rounded-full bg-[#0B2235] border border-white/10 text-xs font-normal text-slate-300 hover:text-[#08B9E8] hover:border-[#08B9E8] hover:bg-[#08B9E8]/10 transition-all cursor-pointer"
                >
                  Career
                </button>
                <button
                  onClick={() => setActiveModal('FAQs')}
                  className="px-3.5 py-1 rounded-full bg-[#0B2235] border border-white/10 text-xs font-normal text-slate-300 hover:text-[#08B9E8] hover:border-[#08B9E8] hover:bg-[#08B9E8]/10 transition-all cursor-pointer"
                >
                  FAQs
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          BOTTOM COPYRIGHT BAR 
      ======================================================== */}
      <div className="border-t border-white/10 bg-[#05131F]/90 py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <p>© 2026 Requin Solutions Pvt Ltd. All rights reserved.</p>
        </div>
      </div>

      {/* Informative Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/85 backdrop-blur-md">
          <div className="bg-[#0B2235] text-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/15 text-left relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#08B9E8]" />
                <span>{activeModal}</span>
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm text-slate-300 space-y-4 leading-relaxed font-normal">
              {activeModal === 'Terms and Conditions' && (
                <>
                  <p>
                    Welcome to Requin Solutions Pvt Ltd. By accessing our services, enterprise applications, and advisory portals, you agree to comply with our standardized development, deployment, and service agreements.
                  </p>
                  <p>
                    All deliverables, custom software architectures, and intellectual property developed under contract are securely transferred to client ownership upon milestone completion and contractual settlement.
                  </p>
                  <p>
                    For detailed legal documentation or enterprise master service agreements (MSA), contact our legal department at <span className="text-[#08B9E8]">legal@requinsolutions.com</span>.
                  </p>
                </>
              )}

              {activeModal === 'Career' && (
                <>
                  <p>
                    Join our Jaipur engineering hub and global consulting team! We are continually looking for passionate Full-Stack Developers, Cloud Architects, and AI Engineers.
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <p className="font-semibold text-white">Current Openings:</p>
                    <ul className="list-disc list-inside text-xs space-y-1 text-slate-300">
                      <li>Senior React / TypeScript Developer</li>
                      <li>Node.js / Distributed Systems Architect</li>
                      <li>DevOps & Kubernetes Cloud Specialist</li>
                    </ul>
                  </div>
                  <p>
                    Send your portfolio and resume to <span className="text-[#08B9E8]">careers@requinsolutions.com</span>.
                  </p>
                </>
              )}

              {activeModal === 'FAQs' && (
                <>
                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="font-semibold text-white text-sm">What services does Requin Solutions offer?</p>
                      <p className="text-slate-300 mt-1">We engineer custom web apps, mobile apps, enterprise cloud architectures, ERP suites, and AI integrations.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Where are you located?</p>
                      <p className="text-slate-300 mt-1">Our primary development center is headquartered in Malviya Nagar, Jaipur, Rajasthan, India.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">How do we get started?</p>
                      <p className="text-slate-300 mt-1">Contact us via the form on our website or email <span className="text-[#08B9E8]">info@requinsolutions.com</span> to schedule an architectural discovery session.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all cursor-pointer"
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
