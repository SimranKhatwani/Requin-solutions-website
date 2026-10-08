import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  FileText,
  Shield,
  DollarSign,
  Mail,
  Phone,
  Scale,
  ChevronRight,
} from 'lucide-react';

export const PublicTermsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'terms-conditions' | 'privacy-policy' | 'refund-policy'>('terms-conditions');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace('#', '');
      const el = document.getElementById(hashId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(hashId as any);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const scrollTo = (id: 'terms-conditions' | 'privacy-policy' | 'refund-policy') => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#061827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5] relative overflow-hidden">
      {/* ========================================================
          BACKGROUND LAYER 1: Deep Ambient Radial Glows (Matching Our Products)
      ======================================================== */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[#08B9E8]/[0.09] blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 -left-36 w-[650px] h-[650px] bg-[#00c2ff]/[0.07] blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -right-36 w-[650px] h-[650px] bg-[#08B9E8]/[0.07] blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-3/4 -left-36 w-[600px] h-[600px] bg-[#00c2ff]/[0.06] blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#00c2ff]/[0.08] blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================
          BACKGROUND LAYER 2: Left & Right Flowing Cyan Wave Lines & Nodes (Matching Our Products)
      ======================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="termsCyanWaveLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#00c2ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#08B9E8" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="termsCyanWaveRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#08B9E8" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#00c2ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#08B9E8" stopOpacity="0.03" />
          </linearGradient>
          <filter id="nodeGlowTerms" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* LEFT SIDE FLOWING CURVED WAVES */}
        <g stroke="url(#termsCyanWaveLeft)" fill="none" strokeWidth="1.2">
          <path d="M-60,220 C80,180 140,320 60,480 C-20,640 180,680 280,560 C360,460 220,380 320,280" strokeOpacity="0.28" />
          <path d="M-80,450 C60,400 110,540 30,690 C-50,840 150,890 250,780 C330,680 200,590 300,500" strokeOpacity="0.22" />
          <path d="M-40,900 C100,860 180,1000 90,1160 C0,1320 210,1360 310,1240" strokeOpacity="0.18" strokeDasharray="3 5" />
          <path d="M-50,1400 C90,1350 160,1500 80,1650 C0,1800 200,1850 290,1730" strokeOpacity="0.18" />
          <path d="M-60,1950 C80,1900 150,2050 70,2200 C-10,2350 190,2400 280,2280" strokeOpacity="0.18" strokeDasharray="3 5" />
        </g>

        {/* LEFT SIDE NODES & CONSTELLATION POINTS */}
        <g fill="#08B9E8">
          <circle cx="70" cy="270" r="4" fillOpacity="0.45" filter="url(#nodeGlowTerms)" />
          <circle cx="70" cy="270" r="2" fillOpacity="0.95" />
          <circle cx="280" cy="560" r="3.5" fillOpacity="0.35" filter="url(#nodeGlowTerms)" />
          <circle cx="280" cy="560" r="1.5" fillOpacity="0.9" />
          <circle cx="160" cy="420" r="2" fillOpacity="0.5" />
          <circle cx="20" cy="480" r="2.5" fillOpacity="0.4" />
          <circle cx="90" cy="1160" r="3" fillOpacity="0.4" filter="url(#nodeGlowTerms)" />
          <circle cx="90" cy="1160" r="1.5" fillOpacity="0.85" />
          <circle cx="290" cy="1730" r="3.5" fillOpacity="0.35" filter="url(#nodeGlowTerms)" />
          <circle cx="290" cy="1730" r="1.5" fillOpacity="0.9" />
          <circle cx="70" cy="2200" r="3" fillOpacity="0.35" filter="url(#nodeGlowTerms)" />
          <circle cx="70" cy="2200" r="1.5" fillOpacity="0.9" />
        </g>

        {/* RIGHT SIDE FLOWING CURVED WAVES */}
        <g stroke="url(#termsCyanWaveRight)" fill="none" strokeWidth="1.2">
          <path d="M1500,220 C1360,180 1300,320 1380,480 C1460,640 1260,680 1160,560 C1080,460 1220,380 1120,280" strokeOpacity="0.28" />
          <path d="M1520,490 C1380,440 1330,580 1410,730 C1490,880 1290,930 1190,820 C1110,720 1240,630 1140,540" strokeOpacity="0.22" />
          <path d="M1480,960 C1340,920 1260,1060 1350,1220 C1440,1380 1230,1420 1130,1300" strokeOpacity="0.18" strokeDasharray="3 5" />
          <path d="M1510,1460 C1370,1410 1290,1560 1370,1710 C1450,1860 1250,1900 1150,1780" strokeOpacity="0.18" />
          <path d="M1490,2000 C1350,1950 1280,2100 1360,2250 C1440,2400 1240,2440 1140,2320" strokeOpacity="0.18" strokeDasharray="3 5" />
        </g>

        {/* RIGHT SIDE NODES & CONSTELLATION POINTS */}
        <g fill="#00c2ff">
          <circle cx="1370" cy="270" r="4" fillOpacity="0.45" filter="url(#nodeGlowTerms)" />
          <circle cx="1370" cy="270" r="2" fillOpacity="0.95" />
          <circle cx="1160" cy="560" r="3.5" fillOpacity="0.35" filter="url(#nodeGlowTerms)" />
          <circle cx="1160" cy="560" r="1.5" fillOpacity="0.9" />
          <circle cx="1280" cy="420" r="2" fillOpacity="0.5" />
          <circle cx="1420" cy="480" r="2.5" fillOpacity="0.4" />
          <circle cx="1350" cy="1220" r="3" fillOpacity="0.4" filter="url(#nodeGlowTerms)" />
          <circle cx="1350" cy="1220" r="1.5" fillOpacity="0.85" />
          <circle cx="1150" cy="1780" r="3.5" fillOpacity="0.35" filter="url(#nodeGlowTerms)" />
          <circle cx="1150" cy="1780" r="1.5" fillOpacity="0.9" />
          <circle cx="1360" cy="2250" r="3" fillOpacity="0.35" filter="url(#nodeGlowTerms)" />
          <circle cx="1360" cy="2250" r="1.5" fillOpacity="0.9" />
        </g>
      </svg>

      {/* Top Navbar */}
      <Navbar onNavigateSection={() => navigate('/')} />

      {/* Main Legal Content */}
      <main className="flex-1 pt-32 pb-24 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#08B9E8]">Legal Information</span>
          </div>

          {/* Top Hero Header Title */}
          <div className="text-center py-6 sm:py-10 relative mb-12">
            {/* Ambient Cyan Radial Bloom directly behind header */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#08B9E8]/15 blur-[130px] rounded-full pointer-events-none -z-10"
              aria-hidden="true"
            />

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08B9E8]/10 border border-[#08B9E8]/25 text-[#00c2ff] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
              <Scale className="w-4 h-4" />
              <span>REQUIN SOLUTIONS LEGAL DOCUMENTATION</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Legal Information & <span className="text-[#00c2ff]">Policies.</span>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl mt-5 max-w-3xl mx-auto leading-relaxed font-normal">
              Please review these important documents regarding your use of our services and your rights.
            </p>
          </div>

          {/* 2-Column Content Layout (Left Sticky Contents Sidebar + Right Full Policy Cards) */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            
            {/* ========================================================
                LEFT COLUMN: Sticky Contents Navigation Box 
            ======================================================== */}
            <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-28">
              <div className="bg-[#0B1B2B] border border-slate-700/80 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide pb-3 border-b border-white/10">
                    Contents
                  </h3>
                </div>

                <nav className="space-y-2.5">
                  {/* Terms & Conditions Tab */}
                  <button
                    onClick={() => scrollTo('terms-conditions')}
                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-semibold transition-all cursor-pointer text-left ${
                      activeSection === 'terms-conditions'
                        ? 'bg-[#00c2ff] text-[#05131f] shadow-lg shadow-[#00c2ff]/25 font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <FileText className={`w-5 h-5 shrink-0 ${activeSection === 'terms-conditions' ? 'text-[#05131f]' : 'text-slate-400'}`} />
                    <span>Terms & Conditions</span>
                  </button>

                  {/* Privacy Policy Tab */}
                  <button
                    onClick={() => scrollTo('privacy-policy')}
                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-semibold transition-all cursor-pointer text-left ${
                      activeSection === 'privacy-policy'
                        ? 'bg-[#00c2ff] text-[#05131f] shadow-lg shadow-[#00c2ff]/25 font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Shield className={`w-5 h-5 shrink-0 ${activeSection === 'privacy-policy' ? 'text-[#05131f]' : 'text-slate-400'}`} />
                    <span>Privacy Policy</span>
                  </button>

                  {/* Refund Policy Tab */}
                  <button
                    onClick={() => scrollTo('refund-policy')}
                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-semibold transition-all cursor-pointer text-left ${
                      activeSection === 'refund-policy'
                        ? 'bg-[#00c2ff] text-[#05131f] shadow-lg shadow-[#00c2ff]/25 font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <DollarSign className={`w-5 h-5 shrink-0 ${activeSection === 'refund-policy' ? 'text-[#05131f]' : 'text-slate-400'}`} />
                    <span>Refund Policy</span>
                  </button>
                </nav>

                {/* Support Help Card */}
                <div className="p-5 rounded-2xl bg-[#061523] border border-white/10 text-sm text-slate-300 space-y-2.5">
                  <p className="leading-relaxed font-normal">
                    Need help understanding these terms? Contact our support team at:
                  </p>
                  <a
                    href="mailto:info@requinsolutions.com"
                    className="inline-flex items-center gap-2 text-[#00c2ff] hover:underline font-semibold block"
                  >
                    <Mail className="w-4 h-4" />
                    <span>info@requinsolutions.com</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* ========================================================
                RIGHT COLUMN: Detailed Policy Document Cards
            ======================================================== */}
            <div className="flex-1 w-full space-y-10">
              
              {/* SECTION 1: TERMS & CONDITIONS */}
              <section
                id="terms-conditions"
                className="bg-[#0B1B2B] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md"
              >
                {/* Banner Header */}
                <div className="bg-gradient-to-r from-[#0e3557] to-[#124d7d] p-6 sm:p-8 text-white relative overflow-hidden border-b border-white/10">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#08B9E8]/20 rounded-full blur-2xl pointer-events-none" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight relative z-10">
                    Terms & Conditions
                  </h2>
                  <p className="text-[#a5e9fc] text-base sm:text-lg mt-1 font-medium relative z-10">
                    Guidelines for using our services and website
                  </p>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-9 space-y-8 text-slate-300 text-base sm:text-lg leading-relaxed">
                  {/* Recruitment Notice */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#082035]/90 border border-[#08B9E8]/30 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Recruitment Notice
                    </h3>
                    <p className="text-slate-200">
                      Requin Solutions Private Limited does not charge any fee during the recruitment process and has not authorized any agencies/partners to collect fees on its behalf. Please be vigilant of suspicious mails, advertisements, or individuals offering jobs at Requin Solutions Pvt Ltd.
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Requin is an Equal Opportunity Employer.</li>
                      <li>Employment decisions are made without regard to race, color, caste, creed, religion, gender, marital status, age, ethnicity, national origin, gender identity, sexual orientation, disability, or veteran status.</li>
                    </ul>
                  </div>

                  {/* General Terms */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">General Terms</h3>
                    <p className="text-slate-200">
                      By using this website, you accept the following terms:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>&ldquo;User&rdquo; refers to anyone browsing the site.</li>
                      <li>&ldquo;Requin&rdquo; refers to Requin Solutions Private Limited.</li>
                      <li>&ldquo;Site&rdquo; refers to the Requin website and its contents, which Requin monitors.</li>
                    </ul>
                    <p className="text-slate-300 text-sm sm:text-base pt-1">
                      By accessing the Site, you agree to abide by the terms outlined. Requin may revise these terms without notice, and additional terms may apply to certain areas of the Site.
                    </p>
                  </div>

                  {/* Termination and Monitoring */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Termination and Monitoring</h3>
                    <p className="text-slate-200">
                      Requin Solutions may terminate User access to the Site at any time. Terms regarding:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Disclaimer of warranty</li>
                      <li>Accuracy of information</li>
                      <li>Indemnification</li>
                    </ul>
                    <p className="text-slate-300 text-sm sm:text-base pt-1">
                      ...will remain effective post-termination.
                    </p>
                  </div>

                  {/* Intellectual Property */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Intellectual Property</h3>
                    <p className="text-slate-200">
                      All content on this site belongs exclusively to Requin Solutions, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Software, text, images, graphics, videos, and audio</li>
                    </ul>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Unauthorized use, reproduction, or modification of these materials is prohibited without prior written permission.</li>
                    </ul>

                    <h3 className="text-lg sm:text-xl font-bold text-white pt-2">Trademarks</h3>
                    <p className="text-slate-300 text-sm sm:text-base font-semibold text-[#00c2ff]">
                      &ldquo;Requin Solutions&rdquo; is a registered trademark of Requin Solutions Private Limited. All rights reserved.
                    </p>
                  </div>

                  {/* Disclaimer of Warranties */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Disclaimer of Warranties</h3>
                    <p className="text-slate-200">
                      Requin makes no warranties, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Those of merchantability and fitness for a particular purpose.</li>
                      <li>Site is provided "as is" and "as available" without warranties regarding accuracy or reliability.</li>
                      <li>Requin disclaims responsibility for any damage resulting from content download or use.</li>
                    </ul>
                  </div>

                  {/* Limitations of Liability */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Limitations of Liability</h3>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>
                        Requin shall not be liable for any damages, including direct, incidental, or consequential damages, arising from the use of the Site or errors within it.
                      </li>
                      <li>Limitations may not apply in jurisdictions that do not allow liability exclusion.</li>
                    </ul>
                  </div>

                  {/* Indemnification */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Indemnification</h3>
                    <p className="text-slate-200">
                      User agrees to indemnify Requin against losses, damages, or expenses arising from misuse of the Site&apos;s content.
                    </p>
                  </div>

                  {/* Third-Party Links & Privacy */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Privacy</h3>
                    <p className="text-slate-200">
                      User privacy is crucial. Requin:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Will not share user information with third parties.</li>
                      <li>May use user information to enhance online experiences.</li>
                      <li>The Site may link to third-party websites, but Requin is not responsible for the content, policies, or any risks associated with such external sites.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* SECTION 2: PRIVACY POLICY */}
              <section
                id="privacy-policy"
                className="bg-[#0B1B2B] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md"
              >
                {/* Banner Header */}
                <div className="bg-gradient-to-r from-[#173052] to-[#1e4475] p-6 sm:p-8 text-white relative overflow-hidden border-b border-white/10">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#08B9E8]/20 rounded-full blur-2xl pointer-events-none" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight relative z-10">
                    Privacy Policy
                  </h2>
                  <p className="text-[#a5e9fc] text-base sm:text-lg mt-1 font-medium relative z-10">
                    How we collect, use, and protect your information
                  </p>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-9 space-y-8 text-slate-300 text-base sm:text-lg leading-relaxed">
                  <p className="text-slate-200">
                    This Privacy Statement outlines the privacy and data protection principles followed by Requin Solutions Private Limited and its entities worldwide, concerning the personal information of customers, partners, employees, contractors, prospects, and vendors.
                  </p>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Scope of this Privacy Statement</h3>
                    <p className="text-slate-200">
                      This Privacy Statement applies to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Personal information you provide directly to Requin Solutions.</li>
                      <li>Personal information collected through Requin&apos;s websites or from other sources, subject to local law.</li>
                    </ul>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Information Collection and Usage</h3>
                    <p className="text-slate-200">
                      Requin may collect and use personal information for various purposes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Identifying you, providing products/services as requested, and responding to your queries.</li>
                      <li>Processing requests and enabling subscriptions, downloads, and marketing material.</li>
                      <li>Improving website effectiveness and marketing activities through technologies like IP logs and cookies.</li>
                    </ul>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Personal Information We Collect</h3>
                    <ul className="list-disc list-inside space-y-2.5 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>
                        <strong className="text-white">Directly from you:</strong> First Name, Last Name, Email Address, Job Title, Organization Name, Country, City, Phone Number, and Industry type.
                      </li>
                      <li>
                        <strong className="text-white">Automated technologies:</strong> IP addresses, device details, and usage data collected via web server logs, cookies, and web beacons.
                      </li>
                      <li>
                        <strong className="text-white">Through mobile devices:</strong> Additional information if accessing via mobile, including consent for notifications if provided.
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Third-Party Links</h3>
                    <p className="text-slate-200">
                      Requin may provide links to third-party websites for convenience. Accessing these links means:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Leaving Requin&apos;s website, which may follow different privacy practices.</li>
                      <li>Personal information on third-party websites is governed by their policies, not Requin&apos;s.</li>
                    </ul>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Social Media Features</h3>
                    <p className="text-slate-200">
                      Requin&apos;s website includes social media features enabling sharing with social networks:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>Social media engagement may involve information collection or sharing based on the platform&apos;s settings and policies.</li>
                      <li>We advise reviewing social media privacy policies to understand information usage or sharing.</li>
                    </ul>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Data Sharing</h3>
                    <p className="text-slate-200">
                      Requin may share personal information under specific circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>With affiliated entities for legitimate business purposes.</li>
                      <li>With trusted partners who work under confidentiality agreements to support communications and legitimate business purposes.</li>
                      <li>With government authorities or legal entities as required for legal compliance or law enforcement.</li>
                      <li>To respond to subpoenas, court orders, or legal claims.</li>
                      <li>In cases of suspected illegal activities or potential safety threats.</li>
                      <li>With vendors for business meetings, subject to your consent.</li>
                    </ul>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Children&apos;s Privacy</h3>
                    <p className="text-slate-200">
                      Requin&apos;s websites are not directed at children. The services are generally intended for individuals aged 13 and above.
                    </p>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Unsolicited Information</h3>
                    <p className="text-slate-200">
                      Requin is not liable for unsolicited information provided by you. Such information is used per Requin's Privacy Statement.
                    </p>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Legal Basis and Consent</h3>
                    <p className="text-slate-200">
                      Data processing is based on legitimate interests, limited to business-related browsing activities. When required by local law, Requin will obtain consent before processing your data.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3: REFUND POLICY */}
              <section
                id="refund-policy"
                className="bg-[#0B1B2B] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md"
              >
                {/* Banner Header */}
                <div className="bg-gradient-to-r from-[#0b3844] to-[#12586b] p-6 sm:p-8 text-white relative overflow-hidden border-b border-white/10">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#08B9E8]/20 rounded-full blur-2xl pointer-events-none" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight relative z-10">
                    Refund Policy
                  </h2>
                  <p className="text-[#a5e9fc] text-base sm:text-lg mt-1 font-medium relative z-10">
                    Our policy regarding refunds and service adjustments
                  </p>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-9 space-y-8 text-slate-300 text-base sm:text-lg leading-relaxed">
                  <p className="text-slate-200">
                    Thank you for using our services at <span className="text-[#00c2ff] font-mono underline">www.requingroup.com</span> by Requin Solutions Private Limited.
                  </p>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Refund Policy Overview</h3>
                    <p className="text-slate-200">
                      Requin Solutions is committed to providing top-quality services. However, in the event of a service failure or unmet requirements, our refund policy may apply under specific conditions:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>The refund policy is applicable only if our services completely fail to meet the customer&apos;s requirements.</li>
                      <li>In cases where errors or issues occur that can be resolved, we will address and rectify them to deliver error-free services instead of providing a refund.</li>
                      <li>Refunds will not be provided if the issue can be fixed or adjusted to meet the requirements.</li>
                    </ul>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Refund Policy Activation</h3>
                    <p className="text-slate-200">
                      To qualify for a refund or service correction:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm sm:text-base">
                      <li>A complaint must be submitted within 7 days of receiving the service.</li>
                      <li>If the complaint is not raised within this 7-day period, neither a refund nor any service corrections will be provided.</li>
                    </ul>
                  </div>

                  {/* Contact Support Card */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#061523] border border-white/10 space-y-3.5">
                    <p className="font-bold text-lg sm:text-xl text-white">Need Assistance?</p>
                    <p className="text-sm sm:text-base text-slate-300">
                      If you have any questions about our refund policy or need to submit a refund request, please contact our customer support team at:
                    </p>
                    <div className="flex flex-wrap gap-6 pt-2 text-base font-semibold">
                      <a
                        href="mailto:info@requinsolutions.com"
                        className="inline-flex items-center gap-2 text-[#00c2ff] hover:underline"
                      >
                        <Mail className="w-5 h-5" />
                        <span>info@requinsolutions.com</span>
                      </a>
                      <a
                        href="tel:+919352220187"
                        className="inline-flex items-center gap-2 text-[#00c2ff] hover:underline"
                      >
                        <Phone className="w-5 h-5" />
                        <span>+91 9352220187</span>
                      </a>
                    </div>
                  </div>

                  {/* Bottom Copyright & Last Updated Card (Right below contact info) */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2 shadow-lg">
                    <p className="text-base sm:text-lg font-medium text-slate-200">
                      © 2026 Requin Solutions Private Limited. All rights reserved.
                    </p>
                    <p className="text-sm sm:text-base text-slate-400 font-normal">
                      Last updated: October 2026
                    </p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicTermsPage;
