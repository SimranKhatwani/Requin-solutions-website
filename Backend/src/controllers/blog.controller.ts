import { Request, Response } from 'express';
import { BlogService } from '../services/blog.service';
import { AuthenticatedRequest } from '../types';

export const BlogController = {
  async getPublishedBlogs(req: Request, res: Response): Promise<void> {
    const { category, search } = req.query;
    const blogs = await BlogService.getPublished({
      category: typeof category === 'string' ? category : undefined,
      search: typeof search === 'string' ? search : undefined,
    });
    res.json({ success: true, count: blogs.length, data: blogs });
  },

  async getBlogBySlug(req: Request, res: Response): Promise<void> {
    const blog = await BlogService.getBySlug(req.params.slug);
    if (!blog) {
      res.status(404).json({ success: false, error: 'Blog not found or not published.' });
      return;
    }
    res.json({ success: true, data: blog });
  },

  async getAllAdminBlogs(_req: AuthenticatedRequest, res: Response): Promise<void> {
    const blogs = await BlogService.getAll();
    res.json({ success: true, data: blogs });
  },

  async createBlog(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await BlogService.create(req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(201).json({ success: true, data: result });
  },

  async updateBlog(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await BlogService.update(req.params.id, req.body, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  async togglePublishBlog(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await BlogService.togglePublish(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, data: result });
  },

  async deleteBlog(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await BlogService.delete(req.params.id, req.adminUser!.email);
    if ('error' in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.json({ success: true, message: 'Blog deleted successfully.' });
  },
};
