import { BlogModel } from '../models/blog.model';
import { ActivityModel } from '../models/activity.model';
import { BlogDoc } from '../types';

export const BlogService = {
  getPublished(filters?: { category?: string; search?: string }): BlogDoc[] {
    return BlogModel.findPublished(filters);
  },

  getBySlug(slug: string): BlogDoc | undefined {
    const blog = BlogModel.findBySlug(slug);
    if (blog && blog.status === 'PUBLISHED') {
      return blog;
    }
    return undefined;
  },

  getAll(): BlogDoc[] {
    return BlogModel.findAll();
  },

  create(data: Partial<BlogDoc>, adminEmail: string): BlogDoc | { error: string; status: number } {
    const { title, slug, shortDescription, content, featuredImage, author, category, tags, publishedDate, status } = data;

    if (!title || !shortDescription || !content) {
      return { error: 'Title, short description, and content are required.', status: 400 };
    }

    const autoSlug = (slug && slug.trim().length > 0)
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existingSlug = BlogModel.findBySlug(autoSlug);
    if (existingSlug) {
      return { error: `A blog with slug "${autoSlug}" already exists. Please pick a unique slug.`, status: 400 };
    }

    const newBlog: BlogDoc = {
      id: `blog-${Date.now()}`,
      title,
      slug: autoSlug,
      shortDescription,
      content,
      featuredImage: featuredImage || '/images/cloud-architecture.jpg',
      author: author || 'Requin Engineering Team',
      category: category || 'Engineering',
      tags: Array.isArray(tags) ? tags : (tags ? (tags as any).split(',').map((t: string) => t.trim()).filter(Boolean) : ['Technology']),
      publishedDate: publishedDate || new Date().toISOString(),
      status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    BlogModel.create(newBlog);
    ActivityModel.add(`Created blog post "${newBlog.title}"`, 'blog', newBlog.title, adminEmail);
    return newBlog;
  },

  update(id: string, data: Partial<BlogDoc>, adminEmail: string): BlogDoc | { error: string; status: number } {
    const prev = BlogModel.findById(id);
    if (!prev) {
      return { error: 'Blog not found.', status: 404 };
    }

    const { title, slug, shortDescription, content, featuredImage, author, category, tags, publishedDate, status } = data;

    let finalSlug = prev.slug;
    if (slug && slug !== prev.slug) {
      const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = BlogModel.findBySlug(cleanSlug);
      if (existing && existing.id !== id) {
        return { error: `Slug "${cleanSlug}" is already taken by another blog.`, status: 400 };
      }
      finalSlug = cleanSlug;
    }

    const updated = BlogModel.update(id, {
      title: title ?? prev.title,
      slug: finalSlug,
      shortDescription: shortDescription ?? prev.shortDescription,
      content: content ?? prev.content,
      featuredImage: featuredImage ?? prev.featuredImage,
      author: author ?? prev.author,
      category: category ?? prev.category,
      tags: tags ? (Array.isArray(tags) ? tags : (tags as any).split(',').map((t: string) => t.trim()).filter(Boolean)) : prev.tags,
      publishedDate: publishedDate ?? prev.publishedDate,
      status: status ?? prev.status,
    });

    if (updated) {
      ActivityModel.add(`Updated blog post "${updated.title}"`, 'blog', updated.title, adminEmail);
      return updated;
    }

    return { error: 'Failed to update blog.', status: 500 };
  },

  togglePublish(id: string, adminEmail: string): BlogDoc | { error: string; status: number } {
    const prev = BlogModel.findById(id);
    if (!prev) {
      return { error: 'Blog not found.', status: 404 };
    }

    const nextStatus = prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const updated = BlogModel.update(id, { status: nextStatus });
    if (updated) {
      ActivityModel.add(`Changed blog "${prev.title}" status to ${nextStatus}`, 'blog', prev.title, adminEmail);
      return updated;
    }
    return { error: 'Failed to toggle status.', status: 500 };
  },

  delete(id: string, adminEmail: string): BlogDoc | { error: string; status: number } {
    const deleted = BlogModel.delete(id);
    if (!deleted) {
      return { error: 'Blog not found.', status: 404 };
    }
    ActivityModel.add(`Deleted blog post "${deleted.title}"`, 'blog', deleted.title, adminEmail);
    return deleted;
  },
};
