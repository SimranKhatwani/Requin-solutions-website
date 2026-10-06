import { Request, Response } from 'express';
import { CareerService } from '../services/career.service';
import { AuthenticatedRequest } from '../types';

export const CareerController = {
  getPublishedCareers(req: Request, res: Response): void {
    const { department, employmentType, search } = req.query;
    const careers = CareerService.getPublished({
      department: typeof department === 'string' ? department : undefined,
      employmentType: typeof employmentType === 'string' ? employmentType : undefined,
      search: typeof search === 'string' ? search : undefined,
    });
    res.json({ success: true, count: careers.length, data: careers });
  },

  getCareerBySlug(req: Request, res: Response): void {
    const career = CareerService.getBySlugOrId(req.params.slug);
    if (!career) {
      res.status(404).json({ success: false, error: 'Job opening not found or no longer active.' });
      return;
    }
    res.json({ success: true, data: career });
  },

  apply(req: Request, res: Response): void {
    const result = CareerService.apply(req.body);
    if ('error' in result) {
      res.status(result.status).json({ success: false, error: result.error });
      return;
    }
    res.status(201).json({
      success: true,
      message: 'Your application has been received and forwarded to our HR engineering team at Hr@requinsolutions.com.',
      data: result,
    });
  },

  getAllAdminCareers(_req: AuthenticatedRequest, res: Response): void {
    const careers = CareerService.getAll();
    res.json({ success: true, count: careers.length, data: careers });
  },

  createCareer(req: AuthenticatedRequest, res: Response): void {
    const result = CareerService.create(req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(201).json({ success: true, data: result });
  },

  updateCareer(req: AuthenticatedRequest, res: Response): void {
    const result = CareerService.update(req.params.id, req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  togglePublishCareer(req: AuthenticatedRequest, res: Response): void {
    const result = CareerService.togglePublish(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  deleteCareer(req: AuthenticatedRequest, res: Response): void {
    const result = CareerService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Career opening deleted successfully.' });
  },

  getAllApplications(_req: AuthenticatedRequest, res: Response): void {
    const applications = CareerService.getApplications();
    res.json({ success: true, count: applications.length, data: applications });
  },

  updateApplicationStatus(req: AuthenticatedRequest, res: Response): void {
    const { status } = req.body;
    const result = CareerService.updateApplicationStatus(req.params.id, status);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },
};
