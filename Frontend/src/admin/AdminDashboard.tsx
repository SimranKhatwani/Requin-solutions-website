import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  FolderGit2,
  BookOpen,
  Briefcase,
  Sparkles,
  Image as ImageIcon,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { statsService, CMSStats } from '../services/statsService';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<CMSStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await statsService.getStats();
      if (res.data) {
        setStats(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load CMS statistics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 className="w-8 h-8 text-[#08B9E8] animate-spin mb-3" />
        <p className="text-sm font-medium">Loading CMS metrics from database...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700">
        <div className="flex items-center gap-3 mb-2 font-semibold">
          <AlertCircle className="w-5 h-5" />
          <span>Error loading dashboard metrics</span>
        </div>
        <p className="text-sm">{error || 'Unknown error occurred.'}</p>
        <button
          onClick={loadStats}
          className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Blogs',
      count: stats.totalBlogs,
      subtext: `${stats.publishedBlogs} published · ${stats.draftBlogs} draft`,
      icon: FileText,
      path: '/admin/blogs',
      color: 'bg-blue-500',
    },
    {
      title: 'Projects Portfolio',
      count: stats.totalProjects,
      subtext: `${stats.publishedProjects} active in public showcase`,
      icon: FolderGit2,
      path: '/admin/projects',
      color: 'bg-emerald-500',
    },
    {
      title: 'Careers & Openings',
      count: stats.totalCareers ?? 0,
      subtext: `${stats.publishedCareers ?? 0} active · ${stats.totalApplications ?? 0} applicants`,
      icon: Briefcase,
      path: '/admin/careers',
      color: 'bg-cyan-500',
    },
    {
      title: 'Life at Requin',
      count: stats.totalLifeAtRequin ?? 4,
      subtext: `${stats.publishedLifeAtRequin ?? 4} gallery events published`,
      icon: Sparkles,
      path: '/admin/life-at-requin',
      color: 'bg-pink-500',
    },
    {
      title: 'Our Stories & Milestones',
      count: stats.totalStories,
      subtext: `${stats.publishedStories} milestones published`,
      icon: BookOpen,
      path: '/admin/our-stories',
      color: 'bg-purple-500',
    },
    {
      title: 'Media Assets',
      count: stats.totalMedia,
      subtext: 'Images & documents stored',
      icon: ImageIcon,
      path: '/admin/media',
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner with Quick Actions */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#08B9E8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#08B9E8] animate-ping" />
            Live CMS Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome to Requin CMS
          </h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Manage your dynamic publications, project case studies, company milestones, and media assets. All published changes reflect instantly on the public website.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-6">
            <button
              onClick={() => navigate('/admin/blogs?action=new')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Blog Post</span>
            </button>

            <button
              onClick={() => navigate('/admin/projects?action=new')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>

            <button
              onClick={() => navigate('/admin/life-at-requin?action=new')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#08B9E8]" />
              <span>Add Life at Requin</span>
            </button>

            <button
              onClick={() => navigate('/admin/our-stories?action=new')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Story</span>
            </button>

            <button
              onClick={() => navigate('/admin/media')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Statistics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => navigate(card.path)}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {card.title}
                </span>
                <div className={`w-9 h-9 rounded-xl ${card.color} text-white flex items-center justify-center shadow-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight block">
                  {card.count}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1 block">
                  {card.subtext}
                </span>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-[#08B9E8] transition-colors">
                <span>Manage {card.title}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Activity & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Real Database Activity Feed */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#08B9E8]" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Recent CMS Activity
              </h3>
            </div>
            <span className="text-xs text-slate-500">Real-time audit log</span>
          </div>

          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {stats.recentActivity.map((act) => (
                <div key={act.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-[#08B9E8] shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 leading-snug">
                        {act.action}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {act.entityTitle}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-medium text-slate-400 block">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(act.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 py-6 text-center">No recent activity logged yet.</p>
          )}
        </div>

        {/* Right Column: Public Preview & System Architecture Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 tracking-tight">
              Public Website Sync
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              All published blogs, projects, and story milestones are served live through REST API endpoints to the public website.
            </p>

            <div className="space-y-2.5">
              <a
                href="/blogs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-700"
              >
                <span>View Public Blogs Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href="/projects"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-700"
              >
                <span>View Public Projects Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href="/our-stories"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-700"
              >
                <span>View Public Our Stories Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};
