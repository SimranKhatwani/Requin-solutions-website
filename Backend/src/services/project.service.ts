import { ProjectModel } from '../models/project.model';
import { ActivityModel } from '../models/activity.model';
import { ProjectDoc } from '../types';

export const ProjectService = {
  async getPublished(filters?: { category?: string }): Promise<ProjectDoc[]> {
    return await ProjectModel.findPublished(filters);
  },

  async getBySlug(slug: string): Promise<ProjectDoc | null> {
    const project = await ProjectModel.findBySlug(slug);
    if (project && project.status === 'PUBLISHED') {
      return project;
    }
    return null;
  },

  async getAll(): Promise<ProjectDoc[]> {
    return await ProjectModel.findAll();
  },

  async create(data: Partial<ProjectDoc>, adminEmail: string): Promise<ProjectDoc | { error: string; status: number }> {
    const {
      projectName,
      slug,
      shortDescription,
      fullDescription,
      featuredImage,
      galleryImages,
      category,
      technologies,
      projectUrl,
      clientName,
      status,
      displayOrder,
    } = data;

    if (!projectName || !shortDescription) {
      return { error: 'Project name and short description are required.', status: 400 };
    }

    const autoSlug = (slug && slug.trim().length > 0)
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : projectName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existingSlug = await ProjectModel.findBySlug(autoSlug);
    if (existingSlug) {
      return { error: `A project with slug "${autoSlug}" already exists.`, status: 400 };
    }

    const allProjects = await ProjectModel.findAll();
    const newProject: ProjectDoc = {
      id: `proj-${Date.now()}`,
      projectName: projectName.trim(),
      slug: autoSlug,
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription || shortDescription,
      featuredImage: featuredImage || '/images/products/vastra-erp-overview.png',
      galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
      category: category || 'Custom Enterprise Development',
      technologies: Array.isArray(technologies)
        ? technologies
        : (technologies ? (technologies as any).split(',').map((t: string) => t.trim()).filter(Boolean) : ['React', 'Node.js']),
      projectUrl: projectUrl || 'https://www.requingroup.com/',
      clientName: clientName || 'Enterprise Partner',
      status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
      displayOrder: (typeof displayOrder === 'number' && !isNaN(displayOrder))
        ? displayOrder
        : (displayOrder !== undefined && !isNaN(Number(displayOrder)))
        ? Number(displayOrder)
        : allProjects.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const created = await ProjectModel.create(newProject);
    ActivityModel.add(`Added project showcase "${newProject.projectName}"`, 'project', newProject.projectName, adminEmail);
    return created;
  },

  async update(id: string, data: Partial<ProjectDoc>, adminEmail: string): Promise<ProjectDoc | { error: string; status: number }> {
    const prev = await ProjectModel.findById(id);
    if (!prev) {
      return { error: 'Project not found.', status: 404 };
    }

    const {
      projectName,
      slug,
      shortDescription,
      fullDescription,
      featuredImage,
      galleryImages,
      category,
      technologies,
      projectUrl,
      clientName,
      status,
      displayOrder,
    } = data;

    let finalSlug = prev.slug;
    if (slug && slug !== prev.slug) {
      const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = await ProjectModel.findBySlug(cleanSlug);
      if (existing && existing.id !== id) {
        return { error: `Slug "${cleanSlug}" is already taken by another project.`, status: 400 };
      }
      finalSlug = cleanSlug;
    }

    const updated = await ProjectModel.update(id, {
      projectName: projectName ?? prev.projectName,
      slug: finalSlug,
      shortDescription: shortDescription ?? prev.shortDescription,
      fullDescription: fullDescription ?? prev.fullDescription,
      featuredImage: featuredImage ?? prev.featuredImage,
      galleryImages: galleryImages ? (Array.isArray(galleryImages) ? galleryImages : []) : prev.galleryImages,
      category: category ?? prev.category,
      technologies: technologies
        ? (Array.isArray(technologies) ? technologies : (technologies as any).split(',').map((t: string) => t.trim()).filter(Boolean))
        : prev.technologies,
      projectUrl: projectUrl ?? prev.projectUrl,
      clientName: clientName ?? prev.clientName,
      status: status ?? prev.status,
      displayOrder: (typeof displayOrder === 'number' && !isNaN(displayOrder))
        ? displayOrder
        : (displayOrder !== undefined && !isNaN(Number(displayOrder)))
        ? Number(displayOrder)
        : prev.displayOrder,
    });

    if (updated) {
      ActivityModel.add(`Updated project "${updated.projectName}"`, 'project', updated.projectName, adminEmail);
      return updated;
    }

    return { error: 'Failed to update project.', status: 500 };
  },

  async togglePublish(id: string, adminEmail: string): Promise<ProjectDoc | { error: string; status: number }> {
    const prev = await ProjectModel.findById(id);
    if (!prev) {
      return { error: 'Project not found.', status: 404 };
    }

    const nextStatus = prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const updated = await ProjectModel.update(id, { status: nextStatus });
    if (updated) {
      ActivityModel.add(`Changed project "${prev.projectName}" status to ${nextStatus}`, 'project', prev.projectName, adminEmail);
      return updated;
    }
    return { error: 'Failed to toggle status.', status: 500 };
  },

  async delete(id: string, adminEmail: string): Promise<ProjectDoc | { error: string; status: number }> {
    const deleted = await ProjectModel.delete(id);
    if (!deleted) {
      return { error: 'Project not found.', status: 404 };
    }
    ActivityModel.add(`Deleted project "${deleted.projectName}"`, 'project', deleted.projectName, adminEmail);
    return deleted;
  },
};
