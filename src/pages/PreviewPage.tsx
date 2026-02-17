import { useResume } from "@/contexts/ResumeContext";
import AppNavbar from "@/components/app/AppNavbar";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const PreviewPage = () => {
  const { data } = useResume();

  const hasContent = data.personal.name || data.summary || data.experience.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppNavbar />

      <main className="flex-1 flex justify-center py-10 px-4">
        {!hasContent ? (
          <div className="text-center mt-20">
            <p className="text-muted-foreground font-mono text-sm">No resume data yet. Go to Builder first.</p>
          </div>
        ) : (
          <div className="w-full max-w-[680px] bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            {/* Resume content — clean black & white minimal */}
            <div className="p-10 space-y-6" style={{ color: "hsl(var(--foreground))" }}>
              {/* Header */}
              <div className="pb-5 border-b border-border">
                <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
                  {data.personal.name || "Your Name"}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
                  {data.personal.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{data.personal.email}</span>}
                  {data.personal.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{data.personal.phone}</span>}
                  {data.personal.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.personal.location}</span>}
                </div>
                {(data.githubLink || data.linkedinLink) && (
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground font-mono">
                    {data.githubLink && <span className="flex items-center gap-1"><Github className="w-3 h-3" />{data.githubLink}</span>}
                    {data.linkedinLink && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{data.linkedinLink}</span>}
                  </div>
                )}
              </div>

              {data.summary && (
                <ResumeSection title="Summary">
                  <p className="text-sm text-muted-foreground leading-relaxed">{data.summary}</p>
                </ResumeSection>
              )}

              {data.experience.length > 0 && (
                <ResumeSection title="Experience">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-semibold text-foreground">{exp.role}{exp.company && ` · ${exp.company}`}</p>
                        <p className="text-xs text-muted-foreground font-mono shrink-0 ml-4">{exp.startDate} — {exp.endDate}</p>
                      </div>
                      {exp.description && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{exp.description}</p>}
                    </div>
                  ))}
                </ResumeSection>
              )}

              {data.education.length > 0 && (
                <ResumeSection title="Education">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="mb-3 last:mb-0">
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-semibold text-foreground">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                        <p className="text-xs text-muted-foreground font-mono shrink-0 ml-4">{edu.startDate} — {edu.endDate}</p>
                      </div>
                      {edu.institution && <p className="text-xs text-muted-foreground">{edu.institution}</p>}
                    </div>
                  ))}
                </ResumeSection>
              )}

              {data.projects.length > 0 && (
                <ResumeSection title="Projects">
                  {data.projects.map((proj) => (
                    <div key={proj.id} className="mb-4 last:mb-0">
                      <p className="text-sm font-semibold text-foreground">{proj.title}</p>
                      {proj.techStack && <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{proj.techStack}</p>}
                      {proj.description && <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{proj.description}</p>}
                    </div>
                  ))}
                </ResumeSection>
              )}

              {data.skills && (
                <ResumeSection title="Skills">
                  <div className="flex flex-wrap gap-2">
                    {data.skills.split(",").map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary text-secondary-foreground border border-border">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </ResumeSection>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const ResumeSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-[11px] font-mono font-bold text-foreground uppercase tracking-widest mb-3 pb-1.5 border-b border-border/50">
      {title}
    </h2>
    {children}
  </div>
);

export default PreviewPage;
