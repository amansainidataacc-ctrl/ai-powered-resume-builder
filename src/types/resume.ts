export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  targetRole: string;
  industry: string;
  yearsOfExperience: string;
  linkedIn: string;
  github: string;
  professionalTitle: string;
}

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  location: string;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  university: string;
  startYear: string;
  endYear: string;
  cgpa: string;
  gradeType: string;
  coursework: string;
}

export interface Project {
  id: string;
  name: string;
  techStack: string[];
  description: string;
  liveLink: string;
  githubLink: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  url: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  certifications: Certification[];
  templateId: string;
}

export type TemplateCategory =
  | 'all'
  | 'it-fresher'
  | 'mba'
  | 'experienced'
  | 'creative'
  | 'naukri'
  | 'government'
  | 'international'
  | 'sales'
  | 'data'
  | 'finance';

export interface TemplateInfo {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  atsScore: number;
  accent: string;   // primary color for thumbnail
  tags: string[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    targetRole: '',
    industry: '',
    yearsOfExperience: '',
    linkedIn: '',
    github: '',
    professionalTitle: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: { technical: [], soft: [], tools: [] },
  projects: [],
  certifications: [],
  templateId: 'modern-it-fresher',
};

export const templates: TemplateInfo[] = [
  // ── IT FRESHER (6) ────────────────────────────────────────────────────────
  {
    id: 'modern-it-fresher',
    name: 'Modern IT Fresher',
    category: 'it-fresher',
    description: 'Clean single-column with blue accents — perfect for fresh graduates',
    atsScore: 92,
    accent: '#2563EB',
    tags: ['ATS Safe', 'Free'],
  },
  {
    id: 'it-fresher-minimal',
    name: 'IT Fresher Minimal',
    category: 'it-fresher',
    description: 'Ultra-clean black & white layout — maximum ATS compatibility',
    atsScore: 98,
    accent: '#1E293B',
    tags: ['ATS Max', 'Free'],
  },
  {
    id: 'it-fresher-teal',
    name: 'IT Fresher Teal',
    category: 'it-fresher',
    description: 'Two-column layout with teal sidebar for CS graduates',
    atsScore: 88,
    accent: '#0D9488',
    tags: ['ATS Safe', 'Free'],
  },
  {
    id: 'it-fresher-github',
    name: 'Developer Portfolio',
    category: 'it-fresher',
    description: 'Projects & GitHub links front and center — ideal for coders',
    atsScore: 85,
    accent: '#7C3AED',
    tags: ['Developer', 'Free'],
  },
  {
    id: 'it-fresher-compact',
    name: 'Compact IT Fresher',
    category: 'it-fresher',
    description: 'Fits more in one page — great for busy resumes',
    atsScore: 90,
    accent: '#0284C7',
    tags: ['Compact', 'Free'],
  },
  {
    id: 'it-fresher-infosys',
    name: 'Infosys/TCS Ready',
    category: 'it-fresher',
    description: 'Optimised for Infosys, TCS, Wipro campus placements',
    atsScore: 95,
    accent: '#1D4ED8',
    tags: ['Campus', 'Free'],
  },

  // ── MBA / MANAGEMENT (5) ──────────────────────────────────────────────────
  {
    id: 'executive-mba',
    name: 'Executive MBA',
    category: 'mba',
    description: 'Two-column with gold accents — polished executive look',
    atsScore: 88,
    accent: '#B45309',
    tags: ['Premium', 'Free'],
  },
  {
    id: 'mba-consulting',
    name: 'MBA Consulting',
    category: 'mba',
    description: 'McKinsey-style clean layout for consulting roles',
    atsScore: 91,
    accent: '#1E3A5F',
    tags: ['Consulting', 'Free'],
  },
  {
    id: 'mba-iim-style',
    name: 'IIM Style',
    category: 'mba',
    description: 'Standard IIM/ISB recommended format with sections',
    atsScore: 94,
    accent: '#7B1D1D',
    tags: ['IIM', 'Free'],
  },
  {
    id: 'mba-operations',
    name: 'Operations Manager',
    category: 'mba',
    description: 'Metrics-heavy layout for operations & supply chain roles',
    atsScore: 89,
    accent: '#065F46',
    tags: ['Operations', 'Free'],
  },
  {
    id: 'mba-marketing',
    name: 'Marketing MBA',
    category: 'mba',
    description: 'Creative yet professional — for brand & marketing roles',
    atsScore: 84,
    accent: '#9D174D',
    tags: ['Marketing', 'Free'],
  },

  // ── EXPERIENCED IT (5) ────────────────────────────────────────────────────
  {
    id: 'senior-developer',
    name: 'Senior Developer',
    category: 'experienced',
    description: 'Technical skills matrix + project showcase for 5–15 yrs exp',
    atsScore: 90,
    accent: '#1E293B',
    tags: ['ATS Safe', 'Free'],
  },
  {
    id: 'tech-lead',
    name: 'Tech Lead / Architect',
    category: 'experienced',
    description: 'Leadership + technical depth for senior engineering roles',
    atsScore: 91,
    accent: '#3730A3',
    tags: ['Leadership', 'Free'],
  },
  {
    id: 'fullstack-pro',
    name: 'Full Stack Pro',
    category: 'experienced',
    description: 'Frontend + backend skills split — for full-stack engineers',
    atsScore: 88,
    accent: '#047857',
    tags: ['Full Stack', 'Free'],
  },
  {
    id: 'devops-cloud',
    name: 'DevOps / Cloud',
    category: 'experienced',
    description: 'Certifications & tools prominent — for cloud/DevOps engineers',
    atsScore: 92,
    accent: '#0369A1',
    tags: ['Cloud', 'Free'],
  },
  {
    id: 'it-manager',
    name: 'IT Manager',
    category: 'experienced',
    description: 'Management-focused layout for IT managers and directors',
    atsScore: 89,
    accent: '#1F2937',
    tags: ['Management', 'Free'],
  },

  // ── NAUKRI STYLE (3) ──────────────────────────────────────────────────────
  {
    id: 'naukri-classic',
    name: 'Naukri Classic',
    category: 'naukri',
    description: 'Pure black & white — maximum ATS and Naukri compatibility',
    atsScore: 100,
    accent: '#111827',
    tags: ['ATS Max', 'Free'],
  },
  {
    id: 'naukri-modern',
    name: 'Naukri Modern',
    category: 'naukri',
    description: 'Naukri format with subtle navy accents — 2024 style',
    atsScore: 96,
    accent: '#1E3A5F',
    tags: ['Naukri', 'Free'],
  },
  {
    id: 'naukri-fresher',
    name: 'Naukri Fresher',
    category: 'naukri',
    description: 'Objective + skills first — standard fresher Naukri format',
    atsScore: 97,
    accent: '#374151',
    tags: ['Fresher', 'Free'],
  },

  // ── CREATIVE / DESIGN (4) ─────────────────────────────────────────────────
  {
    id: 'creative-pro',
    name: 'Creative Pro',
    category: 'creative',
    description: 'Bold purple sidebar with coral accents — for design roles',
    atsScore: 78,
    accent: '#7C3AED',
    tags: ['Creative', 'Free'],
  },
  {
    id: 'creative-minimal',
    name: 'Creative Minimal',
    category: 'creative',
    description: 'Typography-forward layout — elegant and clean',
    atsScore: 80,
    accent: '#BE185D',
    tags: ['Design', 'Free'],
  },
  {
    id: 'ux-designer',
    name: 'UX/UI Designer',
    category: 'creative',
    description: 'Portfolio-ready resume for UI/UX designers',
    atsScore: 77,
    accent: '#0891B2',
    tags: ['UX/UI', 'Free'],
  },
  {
    id: 'content-creator',
    name: 'Content & Media',
    category: 'creative',
    description: 'Highlights writing, SEO, and content metrics',
    atsScore: 82,
    accent: '#D97706',
    tags: ['Media', 'Free'],
  },

  // ── GOVERNMENT / PSU (3) ─────────────────────────────────────────────────
  {
    id: 'govt-standard',
    name: 'Government Standard',
    category: 'government',
    description: 'Standard GoI / PSU application format with all sections',
    atsScore: 99,
    accent: '#14532D',
    tags: ['Govt', 'Free'],
  },
  {
    id: 'upsc-ias',
    name: 'UPSC / IAS Format',
    category: 'government',
    description: 'Structured for civil services and UPSC applications',
    atsScore: 99,
    accent: '#1E3A5F',
    tags: ['UPSC', 'Free'],
  },
  {
    id: 'psu-engineer',
    name: 'PSU Engineer',
    category: 'government',
    description: 'GATE/PSU focused — BHEL, NTPC, ONGC applications',
    atsScore: 98,
    accent: '#1C4532',
    tags: ['PSU', 'Free'],
  },

  // ── INTERNATIONAL (3) ─────────────────────────────────────────────────────
  {
    id: 'international-clean',
    name: 'International Clean',
    category: 'international',
    description: 'Minimalist single column — best for MNC and global applications',
    atsScore: 98,
    accent: '#374151',
    tags: ['ATS Max', 'Free'],
  },
  {
    id: 'us-resume',
    name: 'US / Canada Format',
    category: 'international',
    description: 'American resume style — no photo, concise bullets',
    atsScore: 97,
    accent: '#1D4ED8',
    tags: ['US/CA', 'Free'],
  },
  {
    id: 'europe-cv',
    name: 'European CV',
    category: 'international',
    description: 'EU Europass-inspired format for European job applications',
    atsScore: 95,
    accent: '#1E3A5F',
    tags: ['EU', 'Free'],
  },

  // ── DATA / ANALYTICS (2) ─────────────────────────────────────────────────
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'data',
    description: 'Skills matrix, projects, and tools — perfect for data roles',
    atsScore: 91,
    accent: '#0369A1',
    tags: ['Data', 'Free'],
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'data',
    description: 'Clean layout highlighting SQL, Python, dashboards & insights',
    atsScore: 93,
    accent: '#0D9488',
    tags: ['Analytics', 'Free'],
  },

  // ── FINANCE (2) ───────────────────────────────────────────────────────────
  {
    id: 'finance-ca',
    name: 'CA / Finance Pro',
    category: 'finance',
    description: 'Chartered Accountant and finance professional format',
    atsScore: 93,
    accent: '#92400E',
    tags: ['CA/Finance', 'Free'],
  },
  {
    id: 'banking-finance',
    name: 'Banking & BFSI',
    category: 'finance',
    description: 'Tailored for banking, insurance and financial services roles',
    atsScore: 91,
    accent: '#1E3A5F',
    tags: ['Banking', 'Free'],
  },
];
