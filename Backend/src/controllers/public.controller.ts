import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { AuthenticatedRequest } from '../types';

export const PublicController = {
  submitSupport(req: Request, res: Response): void {
    const result = NotificationService.submitSupportInquiry(req.body);
    if ('error' in result) {
      res.status(result.status).json({ success: false, error: result.error });
      return;
    }
    res.json({
      success: true,
      message: 'Support request recorded and queued for delivery to requingroupsolutions@gmail.com',
      data: result,
    });
  },

  subscribeNewsletter(req: Request, res: Response): void {
    const { email, source } = req.body;
    const result = NotificationService.subscribeNewsletter(email, source);
    if ('error' in result) {
      res.status(result.status).json({ success: false, error: result.error });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Thank you for subscribing! Details have been routed directly to requingroupsolutions@gmail.com.',
      data: result.subscriber,
    });
  },

  getAllSubscribers(_req: AuthenticatedRequest, res: Response): void {
    const subscribers = NotificationService.getAllSubscribers();
    res.json({ success: true, data: subscribers });
  },

  async handleChat(req: Request, res: Response): Promise<void> {
    const { message } = req.body;
    const result = await NotificationService.handleChat(message);
    res.json(result);
  },
};
