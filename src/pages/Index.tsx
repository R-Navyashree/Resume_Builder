import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-lg px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold mb-6">
          ⚡ KodNest Premium Build System
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Project 3 — AI Resume Builder
        </h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Build Track: 8 steps from problem statement to deployment.
        </p>
        <button
          onClick={() => navigate("/rb/01-problem")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg"
        >
          Start Building
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Index;
