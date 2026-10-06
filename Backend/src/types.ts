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

export interface TestimonialDoc {
  id: string;
  name: string;
  role: string;
  location?: string;
  quote: string;
  image: string;
  isHighlighted?: boolean;
  status: 'DRAFT' | 'PUBLISHED';
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityDoc {
  id: string;
  action: string;
  entityType: 'blog' | 'project' | 'story' | 'media' | 'testimonial' | 'career' | 'lifeAtRequin' | 'auth' | 'support';
  entityTitle: string;
  adminEmail: string;
  timestamp: string;
}

export interface SupportInquiryDoc {
  id: string;
  name: string;
  email: string;
  message: string;
  targetEmail: string;
  createdAt: string;
}

export interface CareerDoc {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  salary?: string;
  shortDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  displayOrder: number;
  applyEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplicationDoc {
  id: string;
  careerId?: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  experienceLevel: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  message?: string;
  status?: 'NEW' | 'REVIEWED' | 'SHORTLISTED' | 'REJECTED';
  createdAt: string;
}

export interface SubscriberDoc {
  id: string;
  email: string;
  source?: string;
  targetEmail: string;
  createdAt: string;
}

export interface LifeAtRequinPhotoDoc {
  id: string;
  image: string;
  year: string;
  title: string;
  caption: string;
}

export interface LifeAtRequinDoc {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  date: string;
  photoCount: number;
  years: string[];
  photos: LifeAtRequinPhotoDoc[];
  displayOrder?: number;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}
