import { Router } from 'express';
import { TestimonialController } from '../controllers/testimonial.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';

export const testimonialRouter = Router();

// Public
testimonialRouter.get('/testimonials', TestimonialController.getPublishedTestimonials);

// Admin
testimonialRouter.get('/admin/testimonials', requireAdminAuth, TestimonialController.getAllAdminTestimonials);
testimonialRouter.post('/admin/testimonials', requireAdminAuth, TestimonialController.createTestimonial);
testimonialRouter.put('/admin/testimonials/:id', requireAdminAuth, TestimonialController.updateTestimonial);
testimonialRouter.delete('/admin/testimonials/:id', requireAdminAuth, TestimonialController.deleteTestimonial);
