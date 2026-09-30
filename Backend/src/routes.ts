import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { CMSStore } from './db';
import { requireAdminAuth, generateToken, AuthenticatedRequest } from './auth';
import { BlogDoc, ProjectDoc, StoryDoc, MediaDoc } from './types';

export const apiRouter = express.Router();

// Configure Multer for Media Uploads
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (allowedMime.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Supported formats: JPG, PNG, WEBP, SVG, GIF'));
    }
  },
});

// ========================================================
// 1. PUBLIC APIS
// ========================================================

// Public: Get published blogs
apiRouter.get('/blogs', (req: Request, res: Response) => {
  const db = CMSStore.get();
  let blogs = db.blogs.filter((b) => b.status === 'PUBLISHED');

  const { category, search } = req.query;
  if (category && typeof category === 'string' && category !== 'All') {
    blogs = blogs.filter((b) => b.category.toLowerCase() === category.toLowerCase());
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    blogs = blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.shortDescription.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort newest first
  blogs.sort((a, b) => new Date(b.publishedDate || b.createdAt).getTime() - new Date(a.publishedDate || a.createdAt).getTime());

  res.json({ success: true, count: blogs.length, data: blogs });
});

// Public: Get single blog by slug
apiRouter.get('/blogs/:slug', (req: Request, res: Response) => {
  const db = CMSStore.get();
  const blog = db.blogs.find(
    (b) => b.slug === req.params.slug && b.status === 'PUBLISHED'
  );

  if (!blog) {
    res.status(404).json({ success: false, error: 'Blog not found or not published.' });
    return;
  }

  res.json({ success: true, data: blog });
});

// Public: Get published projects
apiRouter.get('/projects', (req: Request, res: Response) => {
  const db = CMSStore.get();
  let projects = db.projects.filter((p) => p.status === 'PUBLISHED');

  const { category } = req.query;
  if (category && typeof category === 'string' && category !== 'All') {
    projects = projects.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Sort by displayOrder ascending
  projects.sort((a, b) => a.displayOrder - b.displayOrder);

  res.json({ success: true, count: projects.length, data: projects });
});

// Public: Get single project by slug
apiRouter.get('/projects/:slug', (req: Request, res: Response) => {
  const db = CMSStore.get();
  const project = db.projects.find(
    (p) => p.slug === req.params.slug && p.status === 'PUBLISHED'
  );

  if (!project) {
    res.status(404).json({ success: false, error: 'Project not found or not published.' });
    return;
  }

  res.json({ success: true, data: project });
});

// Public: Get published stories
apiRouter.get('/stories', (_req: Request, res: Response) => {
  const db = CMSStore.get();
  const stories = db.stories
    .filter((s) => s.status === 'PUBLISHED')
    .sort((a, b) => a.displayOrder - b.displayOrder);

  res.json({ success: true, count: stories.length, data: stories });
});

// ========================================================
// 2. ADMIN AUTHENTICATION
// ========================================================

// Admin Login
apiRouter.post('/admin/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Please provide both email and password.' });
    return;
  }

  const db = CMSStore.get();
  const user = db.adminUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials. User does not exist.' });
    return;
  }

  const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!isValidPassword) {
    res.status(401).json({ error: 'Invalid credentials. Password incorrect.' });
    return;
  }

  const token = generateToken(user);
  CMSStore.addActivity('Admin logged in', 'auth', 'Successful authentication', user.email);

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      role: user.role,
    },
  });
});

// Admin Logout
apiRouter.post('/admin/auth/logout', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  if (req.adminUser) {
    CMSStore.addActivity('Admin logged out', 'auth', 'Session closed', req.adminUser.email);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Admin Profile / Current User
apiRouter.get('/admin/auth/me', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.adminUser!;
  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      role: user.role,
    },
  });
});

// Admin Change Password
apiRouter.put('/admin/auth/password', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    res.status(400).json({ error: 'New password must be at least 6 characters.' });
    return;
  }

  const db = CMSStore.get();
  const userIdx = db.adminUsers.findIndex((u) => u.id === req.adminUser!.id);
  if (userIdx === -1) {
    res.status(404).json({ error: 'Admin user not found.' });
    return;
  }

  const isValid = bcrypt.compareSync(currentPassword, db.adminUsers[userIdx].passwordHash);
  if (!isValid) {
    res.status(401).json({ error: 'Current password incorrect.' });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  db.adminUsers[userIdx].passwordHash = bcrypt.hashSync(newPassword, salt);
  db.adminUsers[userIdx].updatedAt = new Date().toISOString();
  CMSStore.save(db);

  CMSStore.addActivity('Admin password changed', 'auth', 'Security credential update', req.adminUser!.email);
  res.json({ success: true, message: 'Password updated successfully.' });
});

// ========================================================
// 3. ADMIN CMS STATS
// ========================================================

apiRouter.get('/admin/stats', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const totalBlogs = db.blogs.length;
  const publishedBlogs = db.blogs.filter((b) => b.status === 'PUBLISHED').length;
  const draftBlogs = totalBlogs - publishedBlogs;

  const totalProjects = db.projects.length;
  const publishedProjects = db.projects.filter((p) => p.status === 'PUBLISHED').length;

  const totalStories = db.stories.length;
  const publishedStories = db.stories.filter((s) => s.status === 'PUBLISHED').length;

  const totalMedia = db.media.length;

  res.json({
    success: true,
    data: {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalProjects,
      publishedProjects,
      totalStories,
      publishedStories,
      totalMedia,
      recentActivity: db.activities.slice(0, 10),
    },
  });
});

// ========================================================
// 4. ADMIN BLOG MANAGEMENT
// ========================================================

apiRouter.get('/admin/blogs', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const blogs = [...db.blogs].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  res.json({ success: true, data: blogs });
});

apiRouter.post('/admin/blogs', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const { title, slug, shortDescription, content, featuredImage, author, category, tags, status, publishedDate } = req.body;

  if (!title || !shortDescription) {
    res.status(400).json({ error: 'Title and short description are required.' });
    return;
  }

  const generatedSlug = (slug || title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  const db = CMSStore.get();
  const now = new Date().toISOString();
  const newBlog: BlogDoc = {
    id: `blog-${Date.now()}`,
    title,
    slug: generatedSlug,
    shortDescription,
    content: content || '',
    featuredImage: featuredImage || '/images/cloud_infrastructure_1790576629897.jpg',
    author: author || 'Requin Solutions',
    category: category || 'General',
    tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : [],
    publishedDate: publishedDate || now.split('T')[0],
    status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
    createdAt: now,
    updatedAt: now,
  };

  db.blogs.unshift(newBlog);
  CMSStore.save(db);
  CMSStore.addActivity(`Created blog "${title}"`, 'blog', title, req.adminUser!.email);

  res.status(201).json({ success: true, data: newBlog });
});

apiRouter.put('/admin/blogs/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.blogs.findIndex((b) => b.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Blog not found.' });
    return;
  }

  const prev = db.blogs[idx];
  const { title, slug, shortDescription, content, featuredImage, author, category, tags, status, publishedDate } = req.body;

  const now = new Date().toISOString();
  const updated: BlogDoc = {
    ...prev,
    title: title ?? prev.title,
    slug: slug ? slug.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : prev.slug,
    shortDescription: shortDescription ?? prev.shortDescription,
    content: content ?? prev.content,
    featuredImage: featuredImage ?? prev.featuredImage,
    author: author ?? prev.author,
    category: category ?? prev.category,
    tags: tags ? (Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : prev.tags) : prev.tags,
    status: status ?? prev.status,
    publishedDate: publishedDate ?? prev.publishedDate,
    updatedAt: now,
  };

  db.blogs[idx] = updated;
  CMSStore.save(db);
  CMSStore.addActivity(`Updated blog "${updated.title}"`, 'blog', updated.title, req.adminUser!.email);

  res.json({ success: true, data: updated });
});

apiRouter.patch('/admin/blogs/:id/publish', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.blogs.findIndex((b) => b.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Blog not found.' });
    return;
  }

  const prev = db.blogs[idx];
  const nextStatus = prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
  prev.status = nextStatus;
  prev.updatedAt = new Date().toISOString();
  db.blogs[idx] = prev;
  CMSStore.save(db);

  CMSStore.addActivity(`Changed blog status to ${nextStatus}`, 'blog', prev.title, req.adminUser!.email);
  res.json({ success: true, data: prev });
});

apiRouter.delete('/admin/blogs/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.blogs.findIndex((b) => b.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Blog not found.' });
    return;
  }

  const deleted = db.blogs.splice(idx, 1)[0];
  CMSStore.save(db);
  CMSStore.addActivity(`Deleted blog "${deleted.title}"`, 'blog', deleted.title, req.adminUser!.email);

  res.json({ success: true, message: 'Blog deleted successfully.' });
});

// ========================================================
// 5. ADMIN PROJECT MANAGEMENT
// ========================================================

apiRouter.get('/admin/projects', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const projects = [...db.projects].sort((a, b) => a.displayOrder - b.displayOrder);
  res.json({ success: true, data: projects });
});

apiRouter.post('/admin/projects', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const { projectName, slug, shortDescription, fullDescription, featuredImage, galleryImages, category, technologies, projectUrl, clientName, status, displayOrder } = req.body;

  if (!projectName || !shortDescription) {
    res.status(400).json({ error: 'Project name and short description are required.' });
    return;
  }

  const generatedSlug = (slug || projectName)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  const db = CMSStore.get();
  const now = new Date().toISOString();
  const newProject: ProjectDoc = {
    id: `proj-${Date.now()}`,
    projectName,
    slug: generatedSlug,
    shortDescription,
    fullDescription: fullDescription || shortDescription,
    featuredImage: featuredImage || '/images/modern_software_mockup_1790576657118.jpg',
    galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
    category: category || 'Custom Software',
    technologies: Array.isArray(technologies) ? technologies : typeof technologies === 'string' ? technologies.split(',').map((t: string) => t.trim()) : [],
    projectUrl: projectUrl || 'https://www.requingroup.com/',
    clientName: clientName || '',
    status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
    displayOrder: typeof displayOrder === 'number' ? displayOrder : db.projects.length + 1,
    createdAt: now,
    updatedAt: now,
  };

  db.projects.push(newProject);
  CMSStore.save(db);
  CMSStore.addActivity(`Added project "${projectName}"`, 'project', projectName, req.adminUser!.email);

  res.status(201).json({ success: true, data: newProject });
});

apiRouter.put('/admin/projects/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Project not found.' });
    return;
  }

  const prev = db.projects[idx];
  const { projectName, slug, shortDescription, fullDescription, featuredImage, galleryImages, category, technologies, projectUrl, clientName, status, displayOrder } = req.body;

  const now = new Date().toISOString();
  const updated: ProjectDoc = {
    ...prev,
    projectName: projectName ?? prev.projectName,
    slug: slug ? slug.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') : prev.slug,
    shortDescription: shortDescription ?? prev.shortDescription,
    fullDescription: fullDescription ?? prev.fullDescription,
    featuredImage: featuredImage ?? prev.featuredImage,
    galleryImages: galleryImages ? (Array.isArray(galleryImages) ? galleryImages : prev.galleryImages) : prev.galleryImages,
    category: category ?? prev.category,
    technologies: technologies ? (Array.isArray(technologies) ? technologies : typeof technologies === 'string' ? technologies.split(',').map((t: string) => t.trim()) : prev.technologies) : prev.technologies,
    projectUrl: projectUrl ?? prev.projectUrl,
    clientName: clientName ?? prev.clientName,
    status: status ?? prev.status,
    displayOrder: typeof displayOrder === 'number' ? displayOrder : prev.displayOrder,
    updatedAt: now,
  };

  db.projects[idx] = updated;
  CMSStore.save(db);
  CMSStore.addActivity(`Updated project "${updated.projectName}"`, 'project', updated.projectName, req.adminUser!.email);

  res.json({ success: true, data: updated });
});

apiRouter.patch('/admin/projects/:id/publish', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Project not found.' });
    return;
  }

  const prev = db.projects[idx];
  const nextStatus = prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
  prev.status = nextStatus;
  prev.updatedAt = new Date().toISOString();
  db.projects[idx] = prev;
  CMSStore.save(db);

  CMSStore.addActivity(`Changed project status to ${nextStatus}`, 'project', prev.projectName, req.adminUser!.email);
  res.json({ success: true, data: prev });
});

apiRouter.delete('/admin/projects/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Project not found.' });
    return;
  }

  const deleted = db.projects.splice(idx, 1)[0];
  CMSStore.save(db);
  CMSStore.addActivity(`Deleted project "${deleted.projectName}"`, 'project', deleted.projectName, req.adminUser!.email);

  res.json({ success: true, message: 'Project deleted successfully.' });
});

// ========================================================
// 6. ADMIN OUR STORIES MANAGEMENT
// ========================================================

apiRouter.get('/admin/stories', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const stories = [...db.stories].sort((a, b) => a.displayOrder - b.displayOrder);
  res.json({ success: true, data: stories });
});

apiRouter.post('/admin/stories', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const { title, description, year, image, galleryImages, storyContent, displayOrder, status } = req.body;

  if (!title || !description || !year) {
    res.status(400).json({ error: 'Title, description, and year are required.' });
    return;
  }

  const db = CMSStore.get();
  const now = new Date().toISOString();
  const newStory: StoryDoc = {
    id: `story-${Date.now()}`,
    title,
    description,
    year,
    image: image || '/images/requin_software_team_1790576614688.jpg',
    galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
    storyContent: storyContent || description,
    displayOrder: typeof displayOrder === 'number' ? displayOrder : db.stories.length + 1,
    status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
    createdAt: now,
    updatedAt: now,
  };

  db.stories.push(newStory);
  CMSStore.save(db);
  CMSStore.addActivity(`Created milestone story "${title}"`, 'story', title, req.adminUser!.email);

  res.status(201).json({ success: true, data: newStory });
});

apiRouter.put('/admin/stories/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.stories.findIndex((s) => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Story not found.' });
    return;
  }

  const prev = db.stories[idx];
  const { title, description, year, image, galleryImages, storyContent, displayOrder, status } = req.body;

  const now = new Date().toISOString();
  const updated: StoryDoc = {
    ...prev,
    title: title ?? prev.title,
    description: description ?? prev.description,
    year: year ?? prev.year,
    image: image ?? prev.image,
    galleryImages: galleryImages ? (Array.isArray(galleryImages) ? galleryImages : prev.galleryImages) : prev.galleryImages,
    storyContent: storyContent ?? prev.storyContent,
    displayOrder: typeof displayOrder === 'number' ? displayOrder : prev.displayOrder,
    status: status ?? prev.status,
    updatedAt: now,
  };

  db.stories[idx] = updated;
  CMSStore.save(db);
  CMSStore.addActivity(`Updated milestone story "${updated.title}"`, 'story', updated.title, req.adminUser!.email);

  res.json({ success: true, data: updated });
});

apiRouter.patch('/admin/stories/:id/publish', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.stories.findIndex((s) => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Story not found.' });
    return;
  }

  const prev = db.stories[idx];
  const nextStatus = prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
  prev.status = nextStatus;
  prev.updatedAt = new Date().toISOString();
  db.stories[idx] = prev;
  CMSStore.save(db);

  CMSStore.addActivity(`Changed story status to ${nextStatus}`, 'story', prev.title, req.adminUser!.email);
  res.json({ success: true, data: prev });
});

apiRouter.delete('/admin/stories/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.stories.findIndex((s) => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Story not found.' });
    return;
  }

  const deleted = db.stories.splice(idx, 1)[0];
  CMSStore.save(db);
  CMSStore.addActivity(`Deleted story "${deleted.title}"`, 'story', deleted.title, req.adminUser!.email);

  res.json({ success: true, message: 'Story deleted successfully.' });
});

// ========================================================
// 7. ADMIN MEDIA MANAGEMENT
// ========================================================

apiRouter.get('/admin/media', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const media = [...db.media].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  res.json({ success: true, data: media });
});

apiRouter.post(
  '/admin/media',
  requireAdminAuth,
  upload.single('file'),
  (req: AuthenticatedRequest, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'No media file provided.' });
      return;
    }

    const file = req.file;
    const mediaUrl = `/uploads/${file.filename}`;

    const newMedia: MediaDoc = {
      id: `med-${Date.now()}`,
      fileName: file.filename,
      originalName: file.originalname,
      url: mediaUrl,
      mimeType: file.mimetype,
      size: file.size,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const db = CMSStore.get();
    db.media.unshift(newMedia);
    CMSStore.save(db);
    CMSStore.addActivity(`Uploaded media file ${file.originalname}`, 'media', file.originalname, req.adminUser!.email);

    res.status(201).json({ success: true, data: newMedia });
  }
);

apiRouter.delete('/admin/media/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const db = CMSStore.get();
  const idx = db.media.findIndex((m) => m.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: 'Media file not found.' });
    return;
  }

  const media = db.media[idx];
  // Attempt to delete physical file if inside /uploads/
  if (media.url.startsWith('/uploads/')) {
    const filePath = path.join(UPLOADS_DIR, path.basename(media.url));
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('Could not remove file from disk:', err);
      }
    }
  }

  db.media.splice(idx, 1);
  CMSStore.save(db);
  CMSStore.addActivity(`Deleted media asset ${media.originalName}`, 'media', media.originalName, req.adminUser!.email);

  res.json({ success: true, message: 'Media file deleted.' });
});
