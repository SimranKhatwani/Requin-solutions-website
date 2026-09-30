import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CMSStore } from './db';
import { AdminUser } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_requin_cms_2026';

export interface AuthenticatedRequest extends Request {
  adminUser?: AdminUser;
}

export function generateToken(user: AdminUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or malformed authorization header.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    const db = CMSStore.get();
    const user = db.adminUsers.find((u) => u.id === decoded.id || u.email === decoded.email);

    if (!user) {
      res.status(401).json({ error: 'Unauthorized: Admin user not found.' });
      return;
    }

    req.adminUser = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
  }
}
