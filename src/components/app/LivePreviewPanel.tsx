import { ResumeData } from "@/lib/resume-types";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

interface LivePreviewPanelProps {
  data: ResumeData;
}

const LivePreviewPanel = ({ data }: LivePreviewPanelProps) => {
  const hasContent =
    data.personal.name ||
    data.summary ||
    data.education.length > 0 ||
    data.experience.length > 0 ||
    data.projects.length > 0 ||
    data.skills;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
            <span className="text-muted-foreground/40 text-lg">📄</span>
          </div>
          <p className="text-sm text-muted-foreground font-mono">Start typing to see your resume</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-background border border-border rounded-lg p-8 shadow-sm max-w-[540px] mx-auto">
        {/* Header */}
        {data.personal.name && (
          <div className="mb-5 pb-4 border-b border-border">
            <h1 className="text-xl font-bold text-foreground tracking-tight mb-1.5">
              {data.personal.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground font-mono">
              {data.personal.email && (
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{data.personal.email}</span>
              )}
              {data.personal.phone && (
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{data.personal.phone}</span>
              )}
              {data.personal.location && (
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.personal.location}</span>
              )}
            </div>
            {(data.githubLink || data.linkedinLink) && (
              <div className="flex gap-3 mt-2 text-[11px] text-muted-foreground font-mono">
                {data.githubLink && (
                  <span className="flex items-center gap-1"><Github className="w-3 h-3" />{data.githubLink}</span>
                )}
                {data.linkedinLink && (
                  <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{data.linkedinLink}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        {data.summary && (
          <PreviewSection title="Summary">
            <p className="text-xs text-muted-foreground leading-relaxed">{data.summary}</p>
          </PreviewSection>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <PreviewSection title="Experience">
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3 last:mb-0">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-semibold text-foreground">{exp.role}{exp.company && ` · ${exp.company}`}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{exp.startDate}{exp.endDate && ` — ${exp.endDate}`}</p>
                </div>
                {exp.description && <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </PreviewSection>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <PreviewSection title="Education">
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2 last:mb-0">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-semibold text-foreground">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{edu.startDate}{edu.endDate && ` — ${edu.endDate}`}</p>
                </div>
                {edu.institution && <p className="text-[11px] text-muted-foreground">{edu.institution}</p>}
              </div>
            ))}
          </PreviewSection>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <PreviewSection title="Projects">
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-3 last:mb-0">
                <p className="text-xs font-semibold text-foreground">{proj.title}</p>
                {proj.techStack && <p className="text-[10px] font-mono text-primary/70 mt-0.5">{proj.techStack}</p>}
                {proj.description && <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{proj.description}</p>}
              </div>
            ))}
          </PreviewSection>
        )}

        {/* Skills */}
        {data.skills && (
          <PreviewSection title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {data.skills.split(",").map((skill, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary text-secondary-foreground border border-border">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </PreviewSection>
        )}
      </div>
    </div>
  );
};

const PreviewSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-5 last:mb-0">
    <h3 className="text-[10px] font-mono font-bold text-foreground uppercase tracking-widest mb-2 pb-1 border-b border-border/50">
      {title}
    </h3>
    {children}
  </div>
);

export default LivePreviewPanel;
