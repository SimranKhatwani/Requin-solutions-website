import mongoose from 'mongoose';
import { Readable } from 'stream';
import { MediaModel, MediaMongoose } from '../models/media.model';
import { ActivityModel } from '../models/activity.model';
import { ProjectMongoose } from '../models/project.model';
import { BlogMongoose } from '../models/blog.model';
import { StoryMongoose } from '../models/story.model';
import { LifeAtRequinMongoose } from '../models/lifeAtRequin.model';
import { TestimonialModel } from '../models/testimonial.model';
import { MediaDoc } from '../types';

/**
 * Returns the GridFSBucket instance using the existing MongoDB connection.
 * Utilizes standard MongoDB collections: fs.files and fs.chunks.
 */
export function getGridFSBucket(): mongoose.mongo.GridFSBucket {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection is not ready. GridFS requires an active MongoDB connection.');
  }
  return new mongoose.mongo.GridFSBucket(db, {
    bucketName: 'fs',
  });
}

export interface GridFSUploadResult {
  id: string;
  fileName: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export const GridFSService = {
  /**
   * Uploads an image buffer directly into MongoDB GridFS (fs.files & fs.chunks).
   */
  async uploadImage(
    file: Express.Multer.File,
    adminEmail: string,
    module: string = 'general'
  ): Promise<GridFSUploadResult> {
    const bucket = getGridFSBucket();

    // 1. Deduplication Check: Check if an identical file (originalName + size) already exists
    try {
      const existing = await MediaMongoose.findOne({
        $or: [
          { originalName: file.originalname, size: file.size },
          { fileName: file.originalname, size: file.size },
        ],
      }).lean();

      if (existing) {
        // Verify the binary still exists in GridFS
        let existsInGridFS = false;
        if (mongoose.Types.ObjectId.isValid(existing.id)) {
          const files = await bucket
            .find({ _id: new mongoose.Types.ObjectId(existing.id) })
            .limit(1)
            .toArray();
          if (files && files.length > 0) {
            existsInGridFS = true;
          }
        }

        if (existsInGridFS) {
          // Re-use existing asset to prevent duplicates in Media Library and database bloat
          return {
            id: existing.id,
            fileName: existing.fileName,
            originalName: existing.originalName,
            url: existing.url,
            mimeType: existing.mimeType,
            size: existing.size,
            createdAt: (existing as any).createdAt
              ? (existing as any).createdAt.toString()
              : new Date().toISOString(),
          };
        }
      }
    } catch (checkErr) {
      console.warn('Warning checking media deduplication:', checkErr);
    }

    // Sanitize original filename and ensure unique storage name
    const timestamp = Date.now();
    const cleanOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const safeStorageName = `${timestamp}-${cleanOriginalName}`;

    return new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(safeStorageName, {
        contentType: file.mimetype,
        metadata: {
          originalName: file.originalname,
          contentType: file.mimetype,
          uploadedBy: adminEmail,
          module: module,
          size: file.size,
          uploadDate: new Date().toISOString(),
        },
      } as any);

      const readableStream = Readable.from(file.buffer);

      uploadStream.on('error', (err) => {
        console.error('GridFS upload stream error:', err);
        reject(err);
      });

      uploadStream.on('finish', async () => {
        try {
          const fileId = uploadStream.id.toString();
          const mediaUrl = `/api/media/${fileId}`;

          const mediaDoc: MediaDoc = {
            id: fileId,
            fileName: safeStorageName,
            originalName: file.originalname,
            url: mediaUrl,
            mimeType: file.mimetype,
            size: file.size,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          // Save tracking record in MediaModel for Admin Media library
          await MediaModel.create(mediaDoc).catch((err) => {
            console.warn('Warning: Could not create MediaModel record for GridFS file:', err);
          });

          // Log admin activity
          try {
            ActivityModel.add(
              `Uploaded image "${file.originalname}" to GridFS`,
              'media',
              file.originalname,
              adminEmail
            );
          } catch {
            // Ignore activity logging failures
          }

          resolve({
            id: fileId,
            fileName: safeStorageName,
            originalName: file.originalname,
            url: mediaUrl,
            mimeType: file.mimetype,
            size: file.size,
            createdAt: mediaDoc.createdAt,
          });
        } catch (postUploadErr) {
          reject(postUploadErr);
        }
      });

      readableStream.pipe(uploadStream);
    });
  },

  /**
   * Finds a file in GridFS (fs.files) by ObjectId, fileName, or metadata id,
   * and opens a download stream from GridFS chunks (fs.chunks).
   */
  async getFileStream(
    idOrName: string
  ): Promise<{
    file: mongoose.mongo.GridFSFile;
    stream: mongoose.mongo.GridFSBucketReadStream;
  } | null> {
    const bucket = getGridFSBucket();

    let targetFile: mongoose.mongo.GridFSFile | null = null;

    // 1. Try finding by MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(idOrName) && idOrName.length === 24) {
      const files = await bucket
        .find({ _id: new mongoose.Types.ObjectId(idOrName) })
        .limit(1)
        .toArray();
      if (files && files.length > 0) {
        targetFile = files[0];
      }
    }

    // 2. Try finding by filename
    if (!targetFile) {
      const files = await bucket.find({ filename: idOrName }).limit(1).toArray();
      if (files && files.length > 0) {
        targetFile = files[0];
      }
    }

    // 3. Try finding by originalName in metadata
    if (!targetFile) {
      const files = await bucket
        .find({ 'metadata.originalName': idOrName })
        .sort({ uploadDate: -1 })
        .limit(1)
        .toArray();
      if (files && files.length > 0) {
        targetFile = files[0];
      }
    }

    if (!targetFile) {
      return null;
    }

    const stream = bucket.openDownloadStream(targetFile._id);
    return {
      file: targetFile,
      stream,
    };
  },

  /**
   * Checks if an image identifier/url is referenced in any content record.
   * Ensures data safety before deleting files from GridFS.
   */
  async isImageReferenced(
    idOrUrl: string
  ): Promise<{ isReferenced: boolean; referencedIn?: string }> {
    const id = idOrUrl.replace(/^\/api\/media\//, '');
    const searchPatterns = [idOrUrl, id, `/api/media/${id}`];
    const regexPattern = new RegExp(searchPatterns.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');

    try {
      // Check Projects
      const projectMatch = await ProjectMongoose.findOne({
        $or: [
          { featuredImage: { $regex: regexPattern } },
          { galleryImages: { $in: [regexPattern] } },
        ],
      }).lean();
      if (projectMatch) {
        return { isReferenced: true, referencedIn: `Project: ${projectMatch.projectName}` };
      }

      // Check Blogs
      const blogMatch = await BlogMongoose.findOne({
        $or: [
          { featuredImage: { $regex: regexPattern } },
          { image: { $regex: regexPattern } },
          { content: { $regex: regexPattern } },
        ],
      }).lean();
      if (blogMatch) {
        return { isReferenced: true, referencedIn: `Blog: ${blogMatch.title}` };
      }

      // Check Stories
      const storyMatch = await StoryMongoose.findOne({
        $or: [
          { image: { $regex: regexPattern } },
          { galleryImages: { $in: [regexPattern] } },
        ],
      }).lean();
      if (storyMatch) {
        return { isReferenced: true, referencedIn: `Story: ${storyMatch.title}` };
      }

      // Check Life at Requin
      const lifeMatch = await LifeAtRequinMongoose.findOne({
        $or: [
          { image: { $regex: regexPattern } },
          { 'photos.image': { $regex: regexPattern } },
        ],
      }).lean();
      if (lifeMatch) {
        return { isReferenced: true, referencedIn: `Life at Requin: ${lifeMatch.title}` };
      }

      // Check Testimonials
      const testimonials = TestimonialModel.findAll();
      const testimonialMatch = testimonials.find((t) =>
        searchPatterns.some((pattern) => t.image?.includes(pattern))
      );
      if (testimonialMatch) {
        return { isReferenced: true, referencedIn: `Testimonial: ${testimonialMatch.name}` };
      }

      return { isReferenced: false };
    } catch (err) {
      console.warn('Error checking image references:', err);
      return { isReferenced: false };
    }
  },

  /**
   * Deletes an image from GridFS (fs.files and fs.chunks) with reference safety check.
   */
  async deleteImage(
    idOrName: string,
    adminEmail: string
  ): Promise<{ success: boolean; message?: string; error?: string; status?: number }> {
    const bucket = getGridFSBucket();

    let targetFile: mongoose.mongo.GridFSFile | null = null;
    let targetObjectId: mongoose.Types.ObjectId | null = null;

    if (mongoose.Types.ObjectId.isValid(idOrName) && idOrName.length === 24) {
      targetObjectId = new mongoose.Types.ObjectId(idOrName);
      const files = await bucket.find({ _id: targetObjectId }).limit(1).toArray();
      if (files && files.length > 0) {
        targetFile = files[0];
      }
    }

    if (!targetFile) {
      const files = await bucket.find({ filename: idOrName }).limit(1).toArray();
      if (files && files.length > 0) {
        targetFile = files[0];
        targetObjectId = files[0]._id;
      }
    }

    // Also check MediaModel if not found directly
    if (!targetFile) {
      const mediaItem = await MediaModel.findById(idOrName);
      if (mediaItem) {
        const fileId = mediaItem.id || mediaItem.fileName;
        if (mongoose.Types.ObjectId.isValid(fileId)) {
          targetObjectId = new mongoose.Types.ObjectId(fileId);
          const files = await bucket.find({ _id: targetObjectId }).limit(1).toArray();
          if (files && files.length > 0) {
            targetFile = files[0];
          }
        }
      }
    }

    // Safety check: is this image referenced anywhere?
    const refCheck = await this.isImageReferenced(idOrName);
    if (refCheck.isReferenced) {
      return {
        success: false,
        error: `Cannot delete image: It is currently referenced in ${refCheck.referencedIn}. Please remove or replace the image in that record before deleting.`,
        status: 409,
      };
    }

    if (targetObjectId) {
      try {
        await bucket.delete(targetObjectId);
      } catch (err: any) {
        console.warn(`GridFS bucket.delete warning for ID ${targetObjectId}:`, err?.message);
      }
    }

    // Clean up MediaModel record
    await MediaModel.delete(idOrName).catch(() => {});
    if (targetObjectId) {
      await MediaModel.delete(targetObjectId.toString()).catch(() => {});
    }

    ActivityModel.add(
      `Deleted media file (${targetFile ? targetFile.filename : idOrName})`,
      'media',
      targetFile ? targetFile.filename : idOrName,
      adminEmail
    );

    return {
      success: true,
      message: 'Image deleted successfully from MongoDB GridFS.',
    };
  },

  /**
   * Identifies all duplicate media files, consolidates references in Blogs, LifeAtRequin,
   * Projects, and Stories to canonical IDs, and cleans up redundant duplicates from GridFS.
   */
  async deduplicateMedia(adminEmail: string = 'admin@requingroup.com'): Promise<{
    duplicateGroupsCount: number;
    deletedCount: number;
    repointedCount: number;
  }> {
    const bucket = getGridFSBucket();
    const allMedia = await MediaMongoose.find().lean();
    const blogs = await BlogMongoose.find();
    const life = await LifeAtRequinMongoose.find();
    const projects = await ProjectMongoose.find();
    const stories = await StoryMongoose.find();

    const groups: Record<string, typeof allMedia> = {};
    allMedia.forEach((m) => {
      const key = (m.originalName || m.fileName) + '___' + m.size;
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });

    const duplicateGroups = Object.entries(groups).filter(([_, list]) => list.length > 1);
    let deletedCount = 0;
    let repointedCount = 0;

    for (const [_, items] of duplicateGroups) {
      items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      // Count references for each item
      const refCounts: Record<string, number> = {};
      for (const item of items) {
        let count = 0;
        blogs.forEach((b) => {
          if (b.featuredImage?.includes(item.id)) count++;
          if (b.content?.includes(item.id)) count++;
        });
        life.forEach((l) => {
          if (l.image?.includes(item.id)) count++;
          if (l.photos?.some((p) => p.image?.includes(item.id))) count++;
        });
        projects.forEach((p) => {
          if (p.featuredImage?.includes(item.id)) count++;
          if (p.galleryImages?.some((img) => img.includes(item.id))) count++;
        });
        stories.forEach((s) => {
          if (s.image?.includes(item.id)) count++;
          if (s.galleryImages?.some((img) => img.includes(item.id))) count++;
        });
        refCounts[item.id] = count;
      }

      let canonical = items[0];
      const withRefs = items.find((m) => refCounts[m.id] > 0);
      if (withRefs) canonical = withRefs;

      const duplicatesToDelete = items.filter((m) => m.id !== canonical.id);

      for (const dup of duplicatesToDelete) {
        // Re-point blogs
        for (const b of blogs) {
          let changed = false;
          let feat = b.featuredImage;
          let content = b.content;
          if (feat && feat.includes(dup.id)) {
            feat = feat.replace(new RegExp(dup.id, 'g'), canonical.id);
            changed = true;
          }
          if (content && content.includes(dup.id)) {
            content = content.replace(new RegExp(dup.id, 'g'), canonical.id);
            changed = true;
          }
          if (changed) {
            b.featuredImage = feat;
            b.content = content;
            await b.save();
            repointedCount++;
          }
        }

        // Re-point lifeatrequin
        for (const l of life) {
          let changed = false;
          let img = l.image;
          let photos = l.photos || [];

          if (img && img.includes(dup.id)) {
            img = img.replace(new RegExp(dup.id, 'g'), canonical.id);
            changed = true;
          }
          photos = photos.map((p) => {
            if (p.image && p.image.includes(dup.id)) {
              changed = true;
              return { ...p, image: p.image.replace(new RegExp(dup.id, 'g'), canonical.id) };
            }
            return p;
          });

          if (changed) {
            l.image = img;
            l.photos = photos;
            await l.save();
            repointedCount++;
          }
        }

        // Re-point projects
        for (const p of projects) {
          let changed = false;
          let feat = p.featuredImage;
          let gal = p.galleryImages || [];
          if (feat && feat.includes(dup.id)) {
            feat = feat.replace(new RegExp(dup.id, 'g'), canonical.id);
            changed = true;
          }
          gal = gal.map((g) => {
            if (g.includes(dup.id)) {
              changed = true;
              return g.replace(new RegExp(dup.id, 'g'), canonical.id);
            }
            return g;
          });
          if (changed) {
            p.featuredImage = feat;
            p.galleryImages = gal;
            await p.save();
            repointedCount++;
          }
        }

        // Re-point stories
        for (const s of stories) {
          let changed = false;
          let img = s.image;
          let gal = s.galleryImages || [];
          if (img && img.includes(dup.id)) {
            img = img.replace(new RegExp(dup.id, 'g'), canonical.id);
            changed = true;
          }
          gal = gal.map((g) => {
            if (g.includes(dup.id)) {
              changed = true;
              return g.replace(new RegExp(dup.id, 'g'), canonical.id);
            }
            return g;
          });
          if (changed) {
            s.image = img;
            s.galleryImages = gal;
            await s.save();
            repointedCount++;
          }
        }

        // Delete duplicate records and GridFS chunks
        await MediaMongoose.deleteOne({ id: dup.id });
        if (mongoose.Types.ObjectId.isValid(dup.id)) {
          try {
            await bucket.delete(new mongoose.Types.ObjectId(dup.id));
          } catch {}
        }
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      ActivityModel.add(
        `Consolidated media library (purged ${deletedCount} duplicate assets)`,
        'media',
        'Media Deduplication Tool',
        adminEmail
      );
    }

    return {
      duplicateGroupsCount: duplicateGroups.length,
      deletedCount,
      repointedCount,
    };
  },
};
