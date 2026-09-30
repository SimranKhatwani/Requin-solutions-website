import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Edit3 } from 'lucide-react';
import { adminAuthService } from '../services/adminAuthService';

export const AdminQuickBar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAdmin(adminAuthService.isAuthenticated());
  }, [location.pathname]);

  // Do not show on /admin pages
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        onClick={() => navigate('/admin')}
        className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold border border-slate-700 hover:border-[#08B9E8] shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
        title="Access Requin Admin CMS to manage blogs, projects, stories, and media"
      >
        <span className="w-2 h-2 rounded-full bg-[#08B9E8] animate-pulse" />
        <ShieldCheck className="w-3.5 h-3.5 text-[#08B9E8]" />
        <span>{isAdmin ? 'Admin Dashboard' : 'Admin CMS'}</span>
        <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-white" />
      </button>
    </div>
  );
};
