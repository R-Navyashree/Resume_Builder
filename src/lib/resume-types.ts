export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface SkillCategories {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategories;
  githubLink: string;
  linkedinLink: string;
  template: "classic" | "modern" | "minimal";
  themeColor: string;
}

export const emptyResume: ResumeData = {
  personal: { name: "", email: "", phone: "", location: "" },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
  githubLink: "",
  linkedinLink: "",
  template: "classic",
  themeColor: "168 60% 40%", // Default Teal
};

export const sampleResume: ResumeData = {
  personal: {
    name: "Anika Sharma",
    email: "anika.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
  },
  summary:
    "Full-stack developer with 2+ years building scalable web applications. Passionate about clean architecture, developer tooling, and AI-powered products.",
  education: [
    {
      id: "edu-1",
      institution: "PES University",
      degree: "B.Tech",
      field: "Computer Science",
      startDate: "2019",
      endDate: "2023",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "TechCorp India",
      role: "Software Engineer",
      startDate: "Jun 2023",
      endDate: "Present",
      description:
        "Built microservices handling 10K+ RPM. Led migration from monolith to event-driven architecture using Kafka and Node.js.",
    },
    {
      id: "exp-2",
      company: "StartupXYZ",
      role: "Frontend Intern",
      startDate: "Jan 2023",
      endDate: "May 2023",
      description:
        "Developed React dashboard with real-time data visualization. Improved page load times by 40% through code splitting.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "DevBoard",
      description:
        "A developer productivity dashboard with GitHub integration, task tracking, and code snippet management.",
      techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
      liveUrl: "https://devboard.app",
      githubUrl: "https://github.com/anika/devboard",
    },
    {
      id: "proj-2",
      title: "QuickDeploy CLI",
      description:
        "CLI tool for one-command deployment to AWS, Vercel, and Railway with environment management.",
      techStack: ["Node.js", "Commander.js", "Docker"],
      liveUrl: "",
      githubUrl: "https://github.com/anika/quickdeploy",
    },
  ],
  skills: {
    technical: ["TypeScript", "React", "Node.js", "Python", "PostgreSQL"],
    soft: ["Team Leadership", "Communication"],
    tools: ["Docker", "AWS", "Kafka", "Redis", "Git"],
  },
  githubLink: "https://github.com/anika-sharma",
  linkedinLink: "https://linkedin.com/in/anika-sharma",
  template: "modern",
  themeColor: "168 60% 40%", // Default Teal
};

let uid = 0;
export const genId = (prefix: string) => `${prefix}-${++uid}-${Date.now()}`;
