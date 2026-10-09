import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';
import { QuizModal } from '../components/QuizModal';
import { projectService, ProjectItem } from '../services/projectService';
import { getMediaUrl } from '../utils/mediaUrl';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  Loader2,
  ArrowRight,
  X,
  Layers,
  CheckCircle2,
  Maximize2,
  Zap,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Default initial dataset featuring Vastra ERP & Requin flagship systems
export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-vastra',
    projectName: 'Smart Garment POS, High-Velocity Tailoring Pipelines',
    slug: 'vastra-erp',
    shortDescription:
      'Enterprise Garment, Fashion Studio & Tailoring POS Management Suite',
    fullDescription:
      'VASTRA ERP is an all-in-one software platform tailored for luxury garment studios, fashion boutiques, and multi-store apparel chains. It provides real-time POS barcode billing, tailor assignment pipelines, automated SMS readiness alerts, catalog management, and stock auditing.',
    featuredImage: '/images/products/vastra-erp-overview.png',
    galleryImages: [
      '/images/products/vastra-erp-overview.png',
      '/images/products/vastra-erp-pos.png',
      '/images/products/vastra-erp-alteration.png',
      '/images/products/vastra-erp-catalog.png',
    ],
    category: 'Enterprise ERP & Retail',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Thermal POS', 'Tailor Workflow'],
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'Luxury Fashion & Boutique Chains',
    status: 'PUBLISHED',
    displayOrder: 1,
    createdAt: '2025-11-20T10:00:00.000Z',
    updatedAt: '2026-02-15T12:00:00.000Z',
  },
  {
    id: 'proj-ops-crm',
    projectName: 'Smart CRM, High-Velocity Pipelines',
    slug: 'requin-ops-crm',
    shortDescription:
      'Enterprise CRM & Operations Suite Optimizing Customer Relationships Across Industries',
    fullDescription:
      'Requin Ops empowers businesses with high-velocity lead pipelines, customer communication timelines, automated deal progression triggers, and unified team effort dashboards.',
    featuredImage: '/images/products/requin-ops-demo.jpg',
    galleryImages: [
      '/images/products/requin-ops-pipeline.png',
      '/images/products/requin-ops-leads.png',
      '/images/products/requin-ops-login.png',
      '/images/products/requin-ops-report.png',
      '/images/products/requin-ops-tasklist.png',
    ],
    category: 'Operations & CRM',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Redis', 'WebSocket', 'PostgreSQL'],
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'Enterprise Sales & Operations Groups',
    status: 'PUBLISHED',
    displayOrder: 2,
    createdAt: '2025-10-12T11:00:00.000Z',
    updatedAt: '2026-02-01T15:00:00.000Z',
  },
  {
    id: 'proj-nexusbill',
    projectName: 'Intelligent Retail POS, Instant Barcode Billing',
    slug: 'nexusbill-pos-inventory',
    shortDescription:
      'High-Speed Retail Billing, Barcode Scanning, Multi-Warehouse Inventory & Tax Engine',
    fullDescription:
      'NexusBill enables supermarkets, wholesale distributors, and retail franchises to accelerate counter checkout times, track stock across multiple physical locations, and generate real-time ledger accounting.',
    featuredImage: '/images/products/nexusbill-demo.jpg',
    galleryImages: [
      '/images/products/nexusbill-dashboard.png',
      '/images/products/nexusbill-sales.png',
      '/images/products/nexusbill-inventory.png',
      '/images/products/nexusbill-purchases.png',
    ],
    category: 'FinTech & Retail POS',
    technologies: ['React', 'TypeScript', 'Electron', 'SQLite', 'Node.js', 'Thermal POS'],
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'Retail & Supermarket Chains',
    status: 'PUBLISHED',
    displayOrder: 3,
    createdAt: '2025-09-15T09:00:00.000Z',
    updatedAt: '2026-01-28T10:00:00.000Z',
  },
  {
    id: 'proj-dine-dusk',
    projectName: 'Live Table Booking, Kitchen Display KDS Mesh',
    slug: 'dine-dusk-restaurant-os',
    shortDescription:
      'High-Velocity Restaurant Operating System with Real-Time Kitchen Routing & POS',
    fullDescription:
      'Engineered for high-volume cafes, fine dining, and cloud kitchens. Dine & Dusk eliminates order confusion with sub-second kitchen ticket printing, QR table self-ordering, and real-time inventory deduction.',
    featuredImage: '/images/products/dine-dusk-demo.jpg',
    galleryImages: [
      '/images/products/dine-dusk-pos.png',
      '/images/products/dine-dusk-dashboard.png',
      '/images/products/dine-dusk-tables.png',
      '/images/products/dine-dusk-kds.png',
    ],
    category: 'Hospitality & POS',
    technologies: ['React', 'Node.js', 'WebSocket', 'PostgreSQL', 'Thermal Printing', 'Stripe'],
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'Hospitality & Cloud Kitchens',
    status: 'PUBLISHED',
    displayOrder: 4,
    createdAt: '2025-08-20T14:00:00.000Z',
    updatedAt: '2026-01-18T11:00:00.000Z',
  },
  {
    id: 'proj-cloud-infra',
    projectName: 'Multi-Cloud Automation, Zero-Downtime Releases',
    slug: 'cloud-infrastructure-cicd-automation',
    shortDescription:
      'Kubernetes Container Orchestration, Terraform Infrastructure as Code & Automated GitOps',
    fullDescription:
      'Comprehensive infrastructure overhaul for high-traffic financial and enterprise clients. Built automated GitOps release workflows with dynamic autoscaling, and centralized Prometheus/Grafana telemetry.',
    featuredImage: '/images/products/cloud-infra-demo.jpg',
    galleryImages: [
      '/images/cloud_infrastructure_1790576629897.jpg',
      '/images/modern_software_mockup_1790576657118.jpg',
    ],
    category: 'Cloud & DevOps',
    technologies: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GitHub Actions', 'Prometheus'],
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'Global FinTech Client',
    status: 'PUBLISHED',
    displayOrder: 5,
    createdAt: '2025-11-01T10:00:00.000Z',
    updatedAt: '2026-01-15T12:00:00.000Z',
  },
  {
    id: 'proj-requin-ams',
    projectName: 'Smart Biometric Sync, Real-Time Attendance Mesh',
    slug: 'requin-ams-workforce',
    shortDescription:
      'Workforce Operations & QR Biometric Sync Suite with Real-Time Geofencing',
    fullDescription:
      'Requin AMS combines dynamic rolling QR codes, geofenced boundaries, and time-stamped biometric auth to automate overtime, shifts, and payroll reporting.',
    featuredImage: '/images/products/requin-ams-demo.jpg',
    galleryImages: [
      '/images/products/requin-ams-dashboard.jpg',
      '/images/products/requin-ams-demo.jpg',
      '/images/products/requin-ams-attendance-rules.jpg',
      '/images/products/requin-ams-login.jpg',
    ],
    category: 'Workforce & IoT',
    technologies: ['React Native', 'Go', 'Node.js', 'PostgreSQL', 'Docker', 'MQTT'],
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'Enterprise Workforce Operations',
    status: 'PUBLISHED',
    displayOrder: 6,
    createdAt: '2025-07-10T12:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 'proj-requin-hrms',
    projectName: 'Enterprise HRMS, Automated Payroll & Leave Mesh',
    slug: 'requin-hrms-suite',
    shortDescription:
      'Unified Human Resource Management, Dynamic Role Permissions, Asset Tracking & Payroll',
    fullDescription:
      'Complete workforce operations and HR management system featuring automated salary slip generation, department-level leave approvals, asset assignment, and organization hierarchy visualization.',
    featuredImage: '/images/products/requin-hrms-demo.jpg',
    galleryImages: [
      '/images/products/requin-hrms-dashboard.png',
      '/images/products/requin-hrms-roles.png',
      '/images/products/requin-hrms-assets.png',
      '/images/products/requin-hrms-demo.jpg',
    ],
    category: 'Workforce & HR',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Redis'],
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'Corporate Enterprises & Staffing Groups',
    status: 'PUBLISHED',
    displayOrder: 7,
    createdAt: '2025-06-18T10:00:00.000Z',
    updatedAt: '2026-01-05T14:00:00.000Z',
  },
  {
    id: 'proj-rkb-enterprises',
    projectName: 'Multi-Category B2B Commerce, Live Catalog Engine',
    slug: 'rkb-enterprises-commerce',
    shortDescription:
      'High-Speed Wholesale E-Commerce & Product Comparison Portal with Instant RFQ Quotes',
    fullDescription:
      'Modern digital marketplace architecture featuring dynamic product category filters, multi-item specification comparisons, bulk inquiry carts, and high-performance image caching.',
    featuredImage: '/images/products/rkb-enterprises-demo.jpg',
    galleryImages: [
      '/images/products/rkb-enterprises-home.png',
      '/images/products/rkb-enterprises-catalog.png',
      '/images/products/rkb-enterprises-categories.png',
      '/images/products/rkb-enterprises-comparison.png',
    ],
    category: 'E-Commerce & B2B',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Stripe', 'Node.js'],
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'RKB Enterprises Industrial Supply',
    status: 'PUBLISHED',
    displayOrder: 8,
    createdAt: '2025-05-12T09:00:00.000Z',
    updatedAt: '2025-12-20T16:00:00.000Z',
  },
  {
    id: 'proj-india-motor',
    projectName: 'Instructor Dispatch, Real-Time Student Portal',
    slug: 'india-motor-training',
    shortDescription:
      'Digital Driver Training School OS with Real-Time Trainer Booking & Progress Telemetry',
    fullDescription:
      'Streamlined training school management platform with automated batch scheduling, trainer availability calendars, student performance scorecards, and instant course checkout.',
    featuredImage: '/images/products/india-motor-demo.jpg',
    galleryImages: [
      '/images/products/india-motor-hero.png',
      '/images/products/india-motor-features.png',
      '/images/products/india-motor-pricing.png',
      '/images/products/india-motor-trainers.png',
    ],
    category: 'EdTech & Operations',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Razorpay'],
    projectUrl: 'https://www.requingroup.com/',
    clientName: 'India Motor Driving Academy',
    status: 'PUBLISHED',
    displayOrder: 9,
    createdAt: '2025-04-05T11:00:00.000Z',
    updatedAt: '2025-11-15T10:00:00.000Z',
  },
];

// Helper to get custom project showcase typography, badges, and URL pill
const getProjectShowcaseData = (slug: string, defaultName: string, defaultDesc: string) => {
  switch (slug) {
    case 'vastra-erp':
      return {
        line1: 'Smart Garment POS,',
        line2: 'High–Velocity',
        line3: 'Tailoring Pipelines',
        subtitle: 'Enterprise Garment, Fashion Studio & Tailoring POS Management Suite',
        urlPill: 'requingroup.com / vastra-erp',
        topBadge: '⚡ Real-Time Boutique POS & Billing Terminal',
        bottomBadge: '📍 Multi-Store Inventory & Alteration Mesh',
      };
    case 'requin-ops-crm':
      return {
        line1: 'Smart CRM,',
        line2: 'High–Velocity',
        line3: 'Pipelines',
        subtitle: 'Enterprise CRM & Operations Suite Optimizing Customer Relationships Across Industries',
        urlPill: 'requingroup.com / ops / crm',
        topBadge: '⚡ Automated Lead Progression • Multi-Stage Sales',
        bottomBadge: '📍 Client Portal • Multi-Tenant Ready',
      };
    case 'nexusbill-pos-inventory':
      return {
        line1: 'Intelligent Retail POS,',
        line2: 'Instant Barcode',
        line3: 'Billing Engine',
        subtitle: 'High-Speed Retail Billing, Barcode Scanning, Multi-Warehouse Inventory & Tax Engine',
        urlPill: 'requingroup.com / nexusbill / pos',
        topBadge: '⚡ GST-Compliant Barcode Billing & Tax Engine',
        bottomBadge: '📍 Multi-Store Live Warehouse Synchronization',
      };
    case 'dine-dusk-restaurant-os':
      return {
        line1: 'Smart Restaurant OS,',
        line2: 'Live Kitchen Display',
        line3: 'KDS Mesh',
        subtitle: 'High-Velocity Restaurant Operating System with Real-Time Kitchen Routing & POS',
        urlPill: 'requingroup.com / dine-dusk / pos',
        topBadge: '⚡ Real-Time Kitchen Display (KDS) & Order Routing',
        bottomBadge: '📍 Dynamic Table Reservation & Floor Visualizer',
      };
    case 'cloud-infrastructure-cicd-automation':
      return {
        line1: 'Multi-Cloud Automation,',
        line2: 'Zero-Downtime',
        line3: 'Releases',
        subtitle: 'Kubernetes Container Orchestration, Terraform Infrastructure as Code & Automated GitOps',
        urlPill: 'requingroup.com / devops / cloud',
        topBadge: '⚡ 99.99% Uptime Multi-Region Kubernetes Mesh',
        bottomBadge: '📍 Automated GitOps & Prometheus Telemetry',
      };
    case 'requin-ams-workforce':
      return {
        line1: 'Smart Biometric Sync,',
        line2: 'Real-Time Attendance',
        line3: 'Geofenced Mesh',
        subtitle: 'Workforce Operations & QR Biometric Sync Suite with Real-Time Geofencing',
        urlPill: 'requingroup.com / ams / attendance',
        topBadge: '⚡ Dynamic Rolling QR & Sub-Second Latency',
        bottomBadge: '📍 Geofenced Campus & Biometric Check-in',
      };
    case 'requin-hrms-suite':
      return {
        line1: 'Enterprise HRMS,',
        line2: 'Automated Payroll &',
        line3: 'Role Hierarchy',
        subtitle: 'Unified Human Resource Management, Dynamic Role Permissions, Asset Tracking & Payroll',
        urlPill: 'requingroup.com / hrms / enterprise',
        topBadge: '⚡ Automated Payroll & Role Hierarchy Engine',
        bottomBadge: '📍 Leave Approval & Asset Allocation Suite',
      };
    case 'rkb-enterprises-commerce':
      return {
        line1: 'Multi-Category B2B,',
        line2: 'Live Dynamic Catalog',
        line3: 'Engine',
        subtitle: 'High-Speed Wholesale E-Commerce & Product Comparison Portal with Instant RFQ Quotes',
        urlPill: 'requingroup.com / rkb / commerce',
        topBadge: '⚡ Multi-Category Dynamic Wholesale Catalog',
        bottomBadge: '📍 Instant RFQ Quotes & Bulk Spec Compare',
      };
    case 'india-motor-training':
      return {
        line1: 'Instructor Dispatch,',
        line2: 'Real-Time Student',
        line3: 'Portal',
        subtitle: 'Digital Driver Training School OS with Real-Time Trainer Booking & Progress Telemetry',
        urlPill: 'requingroup.com / indiamotor / training',
        topBadge: '⚡ Real-Time Instructor Dispatch & Scheduling',
        bottomBadge: '📍 Student Telemetry & Batch Performance',
      };
    default: {
      const safeName = defaultName || 'Enterprise System, High-Velocity, Architecture';
      const parts = safeName.split(',');
      return {
        line1: parts[0] ? `${parts[0].trim()},` : 'Enterprise System,',
        line2: parts[1] ? parts[1].trim() : 'High-Velocity',
        line3: parts[2] ? parts[2].trim() : 'Architecture',
        subtitle: defaultDesc || safeName || 'Engineered software platform and enterprise system.',
        urlPill: `requingroup.com / ${slug || 'project'}`,
        topBadge: '⚡ Enterprise Engineering & Cloud Architecture',
        bottomBadge: '📍 Production Deployed • High Availability',
      };
    }
  }
};

export const PublicProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Gallery Modal State
  const [activeGalleryProject, setActiveGalleryProject] = useState<ProjectItem | null>(null);
  const [galleryPhotoIndex, setGalleryPhotoIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await projectService.getPublishedProjects();
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      } catch (err: any) {
        console.warn('Using default showcase projects dataset:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  const filteredProjects = projects.filter((p) =>
    selectedCategory === 'All'
      ? true
      : (p.category || '').toLowerCase() === selectedCategory.toLowerCase()
  );

  const openGallery = (project: ProjectItem) => {
    setActiveGalleryProject(project);
    setGalleryPhotoIndex(0);
  };

  const closeGallery = () => {
    setActiveGalleryProject(null);
    setGalleryPhotoIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#071827] text-white flex flex-col font-sans selection:bg-[#08B9E8]/20 selection:text-[#4DD4F5]">
      {/* Dynamic Keyframes */}
      <style>{`
        @keyframes floatBadge1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes floatBadge2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
        }
        .animate-float-1 {
          animation: floatBadge1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: floatBadge2 7s ease-in-out infinite;
        }
      `}</style>

      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
      />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 text-left relative overflow-hidden">
        {/* Soft Background Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(8,185,232,0.12),transparent_70%)] blur-[120px]" />
          <div className="absolute top-1/3 -left-32 w-[600px] h-[450px] bg-[radial-gradient(circle,rgba(0,194,255,0.08),transparent_65%)] blur-[100px]" />
          <div className="absolute bottom-10 -right-32 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(2,132,199,0.1),transparent_70%)] blur-[120px]" />
        </div>

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#08B9E8]">Projects & Engineering Portfolio</span>
          </div>

          {/* Page Hero Header */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-[#08B9E8] mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Systems & Deployments</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Engineered Solutions & Client Showcase
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
              Explore real-world software platforms, cloud infrastructure pipelines, and enterprise ERP systems architected and delivered by Requin Solutions Pvt Ltd.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00c2ff] text-[#05131f] shadow-lg shadow-[#00c2ff]/30 font-extrabold scale-105'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Showcase List */}
          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-10 h-10 text-[#08B9E8] animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium text-slate-400">Loading portfolio systems...</p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center">
              <p className="text-sm">{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-20 text-center bg-[#0B2235]/40 rounded-3xl border border-white/10">
              <FolderGit2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-base font-bold text-white">No projects found in this category</p>
            </div>
          ) : (
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {filteredProjects.map((project) => {
                const sc = getProjectShowcaseData(
                  project.slug,
                  project.projectName,
                  project.shortDescription || project.fullDescription
                );

                return (
                  /* Outer Tablet/Device Bezel Frame (Matching Requin Apps Showcase UI) */
                  <div
                    key={project.id || project.slug}
                    className="p-3 sm:p-5 lg:p-6 rounded-[32px] sm:rounded-[44px] bg-[#020B14] border-2 border-[#00C2FF]/30 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_45px_rgba(0,194,255,0.15)] group transition-all duration-500 hover:border-[#00C2FF]/60 hover:shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(0,194,255,0.25)]"
                  >
                    {/* Inner Screen Surface */}
                    <div className="relative rounded-[24px] sm:rounded-[36px] bg-gradient-to-br from-[#061828] via-[#071F34] to-[#041220] border border-[#08B9E8]/25 p-6 sm:p-10 lg:p-12 overflow-hidden">
                      {/* Subtle Dot Mesh Grid Pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(#08b9e8_1px,transparent_1px)] [background-size:26px_26px] opacity-15 pointer-events-none" />

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                        {/* ========================================================
                            LEFT COLUMN: REQUIN APPS TYPOGRAPHY & SPECS
                        ======================================================== */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                          {/* Category Badge */}
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08B9E8]/15 border border-[#08B9E8]/40 text-xs font-extrabold tracking-wider text-[#00c2ff] uppercase w-fit shadow-sm">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{project.category}</span>
                          </div>

                          {/* Punchy 3-Line Title (Line 1 Cyan, Line 2 & 3 White) */}
                          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.12]">
                            <span className="text-[#00c2ff] block">{sc.line1}</span>
                            <span className="text-white block">{sc.line2}</span>
                            <span className="text-white block">{sc.line3}</span>
                          </h2>

                          {/* Subtitle Description */}
                          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                            {sc.subtitle}
                          </p>

                          {/* Tech Stack Badges */}
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                              Architecture & Tech Stack:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {(Array.isArray(project.technologies)
                                ? project.technologies
                                : typeof project.technologies === 'string'
                                ? (project.technologies as string).split(',').map((t) => t.trim()).filter(Boolean)
                                : []
                              ).map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-200"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Links */}
                          <div className="pt-3 flex flex-wrap items-center gap-4">
                            <a
                              href={project.projectUrl || 'https://www.requingroup.com/'}
                              target="_blank"
                              rel="noopener"
                              className="inline-flex items-center gap-2 text-sm font-bold text-[#00c2ff] hover:text-[#38d4ff] uppercase tracking-wider transition-colors group/link cursor-pointer"
                            >
                              <span>VISIT LIVE DEMO</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </a>

                            {project.galleryImages && Array.isArray(project.galleryImages) && project.galleryImages.length > 1 && (
                              <button
                                onClick={() => openGallery(project)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                              >
                                <Maximize2 className="w-3.5 h-3.5 text-[#00c2ff]" />
                                <span>View All {project.galleryImages.length} Screens</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* ========================================================
                            RIGHT COLUMN: 3D ISOMETRIC TILTED BROWSER MOCKUP
                        ======================================================== */}
                        <div
                          className="lg:col-span-7 relative py-4 sm:py-6"
                          style={{ perspective: '1100px' }}
                        >
                          {/* 3D Angled Browser Container */}
                          <div
                            className="relative transition-all duration-700 ease-out cursor-pointer lg:[transform:perspective(1100px)_rotateY(-14deg)_rotateX(6deg)_scale(0.96)] hover:lg:[transform:perspective(1100px)_rotateY(0deg)_rotateX(0deg)_scale(1.02)]"
                            onClick={() => openGallery(project)}
                          >
                            {/* Showcase Image Frame */}
                            <div className="rounded-2xl sm:rounded-3xl bg-[#0B1B2B] border border-slate-700/90 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(0,194,255,0.15)] overflow-hidden transition-all duration-300 group-hover:border-[#08B9E8]/70 group-hover:shadow-[0_35px_80px_rgba(8,185,232,0.3)]">
                              {/* Screenshot Body */}
                              <div className="relative w-full overflow-hidden bg-slate-950">
                                <img
                                  src={getMediaUrl(project.featuredImage)}
                                  alt={project.projectName}
                                  className="w-full h-auto max-h-[440px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                                  loading="lazy"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                                  }}
                                />

                                {/* Subtle Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                  <span className="px-3.5 py-1.5 rounded-full bg-[#00c2ff] text-[#071827] text-xs font-bold shadow-lg flex items-center gap-1.5">
                                    <Maximize2 className="w-3.5 h-3.5" /> Click to View Full Screen Gallery
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ========================================================
          INTERACTIVE FULL SCREENSHOT GALLERY MODAL
      ======================================================== */}
      {activeGalleryProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#071827]/90 backdrop-blur-md animate-fadeIn"
          onClick={closeGallery}
        >
          <div
            className="relative w-[95vw] max-w-6xl bg-[#081524] rounded-3xl border border-slate-700/80 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(8,185,232,0.2)] overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-[#071827] flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-3 py-1 rounded-full bg-[#08B9E8]/15 border border-[#08B9E8]/40 text-[#08B9E8] text-xs font-extrabold uppercase shrink-0">
                  {activeGalleryProject.category}
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white truncate">
                  {activeGalleryProject.projectName}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Screen <span className="text-[#00c2ff] font-bold">{galleryPhotoIndex + 1}</span> of{' '}
                  {Array.isArray(activeGalleryProject.galleryImages) ? activeGalleryProject.galleryImages.length : 1}
                </span>
                <button
                  onClick={closeGallery}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 overflow-auto bg-slate-950 flex items-center justify-center min-h-[300px] sm:min-h-[450px]">
              <img
                src={getMediaUrl(
                  (Array.isArray(activeGalleryProject.galleryImages) &&
                    activeGalleryProject.galleryImages[galleryPhotoIndex]) ||
                  activeGalleryProject.featuredImage
                )}
                alt={`Screen ${galleryPhotoIndex + 1}`}
                className="w-full h-full max-h-[60vh] object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                }}
              />

              {/* Prev / Next Floating Arrows */}
              {Array.isArray(activeGalleryProject.galleryImages) && activeGalleryProject.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setGalleryPhotoIndex((prev) =>
                        prev === 0 ? activeGalleryProject.galleryImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#00c2ff] text-white hover:text-[#071827] backdrop-blur-md border border-white/20 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() =>
                      setGalleryPhotoIndex((prev) =>
                        prev === activeGalleryProject.galleryImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#00c2ff] text-white hover:text-[#071827] backdrop-blur-md border border-white/20 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Thumbnails Strip */}
            {Array.isArray(activeGalleryProject.galleryImages) && activeGalleryProject.galleryImages.length > 1 && (
              <div className="p-4 bg-[#06111E] border-t border-slate-800 flex items-center gap-3 overflow-x-auto shrink-0 scrollbar-thin">
                {activeGalleryProject.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGalleryPhotoIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      idx === galleryPhotoIndex
                        ? 'border-[#00c2ff] ring-2 ring-[#00c2ff]/80 scale-105 shadow-[0_0_15px_rgba(8,185,232,0.4)]'
                        : 'border-slate-700/80 opacity-60 hover:opacity-100 hover:border-slate-500'
                    }`}
                  >
                    <img
                      src={getMediaUrl(img)}
                      alt={`Thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer
        onNavigateSection={(sec) => navigate(`/#${sec}`)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      {/* <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectService={() => setIsQuizOpen(false)}
      /> */}
    </div>
  );
};
