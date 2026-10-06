import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import {
  REQUIN_SERVICES,
  ServiceItem,
  SOFTWARE_PORTFOLIO_ITEMS,
  SoftwareSolutionItem,
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
  Sparkles,
  Layers,
  ChevronRight,
  Check,
  X,
  GitBranch,
  Server,
  ShieldCheck,
  Activity,
  Globe,
  Code2,
  Zap,
  BarChart3,
  Search,
} from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'web-development': <Monitor className="w-8 h-8 stroke-[1.8]" />,
  'mobile-development': <Smartphone className="w-8 h-8 stroke-[1.8]" />,
  'software-solutions': <Cpu className="w-8 h-8 stroke-[1.8]" />,
  'cloud-solutions': <Cloud className="w-8 h-8 stroke-[1.8]" />,
  'digital-marketing': <TrendingUp className="w-8 h-8 stroke-[1.8]" />,
  'academic-assistance': <GraduationCap className="w-8 h-8 stroke-[1.8]" />,
};

interface AcademicItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  topics: string[];
}

const ACADEMIC_ITEMS: AcademicItem[] = [
  {
    id: 'research',
    title: 'Computational Research & System Modeling',
    category: 'Research',
    description: 'Assisting research institutions and graduate laboratories in mathematical simulation, dataset analysis, and prototype development.',
    image: '/images/requin_software_team_1790576614688.jpg',
    topics: ['Data modeling & statistics', 'Algorithm validation', 'Simulation scripting']
  },
  {
    id: 'articles',
    title: 'Technical Publications & Whitepapers',
    category: 'Articles',
    description: 'In-depth engineering articles, architectural whitepapers, and industry technology analyses authored by our senior architects.',
    image: '/images/modern_software_mockup_1790576657118.jpg',
    topics: ['System design blueprints', 'Cloud migration case analyses', 'Security protocols']
  },
  {
    id: 'training',
    title: 'Professional Engineering Training',
    category: 'Training',
    description: 'Hands-on training curriculums for computer science students and early-career developers in production-grade software practices.',
    image: '/images/digital_agency_office_1790576645354.jpg',
    topics: ['Modern React & TypeScript', 'Backend API architecture', 'GitOps & CI/CD workflows']
  },
  {
    id: 'documentation',
    title: 'Project Architecture & Documentation',
    category: 'Documentation',
    description: 'Comprehensive system specifications, API schemas, deployment manuals, and institutional technology documentation.',
    image: '/images/cloud_infrastructure_1790576629897.jpg',
    topics: ['OpenAPI / Swagger specs', 'System architecture diagrams', 'Deployment runbooks']
  }
];

export const PublicServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activePortfolioItem, setActivePortfolioItem] = useState<SoftwareSolutionItem | null>(null);
  const [activeAcademicItem, setActiveAcademicItem] = useState<AcademicItem | null>(null);

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
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E8F7FC] border border-[#08B9E8]/30 text-xs font-bold tracking-wider uppercase text-[#08B9E8] shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentService.category}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061827] tracking-[-0.03em] leading-tight">
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
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[#061827] bg-white hover:bg-slate-50 border border-slate-200 transition-all duration-200 cursor-pointer shadow-2xs"
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F7FC] text-[#08B9E8] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
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

          {/* ========================================================
              SERVICE-SPECIFIC PORTFOLIO & DEEP ARCHITECTURE SHOWCASE
          ======================================================== */}
          {/* 1. SOFTWARE SOLUTIONS SPECIFIC SHOWCASE */}
          {currentService.id === 'software-solutions' && (
            <div className="mb-20 space-y-8">
              <div className="text-left">
                <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-widest mb-2">
                  Custom Software Portfolio
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061827] tracking-tight">
                  Featured Software Builds & Enterprise Applications
                </h2>
                <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
                  Tailored software applications built to solve complex organizational challenges, automate workflows, and connect systems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SOFTWARE_PORTFOLIO_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActivePortfolioItem(item)}
                    className="group cursor-pointer bg-white rounded-3xl border border-slate-200/90 hover:border-[#08B9E8]/60 shadow-[0_4px_20px_-4px_rgba(8,185,232,0.08),0_2px_8px_-2px_rgba(11,23,38,0.04)] hover:shadow-[0_20px_45px_-10px_rgba(0,194,255,0.25),0_8px_16px_-4px_rgba(11,23,38,0.06)] transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col text-left"
                  >
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-md text-xs font-bold text-[#08B9E8] shadow-xs">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-[#061827] group-hover:text-[#08B9E8] transition-colors duration-200">
                          {item.title}
                        </h3>
                        <div className="text-xs font-bold text-[#08B9E8]">
                          {item.subtitle}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed pt-1">
                          {item.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-slate-100">
                        {item.keyOutcomes.slice(0, 2).map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-[#08B9E8] shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((t, idx) => (
                            <span key={idx} className="text-[11px] font-medium text-slate-600 bg-[#F5FAFD] border border-slate-200 px-2.5 py-0.5 rounded-lg">
                              {t}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#08B9E8] group-hover:text-[#0088EE] transition-colors">
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. CLOUD SOLUTIONS SPECIFIC SHOWCASE */}
          {currentService.id === 'cloud-solutions' && (
            <div className="mb-20 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-[#08B9E8] uppercase mb-2">
                      Infrastructure & DevOps
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061827] tracking-[-0.03em]">
                      Cloud Architecture & Foundations
                    </h2>
                  </div>

                  <p className="text-base text-slate-600 leading-relaxed font-normal">
                    Modern enterprises cannot afford fragile infrastructure. Requin Solutions designs and operates high-availability multi-cloud foundations engineered for zero-downtime scalability, hardened security, and automated deployments.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="p-4 rounded-2xl bg-[#F5FAFD] border border-slate-200/80 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                        <GitBranch className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#061827]">Automated CI/CD & GitOps</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          Automated build, test, and release pipelines ensuring rapid cycle iterations with automated rollback triggers.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F5FAFD] border border-slate-200/80 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                        <Server className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#061827]">Containerization & Kubernetes</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          Elastic container orchestration across AWS EKS and Google Kubernetes Engine for dynamic workload distribution.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F5FAFD] border border-slate-200/80 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#061827]">Zero-Trust Cloud Security</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          Encrypted storage at rest and in transit, IAM access isolation, automated secret rotation, and audit compliance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg group bg-slate-100">
                    <img
                      src="/images/cloud_infrastructure_1790576629897.jpg"
                      alt="Cloud Infrastructure Visualization"
                      className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061827]/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md flex items-center justify-between shadow-md">
                      <div>
                        <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider">
                          Infrastructure as Code
                        </div>
                        <div className="text-sm font-bold text-[#061827] mt-0.5">
                          Multi-Cloud Terraform Blueprints
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 font-medium">
                          AWS · Google Cloud · Azure Supported
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#E8F7FC] text-[#08B9E8] flex items-center justify-center">
                        <Activity className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. ACADEMIC ASSISTANCE SPECIFIC SHOWCASE */}
          {currentService.id === 'academic-assistance' && (
            <div className="mb-20 space-y-8">
              <div className="text-left">
                <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-widest mb-2">
                  Knowledge & Academic Excellence
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061827] tracking-tight">
                  Academic Solutions, Research & Training
                </h2>
                <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
                  Bridging theoretical computer science and production software engineering through applied research support, technical publications, and developer training.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ACADEMIC_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveAcademicItem(item)}
                    className="group cursor-pointer bg-white rounded-3xl border border-slate-200/90 hover:border-[#08B9E8]/60 shadow-[0_4px_20px_-4px_rgba(8,185,232,0.08),0_2px_8px_-2px_rgba(11,23,38,0.04)] hover:shadow-[0_20px_45px_-10px_rgba(0,194,255,0.25),0_8px_16px_-4px_rgba(11,23,38,0.06)] transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between text-left"
                  >
                    <div>
                      <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-bold text-[#08B9E8] border border-slate-200 shadow-xs">
                          {item.category}
                        </div>
                      </div>

                      <div className="p-5 space-y-2.5">
                        <h3 className="text-lg font-bold text-[#061827] group-hover:text-[#08B9E8] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>

                        <div className="space-y-1.5 pt-2">
                          {item.topics.map((t, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                              <Check className="w-3 h-3 text-[#08B9E8] shrink-0" />
                              <span className="truncate">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#08B9E8] group-hover:text-[#0088EE] transition-colors">
                        <span>Learn more</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. WEB DEVELOPMENT SPECIFIC SHOWCASE */}
          {currentService.id === 'web-development' && (
            <div className="mb-20 space-y-8">
              <div className="text-left">
                <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-widest mb-2">
                  Modern Web Architecture
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061827] tracking-tight">
                  High-Performance Web Platforms & Portals
                </h2>
                <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
                  From lightning-fast headless ecommerce backends to interactive enterprise portals, we engineer scalable web solutions with sub-second response times.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left hover:border-[#08B9E8]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#061827]">Full-Stack SSR & Next.js</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Zero layout shifts, sub-100ms Largest Contentful Paint (LCP), and dynamic server rendering.
                  </p>
                </div>

                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left hover:border-[#08B9E8]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#061827]">Headless Commerce & APIs</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Custom GraphQL & REST endpoints connected to payment gateways, inventory feeds, and ERP engines.
                  </p>
                </div>

                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left hover:border-[#08B9E8]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#061827]">Core Web Vitals Mastery</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Engineered for 95+ Google Lighthouse scores with automated asset compression and CDN caching.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 5. MOBILE DEVELOPMENT SPECIFIC SHOWCASE */}
          {currentService.id === 'mobile-development' && (
            <div className="mb-20 space-y-8">
              <div className="text-left">
                <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-widest mb-2">
                  Native & Hybrid Mobile Ecosystem
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061827] tracking-tight">
                  Mobile Application Engineering & Sync
                </h2>
                <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
                  Smooth 60fps mobile applications engineered with offline data persistence, biometrics, and real-time push protocols.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left hover:border-[#08B9E8]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#061827]">React Native & Flutter</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Unified codebase targeting iOS and Android with pixel-perfect native animations and gestures.
                  </p>
                </div>

                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left hover:border-[#08B9E8]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#061827]">Biometric & Hardware Auth</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Seamless Touch ID / Face ID authentication, NFC reader support, and encrypted on-device storage.
                  </p>
                </div>

                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left hover:border-[#08B9E8]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#061827]">Offline Sync & Fastlane CI</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Background sync with automatic conflict resolution and automated builds shipped to TestFlight and Play Store.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. DIGITAL MARKETING SPECIFIC SHOWCASE */}
          {currentService.id === 'digital-marketing' && (
            <div className="mb-20 space-y-8">
              <div className="text-left">
                <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-widest mb-2">
                  Growth & Performance Engineering
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061827] tracking-tight">
                  Technical SEO & Inbound Funnel Optimization
                </h2>
                <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
                  Combining code-level semantic optimization with data analytics to turn organic traffic into qualified high-intent conversions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left hover:border-[#08B9E8]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#061827]">Technical SEO Audits</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    JSON-LD schema modeling, XML sitemaps, semantic hierarchy, and crawl budget optimizations.
                  </p>
                </div>

                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left hover:border-[#08B9E8]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#061827]">Attribution & GA4 Analytics</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Multi-touch attribution models, server-side tagging, and custom conversion funnel telemetry.
                  </p>
                </div>

                <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-left hover:border-[#08B9E8]/60 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#061827]">Conversion Rate Optimization</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A/B split testing, UX heatmapping, and streamlined checkout & inquiry friction reduction.
                  </p>
                </div>
              </div>
            </div>
          )}

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

      {/* Portfolio Detail Modal for Software Solutions */}
      {activePortfolioItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/85 backdrop-blur-md">
          <div className="bg-white text-[#0B1726] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-left border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActivePortfolioItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider">
                {activePortfolioItem.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#061827]">
                {activePortfolioItem.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {activePortfolioItem.description}
              </p>

              <div className="rounded-2xl overflow-hidden h-52 bg-slate-100 border border-slate-200">
                <img
                  src={activePortfolioItem.image}
                  alt={activePortfolioItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#061827] uppercase">Key Impact & Outcomes</div>
                <div className="space-y-2">
                  {activePortfolioItem.keyOutcomes.map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-[#08B9E8] mt-0.5 shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-medium">
                  Tech Stack: {activePortfolioItem.tags.join(', ')}
                </div>
                <button
                  onClick={() => {
                    setActivePortfolioItem(null);
                    navigate('/#contact');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 cursor-pointer active:scale-[0.98]"
                >
                  <span>Inquire About Similar Build</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Academic Detail Modal */}
      {activeAcademicItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/85 backdrop-blur-md">
          <div className="bg-white text-[#0B1726] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveAcademicItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider">
                {activeAcademicItem.category}
              </span>
              <h3 className="text-2xl font-black text-[#061827]">{activeAcademicItem.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{activeAcademicItem.description}</p>
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-[#061827] uppercase">Focus Areas</div>
                {activeAcademicItem.topics.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-[#08B9E8]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    setActiveAcademicItem(null);
                    navigate('/#contact');
                  }}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 cursor-pointer active:scale-[0.98]"
                >
                  Contact Academic Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectService={() => {
          setIsQuizOpen(false);
          navigate('/#contact');
        }}
      />
    </div>
  );
};
