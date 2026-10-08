import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FolderGit2,
  BookOpen,
  Briefcase,
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { adminAuthService } from '../services/adminAuthService';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out of the Admin Panel?')) {
      await adminAuthService.logout();
      navigate('/ad/login');
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '/ad', icon: LayoutDashboard, exact: true },
    { label: 'Blogs', path: '/ad/blogs', icon: FileText },
    { label: 'Projects', path: '/ad/projects', icon: FolderGit2 },
    { label: 'Careers', path: '/ad/careers', icon: Briefcase },
    { label: 'Life at Requin', path: '/ad/life-at-requin', icon: Sparkles },
    { label: 'Our Stories', path: '/ad/our-stories', icon: BookOpen },
    { label: 'Testimonials', path: '/ad/testimonials', icon: MessageSquare },
    { label: 'Media Library', path: '/ad/media', icon: ImageIcon },
    { label: 'Settings', path: '/ad/settings', icon: Settings },
  ];

  const getPageTitle = () => {
    if (location.pathname === '/ad' || location.pathname === '/ad/') return 'Dashboard Overview';
    if (location.pathname.startsWith('/ad/blogs')) return 'Blog Management';
    if (location.pathname.startsWith('/ad/projects')) return 'Project Portfolio';
    if (location.pathname.startsWith('/ad/careers')) return 'Careers & Openings';
    if (location.pathname.startsWith('/ad/life-at-requin')) return 'Life at Requin Gallery';
    if (location.pathname.startsWith('/ad/our-stories')) return 'Our Stories & Milestones';
    if (location.pathname.startsWith('/ad/testimonials')) return 'Client Feedback & Testimonials';
    if (location.pathname.startsWith('/ad/media')) return 'Media Library';
    if (location.pathname.startsWith('/ad/settings')) return 'CMS Settings';
    return 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } border-r border-slate-800 shadow-xl lg:shadow-none`}
      >
        {/* Brand Area */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Requin Solutions"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#08B9E8] block">
                CMS Panel
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Requin Solutions</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items & Quick Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Content Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#08B9E8] text-slate-950 font-semibold shadow-md shadow-[#08B9E8]/20'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Links
          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#08B9E8]" />
              <span>Public Website</span>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Live</span>
          </a>

          {/* Native Sign Out Nav Item */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-rose-500/15 hover:text-rose-400 transition-all duration-200 cursor-pointer group text-left"
          >
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-400 shrink-0" />
            <span>Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
              aria-label="Open Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {getPageTitle()}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                <span>Requin CMS</span>
                <span>/</span>
                <span className="text-[#08B9E8] font-semibold">{getPageTitle()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Site</span>
            </a>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2 pl-1">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                A
              </span>
              <div className="hidden md:block text-left text-xs">
                <span className="font-semibold text-slate-900 block leading-tight">Admin</span>
                <span className="text-[11px] text-slate-500 leading-tight">Superuser</span>
              </div>
            </div>
          </div>
        </header>

        {/* Nested Page Route Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
