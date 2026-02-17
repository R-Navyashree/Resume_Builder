import { getCompletedCount } from "@/lib/rb-store";

interface TopBarProps {
  currentStep?: number;
}

const TopBar = ({ currentStep }: TopBarProps) => {
  const completed = getCompletedCount();
  const allDone = completed === 8;

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <span className="text-primary font-mono font-bold text-sm tracking-wider">⚡</span>
        <span className="font-semibold text-foreground text-sm">AI Resume Builder</span>
      </div>

      <div className="font-mono text-xs text-muted-foreground tracking-wide">
        {currentStep
          ? `Project 3 — Step ${currentStep} of 8`
          : "Project 3 — Proof of Completion"}
      </div>

      <div>
        {allDone ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/15 text-primary border border-primary/30">
            ● Complete
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-kodnest-warning/15 text-kodnest-warning border border-kodnest-warning/30">
            ● In Progress
          </span>
        )}
      </div>
    </div>
  );
};

export default TopBar;
