import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { REQUIN_COMPANY_INFO, REQUIN_SERVICES } from '../data/requinData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#F5F9FC] text-[#0B1726] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Large Heading, Message, Contact Info & Office Image */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#08B9E8] uppercase mb-3">
                Connect With Us
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1726] tracking-[-0.03em] leading-tight">
                Let's Build Something Exceptional Together.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-[1.65]">
                Whether you have an upcoming product launch, require enterprise software modernization, or wish to explore cloud infrastructure, our software architects are ready to collaborate.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Jaipur Headquarters
                  </div>
                  <div className="text-sm font-semibold text-[#0B1726] mt-0.5">
                    {REQUIN_COMPANY_INFO.headquarters}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Direct Email
                  </div>
                  <div className="text-sm font-semibold text-[#0B1726] mt-0.5">
                    <a href={`mailto:${REQUIN_COMPANY_INFO.emails.general}`} className="hover:text-[#08B9E8] transition-colors">
                      {REQUIN_COMPANY_INFO.emails.general}
                    </a>
                    <span className="text-slate-400 mx-2">·</span>
                    <a href={`mailto:${REQUIN_COMPANY_INFO.emails.careers}`} className="hover:text-[#08B9E8] transition-colors">
                      {REQUIN_COMPANY_INFO.emails.careers}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#08B9E8] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Phone Consultation
                  </div>
                  <div className="text-sm font-semibold text-[#0B1726] mt-0.5">
                    <span>{REQUIN_COMPANY_INFO.phones.primary}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Photography Visual */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md relative h-56 w-full">
              <img
                src="/images/digital_agency_office_1790576645354.jpg"
                alt="Requin Solutions Studio Space"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-semibold">
                Requin Solutions Engineering Studio · Malviya Nagar
              </div>
            </div>
          </div>

          {/* RIGHT: Beautiful Clean White Contact Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xl text-left">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B1726]">
                      Schedule a Consultation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Fill out this quick form and our lead architect will reach out within 24 hours.
                    </p>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 / +1 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Service Requirement
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all"
                    >
                      {REQUIN_SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Requin Ops / AMS Demo">Requin Ops / AMS Product Demo</option>
                      <option value="Other Consulting">General Software Consulting</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Project Brief or Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe your objectives, timelines, or technology requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-md shadow-[#08B9E8]/20 focus:outline-none active:scale-[0.99] disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending Request...' : 'Send Consultation Inquiry'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1726]">
                    Thank You, {formData.name || 'Partner'}!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Your inquiry has been routed to our lead engineering team. We will review your requirements and respond at <span className="font-semibold text-[#0B1726]">{formData.email}</span> within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', service: 'Web Development', message: '' });
                      }}
                      className="text-xs font-semibold text-[#08B9E8] hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
