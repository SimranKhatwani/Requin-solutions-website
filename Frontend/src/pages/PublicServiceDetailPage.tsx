import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import {
  REQUIN_SERVICES,
  ServiceItem,
} from '../data/requinData';
import {
  Monitor,
  Smartphone,
  Cpu,
  Cloud,
  TrendingUp,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Layers,
  ChevronRight,
} from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'web-development': <Monitor className="w-8 h-8 stroke-[1.8]" />,
  'mobile-development': <Smartphone className="w-8 h-8 stroke-[1.8]" />,
  'software-solutions': <Cpu className="w-8 h-8 stroke-[1.8]" />,
  'cloud-solutions': <Cloud className="w-8 h-8 stroke-[1.8]" />,
  'digital-marketing': <TrendingUp className="w-8 h-8 stroke-[1.8]" />,
  'academic-assistance': <GraduationCap className="w-8 h-8 stroke-[1.8]" />,
};

export const PublicServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Find matching service item
  const currentService: ServiceItem =
    REQUIN_SERVICES.find((s) => s.id.toLowerCase() === serviceId?.toLowerCase()) ||
    REQUIN_SERVICES[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const icon = SERVICE_ICONS[currentService.id] || <Monitor className="w-8 h-8" />;
  const otherServices = REQUIN_SERVICES.filter((s) => s.id !== currentService.id);

  return (
    <div className="min-h-screen bg-[#F5FAFD] text-[#0B1726] flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#08B9E8] relative overflow-hidden">
      {/* Background Technology-Inspired Ambience & Keyframe Animations (Services Theme) */}
      <style>{`
        @keyframes ambientFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-10px, -8px) scale(1.03);
          }
        }
        @keyframes networkPulse {
          0%, 100% {
            opacity: 0.65;
          }
          50% {
            opacity: 0.95;
          }
        }
        @keyframes waveFloat {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25px);
          }
        }
        .animate-ambient-float {
          animation: ambientFloat 16s ease-in-out infinite;
        }
        .animate-network-pulse {
          animation: networkPulse 12s ease-in-out infinite;
        }
        .animate-wave-float {
          animation: waveFloat 20s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ambient-float,
          .animate-network-pulse,
          .animate-wave-float {
            animation: none !important;
          }
        }
      `}</style>

      {/* ========================================================
          BACKGROUND LAYER 1: Soft Ambient Radial Gradients (Services Theme)
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left Ambient Cyan Glow */}
        <div className="absolute -top-24 -left-24 w-[650px] h-[500px] bg-[radial-gradient(circle_at_30%_30%,rgba(8,185,232,0.14),transparent_65%)] blur-3xl animate-ambient-float" />
        
        {/* Top-Right Soft Blue/Cyan Glow */}
        <div className="absolute -top-16 -right-16 w-[600px] h-[450px] bg-[radial-gradient(circle_at_70%_30%,rgba(0,194,255,0.12),transparent_65%)] blur-3xl animate-ambient-float" style={{ animationDelay: '-6s' }} />
        
        {/* Bottom-Left Ambient Cyan Glow */}
        <div className="absolute -bottom-20 -left-12 w-[550px] h-[450px] bg-[radial-gradient(circle_at_40%_70%,rgba(8,185,232,0.10),transparent_65%)] blur-3xl animate-ambient-float" style={{ animationDelay: '-10s' }} />
        
        {/* Bottom-Right Subtle Blue Glow */}
        <div className="absolute -bottom-20 -right-12 w-[600px] h-[480px] bg-[radial-gradient(circle_at_70%_70%,rgba(2,132,199,0.08),transparent_65%)] blur-3xl animate-ambient-float" style={{ animationDelay: '-3s' }} />

        {/* Center subtle light depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] pointer-events-none" />

        {/* Tech Blueprint Micro-Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#08B9E8 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ========================================================
          BACKGROUND LAYER 2: Subtle Digital Network & Flowing Lines Pattern (Services Theme)
      ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-network-pulse"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="svcNetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.10" />
          </linearGradient>

          <filter id="svcNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* TOP-LEFT NETWORK CONSTELLATION */}
        <g stroke="url(#svcNetGrad)" strokeWidth="1.2" fill="none">
          <line x1="4%" y1="8%" x2="11%" y2="16%" />
          <line x1="11%" y1="16%" x2="7%" y2="28%" />
          <line x1="11%" y1="16%" x2="18%" y2="20%" />
          <line x1="18%" y1="20%" x2="15%" y2="34%" />
          <line x1="7%" y1="28%" x2="15%" y2="34%" />
          <line x1="18%" y1="20%" x2="25%" y2="12%" />
          <line x1="4%" y1="8%" x2="2%" y2="22%" />
          <line x1="2%" y1="22%" x2="7%" y2="28%" />
        </g>
        <g fill="#08B9E8">
          <circle cx="4%" cy="8%" r="3" fillOpacity="0.4" />
          <circle cx="4%" cy="8%" r="1.5" fillOpacity="0.8" />
          <circle cx="11%" cy="16%" r="4" fillOpacity="0.3" filter="url(#svcNodeGlow)" />
          <circle cx="11%" cy="16%" r="2" fillOpacity="0.9" />
          <circle cx="7%" cy="28%" r="3" fillOpacity="0.4" />
          <circle cx="18%" cy="20%" r="3.5" fillOpacity="0.4" />
          <circle cx="18%" cy="20%" r="1.5" fillOpacity="0.9" />
          <circle cx="15%" cy="34%" r="2.5" fillOpacity="0.5" />
          <circle cx="25%" cy="12%" r="3" fillOpacity="0.3" />
          <circle cx="2%" cy="22%" r="2" fillOpacity="0.4" />
        </g>

        {/* TOP-RIGHT NETWORK CONSTELLATION */}
        <g stroke="url(#svcNetGrad)" strokeWidth="1.2" fill="none">
          <line x1="96%" y1="10%" x2="88%" y2="18%" />
          <line x1="88%" y1="18%" x2="92%" y2="30%" />
          <line x1="88%" y1="18%" x2="80%" y2="22%" />
          <line x1="80%" y1="22%" x2="84%" y2="36%" />
          <line x1="92%" y1="30%" x2="84%" y2="36%" />
          <line x1="80%" y1="22%" x2="74%" y2="14%" />
          <line x1="96%" y1="10%" x2="98%" y2="25%" />
          <line x1="98%" y1="25%" x2="92%" y2="30%" />
        </g>
        <g fill="#00c2ff">
          <circle cx="96%" cy="10%" r="3" fillOpacity="0.4" />
          <circle cx="96%" cy="10%" r="1.5" fillOpacity="0.8" />
          <circle cx="88%" cy="18%" r="4" fillOpacity="0.3" filter="url(#svcNodeGlow)" />
          <circle cx="88%" cy="18%" r="2" fillOpacity="0.9" />
          <circle cx="92%" cy="30%" r="3" fillOpacity="0.4" />
          <circle cx="80%" cy="22%" r="3.5" fillOpacity="0.4" />
          <circle cx="80%" cy="22%" r="1.5" fillOpacity="0.9" />
          <circle cx="84%" cy="36%" r="2.5" fillOpacity="0.5" />
          <circle cx="74%" cy="14%" r="3" fillOpacity="0.3" />
          <circle cx="98%" cy="25%" r="2" fillOpacity="0.4" />
        </g>

        {/* BOTTOM-LEFT & BOTTOM-RIGHT CORNER NODES */}
        <g stroke="url(#svcNetGrad)" strokeWidth="1.2" fill="none">
          <line x1="3%" y1="78%" x2="9%" y2="88%" />
          <line x1="9%" y1="88%" x2="16%" y2="82%" />
          <line x1="97%" y1="76%" x2="91%" y2="86%" />
          <line x1="91%" y1="86%" x2="83%" y2="80%" />
        </g>
        <g fill="#08B9E8">
          <circle cx="3%" cy="78%" r="2.5" fillOpacity="0.4" />
          <circle cx="9%" cy="88%" r="3" fillOpacity="0.3" />
          <circle cx="16%" cy="82%" r="2" fillOpacity="0.5" />
          <circle cx="97%" cy="76%" r="2.5" fillOpacity="0.4" />
          <circle cx="91%" cy="86%" r="3" fillOpacity="0.3" />
          <circle cx="83%" cy="80%" r="2" fillOpacity="0.5" />
        </g>
      </svg>

      {/* ========================================================
          BACKGROUND LAYER 3: Subtle Flowing Wave Curves (Near Bottom)
      ======================================================== */}
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-0 overflow-hidden opacity-75 animate-wave-float">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <path
            d="M-50,130 C220,70 540,170 880,100 C1180,40 1350,140 1500,90"
            stroke="#08B9E8"
            strokeWidth="1.5"
            strokeOpacity="0.12"
            strokeDasharray="5 7"
          />
          <path
            d="M-50,165 C300,110 650,200 1000,125 C1300,65 1420,150 1500,120"
            stroke="#00c2ff"
            strokeWidth="1.2"
            strokeOpacity="0.10"
          />
        </svg>
      </div>

      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
      />

      <main className="flex-1 pt-32 pb-24 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 mb-8">
            <Link to="/" className="hover:text-[#08B9E8] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#services" className="hover:text-[#08B9E8] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#08B9E8] font-bold">{currentService.title}</span>
          </div>

          {/* Hero Header for Service */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 mb-12 relative overflow-hidden shadow-sm">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0088EE] tracking-[-0.03em] leading-tight">
                  {currentService.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                  {currentService.overview || currentService.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => navigate('/#contact')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-md shadow-[#08B9E8]/20 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/our-products')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[#061827] bg-white hover:bg-[#0088EE] hover:text-white hover:border-[#0088EE] border border-slate-200 transition-all duration-200 cursor-pointer shadow-2xs active:scale-[0.98]"
                  >
                    <span>Explore Products</span>
                  </button>
                </div>
              </div>

              {/* Service Visual Preview */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-100">
                  <img
                    src={currentService.image}
                    alt={currentService.title}
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061827]/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#08B9E8] text-[#071827] flex items-center justify-center shadow-md">
                      {icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200">Domain Excellence</div>
                      <div className="text-sm font-bold text-white">{currentService.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deliverables & Capabilities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Left: Key Capabilities */}
            <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm">
              <div className="flex items-center gap-2 text-[#08B9E8] text-xs font-bold uppercase tracking-widest">
                <Layers className="w-4 h-4" />
                <span>Engineering Capabilities</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#061827] tracking-[-0.02em]">
                What We Deliver
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {currentService.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {currentService.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F5FAFD] border border-slate-200/80 flex items-start gap-3.5 hover:border-[#08B9E8]/50 hover:bg-white transition-all shadow-2xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#08B9E8] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 leading-snug">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technology Stack & Fast Contact */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tech Stack Card */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-widest">
                  Core Tech Stack
                </div>
                <h3 className="text-xl font-bold text-[#061827]">
                  Tools & Frameworks
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {currentService.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-[#E8F7FC] border border-[#08B9E8]/20 text-xs font-bold text-[#08B9E8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation CTA Card */}
              <div className="bg-gradient-to-br from-[#E8F7FC] via-white to-white border border-[#08B9E8]/30 rounded-3xl p-8 space-y-4 text-left shadow-sm">
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#E8F7FC] text-[#08B9E8] text-xs font-bold">
                  <span>Expert Advisory</span>
                </div>
                <h3 className="text-xl font-bold text-[#061827]">
                  Ready to start your project?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Connect with our lead architects to discuss requirements, architecture, and timeline estimates.
                </p>
                <button
                  onClick={() => navigate('/#contact')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all cursor-pointer shadow-md shadow-[#08B9E8]/20 active:scale-[0.98]"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>



          {/* Related Services Carousel/Cross-links */}
          <div className="pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-widest mb-1">
                  Explore More
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#061827]">
                  Other Specialized Services
                </h2>
              </div>
              <Link
                to="/#services"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#08B9E8] hover:underline"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.slice(0, 3).map((service) => {
                const sIcon = SERVICE_ICONS[service.id] || <Monitor className="w-6 h-6" />;
                return (
                  <div
                    key={service.id}
                    onClick={() => navigate(`/service/${service.id}`)}
                    className="group bg-white hover:bg-[#F5FAFD] border border-slate-200/90 hover:border-[#08B9E8]/60 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] group-hover:scale-110 transition-transform">
                        {sIcon}
                      </div>
                      <h3 className="text-lg font-bold text-[#061827] group-hover:text-[#08B9E8] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#08B9E8]">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>



      <Footer
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      {/* <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectService={() => {
          setIsQuizOpen(false);
          navigate('/#contact');
        }}
      /> */}
    </div>
  );
};
