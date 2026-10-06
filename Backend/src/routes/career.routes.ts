import { Router } from 'express';
import { CareerController } from '../controllers/career.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';

export const careerRouter = Router();

// Public
careerRouter.get('/careers', CareerController.getPublishedCareers);
careerRouter.get('/careers/:slug', CareerController.getCareerBySlug);
careerRouter.post('/careers/apply', CareerController.apply);

// Admin
careerRouter.get('/admin/careers', requireAdminAuth, CareerController.getAllAdminCareers);
careerRouter.post('/admin/careers', requireAdminAuth, CareerController.createCareer);
careerRouter.put('/admin/careers/:id', requireAdminAuth, CareerController.updateCareer);
careerRouter.patch('/admin/careers/:id/publish', requireAdminAuth, CareerController.togglePublishCareer);
careerRouter.delete('/admin/careers/:id', requireAdminAuth, CareerController.deleteCareer);

// Job Applications
careerRouter.get('/admin/careers/applications', requireAdminAuth, CareerController.getAllApplications);
careerRouter.patch('/admin/careers/applications/:id/status', requireAdminAuth, CareerController.updateApplicationStatus);
