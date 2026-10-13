import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenLogin?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
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
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on location change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      onNavigateSection(sectionId);
      if (sectionId === 'contact') {
        setTimeout(() => {
          const input = document.getElementById('consultation-name-input') || document.querySelector('#contact input');
          if (input) (input as HTMLElement).focus();
        }, 500);
      }
    }
    setMobileMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';
  const isSolid = isScrolled || mobileMenuOpen || !isHomePage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? 'bg-[#061523]/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/25 py-2.5 sm:py-3'
          : 'bg-transparent backdrop-blur-none border-b border-transparent shadow-none py-3 sm:py-3.5'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
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
              className="h-10 sm:h-14 md:h-19 w-auto object-contain block transition-opacity duration-200 hover:opacity-90"
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
              onClick={() => {
                navigate('/blog');
                setMobileMenuOpen(false);
              }}
              className="hover:text-[#00c2ff] transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Blogs
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#00c2ff] transition-colors duration-150 py-1 focus:outline-none cursor-pointer"
            >
              Contact
            </button>

            {/* Get Started CTA Button (matches See More Products UI) */}
            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm sm:text-[15px] font-bold text-[#08B9E8] hover:text-[#061827] bg-[#071F33]/90 hover:bg-[#08B9E8] border border-[#08B9E8]/40 hover:border-[#08B9E8] rounded-full transition-all duration-300 shadow-md shadow-black/20 hover:shadow-[0_0_25px_rgba(8,185,232,0.4)] focus:outline-none active:scale-[0.98] cursor-pointer ml-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-3.5 py-1.5 rounded-full bg-[#071F33]/90 hover:bg-[#08B9E8] border border-[#08B9E8]/40 hover:border-[#08B9E8] text-[#08B9E8] hover:text-[#061827] text-xs font-bold transition-all duration-200"
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
        <div className="lg:hidden bg-[#061523]/98 border-b border-white/10 px-6 pt-4 pb-6 mt-3 space-y-4 shadow-2xl backdrop-blur-xl max-h-[calc(100vh-80px)] overflow-y-auto">
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
              navigate('/blog');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-semibold text-white hover:text-[#00c2ff]"
          >
            Blogs
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
                handleNavClick('contact');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-[#08B9E8] hover:text-[#061827] bg-[#071F33]/90 hover:bg-[#08B9E8] border border-[#08B9E8]/40 hover:border-[#08B9E8] rounded-full transition-all duration-200 shadow-sm group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
