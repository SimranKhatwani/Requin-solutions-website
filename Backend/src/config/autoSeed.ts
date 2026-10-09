import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { ENV } from './env';
import { AdminUserMongoose } from '../models/AdminUser.model';
import { BlogMongoose } from '../models/blog.model';
import { ProjectMongoose } from '../models/project.model';
import { StoryMongoose } from '../models/story.model';
import { LifeAtRequinMongoose } from '../models/lifeAtRequin.model';
import { MediaMongoose } from '../models/media.model';
import { CMSDatabase } from '../types';

export async function autoSeedDatabase(): Promise<void> {
  try {
    const storePath = path.join(ENV.DATA_DIR, 'cms_store.json');
    if (!fs.existsSync(storePath)) {
      return;
    }

    const rawData = fs.readFileSync(storePath, 'utf-8');
    const cmsData: CMSDatabase = JSON.parse(rawData);

    // 1. Admin Users
    const adminUsers = cmsData.adminUsers || [];
    for (const user of adminUsers) {
      const existing = await AdminUserMongoose.findOne({
        $or: [{ id: user.id }, { email: user.email.toLowerCase() }, { username: user.username.toLowerCase() }],
      });

      if (!existing) {
        let finalHash = user.passwordHash;
        const isBcrypt = typeof finalHash === 'string' && (finalHash.startsWith('$2a$') || finalHash.startsWith('$2b$'));
        if (!isBcrypt) {
          const salt = bcrypt.genSaltSync(10);
          finalHash = bcrypt.hashSync(finalHash || 'Admin@Requin2026!', salt);
        }

        await AdminUserMongoose.create({
          id: user.id,
          email: user.email.toLowerCase().trim(),
          username: user.username.toLowerCase().trim(),
          passwordHash: finalHash,
          name: user.name.trim(),
          role: user.role || 'superadmin',
          createdAt: user.createdAt || new Date().toISOString(),
          updatedAt: user.updatedAt || new Date().toISOString(),
        });
      }
    }

    // 2. Blogs
    const blogs = cmsData.blogs || [];
    let blogsAdded = 0;
    for (const blog of blogs) {
      const existing = await BlogMongoose.findOne({
        $or: [{ id: blog.id }, { slug: blog.slug.toLowerCase().trim() }],
      });

      if (!existing) {
        await BlogMongoose.create({
          id: blog.id,
          title: blog.title.trim(),
          slug: blog.slug.toLowerCase().trim(),
          shortDescription: blog.shortDescription || '',
          content: blog.content || '',
          featuredImage: blog.featuredImage || '',
          author: blog.author || 'Requin Team',
          category: blog.category || 'General',
          tags: Array.isArray(blog.tags) ? blog.tags : [],
          publishedDate: blog.publishedDate || new Date().toISOString(),
          status: blog.status || 'PUBLISHED',
          createdAt: blog.createdAt || new Date().toISOString(),
          updatedAt: blog.updatedAt || new Date().toISOString(),
        });
        blogsAdded++;
      }
    }

    // 3. Projects
    const projects = cmsData.projects || [];
    for (const proj of projects) {
      const existing = await ProjectMongoose.findOne({
        $or: [{ id: proj.id }, { slug: proj.slug.toLowerCase().trim() }],
      });

      if (!existing) {
        await ProjectMongoose.create({
          id: proj.id,
          projectName: proj.projectName.trim(),
          slug: proj.slug.toLowerCase().trim(),
          shortDescription: proj.shortDescription || '',
          fullDescription: proj.fullDescription || '',
          featuredImage: proj.featuredImage || '',
          galleryImages: Array.isArray(proj.galleryImages) ? proj.galleryImages : [],
          category: proj.category || 'General',
          technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
          projectUrl: proj.projectUrl || '',
          clientName: proj.clientName || '',
          status: proj.status || 'PUBLISHED',
          displayOrder: typeof proj.displayOrder === 'number' ? proj.displayOrder : 0,
          createdAt: proj.createdAt || new Date().toISOString(),
          updatedAt: proj.updatedAt || new Date().toISOString(),
        });
      }
    }

    // 4. Stories
    const stories = cmsData.stories || [];
    for (const story of stories) {
      const existing = await StoryMongoose.findOne({ id: story.id });
      if (!existing) {
        await StoryMongoose.create({
          id: story.id,
          title: story.title.trim(),
          description: story.description || '',
          year: story.year || new Date().getFullYear().toString(),
          image: story.image || '',
          galleryImages: Array.isArray(story.galleryImages) ? story.galleryImages : [],
          storyContent: story.storyContent || '',
          displayOrder: typeof story.displayOrder === 'number' ? story.displayOrder : 0,
          status: story.status || 'PUBLISHED',
          createdAt: story.createdAt || new Date().toISOString(),
          updatedAt: story.updatedAt || new Date().toISOString(),
        });
      }
    }

    // 5. Life At Requin
    const lifeItems = cmsData.lifeAtRequin || [];
    for (const item of lifeItems) {
      const existing = await LifeAtRequinMongoose.findOne({ id: item.id });
      if (!existing) {
        await LifeAtRequinMongoose.create({
          id: item.id,
          title: item.title.trim(),
          category: item.category || 'Culture',
          image: item.image || '',
          caption: item.caption || '',
          date: item.date || new Date().toISOString(),
          photoCount: typeof item.photoCount === 'number' ? item.photoCount : 0,
          years: Array.isArray(item.years) ? item.years : [],
          photos: Array.isArray(item.photos) ? item.photos : [],
          displayOrder: typeof item.displayOrder === 'number' ? item.displayOrder : 0,
          status: item.status || 'PUBLISHED',
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: item.updatedAt || new Date().toISOString(),
        });
      }
    }

    // 6. Media
    const mediaItems = cmsData.media || [];
    for (const media of mediaItems) {
      const existing = await MediaMongoose.findOne({ id: media.id });
      if (!existing) {
        await MediaMongoose.create({
          id: media.id,
          fileName: media.fileName.trim(),
          originalName: media.originalName || media.fileName,
          url: media.url.trim(),
          mimeType: media.mimeType || 'application/octet-stream',
          size: typeof media.size === 'number' ? media.size : 0,
          dimensions: media.dimensions || undefined,
          createdAt: media.createdAt || new Date().toISOString(),
          updatedAt: media.updatedAt || new Date().toISOString(),
        });
      }
    }

    const totalBlogs = await BlogMongoose.countDocuments();
    if (blogsAdded > 0) {
      console.log(`🍃 Auto-seeded ${blogsAdded} missing blogs into MongoDB Atlas.`);
    }
    console.log(`📑 Total blogs verified in MongoDB Atlas: ${totalBlogs}`);
  } catch (err) {
    console.warn('⚠️ Warning during database auto-seed:', err);
  }
}
