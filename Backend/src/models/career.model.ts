import { CMSStore } from '../config/db';
import { CareerDoc, JobApplicationDoc } from '../types';

export const CareerModel = {
  findPublished(filters?: { department?: string; employmentType?: string; search?: string }): CareerDoc[] {
    const db = CMSStore.get();
    let careers = (db.careers || []).filter((c) => c.status === 'PUBLISHED');

    if (filters?.department && filters.department !== 'All') {
      careers = careers.filter((c) => c.department.toLowerCase() === filters.department!.toLowerCase());
    }

    if (filters?.employmentType && filters.employmentType !== 'All') {
      careers = careers.filter((c) => c.employmentType.toLowerCase() === filters.employmentType!.toLowerCase());
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      careers = careers.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.department.toLowerCase().includes(q) ||
          c.requirements.some((r) => r.toLowerCase().includes(q))
      );
    }

    return careers.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  findBySlugOrId(identifier: string): CareerDoc | undefined {
    const db = CMSStore.get();
    return (db.careers || []).find(
      (c) => (c.slug === identifier || c.id === identifier) && c.status === 'PUBLISHED'
    );
  },

  findById(id: string): CareerDoc | undefined {
    const db = CMSStore.get();
    return (db.careers || []).find((c) => c.id === id);
  },

  findAll(): CareerDoc[] {
    const db = CMSStore.get();
    return [...(db.careers || [])].sort((a, b) => a.displayOrder - b.displayOrder);
  },

  create(career: CareerDoc): CareerDoc {
    const db = CMSStore.get();
    if (!db.careers) db.careers = [];
    db.careers.push(career);
    CMSStore.save(db);
    return career;
  },

  update(id: string, updates: Partial<CareerDoc>): CareerDoc | null {
    const db = CMSStore.get();
    if (!db.careers) db.careers = [];
    const idx = db.careers.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    db.careers[idx] = {
      ...db.careers[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    CMSStore.save(db);
    return db.careers[idx];
  },

  delete(id: string): CareerDoc | null {
    const db = CMSStore.get();
    if (!db.careers) db.careers = [];
    const idx = db.careers.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    const deleted = db.careers.splice(idx, 1)[0];
    CMSStore.save(db);
    return deleted;
  },

  // Job Applications
  createApplication(app: JobApplicationDoc): JobApplicationDoc {
    const db = CMSStore.get();
    if (!db.jobApplications) db.jobApplications = [];
    db.jobApplications.unshift(app);
    CMSStore.save(db);
    return app;
  },

  getAllApplications(): JobApplicationDoc[] {
    const db = CMSStore.get();
    return db.jobApplications || [];
  },

  updateApplicationStatus(id: string, status: JobApplicationDoc['status']): JobApplicationDoc | null {
    const db = CMSStore.get();
    if (!db.jobApplications) db.jobApplications = [];
    const idx = db.jobApplications.findIndex((a) => a.id === id);
    if (idx === -1) return null;

    db.jobApplications[idx].status = status;
    CMSStore.save(db);
    return db.jobApplications[idx];
  },
};
