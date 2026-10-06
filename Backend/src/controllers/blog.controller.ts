import { Request, Response } from 'express';
import { BlogService } from '../services/blog.service';
import { AuthenticatedRequest } from '../types';

export const BlogController = {
  getPublishedBlogs(req: Request, res: Response): void {
    const { category, search } = req.query;
    const blogs = BlogService.getPublished({
      category: typeof category === 'string' ? category : undefined,
      search: typeof search === 'string' ? search : undefined,
    });
    res.json({ success: true, count: blogs.length, data: blogs });
  },

  getBlogBySlug(req: Request, res: Response): void {
    const blog = BlogService.getBySlug(req.params.slug);
    if (!blog) {
      res.status(404).json({ success: false, error: 'Blog not found or not published.' });
      return;
    }
    res.json({ success: true, data: blog });
  },

  getAllAdminBlogs(_req: AuthenticatedRequest, res: Response): void {
    const blogs = BlogService.getAll();
    res.json({ success: true, data: blogs });
  },

  createBlog(req: AuthenticatedRequest, res: Response): void {
    const result = BlogService.create(req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(201).json({ success: true, data: result });
  },

  updateBlog(req: AuthenticatedRequest, res: Response): void {
    const result = BlogService.update(req.params.id, req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  togglePublishBlog(req: AuthenticatedRequest, res: Response): void {
    const result = BlogService.togglePublish(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  deleteBlog(req: AuthenticatedRequest, res: Response): void {
    const result = BlogService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Blog deleted successfully.' });
  },
};
