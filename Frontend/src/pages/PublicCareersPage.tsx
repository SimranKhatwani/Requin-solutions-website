import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { ChatWidget } from '../components/ChatWidget';
import { careerService, CareerItem } from '../services/careerService';
import {
  Briefcase,
  MapPin,
  Clock,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Send,
  X,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  Building,
  HeartHandshake,
  Laptop,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';

export const PublicCareersPage: React.FC = () => {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Application Modal State
  const [selectedCareer, setSelectedCareer] = useState<CareerItem | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    experienceLevel: '2+ Years',
    portfolioUrl: '',
    resumeUrl: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const res = await careerService.getPublishedCareers();
        if (res.data) setCareers(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load career openings.');
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const departments = ['All', ...Array.from(new Set(careers.map((c) => c.department).filter(Boolean)))];

  const filteredCareers = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.requirements && c.requirements.some((r) => r.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesDept =
      selectedDepartment === 'All' || c.department.toLowerCase() === selectedDepartment.toLowerCase();

    const matchesType =
      selectedType === 'All' || c.employmentType.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesDept && matchesType;
  });

  const handleOpenApply = (career?: CareerItem) => {
    setSelectedCareer(career || null);
    setApplyForm({
      name: '',
      email: '',
      phone: '',
      experienceLevel: career?.experience || '2+ Years',
      portfolioUrl: '',
      resumeUrl: '',
      message: '',
    });
    setApplyError(null);
    setApplySuccess(false);
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name.trim() || !applyForm.email.trim()) {
      setApplyError('Please provide your name and email address.');
      return;
    }

    setSubmitting(true);
    setApplyError(null);

    try {
      // 1. Submit to Backend API
      await careerService.applyForJob({
        careerId: selectedCareer?.id,
        jobTitle: selectedCareer?.title || 'Open Engineering Application',
        name: applyForm.name.trim(),
        email: applyForm.email.trim(),
        phone: applyForm.phone.trim(),
        experienceLevel: applyForm.experienceLevel.trim(),
        portfolioUrl: applyForm.portfolioUrl.trim(),
        resumeUrl: applyForm.resumeUrl.trim(),
        message: applyForm.message.trim(),
      });

      // 2. Also forward to Hr@requinsolutions.com via FormSubmit AJAX service
      const payload = new FormData();
      payload.append('Role', selectedCareer?.title || 'Open Engineering Candidate');
      payload.append('Candidate Name', applyForm.name.trim());
      payload.append('Email', applyForm.email.trim());
      payload.append('Phone', applyForm.phone.trim());
      payload.append('Experience Level', applyForm.experienceLevel.trim());
      payload.append('Portfolio / Resume URL', applyForm.portfolioUrl.trim());
      payload.append('Cover Note', applyForm.message.trim());
      payload.append('_subject', `New Job Application: ${selectedCareer?.title || 'Open Application'} from ${applyForm.name.trim()}`);
      payload.append('_replyto', applyForm.email.trim());
      payload.append('_captcha', 'false');

      fetch('https://formsubmit.co/ajax/Hr@requinsolutions.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      }).catch((err) => console.log('Candidate FormSubmit notification:', err));

      setApplySuccess(true);
    } catch (err: any) {
      setApplyError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDF5FD] text-slate-800 flex flex-col font-sans selection:bg-[#08B9E8]/30 selection:text-[#0A2540]">
      {/* Navigation */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={(sectionId) => {
          navigate(`/#${sectionId}`);
        }}
      />

      <main className="flex-1 pt-28 pb-20">
        {/* ========================================================
            LIGHT BLUE HERO SECTION
        ======================================================== */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center pt-8 pb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#BDE0FE] text-[#0088CC] text-xs sm:text-sm font-bold mb-6 shadow-xs animate-in fade-in zoom-in-95 duration-300">
            <Sparkles className="w-4 h-4 text-[#0099FF]" />
            <span>Careers at Requin Solutions </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A2540] tracking-tight leading-tight max-w-4xl mx-auto">
            Build the Future of{' '}
            <span className="bg-gradient-to-r from-[#0088EE] to-[#08B9E8] bg-clip-text text-transparent">
              Enterprise Software
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-5 leading-relaxed font-medium">
            Join our team and be part of an extraordinary journey of innovation and growth.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
            <div className="p-5 rounded-2xl bg-white border border-[#D3E6F8] shadow-xs text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#0088EE]">
                {loading ? '...' : careers.length}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">Open Positions</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#D3E6F8] shadow-xs text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#0088EE]">1</div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">Office Location</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#D3E6F8] shadow-xs text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#0088EE]">10+</div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">Industry Certifications</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#D3E6F8] shadow-xs text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#0088EE]">100%</div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">Customer Retention</div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CULTURE & PERKS (LIGHT THEME)
        ======================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10 border-t border-[#D3E6F8]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
              Why Engineers Love Working at Requin
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              We foster a collaborative culture built on technical excellence, transparent ownership, and rapid career progression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#D3E6F8] shadow-xs hover:border-[#08B9E8] hover:shadow-md transition-all text-left">
              <div className="w-12 h-12 rounded-xl bg-[#E6F4FE] text-[#0088EE] flex items-center justify-center mb-4">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540] mb-2">Modern Hardware & Tools</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Work with top-tier developer machines, multi-monitor workstations, premium SaaS licenses, and direct cloud sandboxes.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#D3E6F8] shadow-xs hover:border-[#08B9E8] hover:shadow-md transition-all text-left">
              <div className="w-12 h-12 rounded-xl bg-[#E6F4FE] text-[#0088EE] flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540] mb-2">Fast Growth & Appraisals</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Biannual appraisal cycles, milestone-based performance bonuses, and direct technical mentorship from senior software architects.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#D3E6F8] shadow-xs hover:border-[#08B9E8] hover:shadow-md transition-all text-left">
              <div className="w-12 h-12 rounded-xl bg-[#E6F4FE] text-[#0088EE] flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540] mb-2">Empowering Work Culture</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Flexible hybrid work policies, comprehensive health insurance coverage, sponsored technical certifications, and team offsites.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            DYNAMIC OPEN ROLES SECTION (CONTROLLED BY ADMIN PANEL)
        ======================================================== */}
        <section id="openings" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10 border-t border-[#D3E6F8]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
                Current Openings
              </h2>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Live vacancies updated in real time directly from our engineering management desk.
              </p>
            </div>

            {/* Search Input */}
            {careers.length > 0 && (
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by role, skills, stack..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#D3E6F8] text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0099FF] shadow-xs"
                />
              </div>
            )}
          </div>

          {/* Department Filter Pills (Only shown when there are careers) */}
          {careers.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8 text-left">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedDepartment === dept
                      ? 'bg-[#0099FF] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-[#D3E6F8] hover:border-[#0099FF]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}

          {/* Openings Grid / Clean Empty State */}
          {loading ? (
            <div className="py-20 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#0099FF]" />
              <p className="text-sm font-medium">Loading active career opportunities...</p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-white border border-red-200 text-center max-w-lg mx-auto shadow-sm">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          ) : filteredCareers.length === 0 ? (
            /* Clean Empty State when no fake data is present */
            <div className="py-14 px-6 sm:px-10 text-center rounded-3xl bg-white border border-[#D3E6F8] max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#E6F4FE] text-[#0088EE] flex items-center justify-center mx-auto mb-4 shadow-xs">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0A2540]">
                No Current Openings Posted
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                We do not have active public vacancies listed at this moment. Roles are added and managed directly through our Admin Panel.
              </p>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Want to work with us in Jaipur? You can submit an open application with your resume directly below!
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handleOpenApply()}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0099FF] to-[#08B9E8] hover:from-[#0088EE] hover:to-[#00A8D8] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Open Application</span>
                </button>

                <a
                  href="mailto:Hr@requinsolutions.com?subject=Open%20Application%20-%20Requin%20Solutions"
                  className="px-5 py-2.5 rounded-xl bg-[#F0F7FD] hover:bg-[#E2F0FC] text-[#0088EE] border border-[#BDE0FE] font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email: Hr@requinsolutions.com</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
              {filteredCareers.map((career) => (
                <div
                  key={career.id}
                  id={career.slug}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-[#D3E6F8] hover:border-[#0099FF] hover:shadow-md transition-all duration-200 shadow-xs flex flex-col justify-between group"
                >
                  <div>
                    {/* Role Header */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-md bg-[#E6F4FE] border border-[#BDE0FE] text-[#0088CC] text-[11px] font-bold tracking-wide uppercase">
                          {career.department}
                        </span>
                        <h3 className="text-xl font-extrabold text-[#0A2540] mt-2 group-hover:text-[#0088EE] transition-colors leading-snug">
                          {career.title}
                        </h3>
                      </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 my-3">
                      <div className="flex items-center gap-1.5 bg-[#F5F9FD] px-2.5 py-1 rounded-lg border border-[#E2EEF8]">
                        <MapPin className="w-3.5 h-3.5 text-[#0088EE]" />
                        <span>{career.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#F5F9FD] px-2.5 py-1 rounded-lg border border-[#E2EEF8]">
                        <Clock className="w-3.5 h-3.5 text-[#0088EE]" />
                        <span>{career.employmentType} · {career.experience}</span>
                      </div>
                      {career.salary && (
                        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>{career.salary}</span>
                        </div>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {career.shortDescription}
                    </p>

                    {/* Requirements Highlights */}
                    {career.requirements && career.requirements.length > 0 && (
                      <div className="mb-5 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Key Qualifications:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {career.requirements.slice(0, 3).map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0099FF] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Apply Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Direct: <span className="text-[#0088EE] font-bold">{career.applyEmail || 'Hr@requinsolutions.com'}</span>
                    </span>

                    <button
                      onClick={() => handleOpenApply(career)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0099FF] to-[#08B9E8] hover:from-[#0088EE] hover:to-[#00A8D8] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================
            DIRECT HR CONTACT BANNER
        ======================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          <div className="rounded-3xl bg-white border border-[#D3E6F8] p-8 sm:p-10 text-center shadow-xs">
            <div className="max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#E6F4FE] text-[#0088EE] flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0A2540] tracking-tight">
                Connect Directly with Our HR Team
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                Whether you are a developer, designer, or product manager, send your resume and portfolio directly to our engineering center in Jaipur.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
                <a
                  href="mailto:Hr@requinsolutions.com?subject=Job%20Inquiry%20-%20Requin%20Solutions"
                  className="px-6 py-3 rounded-xl bg-[#0099FF] hover:bg-[#0088EE] text-white transition-all shadow-md flex items-center gap-2 font-bold cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email: Hr@requinsolutions.com</span>
                </a>

                <a
                  href="tel:+919352220187"
                  className="px-5 py-3 rounded-xl bg-[#F0F7FD] hover:bg-[#E2F0FC] text-slate-800 border border-[#D3E6F8] transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                >
                  <Phone className="w-4 h-4 text-[#0099FF]" />
                  <span>Phone: +91 9352220187</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          APPLICATION MODAL (WHITE CARD ON DIM BACKDROP)
      ======================================================== */}
      {isApplyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsApplyModalOpen(false)}
        >
          <div
            className="bg-white text-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8 text-left max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[11px] font-bold text-[#0088EE] uppercase tracking-wider">
                  {selectedCareer ? 'Job Application' : 'Open Engineering Application'}
                </span>
                <h3 className="text-xl font-extrabold text-[#0A2540] mt-0.5">
                  {selectedCareer ? selectedCareer.title : 'General Engineering Candidate'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Requin Solutions · Jaipur Headquarters
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccess ? (
              <div className="p-8 rounded-2xl bg-[#E8F7FC] border border-[#08B9E8]/30 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-[#08B9E8] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-[#0A2540]">Application Received!</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  Thank you, <span className="font-bold text-slate-900">{applyForm.name}</span>! Your application has been transmitted directly to our hiring team at{' '}
                  <span className="text-[#0088EE] font-bold">Hr@requinsolutions.com</span>. We will review your profile and contact you at{' '}
                  <span className="text-slate-900 font-semibold">{applyForm.email}</span>.
                </p>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#0099FF] hover:bg-[#0088EE] text-white font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                {applyError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{applyError}</span>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0099FF] focus:ring-2 focus:ring-[#0099FF]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0099FF] focus:ring-2 focus:ring-[#0099FF]/20"
                    />
                  </div>
                </div>

                {/* Phone & Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0099FF] focus:ring-2 focus:ring-[#0099FF]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Years of Relevant Experience
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2 Years"
                      value={applyForm.experienceLevel}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, experienceLevel: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0099FF] focus:ring-2 focus:ring-[#0099FF]/20"
                    />
                  </div>
                </div>

                {/* Portfolio / LinkedIn / Resume Link */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Portfolio, GitHub, or LinkedIn URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/... or https://github.com/..."
                    value={applyForm.portfolioUrl}
                    onChange={(e) => setApplyForm({ ...applyForm, portfolioUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0099FF] focus:ring-2 focus:ring-[#0099FF]/20"
                  />
                </div>

                {/* Cover Note / Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Brief Introduction & Tech Stack
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your background, primary skills, and notice period..."
                    value={applyForm.message}
                    onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0099FF] focus:ring-2 focus:ring-[#0099FF]/20 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Forwarded directly to{' '}
                    <span className="text-[#0088EE] font-bold">Hr@requinsolutions.com</span>
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0099FF] to-[#08B9E8] hover:from-[#0088EE] hover:to-[#00A8D8] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer and Chat Widget */}
      <Footer onOpenQuiz={() => setIsQuizOpen(true)} />
      <ChatWidget />

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      {/* <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectService={() => setIsQuizOpen(false)}
      /> */}
    </div>
  );
};
export default PublicCareersPage;
