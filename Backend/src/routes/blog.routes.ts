import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';

export const blogRouter = Router();

// Public
blogRouter.get('/blogs', BlogController.getPublishedBlogs);
blogRouter.get('/blogs/:slug', BlogController.getBlogBySlug);

// Admin
blogRouter.get('/admin/blogs', requireAdminAuth, BlogController.getAllAdminBlogs);
blogRouter.post('/admin/blogs', requireAdminAuth, BlogController.createBlog);
blogRouter.put('/admin/blogs/:id', requireAdminAuth, BlogController.updateBlog);
blogRouter.patch('/admin/blogs/:id/publish', requireAdminAuth, BlogController.togglePublishBlog);
blogRouter.delete('/admin/blogs/:id', requireAdminAuth, BlogController.deleteBlog);
