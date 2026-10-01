import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, Mail, ArrowRight, CheckCircle2, Shield, Eye, EyeOff, ShieldCheck, Loader2 } from 'lucide-react';
import { adminAuthService } from '../services/adminAuthService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // If logging in as admin or entered admin credentials:
    if (activeTab === 'admin' || email.toLowerCase().includes('admin@')) {
      try {
        await adminAuthService.login(email, password);
        setIsSubmitting(false);
        onClose();
        navigate('/admin');
        return;
      } catch (err: any) {
        setIsSubmitting(false);
        setErrorMessage(err.message || 'Admin authentication failed.');
        return;
      }
    }

    // Client demo portal simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsLoggedIn(true);
    }, 500);
  };

  const handleDemoFill = () => {
    if (activeTab === 'admin') {
      setEmail('admin@requinsolutions.com');
      setPassword('Admin@Requin2026!');
    } else {
      setEmail('client@requinsolutions.com');
      setPassword('RequinDemo2026!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071827]/85 backdrop-blur-md">
      <div className="rounded-3xl max-w-4xl w-full shadow-2xl border border-white/10 overflow-hidden relative grid grid-cols-1 md:grid-cols-12">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full text-slate-400 hover:text-slate-900 md:hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          aria-label="Close Login Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Requin Branding, Dark Navy */}
        <div className="md:col-span-5 bg-[#071827] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-left border-r border-white/10">
          <div
            className="absolute -top-20 -left-20 w-60 h-60 bg-[#08B9E8]/15 blur-3xl rounded-full pointer-events-none"
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
              <span className="text-xs font-semibold text-[#08B9E8] uppercase tracking-wider">
                {activeTab === 'admin' ? 'CMS Administration' : 'Client & Partner Portal'}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-[-0.02em] leading-snug">
                {activeTab === 'admin'
                  ? 'Manage Website Content & Publications'
                  : 'Engineering Digital Excellence.'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-[1.6] font-normal pt-2">
                {activeTab === 'admin'
                  ? 'Access the protected CMS dashboard to manage blogs, project showcases, timeline stories, and media assets.'
                  : "Access your organization's project milestones, staging deployments, architecture runbooks, and SLA support desk."}
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-[#08B9E8]" />
              <span>AES-256 Bit Encrypted Session</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Login Form */}
        <div className="md:col-span-7 bg-white text-[#0B1726] p-8 sm:p-10 flex flex-col justify-center text-left">
          {/* Tab Switcher: Client Portal vs Admin CMS */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab('client');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'client'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Client Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-[#08B9E8] text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin CMS Panel</span>
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {errorMessage}
            </div>
          )}

          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#0B1726]">
                  {activeTab === 'admin' ? 'Sign in to Admin CMS' : 'Client Sign In'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeTab === 'admin'
                    ? 'Enter administrator credentials to open the content management dashboard.'
                    : 'Enter your verified client credentials to access your workspace.'}
                </p>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {activeTab === 'admin' ? 'Admin Email' : 'Corporate Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={activeTab === 'admin' ? 'admin@requinsolutions.com' : 'client@enterprise.com'}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleDemoFill}
                    className="text-[11px] font-semibold text-[#08B9E8] hover:text-[#0693ba] cursor-pointer"
                  >
                    Fill Demo Credentials
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#08B9E8]/20 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>{activeTab === 'admin' ? 'Open Admin CMS Panel' : 'Sign In to Workspace'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {activeTab === 'client' && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('admin')}
                    className="text-xs text-slate-500 hover:text-[#08B9E8] font-medium transition-colors cursor-pointer"
                  >
                    Need to update website blogs & projects? <span className="font-bold underline text-[#08B9E8]">Go to Admin CMS</span>
                  </button>
                </div>
              )}
            </form>
          ) : (
            /* Client Logged In State */
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Welcome back, Client Partner</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You are securely connected to the Requin Client Portal.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/admin');
                  }}
                  className="px-4 py-2 bg-[#08B9E8] text-slate-950 rounded-xl text-xs font-semibold hover:bg-[#4DD4F5]"
                >
                  Switch to Admin CMS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
