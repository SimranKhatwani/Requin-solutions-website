import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Check, BookOpen, Search, X, ChevronUp, ChevronDown, User } from 'lucide-react';
import { BlogItem } from '../services/blogService';
import { REQUIN_BLOGS } from '../data/requinData';
import { getMediaUrl } from '../utils/mediaUrl';

export const POPULAR_BLOG_TAGS = [
  'All',
  'AssessmentHelp',
  'StudentSuccess',
  'AcademicSuccess',
  'OnlineLearning',
  'AcademicSupport',
  'EdTech',
  'AssignmentHelp',
  'StudentSupport',
  'AcademicAssistance',
  'PersonalizedLearning',
];

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface BlogSidebarProps {
  recentPosts?: BlogItem[];
  currentSlug?: string;
  tocItems?: TocItem[];
  activeTocId?: string;
  onTocClick?: (id: string) => void;
  selectedTag?: string;
  onSelectTag?: (tag: string) => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  authorName?: string;
  authorRole?: string;
  authorBio?: string;
  showAuthor?: boolean;
  showSearch?: boolean;
  showRecentPosts?: boolean;
  showPopularTags?: boolean;
  showNewsletter?: boolean;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  recentPosts: passedRecentPosts,
  currentSlug,
  tocItems,
  activeTocId,
  onTocClick,
  selectedTag = 'All',
  onSelectTag,
  searchTerm = '',
  onSearchChange,
  authorName = 'Requin Team',
  authorRole = 'Tech Specialist',
  authorBio = 'Expert in software development and cloud solutions at Requin Solutions.',
  showAuthor = false,
  showSearch = false,
  showRecentPosts = false,
  showPopularTags = true,
  showNewsletter = true,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [tocExpanded, setTocExpanded] = useState(true);

  // Compute top 3 recent posts sorted by publishedDate descending
  const recentPosts = useMemo(() => {
    const rawList =
      passedRecentPosts && passedRecentPosts.length > 0
        ? passedRecentPosts
        : (REQUIN_BLOGS as unknown as BlogItem[]);

    const filtered = currentSlug
      ? rawList.filter((p) => p.slug !== currentSlug)
      : rawList;

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.publishedDate || a.createdAt || 0).getTime();
      const dateB = new Date(b.publishedDate || b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return sorted.slice(0, 3);
  }, [passedRecentPosts, currentSlug]);

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  const authorInitial = authorName.charAt(0).toUpperCase() || 'R';

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 text-left">
      {/* ========================================================
          OPTIONAL: INSTANT SEARCH INPUT (Matching Screenshot 2)
      ======================================================== */}
      {showSearch && onSearchChange && (
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[#091E38]/90 border border-[#17385E] text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* ========================================================
          CARD: "IN THIS ARTICLE" / TABLE OF CONTENTS (Matching Screenshot 1 & 2)
      ======================================================== */}
      {tocItems && tocItems.length > 0 && (
        <div className="bg-[#07172C] border border-[#17385E] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 text-white relative overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#00c2ff]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header with Collapsible Toggle */}
          <div
            onClick={() => setTocExpanded(!tocExpanded)}
            className="flex items-center justify-between pb-3 border-b border-[#17385E]/80 cursor-pointer select-none"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#00c2ff]" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                In this article
              </h3>
            </div>
            <button className="text-slate-400 hover:text-white transition-colors p-1">
              {tocExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation items list */}
          {tocExpanded && (
            <nav className="space-y-1.5 max-h-[360px] overflow-y-auto no-scrollbar scrollbar-none text-xs sm:text-[13px] pt-1">
              {tocItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onTocClick && onTocClick(item.id)}
                  className={`w-full text-left py-2 px-3 rounded-xl transition-all line-clamp-2 cursor-pointer ${
                    activeTocId === item.id
                      ? 'bg-[#0E2442] text-[#00c2ff] font-bold border border-[#08B9E8]/40 shadow-xs'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white font-medium'
                  } ${item.level === 3 ? 'pl-6 text-[12px]' : ''}`}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          )}
        </div>
      )}

      {/* ========================================================
          CARD: "ABOUT THE AUTHOR" (Matching User Screenshot 2)
      ======================================================== */}
      {showAuthor && (
        <div className="bg-[#07172C] border border-[#17385E] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 text-left relative overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#08B9E8]/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight pb-3 border-b border-[#17385E]/80">
            About the Author
          </h3>

          <div className="flex items-center gap-3.5 pt-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0284c7] via-[#08B9E8] to-[#00c2ff] text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
              {authorInitial}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-snug">{authorName}</h4>
              <p className="text-xs text-[#00c2ff] font-medium">{authorRole}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1">
            {authorBio}
          </p>
        </div>
      )}

      {/* ========================================================
          SIDEBAR CARD: POPULAR TAGS (Filter Above Newsletter)
      ======================================================== */}
      {showPopularTags && (
        <div className="bg-[#07172C] border border-[#17385E] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left relative overflow-hidden group">
          
          {/* Ambient Glows */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#00c2ff]/12 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#08B9E8]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Connecting Molecules / Constellation Network Background SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="moleculeGradTags" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <g stroke="url(#moleculeGradTags)" strokeWidth="1.2" fill="none">
              <line x1="12%" y1="18%" x2="45%" y2="28%" />
              <line x1="45%" y1="28%" x2="85%" y2="16%" />
              <line x1="45%" y1="28%" x2="60%" y2="65%" />
              <line x1="60%" y1="65%" x2="18%" y2="80%" />
              <line x1="60%" y1="65%" x2="90%" y2="78%" />
            </g>
            <g fill="#08B9E8">
              <circle cx="12%" cy="18%" r="3" fillOpacity="0.85" />
              <circle cx="45%" cy="28%" r="3.8" fillOpacity="0.95" />
              <circle cx="85%" cy="16%" r="3" fillOpacity="0.8" />
              <circle cx="60%" cy="65%" r="4" fillOpacity="0.95" />
              <circle cx="18%" cy="80%" r="2.8" fillOpacity="0.8" />
              <circle cx="90%" cy="78%" r="3.2" fillOpacity="0.85" />
            </g>
          </svg>

          <h3 className="text-2xl font-bold text-white tracking-tight relative z-10">
            Popular Tags
          </h3>

          {/* Tags Pills (Natural Flex-Wrap without any scrolling) */}
          <div className="flex flex-wrap gap-2.5 relative z-10">
            {POPULAR_BLOG_TAGS.map((tag) => {
              const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag && onSelectTag(tag)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0284c7] to-[#08B9E8] text-white shadow-lg shadow-[#0284c7]/40 ring-1 ring-white/30 font-bold scale-[1.02]'
                      : 'bg-[#0E2442] hover:bg-[#163761] text-slate-200 border border-[#1E4875]/80 hover:text-white hover:border-[#08B9E8]/50'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          SIDEBAR CARD: SUBSCRIBE TO OUR NEWSLETTER (Matching User Screenshot 2)
      ======================================================== */}
      {showNewsletter && (
        <div className="bg-[#07172C] border border-[#17385E] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left relative overflow-hidden group">
          
          {/* Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#00c2ff]/12 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#08B9E8]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Connecting Molecules / Constellation Network Background SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="moleculeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00c2ff" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#08B9E8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
              </linearGradient>
              <filter id="molGlow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Molecule Bonds / Lines */}
            <g stroke="url(#moleculeGrad2)" strokeWidth="1.2" fill="none">
              <line x1="18%" y1="14%" x2="78%" y2="18%" />
              <line x1="78%" y1="18%" x2="62%" y2="68%" />
              <line x1="62%" y1="68%" x2="18%" y2="82%" />
              <line x1="18%" y1="82%" x2="38%" y2="44%" />
              <line x1="38%" y1="44%" x2="18%" y2="14%" />
              <line x1="38%" y1="44%" x2="78%" y2="18%" />
              <line x1="62%" y1="68%" x2="92%" y2="82%" />
            </g>

            {/* Molecule Atoms / Nodes */}
            <g fill="#00c2ff" filter="url(#molGlow2)">
              <circle cx="18%" cy="14%" r="3.2" fillOpacity="0.85" />
              <circle cx="78%" cy="18%" r="4" fillOpacity="0.95" />
              <circle cx="62%" cy="68%" r="4.2" fillOpacity="0.95" />
              <circle cx="18%" cy="82%" r="2.8" fillOpacity="0.8" />
              <circle cx="38%" cy="44%" r="4.5" fillOpacity="0.95" />
              <circle cx="92%" cy="82%" r="3" fillOpacity="0.85" />
            </g>
            <g fill="#FFFFFF">
              <circle cx="78%" cy="18%" r="1.5" />
              <circle cx="38%" cy="44%" r="1.8" />
              <circle cx="62%" cy="68%" r="1.5" />
            </g>
          </svg>

          {/* Mail Icon in Navy/Cyan Squircle Badge */}
          <div className="w-12 h-12 rounded-2xl bg-[#0B2544] border border-[#08B9E8]/40 text-[#00c2ff] flex items-center justify-center shadow-inner relative z-10">
            <Mail className="w-5 h-5 text-[#38bdf8]" />
          </div>

          {/* Title & Subtitle Description */}
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Get notified about the latest insights, tips, and industry news
            </p>
          </div>

          {/* Newsletter Subscription Form */}
          <form onSubmit={handleNewsletterSubmit} className="space-y-3.5 pt-1 relative z-10">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-[#051325]/90 border border-[#1C436F] text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] transition-colors shadow-inner"
            />

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#08B9E8] to-[#00c2ff] hover:brightness-110 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-[#0284c7]/35 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {newsletterSubscribed && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold pt-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Subscribed! Check your inbox for updates.</span>
              </div>
            )}
          </form>
        </div>
      )}

      {/* ========================================================
          OPTIONAL: RECENT POSTS CARD (For Detail Pages or Alternate views)
      ======================================================== */}
      {showRecentPosts && (
        <div className="bg-[#07172C] border border-[#17385E] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 text-left relative overflow-hidden group">
          
          {/* Ambient Top Cyan Glow */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#08B9E8]/12 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#0284c7]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Connecting Molecules Background SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="moleculeGradRecent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <g stroke="url(#moleculeGradRecent)" strokeWidth="1.2" fill="none">
              <line x1="8%" y1="12%" x2="36%" y2="22%" />
              <line x1="36%" y1="22%" x2="88%" y2="14%" />
              <line x1="36%" y1="22%" x2="52%" y2="60%" />
              <line x1="88%" y1="14%" x2="94%" y2="45%" />
              <line x1="52%" y1="60%" x2="86%" y2="78%" />
              <line x1="52%" y1="60%" x2="14%" y2="72%" />
              <line x1="14%" y1="72%" x2="8%" y2="12%" />
            </g>
            <g fill="#08B9E8">
              <circle cx="8%" cy="12%" r="3" fillOpacity="0.85" />
              <circle cx="36%" cy="22%" r="4" fillOpacity="0.95" />
              <circle cx="88%" cy="14%" r="3.2" fillOpacity="0.85" />
              <circle cx="94%" cy="45%" r="2.5" fillOpacity="0.8" />
              <circle cx="52%" cy="60%" r="4.5" fillOpacity="0.95" />
              <circle cx="14%" cy="72%" r="3" fillOpacity="0.85" />
              <circle cx="86%" cy="78%" r="3.5" fillOpacity="0.9" />
            </g>
          </svg>

          <h3 className="text-2xl font-bold text-white tracking-tight relative z-10">
            Recent Posts
          </h3>

          <div className="space-y-5 relative z-10">
            {recentPosts.map((post) => (
              <Link
                key={post.id || post.slug}
                to={`/blog/${post.slug}`}
                className="flex items-start gap-4 group/item cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-[#0B223D] border border-[#1E4875]/80 shadow-md">
                  <img
                    src={getMediaUrl(post.featuredImage || (post as any).image)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/images/digital_agency_office_1790576645354.jpg';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-[15px] font-bold text-white group-hover/item:text-[#00c2ff] transition-colors duration-200 line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {formatDate(post.publishedDate || post.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default BlogSidebar;
