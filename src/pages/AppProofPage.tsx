import AppNavbar from "@/components/app/AppNavbar";
import { Award } from "lucide-react";

const AppProofPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppNavbar />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center mx-auto mb-6">
            <Award className="w-7 h-7 text-muted-foreground/50" />
          </div>
          <h1 className="text-lg font-bold text-foreground mb-2">Proof of Completion</h1>
          <p className="text-sm text-muted-foreground font-mono mb-6">
            Artifacts and submission links will appear here once available.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-kodnest-warning/10 border border-kodnest-warning/20 text-kodnest-warning text-xs font-mono">
            🚧 Coming soon — Build the resume first
          </div>
        </div>
      </main>

      <footer className="px-6 py-2 border-t border-border bg-card text-center">
        <p className="text-[10px] font-mono text-muted-foreground/60">
          KodNest Premium Build System — AI Resume Builder
        </p>
      </footer>
    </div>
  );
};

export default AppProofPage;
