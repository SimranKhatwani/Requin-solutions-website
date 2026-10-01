export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  image: string;
  highlights: string[];
  technologies: string[];
}

export interface ProductItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  features: string[];
  metrics: { label: string; value: string }[];
  image: string;
  badge?: string;
  architectureDetails: string[];
}

export interface SoftwareSolutionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  keyOutcomes: string[];
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  impact: string;
  tag: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'All' | '5th Anniversary' | 'Diwali' | '4th Anniversary' | 'Office Party';
  image: string;
  caption: string;
  date: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    targetService: string;
  }[];
}

export const REQUIN_COMPANY_INFO = {
  name: 'Requin Solutions Pvt Ltd',
  shortName: 'Requin Solutions',
  tagline: 'Building Digital Solutions That Move Businesses Forward',
  establishedYear: '2019',
  headquarters: 'Plot no 6/397, 1st Floor, Sec-6, Malviya Nagar, Jaipur, Rajasthan (302017)',
  emails: {
    general: 'info@requinsolutions.com',
    careers: 'hr@requinsolutions.com',
  },
  phones: {
    primary: '+91 141 356 8920',
    support: '+91 982 901 2489',
  },
  aboutProse: `Requin Solutions is an innovative technology enterprise delivering tailored software development, scalable cloud systems, intuitive mobile applications, and digital business solutions. We collaborate with high-growth startups and established corporations across North America, Europe, the Middle East, and Asia Pacific to engineer mission-critical digital products that elevate operational velocity and create lasting market value.`,
  experienceMetrics: [
    { label: 'Years of Excellence', value: '5+' },
    { label: 'Projects Delivered', value: '80+' },
    { label: 'Tech Specialists', value: '45+' },
    { label: 'Client Retention Rate', value: '96%' },
  ],
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Twitter / X', url: 'https://twitter.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'GitHub', url: 'https://github.com' },
  ],
};

export const REQUIN_SERVICES: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'Engineering',
    description: 'We provide the best solutions for web development with extensive experience in various projects.',
    overview: 'From custom customer portals to high-throughput web applications, our engineering team builds resilient, accessible, and lightning-fast digital experiences that convert and scale.',
    image: '/images/modern_software_mockup_1790576657118.jpg',
    highlights: [
      'Custom Single-Page & Server-Side Rendered Applications',
      'Micro-frontend architecture and design system implementation',
      'End-to-end security compliance, SEO mastery, and core web vitals optimization',
      'API-first headless integrations with modern CMS and commerce backends'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL']
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    category: 'Native & Cross-Platform',
    description: 'Innovative mobile applications for iOS and Android platforms.',
    overview: 'We build native and hybrid mobile apps that feel intuitive, load instantly, and keep users engaged across smartphone and tablet form factors.',
    image: '/images/digital_agency_office_1790576645354.jpg',
    highlights: [
      'Native Swift/Kotlin and cross-platform React Native / Flutter builds',
      'Offline-first data sync with background push notifications',
      'Biometric authentication, geo-location mapping, and hardware API bridge',
      'App Store and Google Play continuous deployment pipelines'
    ],
    technologies: ['React Native', 'Flutter', 'iOS Swift', 'Android Kotlin', 'Firebase', 'Fastlane']
  },
  {
    id: 'software-solutions',
    title: 'Software Solutions',
    category: 'Enterprise Systems',
    description: 'Custom software solutions that streamline your business processes.',
    overview: 'Replace disjointed legacy tooling with unified software ecosystems custom-tailored to your organizational business logic and multi-tier workflows.',
    image: '/images/requin_software_team_1790576614688.jpg',
    highlights: [
      'Custom ERP, inventory management, and CRM platforms',
      'Role-based access control with granular permission matrices',
      'Legacy system migration and multi-system webhook synchronization',
      'Automated batch data processing and business intelligence reporting'
    ],
    technologies: ['Python', 'Go', 'Node.js', 'PostgreSQL', 'Redis', 'Docker']
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    category: 'Infrastructure & DevOps',
    description: 'Secure and scalable cloud infrastructure for your business.',
    overview: 'We architect, optimize, and maintain zero-downtime cloud environments across AWS, Google Cloud, and Azure, slashing latency and operating expenditures.',
    image: '/images/cloud_infrastructure_1790576629897.jpg',
    highlights: [
      'Infrastructure as Code (Terraform) and GitOps CI/CD automation',
      'Kubernetes container orchestration and service mesh architectures',
      'Serverless computing pipelines and event-driven architectures',
      'Cloud security posture management, encryption at rest, and audit compliance'
    ],
    technologies: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Performance',
    description: 'Data-driven digital marketing strategies to grow your brand with the right audience.',
    overview: 'Bridge technology and market traction. We combine technical SEO, content architectures, and precision performance marketing to generate compounding inbound pipeline.',
    image: '/images/modern_software_mockup_1790576657118.jpg',
    highlights: [
      'Comprehensive Technical SEO and semantic Schema markup architecture',
      'Conversion rate optimization (CRO) and user journey funnel analysis',
      'Omnichannel performance campaigns across search and social channels',
      'Executive analytics dashboards and attributable return-on-ad-spend reporting'
    ],
    technologies: ['Google Analytics 4', 'Search Console', 'Tag Manager', 'HubSpot', 'Mixpanel']
  },
  {
    id: 'academic-assistance',
    title: 'Academic Assistance',
    category: 'Knowledge & Research',
    description: 'Expert support for research papers, project management, and academic excellence.',
    overview: 'Bridging academia and practical engineering. We provide research data modeling, thesis system prototyping, and hands-on software workshops for institutions.',
    image: '/images/requin_software_team_1790576614688.jpg',
    highlights: [
      'Computational research prototypes and algorithmic simulations',
      'Peer-reviewed technical documentation and dataset modeling',
      'Hands-on engineering workshops and modern tech stack mentorship',
      'Academic lab software tooling and institutional database architecture'
    ],
    technologies: ['LaTeX', 'Python Science Stack', 'R', 'Jupyter', 'PostgreSQL', 'TensorFlow']
  }
];

export const REQUIN_PRODUCTS: ProductItem[] = [
  {
    id: 'requin-ops',
    title: 'Requin Ops',
    tagline: 'Intelligent Enterprise CRM & Sales Workflow Orchestration',
    description: 'A comprehensive customer relationship and revenue operations platform engineered to manage client pipelines, automate deal communications, and surface predictive sales intelligence.',
    category: 'Enterprise CRM',
    badge: 'Flagship Platform',
    features: [
      'Contact and multi-tier organizational lead hierarchy management',
      'Real-time sales pipeline stage tracking with automated deal progression triggers',
      'Calendar scheduling and bidirectional email synchronization',
      'Custom pipeline forecasting, deal velocity analytics, and SLA monitoring',
      'Role-based multi-tenant access control with audited permission security'
    ],
    metrics: [
      { label: 'Pipeline Velocity', value: '+3.4x' },
      { label: 'Lead Conversion', value: '42%' },
      { label: 'Time-to-Close', value: '-28%' }
    ],
    image: '/images/modern_software_mockup_1790576657118.jpg',
    architectureDetails: [
      'Microservices backend built with Node.js and PostgreSQL',
      'WebSocket event bus for real-time collaborative deal updates',
      'Encrypted client storage with zero-knowledge data isolation'
    ]
  },
  {
    id: 'requin-ams',
    title: 'Requin AMS',
    tagline: 'Modern Workforce Attendance & Time Tracking System',
    description: 'An advanced workforce management and attendance tracking platform featuring dynamic QR check-ins, geo-fencing verification, and automated shift scheduling.',
    category: 'Workforce Operations',
    features: [
      'Real-time employee check-in and check-out tracking with sub-second sync',
      'Dynamic rolling QR scan verification preventing proxy attendance',
      'Geofenced workplace boundary detection for on-site field staff',
      'Automated overtime calculation, holiday calendars, and shift swap workflows',
      'Executive compliance reports and one-click payroll CSV export'
    ],
    metrics: [
      { label: 'Attendance Accuracy', value: '99.9%' },
      { label: 'Clock-in Latency', value: '<0.8s' },
      { label: 'Admin Hours Saved', value: '18h/wk' }
    ],
    image: '/images/digital_agency_office_1790576645354.jpg',
    architectureDetails: [
      'High-throughput mobile sync engine with offline offline-caching',
      'Cryptographic time-stamped QR generation for tamper prevention',
      'REST & GraphQL integration connectors for SAP and standard HRMS'
    ]
  },
  {
    id: 'hrms',
    title: 'Requin HRMS',
    tagline: 'Unified Human Resource & Talent Management Suite',
    description: 'A human resource suite engineered for modern organizations to unify employee lifecycles, automated tax-compliant payroll, performance appraisals, and self-service portals.',
    category: 'Human Capital',
    features: [
      'Comprehensive employee directory with digital document repositories',
      'Tax-compliant automated payroll engine with salary slip distribution',
      'Self-service employee portal for leave management and expense claims',
      'Objective & Key Results (OKR) tracking and 360-degree appraisal cycles',
      'Secure document storage with biometric signing and compliance logs'
    ],
    metrics: [
      { label: 'Payroll Processing', value: 'Instant' },
      { label: 'Staff Engagement', value: '94%' },
      { label: 'Paperless Rate', value: '100%' }
    ],
    image: '/images/requin_software_team_1790576614688.jpg',
    architectureDetails: [
      'Automated payroll math engine with statutory deduction tables',
      'Granular department permissions and custom approval chains',
      'Export connectors for standard tax and banking protocols'
    ]
  },
  {
    id: 'requin-chat',
    title: 'Requin Chat',
    tagline: 'Real-time Encrypted Team Collaboration Platform',
    description: 'An organizational messaging and collaboration platform offering end-to-end encrypted messaging, voice/video huddles, and granular channel control.',
    category: 'Team Communication',
    features: [
      'Sub-50ms instant messaging across mobile, desktop, and web clients',
      'High-fidelity voice and screen sharing capabilities for agile team huddles',
      'Secure document and media sharing with automatic preview generation',
      'Public, private, and broadcast announcement channels with read receipts',
      'End-to-end encryption protocols ensuring strict internal privacy'
    ],
    metrics: [
      { label: 'Message Latency', value: '<50ms' },
      { label: 'Uptime SLA', value: '99.95%' },
      { label: 'Encryption', value: 'AES-256' }
    ],
    image: '/images/cloud_infrastructure_1790576629897.jpg',
    architectureDetails: [
      'Distributed WebRTC audio/video mesh with fallback TURN servers',
      'Decentralized message broker cluster using Redis Pub/Sub',
      'Zero-storage ephemeral chat options for sensitive discussions'
    ]
  }
];

export const SOFTWARE_PORTFOLIO_ITEMS: SoftwareSolutionItem[] = [
  {
    id: 'hrms-enterprise',
    title: 'Enterprise HR Management System',
    subtitle: 'Full-cycle Talent & Operations Engine',
    description: 'A custom-built enterprise HR solution unifying workforce data, automated salary computation, attendance analytics, and employee leave requests.',
    category: 'Software Solutions',
    image: '/images/requin_software_team_1790576614688.jpg',
    tags: ['HR Tech', 'React', 'Node.js', 'PostgreSQL'],
    keyOutcomes: [
      'Centralized employee records for 1,200+ personnel across 3 regional branches',
      'Reduced monthly payroll reconciliation from 4 business days to 2 hours'
    ]
  },
  {
    id: 'biometric-access',
    title: 'Biometric Access & Workforce Auth',
    subtitle: 'Hardware-Integrated Access Security',
    description: 'Multi-location hardware-integrated biometric identity system with cloud synchronization and real-time attendance verification.',
    category: 'Security & IoT',
    image: '/images/digital_agency_office_1790576645354.jpg',
    tags: ['IoT', 'Biometrics', 'Go', 'Cloud Sync'],
    keyOutcomes: [
      'Sub-second authentication at 12 physical campus entry terminals',
      'Zero recorded proxy attendance with hardware tamper alarms'
    ]
  },
  {
    id: 'b2b-commerce',
    title: 'High-Volume B2B Commerce Engine',
    subtitle: 'Wholesale Ordering & Inventory Mesh',
    description: 'Custom headless commerce platform supporting tiered pricing, multi-currency settlement, and real-time ERP warehouse sync.',
    category: 'Web Development',
    image: '/images/modern_software_mockup_1790576657118.jpg',
    tags: ['Next.js', 'GraphQL', 'Stripe', 'Redis'],
    keyOutcomes: [
      'Engineered to handle 50,000+ SKU variants with sub-100ms catalog search',
      'Integrated live logistics tracking across 4 national freight carriers'
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Multi-Cloud Infrastructure Automation',
    subtitle: 'Zero-Downtime Migration & CI/CD Pipeline',
    description: 'Cloud modernization project transforming a monolithic on-premise application into resilient containerized microservices.',
    category: 'Cloud Solutions',
    image: '/images/cloud_infrastructure_1790576629897.jpg',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'DevOps'],
    keyOutcomes: [
      'Achieved 99.98% service uptime across peak traffic events',
      'Cut deployment cycle duration from 3 weeks to automated 12-minute builds'
    ]
  }
];

export const OUR_STORY_MILESTONES: StoryMilestone[] = [
  {
    year: '2019',
    title: 'Foundation & Engineering Vision',
    description: 'Requin Solutions was founded in Jaipur with a clear conviction: to engineer software solutions that solve real business problems without bloat.',
    impact: 'Assembled founding team of 6 engineers and delivered our first 8 client software systems.',
    tag: 'Origin'
  },
  {
    year: '2020',
    title: 'Enterprise Systems & Web Platforms',
    description: 'Expanded core engineering capabilities into complex web applications, high-performance backends, and multi-tenant architectures.',
    impact: 'Scaled delivery to 25+ projects and secured partnerships with prominent regional enterprises.',
    tag: 'Expansion'
  },
  {
    year: '2022',
    title: 'Cloud Practice & DevOps Automation',
    description: 'Established a dedicated cloud engineering and infrastructure division to design resilient AWS and GCP architectures with automated CI/CD pipelines.',
    impact: 'Migrated 15+ legacy on-premises databases to high-availability managed cloud platforms.',
    tag: 'Cloud Maturity'
  },
  {
    year: '2023',
    title: 'Product Studio & Requin Suite Incubation',
    description: 'Leveraged deep enterprise domain experience to incubate proprietary software products: Requin Ops CRM and Requin AMS workforce management.',
    impact: 'Deployed internal beta products to 1,000+ daily active users across partner organizations.',
    tag: 'Innovation'
  },
  {
    year: '2024–Present',
    title: 'Global Delivery & Scaled Digital Solutions',
    description: 'Accelerating digital transformation across international markets with modern full-stack development, mobile ecosystems, and enterprise software.',
    impact: 'Operating out of expanded Malviya Nagar headquarters with 45+ engineers and designers.',
    tag: 'Scale'
  }
];

export const LIFE_AT_REQUIN_GALLERY: GalleryImage[] = [
  {
    id: 'g-1',
    title: '5th Anniversary Grand Celebration',
    category: '5th Anniversary',
    image: '/images/requin_software_team_1790576614688.jpg',
    caption: 'Celebrating half a decade of engineering excellence, team camaraderie, and shared milestones.',
    date: 'Annual Gala 2024'
  },
  {
    id: 'g-2',
    title: 'Engineering Sprint & Product Demo Day',
    category: 'Office Party',
    image: '/images/digital_agency_office_1790576645354.jpg',
    caption: 'Our quarterly demo day showcasing newly engineered features and cross-team design innovations.',
    date: 'Quarterly Showcase'
  },
  {
    id: 'g-3',
    title: 'Diwali Festive Evening at HQ',
    category: 'Diwali',
    image: '/images/modern_software_mockup_1790576657118.jpg',
    caption: 'Tradition meets innovation: lighting up our Jaipur workspace with cultural warmth, sweets, and celebration.',
    date: 'Festive Season'
  },
  {
    id: 'g-4',
    title: '4th Anniversary Milestone Gala',
    category: '4th Anniversary',
    image: '/images/cloud_infrastructure_1790576629897.jpg',
    caption: 'Reflecting on four continuous years of high-velocity growth and rewarding our longest-tenured team members.',
    date: 'Annual Milestone'
  },
  {
    id: 'g-5',
    title: 'Collaborative Design & Architecture Sync',
    category: 'Office Party',
    image: '/images/requin_software_team_1790576614688.jpg',
    caption: 'Cross-functional design and backend teams sketching system diagrams and user flows.',
    date: 'Studio Culture'
  },
  {
    id: 'g-6',
    title: 'Diwali Office Decor & Festive Team Games',
    category: 'Diwali',
    image: '/images/digital_agency_office_1790576645354.jpg',
    caption: 'Team games, traditional attire, and celebratory togetherness across all departments.',
    date: 'Cultural Fellowship'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the primary objective of your technology initiative?',
    subtitle: 'Select the goal that best reflects your current organizational priority.',
    options: [
      {
        label: 'Build a Modern Web or Mobile Application',
        description: 'Create a customer-facing digital product with intuitive user experience and responsive performance.',
        targetService: 'web-development'
      },
      {
        label: 'Automate Internal Operations & Enterprise Workflows',
        description: 'Replace spreadsheets and manual processes with a centralized CRM, HRMS, or custom software.',
        targetService: 'software-solutions'
      },
      {
        label: 'Modernize Cloud Infrastructure & DevOps',
        description: 'Migrate to resilient cloud platforms, optimize AWS/GCP expenses, and automate deployments.',
        targetService: 'cloud-solutions'
      },
      {
        label: 'Scale Search Visibility & Digital Inbound Growth',
        description: 'Maximize qualified organic traffic and conversion funnels with data-driven technical marketing.',
        targetService: 'digital-marketing'
      }
    ]
  },
  {
    id: 2,
    question: 'What is the anticipated scale or user audience of your system?',
    subtitle: 'This helps us suggest the ideal architecture and delivery timeline.',
    options: [
      {
        label: 'Internal Team & Operational Workforce (10–500 Users)',
        description: 'Streamlined role permissions, fast data entry, and unified reporting for your employees.',
        targetService: 'software-solutions'
      },
      {
        label: 'High-Growth Startup / Consumer Audience (Thousands to Millions)',
        description: 'High concurrency, elastic cloud autoscaling, native mobile apps, and low-latency APIs.',
        targetService: 'web-development'
      },
      {
        label: 'Enterprise Ecosystem with Multi-System Integrations',
        description: 'Complex ERP connections, legacy migrations, compliance controls, and high-availability SLAs.',
        targetService: 'cloud-solutions'
      },
      {
        label: 'Institutional / Research / Academic Application',
        description: 'Computational modeling, structured dataset analysis, and technical documentation.',
        targetService: 'academic-assistance'
      }
    ]
  },
  {
    id: 3,
    question: 'What is your target timeline for launching or deploying the initial version?',
    subtitle: 'We tailor our agile sprints to align with your business deadlines.',
    options: [
      {
        label: 'Rapid Prototype / MVP (4 to 8 Weeks)',
        description: 'Focused scope, clean MVP architecture, ready for immediate market validation.',
        targetService: 'web-development'
      },
      {
        label: 'Full Commercial Release (2 to 4 Months)',
        description: 'Production-grade engineering, comprehensive QA testing, and integrated third-party systems.',
        targetService: 'software-solutions'
      },
      {
        label: 'Continuous Strategic Engineering Partner (Ongoing)',
        description: 'Dedicated agile team embedded within your organization for continuous feature delivery.',
        targetService: 'cloud-solutions'
      },
      {
        label: 'Discovery & Architectural Consulting Phase',
        description: 'Requirements definition, technical feasibility analysis, and architecture blueprints.',
        targetService: 'software-solutions'
      }
    ]
  }
];
