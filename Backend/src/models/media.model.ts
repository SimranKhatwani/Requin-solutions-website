import { CMSStore } from '../config/db';
import { MediaDoc } from '../types';

export const MediaModel = {
  findAll(): MediaDoc[] {
    const db = CMSStore.get();
    return [...db.media].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  findById(id: string): MediaDoc | undefined {
    const db = CMSStore.get();
    return db.media.find((m) => m.id === id);
  },

  create(media: MediaDoc): MediaDoc {
    const db = CMSStore.get();
    db.media.unshift(media);
    CMSStore.save(db);
    return media;
  },

  delete(id: string): MediaDoc | null {
    const db = CMSStore.get();
    const idx = db.media.findIndex((m) => m.id === id);
    if (idx === -1) return null;

    const deleted = db.media.splice(idx, 1)[0];
    CMSStore.save(db);
    return deleted;
  },
};
