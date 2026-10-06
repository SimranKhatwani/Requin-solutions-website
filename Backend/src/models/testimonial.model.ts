import { CMSStore } from '../config/db';
import { TestimonialDoc } from '../types';

export const TestimonialModel = {
  findPublished(): TestimonialDoc[] {
    const db = CMSStore.get();
    return (db.testimonials || [])
      .filter((t) => t.status === 'PUBLISHED')
      .sort((a, b) => a.displayOrder - b.displayOrder);
  },

  findById(id: string): TestimonialDoc | undefined {
    const db = CMSStore.get();
    return (db.testimonials || []).find((t) => t.id === id);
  },

  findAll(): TestimonialDoc[] {
    const db = CMSStore.get();
    return [...(db.testimonials || [])].sort((a, b) => a.displayOrder - b.displayOrder);
  },

  create(testimonial: TestimonialDoc): TestimonialDoc {
    const db = CMSStore.get();
    if (!db.testimonials) db.testimonials = [];
    db.testimonials.push(testimonial);
    CMSStore.save(db);
    return testimonial;
  },

  update(id: string, updates: Partial<TestimonialDoc>): TestimonialDoc | null {
    const db = CMSStore.get();
    if (!db.testimonials) db.testimonials = [];
    const idx = db.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    db.testimonials[idx] = {
      ...db.testimonials[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    CMSStore.save(db);
    return db.testimonials[idx];
  },

  delete(id: string): TestimonialDoc | null {
    const db = CMSStore.get();
    if (!db.testimonials) db.testimonials = [];
    const idx = db.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    const deleted = db.testimonials.splice(idx, 1)[0];
    CMSStore.save(db);
    return deleted;
  },
};
