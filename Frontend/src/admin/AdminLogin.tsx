import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Loader2, ArrowRight, X, Key } from 'lucide-react';
import { adminAuthService, AdminProfile } from '../services/adminAuthService';

interface AdminLoginProps {
  onLoginSuccess?: (user: AdminProfile) => void;
  onClose?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onClose }) => {
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
  }, [location]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setError('Please provide both email/username and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await adminAuthService.login(cleanEmail, password);
      if (onLoginSuccess && res.user) {
        onLoginSuccess(res.user);
      } else {
        navigate('/ad', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please verify your credentials.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071827]/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background Soft Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(8,185,232,0.12),transparent_70%)] blur-3xl pointer-events-none" />

      {/* Main 2-Column Portal Modal Box */}
      <div className="rounded-3xl max-w-4xl w-full shadow-2xl border border-white/10 overflow-hidden relative grid grid-cols-1 md:grid-cols-12 z-10 animate-in zoom-in-95 duration-200 bg-[#061523]">
        {/* Close Button at top right */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          title="Close Login Portal"
          aria-label="Close Login Portal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Requin Branding (Dark Navy) */}
        <div className="md:col-span-5 bg-[#061523] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-left border-r border-white/10">
          <div
            className="absolute -top-20 -left-20 w-60 h-60 bg-[#00c2ff]/15 blur-3xl rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center">
              <img
                src="/images/logo.png"
                alt="Requin Solutions Pvt Ltd"
                className="h-10 sm:h-12 w-auto object-contain block"
              />
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#00c2ff] uppercase tracking-wider block">
                PORTAL ACCESS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-[-0.02em] leading-snug">
                Engineering Digital Excellence.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-2">
                Access your organization's unified workspace, operational tools, project dashboards, and administrative systems.
              </p>
            </div>
          </div>

          {/* Bottom subtle note */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="text-slate-400">Requin Solutions</span>
            <span className="text-[11px] text-slate-500 font-mono">v2.0 CMS</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Sign In Form (Clean White Card) */}
        <div className="md:col-span-7 bg-white text-[#0B1726] p-8 sm:p-10 flex flex-col justify-center text-left">
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-black text-[#061827] tracking-tight">
              Sign In
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
              Enter your credentials to access your Requin Solutions workspace.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email or Username Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                EMAIL OR USERNAME
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="admin@requinsolutions.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#061827] placeholder:text-slate-400 focus:outline-none focus:border-[#00c2ff] focus:bg-white transition-all disabled:opacity-60 shadow-2xs"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                PASSWORD
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#061827] placeholder:text-slate-400 focus:outline-none focus:border-[#00c2ff] focus:bg-white transition-all disabled:opacity-60 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-[#05131f] bg-[#00c2ff] hover:bg-[#38d4ff] transition-all duration-200 shadow-md shadow-[#00c2ff]/25 focus:outline-none disabled:opacity-50 active:scale-[0.99] cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <Key className="w-3.5 h-3.5 text-[#00c2ff]" />
              <span>Default Admin Account</span>
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[#00c2ff] hover:text-[#0099cc] font-semibold underline cursor-pointer"
            >
              Autofill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
