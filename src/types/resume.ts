export interface PersonalInfo {
  fullName: string; email: string; phone: string; location: string;
  targetRole: string; industry: string; yearsOfExperience: string;
  linkedIn: string; github: string; professionalTitle: string;
}
export interface Experience {
  id: string; company: string; jobTitle: string; startDate: string;
  endDate: string; currentlyWorking: boolean; location: string; bullets: string[];
}
export interface Education {
  id: string; degree: string; fieldOfStudy: string; institution: string;
  university: string; startYear: string; endYear: string; cgpa: string;
}
export interface Project {
  id: string; name: string; techStack: string[]; description: string;
  liveLink: string; githubLink: string;
}
export interface Certification {
  id: string; name: string; organization: string; issueDate: string; credentialId: string;
}
export interface Skills { technical: string[]; soft: string[]; tools: string[]; }
export interface ResumeData {
  personalInfo: PersonalInfo; summary: string; experience: Experience[];
  education: Education[]; skills: Skills; projects: Project[];
  certifications: Certification[]; templateId: string;
}
export const defaultResumeData: ResumeData = {
  personalInfo: { fullName:'',email:'',phone:'',location:'',targetRole:'',industry:'',yearsOfExperience:'',linkedIn:'',github:'',professionalTitle:'' },
  summary:'', experience:[], education:[],
  skills:{ technical:[], soft:[], tools:[] },
  projects:[], certifications:[], templateId:'modern-it-fresher',
}
export type TemplateCategory = 'all'|'it-fresher'|'mba'|'experienced'|'creative'|'naukri'|'government'|'international'|'data'|'finance'
export interface TemplateInfo {
  id: string; name: string; category: TemplateCategory;
  description: string; atsScore: number; accent: string; tags: string[];
}
export const templates: TemplateInfo[] = [
  { id:'modern-it-fresher', name:'Modern IT Fresher', category:'it-fresher', description:'Clean single-column with blue accents', atsScore:92, accent:'#2563EB', tags:['ATS Safe','Free'] },
  { id:'it-fresher-minimal', name:'IT Fresher Minimal', category:'it-fresher', description:'Ultra-clean black & white layout', atsScore:98, accent:'#1E293B', tags:['ATS Max','Free'] },
  { id:'developer-portfolio', name:'Developer Portfolio', category:'it-fresher', description:'Projects & GitHub links front and center', atsScore:85, accent:'#7C3AED', tags:['Developer','Free'] },
  { id:'campus-ready', name:'Campus / TCS / Infosys', category:'it-fresher', description:'Optimised for campus placements', atsScore:95, accent:'#1D4ED8', tags:['Campus','Free'] },
  { id:'compact-fresher', name:'Compact IT Fresher', category:'it-fresher', description:'Fits more content in one page', atsScore:90, accent:'#0284C7', tags:['Compact','Free'] },
  { id:'executive-mba', name:'Executive MBA', category:'mba', description:'Two-column with gold accents', atsScore:88, accent:'#B45309', tags:['Premium','Free'] },
  { id:'mba-consulting', name:'MBA Consulting', category:'mba', description:'McKinsey-style clean layout', atsScore:91, accent:'#1E3A5F', tags:['Consulting','Free'] },
  { id:'iim-style', name:'IIM Style', category:'mba', description:'Standard IIM/ISB recommended format', atsScore:94, accent:'#7B1D1D', tags:['IIM','Free'] },
  { id:'operations-mgr', name:'Operations Manager', category:'mba', description:'Metrics-heavy layout for ops roles', atsScore:89, accent:'#065F46', tags:['Operations','Free'] },
  { id:'marketing-mba', name:'Marketing MBA', category:'mba', description:'Creative yet professional for brand roles', atsScore:84, accent:'#9D174D', tags:['Marketing','Free'] },
  { id:'senior-developer', name:'Senior Developer', category:'experienced', description:'Skills matrix + project showcase', atsScore:90, accent:'#1E293B', tags:['ATS Safe','Free'] },
  { id:'tech-lead', name:'Tech Lead / Architect', category:'experienced', description:'Leadership + technical depth', atsScore:91, accent:'#3730A3', tags:['Leadership','Free'] },
  { id:'fullstack-pro', name:'Full Stack Pro', category:'experienced', description:'Frontend + backend skills split', atsScore:88, accent:'#047857', tags:['Full Stack','Free'] },
  { id:'devops-cloud', name:'DevOps / Cloud', category:'experienced', description:'Certifications & tools prominent', atsScore:92, accent:'#0369A1', tags:['Cloud','Free'] },
  { id:'it-manager', name:'IT Manager', category:'experienced', description:'Management-focused for IT directors', atsScore:89, accent:'#1F2937', tags:['Management','Free'] },
  { id:'naukri-classic', name:'Naukri Classic', category:'naukri', description:'Pure black & white — maximum ATS', atsScore:100, accent:'#111827', tags:['ATS Max','Free'] },
  { id:'naukri-modern', name:'Naukri Modern', category:'naukri', description:'Naukri format with subtle navy accents', atsScore:96, accent:'#1E3A5F', tags:['Naukri','Free'] },
  { id:'naukri-fresher', name:'Naukri Fresher', category:'naukri', description:'Objective + skills first format', atsScore:97, accent:'#374151', tags:['Fresher','Free'] },
  { id:'creative-pro', name:'Creative Pro', category:'creative', description:'Bold purple sidebar with coral accents', atsScore:78, accent:'#7C3AED', tags:['Creative','Free'] },
  { id:'creative-minimal', name:'Creative Minimal', category:'creative', description:'Typography-forward elegant layout', atsScore:80, accent:'#BE185D', tags:['Design','Free'] },
  { id:'ux-designer', name:'UX/UI Designer', category:'creative', description:'Portfolio-ready for UI/UX designers', atsScore:77, accent:'#0891B2', tags:['UX/UI','Free'] },
  { id:'content-creator', name:'Content & Media', category:'creative', description:'Highlights writing, SEO and metrics', atsScore:82, accent:'#D97706', tags:['Media','Free'] },
  { id:'govt-standard', name:'Government Standard', category:'government', description:'Standard GoI / PSU application format', atsScore:99, accent:'#14532D', tags:['Govt','Free'] },
  { id:'upsc-ias', name:'UPSC / IAS Format', category:'government', description:'Structured for civil services', atsScore:99, accent:'#1E3A5F', tags:['UPSC','Free'] },
  { id:'psu-engineer', name:'PSU Engineer', category:'government', description:'GATE/PSU focused — BHEL NTPC ONGC', atsScore:98, accent:'#1C4532', tags:['PSU','Free'] },
  { id:'international-clean', name:'International Clean', category:'international', description:'Minimalist for MNC and global applications', atsScore:98, accent:'#374151', tags:['ATS Max','Free'] },
  { id:'us-canada', name:'US / Canada Format', category:'international', description:'American resume style', atsScore:97, accent:'#1D4ED8', tags:['US/CA','Free'] },
  { id:'data-scientist', name:'Data Scientist', category:'data', description:'Skills matrix projects and tools', atsScore:91, accent:'#0369A1', tags:['Data','Free'] },
  { id:'data-analyst', name:'Data Analyst', category:'data', description:'SQL Python dashboards and insights', atsScore:93, accent:'#0D9488', tags:['Analytics','Free'] },
  { id:'finance-ca', name:'CA / Finance Pro', category:'finance', description:'Chartered Accountant format', atsScore:93, accent:'#92400E', tags:['CA/Finance','Free'] },
]
