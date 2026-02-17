import { ReactNode } from "react";
import TopBar from "./TopBar";
import StepRail from "./StepRail";

interface PremiumLayoutProps {
  currentStep?: number;
  mainContent: ReactNode;
  sidePanel: ReactNode;
}

const PremiumLayout = ({ currentStep, mainContent, sidePanel }: PremiumLayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <TopBar currentStep={currentStep} />
      {currentStep && <StepRail currentStep={currentStep} />}

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[70%] overflow-y-auto">
          {mainContent}
        </div>
        <div className="w-[30%] overflow-hidden">
          {sidePanel}
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

export default PremiumLayout;
