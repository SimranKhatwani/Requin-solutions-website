import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Clock,
  Calendar,
  Facebook,
  Linkedin,
  Instagram
} from 'lucide-react';
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
    <section
      id="contact"
      className="pt-12 sm:pt-16 md:pt-18 pb-20 sm:pb-24 md:pb-28 bg-[#F5FAFD] text-[#0B1726] relative overflow-hidden selection:bg-[#08B9E8]/20 selection:text-[#08B9E8]"
    >
      {/* Background Technology-Inspired Ambience & Keyframe Animations */}
      <style>{`
        @keyframes contactAmbientFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-10px, -8px) scale(1.03);
          }
        }
        @keyframes contactNetworkPulse {
          0%, 100% {
            opacity: 0.65;
          }
          50% {
            opacity: 0.95;
          }
        }
        @keyframes contactWaveFloat {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25px);
          }
        }
        .animate-contact-ambient-float {
          animation: contactAmbientFloat 16s ease-in-out infinite;
        }
        .animate-contact-network-pulse {
          animation: contactNetworkPulse 12s ease-in-out infinite;
        }
        .animate-contact-wave-float {
          animation: contactWaveFloat 20s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-contact-ambient-float,
          .animate-contact-network-pulse,
          .animate-contact-wave-float {
            animation: none !important;
          }
        }
      `}</style>

      {/* ========================================================
          BACKGROUND LAYER 1: Soft Ambient Radial Gradients
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left Ambient Cyan Glow */}
        <div className="absolute -top-24 -left-24 w-[650px] h-[500px] bg-[radial-gradient(circle_at_30%_30%,rgba(8,185,232,0.08),transparent_65%)] blur-3xl animate-contact-ambient-float" />
        
        {/* Top-Right Soft Blue/Cyan Glow */}
        <div className="absolute -top-16 -right-16 w-[600px] h-[450px] bg-[radial-gradient(circle_at_70%_30%,rgba(0,194,255,0.07),transparent_65%)] blur-3xl animate-contact-ambient-float" style={{ animationDelay: '-6s' }} />
        
        {/* Bottom-Left Ambient Cyan Glow */}
        <div className="absolute -bottom-20 -left-12 w-[550px] h-[450px] bg-[radial-gradient(circle_at_40%_70%,rgba(8,185,232,0.06),transparent_65%)] blur-3xl animate-contact-ambient-float" style={{ animationDelay: '-10s' }} />
        
        {/* Bottom-Right Subtle Blue Glow */}
        <div className="absolute -bottom-20 -right-12 w-[600px] h-[480px] bg-[radial-gradient(circle_at_70%_70%,rgba(2,132,199,0.05),transparent_65%)] blur-3xl animate-contact-ambient-float" style={{ animationDelay: '-3s' }} />

        {/* Center subtle light depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] pointer-events-none" />
      </div>

      {/* ========================================================
          BACKGROUND LAYER 2: Digital Network & Flowing Lines Pattern
      ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-contact-network-pulse"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="contactNetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.07" />
          </linearGradient>

          <filter id="contactNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* TOP-LEFT NETWORK CONSTELLATION */}
        <g stroke="url(#contactNetGrad)" strokeWidth="1" fill="none">
          <line x1="4%" y1="8%" x2="11%" y2="16%" />
          <line x1="11%" y1="16%" x2="7%" y2="28%" />
          <line x1="11%" y1="16%" x2="18%" y2="20%" />
          <line x1="18%" y1="20%" x2="15%" y2="34%" />
          <line x1="7%" y1="28%" x2="15%" y2="34%" />
          <line x1="18%" y1="20%" x2="25%" y2="12%" />
          <line x1="4%" y1="8%" x2="2%" y2="22%" />
          <line x1="2%" y1="22%" x2="7%" y2="28%" />
        </g>
        <g fill="#08B9E8">
          <circle cx="4%" cy="8%" r="3" fillOpacity="0.3" />
          <circle cx="4%" cy="8%" r="1.5" fillOpacity="0.7" />
          <circle cx="11%" cy="16%" r="4" fillOpacity="0.25" filter="url(#contactNodeGlow)" />
          <circle cx="11%" cy="16%" r="2" fillOpacity="0.8" />
          <circle cx="7%" cy="28%" r="3" fillOpacity="0.3" />
          <circle cx="18%" cy="20%" r="3.5" fillOpacity="0.3" />
          <circle cx="18%" cy="20%" r="1.5" fillOpacity="0.8" />
          <circle cx="15%" cy="34%" r="2.5" fillOpacity="0.4" />
          <circle cx="25%" cy="12%" r="3" fillOpacity="0.25" />
          <circle cx="2%" cy="22%" r="2" fillOpacity="0.3" />
        </g>

        {/* TOP-RIGHT NETWORK CONSTELLATION */}
        <g stroke="url(#contactNetGrad)" strokeWidth="1" fill="none">
          <line x1="96%" y1="10%" x2="88%" y2="18%" />
          <line x1="88%" y1="18%" x2="92%" y2="30%" />
          <line x1="88%" y1="18%" x2="80%" y2="22%" />
          <line x1="80%" y1="22%" x2="84%" y2="36%" />
          <line x1="92%" y1="30%" x2="84%" y2="36%" />
          <line x1="80%" y1="22%" x2="74%" y2="14%" />
          <line x1="96%" y1="10%" x2="98%" y2="25%" />
          <line x1="98%" y1="25%" x2="92%" y2="30%" />
        </g>
        <g fill="#00c2ff">
          <circle cx="96%" cy="10%" r="3" fillOpacity="0.3" />
          <circle cx="96%" cy="10%" r="1.5" fillOpacity="0.7" />
          <circle cx="88%" cy="18%" r="4" fillOpacity="0.25" filter="url(#contactNodeGlow)" />
          <circle cx="88%" cy="18%" r="2" fillOpacity="0.8" />
          <circle cx="92%" cy="30%" r="3" fillOpacity="0.3" />
          <circle cx="80%" cy="22%" r="3.5" fillOpacity="0.3" />
          <circle cx="80%" cy="22%" r="1.5" fillOpacity="0.8" />
          <circle cx="84%" cy="36%" r="2.5" fillOpacity="0.4" />
          <circle cx="74%" cy="14%" r="3" fillOpacity="0.25" />
          <circle cx="98%" cy="25%" r="2" fillOpacity="0.3" />
        </g>

        {/* BOTTOM-LEFT & BOTTOM-RIGHT CORNER NODES */}
        <g stroke="url(#contactNetGrad)" strokeWidth="1" fill="none">
          <line x1="3%" y1="78%" x2="9%" y2="88%" />
          <line x1="9%" y1="88%" x2="16%" y2="82%" />
          <line x1="97%" y1="76%" x2="91%" y2="86%" />
          <line x1="91%" y1="86%" x2="83%" y2="80%" />
        </g>
        <g fill="#08B9E8">
          <circle cx="3%" cy="78%" r="2.5" fillOpacity="0.3" />
          <circle cx="9%" cy="88%" r="3" fillOpacity="0.25" />
          <circle cx="16%" cy="82%" r="2" fillOpacity="0.4" />
          <circle cx="97%" cy="76%" r="2.5" fillOpacity="0.3" />
          <circle cx="91%" cy="86%" r="3" fillOpacity="0.25" />
          <circle cx="83%" cy="80%" r="2" fillOpacity="0.4" />
        </g>
      </svg>

      {/* ========================================================
          BACKGROUND LAYER 3: Subtle Flowing Wave Curves (Near Bottom)
      ======================================================== */}
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-0 overflow-hidden opacity-60 animate-contact-wave-float">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          <path
            d="M-50,130 C220,70 540,170 880,100 C1180,40 1350,140 1500,90"
            stroke="#08B9E8"
            strokeWidth="1.2"
            strokeOpacity="0.07"
            strokeDasharray="5 7"
          />
          <path
            d="M-50,165 C300,110 650,200 1000,125 C1300,65 1420,150 1500,120"
            stroke="#00c2ff"
            strokeWidth="1"
            strokeOpacity="0.05"
          />
        </svg>
      </div>

      {/* ========================================================
          MAIN CONTENT LAYER (relative z-10)
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP: Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] text-[#08B9E8] uppercase mb-3">
            Connect With Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1726] tracking-[-0.03em] leading-tight">
            Let's Build Something Exceptional Together.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-[1.65]">
            Whether you have an upcoming product launch, require enterprise software modernization, or wish to explore cloud infrastructure, our software architects are ready to collaborate.
          </p>
        </div>

        {/* 3 INFO CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16 items-stretch">
          
          {/* Card 1: Phone Consultation */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] text-[#08B9E8] flex items-center justify-center mb-6 shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1726] mb-2">
                Phone Consultation
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Our support team is ready to assist you with any queries
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <a
                href={`tel:${REQUIN_COMPANY_INFO.phones.primary}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#08B9E8] hover:text-[#0693ba] transition-colors group"
              >
                <span>{REQUIN_COMPANY_INFO.phones.primary}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Card 2: Direct Email */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] text-[#08B9E8] flex items-center justify-center mb-6 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1726] mb-2">
                Direct Email
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Get in touch via email for inquiries and collaborations
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <div>
                <a
                  href={`mailto:${REQUIN_COMPANY_INFO.emails.general}`}
                  className="text-sm font-semibold text-[#08B9E8] hover:text-[#0693ba] hover:underline transition-colors block"
                >
                  {REQUIN_COMPANY_INFO.emails.general}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${REQUIN_COMPANY_INFO.emails.careers}`}
                  className="text-sm font-semibold text-[#08B9E8] hover:text-[#0693ba] hover:underline transition-colors block"
                >
                  {REQUIN_COMPANY_INFO.emails.careers}
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Jaipur Headquarters */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8F7FC] text-[#08B9E8] flex items-center justify-center mb-6 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1726] mb-2">
                Jaipur Headquarters
              </h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                Our headquarters is located at
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-sm font-medium text-[#0B1726] leading-relaxed">
                {REQUIN_COMPANY_INFO.headquarters}
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM: 2 COLUMNS (Contact Form on Left, Map & Business Hours on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT: Contact Form Card */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xl text-left h-full flex flex-col justify-between flex-1">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1726]">
                      Schedule a Consultation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                      Fill out this quick form and our lead architect will reach out within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-5 flex-1 flex flex-col justify-between">
                    {/* Name Field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alexander Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all shadow-sm"
                      />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 / +1 ..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Service Requirement
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all shadow-sm"
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
                    <div className="flex-1 flex flex-col">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Project Brief or Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Briefly describe your objectives, timelines, or technology requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full flex-1 min-h-[120px] px-4 py-3.5 rounded-xl bg-[#F5F9FC] border border-slate-200 text-sm text-[#0B1726] placeholder:text-slate-400 focus:outline-none focus:border-[#08B9E8] focus:bg-white transition-all resize-none shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold text-sm text-[#071827] bg-[#08B9E8] hover:bg-[#4DD4F5] transition-all duration-200 shadow-md shadow-[#08B9E8]/20 focus:outline-none active:scale-[0.99] disabled:opacity-50 hover:shadow-lg"
                    >
                      <span>{isSubmitting ? 'Sending Request...' : 'Send Consultation Inquiry'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="py-16 text-center space-y-5 my-auto">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1726]">
                    Thank You, {formData.name || 'Partner'}!
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Your inquiry has been routed to our lead engineering team. We will review your requirements and respond at <span className="font-semibold text-[#0B1726]">{formData.email}</span> within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', service: 'Web Development', message: '' });
                      }}
                      className="text-sm font-semibold text-[#08B9E8] hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Map, Business Hours & Socials Card */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl text-left h-full flex flex-col justify-between">
              {/* Top Map Stage */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100 shrink-0">
                <iframe
                  title="Requin Solutions Headquarters Map"
                  src="https://maps.google.com/maps?q=Requin+Solutions+Pvt+Ltd,+Sector+6,+Malviya+Nagar,+Jaipur,+Rajasthan+302017&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating "Open in Maps" button */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Requin+Solutions+Pvt+Ltd+Sector+6+Malviya+Nagar+Jaipur+Rajasthan+302017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[#08B9E8] hover:text-[#0693ba] hover:bg-white text-xs font-bold shadow-md transition-all hover:scale-105"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Subtle bottom wave overlay */}
                <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none z-10 pointer-events-none">
                  <svg viewBox="0 0 500 40" preserveAspectRatio="none" className="w-full h-7 text-white fill-current">
                    <path d="M0,20 C150,40 350,0 500,20 L500,40 L0,40 Z" />
                  </svg>
                </div>
              </div>

              {/* Bottom Details: Business Hours & Socials */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#0B1726] mb-4">
                    Business Hours
                  </h4>

                  <div className="space-y-4">
                    {/* Weekdays */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#E8F7FC] text-[#08B9E8] flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0B1726]">
                          Weekdays
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 font-medium">
                          10:00 AM - 7:00 PM
                        </div>
                      </div>
                    </div>

                    {/* Weekends */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#E8F7FC] text-[#08B9E8] flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0B1726]">
                          Weekends
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 font-medium">
                          Sunday: Closed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider & Socials */}
                <div className="border-t border-slate-100 pt-5">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Follow Requin Solutions
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/requin_solutions/"
                      target="_blank"
                      rel="noopener"
                      aria-label="Follow Requin Solutions on Facebook"
                      className="w-10 h-10 rounded-full bg-[#E8F7FC] text-[#08B9E8] hover:bg-[#08B9E8] hover:text-white transition-all flex items-center justify-center shadow-sm hover:scale-105"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>

                    {/* X / Twitter */}
                    <a
                      href="https://x.com/requinsolutions"
                      target="_blank"
                      rel="noopener"
                      aria-label="Follow Requin Solutions on X"
                      className="w-10 h-10 rounded-full bg-[#E8F7FC] text-[#08B9E8] hover:bg-[#08B9E8] hover:text-white transition-all flex items-center justify-center shadow-sm hover:scale-105"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/company/requin-solutions-pvt-ltdd/"
                      target="_blank"
                      rel="noopener"
                      aria-label="Follow Requin Solutions on LinkedIn"
                      className="w-10 h-10 rounded-full bg-[#E8F7FC] text-[#08B9E8] hover:bg-[#08B9E8] hover:text-white transition-all flex items-center justify-center shadow-sm hover:scale-105"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/requin_solutions/"
                      target="_blank"
                      rel="noopener"
                      aria-label="Follow Requin Solutions on Instagram"
                      className="w-10 h-10 rounded-full bg-[#E8F7FC] text-[#08B9E8] hover:bg-[#08B9E8] hover:text-white transition-all flex items-center justify-center shadow-sm hover:scale-105"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

