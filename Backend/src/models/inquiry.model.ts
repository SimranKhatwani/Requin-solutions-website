import { CMSStore } from '../config/db';
import { SubscriberDoc, SupportInquiryDoc } from '../types';

export const InquiryModel = {
  createSupportInquiry(inquiry: SupportInquiryDoc): SupportInquiryDoc {
    const db = CMSStore.get();
    if (!db.supportInquiries) db.supportInquiries = [];
    db.supportInquiries.push(inquiry);
    CMSStore.save(db);
    return inquiry;
  },

  createOrGetSubscriber(subscriber: SubscriberDoc): { subscriber: SubscriberDoc; isNew: boolean } {
    const db = CMSStore.get();
    if (!db.subscribers) db.subscribers = [];

    const existing = db.subscribers.find(
      (s) => s.email.toLowerCase() === subscriber.email.toLowerCase()
    );

    if (existing) {
      return { subscriber: existing, isNew: false };
    }

    db.subscribers.push(subscriber);
    CMSStore.save(db);
    return { subscriber, isNew: true };
  },

  getAllSubscribers(): SubscriberDoc[] {
    const db = CMSStore.get();
    return db.subscribers || [];
  },
};
