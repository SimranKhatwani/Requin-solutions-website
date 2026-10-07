import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

// Enforce strictly 5 MB file size limit in memory
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/pjpeg',
  'image/png',
  'image/x-png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  'image/avif-sequence',
  'image/heif',
  'image/heic',
  'application/octet-stream', // fallback checked with extension
];

export const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
  '.jfif',
  '.avif',
  '.heic',
  '.heif',
];

const memoryStorage = multer.memoryStorage();

const rawUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = (file.mimetype || '').toLowerCase();

    const isMimeMatch = ALLOWED_MIME_TYPES.includes(mime) || mime.startsWith('image/');
    const isExtMatch = ALLOWED_EXTENSIONS.includes(ext);

    if (isMimeMatch || isExtMatch) {
      cb(null, true);
    } else {
      cb(new Error('Please upload a valid image file. Allowed formats: JPG, PNG, WEBP, GIF, SVG, AVIF.'));
    }
  },
});

/**
 * Middleware wrapper for single file upload with strict error handling for 5MB limit and MIME checks.
 */
export function uploadSingleImage(fieldName: string = 'file') {
  const single = rawUpload.single(fieldName);

  return (req: Request, res: Response, next: NextFunction) => {
    single(req, res, (err: any) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ error: 'File size must be less than 5 MB.' });
            return;
          }
          res.status(400).json({ error: `Upload error: ${err.message}` });
          return;
        }
        res.status(400).json({ error: err.message || 'File upload validation failed.' });
        return;
      }
      next();
    });
  };
}

export const upload = {
  single: (fieldName: string = 'file') => uploadSingleImage(fieldName),
};
