import { Response } from 'express';
import { StatsService } from '../services/stats.service';
import { AuthenticatedRequest } from '../types';

export const StatsController = {
  async getStats(_req: AuthenticatedRequest, res: Response): Promise<void> {
    const stats = await StatsService.getStats();
    res.json({
      success: true,
      data: stats,
    });
  },
};
