import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  X,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Eye,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { careerService, CareerItem, JobApplicationItem } from '../services/careerService';

export const AdminCareers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'openings' | 'applications'>('openings');
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [applications, setApplications] = useState<JobApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT' | 'CLOSED'>('ALL');
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<CareerItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewApp, setPreviewApp] = useState<JobApplicationItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    department: 'Frontend Engineering',
    location: 'Jaipur, Rajasthan (Onsite / Hybrid)',
    employmentType: 'Full-time' as CareerItem['employmentType'],
    experience: '2+ Years',
    salary: 'Competitive / Best in Industry',
    shortDescription: '',
    responsibilitiesText: '',
    requirementsText: '',
    benefitsText: '',
    status: 'PUBLISHED' as CareerItem['status'],
    displayOrder: 1,
    applyEmail: 'Hr@requinsolutions.com',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await careerService.getAllCareers();
      if (res.data) setCareers(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch careers.');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await careerService.getJobApplications();
      if (res.data) setApplications(res.data);
    } catch (err: any) {
      console.error('Failed to fetch job applications:', err);
    }
  };

  useEffect(() => {
    fetchCareers();
    fetchApplications();
  }, []);

  const handleOpenCreate = () => {
    setEditingCareer(null);
    setFormData({
      title: '',
      slug: '',
      department: 'Frontend Engineering',
      location: 'Jaipur, Rajasthan (Onsite / Hybrid)',
      employmentType: 'Full-time',
      experience: '2+ Years',
      salary: '₹7 LPA – ₹14 LPA',
      shortDescription: '',
      responsibilitiesText: 'Architect modular, high-performance web applications using React & TypeScript.\nCollaborate with UI/UX designers to translate Figma design systems.\nOptimize client-side performance and ensure cross-browser compatibility.',
      requirementsText: '2+ years of professional production experience.\nStrong proficiency in modern JavaScript/TypeScript, React, and CSS/Tailwind.\nExcellent problem-solving and communication skills.',
      benefitsText: 'Competitive salary with biannual performance appraisals.\nModern Jaipur engineering hub with high-end developer hardware.\nComprehensive health insurance and flexible hybrid working policies.',
      status: 'PUBLISHED',
      displayOrder: careers.length + 1,
      applyEmail: 'Hr@requinsolutions.com',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (career: CareerItem) => {
    setEditingCareer(career);
    setFormData({
      title: career.title,
      slug: career.slug,
      department: career.department,
      location: career.location,
      employmentType: career.employmentType,
      experience: career.experience,
      salary: career.salary || '',
      shortDescription: career.shortDescription,
      responsibilitiesText: (career.responsibilities || []).join('\n'),
      requirementsText: (career.requirements || []).join('\n'),
      benefitsText: (career.benefits || []).join('\n'),
      status: career.status,
      displayOrder: career.displayOrder,
      applyEmail: career.applyEmail || 'Hr@requinsolutions.com',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.shortDescription.trim()) {
      setFormError('Please enter a job title and short description.');
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    const payload: Partial<CareerItem> = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || undefined,
      department: formData.department.trim(),
      location: formData.location.trim(),
      employmentType: formData.employmentType,
      experience: formData.experience.trim(),
      salary: formData.salary.trim(),
      shortDescription: formData.shortDescription.trim(),
      responsibilities: formData.responsibilitiesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: formData.requirementsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      benefits: formData.benefitsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      status: formData.status,
      displayOrder: Number(formData.displayOrder) || 1,
      applyEmail: formData.applyEmail.trim() || 'Hr@requinsolutions.com',
    };

    try {
      if (editingCareer) {
        await careerService.updateCareer(editingCareer.id, payload);
      } else {
        await careerService.createCareer(payload);
      }
      setIsModalOpen(false);
      fetchCareers();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save job opening.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      await careerService.togglePublishCareer(id);
      fetchCareers();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle status.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await careerService.deleteCareer(id);
      setDeleteConfirmId(null);
      fetchCareers();
    } catch (err: any) {
      alert(err.message || 'Failed to delete job opening.');
    }
  };

  const handleUpdateAppStatus = async (appId: string, newStatus: string) => {
    try {
      await careerService.updateApplicationStatus(appId, newStatus);
      fetchApplications();
      if (previewApp && previewApp.id === appId) {
        setPreviewApp({ ...previewApp, status: newStatus as any });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update application status.');
    }
  };

  const departments = Array.from(
    new Set(careers.map((c) => c.department).filter(Boolean))
  );

  const filteredCareers = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || c.status === statusFilter;

    const matchesDept =
      departmentFilter === 'ALL' || c.department.toLowerCase() === departmentFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-7 h-7 text-[#08B9E8]" />
            <span>Careers & Job Openings</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Publish openings, manage requirements, and review candidate applications for Requin Solutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tabs */}
          <div className="flex bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('openings')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'openings'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Openings ({careers.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'applications'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Applications ({applications.length})
              {applications.filter((a) => a.status === 'NEW').length > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0099FF] to-[#08B9E8] hover:from-[#0088EE] hover:to-[#00A8D8] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Job Opening</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          TAB 1: OPENINGS MANAGEMENT
      ======================================================== */}
      {activeTab === 'openings' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search openings by title, department, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#08B9E8] bg-white cursor-pointer"
              >
                <option value="ALL">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#08B9E8] bg-white cursor-pointer"
              >
                <option value="ALL">All Status</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>

          {/* Table / List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#08B9E8]" />
                <p className="text-sm font-medium">Loading job openings...</p>
              </div>
            ) : filteredCareers.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-base font-semibold text-slate-800">No job openings found</p>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or click "Add Job Opening".</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                      <th className="py-3.5 px-4">Role & Department</th>
                      <th className="py-3.5 px-4">Location & Type</th>
                      <th className="py-3.5 px-4">Experience & Salary</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCareers.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-sm sm:text-base">
                            {c.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded-md bg-[#08B9E8]/10 text-[#0088CC] font-semibold text-[11px]">
                              {c.department}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              /{c.slug}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-slate-600">
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{c.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{c.employmentType}</span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-slate-600">
                          <div className="text-xs font-semibold text-slate-800">
                            {c.experience}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {c.salary || 'Best in Industry'}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleTogglePublish(c.id)}
                            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              c.status === 'PUBLISHED'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : c.status === 'CLOSED'
                                ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            }`}
                            title="Click to toggle status"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            <span>{c.status}</span>
                          </button>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`/careers#${c.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg text-slate-400 hover:text-[#08B9E8] hover:bg-slate-100 transition-colors"
                              title="View on Public Careers Page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleOpenEdit(c)}
                              className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Edit Opening"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(c.id)}
                              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Opening"
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
        </div>
      )}

      {/* ========================================================
          TAB 2: CANDIDATE APPLICATIONS
      ======================================================== */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-[#08B9E8]" />
              <span>Received Applications ({applications.length})</span>
            </h3>
            <span className="text-xs text-slate-500">
              Applications are automatically emailed to{' '}
              <span className="font-semibold text-slate-800">Hr@requinsolutions.com</span>
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-semibold text-slate-700">No applications received yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Candidate submissions via the Careers page form will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                    <th className="py-3.5 px-4">Candidate</th>
                    <th className="py-3.5 px-4">Role Applied For</th>
                    <th className="py-3.5 px-4">Experience</th>
                    <th className="py-3.5 px-4">Submitted Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{app.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{app.email}</span>
                          {app.phone && <span>• {app.phone}</span>}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-semibold text-slate-800">
                        {app.jobTitle}
                      </td>

                      <td className="py-4 px-4 text-slate-600">
                        {app.experienceLevel || 'Not specified'}
                      </td>

                      <td className="py-4 px-4 text-slate-500 text-xs">
                        {new Date(app.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={app.status || 'NEW'}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            app.status === 'SHORTLISTED'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : app.status === 'REVIEWED'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : app.status === 'REJECTED'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="REVIEWED">REVIEWED</option>
                          <option value="SHORTLISTED">SHORTLISTED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setPreviewApp(app)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          CREATE / EDIT CAREER MODAL
      ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingCareer ? 'Edit Job Opening' : 'Create New Job Opening'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Published roles appear instantly on the public Careers page.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior React Developer"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Frontend Engineering"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8]"
                  />
                </div>
              </div>

              {/* Location, Employment Type & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jaipur, Rajasthan"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employmentType: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8] bg-white cursor-pointer"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2+ Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8]"
                  />
                </div>
              </div>

              {/* Salary & Application Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Salary Range / Package
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹7 LPA – ₹14 LPA"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Notification / HR Email
                  </label>
                  <input
                    type="email"
                    placeholder="Hr@requinsolutions.com"
                    value={formData.applyEmail}
                    onChange={(e) => setFormData({ ...formData, applyEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8]"
                  />
                </div>
              </div>

              {/* Short Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Short Role Overview *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary of responsibilities and impact..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8]"
                />
              </div>

              {/* Responsibilities (One per line) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Architect scalable components...&#10;Conduct code reviews..."
                  value={formData.responsibilitiesText}
                  onChange={(e) => setFormData({ ...formData, responsibilitiesText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#08B9E8]"
                />
              </div>

              {/* Requirements (One per line) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Requirements & Qualifications (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="3+ years of React production experience...&#10;Deep TypeScript knowledge..."
                  value={formData.requirementsText}
                  onChange={(e) => setFormData({ ...formData, requirementsText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#08B9E8]"
                />
              </div>

              {/* Status & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Publish Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8] bg-white cursor-pointer"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live on Careers page)</option>
                    <option value="DRAFT">DRAFT (Hidden)</option>
                    <option value="CLOSED">CLOSED (Archived)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Display Priority Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#08B9E8]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0099FF] to-[#08B9E8] hover:from-[#0088EE] hover:to-[#00A8D8] text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {formSubmitting ? 'Saving...' : editingCareer ? 'Update Opening' : 'Create Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          DELETE CONFIRMATION DIALOG
      ======================================================== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Delete this job opening?</h4>
              <p className="text-xs text-slate-500 mt-1">
                This action cannot be undone. It will be removed from the public website immediately.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          APPLICATION PREVIEW MODAL
      ======================================================== */}
      {previewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Application Details</h3>
                <p className="text-xs text-slate-500">Role: {previewApp.jobTitle}</p>
              </div>
              <button
                onClick={() => setPreviewApp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Candidate Name</span>
                <span className="font-bold text-slate-900 text-base">{previewApp.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Email Address</span>
                  <a href={`mailto:${previewApp.email}`} className="text-[#08B9E8] font-semibold hover:underline">
                    {previewApp.email}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Phone</span>
                  <span>{previewApp.phone || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Experience Level</span>
                <span>{previewApp.experienceLevel || 'Not specified'}</span>
              </div>

              {previewApp.portfolioUrl && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Portfolio / Resume Link</span>
                  <a
                    href={previewApp.portfolioUrl.startsWith('http') ? previewApp.portfolioUrl : `https://${previewApp.portfolioUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#08B9E8] font-semibold hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{previewApp.portfolioUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {previewApp.message && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Cover Note / Message</span>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mt-1 text-slate-700 text-xs whitespace-pre-line leading-relaxed">
                    {previewApp.message}
                  </div>
                </div>
              )}

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Submitted At</span>
                <span className="text-slate-500 text-xs">
                  {new Date(previewApp.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Status:</span>
                <select
                  value={previewApp.status || 'NEW'}
                  onChange={(e) => handleUpdateAppStatus(previewApp.id, e.target.value)}
                  className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none"
                >
                  <option value="NEW">NEW</option>
                  <option value="REVIEWED">REVIEWED</option>
                  <option value="SHORTLISTED">SHORTLISTED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <button
                onClick={() => setPreviewApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminCareers;
