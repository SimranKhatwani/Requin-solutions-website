import { CMSStore } from '../config/db';
import { BlogDoc } from '../types';

export const BlogModel = {
  findPublished(filters?: { category?: string; search?: string }): BlogDoc[] {
    const db = CMSStore.get();
    let blogs = db.blogs.filter((b) => b.status === 'PUBLISHED');

    if (filters?.category && filters.category !== 'All') {
      blogs = blogs.filter((b) => b.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      blogs = blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.shortDescription.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return blogs.sort(
      (a, b) =>
        new Date(b.publishedDate || b.createdAt).getTime() -
        new Date(a.publishedDate || a.createdAt).getTime()
    );
  },

  findBySlug(slug: string): BlogDoc | undefined {
    const db = CMSStore.get();
    return db.blogs.find((b) => b.slug === slug);
  },

  findById(id: string): BlogDoc | undefined {
    const db = CMSStore.get();
    return db.blogs.find((b) => b.id === id);
  },

  findAll(): BlogDoc[] {
    const db = CMSStore.get();
    return [...db.blogs].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  create(blog: BlogDoc): BlogDoc {
    const db = CMSStore.get();
    db.blogs.unshift(blog);
    CMSStore.save(db);
    return blog;
  },

  update(id: string, updates: Partial<BlogDoc>): BlogDoc | null {
    const db = CMSStore.get();
    const idx = db.blogs.findIndex((b) => b.id === id);
    if (idx === -1) return null;

    db.blogs[idx] = {
      ...db.blogs[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    CMSStore.save(db);
    return db.blogs[idx];
  },

  delete(id: string): BlogDoc | null {
    const db = CMSStore.get();
    const idx = db.blogs.findIndex((b) => b.id === id);
    if (idx === -1) return null;

    const deleted = db.blogs.splice(idx, 1)[0];
    CMSStore.save(db);
    return deleted;
  },
};
