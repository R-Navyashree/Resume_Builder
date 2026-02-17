import { useState } from "react";
import { STEPS, getArtifact, getStore, saveStore } from "@/lib/rb-store";
import TopBar from "@/components/rb/TopBar";
import { Check, X, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const ProofPage = () => {
  const store = getStore();
  const [lovableLink, setLovableLink] = useState(store.lovableLink || "");
  const [githubLink, setGithubLink] = useState(store.githubLink || "");
  const [deployLink, setDeployLink] = useState(store.deployLink || "");

  const saveLinks = () => {
    const s = getStore();
    s.lovableLink = lovableLink;
    s.githubLink = githubLink;
    s.deployLink = deployLink;
    saveStore(s);
    toast.success("Links saved");
  };

  const copySubmission = () => {
    const lines = [
      "=== KodNest Premium Build — Project 3: AI Resume Builder ===",
      "",
      "Step Status:",
      ...STEPS.map((step) => {
        const a = getArtifact(step.num);
        return `  Step ${step.num} (${step.title}): ${a.uploaded ? "✅ Complete" : "❌ Incomplete"}`;
      }),
      "",
      `Lovable Link: ${lovableLink || "Not provided"}`,
      `GitHub Link: ${githubLink || "Not provided"}`,
      `Deploy Link: ${deployLink || "Not provided"}`,
      "",
      `Submitted: ${new Date().toISOString()}`,
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    toast.success("Submission copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-1">Proof of Completion</h1>
          <p className="text-sm text-muted-foreground font-mono mb-8">
            Project 3 — AI Resume Builder Build Track
          </p>

          {/* Step Status Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {STEPS.map((step) => {
              const a = getArtifact(step.num);
              return (
                <div
                  key={step.num}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    a.uploaded
                      ? "bg-kodnest-success/5 border-kodnest-success/20"
                      : "bg-secondary/50 border-border"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                      a.uploaded
                        ? "bg-kodnest-success/20 text-kodnest-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {a.uploaded ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{step.title}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {a.uploaded ? `Done${a.timestamp ? ` • ${new Date(a.timestamp).toLocaleDateString()}` : ""}` : "Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Links */}
          <div className="space-y-4 mb-8">
            <h2 className="text-sm font-mono font-semibold text-muted-foreground uppercase tracking-widest">
              Submission Links
            </h2>
            {[
              { label: "Lovable Project Link", value: lovableLink, set: setLovableLink },
              { label: "GitHub Repository", value: githubLink, set: setGithubLink },
              { label: "Deployed URL", value: deployLink, set: setDeployLink },
            ].map(({ label, value, set }) => (
              <div key={label}>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">{label}</label>
                <input
                  type="url"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  onBlur={saveLinks}
                  placeholder={`https://...`}
                  className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={copySubmission}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy Final Submission
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-2 border-t border-border bg-card">
        <p className="text-[10px] font-mono text-muted-foreground/60 text-center">
          KodNest Premium Build System — Project 3: AI Resume Builder
        </p>
      </div>
    </div>
  );
};

export default ProofPage;
