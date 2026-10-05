import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { blogService, BlogItem } from '../services/blogService';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Tag,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const PublicBlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await blogService.getBlogBySlug(slug);
        if (res.data) {
          setBlog(res.data);
        } else {
          setError('Article not found.');
        }
      } catch (err: any) {
        setError(err.message || 'Article could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <linearGradient id="detailNetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.10" />
          </linearGradient>

          <filter id="detailNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* TOP-LEFT NETWORK CONSTELLATION */}
        <g stroke="url(#detailNetGrad)" strokeWidth="1.2" fill="none">
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
          <circle cx="11%" cy="16%" r="4" fillOpacity="0.3" filter="url(#detailNodeGlow)" />
          <circle cx="11%" cy="16%" r="2" fillOpacity="0.9" />
          <circle cx="7%" cy="28%" r="3" fillOpacity="0.4" />
          <circle cx="18%" cy="20%" r="3.5" fillOpacity="0.4" />
          <circle cx="18%" cy="20%" r="1.5" fillOpacity="0.9" />
          <circle cx="15%" cy="34%" r="2.5" fillOpacity="0.5" />
          <circle cx="25%" cy="12%" r="3" fillOpacity="0.3" />
          <circle cx="2%" cy="22%" r="2" fillOpacity="0.4" />
        </g>

        {/* TOP-RIGHT NETWORK CONSTELLATION */}
        <g stroke="url(#detailNetGrad)" strokeWidth="1.2" fill="none">
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
          <circle cx="88%" cy="18%" r="4" fillOpacity="0.3" filter="url(#detailNodeGlow)" />
          <circle cx="88%" cy="18%" r="2" fillOpacity="0.9" />
          <circle cx="92%" cy="30%" r="3" fillOpacity="0.4" />
          <circle cx="80%" cy="22%" r="3.5" fillOpacity="0.4" />
          <circle cx="80%" cy="22%" r="1.5" fillOpacity="0.9" />
          <circle cx="84%" cy="36%" r="2.5" fillOpacity="0.5" />
          <circle cx="74%" cy="14%" r="3" fillOpacity="0.3" />
          <circle cx="98%" cy="25%" r="2" fillOpacity="0.4" />
        </g>

        {/* BOTTOM CORNER NODES */}
        <g stroke="url(#detailNetGrad)" strokeWidth="1.2" fill="none">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back navigation & Share */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#08B9E8] transition-colors bg-white/90 px-4 py-2 rounded-xl border border-slate-200/90 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all publications</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 hover:bg-[#E8F7FC] border border-slate-200/90 text-xs font-semibold text-slate-700 hover:text-[#08B9E8] transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-10 h-10 text-[#08B9E8] animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-500">Loading publication...</p>
            </div>
          ) : error || !blog ? (
            <div className="p-8 rounded-3xl bg-white border border-rose-200 text-rose-600 text-center shadow-sm">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 text-rose-500" />
              <p className="text-base font-bold">{error || 'Article not found'}</p>
              <Link
                to="/blogs"
                className="mt-4 inline-block px-5 py-2.5 bg-[#08B9E8] text-[#071827] rounded-xl text-xs font-bold hover:bg-[#4DD4F5] transition-colors shadow-sm"
              >
                Return to Blogs
              </Link>
            </div>
          ) : (
            <article className="space-y-8">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#E8F7FC] border border-[#08B9E8]/30 text-[#08B9E8] text-xs font-bold uppercase tracking-wider shadow-xs">
                  {blog.category}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#061827] leading-[1.12]">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200/80 pb-6 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#08B9E8]" />
                    <span className="font-semibold text-slate-700">{blog.author}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#08B9E8]" />
                    <span>Published {blog.publishedDate}</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-xl">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>

              {/* Short Description Lead */}
              <div className="text-lg text-slate-700 font-medium leading-relaxed bg-white/95 p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs">
                {blog.shortDescription}
              </div>

              {/* Main Content Body */}
              <div
                className="bg-white/95 rounded-3xl border border-slate-200/90 p-7 sm:p-10 shadow-xs text-slate-700 text-base leading-relaxed space-y-6 prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags Section */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Tags:</span>
                  </span>
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-semibold shadow-2xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Call to action card */}
              <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-md text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F7FC] text-[#08B9E8] text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineering Advisory</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#061827] mb-1">
                    Have a technical challenge or custom project?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed font-normal">
                    Consult directly with the engineering leads at Requin Solutions in our Jaipur engineering center.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/#contact')}
                  className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 shrink-0 cursor-pointer active:scale-[0.98]"
                >
                  Book a Consultation
                </button>
              </div>
            </article>
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
