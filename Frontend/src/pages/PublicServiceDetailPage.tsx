import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { REQUIN_SERVICES, ServiceItem } from '../data/requinData';
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
  const currentService: ServiceItem | undefined = REQUIN_SERVICES.find(
    (s) => s.id.toLowerCase() === serviceId?.toLowerCase()
  ) || REQUIN_SERVICES[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const icon = (currentService && SERVICE_ICONS[currentService.id]) || <Monitor className="w-8 h-8" />;
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
                    onClick={() => navigate('/#products')}
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
