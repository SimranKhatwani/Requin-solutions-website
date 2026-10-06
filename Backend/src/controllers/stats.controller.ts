import { Response } from 'express';
import { StatsService } from '../services/stats.service';
import { AuthenticatedRequest } from '../types';

export const StatsController = {
  getStats(_req: AuthenticatedRequest, res: Response): void {
    const stats = StatsService.getStats();
    res.json({
      success: true,
      data: stats,
    });
  },
};
