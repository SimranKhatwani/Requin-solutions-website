import { LifeAtRequinModel } from '../models/lifeAtRequin.model';
import { ActivityModel } from '../models/activity.model';
import { LifeAtRequinDoc } from '../types';

export const LifeAtRequinService = {
  async getPublished(): Promise<LifeAtRequinDoc[]> {
    return await LifeAtRequinModel.findPublished();
  },

  async getAll(): Promise<LifeAtRequinDoc[]> {
    return await LifeAtRequinModel.findAll();
  },

  async create(data: Partial<LifeAtRequinDoc>, adminEmail: string): Promise<LifeAtRequinDoc | { error: string; status: number }> {
    const { title, category, image, caption, date, photoCount, years, photos, displayOrder, status } = data;

    if (!title || !category || !image) {
      return { error: 'Title, category, and cover image are required.', status: 400 };
    }

    const allGalleries = await LifeAtRequinModel.findAll();
    const safePhotos = Array.isArray(photos) ? photos : [];
    const safeYears = Array.isArray(years) && years.length > 0
      ? years
      : Array.from(new Set(safePhotos.map((p: any) => p.year).filter(Boolean)));

    const newGallery: LifeAtRequinDoc = {
      id: `g-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      image,
      caption: caption || '',
      date: date || 'Annual Showcase',
      photoCount: typeof photoCount === 'number' ? photoCount : (safePhotos.length || 1),
      years: safeYears.length > 0 ? safeYears : ['2024'],
      photos: safePhotos.map((p: any, idx: number) => ({
        id: p.id || `photo-${Date.now()}-${idx}`,
        image: p.image || image,
        year: p.year || '2024',
        title: p.title || title,
        caption: p.caption || '',
      })),
      displayOrder: typeof displayOrder === 'number' ? displayOrder : allGalleries.length + 1,
      status: status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const created = await LifeAtRequinModel.create(newGallery);
    ActivityModel.add(`Created Life at Requin gallery "${newGallery.title}"`, 'lifeAtRequin', newGallery.title, adminEmail);
    return created;
  },

  async update(id: string, data: Partial<LifeAtRequinDoc>, adminEmail: string): Promise<LifeAtRequinDoc | { error: string; status: number }> {
    const prev = await LifeAtRequinModel.findById(id);
    if (!prev) {
      return { error: 'Life at Requin gallery not found.', status: 404 };
    }

    const { title, category, image, caption, date, photoCount, years, photos, displayOrder, status } = data;
    const safePhotos = Array.isArray(photos) ? photos : prev.photos;
    const safeYears = Array.isArray(years) && years.length > 0
      ? years
      : Array.from(new Set(safePhotos.map((p: any) => p.year).filter(Boolean)));

    const updated = await LifeAtRequinModel.update(id, {
      title: title ?? prev.title,
      category: category ?? prev.category,
      image: image ?? prev.image,
      caption: caption ?? prev.caption,
      date: date ?? prev.date,
      photoCount: typeof photoCount === 'number' ? photoCount : (safePhotos.length || prev.photoCount),
      years: safeYears.length > 0 ? safeYears : prev.years,
      photos: safePhotos.map((p: any, i: number) => ({
        id: p.id || `photo-${Date.now()}-${i}`,
        image: p.image || prev.image,
        year: p.year || '2024',
        title: p.title || prev.title,
        caption: p.caption || '',
      })),
      displayOrder: typeof displayOrder === 'number' ? displayOrder : prev.displayOrder,
      status: status ?? prev.status,
    });

    if (updated) {
      ActivityModel.add(`Updated Life at Requin gallery "${updated.title}"`, 'lifeAtRequin', updated.title, adminEmail);
      return updated;
    }

    return { error: 'Failed to update gallery.', status: 500 };
  },

  async togglePublish(id: string, adminEmail: string): Promise<LifeAtRequinDoc | { error: string; status: number }> {
    const prev = await LifeAtRequinModel.findById(id);
    if (!prev) {
      return { error: 'Gallery not found.', status: 404 };
    }

    const nextStatus = prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const updated = await LifeAtRequinModel.update(id, { status: nextStatus });
    if (updated) {
      ActivityModel.add(`Changed Life at Requin "${prev.title}" status to ${nextStatus}`, 'lifeAtRequin', prev.title, adminEmail);
      return updated;
    }
    return { error: 'Failed to toggle status.', status: 500 };
  },

  async delete(id: string, adminEmail: string): Promise<LifeAtRequinDoc | { error: string; status: number }> {
    const deleted = await LifeAtRequinModel.delete(id);
    if (!deleted) {
      return { error: 'Gallery not found.', status: 404 };
    }
    ActivityModel.add(`Deleted Life at Requin gallery "${deleted.title}"`, 'lifeAtRequin', deleted.title, adminEmail);
    return deleted;
  },
};
