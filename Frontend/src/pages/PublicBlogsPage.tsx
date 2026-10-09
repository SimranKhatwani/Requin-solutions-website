import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BlogSidebar, POPULAR_BLOG_TAGS } from '../components/BlogSidebar';
import { blogService, BlogItem } from '../services/blogService';
import { REQUIN_BLOGS } from '../data/requinData';
import { getMediaUrl } from '../utils/mediaUrl';
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  BookOpen,
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export const PublicBlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const sortBlogList = (list: BlogItem[]) => {
      return [...list].sort((a, b) => {
        const dateA = new Date(a.publishedDate || a.createdAt || 0).getTime();
        const dateB = new Date(b.publishedDate || b.createdAt || 0).getTime();
        return dateB - dateA;
      });
    };

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await blogService.getPublishedBlogs();
        if (res.data && res.data.length > 0) {
          setBlogs(sortBlogList(res.data));
        } else {
          // Fallback to offline pre-populated real blogs from requinData
          setBlogs(sortBlogList(REQUIN_BLOGS as unknown as BlogItem[]));
        }
      } catch (err) {
        console.warn('Could not reach backend blogs API, using loaded publications fallback.', err);
        setBlogs(sortBlogList(REQUIN_BLOGS as unknown as BlogItem[]));
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter blogs by search term and selected popular tag
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        b.title.toLowerCase().includes(term) ||
        (b.shortDescription || '').toLowerCase().includes(term) ||
        (b.tags || []).some((t) => t.toLowerCase().includes(term));

      const matchesTag =
        selectedTag === 'All' ||
        (b.tags || []).some((t) => {
          const tClean = t.toLowerCase().replace(/[^a-z0-9]/g, '');
          const selClean = selectedTag.toLowerCase().replace(/[^a-z0-9]/g, '');
          return tClean === selClean || t.toLowerCase() === selectedTag.toLowerCase();
        }) ||
        (b.category && b.category.toLowerCase().includes(selectedTag.toLowerCase())) ||
        b.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
        (b.shortDescription || '').toLowerCase().includes(selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [blogs, searchTerm, selectedTag]);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTag]);

  // Automatic Cover Blog (Latest uploaded blog automatically becomes the top hero cover blog on page 1)
  const featuredBlog = useMemo(() => {
    if (currentPage === 1 && !searchTerm && selectedTag === 'All') {
      return filteredBlogs[0] || null;
    }
    return null;
  }, [filteredBlogs, currentPage, searchTerm, selectedTag]);

  // Paginated blogs list (1 cover + 6 grid cards = 7 blogs total on Page 1)
  const remainingBlogs = useMemo(() => {
    if (featuredBlog && currentPage === 1 && !searchTerm && selectedTag === 'All') {
      return filteredBlogs.slice(1);
    }
    return filteredBlogs;
  }, [filteredBlogs, featuredBlog, currentPage, searchTerm, selectedTag]);

  const totalPages = Math.ceil(remainingBlogs.length / ITEMS_PER_PAGE) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return remainingBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [remainingBlogs, currentPage]);

  // Grid blogs for the lower 2-column layout
  const gridBlogs = paginatedBlogs;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Jul 3, 2025';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatLongDate = (dateStr?: string) => {
    if (!dateStr) return 'July 3, 2025';
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
        .animate-ambient-float {
          animation: ambientFloat 16s ease-in-out infinite;
        }
        .animate-network-pulse {
          animation: networkPulse 12s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ambient-float,
          .animate-network-pulse {
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
          BACKGROUND LAYER 2: Subtle Digital Network & Constellation Nodes (Services Theme)
      ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-network-pulse"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="blogNetGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.10" />
          </linearGradient>

          <filter id="blogNodeGlowLight" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* TOP-LEFT NETWORK CONSTELLATION */}
        <g stroke="url(#blogNetGradLight)" strokeWidth="1.2" fill="none">
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
          <circle cx="11%" cy="16%" r="4" fillOpacity="0.3" filter="url(#blogNodeGlowLight)" />
          <circle cx="11%" cy="16%" r="2" fillOpacity="0.9" />
          <circle cx="7%" cy="28%" r="3" fillOpacity="0.4" />
          <circle cx="18%" cy="20%" r="3.5" fillOpacity="0.4" />
          <circle cx="18%" cy="20%" r="1.5" fillOpacity="0.9" />
          <circle cx="15%" cy="34%" r="2.5" fillOpacity="0.5" />
          <circle cx="25%" cy="12%" r="3" fillOpacity="0.3" />
          <circle cx="2%" cy="22%" r="2" fillOpacity="0.4" />
        </g>

        {/* TOP-RIGHT NETWORK CONSTELLATION */}
        <g stroke="url(#blogNetGradLight)" strokeWidth="1.2" fill="none">
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
          <circle cx="88%" cy="18%" r="4" fillOpacity="0.3" filter="url(#blogNodeGlowLight)" />
          <circle cx="88%" cy="18%" r="2" fillOpacity="0.9" />
          <circle cx="92%" cy="30%" r="3" fillOpacity="0.4" />
          <circle cx="80%" cy="22%" r="3.5" fillOpacity="0.4" />
          <circle cx="80%" cy="22%" r="1.5" fillOpacity="0.9" />
          <circle cx="84%" cy="36%" r="2.5" fillOpacity="0.5" />
          <circle cx="74%" cy="14%" r="3" fillOpacity="0.3" />
          <circle cx="98%" cy="25%" r="2" fillOpacity="0.4" />
        </g>
      </svg>

      {/* Top Navigation */}
      <Navbar onNavigateSection={(sec) => navigate(`/#${sec}`)} />

      {/* Main Blog Publications Content */}
      <main className="flex-1 pt-32 pb-24 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 mb-8">
            <Link to="/" className="hover:text-[#0284c7] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0284c7]">Blog & Publications</span>
          </div>

          {/* Section Hero Header Banner */}
          <div className="text-center py-6 sm:py-10 relative mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0F7FE] border border-[#08B9E8]/30 text-[#0284c7] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
              <BookOpen className="w-4 h-4 text-[#08B9E8]" />
              <span>REQUIN INSIGHTS & EDITORIAL PUBLICATIONS</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1726] tracking-tight">
              Insights, Architecture & <span className="text-[#0284c7]">Technology Trends.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl mt-4 max-w-3xl mx-auto leading-relaxed font-normal">
              Stay ahead with curated perspectives on enterprise software engineering, AI breakthroughs, cloud solutions, academic tools, and digital transformation.
            </p>
          </div>

          {/* ========================================================
              SECTION 1: TOP FEATURED BLOG OCCUPYING FULL SCREEN WIDTH
              Content on Left, Large Image on Right (Matching Screenshot 1)
          ======================================================== */}
          {featuredBlog && (
            <div
              onClick={() => navigate(`/blog/${featuredBlog.slug}`)}
              className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-[#08B9E8]/60 transition-all duration-300 p-6 sm:p-10 cursor-pointer group relative overflow-hidden mb-12 sm:mb-14"
            >
              {/* Subtle ambient cyan glow */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#00c2ff]/10 rounded-full blur-3xl pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Side: Text Content */}
                <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-left flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F7FE] border border-[#08B9E8]/30 text-[#0284c7] text-xs font-bold uppercase tracking-wider w-fit">
                    <span className="w-2 h-2 rounded-full bg-[#08B9E8] animate-pulse" />
                    <span>Featured Article</span>
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[#0284c7] leading-tight group-hover:text-[#0080FF] transition-colors tracking-tight">
                    {featuredBlog.title}
                  </h2>

                  {featuredBlog.shortDescription && (
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal">
                      {featuredBlog.shortDescription}
                    </p>
                  )}

                  {/* Author Meta Row */}
                  <div className="flex items-center gap-3.5 pt-2">
                    <div className="w-11 h-11 rounded-full bg-[#E0F7FE] border border-[#08B9E8]/40 text-[#0284c7] flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0B1726] leading-snug">
                        {featuredBlog.author || 'Admin'}
                      </div>
                      <div className="text-xs text-slate-500">
                        Author &nbsp;·&nbsp; {formatLongDate(featuredBlog.publishedDate || featuredBlog.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image with corner circular arrow action button */}
                <div className="lg:col-span-6 xl:col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-200/80 shadow-md">
                  <img
                    src={getMediaUrl(featuredBlog.featuredImage || (featuredBlog as any).image)}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/digital_agency_office_1790576645354.jpg';
                    }}
                  />
                  
                  {/* Circular action button in the bottom-right corner */}
                  <div className="absolute bottom-4 right-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#0284c7] via-[#08B9E8] to-[#00c2ff] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:brightness-110 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Animated Bottom Cyan Progress Accent */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-100">
                <div className="h-full w-0 bg-gradient-to-r from-[#08B9E8] to-[#00c2ff] transition-all duration-500 ease-out group-hover:w-full" />
              </div>
            </div>
          )}

          {/* ========================================================
              SECTION 2: 2-COLUMN LAYOUT BELOW FEATURED BLOG
              Left (8 cols): Blog Grid (Image on top, Article tag + date, Title, Read More ->)
              Right (4 cols): Search, Popular Tags (Filter) on Top, Newsletter below
          ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ========================================================
                LEFT COLUMN (8 COLS): Blogs Grid + Active Filter Chips + Pagination
            ======================================================== */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Active Filters Bar (Shown when search term or tag filter is selected) */}
              {(selectedTag !== 'All' || searchTerm) && (
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm animate-in fade-in duration-200 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
                  <span className="text-slate-600 font-medium">Active filters:</span>

                  {selectedTag !== 'All' && (
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E2442] border border-[#08B9E8]/40 text-[#00c2ff] font-semibold text-xs shadow-xs">
                      <span>Tag: {selectedTag}</span>
                      <button
                        onClick={() => setSelectedTag('All')}
                        className="hover:text-red-400 hover:bg-[#163761] p-0.5 rounded-full transition-colors cursor-pointer"
                        title="Remove tag filter"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}

                  {searchTerm && (
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E2442] border border-[#08B9E8]/40 text-[#00c2ff] font-semibold text-xs shadow-xs">
                      <span>Search: "{searchTerm}"</span>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="hover:text-red-400 hover:bg-[#163761] p-0.5 rounded-full transition-colors cursor-pointer"
                        title="Clear search filter"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}

                  <button
                    onClick={() => {
                      setSelectedTag('All');
                      setSearchTerm('');
                    }}
                    className="text-[#0284c7] hover:text-[#0369a1] underline font-bold text-xs cursor-pointer ml-auto"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* ARTICLE CARDS GRID */}
              {loading ? (
                <div className="py-24 text-center">
                  <div className="w-10 h-10 border-3 border-[#08B9E8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm font-medium text-slate-500">Loading publications...</p>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                  <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-[#0B1726]">No Articles Found</h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                    We couldn't find any articles matching "{searchTerm}". Try clearing your filters or search keywords.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTag('All');
                    }}
                    className="mt-5 px-5 py-2.5 rounded-xl bg-[#0284c7] text-white text-xs font-bold hover:bg-[#0369a1] transition-colors shadow-sm cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gridBlogs.map((b) => (
                    <article
                      key={b.id || b.slug}
                      onClick={() => navigate(`/blog/${b.slug}`)}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#08B9E8]/60 transition-all duration-300 group cursor-pointer flex flex-col justify-between relative overflow-hidden text-left p-5"
                    >
                      {/* Subtle top-right ambient glow */}
                      <div className="absolute -top-8 -right-8 w-28 h-28 bg-[#00c2ff]/10 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />

                      <div className="space-y-4">
                        {/* Card Thumbnail Frame (Image on top) */}
                        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/70">
                          <img
                            src={getMediaUrl(b.featuredImage || (b as any).image)}
                            alt={b.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/digital_agency_office_1790576645354.jpg';
                            }}
                          />
                        </div>

                        {/* Meta: Category Badge + Publication Date */}
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="px-3 py-1 rounded-full bg-[#E0F7FE] border border-[#08B9E8]/30 text-[#0284c7] font-bold">
                            {b.category || 'Article'}
                          </span>
                          <span className="text-slate-500 font-medium">
                            {formatDate(b.publishedDate || b.createdAt)}
                          </span>
                        </div>

                        {/* Title (In Blue) */}
                        <h3 className="text-base sm:text-lg font-bold text-[#0284c7] group-hover:text-[#0369a1] transition-colors duration-200 line-clamp-2 leading-snug">
                          {b.title}
                        </h3>
                      </div>

                      {/* Footer Link: Read More -> */}
                      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center text-xs sm:text-sm font-bold text-[#0284c7] group-hover:text-[#00a6e0] transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>

                      {/* Animated Bottom Cyan Accent */}
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-100 overflow-hidden">
                        <div className="h-full w-0 bg-gradient-to-r from-[#08B9E8] to-[#00c2ff] transition-all duration-400 ease-out group-hover:w-full" />
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* PAGINATION BAR */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2 pt-4">
                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(1, prev - 1));
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-[#E0F7FE] hover:text-[#0284c7] disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              currentPage === pageNum
                                ? 'bg-[#0284c7] text-white shadow-md shadow-[#0284c7]/30'
                                : 'bg-white text-slate-600 hover:bg-[#E8F7FC] hover:text-[#0284c7] border border-slate-200'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return (
                          <span key={pageNum} className="px-1 text-slate-400 text-xs font-bold">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-[#E0F7FE] hover:text-[#0284c7] disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* ========================================================
                RIGHT COLUMN (4 COLS): STICKY SIDEBAR
                Search Input + Popular Tags (Filter) Card + Recent Posts Card + Newsletter Card
            ======================================================== */}
            <div className="lg:col-span-4">
              <BlogSidebar
                showSearch={true}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
                showNewsletter={true}
                showPopularTags={true}
                showRecentPosts={true}
                recentPosts={blogs}
              />
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicBlogsPage;
