import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BlogSidebar } from '../components/BlogSidebar';
import { blogService, BlogItem } from '../services/blogService';
import { REQUIN_BLOGS, RequinBlogItem } from '../data/requinData';
import { getMediaUrl } from '../utils/mediaUrl';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Tag,
  Clock,
  Sparkles,
  ChevronRight,
  ListOrdered,
  ArrowRight,
  Check,
  Bookmark,
} from 'lucide-react';

export const PublicBlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        // First check backend API
        const res = await blogService.getBlogBySlug(slug);
        if (res.data) {
          setBlog(res.data);
        } else {
          // Fallback lookup from offline real blogs
          const found = (REQUIN_BLOGS as unknown as BlogItem[]).find(
            (b) => b.slug === slug || b.id === slug || b.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-') === slug
          );
          if (found) setBlog(found);
          else setError('Article not found.');
        }
      } catch (err) {
        // Fallback to offline
        const found = (REQUIN_BLOGS as unknown as BlogItem[]).find(
          (b) => b.slug === slug || b.id === slug || b.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-') === slug
        );
        if (found) {
          setBlog(found);
        } else {
          setError('Article could not be loaded.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  // Extract headings from the blog content to build dynamic Table of Contents
  const tocItems = useMemo(() => {
    if (!blog?.content) return [];
    const div = document.createElement('div');
    div.innerHTML = blog.content;
    const headings = div.querySelectorAll('h1, h2, h3');
    const items: { id: string; text: string; level: number }[] = [];

    headings.forEach((h, idx) => {
      const text = h.textContent || '';
      if (!text.trim()) return;
      const id = text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-') || `heading-${idx}`;
      items.push({
        id,
        text,
        level: parseInt(h.tagName.replace('H', ''), 10) || 2,
      });
    });

    return items;
  }, [blog?.content]);

  // Inject IDs into the actual rendered content headings on mount
  useEffect(() => {
    if (!blog?.content) return;
    const timer = setTimeout(() => {
      tocItems.forEach((item) => {
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach((h) => {
          if (h.textContent?.trim() === item.text.trim()) {
            h.id = item.id;
          }
        });
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [blog?.content, tocItems]);

  // Find 3 Related Articles (matching category or popular)
  const relatedArticles = useMemo(() => {
    if (!blog) return [];
    const all = (REQUIN_BLOGS as unknown as BlogItem[]);
    const sameCategory = all.filter(
      (b) => b.slug !== blog.slug && b.category === blog.category
    );
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);

    const others = all.filter((b) => b.slug !== blog.slug && b.category !== blog.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [blog]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToHeading = (id: string) => {
    setActiveTocId(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Recent';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
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
        <div className="absolute -top-24 -left-24 w-[700px] h-[550px] bg-[radial-gradient(circle_at_30%_30%,rgba(8,185,232,0.12),transparent_65%)] blur-3xl animate-ambient-float" />
        
        {/* Top-Right Soft Blue/Cyan Glow */}
        <div className="absolute -top-16 -right-16 w-[650px] h-[500px] bg-[radial-gradient(circle_at_70%_30%,rgba(0,194,255,0.10),transparent_65%)] blur-3xl animate-ambient-float" style={{ animationDelay: '-6s' }} />
        
        {/* Bottom-Left Ambient Cyan Glow */}
        <div className="absolute -bottom-20 -left-12 w-[600px] h-[500px] bg-[radial-gradient(circle_at_40%_70%,rgba(8,185,232,0.08),transparent_65%)] blur-3xl animate-ambient-float" style={{ animationDelay: '-10s' }} />
        
        {/* Bottom-Right Subtle Blue Glow */}
        <div className="absolute -bottom-20 -right-12 w-[650px] h-[520px] bg-[radial-gradient(circle_at_70%_70%,rgba(2,132,199,0.07),transparent_65%)] blur-3xl animate-ambient-float" style={{ animationDelay: '-3s' }} />

        {/* Center subtle light depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] pointer-events-none" />

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
      </svg>

      {/* Top Navbar */}
      <Navbar onNavigateSection={(sec) => navigate(`/#${sec}`)} />

      <main className="flex-1 pt-32 pb-24 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation & Top Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 truncate">
              <Link to="/" className="hover:text-[#0284c7] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link to="/blog" className="hover:text-[#0284c7] transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[#0284c7] truncate">{blog?.title || 'Article'}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#0284c7] hover:bg-[#E8F7FC] shadow-2xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Articles</span>
              </Link>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#0284c7] hover:bg-[#E8F7FC] shadow-2xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-28 text-center">
              <div className="w-10 h-10 border-3 border-[#08B9E8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-500">Loading publication details...</p>
            </div>
          ) : error || !blog ? (
            <div className="p-10 rounded-3xl bg-white border border-rose-200 text-rose-600 text-center shadow-sm max-w-xl mx-auto my-12">
              <h2 className="text-xl font-bold mb-2">Article Not Found</h2>
              <p className="text-sm text-slate-500 mb-6">{error || 'The requested article could not be found.'}</p>
              <Link
                to="/blog"
                className="px-5 py-2.5 bg-[#0284c7] text-white rounded-xl text-xs font-bold hover:bg-[#0369a1] transition-colors shadow-sm inline-block"
              >
                Browse All Publications
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              
              {/* Top Hero Section of Article */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-3.5 py-1 rounded-full bg-[#E0F7FE] border border-[#08B9E8]/30 text-[#0284c7] text-xs font-bold uppercase tracking-wider">
                    {blog.category}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#08B9E8]" />
                    {(blog as any).readTime || '5 min read'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B1726] leading-[1.18]">
                  {blog.title}
                </h1>

                {/* Author and Date Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E0F7FE] to-[#BAE6FD] border border-[#08B9E8]/30 flex items-center justify-center text-[#0284c7] font-bold text-sm">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0B1726]">{blog.author || 'Requin Editorial Team'}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#08B9E8]" />
                        <span>Published on {formatDate(blog.publishedDate || blog.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#0284c7] hover:border-[#08B9E8] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                      <span>{copied ? 'Copied' : 'Share Article'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[21/9] max-h-[500px] w-full bg-slate-100 border border-slate-200/90 shadow-xl">
                <img
                  src={getMediaUrl(blog.featuredImage || (blog as any).image)}
                  alt={blog.title}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/digital_agency_office_1790576645354.jpg';
                  }}
                />
              </div>

              {/* 2-Column Article Grid: Main Rich Content (Left) + Table of Contents & Related (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Main Article Content (Left 8 Cols) */}
                <article className="lg:col-span-8 space-y-8">
                  {/* Lead Summary Excerpt Box */}
                  {blog.shortDescription && (
                    <div className="p-6 sm:p-7 rounded-2xl bg-white border-l-4 border-[#0284c7] border border-slate-200/80 shadow-xs text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                      {blog.shortDescription}
                    </div>
                  )}

                  {/* HTML Rich Text Body */}
                  <div
                    className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 md:p-12 shadow-sm text-slate-700 text-base sm:text-[17px] leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {/* Article Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center gap-2 shadow-2xs">
                      <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-[#08B9E8]" />
                        <span>Indexed Topics:</span>
                      </span>
                      {blog.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1 rounded-xl bg-[#F5FAFD] border border-slate-200 text-xs text-slate-700 font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Back to all blogs footer CTA */}
                  <div className="pt-4 flex items-center justify-between">
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#08B9E8] hover:text-[#0284c7] text-xs sm:text-sm font-bold text-slate-800 transition-all shadow-xs"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Explore all articles</span>
                    </Link>

                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-xs font-bold text-[#0284c7] hover:underline cursor-pointer"
                    >
                      Back to top ↑
                    </button>
                  </div>
                </article>

                {/* Sticky Right Sidebar (4 Cols) */}
                <div className="lg:col-span-4">
                  <BlogSidebar
                    currentSlug={blog.slug}
                    tocItems={tocItems}
                    activeTocId={activeTocId}
                    onTocClick={scrollToHeading}
                    onSelectTag={(_tag) => navigate('/blog')}
                  />
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicBlogDetailPage;
