import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { AdminUser, BlogDoc, ProjectDoc, StoryDoc, MediaDoc, ActivityDoc, TestimonialDoc } from './types';

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
  media: MediaDoc[];
  activities: ActivityDoc[];
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

  const blogs: BlogDoc[] = [
    {
      id: 'blog-1',
      title: 'The Rise of On-Demand Tutoring: How Technology is Reshaping Education',
      slug: 'the-rise-of-on-demand-tutoring',
      shortDescription:
        'Explore how scalable cloud systems, live interactive whiteboards, and AI diagnostic routing are modernizing remote academic learning globally.',
      content: `<h2>Transforming Modern Academic Support</h2>
<p>Modern higher education and competitive test preparation are evolving at breakneck speed. Traditional tutoring models often suffer from geographical constraints, rigid scheduling, and high administrative overhead. At Requin Solutions, we engineer next-generation EdTech platforms that connect students with specialized subject-matter experts on demand.</p>

<h3>Key Architectural Innovations</h3>
<ul>
  <li><strong>Instant WebSocket Routing:</strong> Sub-second matching of students with certified educators based on topic expertise, language, and real-time availability.</li>
  <li><strong>Synchronized Collaborative Canvases:</strong> Low-latency vector whiteboards enabling multi-party mathematical equations and code review.</li>
  <li><strong>Automated Session Summaries:</strong> Generative AI models producing bulleted lecture takeaways, assigned exercises, and conceptual checkpoints immediately after each class.</li>
</ul>

<h3>Measurable Pedagogical Outcomes</h3>
<p>Institutions implementing cloud-native on-demand tutoring systems report an average 38% increase in semester pass rates and a 45% reduction in student dropout rates. By removing friction from the learning process, technology empowers learners to ask questions right when they need help the most.</p>`,
      featuredImage: '/images/digital_agency_office_1790576645354.jpg',
      author: 'Requin Research Team',
      category: 'Education Technology',
      tags: ['EdTech', 'Cloud', 'Tutoring', 'AI'],
      publishedDate: '2026-02-15',
      status: 'PUBLISHED',
      createdAt: '2026-02-15T09:00:00.000Z',
      updatedAt: '2026-02-15T09:00:00.000Z',
    },
    {
      id: 'blog-2',
      title: 'Academic Assistance: Supporting Mental Health and Stress Reduction in Higher Education',
      slug: 'academic-assistance-supporting-mental-health',
      shortDescription:
        'Examining the critical intersection of academic deadlines, workload management tools, and proactive student wellbeing support systems.',
      content: `<h2>Balancing Rigorous Academics and Student Wellbeing</h2>
<p>Academic pressure in engineering, medical, and business graduate curriculums frequently peaks during midterms and finals. When students are overwhelmed by multiple overlapping deadlines, cognitive overload severely impacts both mental health and performance.</p>

<h3>Designing Empathetic Software Platforms</h3>
<p>Technology should not just measure outputs; it should alleviate operational stress. Our academic management software suite (Requin Ops AMS) introduces smart workload pacing algorithms that dynamically visualize impending submission bottlenecks weeks ahead of time.</p>

<ul>
  <li><strong>Workload Heatmaps:</strong> Visual indicators for students and academic advisors to pinpoint cluster deadlines.</li>
  <li><strong>Confidential Counseling Gateways:</strong> Integrated single-click support appointments with university counselors.</li>
  <li><strong>Structured Study Sprints:</strong> Pomodoro-aligned collaborative study rooms with distraction-free interfaces.</li>
</ul>`,
      featuredImage: '/images/requin_software_team_1790576614688.jpg',
      author: 'Dr. Alok Verma, Chief Consultant',
      category: 'Student Welfare',
      tags: ['Mental Health', 'Higher Education', 'Wellbeing', 'Software'],
      publishedDate: '2026-02-02',
      status: 'PUBLISHED',
      createdAt: '2026-02-02T10:00:00.000Z',
      updatedAt: '2026-02-02T10:00:00.000Z',
    },
    {
      id: 'blog-3',
      title: 'AI Tools in Learning Support: Balancing Innovation and Academic Integrity',
      slug: 'ai-tools-in-learning-support',
      shortDescription:
        'How enterprise universities and software teams create ethical frameworks, detection pipelines, and augmented learning assistants.',
      content: `<h2>Embracing Artificial Intelligence Responsibly</h2>
<p>Generative AI represents the most profound shift in computer science and pedagogy in a generation. Rather than outright banning modern large language models, leading educational institutions are partnering with software architects to build responsible, transparent learning companions.</p>

<h3>Socratic AI vs. Passive Answering</h3>
<p>The core distinction lies in pedagogical design. Instead of generating finished solutions for students, our Socratic tutor models prompt learners with guided questions, step-by-step logic hints, and conceptual analogies that build true mastery.</p>`,
      featuredImage: '/images/modern_software_mockup_1790576657118.jpg',
      author: 'Technology Advisory Board',
      category: 'AI & Machine Learning',
      tags: ['Artificial Intelligence', 'Academic Integrity', 'Deep Learning'],
      publishedDate: '2026-01-20',
      status: 'PUBLISHED',
      createdAt: '2026-01-20T14:30:00.000Z',
      updatedAt: '2026-01-20T14:30:00.000Z',
    },
    {
      id: 'blog-4',
      title: 'Strategies for Boosting Exam Success Rates: Evidence-Based Learning Methods',
      slug: 'strategies-for-boosting-exam-success-rates',
      shortDescription:
        'Data-backed techniques including spaced repetition algorithms and automated mock examination analytics that drive top percentile scores.',
      content: `<h2>Engineering High-Performance Study Protocols</h2>
<p>Decades of cognitive science confirm that cramming yields poor long-term retention. Automated software platforms equipped with SuperMemo SM-2 spaced repetition algorithms systematically reinforce volatile concepts right before the brain forgets them.</p>`,
      featuredImage: '/images/cloud_infrastructure_1790576629897.jpg',
      author: 'Priya Sharma, Lead Architect',
      category: 'Education Technology',
      tags: ['Exams', 'Analytics', 'Retention'],
      publishedDate: '2026-01-10',
      status: 'PUBLISHED',
      createdAt: '2026-01-10T11:00:00.000Z',
      updatedAt: '2026-01-10T11:00:00.000Z',
    },
    {
      id: 'blog-5',
      title: 'Enterprise Cloud Migration: Zero-Downtime Multi-Region Architectures',
      slug: 'enterprise-cloud-migration-zero-downtime',
      shortDescription:
        'Architectural playbook on breaking monolithic legacy stacks into containerized Kubernetes microservices on AWS and Google Cloud Platform.',
      content: `<h2>Modernizing Mission-Critical Enterprise Infrastructure</h2>
<p>Enterprise workloads demand 99.99% uptime. This deep dive covers database replication topologies, Canary release deployments with ArgoCD, and automated disaster failover strategies tested across our client installations.</p>`,
      featuredImage: '/images/cloud_infrastructure_1790576629897.jpg',
      author: 'Cloud Infrastructure Group',
      category: 'Cloud Engineering',
      tags: ['DevOps', 'Kubernetes', 'AWS', 'GCP'],
      publishedDate: '2025-12-18',
      status: 'DRAFT',
      createdAt: '2025-12-18T08:00:00.000Z',
      updatedAt: '2026-02-10T12:00:00.000Z',
    },
  ];

  const projects: ProjectDoc[] = [
    {
      id: 'proj-1',
      projectName: 'Enterprise Cloud Infrastructure & CI/CD Pipeline Automation',
      slug: 'cloud-infrastructure-cicd-automation',
      shortDescription:
        'Architected automated multi-cloud CI/CD deployment pipelines with Kubernetes container orchestration, cutting deployment time by 82%.',
      fullDescription:
        'Comprehensive infrastructure overhaul for high-traffic financial and enterprise clients. Built automated GitOps release workflows with automated integration testing, vulnerability scans, dynamic autoscaling, and centralized Prometheus/Grafana telemetry.',
      featuredImage: '/images/cloud_infrastructure_1790576629897.jpg',
      galleryImages: [
        '/images/cloud_infrastructure_1790576629897.jpg',
        '/images/modern_software_mockup_1790576657118.jpg',
      ],
      category: 'Cloud & DevOps',
      technologies: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GitHub Actions', 'Prometheus'],
      projectUrl: 'https://www.requingroup.com/',
      clientName: 'Global FinTech Client',
      status: 'PUBLISHED',
      displayOrder: 1,
      createdAt: '2025-11-01T10:00:00.000Z',
      updatedAt: '2026-01-15T12:00:00.000Z',
    },
    {
      id: 'proj-2',
      projectName: 'Requin Ops: Academic & Enterprise ERP Management Suite',
      slug: 'requin-ops-academic-erp-suite',
      shortDescription:
        'Unified end-to-end institution operating system handling admissions, faculty workload, automated grading pipelines, and fee disbursement.',
      fullDescription:
        'Requin Ops is our flagship enterprise ERP deployed across universities and colleges. It consolidates disparate legacy databases into a real-time reactive dashboard, providing role-based security, automated SMS/WhatsApp alerts, and audit-ready reporting.',
      featuredImage: '/images/modern_software_mockup_1790576657118.jpg',
      galleryImages: [
        '/images/modern_software_mockup_1790576657118.jpg',
        '/images/digital_agency_office_1790576645354.jpg',
      ],
      category: 'Enterprise Software',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      projectUrl: 'https://www.requingroup.com/',
      clientName: 'University Consortia',
      status: 'PUBLISHED',
      displayOrder: 2,
      createdAt: '2025-10-12T11:00:00.000Z',
      updatedAt: '2026-02-01T15:00:00.000Z',
    },
    {
      id: 'proj-3',
      projectName: 'FinTech Microservices Payment Gateway & Compliance Engine',
      slug: 'fintech-microservices-payment-gateway',
      shortDescription:
        'High-throughput distributed ledger and payment routing engine processing 200,000+ daily transactions with ISO27001 PCI-DSS compliance.',
      fullDescription:
        'Engineered an ultra-resilient payment gateway architecture with smart bank switch routing, fraud detection scoring in under 45ms, and automated settlement reconciliation.',
      featuredImage: '/images/requin_software_team_1790576614688.jpg',
      galleryImages: [
        '/images/requin_software_team_1790576614688.jpg',
        '/images/cloud_infrastructure_1790576629897.jpg',
      ],
      category: 'FinTech & Security',
      technologies: ['Go', 'Node.js', 'Apache Kafka', 'PostgreSQL', 'Vault', 'Stripe API'],
      projectUrl: 'https://www.requingroup.com/',
      clientName: 'Apex Pay Solutions',
      status: 'PUBLISHED',
      displayOrder: 3,
      createdAt: '2025-09-05T09:00:00.000Z',
      updatedAt: '2026-01-20T10:00:00.000Z',
    },
    {
      id: 'proj-4',
      projectName: 'Smart IoT Supply Chain & Fleet Telemetry System',
      slug: 'smart-iot-fleet-telemetry',
      shortDescription:
        'Real-time GPS, temperature sensor mesh, and route optimization engine for cold-chain pharmaceutical transport across 14 states.',
      fullDescription:
        'Connected 3,500+ commercial vehicles with edge IoT hardware, streaming continuous sensor data via MQTT to cloud time-series databases with geofence anomaly triggers.',
      featuredImage: '/images/digital_agency_office_1790576645354.jpg',
      galleryImages: ['/images/digital_agency_office_1790576645354.jpg'],
      category: 'IoT & Smart Infrastructure',
      technologies: ['MQTT', 'Node.js', 'InfluxDB', 'React Native', 'AWS IoT Core'],
      projectUrl: 'https://www.requingroup.com/',
      clientName: 'LogiTrans National',
      status: 'PUBLISHED',
      displayOrder: 4,
      createdAt: '2025-08-14T14:00:00.000Z',
      updatedAt: '2026-01-08T11:00:00.000Z',
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

  return { adminUsers, blogs, projects, stories, testimonials, media, activities };
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
        if (this.data && !this.data.testimonials) {
          this.data.testimonials = getInitialSeed().testimonials;
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
