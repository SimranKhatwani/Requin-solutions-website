import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { blogService, BlogItem } from '../services/blogService';
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Tag,
  Loader2,
  BookOpen,
  ArrowLeft,
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
    <div className="min-h-screen bg-[#071827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5]">
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={(sectionId) => {
          navigate(`/#${sectionId}`);
        }}
      />

      <main className="flex-1 pt-32 pb-24 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#08B9E8]">Blogs & Insights</span>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-[#08B9E8] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Latest Updates & Engineering Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Requin Tech & Academic Briefings
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              In-depth architectural analyses, EdTech developments, cloud transformation playbooks, and modern enterprise software practices published by the Requin engineering advisory.
            </p>
          </div>

          {/* Search & Categories Bar (visible when blogs exist) */}
          {blogs.length > 0 && (
            <div className="bg-[#0B2235]/90 border border-white/10 rounded-2xl p-4 sm:p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-xl">
              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#071827] border border-white/15 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#08B9E8] transition-colors"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#08B9E8] text-[#071827] shadow-md shadow-[#08B9E8]/20'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
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
              <p className="text-sm font-medium text-slate-400">Loading publications from database...</p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center">
              <p className="text-sm">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="py-24 text-center bg-[#0B2235]/40 rounded-3xl border border-white/10 max-w-2xl mx-auto px-6 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#08B9E8]/10 text-[#08B9E8] flex items-center justify-center mx-auto mb-5 border border-[#08B9E8]/20">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Articles Published Yet</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                Our engineering team will publish upcoming technical architecture deep dives, case studies, and EdTech insights here. Check back soon!
              </p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-20 text-center bg-[#0B2235]/40 rounded-2xl border border-white/10">
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-base font-bold text-white">No articles matched your search</p>
              <p className="text-xs text-slate-400 mt-1">Try another search keyword or reset the category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                  className="bg-[#0B2235]/80 rounded-2xl border border-white/10 overflow-hidden hover:border-[#08B9E8]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between cursor-pointer group"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2235] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#071827]/90 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-[#08B9E8]">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#08B9E8]" />
                          <span>{blog.publishedDate}</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5 truncate">
                          <User className="w-3.5 h-3.5 text-slate-500" />
                          <span>{blog.author}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-[#08B9E8] transition-colors leading-snug line-clamp-2 mb-3">
                        {blog.title}
                      </h3>

                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                        {blog.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 2).map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#08B9E8] group-hover:translate-x-1 transition-transform">
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
