import { StoryModel } from '../models/story.model';
import { ActivityModel } from '../models/activity.model';
import { StoryDoc } from '../types';

export const StoryService = {
  async getPublished(): Promise<StoryDoc[]> {
    return await StoryModel.findPublished();
  },

  async getAll(): Promise<StoryDoc[]> {
    return await StoryModel.findAll();
  },

  async create(data: Partial<StoryDoc>, adminEmail: string): Promise<StoryDoc | { error: string; status: number }> {
    const { title, description, year, image, galleryImages, storyContent, displayOrder, status } = data;

    if (!title || !description || !year) {
      return { error: 'Title, description, and year are required.', status: 400 };
    }

    const allStories = await StoryModel.findAll();
    const newStory: StoryDoc = {
      id: `story-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      year: String(year).trim(),
      image: image || '/images/requin_software_team_1790576614688.jpg',
      galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
      storyContent: storyContent || description,
      displayOrder: typeof displayOrder === 'number' ? displayOrder : allStories.length + 1,
      status: status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const created = await StoryModel.create(newStory);
    ActivityModel.add(`Created company milestone story "${newStory.title}"`, 'story', newStory.title, adminEmail);
    return created;
  },

  async update(id: string, data: Partial<StoryDoc>, adminEmail: string): Promise<StoryDoc | { error: string; status: number }> {
    const prev = await StoryModel.findById(id);
    if (!prev) {
      return { error: 'Story milestone not found.', status: 404 };
    }

    const { title, description, year, image, galleryImages, storyContent, displayOrder, status } = data;

    const updated = await StoryModel.update(id, {
      title: title ?? prev.title,
      description: description ?? prev.description,
      year: year ? String(year) : prev.year,
      image: image ?? prev.image,
      galleryImages: galleryImages ? (Array.isArray(galleryImages) ? galleryImages : []) : prev.galleryImages,
      storyContent: storyContent ?? prev.storyContent,
      displayOrder: typeof displayOrder === 'number' ? displayOrder : prev.displayOrder,
      status: status ?? prev.status,
    });

    if (updated) {
      ActivityModel.add(`Updated milestone story "${updated.title}"`, 'story', updated.title, adminEmail);
      return updated;
    }

    return { error: 'Failed to update story.', status: 500 };
  },

  async togglePublish(id: string, adminEmail: string): Promise<StoryDoc | { error: string; status: number }> {
    const prev = await StoryModel.findById(id);
    if (!prev) {
      return { error: 'Story not found.', status: 404 };
    }

    const nextStatus = prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const updated = await StoryModel.update(id, { status: nextStatus });
    if (updated) {
      ActivityModel.add(`Changed story "${prev.title}" status to ${nextStatus}`, 'story', prev.title, adminEmail);
      return updated;
    }
    return { error: 'Failed to toggle status.', status: 500 };
  },

  async delete(id: string, adminEmail: string): Promise<StoryDoc | { error: string; status: number }> {
    const deleted = await StoryModel.delete(id);
    if (!deleted) {
      return { error: 'Story milestone not found.', status: 404 };
    }
    ActivityModel.add(`Deleted milestone story "${deleted.title}"`, 'story', deleted.title, adminEmail);
    return deleted;
  },
};
