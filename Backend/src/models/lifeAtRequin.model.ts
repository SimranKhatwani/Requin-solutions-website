import { CMSStore } from '../config/db';
import { LifeAtRequinDoc } from '../types';

export const LifeAtRequinModel = {
  findPublished(): LifeAtRequinDoc[] {
    const db = CMSStore.get();
    return (db.lifeAtRequin || [])
      .filter((g) => g.status === 'PUBLISHED')
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  findById(id: string): LifeAtRequinDoc | undefined {
    const db = CMSStore.get();
    return (db.lifeAtRequin || []).find((g) => g.id === id);
  },

  findAll(): LifeAtRequinDoc[] {
    const db = CMSStore.get();
    return [...(db.lifeAtRequin || [])].sort(
      (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
    );
  },

  create(gallery: LifeAtRequinDoc): LifeAtRequinDoc {
    const db = CMSStore.get();
    if (!db.lifeAtRequin) db.lifeAtRequin = [];
    db.lifeAtRequin.push(gallery);
    CMSStore.save(db);
    return gallery;
  },

  update(id: string, updates: Partial<LifeAtRequinDoc>): LifeAtRequinDoc | null {
    const db = CMSStore.get();
    if (!db.lifeAtRequin) db.lifeAtRequin = [];
    const idx = db.lifeAtRequin.findIndex((g) => g.id === id);
    if (idx === -1) return null;

    db.lifeAtRequin[idx] = {
      ...db.lifeAtRequin[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    CMSStore.save(db);
    return db.lifeAtRequin[idx];
  },

  delete(id: string): LifeAtRequinDoc | null {
    const db = CMSStore.get();
    if (!db.lifeAtRequin) db.lifeAtRequin = [];
    const idx = db.lifeAtRequin.findIndex((g) => g.id === id);
    if (idx === -1) return null;

    const deleted = db.lifeAtRequin.splice(idx, 1)[0];
    CMSStore.save(db);
    return deleted;
  },
};
