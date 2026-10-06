import { Router } from 'express';
import { StoryController } from '../controllers/story.controller';
import { requireAdminAuth } from '../middleware/auth.middleware';

export const storyRouter = Router();

// Public
storyRouter.get('/stories', StoryController.getPublishedStories);

// Admin
storyRouter.get('/admin/stories', requireAdminAuth, StoryController.getAllAdminStories);
storyRouter.post('/admin/stories', requireAdminAuth, StoryController.createStory);
storyRouter.put('/admin/stories/:id', requireAdminAuth, StoryController.updateStory);
storyRouter.patch('/admin/stories/:id/publish', requireAdminAuth, StoryController.togglePublishStory);
storyRouter.delete('/admin/stories/:id', requireAdminAuth, StoryController.deleteStory);
