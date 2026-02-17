import { ResumeData } from "@/lib/resume-types";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Globe } from "lucide-react";
import { CSSProperties } from "react";

interface LivePreviewPanelProps {
  data: ResumeData;
}

const LivePreviewPanel = ({ data }: LivePreviewPanelProps) => {

  // Dynamic style object to inject the theme color into CSS variables
  // We use HSL values directly so Tailwind's alpha modifier works if we used standard variables,
  // but since we are replacing the internal value of --primary, we should ensure the format matches what tailwind expects.
  // The user provided HSL values like "168 60% 40%". 
  // Tailwind typically expects "168 60% 40%" for variables used with <alpha-value>.
  const themeStyle = {
    "--primary": data.themeColor || "168 60% 40%",
    // We can also derive a secondary lighter shade if needed, or simply use opacity
  } as CSSProperties;

  // Helper to flatten skills for some views if needed, or render groups
  const renderSkillsGrouped = (isModern = false) => {
    const { technical, soft, tools } = data.skills;
    return (
      <div className="space-y-2">
        {technical && technical.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className={`text-[10px] font-bold ${isModern ? "text-primary-foreground/80" : "text-primary"} mr-1 min-w-[30px]`}>Tech:</span>
            {technical.map((skill, i) => (
              <span key={`t-${i}`} className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${isModern ? "bg-background/20 text-primary-foreground border-transparent" : "bg-primary/5 text-primary border-primary/20"}`}>
                {skill}
              </span>
            ))}
          </div>
        )}
        {tools && tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className={`text-[10px] font-bold ${isModern ? "text-primary-foreground/80" : "text-primary"} mr-1 min-w-[30px]`}>Tools:</span>
            {tools.map((skill, i) => (
              <span key={`tl-${i}`} className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${isModern ? "bg-background/20 text-primary-foreground border-transparent" : "bg-primary/5 text-primary border-primary/20"}`}>
                {skill}
              </span>
            ))}
          </div>
        )}
        {soft && soft.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className={`text-[10px] font-bold ${isModern ? "text-primary-foreground/80" : "text-primary"} mr-1 min-w-[30px]`}>Soft:</span>
            {soft.map((skill, i) => (
              <span key={`s-${i}`} className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${isModern ? "bg-background/20 text-primary-foreground border-transparent" : "bg-primary/5 text-primary border-primary/20"}`}>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSimpleSkills = () => {
    const all = [...(data.skills.technical || []), ...(data.skills.tools || []), ...(data.skills.soft || [])];
    return (
      <div className="flex flex-wrap gap-1.5">
        {all.map((skill, i) => (
          <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/5 text-primary border border-primary/20">
            {skill}
          </span>
        ))}
      </div>
    );
  };

  // Layout Renderers
  const renderClassic = () => (
    <div className="p-6">
      <div className="bg-background border border-border rounded-lg p-8 shadow-sm max-w-[540px] mx-auto min-h-[700px]">
        <ClassicHeader data={data} />
        {data.summary && <PreviewSection title="Summary"><p className="text-xs text-foreground/80 leading-relaxed">{data.summary}</p></PreviewSection>}
        {data.experience.length > 0 && <PreviewSection title="Experience">{renderExperience(data.experience)}</PreviewSection>}
        {data.education.length > 0 && <PreviewSection title="Education">{renderEducation(data.education)}</PreviewSection>}
        {data.projects.length > 0 && <PreviewSection title="Projects">{renderProjects(data.projects)}</PreviewSection>}
        <PreviewSection title="Skills">{renderSkillsGrouped()}</PreviewSection>
      </div>
    </div>
  );

  const renderModern = () => (
    <div className="p-6">
      <div className="bg-background border border-border rounded-lg shadow-sm max-w-[540px] mx-auto min-h-[700px] flex overflow-hidden">
        {/* Sidebar - Colored Background */}
        <div className="w-[35%] bg-primary p-6 text-primary-foreground">
          <div className="mb-8">
            <h1 className="text-xl font-bold leading-tight mb-4">{data.personal.name}</h1>
            <div className="text-[10px] text-primary-foreground/90 space-y-2 font-mono">
              {data.personal.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{data.personal.email}</div>}
              {data.personal.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{data.personal.phone}</div>}
              {data.personal.location && <div className="flex items-center gap-2"><MapPin className="w-3 h-3" />{data.personal.location}</div>}
            </div>
            {(data.githubLink || data.linkedinLink) && (
              <div className="mt-4 space-y-2 text-[10px] text-primary-foreground/90 font-mono">
                {data.githubLink && <div className="flex items-center gap-2"><Github className="w-3 h-3" />Git</div>}
                {data.linkedinLink && <div className="flex items-center gap-2"><Linkedin className="w-3 h-3" />LinkedIn</div>}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-3 pb-1 border-b border-primary-foreground/20">Skills</h3>
            {renderSkillsGrouped(true)}
          </div>

          {data.education.length > 0 && (
            <div>
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest mb-3 pb-1 border-b border-primary-foreground/20">Education</h3>
              {data.education.map((edu: any) => (
                <div key={edu.id} className="mb-3 last:mb-0">
                  <div className="text-[11px] font-semibold">{edu.degree}</div>
                  <div className="text-[10px] opacity-90">{edu.institution}</div>
                  <div className="text-[9px] font-mono opacity-70 mt-0.5">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-[65%] p-6 bg-white">
          {data.summary && (
            <div className="mb-6">
              <h3 className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-2 border-b-2 border-primary/20 pb-1">Profile</h3>
              <p className="text-xs text-foreground/80 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-2 border-b-2 border-primary/20 pb-1">Experience</h3>
              {renderExperience(data.experience)}
            </div>
          )}

          {data.projects.length > 0 && (
            <div>
              <h3 className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-2 border-b-2 border-primary/20 pb-1">Projects</h3>
              {renderProjects(data.projects)}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className="p-6">
      <div className="bg-background border border-border rounded-lg p-8 shadow-sm max-w-[540px] mx-auto min-h-[700px] text-center">
        <h1 className="text-3xl font-light text-primary tracking-wide mb-2 uppercase">{data.personal.name}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-[10px] text-muted-foreground font-mono mb-8 uppercase tracking-wider">
          <span>{data.personal.email}</span>
          {data.personal.email && data.personal.phone && <span className="text-primary">•</span>}
          <span>{data.personal.phone}</span>
          {data.personal.phone && data.personal.location && <span className="text-primary">•</span>}
          <span>{data.personal.location}</span>
        </div>

        <div className="text-left space-y-8">
          {data.summary && <div className="text-center max-w-sm mx-auto"><p className="text-sm text-foreground/70 italic">{data.summary}</p></div>}

          {data.experience.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4"><div className="h-[1px] bg-primary/20 flex-1"></div><h3 className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest">Experience</h3><div className="h-[1px] bg-primary/20 flex-1"></div></div>
              {renderExperience(data.experience)}
            </div>
          )}

          {data.projects.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4"><div className="h-[1px] bg-primary/20 flex-1"></div><h3 className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest">Projects</h3><div className="h-[1px] bg-primary/20 flex-1"></div></div>
              {renderProjects(data.projects)}
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4"><div className="h-[1px] bg-primary/20 flex-1"></div><h3 className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest">Education & Skills</h3><div className="h-[1px] bg-primary/20 flex-1"></div></div>
              {renderEducation(data.education)}
              <div className="mt-4 text-center">{renderSimpleSkills()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={themeStyle as any} className="contents">
      {(() => {
        switch (data.template) {
          case "modern": return renderModern();
          case "minimal": return renderMinimal();
          default: return renderClassic();
        }
      })()}
    </div>
  );
};

/* Constants for sub-renderers to keep code clean */
const ClassicHeader = ({ data }: { data: ResumeData }) => (
  <div className="mb-6 pb-5 border-b-2 border-primary">
    <h1 className="text-2xl font-bold text-primary tracking-tight mb-2">{data.personal.name}</h1>
    <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground font-mono">
      {data.personal.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-primary" />{data.personal.email}</span>}
      {data.personal.phone && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-primary" />{data.personal.phone}</span>}
      {data.personal.location && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-primary" />{data.personal.location}</span>}
    </div>
    {(data.githubLink || data.linkedinLink) && (
      <div className="flex gap-4 mt-2 text-[11px] text-muted-foreground font-mono">
        {data.githubLink && <span className="flex items-center gap-1.5"><Github className="w-3 h-3 text-primary" />{data.githubLink}</span>}
        {data.linkedinLink && <span className="flex items-center gap-1.5"><Linkedin className="w-3 h-3 text-primary" />{data.linkedinLink}</span>}
      </div>
    )}
  </div>
);

const PreviewSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6 last:mb-0">
    <h3 className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest mb-3 pb-1 border-b border-primary/20">
      {title}
    </h3>
    {children}
  </div>
);

const renderExperience = (experience: any[], compact = false) => experience.map((exp: any) => (
  <div key={exp.id} className="mb-4 last:mb-0">
    <div className="flex items-baseline justify-between mb-0.5">
      <p className="text-xs font-bold text-foreground">{exp.role}<span className="text-foreground/70 font-medium"> · {exp.company}</span></p>
      {!compact && <p className="text-[10px] text-muted-foreground font-mono">{exp.startDate}{exp.endDate && ` — ${exp.endDate}`}</p>}
    </div>
    {compact && <p className="text-[10px] text-muted-foreground font-mono mb-0.5">{exp.startDate}{exp.endDate && ` — ${exp.endDate}`}</p>}
    {exp.description && <p className="text-[11px] text-foreground/80 mt-1 leading-relaxed">{exp.description}</p>}
  </div>
));

const renderEducation = (education: any[], compact = false) => education.map((edu: any) => (
  <div key={edu.id} className="mb-3 last:mb-0">
    <div className="flex items-baseline justify-between mb-0.5">
      <p className="text-xs font-bold text-foreground">{edu.degree}<span className="font-medium text-foreground/70"> in {edu.field}</span></p>
      {!compact && <p className="text-[10px] text-muted-foreground font-mono">{edu.startDate}{edu.endDate && ` — ${edu.endDate}`}</p>}
    </div>
    {compact && <p className="text-[10px] text-muted-foreground font-mono mb-0.5">{edu.startDate}{edu.endDate && ` — ${edu.endDate}`}</p>}
    {edu.institution && <p className="text-[11px] text-foreground/70">{edu.institution}</p>}
  </div>
));

const renderProjects = (projects: any[]) => projects.map((proj: any) => (
  <div key={proj.id} className="mb-4 last:mb-0">
    <div className="flex items-center gap-2 mb-1">
      <div className="flex items-baseline gap-2">
        <p className="text-xs font-bold text-foreground">{proj.title}</p>
        <div className="flex gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
          {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80"><Globe className="w-2.5 h-2.5" /></a>}
          {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80"><Github className="w-2.5 h-2.5" /></a>}
        </div>
      </div>
    </div>
    {proj.techStack && proj.techStack.length > 0 && (
      <div className="flex flex-wrap gap-1 mb-1.5">
        {proj.techStack.map((tech: string) => (
          <span key={tech} className="text-[9px] px-1.5 py-0 bg-primary/5 text-primary rounded border border-primary/10 font-mono">{tech}</span>
        ))}
      </div>
    )}
    {proj.description && <p className="text-[11px] text-foreground/80 mt-1 leading-relaxed">{proj.description}</p>}
  </div>
));

export default LivePreviewPanel;
