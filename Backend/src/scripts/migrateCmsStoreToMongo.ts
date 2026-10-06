import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { ENV } from '../config/env';
import { connectMongoDB } from '../config/mongodb';
import { AdminUserMongoose } from '../models/AdminUser.model';
import { BlogMongoose } from '../models/blog.model';
import { ProjectMongoose } from '../models/project.model';
import { StoryMongoose } from '../models/story.model';
import { LifeAtRequinMongoose } from '../models/lifeAtRequin.model';
import { MediaMongoose } from '../models/media.model';
import { CMSDatabase } from '../types';

interface MigrationStats {
  module: string;
  inserted: number;
  skipped: number;
}

export async function runMigration(): Promise<void> {
  console.log('==================================================');
  console.log('🍃 Starting CMS Store to MongoDB Atlas Migration');
  console.log('==================================================');

  // 1. Establish MongoDB Connection
  await connectMongoDB();
  console.log(`📡 MongoDB connection: SUCCESS (Database: ${mongoose.connection.name})`);

  // 2. Locate and Read cms_store.json
  const storePath = path.join(ENV.DATA_DIR, 'cms_store.json');
  if (!fs.existsSync(storePath)) {
    throw new Error(`❌ Source file not found: ${storePath}`);
  }

  const rawData = fs.readFileSync(storePath, 'utf-8');
  const cmsData: CMSDatabase = JSON.parse(rawData);
  console.log(`📁 Source file: ${path.relative(process.cwd(), storePath)} (Read successfully)`);
  console.log('--------------------------------------------------');

  const stats: MigrationStats[] = [];

  // --------------------------------------------------------------------------
  // 1. Migrate Admin Users
  // --------------------------------------------------------------------------
  let adminInserted = 0;
  let adminSkipped = 0;
  const adminUsers = cmsData.adminUsers || [];

  for (const user of adminUsers) {
    try {
      const existing = await AdminUserMongoose.findOne({
        $or: [{ id: user.id }, { email: user.email.toLowerCase() }, { username: user.username.toLowerCase() }],
      });

      if (existing) {
        adminSkipped++;
        continue;
      }

      // Password handling: preserve bcrypt hash, or hash if plaintext
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
      adminInserted++;
    } catch (err: any) {
      console.error(`❌ Validation error in AdminUser [ID: ${user.id}, Email: ${user.email}]:`, err.message);
      throw err;
    }
  }
  stats.push({ module: 'Admin Users', inserted: adminInserted, skipped: adminSkipped });

  // --------------------------------------------------------------------------
  // 2. Migrate Blogs
  // --------------------------------------------------------------------------
  let blogsInserted = 0;
  let blogsSkipped = 0;
  const blogs = cmsData.blogs || [];

  for (const blog of blogs) {
    try {
      const existing = await BlogMongoose.findOne({
        $or: [{ id: blog.id }, { slug: blog.slug.toLowerCase() }],
      });

      if (existing) {
        blogsSkipped++;
        continue;
      }

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
        status: blog.status || 'DRAFT',
        createdAt: blog.createdAt || new Date().toISOString(),
        updatedAt: blog.updatedAt || new Date().toISOString(),
      });
      blogsInserted++;
    } catch (err: any) {
      console.error(`❌ Validation error in Blog [ID: ${blog.id}, Slug: ${blog.slug}]:`, err.message);
      throw err;
    }
  }
  stats.push({ module: 'Blogs', inserted: blogsInserted, skipped: blogsSkipped });

  // --------------------------------------------------------------------------
  // 3. Migrate Projects
  // --------------------------------------------------------------------------
  let projInserted = 0;
  let projSkipped = 0;
  const projects = cmsData.projects || [];

  for (const proj of projects) {
    try {
      const existing = await ProjectMongoose.findOne({
        $or: [{ id: proj.id }, { slug: proj.slug.toLowerCase() }],
      });

      if (existing) {
        projSkipped++;
        continue;
      }

      await ProjectMongoose.create({
        id: proj.id,
        projectName: proj.projectName.trim(),
        slug: proj.slug.toLowerCase().trim(),
        shortDescription: proj.shortDescription || '',
        fullDescription: proj.fullDescription || '',
        featuredImage: proj.featuredImage || '',
        galleryImages: Array.isArray(proj.galleryImages) ? proj.galleryImages : [],
        category: proj.category || 'Enterprise Software',
        technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
        projectUrl: proj.projectUrl || '',
        clientName: proj.clientName || '',
        status: proj.status || 'PUBLISHED',
        displayOrder: typeof proj.displayOrder === 'number' ? proj.displayOrder : 0,
        createdAt: proj.createdAt || new Date().toISOString(),
        updatedAt: proj.updatedAt || new Date().toISOString(),
      });
      projInserted++;
    } catch (err: any) {
      console.error(`❌ Validation error in Project [ID: ${proj.id}, Slug: ${proj.slug}]:`, err.message);
      throw err;
    }
  }
  stats.push({ module: 'Projects', inserted: projInserted, skipped: projSkipped });

  // --------------------------------------------------------------------------
  // 4. Migrate Stories
  // --------------------------------------------------------------------------
  let storyInserted = 0;
  let storySkipped = 0;
  const stories = cmsData.stories || [];

  for (const story of stories) {
    try {
      const existing = await StoryMongoose.findOne({ id: story.id });

      if (existing) {
        storySkipped++;
        continue;
      }

      await StoryMongoose.create({
        id: story.id,
        title: story.title.trim(),
        description: story.description || '',
        year: String(story.year).trim(),
        image: story.image || '',
        galleryImages: Array.isArray(story.galleryImages) ? story.galleryImages : [],
        storyContent: story.storyContent || '',
        displayOrder: typeof story.displayOrder === 'number' ? story.displayOrder : 0,
        status: story.status || 'PUBLISHED',
        createdAt: story.createdAt || new Date().toISOString(),
        updatedAt: story.updatedAt || new Date().toISOString(),
      });
      storyInserted++;
    } catch (err: any) {
      console.error(`❌ Validation error in Story [ID: ${story.id}]:`, err.message);
      throw err;
    }
  }
  stats.push({ module: 'Stories', inserted: storyInserted, skipped: storySkipped });

  // --------------------------------------------------------------------------
  // 5. Migrate Life at Requin
  // --------------------------------------------------------------------------
  let lifeInserted = 0;
  let lifeSkipped = 0;
  const lifeAtRequin = cmsData.lifeAtRequin || [];

  for (const gallery of lifeAtRequin) {
    try {
      const existing = await LifeAtRequinMongoose.findOne({ id: gallery.id });

      if (existing) {
        lifeSkipped++;
        continue;
      }

      const photos = Array.isArray(gallery.photos)
        ? gallery.photos.map((p) => ({
            id: p.id,
            image: p.image || '',
            year: p.year ? String(p.year) : '',
            title: p.title || '',
            caption: p.caption || '',
          }))
        : [];

      await LifeAtRequinMongoose.create({
        id: gallery.id,
        title: gallery.title.trim(),
        category: gallery.category.trim(),
        image: gallery.image || '',
        caption: gallery.caption || '',
        date: gallery.date || '',
        photoCount: typeof gallery.photoCount === 'number' ? gallery.photoCount : photos.length,
        years: Array.isArray(gallery.years) ? gallery.years.map(String) : [],
        photos,
        displayOrder: typeof gallery.displayOrder === 'number' ? gallery.displayOrder : 0,
        status: gallery.status || 'PUBLISHED',
        createdAt: gallery.createdAt || new Date().toISOString(),
        updatedAt: gallery.updatedAt || new Date().toISOString(),
      });
      lifeInserted++;
    } catch (err: any) {
      console.error(`❌ Validation error in LifeAtRequin [ID: ${gallery.id}]:`, err.message);
      throw err;
    }
  }
  stats.push({ module: 'Life at Requin', inserted: lifeInserted, skipped: lifeSkipped });

  // --------------------------------------------------------------------------
  // 6. Migrate Media
  // --------------------------------------------------------------------------
  let mediaInserted = 0;
  let mediaSkipped = 0;
  const mediaList = cmsData.media || [];

  for (const media of mediaList) {
    try {
      const existing = await MediaMongoose.findOne({
        $or: [{ id: media.id }, { fileName: media.fileName }],
      });

      if (existing) {
        mediaSkipped++;
        continue;
      }

      await MediaMongoose.create({
        id: media.id,
        fileName: media.fileName.trim(),
        originalName: media.originalName ? media.originalName.trim() : media.fileName.trim(),
        url: media.url.trim(),
        mimeType: media.mimeType || 'application/octet-stream',
        size: typeof media.size === 'number' ? media.size : 0,
        dimensions: media.dimensions || undefined,
        createdAt: media.createdAt || new Date().toISOString(),
        updatedAt: media.updatedAt || new Date().toISOString(),
      });
      mediaInserted++;
    } catch (err: any) {
      console.error(`❌ Validation error in Media [ID: ${media.id}, File: ${media.fileName}]:`, err.message);
      throw err;
    }
  }
  stats.push({ module: 'Media', inserted: mediaInserted, skipped: mediaSkipped });

  // --------------------------------------------------------------------------
  // Summary Output
  // --------------------------------------------------------------------------
  console.log('--------------------------------------------------');
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const s of stats) {
    console.log(`${s.module.padEnd(16)}: ${s.inserted} inserted, ${s.skipped} skipped`);
    totalInserted += s.inserted;
    totalSkipped += s.skipped;
  }

  console.log('--------------------------------------------------');
  console.log(`Total Inserted : ${totalInserted}`);
  console.log(`Total Skipped  : ${totalSkipped}`);
  console.log('Migration completed: SUCCESS');
  console.log('==================================================');

  await mongoose.disconnect();
}

// Allow CLI execution
if (process.argv[1] && (process.argv[1].endsWith('migrateCmsStoreToMongo.ts') || process.argv[1].endsWith('migrateCmsStoreToMongo.js'))) {
  runMigration()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Migration failed with fatal error:', err);
      process.exit(1);
    });
}
