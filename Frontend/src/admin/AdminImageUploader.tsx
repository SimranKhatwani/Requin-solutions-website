import React, { useRef, useState } from 'react';
import { Upload, Loader2, Check, AlertCircle, Trash2, Image as ImageIcon } from 'lucide-react';
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
  helpText = 'File size must be less than 5 MB.',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    const isMimeValid = fileType ? (ALLOWED_IMAGE_MIME_TYPES.includes(fileType) || fileType.startsWith('image/')) : false;
    const isExtValid = ALLOWED_IMAGE_EXTENSIONS.includes(ext);

    if (!isMimeValid && !isExtValid) {
      setErrorMessage('Please upload a valid image file. Allowed formats: JPG, PNG, WEBP, GIF, SVG, AVIF.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      setUploading(true);
      const res = await mediaService.uploadMedia(file, module);
      if (res.success && res.data) {
        onChange(res.data.url);
        setSuccessMessage('Image uploaded successfully.');
        setTimeout(() => setSuccessMessage(null), 3500);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
    setErrorMessage(null);
    setSuccessMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const hasImage = Boolean(value && value.trim() !== '');

  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <span className="text-[11px] text-slate-400 font-medium">{helpText}</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif,.avif,image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {hasImage ? (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-20 h-20 shrink-0 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 relative group">
              <img
                src={getMediaUrl(value)}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-slate-700 truncate" title={value}>
                {value}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5 shadow-2xs"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#08B9E8]" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5 text-[#08B9E8]" />
                      <span>Change Image</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={uploading}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-white border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2 shrink-0 shadow-2xs"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#08B9E8]" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 text-[#08B9E8]" />
                <span>Choose File</span>
              </>
            )}
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="No file chosen or enter /images/... or URL"
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#08B9E8]"
          />
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 animate-in fade-in">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 animate-in fade-in">
          <Check className="w-3.5 h-3.5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
    </div>
  );
};
