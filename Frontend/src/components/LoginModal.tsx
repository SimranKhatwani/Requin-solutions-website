import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, Mail, ArrowRight, Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { adminAuthService } from '../services/adminAuthService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage('Please enter both your email/username and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await adminAuthService.login(cleanEmail, password);
      setIsSubmitting(false);
      onClose();
      navigate('/ad');
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(
        err.message || 'Invalid credentials. Please verify your email/username and password.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/85 backdrop-blur-md">
      <div className="rounded-3xl max-w-4xl w-full shadow-2xl border border-white/10 overflow-hidden relative grid grid-cols-1 md:grid-cols-12 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          aria-label="Close Login Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Requin Branding, Dark Navy */}
        <div className="md:col-span-5 bg-[#061523] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-left border-r border-white/10">
          <div
            className="absolute -top-20 -left-20 w-60 h-60 bg-[#00c2ff]/15 blur-3xl rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center">
              <img
                src="/images/logo.png"
                alt="Requin Solutions"
                className="h-9 w-auto object-contain"
              />
            </div>

            <div className="space-y-2 pt-4">
              <span className="text-xs font-bold text-[#00c2ff] uppercase tracking-wider">
                Portal Access
              </span>
              <h3 className="text-2xl font-black text-white tracking-[-0.02em] leading-snug">
                Engineering Digital Excellence.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-[1.6] font-normal pt-2">
                Access your organization's unified workspace, operational tools, project dashboards, and administrative systems.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10">
           
          </div>
        </div>

        {/* RIGHT COLUMN: Single Unified Login Form */}
        <div className="md:col-span-7 bg-white text-[#0B1726] p-8 sm:p-10 flex flex-col justify-center text-left">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-[#061827] tracking-tight">
              Sign In
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
              Enter your credentials to access your Requin Solutions workspace.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-in fade-in duration-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email / Username Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="name@requinsolutions.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#061827] placeholder:text-slate-400 focus:outline-none focus:border-[#00c2ff] focus:bg-white transition-all disabled:opacity-60 shadow-2xs"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-[#061827] placeholder:text-slate-400 focus:outline-none focus:border-[#00c2ff] focus:bg-white transition-all disabled:opacity-60 shadow-2xs"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-[#05131f] bg-[#00c2ff] hover:bg-[#38d4ff] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#00c2ff]/20 disabled:opacity-60 cursor-pointer active:scale-[0.99] mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
