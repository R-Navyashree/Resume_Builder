import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-primary font-mono font-bold text-sm">⚡</span>
          <span className="font-semibold text-foreground text-sm">AI Resume Builder</span>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground/60">KodNest Premium</div>
      </nav>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-xl px-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
            <FileText className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight leading-tight">
            Build a Resume<br />
            <span className="text-primary">That Gets Read.</span>
          </h1>

          <p className="text-muted-foreground mb-10 text-base leading-relaxed max-w-md mx-auto">
            Structured builder with live preview. Clean typography. 
            Designed for developers who ship.
          </p>

          <button
            onClick={() => navigate("/builder")}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg animate-pulse-glow"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      <footer className="px-6 py-3 border-t border-border bg-card text-center">
        <p className="text-[10px] font-mono text-muted-foreground/60">
          KodNest Premium Build System — AI Resume Builder
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
