import { CMSStore } from '../config/db';
import { ActivityModel } from '../models/activity.model';
import { BlogMongoose } from '../models/blog.model';
import { ProjectMongoose } from '../models/project.model';
import { StoryMongoose } from '../models/story.model';
import { MediaMongoose } from '../models/media.model';
import { LifeAtRequinMongoose } from '../models/lifeAtRequin.model';

export const StatsService = {
  async getStats() {
    // 1. Migrated MongoDB modules
    const [
      totalBlogs,
      publishedBlogs,
      totalProjects,
      publishedProjects,
      totalStories,
      publishedStories,
      totalMedia,
      totalLifeAtRequin,
      publishedLifeAtRequin,
    ] = await Promise.all([
      BlogMongoose.countDocuments(),
      BlogMongoose.countDocuments({ status: 'PUBLISHED' }),
      ProjectMongoose.countDocuments(),
      ProjectMongoose.countDocuments({ status: 'PUBLISHED' }),
      StoryMongoose.countDocuments(),
      StoryMongoose.countDocuments({ status: 'PUBLISHED' }),
      MediaMongoose.countDocuments(),
      LifeAtRequinMongoose.countDocuments(),
      LifeAtRequinMongoose.countDocuments({ status: 'PUBLISHED' }),
    ]);

    const draftBlogs = totalBlogs - publishedBlogs;

    // 2. Non-migrated CMSStore modules
    const db = CMSStore.get();
    const totalCareers = (db.careers || []).length;
    const publishedCareers = (db.careers || []).filter((c) => c.status === 'PUBLISHED').length;
    const draftCareers = totalCareers - publishedCareers;
    const totalApplications = (db.jobApplications || []).length;

    const recentActivity = ActivityModel.getRecent(10);

    return {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalProjects,
      publishedProjects,
      totalStories,
      publishedStories,
      totalMedia,
      totalCareers,
      publishedCareers,
      draftCareers,
      totalApplications,
      totalLifeAtRequin,
      publishedLifeAtRequin,
      recentActivity,
    };
  },
};
