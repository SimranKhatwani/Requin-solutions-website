import { BlogModel, BlogMongoose } from '../models/blog.model';
import { ActivityModel } from '../models/activity.model';
import { BlogDoc } from '../types';

export const BlogService = {
  async getPublished(filters?: { category?: string; search?: string }): Promise<BlogDoc[]> {
    return await BlogModel.findPublished(filters);
  },

  async getBySlug(slug: string): Promise<BlogDoc | null> {
    const blog = await BlogModel.findBySlug(slug);
    if (blog && blog.status === 'PUBLISHED') {
      return blog;
    }
    return null;
  },

  async getAll(): Promise<BlogDoc[]> {
    return await BlogModel.findAll();
  },

  async create(data: Partial<BlogDoc>, adminEmail: string): Promise<BlogDoc | { error: string; status: number }> {
    const { title, slug, shortDescription, content, featuredImage, author, category, tags, publishedDate, status, isFeatured, displayOrder } = data;

    if (!title || !shortDescription || !content) {
      return { error: 'Title, short description, and content are required.', status: 400 };
    }

    const autoSlug = (slug && slug.trim().length > 0)
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existingSlug = await BlogModel.findBySlug(autoSlug);
    if (existingSlug) {
      return { error: `A blog with slug "${autoSlug}" already exists. Please pick a unique slug.`, status: 400 };
    }

    // If marked as cover/featured, unset other featured blogs
    if (isFeatured) {
      await BlogMongoose.updateMany({ isFeatured: true }, { $set: { isFeatured: false } });
    }

    const newBlog: BlogDoc = {
      id: `blog-${Date.now()}`,
      title: title.trim(),
      slug: autoSlug,
      shortDescription: shortDescription.trim(),
      content,
      featuredImage: featuredImage || '/images/cloud_infrastructure_1790576629897.jpg',
      author: author || 'Requin Engineering Team',
      category: category || 'Engineering',
      tags: Array.isArray(tags) ? tags : (tags ? (tags as any).split(',').map((t: string) => t.trim()).filter(Boolean) : ['Technology']),
      publishedDate: publishedDate || new Date().toISOString(),
      status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
      isFeatured: Boolean(isFeatured),
      displayOrder: typeof displayOrder === 'number' ? displayOrder : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const created = await BlogModel.create(newBlog);
    ActivityModel.add(`Created blog post "${newBlog.title}"`, 'blog', newBlog.title, adminEmail);
    return created;
  },

  async update(id: string, data: Partial<BlogDoc>, adminEmail: string): Promise<BlogDoc | { error: string; status: number }> {
    const prev = await BlogModel.findById(id);
    if (!prev) {
      return { error: 'Blog not found.', status: 404 };
    }

    const { title, slug, shortDescription, content, featuredImage, author, category, tags, publishedDate, status, isFeatured, displayOrder } = data;

    let finalSlug = prev.slug;
    if (slug && slug !== prev.slug) {
      const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = await BlogModel.findBySlug(cleanSlug);
      if (existing && existing.id !== id) {
        return { error: `Slug "${cleanSlug}" is already taken by another blog.`, status: 400 };
      }
      finalSlug = cleanSlug;
    }

    // If setting as featured, unset others
    if (isFeatured && !prev.isFeatured) {
      await BlogMongoose.updateMany({ isFeatured: true }, { $set: { isFeatured: false } });
    }

    const updated = await BlogModel.update(id, {
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
      isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : prev.isFeatured,
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : prev.displayOrder,
    });

    if (updated) {
      ActivityModel.add(`Updated blog post "${updated.title}"`, 'blog', updated.title, adminEmail);
      return updated;
    }

    return { error: 'Failed to update blog.', status: 500 };
  },

  async togglePublish(id: string, adminEmail: string): Promise<BlogDoc | { error: string; status: number }> {
    const prev = await BlogModel.findById(id);
    if (!prev) {
      return { error: 'Blog not found.', status: 404 };
    }

    const nextStatus = prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const updated = await BlogModel.update(id, { status: nextStatus });
    if (updated) {
      ActivityModel.add(`Changed blog "${prev.title}" status to ${nextStatus}`, 'blog', prev.title, adminEmail);
      return updated;
    }
    return { error: 'Failed to toggle status.', status: 500 };
  },

  async toggleFeatured(id: string, adminEmail: string): Promise<BlogDoc | { error: string; status: number }> {
    const prev = await BlogModel.findById(id);
    if (!prev) {
      return { error: 'Blog not found.', status: 404 };
    }

    const nextFeatured = !prev.isFeatured;
    if (nextFeatured) {
      // Unset other featured blogs to maintain a single primary cover article
      await BlogMongoose.updateMany({ isFeatured: true }, { $set: { isFeatured: false } });
    }

    const updated = await BlogModel.update(id, { isFeatured: nextFeatured });
    if (updated) {
      ActivityModel.add(
        nextFeatured ? `Set blog "${prev.title}" as Featured Cover Blog` : `Unset blog "${prev.title}" as Cover Blog`,
        'blog',
        prev.title,
        adminEmail
      );
      return updated;
    }
    return { error: 'Failed to update cover status.', status: 500 };
  },

  async updateDisplayOrder(id: string, displayOrder: number, adminEmail: string): Promise<BlogDoc | { error: string; status: number }> {
    const prev = await BlogModel.findById(id);
    if (!prev) {
      return { error: 'Blog not found.', status: 404 };
    }

    const updated = await BlogModel.update(id, { displayOrder: Number(displayOrder) });
    if (updated) {
      ActivityModel.add(`Updated display order for blog "${prev.title}" to ${displayOrder}`, 'blog', prev.title, adminEmail);
      return updated;
    }
    return { error: 'Failed to update display order.', status: 500 };
  },

  async delete(id: string, adminEmail: string): Promise<BlogDoc | { error: string; status: number }> {
    const deleted = await BlogModel.delete(id);
    if (!deleted) {
      return { error: 'Blog not found.', status: 404 };
    }
    ActivityModel.add(`Deleted blog post "${deleted.title}"`, 'blog', deleted.title, adminEmail);
    return deleted;
  },
};
