import { CMSStore } from '../config/db';
import { ActivityDoc } from '../types';

export const ActivityModel = {
  add(action: string, entityType: ActivityDoc['entityType'], entityTitle: string, adminEmail: string): ActivityDoc {
    const newAct: ActivityDoc = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      entityType,
      entityTitle,
      adminEmail,
      timestamp: new Date().toISOString(),
    };

    const db = CMSStore.get();
    db.activities.unshift(newAct);
    if (db.activities.length > 50) {
      db.activities = db.activities.slice(0, 50);
    }
    CMSStore.save(db);
    return newAct;
  },

  getRecent(limit: number = 10): ActivityDoc[] {
    const db = CMSStore.get();
    return (db.activities || []).slice(0, limit);
  },
};
