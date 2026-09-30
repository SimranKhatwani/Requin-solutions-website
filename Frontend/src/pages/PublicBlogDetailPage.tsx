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
  BookOpen,
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
    <div className="min-h-screen bg-[#071827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5]">
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
      />

      <main className="flex-1 pt-32 pb-24 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all publications</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-10 h-10 text-[#08B9E8] animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-400">Loading publication...</p>
            </div>
          ) : error || !blog ? (
            <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3" />
              <p className="text-base font-bold">{error || 'Article not found'}</p>
              <Link
                to="/blogs"
                className="mt-4 inline-block px-4 py-2 bg-white/10 rounded-xl text-xs font-semibold text-white hover:bg-white/20"
              >
                Return to Blogs
              </Link>
            </div>
          ) : (
            <article className="space-y-8">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-[#08B9E8]/10 border border-[#08B9E8]/20 text-[#08B9E8] text-xs font-bold uppercase tracking-wider">
                  {blog.category}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#08B9E8]" />
                    <span className="font-semibold text-slate-200">{blog.author}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#08B9E8]" />
                    <span>Published {blog.publishedDate}</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0B2235] shadow-2xl">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>

              {/* Short Description Lead */}
              <p className="text-lg text-slate-300 font-medium leading-relaxed bg-[#0B2235]/60 p-6 rounded-2xl border border-white/10">
                {blog.shortDescription}
              </p>

              {/* Main Content Body */}
              <div
                className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags Section */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Tags:</span>
                  </span>
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Call to action card */}
              <div className="mt-12 p-8 rounded-2xl bg-[#0B2235] border border-white/15 shadow-2xl text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Have a technical challenge or custom project?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                    Consult directly with the engineering leads at Requin Solutions in our Jaipur headquarters.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/#contact')}
                  className="px-6 py-3 rounded-xl font-semibold text-xs text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 shrink-0 cursor-pointer"
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
