export interface SocialLink {
  name: string;
  url: string;
  label: string;
  icon: string;
}

export interface EducationItem {
  degree: string;
  field?: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  highlights?: string[];
}

export interface SkillCategory {
  title: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'tools' | 'concepts' | 'soft' | 'spoken';
  skills: {
    name: string;
    level?: string;
    icon?: string;
    description?: string;
  }[];
}

export interface DocumentInfo {
  title: string;
  type: 'offer_letter' | 'completion_certificate' | 'course_certificate';
  filePath: string;
  isAvailable: boolean;
  date?: string;
  idOrRef?: string;
  issuer?: string;
  signatory?: string;
  credentialUrl?: string;
  notes?: string;
}

export interface InternshipItem {
  id: string;
  company: string;
  role: string;
  location: string;
  mode: 'On-site' | 'Virtual' | 'Hybrid';
  displayPeriod: string;
  resumePeriod: string;
  documentPeriod?: string;
  hasDiscrepancy: boolean;
  discrepancyNote?: string;
  responsibilities: string[];
  technologies?: string[];
  offerLetter: DocumentInfo;
  completionCertificate: DocumentInfo;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  partner?: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  imagePath: string;
  isAvailable: boolean;
  skills: string[];
  summary: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  status: 'Working Prototype' | 'Completed' | 'In Progress';
  description: string;
  bulletPoints: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  architectureDetails?: string[];
}

