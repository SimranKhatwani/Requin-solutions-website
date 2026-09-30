export interface AdminUser {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  name: string;
  role: 'superadmin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

export interface BlogDoc {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedDate: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDoc {
  id: string;
  projectName: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  featuredImage: string;
  galleryImages: string[];
  category: string;
  technologies: string[];
  projectUrl?: string;
  clientName?: string;
  status: 'DRAFT' | 'PUBLISHED';
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface StoryDoc {
  id: string;
  title: string;
  description: string;
  year: string;
  image: string;
  galleryImages: string[];
  storyContent: string;
  displayOrder: number;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export interface MediaDoc {
  id: string;
  fileName: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  dimensions?: { width: number; height: number };
  createdAt: string;
  updatedAt: string;
}

export interface ActivityDoc {
  id: string;
  action: string;
  entityType: 'blog' | 'project' | 'story' | 'media' | 'auth';
  entityTitle: string;
  adminEmail: string;
  timestamp: string;
}
