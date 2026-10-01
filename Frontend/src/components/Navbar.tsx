import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenQuiz: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenQuiz,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      onNavigateSection(sectionId);
    }
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setSolutionsDropdownOpen(false);
  };

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 150);
  };

  const handleSolutionsMouseEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsDropdownOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setSolutionsDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#061523]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-[#061523]/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Requin Logo: Naturally integrated on dark navbar without any container */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center focus:outline-none group text-left cursor-pointer select-none py-1"
            aria-label="Requin Solutions Home"
          >
            <img
              src="/images/logo.png"
              alt="Requin Solutions"
              className="h-14 sm:h-16 md:h-14 w-auto object-contain block transition-opacity duration-200 hover:opacity-90"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-white transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('experience')}
              className="hover:text-white transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Experience
            </button>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button
                onClick={() => handleNavClick('our-story')}
                className="flex items-center gap-1 hover:text-white transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
              >
                <span>About</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    aboutDropdownOpen ? 'rotate-180 text-[#00c2ff]' : 'text-slate-400'
                  }`}
                />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-56 pt-2 z-50">
                  <div className="bg-[#0B2235] border border-white/10 rounded-xl shadow-2xl p-2 backdrop-blur-xl">
                    <button
                      onClick={() => handleNavClick('our-story')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors block cursor-pointer"
                    >
                      <div className="font-semibold text-white">Our Story</div>
                      <div className="text-xs text-slate-400">Milestones & growth journey</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('life-at-requin')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors block mt-1 cursor-pointer"
                    >
                      <div className="font-semibold text-white">Life at Requin</div>
                      <div className="text-xs text-slate-400">Culture, milestones & events</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('products')}
              className="hover:text-white transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Products
            </button>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleSolutionsMouseEnter}
              onMouseLeave={handleSolutionsMouseLeave}
            >
              <button
                onClick={() => handleNavClick('software-solutions')}
                className="flex items-center gap-1 hover:text-white transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    solutionsDropdownOpen ? 'rotate-180 text-[#00c2ff]' : 'text-slate-400'
                  }`}
                />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 w-60 pt-2 z-50">
                  <div className="bg-[#0B2235] border border-white/10 rounded-xl shadow-2xl p-2 backdrop-blur-xl">
                    <button
                      onClick={() => handleNavClick('software-solutions')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors block cursor-pointer"
                    >
                      <div className="font-semibold text-white">Software Solutions</div>
                      <div className="text-xs text-slate-400">Custom enterprise applications</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('cloud-solutions')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors block mt-1 cursor-pointer"
                    >
                      <div className="font-semibold text-white">Cloud Solutions</div>
                      <div className="text-xs text-slate-400">DevOps & scalable infrastructure</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('academic-solutions')}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors block mt-1 cursor-pointer"
                    >
                      <div className="font-semibold text-white">Academic Solutions</div>
                      <div className="text-xs text-slate-400">Research & learning platforms</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="hover:text-white transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Projects
            </button>

            <button
              onClick={() => navigate('/blogs')}
              className="hover:text-white transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Blogs
            </button>

            {/* Quiz with cyan dot indicator */}
            <button
              onClick={onOpenQuiz}
              className="text-[#00c2ff] hover:text-[#4dd4f5] transition-colors duration-150 py-1 flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <span>Quiz</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2ff] inline-block shadow-[0_0_8px_#00c2ff]" />
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-white transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Action Zone: Admin CMS, Portal & Get Started */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* Admin CMS Outlined Teal Button */}
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#00c2ff] bg-[#00c2ff]/10 hover:bg-[#00c2ff]/20 border border-[#00c2ff]/40 rounded-lg transition-all focus:outline-none cursor-pointer shadow-sm"
              title="Open Requin Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#00c2ff]" />
              <span>Admin CMS</span>
            </button>

            {/* Portal Link */}
            <button
              onClick={onOpenLogin}
              className="px-2 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none cursor-pointer"
            >
              Portal
            </button>

            {/* Get Started Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#05131f] bg-[#00c2ff] hover:bg-[#38d4ff] rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#00c2ff]/25 focus:outline-none active:scale-[0.98] cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#00c2ff] bg-[#00c2ff]/10 border border-[#00c2ff]/40 rounded-md"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>CMS</span>
            </button>
            <button
              onClick={onOpenLogin}
              className="px-2.5 py-1 text-xs font-medium text-slate-200 hover:text-white border border-white/10 rounded-md"
            >
              Portal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#061523]/98 border-b border-white/10 px-5 pt-4 pb-6 mt-3 space-y-3 shadow-2xl backdrop-blur-xl">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/admin');
            }}
            className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl bg-[#00c2ff]/15 border border-[#00c2ff]/30 text-sm font-bold text-[#00c2ff]"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin CMS Panel</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('experience')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Experience
          </button>
          <button
            onClick={() => handleNavClick('our-story')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Our Story
          </button>
          <button
            onClick={() => handleNavClick('life-at-requin')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Life at Requin
          </button>
          <button
            onClick={() => handleNavClick('products')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Products
          </button>
          <button
            onClick={() => handleNavClick('software-solutions')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Software Solutions
          </button>
          <button
            onClick={() => handleNavClick('cloud-solutions')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Cloud Solutions
          </button>
          <button
            onClick={() => handleNavClick('academic-solutions')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Academic Solutions
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/projects');
            }}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Projects
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/blogs');
            }}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Blogs
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuiz();
            }}
            className="block w-full text-left py-2 text-base font-medium text-[#00c2ff] hover:text-[#4dd4f5]"
          >
            Quiz / Solution Finder
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-white"
          >
            Contact
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#05131f] bg-[#00c2ff] rounded-lg shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
