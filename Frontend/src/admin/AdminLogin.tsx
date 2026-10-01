import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft, ShieldCheck, Key } from 'lucide-react';
import { adminAuthService } from '../services/adminAuthService';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if session was expired
    const params = new URLSearchParams(location.search);
    if (params.get('expired')) {
      setError('Your admin session has expired. Please sign in again.');
    }

    // If already authenticated, redirect to /admin
    if (adminAuthService.isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await adminAuthService.login(email, password);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@requinsolutions.com');
    setPassword('Admin@Requin2026!');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#08B9E8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Public Website Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Requin Public Website</span>
        </a>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Header with Authentic Requin Logo */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img
              src="/images/logo.png"
              alt="Requin Solutions Pvt Ltd"
              className="h-12 w-auto object-contain mx-auto"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Admin CMS Portal
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage dynamic website content and publications.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative z-10">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Admin Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@requinsolutions.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#08B9E8] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#08B9E8] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-lg shadow-[#08B9E8]/20 focus:outline-none disabled:opacity-50 active:scale-[0.99] cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-3 h-3 text-[#08B9E8]" />
                  <span>Default Admin Credentials</span>
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[11px] text-[#08B9E8] hover:text-[#4DD4F5] font-semibold underline cursor-pointer"
                >
                  Autofill
                </button>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                admin@requinsolutions.com / Admin@Requin2026!
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          © 2026 Requin Solutions Pvt Ltd · Protected Admin Area
        </p>
      </div>
    </div>
  );
};
