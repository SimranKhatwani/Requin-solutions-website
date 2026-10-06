import { CMSStore } from '../config/db';
import { StoryDoc } from '../types';

export const StoryModel = {
  findPublished(): StoryDoc[] {
    const db = CMSStore.get();
    return db.stories
      .filter((s) => s.status === 'PUBLISHED')
      .sort((a, b) => a.displayOrder - b.displayOrder);
  },

  findById(id: string): StoryDoc | undefined {
    const db = CMSStore.get();
    return db.stories.find((s) => s.id === id);
  },

  findAll(): StoryDoc[] {
    const db = CMSStore.get();
    return [...db.stories].sort((a, b) => a.displayOrder - b.displayOrder);
  },

  create(story: StoryDoc): StoryDoc {
    const db = CMSStore.get();
    db.stories.push(story);
    CMSStore.save(db);
    return story;
  },

  update(id: string, updates: Partial<StoryDoc>): StoryDoc | null {
    const db = CMSStore.get();
    const idx = db.stories.findIndex((s) => s.id === id);
    if (idx === -1) return null;

    db.stories[idx] = {
      ...db.stories[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    CMSStore.save(db);
    return db.stories[idx];
  },

  delete(id: string): StoryDoc | null {
    const db = CMSStore.get();
    const idx = db.stories.findIndex((s) => s.id === id);
    if (idx === -1) return null;

    const deleted = db.stories.splice(idx, 1)[0];
    CMSStore.save(db);
    return deleted;
  },
};
