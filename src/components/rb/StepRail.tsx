import { useNavigate } from "react-router-dom";
import { STEPS, isStepUnlocked, getArtifact } from "@/lib/rb-store";
import { Lock, Check, ChevronRight } from "lucide-react";

interface StepRailProps {
  currentStep: number;
}

const StepRail = ({ currentStep }: StepRailProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-1 px-6 py-3 bg-muted/50 border-b border-border overflow-x-auto">
      {STEPS.map((step) => {
        const unlocked = isStepUnlocked(step.num);
        const done = getArtifact(step.num).uploaded;
        const active = step.num === currentStep;

        return (
          <div key={step.num} className="flex items-center gap-1">
            <button
              onClick={() => unlocked && navigate(`/rb/${step.slug}`)}
              disabled={!unlocked}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all
                ${active
                  ? "bg-primary text-primary-foreground shadow-md animate-pulse-glow"
                  : done
                    ? "bg-kodnest-info/15 text-kodnest-info border border-kodnest-info/30 hover:bg-kodnest-info/25"
                    : unlocked
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                      : "bg-muted text-kodnest-step-locked cursor-not-allowed border border-transparent"
                }
              `}
            >
              {!unlocked && <Lock className="w-3 h-3" />}
              {done && !active && <Check className="w-3 h-3" />}
              {step.short}
            </button>
            {step.num < 8 && <ChevronRight className="w-3 h-3 text-muted-foreground/40" />}
          </div>
        );
      })}
    </div>
  );
};

export default StepRail;
