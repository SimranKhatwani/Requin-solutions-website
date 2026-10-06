import { TestimonialModel } from '../models/testimonial.model';
import { ActivityModel } from '../models/activity.model';
import { TestimonialDoc } from '../types';

export const TestimonialService = {
  getPublished(): TestimonialDoc[] {
    return TestimonialModel.findPublished();
  },

  getAll(): TestimonialDoc[] {
    return TestimonialModel.findAll();
  },

  create(data: Partial<TestimonialDoc>, adminEmail: string): TestimonialDoc | { error: string; status: number } {
    const { name, role, location, quote, image, isHighlighted, status, displayOrder } = data;

    if (!name || !quote || !role) {
      return { error: 'Client name, role, and quote are required.', status: 400 };
    }

    const all = TestimonialModel.findAll();
    const newTestimonial: TestimonialDoc = {
      id: `test-${Date.now()}`,
      name,
      role,
      location: location || '',
      quote,
      image: image || '/images/testimonials/avatar-1.jpg',
      isHighlighted: Boolean(isHighlighted),
      status: status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
      displayOrder: typeof displayOrder === 'number' ? displayOrder : all.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    TestimonialModel.create(newTestimonial);
    ActivityModel.add(`Added client testimonial from "${newTestimonial.name}"`, 'testimonial', newTestimonial.name, adminEmail);
    return newTestimonial;
  },

  update(id: string, data: Partial<TestimonialDoc>, adminEmail: string): TestimonialDoc | { error: string; status: number } {
    const prev = TestimonialModel.findById(id);
    if (!prev) {
      return { error: 'Testimonial not found.', status: 404 };
    }

    const { name, role, location, quote, image, isHighlighted, status, displayOrder } = data;

    const updated = TestimonialModel.update(id, {
      name: name ?? prev.name,
      role: role ?? prev.role,
      location: location ?? prev.location,
      quote: quote ?? prev.quote,
      image: image ?? prev.image,
      isHighlighted: isHighlighted !== undefined ? Boolean(isHighlighted) : prev.isHighlighted,
      status: status ?? prev.status,
      displayOrder: typeof displayOrder === 'number' ? displayOrder : prev.displayOrder,
    });

    if (updated) {
      ActivityModel.add(`Updated testimonial for "${updated.name}"`, 'testimonial', updated.name, adminEmail);
      return updated;
    }

    return { error: 'Failed to update testimonial.', status: 500 };
  },

  delete(id: string, adminEmail: string): TestimonialDoc | { error: string; status: number } {
    const deleted = TestimonialModel.delete(id);
    if (!deleted) {
      return { error: 'Testimonial not found.', status: 404 };
    }
    ActivityModel.add(`Deleted testimonial from "${deleted.name}"`, 'testimonial', deleted.name, adminEmail);
    return deleted;
  },
};
