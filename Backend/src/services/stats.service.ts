import { CMSStore } from '../config/db';
import { ActivityModel } from '../models/activity.model';

export const StatsService = {
  getStats() {
    const db = CMSStore.get();
    const totalBlogs = db.blogs.length;
    const publishedBlogs = db.blogs.filter((b) => b.status === 'PUBLISHED').length;
    const draftBlogs = totalBlogs - publishedBlogs;

    const totalProjects = db.projects.length;
    const publishedProjects = db.projects.filter((p) => p.status === 'PUBLISHED').length;

    const totalStories = db.stories.length;
    const publishedStories = db.stories.filter((s) => s.status === 'PUBLISHED').length;

    const totalMedia = db.media.length;

    const totalCareers = (db.careers || []).length;
    const publishedCareers = (db.careers || []).filter((c) => c.status === 'PUBLISHED').length;
    const draftCareers = totalCareers - publishedCareers;
    const totalApplications = (db.jobApplications || []).length;

    const totalLifeAtRequin = (db.lifeAtRequin || []).length;
    const publishedLifeAtRequin = (db.lifeAtRequin || []).filter((g) => g.status === 'PUBLISHED').length;

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
