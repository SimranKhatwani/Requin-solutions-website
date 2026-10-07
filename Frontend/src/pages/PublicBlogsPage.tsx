import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { blogService, BlogItem } from '../services/blogService';
import { getMediaUrl } from '../utils/mediaUrl';
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Loader2,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export const PublicBlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await blogService.getPublishedBlogs();
        if (res.data) setBlogs(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load blog articles.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat =
      selectedCategory === 'All' ? true : b.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCat;
  });

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
          <linearGradient id="blogNetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.10" />
          </linearGradient>

          <filter id="blogNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* TOP-LEFT NETWORK CONSTELLATION */}
        <g stroke="url(#blogNetGrad)" strokeWidth="1.2" fill="none">
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
          <circle cx="11%" cy="16%" r="4" fillOpacity="0.3" filter="url(#blogNodeGlow)" />
          <circle cx="11%" cy="16%" r="2" fillOpacity="0.9" />
          <circle cx="7%" cy="28%" r="3" fillOpacity="0.4" />
          <circle cx="18%" cy="20%" r="3.5" fillOpacity="0.4" />
          <circle cx="18%" cy="20%" r="1.5" fillOpacity="0.9" />
          <circle cx="15%" cy="34%" r="2.5" fillOpacity="0.5" />
          <circle cx="25%" cy="12%" r="3" fillOpacity="0.3" />
          <circle cx="2%" cy="22%" r="2" fillOpacity="0.4" />
        </g>

        {/* TOP-RIGHT NETWORK CONSTELLATION */}
        <g stroke="url(#blogNetGrad)" strokeWidth="1.2" fill="none">
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
          <circle cx="88%" cy="18%" r="4" fillOpacity="0.3" filter="url(#blogNodeGlow)" />
          <circle cx="88%" cy="18%" r="2" fillOpacity="0.9" />
          <circle cx="92%" cy="30%" r="3" fillOpacity="0.4" />
          <circle cx="80%" cy="22%" r="3.5" fillOpacity="0.4" />
          <circle cx="80%" cy="22%" r="1.5" fillOpacity="0.9" />
          <circle cx="84%" cy="36%" r="2.5" fillOpacity="0.5" />
          <circle cx="74%" cy="14%" r="3" fillOpacity="0.3" />
          <circle cx="98%" cy="25%" r="2" fillOpacity="0.4" />
        </g>

        {/* BOTTOM-LEFT & BOTTOM-RIGHT CORNER NODES */}
        <g stroke="url(#blogNetGrad)" strokeWidth="1.2" fill="none">
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
        onNavigateSection={(sectionId) => {
          navigate(`/#${sectionId}`);
        }}
      />

      <main className="flex-1 pt-32 pb-24 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link to="/" className="hover:text-[#08B9E8] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#08B9E8] font-bold">Blogs & Insights</span>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E1F7FD] border border-[#08B9E8]/30 text-[#08B9E8] text-xs sm:text-sm font-bold mb-4 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#08B9E8]" />
              <span>Latest Updates & Engineering Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#061827] leading-[1.12] mb-4">
              Requin Tech &{' '}
              <span className="bg-gradient-to-r from-[#08B9E8] to-[#0088EE] bg-clip-text text-transparent">
                Software Insights
              </span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              In-depth architectural analyses, EdTech developments, cloud transformation playbooks, and modern enterprise software practices published by the Requin engineering team.
            </p>
          </div>

          {/* Search & Categories Bar (visible when blogs exist) */}
          {blogs.length > 0 && (
            <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-sm">
              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#F5FAFD] border border-slate-200 text-xs sm:text-sm text-[#0B1726] placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] transition-colors shadow-2xs"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#08B9E8] text-[#071827] shadow-sm shadow-[#08B9E8]/30 font-bold'
                        : 'bg-white text-slate-600 hover:text-[#061827] hover:bg-[#E8F7FC] border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blog Cards Grid */}
          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-10 h-10 text-[#08B9E8] animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-500">Loading publications from database...</p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-center">
              <p className="text-sm font-medium">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="py-24 text-center bg-white/95 rounded-3xl border border-slate-200/90 max-w-2xl mx-auto px-6 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F7FC] text-[#08B9E8] flex items-center justify-center mx-auto mb-5 border border-[#08B9E8]/30 shadow-xs">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#061827] mb-2">No Articles Published Yet</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto font-normal">
                Our engineering team will publish upcoming technical architecture deep dives, case studies, and EdTech insights here. Check back soon!
              </p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-20 text-center bg-white/95 rounded-2xl border border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-base font-bold text-[#061827]">No articles matched your search</p>
              <p className="text-xs text-slate-500 mt-1">Try another search keyword or reset the category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#08B9E8]/60 transition-all duration-300 hover:-translate-y-2 shadow-[0_4px_20px_-4px_rgba(8,185,232,0.08),0_2px_8px_-2px_rgba(11,23,38,0.04)] hover:shadow-[0_20px_45px_-10px_rgba(0,194,255,0.25),0_8px_16px_-4px_rgba(11,23,38,0.06)] flex flex-col justify-between overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={getMediaUrl(blog.featuredImage)}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                      }}
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-bold text-[#08B9E8] shadow-xs">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#08B9E8]" />
                          <span>{blog.publishedDate}</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5 truncate">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{blog.author}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#061827] group-hover:text-[#08B9E8] transition-colors leading-snug line-clamp-2 mb-3">
                        {blog.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                        {blog.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 2).map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#E8F7FC] text-[#08B9E8] border border-[#08B9E8]/20 font-semibold"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#08B9E8] group-hover:translate-x-1 transition-transform">
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
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
        onSelectService={() => setIsQuizOpen(false)}
      />
    </div>
  );
};
