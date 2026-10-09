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
  Linkedin,
  Instagram,
  MessageSquareText
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
      className="pt-14 sm:pt-18 md:pt-20 pb-20 sm:pb-24 md:pb-28 bg-[#F5FAFD] text-[#0B1726] relative overflow-hidden selection:bg-[#0088EE]/20 selection:text-[#0088EE]"
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
        <div className="absolute -top-24 -left-24 w-[650px] h-[500px] bg-[radial-gradient(circle_at_30%_30%,rgba(0,136,238,0.08),transparent_65%)] blur-3xl animate-contact-ambient-float" />
        
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
            <stop offset="0%" stopColor="#0088EE" stopOpacity="0.08" />
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
        <g fill="#0088EE">
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
        <g fill="#0088EE">
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
            stroke="#0088EE"
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
        
        {/* TOP: Centered Header with Enhanced Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0088EE]/10 border border-[#0088EE]/20 text-[#0088EE] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0088EE] animate-pulse" />
            Connect With Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-[1.15]">
            Let's Build Something <span className="bg-gradient-to-r from-[#0088EE] via-[#00A3FF] to-[#08B9E8] bg-clip-text text-transparent">Exceptional</span> Together.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Whether you have an upcoming product launch, require enterprise software modernization, or wish to explore cloud infrastructure, our software architects are ready to collaborate.
          </p>
        </div>

        {/* 3 INFO CARDS ROW: Balanced Spacing & Polished Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-12 items-stretch">
          
          {/* Card 1: Phone Consultation */}
          <div className="group bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-md hover:shadow-xl hover:border-[#0088EE]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1726] mb-2 group-hover:text-[#0088EE] transition-colors">
                Phone Consultation
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Our support team is ready to assist you with any queries
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <a
                href={`tel:${REQUIN_COMPANY_INFO.phones.primary}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0088EE] hover:text-[#0066CC] transition-colors"
              >
                <span>{REQUIN_COMPANY_INFO.phones.primary}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Card 2: Direct Email */}
          <div className="group bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-md hover:shadow-xl hover:border-[#0088EE]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1726] mb-2 group-hover:text-[#0088EE] transition-colors">
                Direct Email
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Get in touch via email for inquiries and collaborations
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 space-y-1.5">
              <div>
                <a
                  href={`mailto:${REQUIN_COMPANY_INFO.emails.general}`}
                  className="text-sm font-semibold text-[#0088EE] hover:text-[#0066CC] hover:underline transition-colors block"
                >
                  {REQUIN_COMPANY_INFO.emails.general}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${REQUIN_COMPANY_INFO.emails.careers}`}
                  className="text-sm font-semibold text-[#0088EE] hover:text-[#0066CC] hover:underline transition-colors block"
                >
                  {REQUIN_COMPANY_INFO.emails.careers}
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Jaipur Headquarters */}
          <div className="group bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-md hover:shadow-xl hover:border-[#0088EE]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1726] mb-2 group-hover:text-[#0088EE] transition-colors">
                Jaipur Headquarters
              </h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                Our headquarters is located at
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm font-medium text-[#0B1726] leading-relaxed">
                {REQUIN_COMPANY_INFO.headquarters}
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM: 2 COLUMNS (Prominent Form on Left, Map & Hours on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
          
          {/* LEFT: Prominent Consultation Form Card */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,136,238,0.12),0_10px_30px_-10px_rgba(15,23,42,0.06)] p-7 sm:p-10 text-left h-full flex flex-col justify-between flex-1 relative overflow-hidden">
              
              {/* Top vibrant brand gradient accent line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0088EE] via-[#00C2FF] to-[#08B9E8]" />

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
                  
                  {/* Clean Form Header */}
                  <div className="border-b border-slate-100 pb-5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0088EE] uppercase tracking-wider mb-2">
                      <MessageSquareText className="w-3.5 h-3.5" />
                      Direct Project Inquiry
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1726] tracking-tight">
                      Schedule a Consultation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                      Fill out this quick form and our lead architect will reach out within 24 hours.
                    </p>
                  </div>

                  {/* Form Inputs Container */}
                  <div className="space-y-5 flex-1 flex flex-col justify-between">
                    
                    {/* Name Field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Full Name <span className="text-[#0088EE]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alexander Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-sm text-[#0B1726] font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#0088EE] focus:ring-4 focus:ring-[#0088EE]/10 focus:bg-white transition-all shadow-sm"
                      />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Work Email <span className="text-[#0088EE]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-sm text-[#0B1726] font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#0088EE] focus:ring-4 focus:ring-[#0088EE]/10 focus:bg-white transition-all shadow-sm"
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
                          className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-sm text-[#0B1726] font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#0088EE] focus:ring-4 focus:ring-[#0088EE]/10 focus:bg-white transition-all shadow-sm"
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
                        className="w-full px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-sm text-[#0B1726] font-medium focus:outline-none focus:border-[#0088EE] focus:ring-4 focus:ring-[#0088EE]/10 focus:bg-white transition-all shadow-sm cursor-pointer"
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
                        Project Brief or Message <span className="text-[#0088EE]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Briefly describe your objectives, timelines, or technology requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full flex-1 min-h-[120px] px-4 py-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-sm text-[#0B1726] font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#0088EE] focus:ring-4 focus:ring-[#0088EE]/10 focus:bg-white transition-all resize-none shadow-sm"
                      />
                    </div>
                  </div>

                  {/* High-Impact Visual CTA Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#0088EE] via-[#0099FF] to-[#08B9E8] hover:from-[#0077CC] hover:via-[#0088EE] hover:to-[#00A8D8] shadow-[0_10px_25px_-5px_rgba(0,136,238,0.45)] hover:shadow-[0_15px_35px_-5px_rgba(0,136,238,0.6)] focus:outline-none focus:ring-4 focus:ring-[#0088EE]/30 active:scale-[0.99] disabled:opacity-60 transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      {/* Subtle shimmer hover animation */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                      
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="tracking-wide">Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span className="tracking-wide">Send Consultation Inquiry</span>
                          <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="py-16 text-center space-y-5 my-auto">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1726]">
                    Thank You, {formData.name || 'Partner'}!
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Your inquiry has been routed to our lead engineering team. We will review your requirements and respond at <span className="font-semibold text-[#0088EE]">{formData.email}</span> within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', service: 'Web Development', message: '' });
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0088EE] hover:text-[#0066CC] hover:underline transition-colors"
                    >
                      <span>Send another message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Aligned Map, Business Hours & Socials Card */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 text-left h-full flex flex-col justify-between">
              
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
                  className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-[#0088EE] hover:text-[#0066CC] hover:bg-white text-xs font-bold shadow-md transition-all hover:scale-105"
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
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 flex items-center justify-center shrink-0">
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
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 flex items-center justify-center shrink-0">
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
                    {/* Justdial */}
                    <a
                      href="https://www.justdial.com/Jaipur/Requin-Solutions-Pvt-Ltd-NWR-Office-Malviya-Nagar/0141PX141-X141-220903235425-A6N3_BZDET"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Justdial"
                      aria-label="View Requin Solutions on Justdial"
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 hover:bg-[#0088EE] hover:text-white hover:border-[#0088EE] transition-all flex items-center justify-center shadow-sm hover:scale-105 font-black text-xs tracking-tighter"
                    >
                      JD
                    </a>

                    {/* IndiaMART */}
                    <a
                      href="https://www.indiamart.com/requin-solutions/?srsltid=AU7gw4W3xlGF3Dt7QtSFYWebQsTpKVdGYCHUi335idgbnklQFUuYTALw"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="IndiaMART"
                      aria-label="View Requin Solutions on IndiaMART"
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 hover:bg-[#0088EE] hover:text-white hover:border-[#0088EE] transition-all flex items-center justify-center shadow-sm hover:scale-105"
                    >
                      <svg
                        viewBox="0 0 300 300"
                        fill="currentColor"
                        fillRule="evenodd"
                        className="w-4 h-4 transition-colors"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M 95.0 47.5 L 94.8 50.9 L 94.0 54.3 L 92.9 57.5 L 91.3 60.4 L 89.3 63.0 L 87.0 65.2 L 84.4 66.9 L 81.6 68.2 L 78.7 68.8 L 75.8 69.0 L 72.8 68.6 L 69.9 67.6 L 67.2 66.1 L 64.8 64.2 L 62.7 61.8 L 60.9 59.0 L 59.5 55.9 L 58.5 52.6 L 58.1 49.2 L 58.1 45.8 L 58.5 42.4 L 59.5 39.1 L 60.9 36.0 L 62.7 33.2 L 64.8 30.8 L 67.2 28.9 L 69.9 27.4 L 72.8 26.4 L 75.8 26.0 L 78.7 26.2 L 81.6 26.8 L 84.4 28.1 L 87.0 29.8 L 89.3 32.0 L 91.3 34.6 L 92.9 37.5 L 94.0 40.7 L 94.8 44.1 L 95.0 47.5 Z M 216.5 46.5 L 216.2 51.9 L 215.1 57.1 L 213.4 62.1 L 211.1 66.6 L 208.2 70.7 L 204.8 74.1 L 201.1 76.8 L 197.0 78.7 L 192.8 79.8 L 188.4 80.0 L 184.1 79.3 L 179.9 77.8 L 176.0 75.5 L 172.4 72.4 L 169.3 68.7 L 166.7 64.4 L 164.7 59.6 L 163.3 54.5 L 162.6 49.2 L 162.6 43.8 L 163.3 38.5 L 164.7 33.4 L 166.7 28.6 L 169.3 24.3 L 172.4 20.6 L 176.0 17.5 L 179.9 15.2 L 184.1 13.7 L 188.4 13.0 L 192.8 13.2 L 197.0 14.3 L 201.1 16.2 L 204.8 18.9 L 208.2 22.3 L 211.1 26.4 L 213.4 30.9 L 215.1 35.9 L 216.2 41.1 L 216.5 46.5 Z M 182.3 299.0 L 176.0 298.5 L 170.0 297.7 L 163.0 297.3 L 157.0 296.5 L 151.0 295.3 L 146.0 293.7 L 140.0 292.4 L 134.5 291.0 L 129.0 289.5 L 124.0 287.7 L 118.5 286.0 L 113.5 284.0 L 108.5 282.0 L 106.7 281.0 L 101.5 279.0 L 97.0 276.7 L 92.0 274.3 L 87.9 272.0 L 83.0 269.4 L 78.6 267.0 L 74.7 264.0 L 71.0 260.8 L 66.0 258.3 L 62.3 255.0 L 58.0 252.5 L 54.5 249.0 L 50.5 246.0 L 47.0 242.5 L 43.5 239.0 L 40.0 235.5 L 36.5 232.0 L 33.3 228.0 L 30.3 224.0 L 27.3 220.0 L 24.5 216.0 L 21.7 212.0 L 19.0 207.5 L 16.7 203.0 L 14.3 198.0 L 12.0 193.5 L 10.3 188.0 L 8.3 183.0 L 6.5 178.0 L 5.3 172.0 L 4.0 166.5 L 3.5 160.0 L 3.5 153.0 L 3.5 146.0 L 4.7 140.0 L 6.3 135.0 L 8.0 129.5 L 10.0 124.5 L 12.5 120.0 L 15.0 115.6 L 18.0 111.5 L 21.3 108.0 L 24.5 104.0 L 28.0 100.7 L 32.0 97.5 L 36.0 94.7 L 40.0 91.7 L 45.0 89.3 L 49.4 87.0 L 54.0 84.7 L 59.0 82.5 L 64.0 80.7 L 69.5 79.0 L 75.0 77.7 L 81.0 76.5 L 87.0 75.5 L 93.0 74.5 L 100.0 74.5 L 106.0 73.5 L 113.0 73.5 L 120.0 73.5 L 126.0 74.5 L 133.0 74.5 L 139.0 75.5 L 145.0 76.5 L 151.0 77.5 L 157.0 78.7 L 162.0 80.3 L 168.0 81.5 L 173.0 83.3 L 178.5 85.0 L 183.5 87.0 L 189.0 88.7 L 194.0 90.7 L 199.0 92.7 L 203.5 95.0 L 208.0 97.3 L 213.0 99.7 L 217.0 102.3 L 221.6 105.0 L 226.0 107.5 L 230.0 110.3 L 234.4 113.0 L 238.4 116.0 L 242.4 119.0 L 246.0 122.3 L 250.0 125.5 L 253.5 129.0 L 257.0 132.5 L 260.5 136.0 L 264.0 139.5 L 267.5 143.0 L 270.5 147.0 L 273.5 151.0 L 276.3 155.0 L 279.0 159.4 L 281.7 164.0 L 284.3 168.0 L 286.5 173.0 L 288.5 178.0 L 290.5 183.0 L 292.3 188.0 L 293.5 194.0 L 295.0 199.5 L 296.3 205.0 L 296.5 212.0 L 297.5 218.0 L 297.0 224.5 L 296.3 231.0 L 294.5 236.0 L 293.3 242.0 L 291.3 247.0 L 289.0 251.5 L 286.5 256.0 L 283.2 260.0 L 280.2 264.0 L 277.4 268.0 L 273.5 271.0 L 270.0 274.5 L 266.0 277.5 L 262.0 280.2 L 257.4 283.0 L 252.6 285.0 L 248.0 287.5 L 243.0 289.3 L 238.0 291.5 L 233.0 293.2 L 227.0 294.5 L 221.0 295.7 L 215.0 296.3 L 209.0 297.5 L 203.0 298.5 L 196.0 298.5 L 189.0 298.5 L 183.7 299.0 Z M 173.0 73.6 L 174.0 73.5 L 175.0 73.5 L 176.0 73.5 L 177.0 73.5 L 178.0 73.5 L 179.0 73.5 L 180.0 73.5 L 181.0 73.5 L 182.0 73.5 L 183.0 73.5 L 184.0 73.5 L 185.0 73.5 L 186.0 73.5 L 187.0 73.5 L 188.0 73.5 L 189.0 73.5 L 190.0 73.5 L 191.0 73.5 L 192.0 73.5 L 193.0 73.5 L 194.0 73.5 L 195.0 73.5 L 196.0 73.5 L 197.0 73.5 L 198.0 73.5 L 199.0 73.5 L 200.0 73.5 L 201.0 73.5 L 202.0 73.5 L 203.0 73.5 L 204.0 73.5 L 205.0 73.5 L 206.0 73.5 L 207.0 73.6 L 207.7 74.0 L 207.4 75.0 L 207.0 75.5 L 206.5 76.0 L 206.0 76.5 L 205.5 77.0 L 205.0 77.5 L 204.4 78.0 L 204.0 78.3 L 203.0 78.7 L 202.6 79.0 L 202.0 79.5 L 201.4 80.0 L 201.0 80.3 L 200.0 80.7 L 199.5 81.0 L 199.0 81.3 L 198.0 81.5 L 197.0 81.5 L 196.0 81.7 L 195.5 82.0 L 195.0 82.3 L 194.0 82.5 L 193.0 82.5 L 192.0 82.5 L 191.0 82.5 L 190.0 82.5 L 189.0 82.5 L 188.0 82.5 L 187.0 82.5 L 186.0 82.5 L 185.0 82.3 L 184.5 82.0 L 184.0 81.7 L 183.0 81.5 L 182.0 81.3 L 181.5 81.0 L 181.0 80.7 L 180.0 80.3 L 179.5 80.0 L 179.0 79.7 L 178.0 79.3 L 177.6 79.0 L 177.0 78.5 L 176.4 78.0 L 176.0 77.7 L 175.0 77.3 L 174.6 77.0 L 174.0 76.5 L 173.5 76.0 L 173.0 75.5 L 172.6 75.0 L 172.3 74.0 L 173.0 73.6 Z M 74.0 94.7 L 71.5 96.0 L 69.0 97.5 L 67.0 99.5 L 65.0 101.6 L 63.7 104.0 L 62.5 107.0 L 61.5 110.0 L 60.5 113.0 L 60.0 116.5 L 59.5 120.0 L 59.0 123.5 L 58.5 127.0 L 58.5 131.0 L 58.5 135.0 L 58.5 139.0 L 57.5 142.0 L 57.5 146.0 L 57.5 150.0 L 57.5 154.0 L 56.7 157.0 L 56.5 161.0 L 56.5 165.0 L 56.5 169.0 L 56.0 172.5 L 55.5 176.0 L 55.5 180.0 L 55.5 184.0 L 54.7 187.0 L 54.5 191.0 L 54.5 195.0 L 54.5 199.0 L 53.7 202.0 L 53.5 206.0 L 53.5 210.0 L 53.5 214.0 L 53.0 217.5 L 52.5 221.0 L 52.5 225.0 L 52.5 229.0 L 51.5 232.0 L 51.5 236.0 L 51.5 240.0 L 52.0 243.5 L 54.4 245.0 L 56.6 247.0 L 58.7 249.0 L 61.0 250.5 L 63.4 252.0 L 66.0 254.0 L 68.5 255.0 L 71.0 256.5 L 73.0 258.3 L 75.3 260.0 L 77.5 259.0 L 77.5 255.0 L 77.5 251.0 L 77.5 247.0 L 77.5 243.0 L 77.5 239.0 L 77.5 235.0 L 77.5 231.0 L 78.0 227.5 L 78.5 224.0 L 78.5 220.0 L 78.5 216.0 L 78.5 212.0 L 78.5 208.0 L 78.7 204.0 L 79.5 201.0 L 79.5 197.0 L 79.5 193.0 L 79.5 189.0 L 79.5 185.0 L 80.5 182.0 L 80.5 178.0 L 80.5 174.0 L 80.5 170.0 L 80.5 166.0 L 80.5 162.0 L 81.5 159.0 L 81.5 155.0 L 81.5 151.0 L 81.5 147.0 L 81.5 143.0 L 81.7 139.0 L 84.0 137.7 L 86.0 139.6 L 87.0 142.5 L 88.0 145.5 L 89.0 148.5 L 90.0 151.5 L 91.0 154.5 L 92.0 157.5 L 93.0 160.5 L 94.0 163.5 L 95.0 166.5 L 96.0 169.5 L 97.3 172.0 L 98.3 175.0 L 99.3 178.0 L 100.5 181.0 L 101.7 184.0 L 103.0 186.5 L 104.0 189.5 L 105.3 192.0 L 106.7 195.0 L 108.0 197.5 L 109.3 200.0 L 110.7 203.0 L 112.0 205.5 L 113.5 208.0 L 115.0 210.5 L 116.5 213.0 L 118.3 215.0 L 120.0 217.4 L 121.5 215.0 L 121.5 211.0 L 121.5 207.0 L 121.5 203.0 L 121.5 199.0 L 121.5 195.0 L 121.5 191.0 L 121.5 187.0 L 120.5 184.0 L 119.3 181.0 L 118.0 178.5 L 116.7 176.0 L 115.3 173.0 L 114.3 170.0 L 113.0 167.5 L 112.0 164.5 L 110.7 162.0 L 109.7 159.0 L 108.5 156.0 L 107.3 153.0 L 106.3 150.0 L 105.3 147.0 L 104.3 144.0 L 103.0 141.5 L 102.0 138.5 L 101.0 135.5 L 100.0 132.5 L 99.0 129.5 L 97.7 127.0 L 96.7 124.0 L 95.7 121.0 L 94.5 118.0 L 93.5 115.0 L 92.3 112.0 L 91.3 109.0 L 90.0 106.5 L 88.7 104.0 L 87.3 101.0 L 85.5 99.0 L 83.5 97.0 L 81.0 95.3 L 78.0 94.5 L 74.0 94.7 Z M 183.0 95.7 L 179.0 96.7 L 176.0 98.3 L 173.0 100.3 L 170.0 102.5 L 167.5 105.0 L 165.0 107.6 L 163.0 110.5 L 161.0 113.4 L 159.0 116.5 L 157.3 120.0 L 155.7 123.0 L 154.3 127.0 L 152.7 130.0 L 151.0 133.5 L 149.7 137.0 L 148.3 141.0 L 146.7 144.0 L 145.7 148.0 L 144.3 152.0 L 142.7 155.0 L 141.5 159.0 L 140.0 162.5 L 138.7 166.0 L 137.3 170.0 L 135.7 173.0 L 134.0 176.5 L 132.0 179.6 L 130.0 182.6 L 128.0 185.6 L 127.5 190.0 L 127.5 195.0 L 127.5 200.0 L 127.5 205.0 L 128.5 209.0 L 128.5 214.0 L 128.5 219.0 L 130.0 222.7 L 134.0 221.3 L 136.6 219.0 L 139.5 217.0 L 141.5 214.0 L 143.7 211.0 L 145.7 208.0 L 147.7 205.0 L 149.3 202.0 L 151.0 198.5 L 152.7 195.0 L 154.3 192.0 L 155.7 188.0 L 157.3 185.0 L 159.0 181.5 L 160.3 178.0 L 161.7 174.0 L 163.0 170.5 L 164.5 167.0 L 166.0 163.5 L 167.3 160.0 L 168.7 156.0 L 170.3 153.0 L 171.7 149.0 L 173.3 146.0 L 175.0 142.8 L 176.5 146.0 L 177.3 150.0 L 177.5 155.0 L 177.5 160.0 L 178.3 164.0 L 178.5 169.0 L 178.5 174.0 L 179.5 178.0 L 179.5 183.0 L 179.5 188.0 L 180.5 192.0 L 180.5 197.0 L 180.5 202.0 L 181.5 206.0 L 181.5 211.0 L 182.3 215.0 L 182.5 220.0 L 182.5 225.0 L 183.5 229.0 L 183.5 234.0 L 183.5 239.0 L 184.0 243.5 L 184.5 248.0 L 184.5 253.0 L 184.5 258.0 L 184.5 263.0 L 185.5 267.0 L 185.5 272.0 L 185.5 277.0 L 185.5 282.0 L 185.7 287.0 L 186.3 291.0 L 190.0 292.6 L 195.0 292.5 L 199.0 291.5 L 204.0 291.7 L 209.0 291.5 L 213.0 290.3 L 217.0 289.5 L 221.0 288.5 L 225.5 288.0 L 229.0 286.5 L 233.0 285.7 L 237.0 284.5 L 240.0 282.8 L 244.0 281.3 L 245.5 278.0 L 244.5 274.0 L 243.5 270.0 L 243.3 265.0 L 242.5 261.0 L 241.5 257.0 L 241.3 252.0 L 240.5 248.0 L 239.7 244.0 L 239.0 239.5 L 238.5 235.0 L 237.5 231.0 L 237.0 226.5 L 236.3 222.0 L 235.5 218.0 L 235.0 213.5 L 234.5 209.0 L 233.5 205.0 L 232.7 201.0 L 232.3 196.0 L 231.5 192.0 L 230.7 188.0 L 230.3 183.0 L 229.5 179.0 L 228.5 175.0 L 228.0 170.5 L 227.5 166.0 L 226.5 162.0 L 225.7 158.0 L 225.5 153.0 L 224.5 149.0 L 223.7 145.0 L 223.0 140.5 L 222.3 136.0 L 221.3 132.0 L 220.5 128.0 L 219.3 124.0 L 217.7 121.0 L 216.3 117.0 L 214.7 114.0 L 213.0 110.5 L 211.0 107.5 L 208.5 105.0 L 206.0 102.5 L 203.0 100.5 L 200.0 98.7 L 196.0 97.3 L 192.0 96.5 L 188.0 95.5 L 183.0 95.7 Z" />
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/company/requin-solutions-pvt-ltdd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      aria-label="Follow Requin Solutions on LinkedIn"
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 hover:bg-[#0088EE] hover:text-white hover:border-[#0088EE] transition-all flex items-center justify-center shadow-sm hover:scale-105"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/requin_solutions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      aria-label="Follow Requin Solutions on Instagram"
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] text-[#0088EE] border border-[#0088EE]/15 hover:bg-[#0088EE] hover:text-white hover:border-[#0088EE] transition-all flex items-center justify-center shadow-sm hover:scale-105"
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

