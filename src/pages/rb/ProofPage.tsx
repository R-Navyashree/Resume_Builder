import { useState, useEffect } from "react";
import { STEPS, getArtifact } from "@/lib/rb-store";
import { Check, Copy, ExternalLink, ShieldCheck, AlertCircle, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AppNavbar from "@/components/app/AppNavbar";

interface ProofState {
  checklist: boolean[];
  links: {
    lovable: string;
    github: string;
    deployed: string;
  };
}

const CHECKLIST_ITEMS = [
  "All form sections save to localStorage",
  "Live preview updates in real-time",
  "Template switching preserves data",
  "Color theme persists after refresh",
  "ATS score calculates correctly",
  "Score updates live on edit",
  "Export buttons work (copy/download)",
  "Empty states handled gracefully",
  "Mobile responsive layout works",
  "No console errors on any page"
];

const ProofPage = () => {
  const { toast } = useToast();
  const [state, setState] = useState<ProofState>({
    checklist: new Array(10).fill(false),
    links: { lovable: "", github: "", deployed: "" }
  });

  // Load state
  useEffect(() => {
    const saved = localStorage.getItem("rb_final_submission");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load proof state", e);
      }
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem("rb_final_submission", JSON.stringify(state));
  }, [state]);

  const updateLink = (key: keyof ProofState["links"], value: string) => {
    setState(prev => ({ ...prev, links: { ...prev.links, [key]: value } }));
  };

  const toggleChecklist = (index: number) => {
    setState(prev => {
      const newChecklist = [...prev.checklist];
      newChecklist[index] = !newChecklist[index];
      return { ...prev, checklist: newChecklist };
    });
  };

  // Status Logic
  const stepsCompleted = STEPS.every(s => getArtifact(s.num).uploaded);
  const checklistCompleted = state.checklist.every(Boolean);
  const linksProvided = Object.values(state.links).every(l => l.trim().length > 0 && (l.startsWith("http") || l.startsWith("www")));

  const isShipped = stepsCompleted && checklistCompleted && linksProvided;

  const handleCopy = () => {
    const text = `
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${state.links.lovable}
GitHub Repository: ${state.links.github}
Live Deployment: ${state.links.deployed}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------
`.trim();

    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Ready for submission.",
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <AppNavbar />

      <main className="max-w-4xl mx-auto py-10 px-6">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Project Proof & Submission</h1>
            <p className="text-muted-foreground text-sm font-mono">
              Complete all steps and verification items to ship.
            </p>
          </div>
          <div className={`px-4 py-1.5 rounded-full font-mono text-xs font-bold border ${isShipped ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-secondary text-muted-foreground border-border"}`}>
            {isShipped ? "SHIPPED" : "IN PROGRESS"}
          </div>
        </div>

        {isShipped && (
          <div className="mb-10 p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center animate-in fade-in duration-700">
            <Award className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Project 3 Shipped Successfully.</h2>
            <p className="text-emerald-600/80 dark:text-emerald-500/80 text-sm font-mono">Premium work. Well done.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Column: Tracking */}
          <div className="space-y-8">
            {/* Step Overview */}
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border/50 pb-2">
                Build Steps
              </h3>
              <div className="space-y-3">
                {STEPS.map((step) => {
                  const isDone = getArtifact(step.num).uploaded;
                  // For dev purposes, we might want to manually toggle if "uploaded" check logic is strict?
                  // The prompt said "Show all 8 steps with status". Assuming existing logic holds.
                  // If in dev environment without backend, "uploaded" might be false. 
                  // Let's assume the user has been marking them or we rely on the store.
                  return (
                    <div key={step.num} className="flex items-center justify-between text-sm group">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${isDone ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground/30 text-muted-foreground"}`}>
                          {isDone ? <Check className="w-3 h-3" /> : step.num}
                        </div>
                        <span className={isDone ? "text-foreground" : "text-muted-foreground"}>{step.title}</span>
                      </div>
                      {isDone && <span className="text-[10px] font-mono text-emerald-500">Done</span>}
                    </div>
                  );
                })}
              </div>
              {!stepsCompleted && (
                <p className="mt-4 text-[10px] text-amber-500 flex items-center gap-1.5 bg-amber-500/10 p-2 rounded">
                  <AlertCircle className="w-3 h-3" />
                  Complete all steps in the Build Track to proceed.
                </p>
              )}
            </section>

            {/* Checklist */}
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border/50 pb-2">
                Verification Checklist
              </h3>
              <div className="space-y-2">
                {CHECKLIST_ITEMS.map((item, idx) => (
                  <label key={idx} className="flex items-start gap-3 p-2 rounded hover:bg-secondary/30 cursor-pointer transition-colors">
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${state.checklist[idx] ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/40 bg-background"}`}>
                      {state.checklist[idx] && <Check className="w-3 h-3" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={state.checklist[idx]}
                      onChange={() => toggleChecklist(idx)}
                      className="hidden"
                    />
                    <span className={`text-xs ${state.checklist[idx] ? "text-foreground" : "text-muted-foreground"}`}>{item}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Artifacts & Submission */}
          <div className="space-y-8">
            {/* Artifacts */}
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border/50 pb-2">
                Deployment Artifacts
              </h3>
              <div className="space-y-4">
                <Input
                  label="Lovable Project Link"
                  value={state.links.lovable}
                  onChange={(v) => updateLink("lovable", v)}
                  placeholder="https://lovable.dev/..."
                />
                <Input
                  label="GitHub Repository"
                  value={state.links.github}
                  onChange={(v) => updateLink("github", v)}
                  placeholder="https://github.com/..."
                />
                <Input
                  label="Deployed URL"
                  value={state.links.deployed}
                  onChange={(v) => updateLink("deployed", v)}
                  placeholder="https://..."
                />
              </div>
            </section>

            {/* Final Action */}
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border/50 pb-2">
                Submission
              </h3>
              <div className="bg-secondary/30 p-4 rounded-md font-mono text-[10px] text-muted-foreground mb-4 overflow-x-auto">
                <p className="mb-2 text-foreground font-bold">AI Resume Builder — Final Submission</p>
                <p>Lovable: {state.links.lovable || "..."}</p>
                <p>GitHub: {state.links.github || "..."}</p>
                <p>Deploy: {state.links.deployed || "..."}</p>
              </div>

              <button
                onClick={handleCopy}
                disabled={!isShipped}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${isShipped
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                  }`}
              >
                <Copy className="w-4 h-4" />
                Copy Final Submission
              </button>
              {!isShipped && (
                <p className="text-[10px] text-center text-muted-foreground mt-2">
                  Complete all steps, checklist items, and links to unlock.
                </p>
              )}
            </section>
          </div>

        </div>
      </main>
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-[10px] font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-md pl-3 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary/50 font-mono transition-shadow"
      />
      {value && (value.startsWith("http") || value.startsWith("www")) ? (
        <ShieldCheck className="absolute right-2.5 top-2.5 w-4 h-4 text-emerald-500" />
      ) : value ? (
        <AlertCircle className="absolute right-2.5 top-2.5 w-4 h-4 text-amber-500" />
      ) : null}
    </div>
  </div>
);

export default ProofPage;
