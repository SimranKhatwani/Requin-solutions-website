import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { CMSStore } from '../config/db';
import { AdminUser, AuthenticatedRequest } from '../types';

export function generateToken(user: AdminUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    ENV.JWT_SECRET,
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
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string; email: string };
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
