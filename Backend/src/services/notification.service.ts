import { InquiryModel } from '../models/inquiry.model';
import { generateGeminiReply } from '../utils/gemini';
import { SubscriberDoc, SupportInquiryDoc } from '../types';

export const NotificationService = {
  submitSupportInquiry(data: { name: string; email: string; message: string }): SupportInquiryDoc | { error: string; status: number } {
    const { name, email, message } = data;
    if (!name || !email || !message) {
      return { error: 'Name, email, and message are required.', status: 400 };
    }

    const inquiry: SupportInquiryDoc = {
      id: `inquiry-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      targetEmail: 'requingroupsolutions@gmail.com',
      createdAt: new Date().toISOString(),
    };

    InquiryModel.createSupportInquiry(inquiry);
    console.log(`[Support Request Logged] Forwarding to: requingroupsolutions@gmail.com | From: ${name} (${email}) | Message: ${message}`);
    return inquiry;
  },

  subscribeNewsletter(email: string, source?: string): { subscriber: SubscriberDoc; isNew: boolean } | { error: string; status: number } {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return { error: 'A valid email address is required.', status: 400 };
    }

    const cleanEmail = email.trim().toLowerCase();
    const subscriber: SubscriberDoc = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      source: typeof source === 'string' ? source : 'Website Footer Newsletter Form',
      targetEmail: 'requingroupsolutions@gmail.com',
      createdAt: new Date().toISOString(),
    };

    const res = InquiryModel.createOrGetSubscriber(subscriber);
    console.log(`[Newsletter Subscription] Forwarding to: requingroupsolutions@gmail.com | Subscriber: ${cleanEmail}`);
    return res;
  },

  getAllSubscribers(): SubscriberDoc[] {
    return InquiryModel.getAllSubscribers();
  },

  async handleChat(message: string): Promise<{ success: boolean; source: string; model?: string; reply: string | null }> {
    if (!message || typeof message !== 'string') {
      return { success: false, source: 'invalid_input', reply: null };
    }

    try {
      const { reply, model } = await generateGeminiReply(message);
      if (reply) {
        return { success: true, source: 'gemini', model, reply };
      }
      return { success: true, source: 'fallback', reply: null };
    } catch (err) {
      console.error('Chat processing error:', err);
      return { success: true, source: 'fallback', reply: null };
    }
  },
};
