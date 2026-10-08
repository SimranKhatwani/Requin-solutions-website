import React, { useState, useEffect } from 'react';
import { X, FileText, Shield, DollarSign, Mail, Phone, ExternalLink, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'privacy' | 'refund';
}

export const TermsAndConditionsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'refund'>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#040D17]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[#071827] text-white rounded-3xl max-w-4xl w-full shadow-2xl border border-white/10 relative text-left animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-[#061523] flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#08B9E8]/15 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#08B9E8]/10 border border-[#08B9E8]/30 flex items-center justify-center text-[#08B9E8] shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#08B9E8] uppercase tracking-wider block">
                Requin Solutions Legal Documentation
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Legal Information & Policies
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer relative z-10"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Header */}
        <div className="flex border-b border-white/10 bg-[#05111D] px-6 sm:px-8 gap-2 sm:gap-4 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-[#08B9E8] text-[#08B9E8]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-[#08B9E8] text-[#08B9E8]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('refund')}
            className={`flex items-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'refund'
                ? 'border-[#08B9E8] text-[#08B9E8]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Refund Policy</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed font-normal">
          {/* ========================================================
              TAB 1: TERMS & CONDITIONS
          ======================================================== */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="p-4.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-300 mb-1">Recruitment Notice</p>
                  <p className="text-amber-200/90 leading-relaxed">
                    Requin Solutions Private Limited does not charge any fee during the recruitment process and has not authorized any agencies or partners to collect fees on its behalf. Please be vigilant of suspicious emails, advertisements, or individuals offering employment at Requin Solutions Pvt Ltd.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Equal Opportunity Employer</span>
                </h3>
                <p>
                  Requin is an Equal Opportunity Employer. Employment decisions are made without regard to race, color, caste, creed, religion, gender, marital status, age, ethnicity, national origin, gender identity, sexual orientation, disability, or veteran status.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Terms of Website Use</span>
                </h3>
                <p>
                  By accessing and using this website (<span className="text-[#08B9E8] font-mono">requinsolutions.com</span> / <span className="text-[#08B9E8] font-mono">requingroup.com</span>), you agree to comply with and be bound by the terms outlined herein. Requin Solutions reserves the right to revise or update these terms at any time without prior notice.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Termination and Monitoring</span>
                </h3>
                <p>
                  Requin Solutions may terminate user access to the Site or services at any time. Legal provisions regarding Disclaimers of Warranty, Accuracy of Information, Intellectual Property, and Indemnification will remain in full effect post-termination.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Intellectual Property</span>
                </h3>
                <p>
                  All content on this site belongs exclusively to Requin Solutions Private Limited, including software, architectures, text, images, graphics, videos, audio, and branding assets. Unauthorized use, reproduction, or modification of these materials is strictly prohibited without prior written permission.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Disclaimer of Warranties</span>
                </h3>
                <p>
                  Requin provides its website and informational materials on an "as is" and "as available" basis without warranties of any kind. Requin disclaims responsibility for any damages resulting from content download or third-party interactions.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Limitation of Liability & Indemnification</span>
                </h3>
                <p>
                  Requin shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of the website or errors within it. Users agree to indemnify and hold Requin harmless against losses, damages, or expenses resulting from misuse of site content.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: PRIVACY POLICY
          ======================================================== */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4.5 rounded-2xl bg-[#08B9E8]/10 border border-[#08B9E8]/25 text-slate-200">
                <p className="font-bold text-[#08B9E8] mb-1">Privacy & Data Protection Principles</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  This Privacy Statement outlines the principles followed by Requin Solutions Private Limited and its entities worldwide concerning the personal information of customers, partners, prospects, contractors, and website visitors.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Information We Collect</span>
                </h3>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
                  <li>
                    <strong className="text-white">Directly from you:</strong> Name, Email Address, Job Title, Organization, Country, City, Phone Number, and Project requirements.
                  </li>
                  <li>
                    <strong className="text-white">Automated technologies:</strong> IP address, device specifications, browser type, cookies, and website activity logs.
                  </li>
                  <li>
                    <strong className="text-white">Mobile Devices:</strong> Device metrics and notification consent if opted in.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Information Usage</span>
                </h3>
                <p>
                  Requin uses collected personal data to identify clients, deliver requested software development services, respond to technical queries, provide newsletters or project updates, and optimize website performance.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Information Sharing & Disclosures</span>
                </h3>
                <p>
                  Requin will never sell or rent your personal information to third parties. Data is only shared with affiliated entities for legitimate business purposes, trusted technical partners under strict confidentiality agreements, or legal authorities when required by law.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Children's Privacy</span>
                </h3>
                <p>
                  Our website and enterprise solutions are intended for businesses and individuals aged 13 and older. We do not knowingly collect personal data from children.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: REFUND POLICY
          ======================================================== */}
          {activeTab === 'refund' && (
            <div className="space-y-6">
              <div className="p-4.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-200">
                <p className="font-bold text-emerald-300 mb-1">Quality Commitment & Refund Policy</p>
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  Thank you for using our services at Requin Solutions Private Limited. Requin Solutions is committed to delivering top-quality, custom engineering. In the event of service concerns, our refund policy applies under specific conditions.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>Resolution First Policy</span>
                </h3>
                <p>
                  The refund policy is applicable only if our delivered services completely fail to meet the customer's agreed specifications. In cases where issues or bugs occur that can be resolved, our engineering team will address and rectify them to deliver error-free services instead of issuing a refund.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#08B9E8]" />
                  <span>7-Day Claim Window</span>
                </h3>
                <p>
                  To qualify for a review, service correction, or refund, a formal complaint must be submitted within <strong className="text-white">7 days</strong> of receiving the deliverable. Complaints raised after the 7-day period will not be eligible for refunds.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#061523] border border-white/10 space-y-2">
                <p className="font-semibold text-white">How to Submit a Request:</p>
                <p className="text-xs text-slate-400">
                  Please reach out to our dedicated support team with your project details and invoice reference:
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs">
                  <a
                    href="mailto:info@requinsolutions.com"
                    className="inline-flex items-center gap-1.5 text-[#08B9E8] hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@requinsolutions.com</span>
                  </a>
                  <a
                    href="tel:+919352220187"
                    className="inline-flex items-center gap-1.5 text-[#08B9E8] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 9352220187</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 border-t border-white/10 bg-[#061523] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-400">
            © 2026 Requin Solutions Private Limited · All Rights Reserved
          </p>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#05131f] bg-[#08B9E8] hover:bg-[#38d4ff] transition-all cursor-pointer shadow-md shadow-[#08B9E8]/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default TermsAndConditionsModal;
