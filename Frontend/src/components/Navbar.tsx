import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#061523]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on Left */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center focus:outline-none group text-left cursor-pointer select-none py-1"
            aria-label="Requin Solutions Home"
          >
            <img
              src="/images/logo.png"
              alt="Requin Solutions"
              className="h-12 sm:h-14 md:h-18 w-auto object-contain block transition-opacity duration-200 hover:opacity-90"
            />
          </button>

          {/* Desktop Navigation Links, Login & Get Started */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[16px] font-semibold text-white">
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-[#00c2ff] transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Services
            </button>

            <button
              onClick={() => handleNavClick('experience')}
              className="hover:text-[#00c2ff] transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Experience
            </button>

            <button
              onClick={() => handleNavClick('our-story')}
              className="hover:text-[#00c2ff] transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('products')}
              className="hover:text-[#00c2ff] transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Our Products
            </button>

            <button
              onClick={onOpenQuiz}
              className="hover:text-[#00c2ff] transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Quiz
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#00c2ff] transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Contact
            </button>

            {/* Outlined Login Button */}
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 border border-white/70 hover:border-[#00c2ff] hover:text-[#00c2ff] rounded-lg text-sm font-semibold text-white transition-all duration-150 hover:bg-[#00c2ff]/10 focus:outline-none cursor-pointer ml-1"
            >
              Login
            </button>

            {/* Solid Get Started CTA Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-md font-semibold text-[#05131f] bg-[#00c2ff] hover:bg-[#38d4ff] rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#00c2ff]/25 focus:outline-none active:scale-[0.98] cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenLogin}
              className="px-3 py-1 border border-white/70 hover:border-[#00c2ff] hover:text-[#00c2ff] rounded-lg text-xs font-semibold text-white"
            >
              Login
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-3 py-1 bg-[#00c2ff] text-[#05131f] rounded-lg text-xs font-semibold"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white hover:text-[#00c2ff] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061523]/98 border-b border-white/10 px-6 pt-4 pb-6 mt-3 space-y-4 shadow-2xl backdrop-blur-xl">
          <button
            onClick={() => handleNavClick('services')}
            className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#00c2ff]"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('experience')}
            className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#00c2ff]"
          >
            Experience
          </button>
          <button
            onClick={() => handleNavClick('our-story')}
            className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#00c2ff]"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('products')}
            className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#00c2ff]"
          >
            Our Products
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuiz();
            }}
            className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#00c2ff]"
          >
            Quiz
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#00c2ff]"
          >
            Contact
          </button>
          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 border border-white/70 hover:border-white rounded-lg text-sm font-semibold text-white text-center hover:bg-white/10"
            >
              Login
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#05131f] bg-[#00c2ff] hover:bg-[#38d4ff] rounded-lg shadow-sm"
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
