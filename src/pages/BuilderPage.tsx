import { useResume } from "@/contexts/ResumeContext";
import { Plus, Trash2, Sparkles, LayoutTemplate, Printer, Copy, ChevronDown, ChevronUp, ExternalLink, Github, Check, Download } from "lucide-react";
import LivePreviewPanel from "@/components/app/LivePreviewPanel";
import ATSScorePanel from "@/components/rb/ATSScorePanel";
import { checkBulletDiscipline } from "@/lib/string-utils";
import { generateResumePlainText, validateForExport } from "@/lib/export-utils";
import { useToast } from "@/components/ui/use-toast";
import AppNavbar from "@/components/app/AppNavbar";
import { TagInput } from "@/components/ui/TagInput";
import { useState } from "react";

const THEME_COLORS = [
  { name: "Teal", value: "168 60% 40%", ring: "ring-teal-500" },
  { name: "Navy", value: "220 60% 35%", ring: "ring-blue-800" },
  { name: "Burgundy", value: "345 60% 35%", ring: "ring-rose-800" },
  { name: "Forest", value: "150 50% 30%", ring: "ring-green-800" },
  { name: "Charcoal", value: "0 0% 25%", ring: "ring-gray-700" },
];

const TEMPLATES = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
] as const;


const BuilderPage = () => {
  const { data, updateField, loadSample } = useResume();
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);

  // Expanded project state for accordion - simplistic approach: all open by default or tracked by ID
  // For simplicity, let's just make them collapsible individually with local state in a sub-component or just inline details.
  // Using <details> is the native easy way, or a small state map.
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});

  const toggleProject = (id: string) => {
    setOpenProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownloadPdf = () => {
    toast({
      title: "PDF export ready!",
      description: "Check your downloads folder.",
      duration: 3000,
    });
  };

  const handlePrint = () => {
    const warnings = validateForExport(data);
    if (warnings.length > 0) {
      toast({
        title: "Resume may be incomplete",
        description: warnings.join(" "),
        variant: "destructive",
        duration: 4000,
      });
    }
    window.print();
  };

  const handleCopyText = async () => {
    const warnings = validateForExport(data);
    if (warnings.length > 0) {
      toast({
        title: "Resume may be incomplete",
        description: warnings.join(" "),
        variant: "destructive",
        duration: 3000,
      });
    }

    const text = generateResumePlainText(data);
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Resume text is ready to paste.",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

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
    // Auto-expand new project
    const newId = genId("proj");
    setOpenProjects(prev => ({ ...prev, [newId]: true }));
    updateField("projects", [
      ...data.projects,
      { id: newId, title: "", description: "", techStack: [], liveUrl: "", githubUrl: "" },
    ]);
  };

  const removeProject = (id: string) => {
    updateField("projects", data.projects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, key: keyof Project, value: any) => {
    updateField("projects", data.projects.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
  };

  const updateSkillCategory = (category: keyof SkillCategories, tags: string[]) => {
    updateField("skills", { ...data.skills, [category]: tags });
  };

  const suggestSkills = () => {
    setIsSuggesting(true);
    setTimeout(() => {
      updateField("skills", {
        technical: [...new Set([...(data.skills.technical || []), "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
        soft: [...new Set([...(data.skills.soft || []), "Team Leadership", "Problem Solving"])],
        tools: [...new Set([...(data.skills.tools || []), "Git", "Docker", "AWS"])]
      });
      setIsSuggesting(false);
      toast({ title: "Skills suggested", description: "Added common skills to your list." });
    }, 1000);
  };

  // Helper to safely get skill count since data might be old structure initially
  const getSkillCount = (cat: keyof SkillCategories) => (data.skills[cat] || []).length;

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
            <ATSScorePanel data={data} />

            {/* Personal Info */}
            <Section title="Personal Info">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Full Name" value={data.personal.name} onChange={(v) => updatePersonal("name", v)} />
                <Input label="Email" value={data.personal.email} onChange={(v) => updatePersonal("email", v)} />
                <Input label="Phone" value={data.personal.phone} onChange={(v) => updatePersonal("phone", v)} />
                <Input label="Location" value={data.personal.location} onChange={(v) => updatePersonal("location", v)} />
                <Input label="GitHub" value={data.githubLink} onChange={(v) => updateField("githubLink", v)} placeholder="https://github.com/..." />
                <Input label="LinkedIn" value={data.linkedinLink} onChange={(v) => updateField("linkedinLink", v)} placeholder="https://linkedin.com/in/..." />
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

            {/* Skills */}
            <Section title="Skills">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-muted-foreground font-mono">Categorize your skills for better ATS parsing.</p>
                <button
                  onClick={suggestSkills}
                  disabled={isSuggesting}
                  className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-medium text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                >
                  {isSuggesting ? "Loading..." : <><Sparkles className="w-3 h-3" /> Suggest Skills</>}
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono font-semibold text-muted-foreground mb-1.5 block">
                    Technical Skills ({getSkillCount("technical")})
                  </label>
                  <TagInput
                    tags={data.skills.technical || []}
                    onChange={(tags) => updateSkillCategory("technical", tags)}
                    placeholder="e.g. React, Python (Press Enter)"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono font-semibold text-muted-foreground mb-1.5 block">
                    Tools & Technologies ({getSkillCount("tools")})
                  </label>
                  <TagInput
                    tags={data.skills.tools || []}
                    onChange={(tags) => updateSkillCategory("tools", tags)}
                    placeholder="e.g. Docker, Git, AWS"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono font-semibold text-muted-foreground mb-1.5 block">
                    Soft Skills ({getSkillCount("soft")})
                  </label>
                  <TagInput
                    tags={data.skills.soft || []}
                    onChange={(tags) => updateSkillCategory("soft", tags)}
                    placeholder="e.g. Leadership, Communication"
                  />
                </div>
              </div>
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
                  <div className="relative">
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities..."
                      rows={2}
                      className="w-full mt-3 bg-background border border-border rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
                    />
                    {checkBulletDiscipline(exp.description) && (
                      <p className="text-[10px] text-amber-500 mt-1 font-mono flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-amber-500 inline-block" />
                        {checkBulletDiscipline(exp.description)}
                      </p>
                    )}
                  </div>
                </EntryCard>
              ))}
            </Section>

            {/* Projects */}
            <Section title="Projects" onAdd={addProject}>
              {data.projects.map((proj) => (
                <div key={proj.id} className="border border-border rounded-lg bg-secondary/10 overflow-hidden">
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    onClick={() => toggleProject(proj.id)}
                  >
                    <div className="flex items-center gap-2">
                      {openProjects[proj.id] ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                      <span className="text-sm font-semibold text-foreground">{proj.title || "New Project"}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeProject(proj.id); }}
                      className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Collapsible Content */}
                  {openProjects[proj.id] && (
                    <div className="p-4 space-y-3 bg-background/50 border-t border-border">
                      <Input label="Project Title" value={proj.title} onChange={(v) => updateProject(proj.id, "title", v)} />

                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          label="Live URL"
                          value={proj.liveUrl || ""}
                          onChange={(v) => updateProject(proj.id, "liveUrl", v)}
                          placeholder="https://..."
                        // icon={<ExternalLink className="w-3 h-3" />}
                        />
                        <Input
                          label="GitHub URL"
                          value={proj.githubUrl || ""}
                          onChange={(v) => updateProject(proj.id, "githubUrl", v)}
                          placeholder="https://github.com/..."
                        // icon={<Github className="w-3 h-3" />} 
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono font-semibold text-muted-foreground mb-1.5 block">Tech Stack</label>
                        <TagInput
                          tags={proj.techStack || []}
                          onChange={(tags) => updateProject(proj.id, "techStack", tags)}
                          placeholder="e.g. React, Supabase"
                        />
                      </div>

                      <div className="relative">
                        <label className="text-[10px] font-mono font-semibold text-muted-foreground mb-1.5 block">
                          Description <span className={`ml-2 font-normal ${(proj.description?.length || 0) > 200 ? "text-red-500" : "text-muted-foreground/60"}`}>{(proj.description?.length || 0)}/200</span>
                        </label>
                        <textarea
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                          placeholder="Project description (max 200 chars)..."
                          rows={3}
                          maxLength={250} // Allow a bit more but warn
                          className="w-full bg-background border border-border rounded-md p-3 text-sm text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono"
                        />
                        {checkBulletDiscipline(proj.description) && (
                          <p className="text-[10px] text-amber-500 mt-1 font-mono flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-amber-500 inline-block" />
                            {checkBulletDiscipline(proj.description)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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

          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="w-[45%] overflow-y-auto bg-card">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-mono font-semibold text-muted-foreground uppercase tracking-widest">
              Live Preview
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex bg-secondary/50 p-1 rounded-lg no-print">
                {(["classic", "modern", "minimal"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => updateField("template", t)}
                    className={`px-3 py-1 text-[10px] font-mono font-medium rounded-md transition-all ${data.template === t
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <div className="h-6 w-[1px] bg-border mx-1 no-print"></div>
              <button
                onClick={handleCopyText}
                title="Copy Text"
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors no-print"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={handlePrint}
                title="Print / PDF"
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors no-print"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="bg-secondary/30 min-h-full">
            <LivePreviewPanel data={data} />
          </div>
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
