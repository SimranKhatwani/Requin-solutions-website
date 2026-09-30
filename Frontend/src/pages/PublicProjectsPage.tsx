import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { projectService, ProjectItem } from '../services/projectService';
import {
  FolderGit2,
  ExternalLink,
  Layers,
  Sparkles,
  Loader2,
  AlertCircle,
  ArrowRight,
  Code2,
} from 'lucide-react';

export const PublicProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await projectService.getPublishedProjects();
        if (res.data) setProjects(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((p) =>
    selectedCategory === 'All' ? true : p.category.toLowerCase() === selectedCategory.toLowerCase()
  );

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
            <span className="text-[#08B9E8]">Projects Portfolio</span>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-[#08B9E8] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Case Studies & Delivered Systems</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Engineered Solutions & Deployments
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore real-world software platforms, cloud infrastructure pipelines, and enterprise ERP systems architected and delivered by Requin Solutions Pvt Ltd.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#08B9E8] text-[#071827] shadow-md shadow-[#08B9E8]/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Showcase Grid */}
          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-10 h-10 text-[#08B9E8] animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-400">Loading portfolio from database...</p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center">
              <p className="text-sm">{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-20 text-center bg-[#0B2235]/40 rounded-2xl border border-white/10">
              <FolderGit2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-base font-bold text-white">No projects found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#0B2235]/80 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#08B9E8]/50 transition-all duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={project.featuredImage}
                      alt={project.projectName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2235] via-transparent to-transparent opacity-70" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#071827]/90 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#08B9E8]">
                      {project.category}
                    </span>
                    {project.clientName && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 text-slate-300 text-xs font-medium border border-white/10">
                        {project.clientName}
                      </span>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#08B9E8] transition-colors leading-snug">
                        {project.projectName}
                      </h3>

                      <p className="text-sm text-slate-400 leading-relaxed font-normal">
                        {project.fullDescription || project.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                          Core Technologies
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        {project.projectUrl ? (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-[#08B9E8] hover:text-[#4DD4F5]"
                          >
                            <span>Live Case Study</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-xs text-slate-500">Enterprise Confidential</span>
                        )}

                        <button
                          onClick={() => navigate('/#contact')}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#08B9E8] transition-colors"
                        >
                          <span>Request Similar Solution</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
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
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectService={() => setIsQuizOpen(false)}
      />
    </div>
  );
};
