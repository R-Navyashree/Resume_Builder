import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PremiumLayout from "@/components/rb/PremiumLayout";
import BuildPanel from "@/components/rb/BuildPanel";
import { STEPS, isStepUnlocked, getArtifact } from "@/lib/rb-store";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";

const StepPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [, forceUpdate] = useState(0);

  const step = STEPS.find((s) => s.slug === slug);

  useEffect(() => {
    if (!step) {
      navigate("/rb/01-problem");
      return;
    }
    if (!isStepUnlocked(step.num)) {
      // Find last unlocked step
      for (let i = step.num - 1; i >= 1; i--) {
        if (isStepUnlocked(i)) {
          navigate(`/rb/${STEPS[i - 1].slug}`);
          return;
        }
      }
      navigate("/rb/01-problem");
    }
  }, [step, navigate]);

  if (!step) return null;

  const artifact = getArtifact(step.num);
  const canGoNext = artifact.uploaded;
  const isLast = step.num === 8;

  const handleNext = () => {
    if (isLast && canGoNext) {
      navigate("/rb/proof");
    } else if (canGoNext && step.num < 8) {
      const nextStep = STEPS.find((s) => s.num === step.num + 1);
      if (nextStep) navigate(`/rb/${nextStep.slug}`);
    }
  };

  const handlePrev = () => {
    if (step.num > 1) {
      navigate(`/rb/${STEPS[step.num - 2].slug}`);
    }
  };

  const mainContent = (
    <div className="flex flex-col h-full">
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 text-primary font-mono font-bold text-sm">
            {step.num}
          </span>
          <h1 className="text-xl font-bold text-foreground">{step.title}</h1>
        </div>
        <p className="text-sm text-muted-foreground font-mono ml-11">
          Step {step.num} of 8 — AI Resume Builder Build Track
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-mono font-bold text-muted-foreground">{step.num}</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">{step.title}</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Use the Build Panel to paste your prompt, copy it into Lovable, then confirm the result.
          </p>
          {!artifact.uploaded && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-kodnest-warning/10 border border-kodnest-warning/20 text-kodnest-warning text-xs font-mono">
              <Lock className="w-3.5 h-3.5" />
              Complete this step to unlock the next
            </div>
          )}
          {artifact.uploaded && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-kodnest-success/10 border border-kodnest-success/20 text-kodnest-success text-xs font-mono">
              ✓ Artifact uploaded
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-4 border-t border-border">
        <button
          onClick={handlePrev}
          disabled={step.num === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-mono font-semibold transition-all
            ${canGoNext
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
              : "bg-muted text-muted-foreground cursor-not-allowed"
            }
          `}
        >
          {isLast ? "View Proof" : "Next Step"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const sidePanel = (
    <BuildPanel stepNum={step.num} onArtifactSaved={() => forceUpdate((n) => n + 1)} />
  );

  return <PremiumLayout currentStep={step.num} mainContent={mainContent} sidePanel={sidePanel} />;
};

export default StepPage;
