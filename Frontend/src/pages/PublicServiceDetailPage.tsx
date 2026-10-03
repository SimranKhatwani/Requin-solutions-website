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
  BookOpen,
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
    <div className="min-h-screen bg-[#071827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5]">
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
      />

      <main className="flex-1 pt-32 pb-24 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#08B9E8]">{currentService.title}</span>
          </div>

          {/* Hero Header for Service */}
          <div className="bg-gradient-to-br from-[#0B1F33] to-[#081726] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 mb-12 relative overflow-hidden shadow-2xl">
            {/* Ambient Cyan Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00c2ff]/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#08B9E8]/15 border border-[#08B9E8]/30 text-xs font-bold tracking-wider uppercase text-[#08B9E8]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentService.category}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight">
                  {currentService.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                  {currentService.overview || currentService.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => navigate('/#contact')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[#05131f] bg-[#00c2ff] hover:bg-[#38d4ff] transition-all duration-200 shadow-lg shadow-[#00c2ff]/25 cursor-pointer"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/our-products')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-transparent hover:bg-white/5 border border-white/20 transition-all duration-200 cursor-pointer"
                  >
                    <span>Explore Products</span>
                  </button>
                </div>
              </div>

              {/* Service Visual Preview */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#061523]">
                  <img
                    src={currentService.image}
                    alt={currentService.title}
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071827] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00c2ff] text-[#05131f] flex items-center justify-center shadow-lg">
                      {icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400">Domain Excellence</div>
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
            <div className="lg:col-span-8 bg-[#0B1F33]/80 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
              <div className="flex items-center gap-2 text-[#08B9E8] text-xs font-bold uppercase tracking-widest">
                <Layers className="w-4 h-4" />
                <span>Engineering Capabilities</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em]">
                What We Deliver
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentService.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {currentService.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3.5 hover:border-[#08B9E8]/30 transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#08B9E8] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-200 leading-snug">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technology Stack & Fast Contact */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tech Stack Card */}
              <div className="bg-[#0B1F33]/80 border border-white/10 rounded-3xl p-8 space-y-4">
                <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-widest">
                  Core Tech Stack
                </div>
                <h3 className="text-xl font-bold text-white">
                  Tools & Frameworks
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {currentService.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation CTA Card */}
              <div className="bg-gradient-to-br from-[#08B9E8]/20 via-[#0B1F33] to-[#0B1F33] border border-[#08B9E8]/30 rounded-3xl p-8 space-y-4 text-left">
                <h3 className="text-xl font-bold text-white">
                  Ready to start your project?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Connect with our lead architects to discuss requirements, architecture, and timeline estimates.
                </p>
                <button
                  onClick={() => navigate('/#contact')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-[#05131f] bg-[#00c2ff] hover:bg-[#38d4ff] transition-all cursor-pointer shadow-md"
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Featured Software Builds & Enterprise Applications
                </h2>
                <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                  Tailored software applications built to solve complex organizational challenges, automate workflows, and connect systems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SOFTWARE_PORTFOLIO_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActivePortfolioItem(item)}
                    className="group cursor-pointer bg-[#0A1B2D]/90 rounded-2xl border border-[#08B9E8]/20 hover:border-[#08B9E8]/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col text-left"
                  >
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071827] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4 bg-[#061827]/90 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md text-xs font-semibold text-[#08B9E8] shadow-sm">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#08B9E8] transition-colors duration-200">
                          {item.title}
                        </h3>
                        <div className="text-xs font-medium text-[#08B9E8]">
                          {item.subtitle}
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed pt-1">
                          {item.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-white/10">
                        {item.keyOutcomes.slice(0, 2).map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-[#08B9E8] shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((t, idx) => (
                            <span key={idx} className="text-[11px] font-medium text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#08B9E8] group-hover:text-[#4DD4F5] transition-colors">
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
            <div className="mb-20 bg-gradient-to-br from-[#0A1B2D] to-[#071827] border border-[#08B9E8]/25 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
              <div
                className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#08B9E8]/10 blur-[140px] rounded-full pointer-events-none -translate-y-1/2"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-2">
                      Infrastructure & DevOps
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em]">
                      Cloud Architecture & Foundations
                    </h2>
                  </div>

                  <p className="text-base text-slate-300 leading-relaxed">
                    Modern enterprises cannot afford fragile infrastructure. Requin Solutions designs and operates high-availability multi-cloud foundations engineered for zero-downtime scalability, hardened security, and automated deployments.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#08B9E8]/10 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                        <GitBranch className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Automated CI/CD & GitOps</h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                          Automated build, test, and release pipelines ensuring rapid cycle iterations with automated rollback triggers.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#08B9E8]/10 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                        <Server className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Containerization & Kubernetes</h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                          Elastic container orchestration across AWS EKS and Google Kubernetes Engine for dynamic workload distribution.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#08B9E8]/10 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Zero-Trust Cloud Security</h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                          Encrypted storage at rest and in transit, IAM access isolation, automated secret rotation, and audit compliance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                    <img
                      src="/images/cloud_infrastructure_1790576629897.jpg"
                      alt="Cloud Infrastructure Visualization"
                      className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/90 via-transparent to-black/20 pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B2235]/95 border border-white/15 backdrop-blur-md flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-[#08B9E8] uppercase tracking-wider">
                          Infrastructure as Code
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">
                          Multi-Cloud Terraform Blueprints
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          AWS · Google Cloud · Azure Supported
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-[#08B9E8]/20 text-[#08B9E8] flex items-center justify-center">
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Academic Solutions, Research & Training
                </h2>
                <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                  Bridging theoretical computer science and production software engineering through applied research support, technical publications, and developer training.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ACADEMIC_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveAcademicItem(item)}
                    className="group cursor-pointer bg-[#0A1B2D]/90 rounded-2xl border border-[#08B9E8]/20 hover:border-[#08B9E8]/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between text-left"
                  >
                    <div>
                      <div className="h-44 w-full overflow-hidden bg-slate-900 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-[#061827]/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-[#08B9E8] border border-white/10 shadow-sm">
                          {item.category}
                        </div>
                      </div>

                      <div className="p-5 space-y-2.5">
                        <h3 className="text-lg font-bold text-white group-hover:text-[#08B9E8] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>

                        <div className="space-y-1.5 pt-2">
                          {item.topics.map((t, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                              <Check className="w-3 h-3 text-[#08B9E8] shrink-0" />
                              <span className="truncate">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#08B9E8] group-hover:text-[#4DD4F5] transition-colors">
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  High-Performance Web Platforms & Portals
                </h2>
                <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                  From lightning-fast headless ecommerce backends to interactive enterprise portals, we engineer scalable web solutions with sub-second response times.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#0A1B2D]/90 border border-[#08B9E8]/20 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#08B9E8]/15 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Full-Stack SSR & Next.js</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Zero layout shifts, sub-100ms Largest Contentful Paint (LCP), and dynamic server rendering.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A1B2D]/90 border border-[#08B9E8]/20 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#08B9E8]/15 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Headless Commerce & APIs</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Custom GraphQL & REST endpoints connected to payment gateways, inventory feeds, and ERP engines.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A1B2D]/90 border border-[#08B9E8]/20 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#08B9E8]/15 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Core Web Vitals Mastery</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Mobile Application Engineering & Sync
                </h2>
                <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                  Smooth 60fps mobile applications engineered with offline data persistence, biometrics, and real-time push protocols.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#0A1B2D]/90 border border-[#08B9E8]/20 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#08B9E8]/15 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">React Native & Flutter</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Unified codebase targeting iOS and Android with pixel-perfect native animations and gestures.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A1B2D]/90 border border-[#08B9E8]/20 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#08B9E8]/15 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Biometric & Hardware Auth</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Seamless Touch ID / Face ID authentication, NFC reader support, and encrypted on-device storage.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A1B2D]/90 border border-[#08B9E8]/20 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#08B9E8]/15 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Offline Sync & Fastlane CI</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Technical SEO & Inbound Funnel Optimization
                </h2>
                <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                  Combining code-level semantic optimization with data analytics to turn organic traffic into qualified high-intent conversions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#0A1B2D]/90 border border-[#08B9E8]/20 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#08B9E8]/15 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Technical SEO Audits</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    JSON-LD schema modeling, XML sitemaps, semantic hierarchy, and crawl budget optimizations.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A1B2D]/90 border border-[#08B9E8]/20 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#08B9E8]/15 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Attribution & GA4 Analytics</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Multi-touch attribution models, server-side tagging, and custom conversion funnel telemetry.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A1B2D]/90 border border-[#08B9E8]/20 space-y-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#08B9E8]/15 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8]">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Conversion Rate Optimization</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    A/B split testing, UX heatmapping, and streamlined checkout & inquiry friction reduction.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Related Services Carousel/Cross-links */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-widest mb-1">
                  Explore More
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Other Specialized Services
                </h2>
              </div>
              <Link
                to="/#services"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#00c2ff] hover:underline"
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
                    className="group bg-[#0B1F33]/60 hover:bg-[#0B1F33] border border-white/10 hover:border-[#00c2ff]/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#08B9E8] group-hover:scale-105 transition-transform">
                        {sIcon}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00c2ff] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#08B9E8]">
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
          <div className="bg-[#0A1B2D] text-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-left border border-[#08B9E8]/30 overflow-hidden">
            <button
              onClick={() => setActivePortfolioItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider">
                {activePortfolioItem.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activePortfolioItem.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activePortfolioItem.description}
              </p>

              <div className="rounded-xl overflow-hidden h-52 bg-slate-900 border border-white/10">
                <img
                  src={activePortfolioItem.image}
                  alt={activePortfolioItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-white uppercase">Key Impact & Outcomes</div>
                <div className="space-y-2">
                  {activePortfolioItem.keyOutcomes.map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-[#08B9E8] mt-0.5 shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Tech Stack: {activePortfolioItem.tags.join(', ')}
                </div>
                <button
                  onClick={() => {
                    setActivePortfolioItem(null);
                    navigate('/#contact');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-colors"
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
          <div className="bg-[#0A1B2D] text-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left border border-[#08B9E8]/30">
            <button
              onClick={() => setActiveAcademicItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider">
                {activeAcademicItem.category}
              </span>
              <h3 className="text-2xl font-bold text-white">{activeAcademicItem.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{activeAcademicItem.description}</p>
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-white uppercase">Focus Areas</div>
                {activeAcademicItem.topics.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-[#08B9E8]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => {
                    setActiveAcademicItem(null);
                    navigate('/#contact');
                  }}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-colors"
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
