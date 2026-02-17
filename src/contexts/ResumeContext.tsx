import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ResumeData, emptyResume, sampleResume } from "@/lib/resume-types";

interface ResumeContextType {
  data: ResumeData;
  setData: (data: ResumeData) => void;
  updateField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  loadSample: () => void;
  reset: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem("resumeBuilderData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Migration: Ensure skills is an object
        if (typeof parsed.skills === "string") {
          // Attempt to preserve old skills as 'technical' if possible, or just reset
          const oldSkills = parsed.skills.split(",").map((s: string) => s.trim()).filter(Boolean);
          parsed.skills = { technical: oldSkills, soft: [], tools: [] };
        } else if (!parsed.skills || Array.isArray(parsed.skills)) {
          // Handle other weird states
          parsed.skills = { technical: [], soft: [], tools: [] };
        }

        // Migration: Ensure project techStack is array and URLs exist
        if (Array.isArray(parsed.projects)) {
          parsed.projects = parsed.projects.map((p: any) => ({
            ...p,
            techStack: Array.isArray(p.techStack) ? p.techStack : (typeof p.techStack === "string" ? p.techStack.split(",").map((s: string) => s.trim()).filter(Boolean) : []),
            liveUrl: p.liveUrl || "",
            githubUrl: p.githubUrl || p.link || "", // Migrate old 'link' to 'githubUrl' if applicable
          }));
        }

        // Migration: Ensure themeColor exists
        if (!parsed.themeColor) {
          parsed.themeColor = "168 60% 40%";
        }

        return { ...emptyResume, ...parsed }; // Merge with empty to ensure all keys exist
      } catch (e) {
        console.error("Failed to parse resume data", e);
        return { ...emptyResume };
      }
    }
    return { ...emptyResume };
  });

  useEffect(() => {
    localStorage.setItem("resumeBuilderData", JSON.stringify(data));
  }, [data]);

  const updateField = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const loadSample = () => setData({ ...sampleResume });
  const reset = () => setData({ ...emptyResume });

  return (
    <ResumeContext.Provider value={{ data, setData, updateField, loadSample, reset }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
};
