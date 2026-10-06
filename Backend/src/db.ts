import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import {
  AdminUser,
  BlogDoc,
  ProjectDoc,
  StoryDoc,
  MediaDoc,
  ActivityDoc,
  TestimonialDoc,
  CareerDoc,
  JobApplicationDoc,
  SubscriberDoc,
  LifeAtRequinDoc,
} from './types';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'cms_store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface CMSDatabase {
  adminUsers: AdminUser[];
  blogs: BlogDoc[];
  projects: ProjectDoc[];
  stories: StoryDoc[];
  testimonials: TestimonialDoc[];
  careers: CareerDoc[];
  lifeAtRequin?: LifeAtRequinDoc[];
  jobApplications?: JobApplicationDoc[];
  subscribers?: SubscriberDoc[];
  media: MediaDoc[];
  activities: ActivityDoc[];
  supportInquiries?: { id: string; name: string; email: string; message: string; targetEmail: string; createdAt: string }[];
}

// Initial seed data authentic to https://www.requingroup.com/
const getInitialSeed = (): CMSDatabase => {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync('Admin@Requin2026!', salt);

  const adminUsers: AdminUser[] = [
    {
      id: 'admin-1',
      email: 'admin@requinsolutions.com',
      username: 'admin',
      passwordHash: adminPasswordHash,
      name: 'Requin Admin',
      role: 'superadmin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const blogs: BlogDoc[] = [];

  const projects: ProjectDoc[] = [
    {
      id: 'proj-vastra',
      projectName: 'VASTRA ERP: Boutique & Garment Enterprise Suite',
      slug: 'vastra-erp',
      shortDescription:
        'Comprehensive retail apparel and custom boutique management suite integrating POS billing, barcode generation, tailor workflow tracking, and alteration telemetry.',
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
      clientName: 'Luxury Fashion & Apparel Brands',
      status: 'PUBLISHED',
      displayOrder: 1,
      createdAt: '2025-11-20T10:00:00.000Z',
      updatedAt: '2026-02-15T12:00:00.000Z',
    },
    {
      id: 'proj-ops-crm',
      projectName: 'Requin Ops: Smart CRM & High-Velocity Pipelines',
      slug: 'requin-ops-crm',
      shortDescription:
        'Enterprise CRM and operations platform streamlining customer lead progression, multi-stage sales tracking, and client team collaboration.',
      fullDescription:
        'Requin Ops empowers businesses with high-velocity lead pipelines, customer communication timelines, automated deal progression triggers, and unified team effort dashboards.',
      featuredImage: '/images/products/requin-ops-demo.jpg',
      galleryImages: [
        '/images/products/requin-ops-pipeline.png',
        '/images/products/requin-ops-leads.png',
        '/images/products/requin-ops-login.png',
        '/images/products/requin-ops-report.png',
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
      projectName: 'NexusBill: Multi-Store POS Billing & Inventory Suite',
      slug: 'nexusbill-pos-inventory',
      shortDescription:
        'High-speed retail POS billing, barcode scanning, multi-warehouse inventory management, and automated GST-compliant tax reporting.',
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
      projectName: 'Dine & Dusk: Full-Stack Restaurant POS & Cloud KDS Engine',
      slug: 'dine-dusk-restaurant-os',
      shortDescription:
        'End-to-end restaurant operating system featuring table reservations, instant touch POS ordering, live kitchen display (KDS), and waiter tablets.',
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
      projectName: 'Enterprise Cloud Infrastructure & CI/CD Pipeline Automation',
      slug: 'cloud-infrastructure-cicd-automation',
      shortDescription:
        'Architected automated multi-cloud CI/CD deployment pipelines with Kubernetes container orchestration, cutting deployment time by 82%.',
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
      projectName: 'Requin AMS: Smart Biometric Tracking & Attendance Suite',
      slug: 'requin-ams-workforce',
      shortDescription:
        'Hardware-integrated biometric access and mobile QR attendance tracking engine preventing proxy check-ins with sub-second sync.',
      fullDescription:
        'Requin AMS combines dynamic rolling QR codes, geofenced boundaries, and time-stamped biometric auth to automate overtime, shifts, and payroll reporting.',
      featuredImage: '/images/products/requin-ams-demo.jpg',
      galleryImages: [
        '/images/products/requin-ams-dashboard.jpg',
        '/images/products/requin-ams-demo.jpg',
        '/images/products/requin-ams-attendance-rules.jpg',
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
  ];

  const stories: StoryDoc[] = [
    {
      id: 'story-1',
      title: 'Jaipur Roots & Founding Vision',
      description:
        'Founded with a single room and 3 passionate software engineers, set out to bring high-caliber custom engineering to ambitious founders.',
      year: '2019',
      image: '/images/digital_agency_office_1790576645354.jpg',
      galleryImages: ['/images/digital_agency_office_1790576645354.jpg'],
      storyContent:
        'Requin Solutions Pvt Ltd started with a fundamental belief: custom software development should be grounded in transparent engineering, direct client communication, and zero technical debt. Our early days in Jaipur laid the foundation for our values.',
      displayOrder: 1,
      status: 'PUBLISHED',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'story-2',
      title: 'Cloud & Enterprise Architecture Pivot',
      description:
        'Surpassed 500 completed application milestones, transitioned from bespoke websites to distributed cloud systems and enterprise microservices.',
      year: '2021',
      image: '/images/cloud_infrastructure_1790576629897.jpg',
      galleryImages: ['/images/cloud_infrastructure_1790576629897.jpg'],
      storyContent:
        'As our client portfolio expanded, we invested heavily into Kubernetes, AWS, and GCP certifications. We built out dedicated DevOps and QA automation practices that allowed our clients to scale their transactional volumes tenfold.',
      displayOrder: 2,
      status: 'PUBLISHED',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'story-3',
      title: 'Requin Ops Launch & AI Engineering',
      description:
        'Architected our proprietary Academic & Enterprise ERP system, serving 40+ educational institutions and enterprise partners across India and overseas.',
      year: '2023',
      image: '/images/modern_software_mockup_1790576657118.jpg',
      galleryImages: ['/images/modern_software_mockup_1790576657118.jpg'],
      storyContent:
        'The launch of Requin Ops marked our evolution into product-led enterprise engineering. We integrated predictive machine learning models into admissions routing and financial reconciliation, earning recognition in industry forums.',
      displayOrder: 3,
      status: 'PUBLISHED',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'story-4',
      title: 'Global Delivery & 2,000+ App Milestone',
      description:
        'Expanded our Malviya Nagar, Jaipur development headquarters with 40+ consultants, 2,000+ successful software deliverables, and 12 industry awards.',
      year: '2026',
      image: '/images/requin_software_team_1790576614688.jpg',
      galleryImages: ['/images/requin_software_team_1790576614688.jpg'],
      storyContent:
        'Today, Requin Solutions stands as a trusted engineering partner for enterprises, healthcare leaders, and academic institutions worldwide. Our mission remains unwavering: building a better future through innovative, rock-solid digital solutions.',
      displayOrder: 4,
      status: 'PUBLISHED',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  ];

  const media: MediaDoc[] = [
    {
      id: 'med-1',
      fileName: 'requin-logo.png',
      originalName: 'requin-logo.png',
      url: '/requin-logo.png',
      mimeType: 'image/png',
      size: 21903,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'med-2',
      fileName: 'digital_agency_office.jpg',
      originalName: 'digital_agency_office.jpg',
      url: '/images/digital_agency_office_1790576645354.jpg',
      mimeType: 'image/jpeg',
      size: 142000,
      createdAt: '2026-01-05T00:00:00.000Z',
      updatedAt: '2026-01-05T00:00:00.000Z',
    },
    {
      id: 'med-3',
      fileName: 'requin_software_team.jpg',
      originalName: 'requin_software_team.jpg',
      url: '/images/requin_software_team_1790576614688.jpg',
      mimeType: 'image/jpeg',
      size: 178000,
      createdAt: '2026-01-10T00:00:00.000Z',
      updatedAt: '2026-01-10T00:00:00.000Z',
    },
    {
      id: 'med-4',
      fileName: 'cloud_infrastructure.jpg',
      originalName: 'cloud_infrastructure.jpg',
      url: '/images/cloud_infrastructure_1790576629897.jpg',
      mimeType: 'image/jpeg',
      size: 156000,
      createdAt: '2026-01-12T00:00:00.000Z',
      updatedAt: '2026-01-12T00:00:00.000Z',
    },
    {
      id: 'med-5',
      fileName: 'modern_software_mockup.jpg',
      originalName: 'modern_software_mockup.jpg',
      url: '/images/modern_software_mockup_1790576657118.jpg',
      mimeType: 'image/jpeg',
      size: 194000,
      createdAt: '2026-01-15T00:00:00.000Z',
      updatedAt: '2026-01-15T00:00:00.000Z',
    },
  ];

  const activities: ActivityDoc[] = [
    {
      id: 'act-1',
      action: 'Content published',
      entityType: 'blog',
      entityTitle: 'The Rise of On-Demand Tutoring: How Technology is Reshaping Education',
      adminEmail: 'admin@requinsolutions.com',
      timestamp: '2026-02-15T09:00:00.000Z',
    },
    {
      id: 'act-2',
      action: 'Project updated',
      entityType: 'project',
      entityTitle: 'Enterprise Cloud Infrastructure & CI/CD Pipeline Automation',
      adminEmail: 'admin@requinsolutions.com',
      timestamp: '2026-02-10T14:20:00.000Z',
    },
    {
      id: 'act-3',
      action: 'Story added',
      entityType: 'story',
      entityTitle: 'Global Delivery & 2,000+ App Milestone',
      adminEmail: 'admin@requinsolutions.com',
      timestamp: '2026-02-05T11:45:00.000Z',
    },
    {
      id: 'act-4',
      action: 'Media asset uploaded',
      entityType: 'media',
      entityTitle: 'modern_software_mockup.jpg',
      adminEmail: 'admin@requinsolutions.com',
      timestamp: '2026-01-15T10:12:00.000Z',
    },
    {
      id: 'act-5',
      action: 'Admin logged in',
      entityType: 'auth',
      entityTitle: 'Session established',
      adminEmail: 'admin@requinsolutions.com',
      timestamp: new Date().toISOString(),
    },
  ];

  const testimonials: TestimonialDoc[] = [
    {
      id: 'test-1',
      name: 'Rohan Agarwal',
      role: 'Restaurant Owner',
      location: 'Jaipur, India',
      quote: 'Our table booking and online food orders grew by 45% within two months.',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80',
      isHighlighted: false,
      status: 'PUBLISHED',
      displayOrder: 1,
      createdAt: '2026-01-10T10:00:00.000Z',
      updatedAt: '2026-01-10T10:00:00.000Z',
    },
    {
      id: 'test-2',
      name: 'Lucas Miller',
      role: 'Wholesaler',
      location: 'Munich, Germany',
      quote: 'Inventory tracking and bulk supply invoices became 10x faster for our business.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      isHighlighted: false,
      status: 'PUBLISHED',
      displayOrder: 2,
      createdAt: '2026-01-12T10:00:00.000Z',
      updatedAt: '2026-01-12T10:00:00.000Z',
    },
    {
      id: 'test-3',
      name: 'Vikramaditya Rathore',
      role: 'Businessman',
      location: 'Jaipur, India',
      quote: 'The digital catalog and billing system made festive sales completely smooth.',
      image: 'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?auto=format&fit=crop&w=600&q=80',
      isHighlighted: false,
      status: 'PUBLISHED',
      displayOrder: 3,
      createdAt: '2026-01-15T10:00:00.000Z',
      updatedAt: '2026-01-15T10:00:00.000Z',
    },
    {
      id: 'test-4',
      name: 'Sarah Jenkins',
      role: 'E-Commerce Founder',
      location: 'Austin, USA',
      quote: 'The custom web store handled 20,000+ daily orders seamlessly without lagging.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      isHighlighted: false,
      status: 'PUBLISHED',
      displayOrder: 4,
      createdAt: '2026-01-20T10:00:00.000Z',
      updatedAt: '2026-01-20T10:00:00.000Z',
    },
    {
      id: 'test-5',
      name: 'Suresh Patel',
      role: 'Supermarket Owner',
      location: 'Ahmedabad, India',
      quote: 'Barcode billing and profit reports save us over 2 hours every evening.',
      image: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=600&q=80',
      isHighlighted: false,
      status: 'PUBLISHED',
      displayOrder: 5,
      createdAt: '2026-01-25T10:00:00.000Z',
      updatedAt: '2026-01-25T10:00:00.000Z',
    },
    {
      id: 'test-6',
      name: 'Marco Rossi',
      role: 'Logistics Director',
      location: 'Milan, Italy',
      quote: 'Live fleet route tracking and automated dispatch eliminated delivery delays.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      isHighlighted: false,
      status: 'PUBLISHED',
      displayOrder: 6,
      createdAt: '2026-02-01T10:00:00.000Z',
      updatedAt: '2026-02-01T10:00:00.000Z',
    },
    {
      id: 'test-7',
      name: 'Pooja Sharma',
      role: 'Retail Store Owner',
      location: 'Surat, India',
      quote: 'Customer order management and stock alerts are now completely automated.',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
      isHighlighted: false,
      status: 'PUBLISHED',
      displayOrder: 7,
      createdAt: '2026-02-05T10:00:00.000Z',
      updatedAt: '2026-02-05T10:00:00.000Z',
    },
    {
      id: 'test-8',
      name: 'David Chen',
      role: 'Import-Export Trader',
      location: 'Singapore',
      quote: 'Multi-currency billing and quote generator cut our client reply time in half.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
      isHighlighted: false,
      status: 'PUBLISHED',
      displayOrder: 8,
      createdAt: '2026-02-10T10:00:00.000Z',
      updatedAt: '2026-02-10T10:00:00.000Z',
    },
  ];

  const careers: CareerDoc[] = [];
  const jobApplications: JobApplicationDoc[] = [];

  const lifeAtRequin: LifeAtRequinDoc[] = [
    {
      id: 'g-1',
      title: '5th Anniversary Grand Celebration',
      category: '5th Anniversary',
      image: '/images/requin_software_team_1790576614688.jpg',
      caption: 'Celebrating half a decade of engineering excellence, team camaraderie, and shared milestones.',
      date: 'Annual Gala 2024',
      photoCount: 18,
      years: ['2024'],
      photos: [
        {
          id: 'anniv5-1',
          image: '/images/requin_software_team_1790576614688.jpg',
          year: '2024',
          title: '5th Anniversary Grand Gala 2024',
          caption: 'Celebrating half a decade of engineering excellence, customer partnerships, and high-velocity team growth.'
        },
        {
          id: 'anniv5-2',
          image: '/images/digital_agency_office_1790576645354.jpg',
          year: '2024',
          title: 'Founders Keynote & Excellence Awards 2024',
          caption: 'Honoring long-standing team members and leaders who shaped Requin Solutions from early beginnings.'
        },
        {
          id: 'anniv5-3',
          image: '/images/experience-team-collaboration.jpg',
          year: '2024',
          title: 'Future Horizons & Vision 2024',
          caption: 'Unveiling our next generation AI, enterprise cloud engineering, and global product roadmap.'
        }
      ],
      displayOrder: 1,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'g-2',
      title: 'An Evening to Unwind & Celebrate',
      category: 'Office Party',
      image: '/images/digital_agency_office_1790576645354.jpg',
      caption: 'Our quarterly demo day showcasing newly engineered features and cross-team design innovations.',
      date: 'Quarterly Showcase & Events',
      photoCount: 12,
      years: ['2024', '2023', '2022'],
      photos: [
        {
          id: 'op-2024-1',
          image: '/images/digital_agency_office_1790576645354.jpg',
          year: '2024',
          title: 'Office Party 2024 - Annual Success Celebration',
          caption: 'Teams across engineering, product, and operations coming together for an unforgettable celebration evening.'
        },
        {
          id: 'op-2024-2',
          image: '/images/experience-team-collaboration.jpg',
          year: '2024',
          title: 'Office Party 2024 - Mid-Year Team Mixer',
          caption: 'Cross-functional engineering and design team collaboration session followed by games, pizza, and live music.'
        },
        {
          id: 'op-2023-1',
          image: '/images/cloud_infrastructure_1790576629897.jpg',
          year: '2023',
          title: 'Office Party 2023 - Annual Gala Dinner',
          caption: 'Recognizing outstanding developers and contributors at the annual 2023 office party in Jaipur.'
        },
        {
          id: 'op-2023-2',
          image: '/images/requin_software_team_1790576614688.jpg',
          year: '2023',
          title: 'Office Party 2023 - Q4 Milestone Celebration',
          caption: 'Celebrating year-end milestones, team wins, and record client project deliveries.'
        },
        {
          id: 'op-2022-1',
          image: '/images/hero-developer-desk.jpg',
          year: '2022',
          title: 'Office Party 2022 - Winter Social Gathering',
          caption: 'Cozy winter celebration with team awards, live performances, and fun interactive activities.'
        }
      ],
      displayOrder: 2,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'g-3',
      title: 'Diwali Festive Evening at Requin',
      category: 'Diwali Party',
      image: '/images/modern_software_mockup_1790576657118.jpg',
      caption: 'Tradition meets innovation: lighting up our Jaipur workspace with cultural warmth, sweets, and celebration.',
      date: 'Festive Season Celebrations',
      photoCount: 24,
      years: ['2024', '2023', '2022'],
      photos: [
        {
          id: 'dp-2024-1',
          image: '/images/modern_software_mockup_1790576657118.jpg',
          year: '2024',
          title: 'Diwali Party 2024 - Traditional Puja & Diyas',
          caption: 'Lighting up our Jaipur workspace with handcrafted diyas, floral rangoli designs, and auspicious prayers.'
        },
        {
          id: 'dp-2024-2',
          image: '/images/requin_software_team_1790576614688.jpg',
          year: '2024',
          title: 'Diwali Party 2024 - Ethnic Wear Day & Sweets Distribution',
          caption: 'Celebrating unity and festive joy with traditional ethnic attire, gourmet sweets, and team gift hampers.'
        },
        {
          id: 'dp-2023-1',
          image: '/images/digital_agency_office_1790576645354.jpg',
          year: '2023',
          title: 'Diwali Party 2023 - Office Lighting & Rangoli Competition',
          caption: 'Creative design teams competing in vibrant floral rangolis and workspace illumination.'
        },
        {
          id: 'dp-2022-1',
          image: '/images/experience-team-collaboration.jpg',
          year: '2022',
          title: 'Diwali Party 2022 - Family Feast & Games Night',
          caption: 'Welcoming families and teammates for dinner, cultural games, and milestone recognitions.'
        }
      ],
      displayOrder: 3,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'g-4',
      title: 'Work Hard, Play Hard: Sports & Tournaments',
      category: 'Sports & Games',
      image: '/images/experience-team-collaboration.jpg',
      caption: 'Annual indoor cricket leagues, table tennis tournaments, and outdoor trekking expeditions.',
      date: 'Sports & Outdoor Activities',
      photoCount: 16,
      years: ['2024', '2023'],
      photos: [
        {
          id: 'sp-2024-1',
          image: '/images/experience-team-collaboration.jpg',
          year: '2024',
          title: 'Requin Premier Cricket Cup 2024',
          caption: 'Weekend corporate cricket tournament with high-energy matches and trophy ceremony.'
        },
        {
          id: 'sp-2024-2',
          image: '/images/digital_agency_office_1790576645354.jpg',
          year: '2024',
          title: 'Table Tennis Championship 2024',
          caption: 'Intense lunchtime table tennis showdowns and friendly rivalries.'
        },
        {
          id: 'sp-2023-1',
          image: '/images/requin_software_team_1790576614688.jpg',
          year: '2023',
          title: 'Aravalli Hills Team Trekking Expedition',
          caption: 'Nature trekking and team bonding amidst the hills surrounding Jaipur.'
        }
      ],
      displayOrder: 4,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z'
    }
  ];

  return { adminUsers, blogs, projects, stories, testimonials, careers, lifeAtRequin, jobApplications, media, activities };
};

// Safe File-backed store operations
export class CMSStore {
  private static data: CMSDatabase | null = null;

  public static get(): CMSDatabase {
    if (this.data) return this.data;

    try {
      if (fs.existsSync(STORE_PATH)) {
        const raw = fs.readFileSync(STORE_PATH, 'utf-8');
        this.data = JSON.parse(raw);
        let modified = false;
        if (this.data && !this.data.testimonials) {
          this.data.testimonials = getInitialSeed().testimonials;
          modified = true;
        }
        if (this.data && !this.data.careers) {
          this.data.careers = [];
          modified = true;
        }
        if (this.data && !this.data.lifeAtRequin) {
          this.data.lifeAtRequin = getInitialSeed().lifeAtRequin;
          modified = true;
        }
        if (this.data && !this.data.jobApplications) {
          this.data.jobApplications = [];
          modified = true;
        }
        if (modified) {
          this.save(this.data);
        }
        return this.data!;
      }
    } catch (err) {
      console.error('Error reading cms_store.json, creating fresh seed:', err);
    }

    const seed = getInitialSeed();
    this.save(seed);
    return seed;
  }

  public static save(data: CMSDatabase): void {
    this.data = data;
    try {
      fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to cms_store.json:', err);
    }
  }

  public static addActivity(
    action: string,
    entityType: ActivityDoc['entityType'],
    entityTitle: string,
    adminEmail: string
  ): void {
    const db = this.get();
    const newAct: ActivityDoc = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      entityType,
      entityTitle,
      adminEmail,
      timestamp: new Date().toISOString(),
    };
    db.activities.unshift(newAct);
    if (db.activities.length > 50) {
      db.activities = db.activities.slice(0, 50);
    }
    this.save(db);
  }
}

// Optional MongoDB Connection initialization
export async function initMongoDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('No MONGODB_URI provided in environment. Operating in persistent local JSON store mode.');
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log('Successfully connected to MongoDB instance at:', uri);
    return true;
  } catch (err) {
    console.warn('MongoDB connection attempt timed out or failed. Falling back to persistent local store mode:', (err as Error).message);
    return false;
  }
}
