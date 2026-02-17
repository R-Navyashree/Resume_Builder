import { createContext, useContext, useState, ReactNode } from "react";
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
  const [data, setData] = useState<ResumeData>({ ...emptyResume });

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
