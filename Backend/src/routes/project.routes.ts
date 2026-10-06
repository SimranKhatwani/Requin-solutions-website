import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';

export const projectRouter = Router();

// Public
projectRouter.get('/projects', ProjectController.getPublishedProjects);
projectRouter.get('/projects/:slug', ProjectController.getProjectBySlug);

// Admin
projectRouter.get('/admin/projects', requireAdminAuth, ProjectController.getAllAdminProjects);
projectRouter.post('/admin/projects', requireAdminAuth, ProjectController.createProject);
projectRouter.put('/admin/projects/:id', requireAdminAuth, ProjectController.updateProject);
projectRouter.patch('/admin/projects/:id/publish', requireAdminAuth, ProjectController.togglePublishProject);
projectRouter.delete('/admin/projects/:id', requireAdminAuth, ProjectController.deleteProject);
