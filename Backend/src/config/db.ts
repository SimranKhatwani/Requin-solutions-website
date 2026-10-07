import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { ENV } from './env';
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
  LifeAtRequinDoc,
  CMSDatabase,
} from '../types';

const STORE_PATH = path.join(ENV.DATA_DIR, 'cms_store.json');

if (!fs.existsSync(ENV.DATA_DIR)) {
  fs.mkdirSync(ENV.DATA_DIR, { recursive: true });
}

if (!fs.existsSync(ENV.UPLOADS_DIR)) {
  fs.mkdirSync(ENV.UPLOADS_DIR, { recursive: true });
}

export const getInitialSeed = (): CMSDatabase => {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync(ENV.ADMIN_DEFAULT_PASSWORD, salt);

  const adminUsers: AdminUser[] = [
    {
      id: 'admin-1',
      email: ENV.ADMIN_DEFAULT_EMAIL,
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
      category: 'CRM & Pipeline Automation',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'WebSocket Telemetry'],
      projectUrl: 'https://www.requingroup.com/',
      clientName: 'Enterprise Sales & Operations',
      status: 'PUBLISHED',
      displayOrder: 2,
      createdAt: '2025-12-05T09:30:00.000Z',
      updatedAt: '2026-02-10T14:20:00.000Z',
    },
    {
      id: 'proj-nexus-bill',
      projectName: 'NexusBill POS: High-Speed Counter Checkout',
      slug: 'nexusbill-pos',
      shortDescription:
        'Ultra-fast desktop and touch POS retail billing system with barcode scanning, GST breakdown, digital thermal invoice printing, and live stock sync.',
      fullDescription:
        'Designed for high-throughput retail stores, supermarkets, and electronics distributors. Features instant barcode scanning, multi-tier discount calculation, offline billing cache with background sync, and GST compliance.',
      featuredImage: '/images/products/nexusbill-demo.jpg',
      galleryImages: [
        '/images/products/nexusbill-dashboard.png',
        '/images/products/nexusbill-sales.png',
        '/images/products/nexusbill-inventory.png',
        '/images/products/nexusbill-purchases.png',
      ],
      category: 'POS & Retail Billing',
      technologies: ['Electron', 'React', 'SQLite', 'Thermal Printer ESC/POS', 'GST Engine'],
      projectUrl: 'https://www.requingroup.com/',
      clientName: 'Supermarkets & Retail Chains',
      status: 'PUBLISHED',
      displayOrder: 3,
      createdAt: '2026-01-10T08:00:00.000Z',
      updatedAt: '2026-02-28T16:00:00.000Z',
    },
    {
      id: 'proj-dine-dusk',
      projectName: 'Dine & Dusk: Restaurant KOT & Kitchen Command',
      slug: 'dine-and-dusk',
      shortDescription:
        'Modern hospitality POS integrating floor table mapping, wireless captain ordering, kitchen display systems (KDS), and inventory depletion.',
      fullDescription:
        'A comprehensive cloud and local restaurant management solution powering fine-dining establishments, multi-floor cafes, and QSR chains. Supports live table status visualizers, split-bill checkouts, recipe inventory deduction, and delivery aggregator integration.',
      featuredImage: '/images/products/dine-dusk-demo.jpg',
      galleryImages: [
        '/images/products/dine-dusk-pos.png',
        '/images/products/dine-dusk-dashboard.png',
        '/images/products/dine-dusk-tables.png',
        '/images/products/dine-dusk-kds.png',
      ],
      category: 'Hospitality & F&B',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Thermal KOT'],
      projectUrl: 'https://www.requingroup.com/',
      clientName: 'Premium Restaurants & Cafes',
      status: 'PUBLISHED',
      displayOrder: 4,
      createdAt: '2026-01-22T11:15:00.000Z',
      updatedAt: '2026-03-01T10:00:00.000Z',
    },
  ];

  const stories: StoryDoc[] = [
    {
      id: 'story-2019',
      title: 'Jaipur Roots & Founding Vision',
      year: '2019',
      description:
        'Founded with a single room and 3 passionate software engineers, set out to bring world-class custom engineering to ambitious founders.',
      storyContent:
        'Requin Solutions Pvt Ltd started with a fundamental belief: custom software should not only work reliably under scale, but empower businesses to outcompete and lead their industries. Operating from a small office in Jaipur, our founding engineers tackled bespoke full-stack applications, laying the groundwork for our high-velocity development culture.',
      image: '/images/digital_agency_office_1790576645354.jpg',
      galleryImages: [
        '/images/digital_agency_office_1790576645354.jpg',
        '/images/requin_software_team_1790576614688.jpg',
      ],
      displayOrder: 1,
      status: 'PUBLISHED',
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2026-02-01T10:00:00.000Z',
    },
    {
      id: 'story-2021',
      title: 'Cloud & Enterprise Architecture Pivot',
      year: '2021',
      description:
        'Surpassed 500 completed application milestones, transitioned from bespoke frontend builds to heavy distributed enterprise microservices.',
      storyContent:
        'As our client portfolio expanded, we invested heavily into Kubernetes, AWS, and reactive architectures. We built our internal code accelerator libraries and standard test harnesses, reducing project turnaround times by 40% while raising enterprise SLA guarantees.',
      image: '/images/cloud-architecture.jpg',
      galleryImages: ['/images/cloud-architecture.jpg', '/images/experience-team-collaboration.jpg'],
      displayOrder: 2,
      status: 'PUBLISHED',
      createdAt: '2024-03-10T10:00:00.000Z',
      updatedAt: '2026-02-01T10:00:00.000Z',
    },
    {
      id: 'story-2023',
      title: 'Requin Ops Launch & AI Engineering',
      year: '2023',
      description:
        'Architected our proprietary Academic & Enterprise ERP system, serving 40+ institutions and corporate client deployments across India and overseas.',
      storyContent:
        'The launch of Requin Ops marked our evolution into product-led enterprise engineering. Integrating real-time workflow tracking, telemetry analytics, and intelligent operational assistants, we expanded into high-compliance education and manufacturing verticals.',
      image: '/images/ai-analytics-dashboard.jpg',
      galleryImages: ['/images/ai-analytics-dashboard.jpg', '/images/digital_agency_office_1790576645354.jpg'],
      displayOrder: 3,
      status: 'PUBLISHED',
      createdAt: '2024-06-01T10:00:00.000Z',
      updatedAt: '2026-02-01T10:00:00.000Z',
    },
    {
      id: 'story-2026',
      title: 'Global Delivery & 2,000+ App Milestone',
      year: '2026',
      description:
        'Expanded our Malviya Nagar, Jaipur development headquarters with 40+ expert consultants, 100+ employees, and active enterprise deployments spanning North America, Europe, and Asia-Pacific.',
      storyContent:
        'Today, Requin Solutions stands as a trusted technology powerhouse. With over 2,000 production applications deployed, 96% client retention, and continuous innovation in AI workflows and cloud systems, we continue driving software excellence for market leaders globally.',
      image: '/images/requin_software_team_1790576614688.jpg',
      galleryImages: [
        '/images/requin_software_team_1790576614688.jpg',
        '/images/experience-team-collaboration.jpg',
      ],
      displayOrder: 4,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T10:00:00.000Z',
      updatedAt: '2026-03-01T10:00:00.000Z',
    },
  ];

  const testimonials: TestimonialDoc[] = [
    {
      id: 'test-1',
      name: 'Aditya Sharma',
      role: 'Head of Technology, Apex Retails',
      location: 'Mumbai, India',
      quote:
        'Requin Solutions delivered our multi-outlet VASTRA ERP system within 8 weeks. Their understanding of POS hardware, real-time inventory reconciliation, and billing workflows is truly best in class.',
      image: '/images/testimonials/avatar-1.jpg',
      isHighlighted: true,
      status: 'PUBLISHED',
      displayOrder: 1,
      createdAt: '2025-10-10T10:00:00.000Z',
      updatedAt: '2026-01-15T10:00:00.000Z',
    },
    {
      id: 'test-2',
      name: 'Sarah Jenkins',
      role: 'VP of Product, CloudScale Inc',
      location: 'Austin, TX',
      quote:
        'Working with the Requin engineering squad felt like an integrated extension of our in-house team. High code quality, proactive architectural suggestions, and relentless attention to UX detail.',
      image: '/images/testimonials/avatar-2.jpg',
      isHighlighted: true,
      status: 'PUBLISHED',
      displayOrder: 2,
      createdAt: '2025-11-05T10:00:00.000Z',
      updatedAt: '2026-01-15T10:00:00.000Z',
    },
  ];

  const media: MediaDoc[] = [
    {
      id: 'med-1',
      fileName: 'requin_software_team_1790576614688.jpg',
      originalName: 'requin_software_team.jpg',
      url: '/images/requin_software_team_1790576614688.jpg',
      mimeType: 'image/jpeg',
      size: 345000,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'med-2',
      fileName: 'digital_agency_office_1790576645354.jpg',
      originalName: 'digital_agency_office.jpg',
      url: '/images/digital_agency_office_1790576645354.jpg',
      mimeType: 'image/jpeg',
      size: 420000,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  ];

  const activities: ActivityDoc[] = [
    {
      id: 'act-init',
      action: 'System initialized',
      entityType: 'auth',
      entityTitle: 'Requin CMS Engine',
      adminEmail: ENV.ADMIN_DEFAULT_EMAIL,
      timestamp: new Date().toISOString(),
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
          caption: 'Celebrating half a decade of engineering excellence, customer partnerships, and high-velocity team growth.',
        },
        {
          id: 'anniv5-2',
          image: '/images/digital_agency_office_1790576645354.jpg',
          year: '2024',
          title: 'Founders Keynote & Excellence Awards 2024',
          caption: 'Honoring long-standing team members and leaders who shaped Requin Solutions from early beginnings.',
        },
        {
          id: 'anniv5-3',
          image: '/images/experience-team-collaboration.jpg',
          year: '2024',
          title: 'Future Horizons & Vision 2024',
          caption: 'Unveiling our next generation AI, enterprise cloud engineering, and global product roadmap.',
        },
      ],
      displayOrder: 1,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
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
          caption: 'Teams across engineering, product, and operations coming together for an unforgettable celebration evening.',
        },
        {
          id: 'op-2024-2',
          image: '/images/experience-team-collaboration.jpg',
          year: '2024',
          title: 'Office Party 2024 - Mid-Year Team Mixer',
          caption: 'Cross-functional engineering and design team collaboration session followed by games, pizza, and live music.',
        },
        {
          id: 'op-2023-1',
          image: '/images/requin_software_team_1790576614688.jpg',
          year: '2023',
          title: 'Office Party 2023 - Winter Festive Gala',
          caption: 'Celebrating record-breaking product delivery milestones and welcoming our newly expanded engineering batches.',
        },
        {
          id: 'op-2023-2',
          image: '/images/digital_agency_office_1790576645354.jpg',
          year: '2023',
          title: 'Office Party 2023 - Hackathon & Pizza Night',
          caption: '48-hour continuous innovation sprint building internal productivity accelerators.',
        },
        {
          id: 'op-2022-1',
          image: '/images/cloud-architecture.jpg',
          year: '2022',
          title: 'Office Party 2022 - Jaipur Studio Inauguration',
          caption: 'Opening of our specialized cloud and product design development wing in Jaipur.',
        },
      ],
      displayOrder: 2,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'g-3',
      title: 'Festival of Lights & Harmony',
      category: 'Diwali Party',
      image: '/images/experience-team-collaboration.jpg',
      caption: 'Traditional celebrations, festive office decorations, and team gifting at our Jaipur headquarters.',
      date: 'Diwali Festive Galas',
      photoCount: 15,
      years: ['2024', '2023'],
      photos: [
        {
          id: 'dw-2024-1',
          image: '/images/experience-team-collaboration.jpg',
          year: '2024',
          title: 'Diwali 2024 Grand Rangoli & Lighting Celebration',
          caption: 'Office decorated with traditional diyas, flowers, and ethnic attire celebrations.',
        },
        {
          id: 'dw-2023-1',
          image: '/images/requin_software_team_1790576614688.jpg',
          year: '2023',
          title: 'Diwali 2023 Sweet Gifting & Pooja Ceremony',
          caption: 'Spreading joy and light across our entire developer family in Jaipur.',
        },
      ],
      displayOrder: 3,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'g-4',
      title: 'Sports, Fitness & Outdoor Adventures',
      category: 'Sports & Games',
      image: '/images/cloud-architecture.jpg',
      caption: 'Cricket tournaments, table tennis championships, and outdoor weekend retreats promoting work-life balance.',
      date: 'Annual Tournaments & Outings',
      photoCount: 14,
      years: ['2024', '2023'],
      photos: [
        {
          id: 'sp-2024-1',
          image: '/images/cloud-architecture.jpg',
          year: '2024',
          title: 'Requin Premier League (RPL) Cricket Tournament 2024',
          caption: 'High-energy cricket championship organized between engineering and consulting squads.',
        },
        {
          id: 'sp-2023-1',
          image: '/images/requin_software_team_1790576614688.jpg',
          year: '2023',
          title: 'Aravalli Hills Team Trekking Expedition',
          caption: 'Nature trekking and team bonding amidst the hills surrounding Jaipur.',
        },
      ],
      displayOrder: 4,
      status: 'PUBLISHED',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
  ];

  return { adminUsers, blogs, projects, stories, testimonials, careers, lifeAtRequin, jobApplications, media, activities };
};

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
