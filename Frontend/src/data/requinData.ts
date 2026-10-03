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

export interface ProductGalleryItem {
  title: string;
  caption: string;
  image: string;
}

export interface ProductItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  features: string[];
  bullets?: string[];
  gallery?: ProductGalleryItem[];
  visualSide?: 'left' | 'right';
  metrics: { label: string; value: string }[];
  image: string;
  videoUrl?: string;
  badge?: string;
  architectureDetails: string[];
}

export interface ShowcaseProductItem extends ProductItem {
  visualSide: 'left' | 'right';
  bullets: string[];
  gallery?: ProductGalleryItem[];
}

export const SHOWCASE_PRODUCTS: ShowcaseProductItem[] = [
  {
    id: 'requin-ops',
    title: 'Requin Ops',
    tagline: 'Smart CRM, High-Velocity Pipelines',
    description: 'A CRM system for managing customer relationships efficiently.',
    category: 'Enterprise CRM',
    badge: 'Flagship Platform',
    features: [
      'Contact and multi-tier organizational lead hierarchy management',
      'Real-time sales pipeline stage tracking with automated deal progression triggers',
      'Calendar scheduling and bidirectional email synchronization',
      'Custom pipeline forecasting, deal velocity analytics, and SLA monitoring',
    ],
    bullets: [
      'Contact and lead management',
      'Sales pipeline tracking',
      'Task scheduling and email integration',
      'Custom reporting and analytics',
      'Multi-user support with role-based access',
    ],
    gallery: [
      {
        title: 'Efforts & Delivery Tracking',
        caption: 'Centralized project delivery logs, task IDs, and milestone verification.',
        image: '/images/products/requin-ops-efforts.png',
      },
      {
        title: 'Task Assignment & Operations Detail',
        caption: 'Granular task assignment, progress tracking, and soft & hard deadline management.',
        image: '/images/products/requin-ops-tasklist.png',
      },
      {
        title: 'Task Status Report & Work Calendar',
        caption: 'Real-time status breakdown across running, approved, quality check, and work calendar.',
        image: '/images/products/requin-ops-report.png',
      },
    ],
    metrics: [
      { label: 'Pipeline Velocity', value: '+3.4x' },
      { label: 'Pipeline Visibility', value: '100%' },
      { label: 'Time-to-Close', value: '-28%' },
    ],
    image: '/images/products/requin-ops-demo.jpg',
    architectureDetails: [
      'Microservices backend built with Node.js and PostgreSQL',
      'WebSocket event bus for real-time collaborative deal updates',
    ],
    visualSide: 'right',
  },
  {
    id: 'requin-ams',
    title: 'Requin AMS',
    tagline: 'Smart Tracking, Seamless Attendance',
    description: 'An attendance management system for tracking employee work hours.',
    category: 'Workforce Operations',
    badge: 'Real-time Tracking',
    features: [
      'Real-time employee check-in and check-out tracking with sub-second sync',
      'Dynamic rolling QR scan verification preventing proxy attendance',
      'Geofenced workplace boundary detection for on-site field staff',
      'Automated overtime calculation, holiday calendars, and shift swap workflows',
      'Morning 9:05 AM check-in, evening 5:55 PM check-out, and automated half-day policies',
    ],
    bullets: [
      'Real-time attendance tracking',
      'Qr Scan integration',
      'Location based tracking',
      'Detailed attendance reports and analytics',
    ],
    gallery: [
      {
        title: 'Employee Authentication',
        caption: 'Secure employee login screen with organization credentials and motivational onboarding.',
        image: '/images/products/requin-ams-login.jpg',
      },
      {
        title: 'Monthly Attendance Dashboard',
        caption: 'Monthly attendance visual bar charts, quick profile actions, check-in/check-out triggers, and effort tracking.',
        image: '/images/products/requin-ams-dashboard.jpg',
      },
      {
        title: 'Attendance Rules & QR Scan Verification',
        caption: 'Location & Wi-Fi verified check-in guidelines, automated half-day calculation rules, and instant QR scanner.',
        image: '/images/products/requin-ams-attendance-rules.jpg',
      },
    ],
    metrics: [
      { label: 'Attendance Accuracy', value: '99.9%' },
      { label: 'Clock-in Latency', value: '<0.8s' },
    ],
    image: '/images/products/requin-ams-demo.jpg',
    architectureDetails: [
      'High-throughput mobile sync engine with offline-caching',
      'Cryptographic time-stamped QR generation for tamper prevention',
    ],
    visualSide: 'right',
  },
  {
    id: 'hrms',
    title: 'Requin HRMS',
    tagline: 'Smart HR, Streamlined Operations',
    description: 'A human resource management system for streamlined employee management.',
    category: 'Human Capital',
    badge: 'Enterprise HR',
    features: [
      'Comprehensive employee directory with digital document repositories',
      'Tax-compliant automated payroll engine with salary slip distribution',
      'Self-service employee portal for leave management and expense claims',
      'Objective & Key Results (OKR) tracking and 360-degree appraisal cycles',
      'Hardware asset lifecycle tracking and maintenance inventory',
    ],
    bullets: [
      'Employee data management',
      'Payroll automation with tax calculations',
      'Leave and attendance tracking',
      'Performance management and appraisals',
      'Role-based access control and document management',
    ],
    gallery: [
      {
        title: 'Executive Dashboard & Live Attendance',
        caption: 'Centralized overview with user metrics, active projects, and daily leave tracking.',
        image: '/images/products/requin-hrms-dashboard.png',
      },
      {
        title: 'Role Management & Access Control',
        caption: 'Granular permissions, vacancy monitoring, and department role administration.',
        image: '/images/products/requin-hrms-roles.png',
      },
      {
        title: 'Enterprise Asset & Inventory Tracking',
        caption: 'Hardware asset allocation, maintenance logs, and real-time assignment status.',
        image: '/images/products/requin-hrms-assets.png',
      },
    ],
    metrics: [
      { label: 'Payroll Processing', value: 'Instant' },
      { label: 'Paperless Management', value: '100%' },
    ],
    image: '/images/products/requin-hrms-demo.jpg',
    architectureDetails: [
      'Automated payroll math engine with statutory deduction tables',
      'Granular department permissions and custom approval chains',
    ],
    visualSide: 'right',
  },
  {
    id: 'vastra-erp',
    title: 'VASTRA ERP',
    tagline: 'Your Clothing Business Digitally Managed',
    description: 'A boutique ERP and POS system for apparel businesses, tailoring operations, and retail chains.',
    category: 'Fashion & Retail ERP',
    badge: 'Apparel Suite',
    features: [
      'Fast POS billing with intelligent barcode scanning and multi-rate GST computation',
      'End-to-end tailoring workshop and garment alteration lifecycle tracking',
      'Real-time inventory management with SKU, size, color, and low-stock alerts',
      'Payment tracking, credit ledger management, and cash summary reconciliation',
      'Comprehensive product catalog with purchase rates, wholesale prices (WSP), and retail MRP',
      'Dynamic business charts, daily focus KPIs, and sales performance analytics',
    ],
    bullets: [
      'Barcode scanning & POS billing',
      'Sales & payment tracking',
      'Alteration & tailoring details',
      'Inventory & stock management',
      'Business analytics charts & focus dashboards',
    ],
    gallery: [
      {
        title: 'Boutique POS Billing & GST Engine',
        caption: 'High-speed barcode scanner, walk-in customer loyalty tracking, and instant multi-slab GST calculation.',
        image: '/images/products/vastra-erp-pos.png',
      },
      {
        title: 'Tailoring & Garment Alterations',
        caption: 'Custom fit measurement recording, workshop queue monitoring, and tailor-wise completion tracking.',
        image: '/images/products/vastra-erp-alteration.png',
      },
      {
        title: 'Products & Garment Catalog',
        caption: 'Detailed apparel catalog with purchase cost, wholesale price (WSP), retail MRP, and live inventory status.',
        image: '/images/products/vastra-erp-catalog.png',
      },
    ],
    metrics: [
      { label: 'Billing Speed', value: '<2s' },
      { label: 'Stock Accuracy', value: '100%' },
    ],
    image: '/images/products/vastra-erp-overview.png',
    architectureDetails: [
      'High-velocity offline-ready POS architecture with hardware barcode scanner integration',
      'Multi-tier garment matrix handling complex sizes, batches, and tailoring workflows',
    ],
    visualSide: 'right',
  },
];

export const VASTRA_ERP_PRODUCT: ShowcaseProductItem = SHOWCASE_PRODUCTS[3];

export const DINE_AND_DUSK_PRODUCT: ShowcaseProductItem = {
  id: 'dine-and-dusk',
  title: 'Dine & Dusk',
  tagline: 'Complete Restaurant Operations & Kitchen Intelligence',
  description: 'An all-in-one restaurant management and POS platform with table management, real-time KDS, and revenue analytics.',
  category: 'Hospitality & F&B ERP',
  badge: 'Restaurant Suite',
  features: [
    'High-speed touch POS terminal with instant KOT generation and bill settlement',
    'Interactive multi-floor table management (Ground Floor & Rooftop/Terrace) with occupancy status',
    'Real-time Kitchen Display System (KDS) with station routing, timers, and cooking workflows',
    'Sales mix analytics, category revenue charts, and top-performing dish insights',
    'Staff directory clock-in monitoring and live platform transaction tracking',
  ],
  bullets: [
    'POS sale checkout & instant KOT billing',
    'Multi-floor table layout & occupancy tracking',
    'Real-time Kitchen Display System (KDS)',
    'Category sales mix & revenue analytics',
    'Live staff activity & platform transaction logs',
  ],
  gallery: [
    {
      title: 'POS Sale & Fast Billing Terminal',
      caption: 'Visual menu grid, instant KOT generation, veg/non-veg indicators, and swift order settlement.',
      image: '/images/products/dine-dusk-pos.png',
    },
    {
      title: 'Tables Management & Multi-Floor Layout',
      caption: 'Multi-floor table grid, real-time occupancy indicators, session timers, and bill & order sync.',
      image: '/images/products/dine-dusk-tables.png',
    },
    {
      title: 'Kitchen Display System (KDS)',
      caption: 'Real-time kitchen order queues, station routing, chef cooking timers, and instant dispatch updates.',
      image: '/images/products/dine-dusk-kds.png',
    },
  ],
  metrics: [
    { label: 'Order-to-KDS Sync', value: '<0.5s' },
    { label: 'Table Turnover', value: '+35%' },
  ],
  image: '/images/products/dine-dusk-dashboard.png',
  architectureDetails: [
    'Low-latency WebSocket event streaming between POS terminals and kitchen display stations',
    'Offline-first local network synchronization ensuring uninterrupted billing during peak hours',
  ],
  visualSide: 'right',
};

export const RKB_ENTERPRISES_PRODUCT: ShowcaseProductItem = {
  id: 'rkb-enterprises',
  title: 'RKB Enterprises',
  tagline: 'Jewellery Manufacturer & Wholesale Supplier Portal',
  description: 'Manufacturer and wholesale supplier of chains, anklets, bracelets, and fashion jewellery, serving retailers, resellers, and online sellers.',
  category: 'Jewellery & Wholesale E-Commerce',
  badge: 'B2B Wholesale Suite',
  features: [
    'Comprehensive manufacturer catalog for brass chains, silver anklets, bracelets, and fashion jewellery',
    'Dedicated B2B wholesale ordering platform built for volume retailers, resellers, and dropshippers',
    'Faceted product filtering system by material type, collection category, and real-time inventory status',
    'Interactive side-by-side product comparison tool for evaluating wholesale prices, variants, and SKU availability',
    'Direct WhatsApp quick ordering and bulk inquiry distribution workflows',
  ],
  bullets: [
    'Manufacturer & wholesale supplier of fashion jewellery',
    'Chains, anklets, bracelets & bridal collections',
    'Serving retailers, resellers & online sellers',
    'Faceted material & category search filtering',
    'Interactive B2B product comparison matrix',
  ],
  gallery: [
    {
      title: 'Wholesale Category Catalog',
      caption: 'Comprehensive collection grid spanning chains, anklets, bridal wear, and raw jewellery materials.',
      image: '/images/products/rkb-enterprises-categories.png',
    },
    {
      title: 'Faceted Product Search & Filtering',
      caption: 'Multi-criteria filter panel by category and material with instant stock status and wholesale rates.',
      image: '/images/products/rkb-enterprises-catalog.png',
    },
    {
      title: 'B2B Product Comparison Matrix',
      caption: 'Side-by-side SKU comparison for retailers to evaluate specifications, wholesale pricing, and stock availability.',
      image: '/images/products/rkb-enterprises-comparison.png',
    },
  ],
  metrics: [
    { label: 'Catalog Scale', value: '5,000+ SKUs' },
    { label: 'Wholesale Dispatch', value: '24-48h' },
  ],
  image: '/images/products/rkb-enterprises-home.png',
  architectureDetails: [
    'High-performance headless e-commerce catalog optimized for high-resolution imagery and fast filtering',
    'B2B tier pricing engine with bulk volume discounts and WhatsApp order API gateway',
  ],
  visualSide: 'right',
};

export const INDIA_MOTOR_PRODUCT: ShowcaseProductItem = {
  id: 'india-motor-driving-school',
  title: 'India Motor Driving School',
  tagline: 'Learn Driving the Smart Way — Certified Trainers & RTO Test Prep',
  description: 'A driving academy platform offering professional driving lessons, certified instructors, RTO mock tests, and flexible driving courses across India.',
  category: 'EdTech & Mobility Academy',
  badge: 'Driving Academy SaaS',
  features: [
    'Online student onboarding with digital RTO document vault and verified driving licenses',
    'Live GPS instructor tracking with real-time arrival estimates and doorstep pickup/drop',
    'Flexible course packages across manual and automatic (AMT/CVT) transmission vehicles',
    'Comprehensive 18-point learner progress dashboard tracking steering, gear shifts, and parallel parking',
    'Direct 1-on-1 slot booking selecting certified instructors by ratings, hub locations, and languages',
  ],
  bullets: [
    'Professional driving lessons with dual-control fleet',
    'Certified instructors & personalized 1-on-1 slot booking',
    'Manual & automatic transmission flexible course plans',
    '18-point progress tracker & RTO mock test prep',
    'Doorstep pickup & drop with live GPS instructor tracking',
  ],
  gallery: [
    {
      title: 'Flexible Course Plans & Pricing',
      caption: 'Transparent pricing packages for manual & automatic vehicles including fuel, pickup, and RTO filing.',
      image: '/images/products/india-motor-pricing.png',
    },
    {
      title: 'Comprehensive Learning Features',
      caption: '18-point progress tracking, digital RTO document vault, mock theory tests, and automated WhatsApp alerts.',
      image: '/images/products/india-motor-features.png',
    },
    {
      title: 'Expert Trainer Directory & Slot Booking',
      caption: 'Certified instructor profiles with experience ratings, languages, dual-control fleet specs, and direct booking.',
      image: '/images/products/india-motor-trainers.png',
    },
  ],
  metrics: [
    { label: 'RTO Pass Rate', value: '98%' },
    { label: 'Learners Trained', value: '5,000+' },
  ],
  image: '/images/products/india-motor-hero.png',
  architectureDetails: [
    'Real-time geolocation WebSockets for live trainer dispatch and telemetry tracking',
    'Automated slot reservation engine with multi-trainer calendar synchronization',
  ],
  visualSide: 'right',
};

export const NEXUSBILL_PRODUCT: ShowcaseProductItem = {
  id: 'nexusbill',
  title: 'NexusBill',
  tagline: 'Enterprise Invoicing, Purchase Terminals & GST Accounting',
  description: 'An advanced accounting and billing system managing GST-compliant B2B sales invoices, purchase terminals, real-time inventory valuation, and automated fiscal bookkeeping.',
  category: 'Fintech & Enterprise Accounting',
  badge: 'Billing & GST Suite',
  features: [
    'GST-compliant B2B sales invoicing with live receivables tracking and automated status reconciliation',
    'Procurement & purchases terminal with Input Tax Credit (ITC) calculation and supplier distribution analytics',
    'Real-time multi-category inventory tracking with stock alarms, low-stock alerts, and live asset valuation',
    'Dynamic procurement trend curves and automated expenditure manifest registries',
    'Multi-tier business admin controls, verified fiscal nodes, and comprehensive party ledger reports',
  ],
  bullets: [
    'GST-compliant B2B sales invoicing & receivables',
    'Purchases terminal with Input Tax Credit (ITC) tracking',
    'Real-time multi-category inventory & stock alarms',
    'Procurement trends & supplier distribution analytics',
    'Automated fiscal ledger & multi-tier tax reconciliation',
  ],
  gallery: [
    {
      title: 'B2B Sales Invoices & Receivables',
      caption: 'GST-compliant business invoice management, total receivables and collection tracking, and entity identity ledgers.',
      image: '/images/products/nexusbill-sales.png',
    },
    {
      title: 'Purchases Terminal & ITC Calculation',
      caption: 'Fiscal procurement metrics, Input Tax Credit (ITC) reconciliation, procurement trends, and supplier distribution charts.',
      image: '/images/products/nexusbill-purchases.png',
    },
    {
      title: 'Real-Time Inventory & Overall Stock Valuation',
      caption: 'Sectional inventory clusters, live stock alarms, catalog pricing, and multi-category asset valuation.',
      image: '/images/products/nexusbill-inventory.png',
    },
  ],
  metrics: [
    { label: 'Invoice Generation', value: '<1.2s' },
    { label: 'GST Tax Accuracy', value: '100%' },
  ],
  image: '/images/products/nexusbill-dashboard.png',
  architectureDetails: [
    'Real-time fiscal ledger database with cryptographic invoice node validation',
    'High-throughput inventory sync engine with multi-category stock valuation and automated ITC computing',
  ],
  visualSide: 'right',
};

export const ALL_PRODUCTS: ShowcaseProductItem[] = [
  ...SHOWCASE_PRODUCTS,
  DINE_AND_DUSK_PRODUCT,
  RKB_ENTERPRISES_PRODUCT,
  INDIA_MOTOR_PRODUCT,
  NEXUSBILL_PRODUCT,
];

export const EXPLORE_MORE_PRODUCTS: ShowcaseProductItem[] = [
  VASTRA_ERP_PRODUCT,
  DINE_AND_DUSK_PRODUCT,
  RKB_ENTERPRISES_PRODUCT,
  INDIA_MOTOR_PRODUCT,
  NEXUSBILL_PRODUCT,
];

export const REQUIN_PRODUCTS: ProductItem[] = ALL_PRODUCTS;

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
