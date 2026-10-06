import { CareerModel } from '../models/career.model';
import { ActivityModel } from '../models/activity.model';
import { CareerDoc, JobApplicationDoc } from '../types';

export const CareerService = {
  getPublished(filters?: { department?: string; employmentType?: string; search?: string }): CareerDoc[] {
    return CareerModel.findPublished(filters);
  },

  getBySlugOrId(identifier: string): CareerDoc | undefined {
    return CareerModel.findBySlugOrId(identifier);
  },

  getAll(): CareerDoc[] {
    return CareerModel.findAll();
  },

  create(data: Partial<CareerDoc>, adminEmail: string): CareerDoc | { error: string; status: number } {
    const {
      title,
      slug,
      department,
      location,
      employmentType,
      experience,
      salary,
      shortDescription,
      responsibilities,
      requirements,
      benefits,
      status,
      displayOrder,
      applyEmail,
    } = data;

    if (!title || !department || !shortDescription) {
      return { error: 'Title, department, and short description are required.', status: 400 };
    }

    const autoSlug = (slug && slug.trim().length > 0)
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existingSlug = CareerModel.findBySlugOrId(autoSlug);
    if (existingSlug) {
      return { error: `A job opening with slug "${autoSlug}" already exists.`, status: 400 };
    }

    const allCareers = CareerModel.findAll();
    const newCareer: CareerDoc = {
      id: `career-${Date.now()}`,
      title,
      slug: autoSlug,
      department,
      location: location || 'Malviya Nagar, Jaipur, Rajasthan (On-Site)',
      employmentType: (employmentType as any) || 'Full-time',
      experience: experience || '2-4 Years',
      salary: salary || 'Competitive & Commensurate with Experience',
      shortDescription,
      responsibilities: Array.isArray(responsibilities)
        ? responsibilities
        : (responsibilities ? (responsibilities as any).split('\n').map((s: string) => s.trim()).filter(Boolean) : []),
      requirements: Array.isArray(requirements)
        ? requirements
        : (requirements ? (requirements as any).split('\n').map((s: string) => s.trim()).filter(Boolean) : []),
      benefits: Array.isArray(benefits)
        ? benefits
        : (benefits ? (benefits as any).split('\n').map((s: string) => s.trim()).filter(Boolean) : []),
      status: status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
      displayOrder: typeof displayOrder === 'number' ? displayOrder : allCareers.length + 1,
      applyEmail: applyEmail || 'Hr@requinsolutions.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    CareerModel.create(newCareer);
    ActivityModel.add(`Posted job opening "${newCareer.title}"`, 'career', newCareer.title, adminEmail);
    return newCareer;
  },

  update(id: string, data: Partial<CareerDoc>, adminEmail: string): CareerDoc | { error: string; status: number } {
    const prev = CareerModel.findById(id);
    if (!prev) {
      return { error: 'Career opening not found.', status: 404 };
    }

    const {
      title,
      slug,
      department,
      location,
      employmentType,
      experience,
      salary,
      shortDescription,
      responsibilities,
      requirements,
      benefits,
      status,
      displayOrder,
      applyEmail,
    } = data;

    let finalSlug = prev.slug;
    if (slug && slug !== prev.slug) {
      const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = CareerModel.findBySlugOrId(cleanSlug);
      if (existing && existing.id !== id) {
        return { error: `Slug "${cleanSlug}" is already in use.`, status: 400 };
      }
      finalSlug = cleanSlug;
    }

    const updated = CareerModel.update(id, {
      title: title ?? prev.title,
      slug: finalSlug,
      department: department ?? prev.department,
      location: location ?? prev.location,
      employmentType: (employmentType as any) ?? prev.employmentType,
      experience: experience ?? prev.experience,
      salary: salary ?? prev.salary,
      shortDescription: shortDescription ?? prev.shortDescription,
      responsibilities: responsibilities
        ? (Array.isArray(responsibilities) ? responsibilities : (responsibilities as any).split('\n').map((s: string) => s.trim()).filter(Boolean))
        : prev.responsibilities,
      requirements: requirements
        ? (Array.isArray(requirements) ? requirements : (requirements as any).split('\n').map((s: string) => s.trim()).filter(Boolean))
        : prev.requirements,
      benefits: benefits
        ? (Array.isArray(benefits) ? benefits : (benefits as any).split('\n').map((s: string) => s.trim()).filter(Boolean))
        : prev.benefits,
      status: (status as any) ?? prev.status,
      displayOrder: typeof displayOrder === 'number' ? displayOrder : prev.displayOrder,
      applyEmail: applyEmail ?? prev.applyEmail,
    });

    if (updated) {
      ActivityModel.add(`Updated job opening "${updated.title}"`, 'career', updated.title, adminEmail);
      return updated;
    }

    return { error: 'Failed to update job opening.', status: 500 };
  },

  togglePublish(id: string, adminEmail: string): CareerDoc | { error: string; status: number } {
    const prev = CareerModel.findById(id);
    if (!prev) {
      return { error: 'Career opening not found.', status: 404 };
    }

    const nextStatus = prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const updated = CareerModel.update(id, { status: nextStatus });
    if (updated) {
      ActivityModel.add(`Changed job opening "${prev.title}" status to ${nextStatus}`, 'career', prev.title, adminEmail);
      return updated;
    }
    return { error: 'Failed to toggle status.', status: 500 };
  },

  delete(id: string, adminEmail: string): CareerDoc | { error: string; status: number } {
    const deleted = CareerModel.delete(id);
    if (!deleted) {
      return { error: 'Job opening not found.', status: 404 };
    }
    ActivityModel.add(`Deleted job opening "${deleted.title}"`, 'career', deleted.title, adminEmail);
    return deleted;
  },

  // Job applications
  apply(data: Partial<JobApplicationDoc>): JobApplicationDoc | { error: string; status: number } {
    const { careerId, jobTitle, name, email, phone, experienceLevel, portfolioUrl, resumeUrl, message } = data;

    if (!name || !email || !jobTitle) {
      return { error: 'Name, email, and job title are required.', status: 400 };
    }

    const application: JobApplicationDoc = {
      id: `app-${Date.now()}`,
      careerId: careerId ? String(careerId) : undefined,
      jobTitle: String(jobTitle).trim(),
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : '',
      experienceLevel: experienceLevel ? String(experienceLevel).trim() : '',
      portfolioUrl: portfolioUrl ? String(portfolioUrl).trim() : '',
      resumeUrl: resumeUrl ? String(resumeUrl).trim() : '',
      message: message ? String(message).trim() : '',
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    CareerModel.createApplication(application);
    console.log(`[Job Application Received] Candidate: ${name} (${email}, ${phone}) | Role: ${jobTitle} | Forwarding to Hr@requinsolutions.com`);
    return application;
  },

  getApplications(): JobApplicationDoc[] {
    return CareerModel.getAllApplications();
  },

  updateApplicationStatus(id: string, status: JobApplicationDoc['status']): JobApplicationDoc | { error: string; status: number } {
    const updated = CareerModel.updateApplicationStatus(id, status);
    if (!updated) {
      return { error: 'Application not found.', status: 404 };
    }
    return updated;
  },
};
