import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FolderGit2,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  X,
  ExternalLink,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { projectService, ProjectItem } from '../services/projectService';
import { AdminImageUploader } from './AdminImageUploader';
import { getMediaUrl } from '../utils/mediaUrl';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    projectName: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    featuredImage: '/images/modern_software_mockup_1790576657118.jpg',
    galleryImages: '',
    category: 'Custom Software',
    technologies: 'React, Node.js, TypeScript, PostgreSQL',
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'Enterprise Client',
    status: 'PUBLISHED' as 'DRAFT' | 'PUBLISHED',
    displayOrder: 1,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectService.getAllProjects();
      if (res.data) setProjects(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      handleOpenCreate();
    }
  }, [searchParams]);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      projectName: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      featuredImage: '/images/modern_software_mockup_1790576657118.jpg',
      galleryImages: '/images/cloud_infrastructure_1790576629897.jpg',
      category: 'Cloud & DevOps',
      technologies: 'Kubernetes, AWS, Docker, Node.js',
      projectUrl: 'https://www.requingroup.com/',
      clientName: 'Global Client',
      status: 'PUBLISHED',
      displayOrder: projects.length + 1,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      projectName: project.projectName || '',
      slug: project.slug || '',
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      featuredImage: project.featuredImage || '',
      galleryImages: Array.isArray(project.galleryImages)
        ? project.galleryImages.join(', ')
        : typeof project.galleryImages === 'string'
        ? project.galleryImages
        : '',
      category: project.category || 'Custom Software',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : typeof project.technologies === 'string'
        ? project.technologies
        : '',
      projectUrl: project.projectUrl || '',
      clientName: project.clientName || '',
      status: project.status || 'PUBLISHED',
      displayOrder: project.displayOrder || 1,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData((prev) => ({
      ...prev,
      projectName: val,
      slug: prev.slug === '' || !editingProject ? autoSlug : prev.slug,
    }));
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectName || !formData.shortDescription) {
      setFormError('Project name and short description are required.');
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      galleryImages: formData.galleryImages.split(',').map((g) => g.trim()).filter(Boolean),
      displayOrder: Number(formData.displayOrder) || 1,
    };

    try {
      if (editingProject) {
        await projectService.updateProject(editingProject.id, payload);
      } else {
        await projectService.createProject(payload);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setFormError(err.message || 'Error saving project.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleTogglePublish = async (project: ProjectItem) => {
    try {
      await projectService.togglePublishProject(project.id);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to update project status.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await projectService.deleteProject(id);
      setDeleteConfirmId(null);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project.');
    }
  };

  const filteredProjects = projects.filter((p) => {
    const techList = Array.isArray(p.technologies)
      ? p.technologies
      : typeof p.technologies === 'string'
      ? (p.technologies as string).split(',').map((t) => t.trim())
      : [];

    const matchesSearch =
      (p.projectName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.shortDescription || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      techList.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'ALL' ? true : p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Projects & Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage live engineering projects displayed in the public Portfolio section.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by name, technology, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] transition-colors"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#08B9E8] w-full sm:w-auto"
        >
          <option value="ALL">All Statuses</option>
          <option value="PUBLISHED">Published Only</option>
          <option value="DRAFT">Drafts Only</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <Loader2 className="w-8 h-8 text-[#08B9E8] animate-spin mx-auto mb-2" />
            <p className="text-xs font-medium">Loading projects from database...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No projects found</p>
            <p className="text-xs text-slate-400 mt-1">Add your first case study or reset search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">Order</th>
                  <th className="py-3.5 px-6">Project Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Technologies</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 text-center text-xs font-bold text-slate-400">
                      #{proj.displayOrder}
                    </td>

                    <td className="py-4 px-6 max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={getMediaUrl(proj.featuredImage)}
                          alt={proj.projectName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                          }}
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate leading-snug">
                            {proj.projectName}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {proj.shortDescription}
                          </p>
                          {proj.clientName && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              Client: {proj.clientName}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                        {proj.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(proj.technologies)
                          ? proj.technologies
                          : typeof proj.technologies === 'string'
                          ? (proj.technologies as string).split(',').map((t) => t.trim()).filter(Boolean)
                          : []
                        ).slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                            {tech}
                          </span>
                        ))}
                        {(Array.isArray(proj.technologies) ? proj.technologies.length : 0) > 3 && (
                          <span className="text-[10px] text-slate-400 font-mono self-center">
                            +{(proj.technologies as string[]).length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(proj)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          proj.status === 'PUBLISHED'
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {proj.status === 'PUBLISHED' ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setPreviewProject(proj);
                            setIsPreviewOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title="Preview Project"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(proj)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(proj.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 text-left overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-100 shrink-0 bg-white z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {editingProject ? 'Edit Project' : 'Create New Project'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Save engineering case studies directly into the CMS database.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body & Form */}
            <form onSubmit={handleSaveProject} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Enterprise Cloud Infrastructure & CI/CD"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="cloud-infrastructure-cicd"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Cloud & DevOps"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Global FinTech Corp"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <AdminImageUploader
                      label="Featured Image"
                      value={formData.featuredImage}
                      onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                      module="project"
                      helpText="File size must be less than 5 MB."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gallery Images (Comma Separated URLs)
                    </label>
                    <input
                      type="text"
                      value={formData.galleryImages}
                      onChange={(e) => setFormData({ ...formData, galleryImages: e.target.value })}
                      placeholder="/images/cloud_infrastructure_1790576629897.jpg, /images/digital_agency_office_1790576645354.jpg"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Technologies Stack (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      placeholder="Kubernetes, Docker, AWS, React, TypeScript"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Description *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Short summary for portfolio cards..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Architecture Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      placeholder="Detailed technical breakdown of the architecture, key outcomes, metrics..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Live Demo / External URL
                    </label>
                    <input
                      type="text"
                      value={formData.projectUrl}
                      onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                      placeholder="https://www.requingroup.com/"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Publish Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-[#08B9E8]"
                    >
                      <option value="PUBLISHED">PUBLISHED (Shown on website)</option>
                      <option value="DRAFT">DRAFT (Hidden from public)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 sm:px-8 sm:py-4 border-t border-slate-100 shrink-0 bg-slate-50/90 flex items-center justify-end gap-3 rounded-b-2xl sm:rounded-b-3xl z-10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 disabled:opacity-50 cursor-pointer"
                >
                  {formSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProject ? 'Save Project' : 'Publish Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-left animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900">Delete Project</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Are you sure you want to delete this project? This will remove it from the database and public showcase.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && previewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-800 text-left overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Preview Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0 bg-slate-900 z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#08B9E8]">
                Project Showcase Preview
              </span>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Content (Scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
              <img
                src={getMediaUrl(previewProject.featuredImage)}
                alt={previewProject.projectName}
                className="w-full h-56 object-cover rounded-xl border border-slate-800 mb-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                }}
              />

              <span className="text-xs font-semibold text-[#08B9E8] uppercase tracking-wider block">
                {previewProject.category}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {previewProject.projectName}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {previewProject.fullDescription || previewProject.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {(Array.isArray(previewProject.technologies)
                  ? previewProject.technologies
                  : typeof previewProject.technologies === 'string'
                  ? (previewProject.technologies as string).split(',').map((t) => t.trim()).filter(Boolean)
                  : []
                ).map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview Footer */}
            <div className="px-6 py-4 border-t border-slate-800 shrink-0 bg-slate-950 flex justify-end">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
