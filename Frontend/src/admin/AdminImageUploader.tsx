import React, { useRef, useState, useEffect } from 'react';
import {
  Upload,
  Loader2,
  Check,
  AlertCircle,
  Trash2,
  Image as ImageIcon,
  Link as LinkIcon,
  ExternalLink,
  Eye,
} from 'lucide-react';
import {
  mediaService,
  MAX_IMAGE_SIZE_BYTES,
  ALLOWED_IMAGE_MIME_TYPES,
  ALLOWED_IMAGE_EXTENSIONS,
} from '../services/mediaService';
import { getMediaUrl } from '../utils/mediaUrl';

interface AdminImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  module?: string;
  required?: boolean;
  helpText?: string;
}

export const AdminImageUploader: React.FC<AdminImageUploaderProps> = ({
  label,
  value,
  onChange,
  module = 'general',
  required = false,
  helpText = 'File size must be less than 5 MB. Supports JPG, PNG, WebP, GIF, SVG, AVIF.',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState(value || '');

  useEffect(() => {
    setUrlInput(value || '');
    if (value && (value.startsWith('http://') || value.startsWith('https://'))) {
      setActiveTab('url');
    }
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    // 1. Check file size (Strict 5 MB limit)
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setErrorMessage('File size must be less than 5 MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // 2. Check file format (MIME & Extension)
    const fileType = (file.type || '').toLowerCase();
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    const isMimeValid = fileType
      ? ALLOWED_IMAGE_MIME_TYPES.includes(fileType) || fileType.startsWith('image/')
      : false;
    const isExtValid = ALLOWED_IMAGE_EXTENSIONS.includes(ext);

    if (!isMimeValid && !isExtValid) {
      setErrorMessage(
        'Please upload a valid image file. Allowed formats: JPG, PNG, WEBP, GIF, SVG, AVIF.'
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      setUploading(true);
      const res = await mediaService.uploadMedia(file, module);
      if (res.success && res.data) {
        onChange(res.data.url);
        setUrlInput(res.data.url);
        setSuccessMessage('Image uploaded from device successfully.');
        setTimeout(() => setSuccessMessage(null), 3500);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUrlApply = () => {
    if (!urlInput.trim()) {
      setErrorMessage('Please enter an image URL.');
      return;
    }
    setErrorMessage(null);
    onChange(urlInput.trim());
    setSuccessMessage('Image URL applied successfully.');
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    setErrorMessage(null);
    setSuccessMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const hasImage = Boolean(value && value.trim() !== '');

  return (
    <div className="space-y-3 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <label className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <span className="text-[11px] text-slate-400 font-medium">{helpText}</span>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="w-3.5 h-3.5 text-[#08B9E8]" />
          <span>Upload from Device</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'url'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5 text-[#08B9E8]" />
          <span>Enter Direct URL</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif,.avif,image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Tab 1: Upload from Device UI */}
      {activeTab === 'upload' && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2 shrink-0 shadow-xs"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading File...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Choose Image File</span>
                </>
              )}
            </button>
            <span className="text-xs text-slate-500">
              {hasImage && !value.startsWith('http')
                ? `Current file: ${value}`
                : 'Select any PNG, JPG, WebP, SVG from your computer'}
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Direct URL UI */}
      {activeTab === 'url' && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  onChange(e.target.value);
                }}
                onBlur={handleUrlApply}
                placeholder="https://images.unsplash.com/... or /images/..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8]"
              />
            </div>
            <button
              type="button"
              onClick={handleUrlApply}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              Apply URL
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Paste any direct HTTPS image URL from Prismic, Unsplash, Cloudinary, AWS S3, or local path.
          </p>
        </div>
      )}

      {/* Current Image Preview & Management Card */}
      {hasImage && (
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group">
              <img
                src={getMediaUrl(value)}
                alt="Selected preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <span className="font-semibold text-slate-700">Active Source:</span>
                <span className="font-mono text-[11px] text-slate-600 truncate max-w-[240px] sm:max-w-md block" title={value}>
                  {value}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getMediaUrl(value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1"
                  title="View full image in new tab"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Full</span>
                </a>

                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={uploading}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50/50 border border-rose-200 hover:bg-rose-100/60 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 px-3 py-2 rounded-xl border border-rose-200 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
    </div>
  );
};
