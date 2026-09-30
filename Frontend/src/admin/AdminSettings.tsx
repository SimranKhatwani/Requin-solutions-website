import React, { useEffect, useState } from 'react';
import {
  Settings as SettingsIcon,
  Shield,
  Key,
  Database,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Server,
  Terminal,
} from 'lucide-react';
import { adminAuthService, AdminProfile } from '../services/adminAuthService';

export const AdminSettings: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    adminAuthService.getMe().then((res) => {
      if (res.user) setProfile(res.user);
    }).catch(() => {});
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await adminAuthService.updatePassword(currentPassword, newPassword);
      setMessage({ type: 'success', text: res.message || 'Password changed successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update password.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          CMS & Admin Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your administrator credentials, system configuration, and database connection.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-700'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Admin Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          <Shield className="w-5 h-5 text-[#08B9E8]" />
          <h3 className="text-base font-bold text-slate-900">
            Administrator Profile
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Full Name
            </span>
            <span className="text-sm font-bold text-slate-900">
              {profile?.name || 'Requin Administrator'}
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Email Address
            </span>
            <span className="text-sm font-bold text-slate-900 font-mono">
              {profile?.email || 'admin@requinsolutions.com'}
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Role & Permissions
            </span>
            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase">
              {profile?.role || 'Superadmin'}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          <Key className="w-5 h-5 text-[#08B9E8]" />
          <h3 className="text-base font-bold text-slate-900">
            Security & Password Update
          </h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              New Password (min. 6 characters)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 disabled:opacity-50 cursor-pointer"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Database & Architecture Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          <Database className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            Database & API Architecture
          </h3>
        </div>

        <div className="space-y-4 text-xs text-slate-600">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <Server className="w-4 h-4 text-slate-500" />
              <div>
                <span className="font-bold text-slate-900 block">Backend Engine</span>
                <span className="text-[11px] text-slate-500">Node.js + Express with Mongoose layer</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
              Active & Healthy
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-slate-500" />
              <div>
                <span className="font-bold text-slate-900 block">Persistence Strategy</span>
                <span className="text-[11px] text-slate-500">MongoDB connection string (or fallback local JSON store data/cms_store.json)</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
              Ready & Synced
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-slate-500" />
              <div>
                <span className="font-bold text-slate-900 block">Image Storage Provider</span>
                <span className="text-[11px] text-slate-500">Multi-part Multer file uploads with cloud storage adapter support</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
              Configured
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
