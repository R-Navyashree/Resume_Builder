import { useState } from "react";
import { Copy, ExternalLink, CheckCircle2, XCircle, ImagePlus } from "lucide-react";
import { saveArtifact, getArtifact } from "@/lib/rb-store";
import { toast } from "sonner";

interface BuildPanelProps {
  stepNum: number;
  onArtifactSaved: () => void;
}

const BuildPanel = ({ stepNum, onArtifactSaved }: BuildPanelProps) => {
  const existing = getArtifact(stepNum);
  const [prompt, setPrompt] = useState("");
  const [saved, setSaved] = useState(existing.uploaded);

  const handleCopy = () => {
    if (!prompt.trim()) {
      toast.error("Nothing to copy");
      return;
    }
    navigator.clipboard.writeText(prompt);
    toast.success("Copied to clipboard!");
  };

  const handleStatus = (status: "worked" | "error") => {
    if (!prompt.trim()) {
      toast.error("Paste your prompt first");
      return;
    }
    saveArtifact(stepNum, {
      uploaded: true,
      timestamp: new Date().toISOString(),
      status,
    });
    setSaved(true);
    onArtifactSaved();
    toast.success(status === "worked" ? "Step marked complete ✓" : "Error logged — you can retry or move on");
  };

  return (
    <div className="flex flex-col h-full bg-kodnest-panel border-l border-border">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
          Build Panel
        </h3>
      </div>

      <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-2">
            Copy This Into Lovable
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Paste your prompt or artifact here..."
            className="w-full h-40 bg-background border border-border rounded-md p-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-secondary text-secondary-foreground text-sm font-mono font-medium hover:bg-secondary/80 transition-colors border border-border"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>

        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-mono font-semibold hover:bg-primary/90 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Build in Lovable
        </a>

        <div className="border-t border-border pt-4 space-y-2">
          <p className="text-xs font-mono text-muted-foreground mb-2">Did it work?</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleStatus("worked")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-mono font-medium transition-colors border
                ${saved && existing.status === "worked"
                  ? "bg-kodnest-success/20 text-kodnest-success border-kodnest-success/40"
                  : "bg-secondary text-secondary-foreground border-border hover:bg-kodnest-success/10 hover:text-kodnest-success hover:border-kodnest-success/30"
                }
              `}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              It Worked
            </button>
            <button
              onClick={() => handleStatus("error")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-mono font-medium transition-colors border
                ${saved && existing.status === "error"
                  ? "bg-kodnest-error/20 text-kodnest-error border-kodnest-error/40"
                  : "bg-secondary text-secondary-foreground border-border hover:bg-kodnest-error/10 hover:text-kodnest-error hover:border-kodnest-error/30"
                }
              `}
            >
              <XCircle className="w-3.5 h-3.5" />
              Error
            </button>
          </div>
          <button
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-md text-xs font-mono text-muted-foreground border border-dashed border-border hover:bg-secondary/50 transition-colors"
          >
            <ImagePlus className="w-3.5 h-3.5" />
            Add Screenshot
          </button>
        </div>
      </div>

      {saved && (
        <div className="px-4 py-3 border-t border-border bg-kodnest-success/5">
          <p className="text-xs font-mono text-kodnest-success">
            ✓ Artifact saved — rb_step_{stepNum}_artifact
          </p>
        </div>
      )}
    </div>
  );
};

export default BuildPanel;
