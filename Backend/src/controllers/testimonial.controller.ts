import { Request, Response } from 'express';
import { TestimonialService } from '../services/testimonial.service';
import { AuthenticatedRequest } from '../types';

export const TestimonialController = {
  getPublishedTestimonials(_req: Request, res: Response): void {
    const testimonials = TestimonialService.getPublished();
    res.json({ success: true, count: testimonials.length, data: testimonials });
  },

  getAllAdminTestimonials(_req: AuthenticatedRequest, res: Response): void {
    const testimonials = TestimonialService.getAll();
    res.json({ success: true, count: testimonials.length, data: testimonials });
  },

  createTestimonial(req: AuthenticatedRequest, res: Response): void {
    const result = TestimonialService.create(req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(201).json({ success: true, data: result });
  },

  updateTestimonial(req: AuthenticatedRequest, res: Response): void {
    const result = TestimonialService.update(req.params.id, req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  deleteTestimonial(req: AuthenticatedRequest, res: Response): void {
    const result = TestimonialService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  },
};
