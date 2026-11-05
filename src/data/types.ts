export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  color: string;
  badgeBg: string;
  specialty: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  metrics: { label: string; value: string }[];
  tech: string[];
  accentColor: string;
  liveUrl: string;
  repoUrl: string;
  architectureNotes: string[];
  featured?: boolean;
  thumbnailUrl?: string;
}

export interface TechCategory {
  id: string;
  title: string;
  tag: string;
  accent: string;
  description: string;
  skills: {
    name: string;
    level: string;
    detail: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

