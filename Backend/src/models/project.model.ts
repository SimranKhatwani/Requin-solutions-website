import { CMSStore } from '../config/db';
import { ProjectDoc } from '../types';

export const ProjectModel = {
  findPublished(filters?: { category?: string }): ProjectDoc[] {
    const db = CMSStore.get();
    let projects = db.projects.filter((p) => p.status === 'PUBLISHED');

    if (filters?.category && filters.category !== 'All') {
      projects = projects.filter((p) => p.category.toLowerCase() === filters.category!.toLowerCase());
    }

    return projects.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  findBySlug(slug: string): ProjectDoc | undefined {
    const db = CMSStore.get();
    return db.projects.find((p) => p.slug === slug);
  },

  findById(id: string): ProjectDoc | undefined {
    const db = CMSStore.get();
    return db.projects.find((p) => p.id === id);
  },

  findAll(): ProjectDoc[] {
    const db = CMSStore.get();
    return [...db.projects].sort((a, b) => a.displayOrder - b.displayOrder);
  },

  create(project: ProjectDoc): ProjectDoc {
    const db = CMSStore.get();
    db.projects.push(project);
    CMSStore.save(db);
    return project;
  },

  update(id: string, updates: Partial<ProjectDoc>): ProjectDoc | null {
    const db = CMSStore.get();
    const idx = db.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    db.projects[idx] = {
      ...db.projects[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    CMSStore.save(db);
    return db.projects[idx];
  },

  delete(id: string): ProjectDoc | null {
    const db = CMSStore.get();
    const idx = db.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    const deleted = db.projects.splice(idx, 1)[0];
    CMSStore.save(db);
    return deleted;
  },
};
