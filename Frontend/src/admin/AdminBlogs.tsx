import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  X,
  Calendar,
  User,
  Tag,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Globe,
  Heading,
  List,
  Bold,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Check,
  Type,
  Star,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import { blogService, BlogItem } from '../services/blogService';
import {
  mediaService,
  MAX_IMAGE_SIZE_BYTES,
  ALLOWED_IMAGE_MIME_TYPES,
  ALLOWED_IMAGE_EXTENSIONS,
} from '../services/mediaService';
import { AdminImageUploader } from './AdminImageUploader';
import { getMediaUrl } from '../utils/mediaUrl';

export const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewBlog, setPreviewBlog] = useState<BlogItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // In-Content Image Insertion Modal State
  const [isInsertImageModalOpen, setIsInsertImageModalOpen] = useState(false);
  const [contentImageTab, setContentImageTab] = useState<'upload' | 'url'>('upload');
  const [contentImageUrl, setContentImageUrl] = useState('');
  const [contentImageCaption, setContentImageCaption] = useState('');
  const [contentImageAlt, setContentImageAlt] = useState('');
  const [contentImageUploading, setContentImageUploading] = useState(false);
  const [contentImageError, setContentImageError] = useState<string | null>(null);
  const contentFileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    content: '',
    featuredImage: '/images/cloud_infrastructure_1790576629897.jpg',
    author: 'Requin Solutions Team',
    category: 'Academic & Education',
    tags: 'Education, Technology, Innovation',
    status: 'PUBLISHED' as 'DRAFT' | 'PUBLISHED',
    publishedDate: new Date().toISOString().split('T')[0],
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await blogService.getAllBlogs();
      if (res.data) {
        setBlogs(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blogs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      handleOpenCreate();
    }
  }, [searchParams]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, pageSize]);

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      content: '',
      featuredImage: '/images/cloud_infrastructure_1790576629897.jpg',
      author: 'Requin Solutions Team',
      category: 'Academic & Education',
      tags: 'Education, Technology, Innovation',
      status: 'PUBLISHED',
      publishedDate: new Date().toISOString().split('T')[0],
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogItem) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      shortDescription: blog.shortDescription || '',
      content: blog.content || '',
      featuredImage: blog.featuredImage || '/images/cloud_infrastructure_1790576629897.jpg',
      author: blog.author || 'Requin Solutions Team',
      category: blog.category || 'Academic & Education',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
      status: blog.status || 'PUBLISHED',
      publishedDate: blog.publishedDate ? blog.publishedDate.split('T')[0] : new Date().toISOString().split('T')[0],
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === '' || !editingBlog ? autoSlug : prev.slug,
    }));
  };

  const handleInsertTag = (tagText: string) => {
    setFormData((prev) => {
      const textarea = document.getElementById('blog-content-editor') as HTMLTextAreaElement | null;
      if (!textarea) return { ...prev, content: prev.content + '\n' + tagText };

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = prev.content;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);

      return {
        ...prev,
        content: before + tagText + after,
      };
    });
  };

  // Open the In-Between Content Image Inserter
  const handleOpenInsertImage = () => {
    setContentImageUrl('');
    setContentImageCaption('');
    setContentImageAlt('');
    setContentImageError(null);
    setContentImageTab('upload');
    setIsInsertImageModalOpen(true);
  };

  const handleContentFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setContentImageError(null);

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setContentImageError('File size must be less than 5 MB.');
      if (contentFileInputRef.current) contentFileInputRef.current.value = '';
      return;
    }

    const fileType = (file.type || '').toLowerCase();
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    const isMimeValid = fileType
      ? ALLOWED_IMAGE_MIME_TYPES.includes(fileType) || fileType.startsWith('image/')
      : false;
    const isExtValid = ALLOWED_IMAGE_EXTENSIONS.includes(ext);

    if (!isMimeValid && !isExtValid) {
      setContentImageError('Please upload a valid image file (JPG, PNG, WEBP, GIF, SVG, AVIF).');
      if (contentFileInputRef.current) contentFileInputRef.current.value = '';
      return;
    }

    try {
      setContentImageUploading(true);
      const res = await mediaService.uploadMedia(file, 'blog-content');
      if (res.success && res.data) {
        setContentImageUrl(res.data.url);
        if (!contentImageAlt) {
          setContentImageAlt(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
        }
      }
    } catch (err: any) {
      setContentImageError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setContentImageUploading(false);
      if (contentFileInputRef.current) contentFileInputRef.current.value = '';
    }
  };

  const handleConfirmInsertImage = () => {
    if (!contentImageUrl.trim()) {
      setContentImageError('Please choose a file or enter an image URL.');
      return;
    }

    const altText = contentImageAlt.trim() || 'Article illustration';
    const captionHtml = contentImageCaption.trim()
      ? `\n  <figcaption class="text-center text-xs text-slate-500 mt-2">${contentImageCaption.trim()}</figcaption>`
      : '';

    const figureHtml = `\n<figure class="my-8">\n  <img src="${contentImageUrl.trim()}" alt="${altText}" class="rounded-2xl w-full object-cover shadow-md border border-slate-200" />${captionHtml}\n</figure>\n`;

    handleInsertTag(figureHtml);
    setIsInsertImageModalOpen(false);
    showToast('Image inserted into article body.');
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.shortDescription.trim()) {
      setFormError('Title and short description are required.');
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    const payload = {
      ...formData,
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      shortDescription: formData.shortDescription.trim(),
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingBlog) {
        await blogService.updateBlog(editingBlog.id, payload);
        showToast(`Blog "${payload.title}" updated successfully!`);
      } else {
        await blogService.createBlog(payload);
        showToast(`Blog "${payload.title}" published successfully!`);
      }
      setIsModalOpen(false);
      await fetchBlogs();
    } catch (err: any) {
      setFormError(err.message || 'Error saving blog post.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleTogglePublish = async (blog: BlogItem) => {
    try {
      const nextStatus = blog.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, status: nextStatus } : b))
      );
      await blogService.togglePublishBlog(blog.id);
      showToast(`Status changed to ${nextStatus} for "${blog.title.substring(0, 30)}..."`);
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
      fetchBlogs();
    }
  };

  const handleToggleFeatured = async (blog: BlogItem) => {
    try {
      const nextFeatured = !blog.isFeatured;
      setBlogs((prev) =>
        prev.map((b) => ({
          ...b,
          isFeatured: b.id === blog.id ? nextFeatured : (nextFeatured ? false : b.isFeatured),
        }))
      );
      await blogService.toggleFeaturedBlog(blog.id);
      showToast(
        nextFeatured
          ? `🌟 "${blog.title.substring(0, 25)}..." is now the Top Cover Blog!`
          : `Removed Cover Blog status from "${blog.title.substring(0, 25)}..."`
      );
    } catch (err: any) {
      alert(err.message || 'Failed to toggle cover status.');
      fetchBlogs();
    }
  };

  const handleUpdateOrder = async (blog: BlogItem, newOrder: number) => {
    try {
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, displayOrder: newOrder } : b))
      );
      await blogService.updateBlogOrder(blog.id, newOrder);
      showToast(`Updated display priority for "${blog.title.substring(0, 20)}..." to ${newOrder}`);
    } catch (err: any) {
      console.error('Failed to update order:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await blogService.deleteBlog(id);
      setDeleteConfirmId(null);
      showToast('Blog article deleted successfully.');
      fetchBlogs();
    } catch (err: any) {
      alert(err.message || 'Failed to delete blog.');
    }
  };

  // Filtered & Date-Sorted Blogs (Strictly ordered by upload / publication date)
  const filteredBlogs = useMemo(() => {
    const list = blogs.filter((b) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        b.title?.toLowerCase().includes(q) ||
        b.shortDescription?.toLowerCase().includes(q) ||
        b.slug?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        (Array.isArray(b.tags) && b.tags.some((t) => t.toLowerCase().includes(q)));

      const matchesStatus =
        statusFilter === 'ALL' ? true : b.status === statusFilter;

      const matchesCategory =
        categoryFilter === 'ALL' ? true : b.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    return [...list].sort((a, b) => {
      const dateA = new Date(a.publishedDate || a.createdAt || 0).getTime();
      const dateB = new Date(b.publishedDate || b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }, [blogs, searchTerm, statusFilter, categoryFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBlogs.length / pageSize) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBlogs.slice(start, start + pageSize);
  }, [filteredBlogs, currentPage, pageSize]);

  // Statistics
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => b.status === 'PUBLISHED').length;
    const draft = blogs.filter((b) => b.status === 'DRAFT').length;
    const sortedPublished = [...blogs]
      .filter((b) => b.status === 'PUBLISHED')
      .sort((a, b) => {
        const dateA = new Date(a.publishedDate || a.createdAt || 0).getTime();
        const dateB = new Date(b.publishedDate || b.createdAt || 0).getTime();
        return dateB - dateA;
      });
    const latestCover = sortedPublished[0]?.title || 'None uploaded yet';
    const categoriesSet = new Set(blogs.map((b) => b.category).filter(Boolean));
    return {
      total,
      published,
      draft,
      latestCoverTitle: latestCover,
      categoriesCount: categoriesSet.size,
    };
  }, [blogs]);

  const categories = useMemo(() => {
    return Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))).sort();
  }, [blogs]);

  return (
    <div className="space-y-6 text-left">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Blogs & Publications CMS
          </h2>
         
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Blog</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Articles</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Published (Live)</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{stats.published}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Drafts</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{stats.draft}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <p className="text-[11px] font-bold text-cyan-600 uppercase tracking-wider">Live Cover Hero (Auto)</p>
          <p className="text-xs font-bold text-slate-800 mt-1.5 truncate" title={stats.latestCoverTitle}>
            ⭐ {stats.latestCoverTitle}
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, slug, keywords, tags, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#08B9E8]"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published Only ({stats.published})</option>
            <option value="DRAFT">Drafts Only ({stats.draft})</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#08B9E8] max-w-[180px] truncate"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#08B9E8]"
          >
            <option value={10}>10 / page</option>
            <option value={15}>15 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </div>
      </div>

      {/* Blogs Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <Loader2 className="w-8 h-8 text-[#08B9E8] animate-spin mx-auto mb-2" />
            <p className="text-xs font-medium">Fetching blogs from MongoDB Atlas...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No blog articles found</p>
            <p className="text-xs text-slate-400 mt-1">Try modifying your search filter or write a new article.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-6">Article</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Published Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedBlogs.map((blog) => {
                    const isAutoCover =
                      blog.title === stats.latestCoverTitle && blog.status === 'PUBLISHED';

                    return (
                      <tr
                        key={blog.id}
                        className={`transition-colors ${
                          isAutoCover
                            ? 'bg-sky-50/40 hover:bg-sky-50/70'
                            : 'hover:bg-slate-50/60'
                        }`}
                      >
                        <td className="py-4 px-6 max-w-md">
                          <div className="flex items-center gap-3">
                            <img
                              src={getMediaUrl(blog.featuredImage)}
                              alt={blog.title}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100 shadow-2xs"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                              }}
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                {isAutoCover && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-sky-100 text-sky-800 shrink-0">
                                    ⭐ AUTO COVER
                                  </span>
                                )}
                                <p className="font-bold text-slate-900 truncate leading-snug" title={blog.title}>
                                  {blog.title}
                                </p>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5" title={blog.shortDescription}>
                                {blog.shortDescription}
                              </p>
                              <span className="text-[10px] text-slate-400 font-mono block truncate">
                                /{blog.slug}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium max-w-[140px] truncate">
                            {blog.category || 'General'}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                          {blog.publishedDate ? blog.publishedDate.split('T')[0] : 'N/A'}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <button
                            onClick={() => handleTogglePublish(blog)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                              blog.status === 'PUBLISHED'
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            }`}
                            title="Click to toggle between Published and Draft"
                          >
                            {blog.status === 'PUBLISHED' ? (
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
                            {/* View Live Article */}
                            <a
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                              title="View Live on Public Site (New Tab)"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>

                            {/* Preview Modal */}
                            <button
                              onClick={() => {
                                setPreviewBlog(blog);
                                setIsPreviewOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                              title="Quick Preview Modal"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Edit Article */}
                            <button
                              onClick={() => handleOpenEdit(blog)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Edit Article in CMS"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* Delete Article */}
                            <button
                              onClick={() => setDeleteConfirmId(blog.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                Showing{' '}
                <span className="font-semibold text-slate-700">
                  {Math.min(filteredBlogs.length, (currentPage - 1) * pageSize + 1)}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-slate-700">
                  {Math.min(filteredBlogs.length, currentPage * pageSize)}
                </span>{' '}
                of <span className="font-semibold text-slate-700">{filteredBlogs.length}</span> articles
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  title="First Page"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="px-3 py-1 font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  title="Last Page"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add / Edit Blog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 text-left overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-100 shrink-0 bg-white z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {editingBlog ? 'Edit Blog Article' : 'Create New Blog Article'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Saved directly to MongoDB Atlas. Uploaded images are stored in GridFS.
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
            <form onSubmit={handleSaveBlog} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-5">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. The Rise of On-Demand Tutoring"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="the-rise-of-on-demand-tutoring"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Academic & Education, Technology"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Requin Editorial Team"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Published Date
                    </label>
                    <input
                      type="date"
                      value={formData.publishedDate}
                      onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  {/* In this article section - Recommended generation callout */}
                  <div className="md:col-span-2 p-4 bg-[#F0F9FF] border border-[#B9E6FE] rounded-2xl space-y-1.5 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0284c7]">
                      <Sparkles className="w-4 h-4 text-[#08B9E8] shrink-0" />
                      <span>In this article section — Automatically generate from blog content (Recommended)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                      Your frontend extracts headings such as <code className="bg-white px-1.5 py-0.5 rounded border border-[#B9E6FE] text-[#0284c7] font-bold">&lt;h2&gt;</code> and <code className="bg-white px-1.5 py-0.5 rounded border border-[#B9E6FE] text-[#0284c7] font-bold">&lt;h3&gt;</code> / <code className="bg-white px-1.5 py-0.5 rounded border border-[#B9E6FE] text-[#0284c7] font-bold">&lt;h4&gt;</code> from the article and dynamically builds the Table of Contents for every blog generated.
                    </p>
                  </div>

                  {/* Top Banner Featured Image (Device Upload with GridFS OR Direct URL) */}
                  <div className="md:col-span-2">
                    <AdminImageUploader
                      label="Featured Image (Top Banner)"
                      value={formData.featuredImage}
                      onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                      module="blog"
                      helpText="Select from device (stores in MongoDB GridFS) or paste direct image URL (max 5 MB)."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Description / Article Summary *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Brief overview shown on blog cards and search results..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  {/* Rich Content Editor with Formatting Helpers */}
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        Article Body Content (Supports HTML and Rich Tags)
                      </label>
                      <div className="flex flex-wrap items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleInsertTag('<h2>Section Heading</h2>\n')}
                          className="px-2 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          title="Insert Heading 2 (Main Section)"
                        >
                          <Heading className="w-3 h-3" />
                          <span>H2</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertTag('<h3>Sub-section Heading</h3>\n')}
                          className="px-2 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          title="Insert Heading 3 (Sub-section)"
                        >
                          <Heading className="w-3 h-3 text-[#08B9E8]" />
                          <span>H3</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertTag('<p>Paragraph text goes here...</p>\n')}
                          className="px-2 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          title="Insert Paragraph"
                        >
                          <Type className="w-3 h-3" />
                          <span>Paragraph</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInsertTag('<strong>Bold Text</strong>')}
                          className="px-2 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          title="Insert Bold Text"
                        >
                          <Bold className="w-3 h-3" />
                          <span>Bold</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleInsertTag(
                              '<ul class="list-disc pl-6 space-y-2 my-4 text-slate-700">\n  <li>Point 1</li>\n  <li>Point 2</li>\n</ul>\n'
                            )
                          }
                          className="px-2 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          title="Insert Bullet List"
                        >
                          <List className="w-3 h-3" />
                          <span>Bullet List</span>
                        </button>

                        {/* Interactive In-Between Content Image Inserter */}
                        <button
                          type="button"
                          onClick={handleOpenInsertImage}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                          title="Insert Image into Content (Device Upload with GridFS or Direct URL)"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-[#08B9E8]" />
                          <span>+ Insert Image</span>
                        </button>
                      </div>
                    </div>

                    <textarea
                      id="blog-content-editor"
                      rows={9}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="<h2 class='text-2xl font-bold'>Introduction</h2><p>Article body content...</p>"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#08B9E8] leading-relaxed"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Tip: Headings (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded">&lt;h2&gt;</code>) are automatically parsed into the sticky Table of Contents ("In this article") on the public blog page.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tags (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="e.g. EdTech, Cloud, AI, StudentSuccess"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Publication Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-[#08B9E8]"
                    >
                      <option value="PUBLISHED">PUBLISHED (Visible immediately on public site)</option>
                      <option value="DRAFT">DRAFT (Hidden from public site, saved in CMS)</option>
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
                  <span>{editingBlog ? 'Save Changes to Database' : 'Publish Article to Database'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Insert Image in Content Modal */}
      {isInsertImageModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-left animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <ImageIcon className="w-5 h-5 text-[#08B9E8]" />
                <span>Insert Image into Article Body</span>
              </div>
              <button
                type="button"
                onClick={() => setIsInsertImageModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 w-fit">
              <button
                type="button"
                onClick={() => setContentImageTab('upload')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  contentImageTab === 'upload'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5 text-[#08B9E8]" />
                <span>Upload from Device (GridFS)</span>
              </button>
              <button
                type="button"
                onClick={() => setContentImageTab('url')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  contentImageTab === 'url'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5 text-[#08B9E8]" />
                <span>Enter Direct URL</span>
              </button>
            </div>

            <input
              ref={contentFileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif,.avif,image/*"
              onChange={handleContentFileUpload}
              className="hidden"
            />

            {/* Upload Mode */}
            {contentImageTab === 'upload' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => contentFileInputRef.current?.click()}
                    disabled={contentImageUploading}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2 shrink-0 shadow-xs"
                  >
                    {contentImageUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading to GridFS...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Choose File from Device</span>
                      </>
                    )}
                  </button>
                  <span className="text-xs text-slate-500 truncate">
                    {contentImageUrl
                      ? `Stored in GridFS: ${contentImageUrl}`
                      : 'JPG, PNG, WebP (Max 5MB)'}
                  </span>
                </div>
              </div>
            )}

            {/* Direct URL Mode */}
            {contentImageTab === 'url' && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Image URL
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={contentImageUrl}
                    onChange={(e) => setContentImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or /images/..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8]"
                  />
                </div>
              </div>
            )}

            {/* Image Preview if selected/entered */}
            {contentImageUrl && (
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3">
                <img
                  src={getMediaUrl(contentImageUrl)}
                  alt="Preview"
                  className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Image Ready to Insert</span>
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono truncate mt-0.5" title={contentImageUrl}>
                    {contentImageUrl}
                  </p>
                </div>
              </div>
            )}

            {/* Caption & Alt Text */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image Caption (Optional)
                </label>
                <input
                  type="text"
                  value={contentImageCaption}
                  onChange={(e) => setContentImageCaption(e.target.value)}
                  placeholder="e.g. Figure 1: AI-powered tutor answering student queries in real-time"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#08B9E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alt Text (for accessibility/SEO)
                </label>
                <input
                  type="text"
                  value={contentImageAlt}
                  onChange={(e) => setContentImageAlt(e.target.value)}
                  placeholder="e.g. Student using online academic support on laptop"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#08B9E8]"
                />
              </div>
            </div>

            {contentImageError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{contentImageError}</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsInsertImageModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmInsertImage}
                disabled={!contentImageUrl.trim() || contentImageUploading}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] disabled:opacity-50 cursor-pointer shadow-xs"
              >
                Insert into Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-left animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900">Delete Blog Article</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Are you sure you want to permanently delete this blog post? This action will remove it from MongoDB Atlas and the public website.
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
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-xs cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {isPreviewOpen && previewBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#F5FAFD] text-slate-900 rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#B9E6FE] text-left overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Preview Header */}
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-[#D0EEFC] shrink-0 bg-gradient-to-r from-[#E6F5FC] via-[#F0F9FE] to-[#E6F5FC] z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7] flex items-center gap-2 bg-[#08B9E8]/10 px-3 py-1.5 rounded-full border border-[#08B9E8]/20">
                <Globe className="w-4 h-4 text-[#08B9E8]" />
                <span>Public Article Preview</span>
              </span>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-[#DDF2FB] transition-colors cursor-pointer"
                title="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Content (Scrollable) */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-white">
              {previewBlog.featuredImage && (
                <img
                  src={getMediaUrl(previewBlog.featuredImage)}
                  alt={previewBlog.title}
                  className="w-full h-64 sm:h-72 object-cover rounded-2xl border border-[#D0EEFC] shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
              )}

              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#0284c7]">
                <span className="px-2.5 py-1 rounded-lg bg-[#E0F4FC] text-[#0284c7] border border-[#B9E6FE]">
                  {previewBlog.category}
                </span>
                <span>·</span>
                <span className="text-slate-500 font-medium">
                  {previewBlog.publishedDate ? previewBlog.publishedDate.split('T')[0] : 'Today'}
                </span>
                <span>·</span>
                <span className="text-slate-500 font-medium">By {previewBlog.author}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                {previewBlog.title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal bg-[#F0F9FE] p-4 rounded-xl border border-[#D0EEFC]">
                {previewBlog.shortDescription}
              </p>

              <div
                className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base space-y-4 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-800 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-[#08B9E8] [&_img]:rounded-xl [&_img]:w-full [&_img]:border [&_img]:border-slate-200"
                dangerouslySetInnerHTML={{ __html: previewBlog.content }}
              />
            </div>

            {/* Preview Footer */}
            <div className="px-6 py-4 sm:px-8 border-t border-[#D0EEFC] shrink-0 bg-gradient-to-r from-[#E6F5FC] via-[#F0F9FE] to-[#E6F5FC] flex items-center justify-between">
              <a
                href={`/blogs/${previewBlog.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-[#08B9E8] transition-colors hover:underline"
              >
                <span>Open public page in new tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#08B9E8] text-slate-950 text-xs font-bold hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 cursor-pointer"
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
