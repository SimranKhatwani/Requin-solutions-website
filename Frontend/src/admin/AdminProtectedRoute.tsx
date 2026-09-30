import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { adminAuthService, AdminProfile } from '../services/adminAuthService';
import { Loader2 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AdminProfile | null>(null);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      if (!adminAuthService.isAuthenticated()) {
        if (mounted) {
          setLoading(false);
          setUser(null);
        }
        return;
      }

      try {
        const res = await adminAuthService.getMe();
        if (mounted) {
          setUser(res.user);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 text-[#08B9E8] animate-spin mb-4" />
        <p className="text-sm text-slate-400 font-medium">Verifying Admin Session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
