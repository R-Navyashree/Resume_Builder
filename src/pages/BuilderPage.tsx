import { useResume } from "@/contexts/ResumeContext";
import { ResumeData, PersonalInfo, Education, Experience, Project, genId } from "@/lib/resume-types";
import { Plus, Trash2, Sparkles } from "lucide-react";
import LivePreviewPanel from "@/components/app/LivePreviewPanel";
import AppNavbar from "@/components/app/AppNavbar";

const BuilderPage = () => {
  const { data, updateField, loadSample } = useResume();

  const updatePersonal = (key: keyof PersonalInfo, value: string) => {
    updateField("personal", { ...data.personal, [key]: value });
  };

  const addEducation = () => {
    updateField("education", [
      ...data.education,
      { id: genId("edu"), institution: "", degree: "", field: "", startDate: "", endDate: "" },
    ]);
  };

  const removeEducation = (id: string) => {
    updateField("education", data.education.filter((e) => e.id !== id));
  };

  const updateEducation = (id: string, key: keyof Education, value: string) => {
    updateField("education", data.education.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
  };

  const addExperience = () => {
    updateField("experience", [
      ...data.experience,
      { id: genId("exp"), company: "", role: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const removeExperience = (id: string) => {
    updateField("experience", data.experience.filter((e) => e.id !== id));
  };

  const updateExperience = (id: string, key: keyof Experience, value: string) => {
    updateField("experience", data.experience.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
  };

  const addProject = () => {
    updateField("projects", [
      ...data.projects,
      { id: genId("proj"), title: "", description: "", techStack: "", link: "" },
    ]);
  };

  const removeProject = (id: string) => {
    updateField("projects", data.projects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, key: keyof Project, value: string) => {
    updateField("projects", data.projects.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppNavbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Form */}
        <div className="w-[55%] overflow-y-auto border-r border-border">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-mono font-semibold text-muted-foreground uppercase tracking-widest">
              Resume Builder
            </h2>
            <button
              onClick={loadSample}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium bg-kodnest-info/10 text-kodnest-info border border-kodnest-info/20 hover:bg-kodnest-info/20 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Load Sample Data
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Personal Info */}
            <Section title="Personal Info">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Full Name" value={data.personal.name} onChange={(v) => updatePersonal("name", v)} />
                <Input label="Email" value={data.personal.email} onChange={(v) => updatePersonal("email", v)} />
                <Input label="Phone" value={data.personal.phone} onChange={(v) => updatePersonal("phone", v)} />
                <Input label="Location" value={data.personal.location} onChange={(v) => updatePersonal("location", v)} />
              </div>
            </Section>

            {/* Summary */}
            <Section title="Summary">
              <textarea
                value={data.summary}
                onChange={(e) => updateField("summary", e.target.value)}
                placeholder="A brief professional summary..."
                rows={3}
                className="w-full bg-background border border-border rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
              />
            </Section>

            {/* Education */}
            <Section title="Education" onAdd={addEducation}>
              {data.education.map((edu) => (
                <EntryCard key={edu.id} onRemove={() => removeEducation(edu.id)}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Institution" value={edu.institution} onChange={(v) => updateEducation(edu.id, "institution", v)} />
                    <Input label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, "degree", v)} />
                    <Input label="Field of Study" value={edu.field} onChange={(v) => updateEducation(edu.id, "field", v)} />
                    <div className="grid grid-cols-2 gap-2">
                      <Input label="Start" value={edu.startDate} onChange={(v) => updateEducation(edu.id, "startDate", v)} />
                      <Input label="End" value={edu.endDate} onChange={(v) => updateEducation(edu.id, "endDate", v)} />
                    </div>
                  </div>
                </EntryCard>
              ))}
            </Section>

            {/* Experience */}
            <Section title="Experience" onAdd={addExperience}>
              {data.experience.map((exp) => (
                <EntryCard key={exp.id} onRemove={() => removeExperience(exp.id)}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, "company", v)} />
                    <Input label="Role" value={exp.role} onChange={(v) => updateExperience(exp.id, "role", v)} />
                    <Input label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(exp.id, "startDate", v)} />
                    <Input label="End Date" value={exp.endDate} onChange={(v) => updateExperience(exp.id, "endDate", v)} />
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    placeholder="Describe your responsibilities..."
                    rows={2}
                    className="w-full mt-3 bg-background border border-border rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
                  />
                </EntryCard>
              ))}
            </Section>

            {/* Projects */}
            <Section title="Projects" onAdd={addProject}>
              {data.projects.map((proj) => (
                <EntryCard key={proj.id} onRemove={() => removeProject(proj.id)}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Title" value={proj.title} onChange={(v) => updateProject(proj.id, "title", v)} />
                    <Input label="Link" value={proj.link} onChange={(v) => updateProject(proj.id, "link", v)} />
                  </div>
                  <Input label="Tech Stack" value={proj.techStack} onChange={(v) => updateProject(proj.id, "techStack", v)} className="mt-3" />
                  <textarea
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                    placeholder="Project description..."
                    rows={2}
                    className="w-full mt-3 bg-background border border-border rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
                  />
                </EntryCard>
              ))}
            </Section>

            {/* Skills */}
            <Section title="Skills">
              <Input
                label="Skills (comma-separated)"
                value={data.skills}
                onChange={(v) => updateField("skills", v)}
                placeholder="TypeScript, React, Node.js, ..."
              />
            </Section>

            {/* Links */}
            <Section title="Links">
              <div className="grid grid-cols-2 gap-3">
                <Input label="GitHub" value={data.githubLink} onChange={(v) => updateField("githubLink", v)} placeholder="https://github.com/..." />
                <Input label="LinkedIn" value={data.linkedinLink} onChange={(v) => updateField("linkedinLink", v)} placeholder="https://linkedin.com/in/..." />
              </div>
            </Section>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="w-[45%] overflow-y-auto bg-card">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-sm font-mono font-semibold text-muted-foreground uppercase tracking-widest">
              Live Preview
            </h2>
          </div>
          <LivePreviewPanel data={data} />
        </div>
      </div>
    </div>
  );
};

/* ---- Reusable sub-components ---- */

const Section = ({ title, onAdd, children }: { title: string; onAdd?: () => void; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">{title}</h3>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border"
        >
          <Plus className="w-3 h-3" /> Add
        </button>
      )}
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const EntryCard = ({ onRemove, children }: { onRemove: () => void; children: React.ReactNode }) => (
  <div className="p-4 rounded-lg bg-secondary/30 border border-border relative group">
    <button
      onClick={onRemove}
      className="absolute top-3 right-3 p-1 rounded text-muted-foreground/40 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
    {children}
  </div>
);

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) => (
  <div className={className}>
    <label className="block text-[10px] font-mono text-muted-foreground mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || label}
      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
    />
  </div>
);

export default BuilderPage;
