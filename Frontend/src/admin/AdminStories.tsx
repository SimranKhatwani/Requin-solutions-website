import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  X,
  Calendar,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { storyService, StoryItem } from '../services/storyService';

export const AdminStories: React.FC = () => {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<StoryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    year: '2026',
    description: '',
    storyContent: '',
    image: '/images/requin_software_team_1790576614688.jpg',
    galleryImages: '',
    displayOrder: 1,
    status: 'PUBLISHED' as 'DRAFT' | 'PUBLISHED',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await storyService.getAllStories();
      if (res.data) setStories(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      handleOpenCreate();
    }
  }, [searchParams]);

  const handleOpenCreate = () => {
    setEditingStory(null);
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      description: '',
      storyContent: '',
      image: '/images/digital_agency_office_1790576645354.jpg',
      galleryImages: '',
      displayOrder: stories.length + 1,
      status: 'PUBLISHED',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (story: StoryItem) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      year: story.year,
      description: story.description,
      storyContent: story.storyContent || story.description,
      image: story.image,
      galleryImages: story.galleryImages ? story.galleryImages.join(', ') : '',
      displayOrder: story.displayOrder,
      status: story.status,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.year) {
      setFormError('Title, year, and description are required.');
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    const payload = {
      ...formData,
      galleryImages: formData.galleryImages.split(',').map((g) => g.trim()).filter(Boolean),
      displayOrder: Number(formData.displayOrder) || 1,
    };

    try {
      if (editingStory) {
        await storyService.updateStory(editingStory.id, payload);
      } else {
        await storyService.createStory(payload);
      }
      setIsModalOpen(false);
      fetchStories();
    } catch (err: any) {
      setFormError(err.message || 'Error saving story milestone.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleTogglePublish = async (story: StoryItem) => {
    try {
      await storyService.togglePublishStory(story.id);
      fetchStories();
    } catch (err: any) {
      alert(err.message || 'Failed to update story status.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await storyService.deleteStory(id);
      setDeleteConfirmId(null);
      fetchStories();
    } catch (err: any) {
      alert(err.message || 'Failed to delete milestone.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Our Stories & Milestones
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage the timeline milestones, images, and content displayed in the "Our Story" section.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all shadow-md shadow-[#08B9E8]/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Story Milestone</span>
        </button>
      </div>

      {/* Stories Timeline Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <Loader2 className="w-8 h-8 text-[#08B9E8] animate-spin mx-auto mb-2" />
            <p className="text-xs font-medium">Fetching milestones from database...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No story milestones found</p>
            <p className="text-xs text-slate-400 mt-1">Add your founding history and major milestones.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {stories.map((story) => (
              <div
                key={story.id}
                className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative shrink-0">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-xs"
                    />
                    <span className="absolute -top-2 -left-2 px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold font-mono">
                      {story.year}
                    </span>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">
                        Order #{story.displayOrder}
                      </span>
                      <span className="text-slate-300">·</span>
                      <h4 className="text-base font-bold text-slate-900 leading-tight">
                        {story.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {story.description}
                    </p>

                    {story.storyContent && story.storyContent !== story.description && (
                      <p className="text-xs text-slate-400 italic line-clamp-1">
                        Extended: "{story.storyContent}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleTogglePublish(story)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      story.status === 'PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    {story.status === 'PUBLISHED' ? (
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

                  <button
                    onClick={() => handleOpenEdit(story)}
                    className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit Story"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(story.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Story"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Story Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 text-left overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-100 shrink-0 bg-white z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {editingStory ? 'Edit Story Milestone' : 'Add Story Milestone'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Updates will appear live in the public Our Story timeline.
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
            <form onSubmit={handleSaveStory} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Milestone Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Jaipur Roots & Founding Vision"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Year *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="2019"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Featured Image URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/digital_agency_office_1790576645354.jpg"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Milestone Description *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief 1-2 sentence overview for the timeline card..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#08B9E8]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Detailed Story Narrative (Extended content)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.storyContent}
                      onChange={(e) => setFormData({ ...formData, storyContent: e.target.value })}
                      placeholder="In-depth narrative of this milestone in the company journey..."
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-[#08B9E8]"
                    >
                      <option value="PUBLISHED">PUBLISHED (Visible in timeline)</option>
                      <option value="DRAFT">DRAFT (Hidden)</option>
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
                  <span>{editingStory ? 'Save Milestone' : 'Add Milestone'}</span>
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
              <h3 className="text-lg font-bold text-slate-900">Delete Story Milestone</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Are you sure you want to delete this story milestone? It will be permanently removed from the database and timeline.
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
    </div>
  );
};
