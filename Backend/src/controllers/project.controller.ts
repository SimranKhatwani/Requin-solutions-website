import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';
import { AuthenticatedRequest } from '../types';

export const ProjectController = {
  getPublishedProjects(req: Request, res: Response): void {
    const { category } = req.query;
    const projects = ProjectService.getPublished({
      category: typeof category === 'string' ? category : undefined,
    });
    res.json({ success: true, count: projects.length, data: projects });
  },

  getProjectBySlug(req: Request, res: Response): void {
    const project = ProjectService.getBySlug(req.params.slug);
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found or not published.' });
      return;
    }
    res.json({ success: true, data: project });
  },

  getAllAdminProjects(_req: AuthenticatedRequest, res: Response): void {
    const projects = ProjectService.getAll();
    res.json({ success: true, count: projects.length, data: projects });
  },

  createProject(req: AuthenticatedRequest, res: Response): void {
    const result = ProjectService.create(req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(201).json({ success: true, data: result });
  },

  updateProject(req: AuthenticatedRequest, res: Response): void {
    const result = ProjectService.update(req.params.id, req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  togglePublishProject(req: AuthenticatedRequest, res: Response): void {
    const result = ProjectService.togglePublish(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  deleteProject(req: AuthenticatedRequest, res: Response): void {
    const result = ProjectService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Project deleted successfully.' });
  },
};
