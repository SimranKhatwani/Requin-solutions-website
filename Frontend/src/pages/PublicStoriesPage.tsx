import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { storyService, StoryItem } from '../services/storyService';
import { getMediaUrl } from '../utils/mediaUrl';
import {
  BookOpen,
  Calendar,
  Sparkles,
  Loader2,
  AlertCircle,
  Award,
  Users,
  Building,
} from 'lucide-react';

export const PublicStoriesPage: React.FC = () => {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await storyService.getPublishedStories();
        if (res.data) setStories(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load milestones.');
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-[#071827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5]">
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
      />

      <main className="flex-1 pt-32 pb-24 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#08B9E8]">Our Stories & Journey</span>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-[#08B9E8] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jaipur Roots to Global Impact</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Our Journey, Culture & Milestones
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              From our founding in Jaipur to delivering over 2,000 application modules with 40+ engineering consultants. Here is the story of how Requin Solutions became a premier software consultancy.
            </p>
          </div>

          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-[#0B2235]/70 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-bold text-[#08B9E8] block mb-1">
                2,000+
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Software Solutions Built
              </span>
            </div>
            <div className="bg-[#0B2235]/70 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-bold text-[#08B9E8] block mb-1">
                40+
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Full-Time Consultants
              </span>
            </div>
            <div className="bg-[#0B2235]/70 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-bold text-[#08B9E8] block mb-1">
                12
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Industry Excellence Awards
              </span>
            </div>
            <div className="bg-[#0B2235]/70 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-bold text-[#08B9E8] block mb-1">
                99.4%
              </span>
              <span className="text-xs text-slate-400 font-medium">
                On-Time Sprint Delivery
              </span>
            </div>
          </div>

          {/* Timeline Milestones */}
          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-10 h-10 text-[#08B9E8] animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-400">Loading timeline from database...</p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center">
              <p className="text-sm">{error}</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="py-20 text-center bg-[#0B2235]/40 rounded-2xl border border-white/10">
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-base font-bold text-white">No milestones published yet</p>
            </div>
          ) : (
            <div className="space-y-12">
              {stories.map((story, idx) => (
                <div
                  key={story.id}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 bg-[#0B2235]/60 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl ${
                    idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
                      <img
                        src={getMediaUrl(story.image)}
                        alt={story.title}
                        className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#071827]/90 border border-white/20 text-[#08B9E8] font-bold text-sm font-mono backdrop-blur-md">
                        {story.year}
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 space-y-4">
                    <span className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider block">
                      Milestone #{story.displayOrder} · {story.year}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                      {story.title}
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      {story.description}
                    </p>

                    {story.storyContent && story.storyContent !== story.description && (
                      <div className="pt-2 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/10 italic">
                        "{story.storyContent}"
                      </div>
                    )}
                  </div>
                </div>
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
      {/* <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectService={() => setIsQuizOpen(false)}
      /> */}
    </div>
  );
};
