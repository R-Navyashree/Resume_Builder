import { useEffect, useState } from "react";
import { ResumeData } from "@/lib/resume-types";
import { calculateATSScore, ATSResult } from "@/lib/ats-scoring";
import { AlertCircle, CheckCircle2, Trophy, ArrowRight } from "lucide-react";

interface ATSScorePanelProps {
    data: ResumeData;
}

const ATSScorePanel = ({ data }: ATSScorePanelProps) => {
    const [result, setResult] = useState<ATSResult>({ score: 0, level: "Needs Work", color: "text-red-500", improvements: [] });

    useEffect(() => {
        setResult(calculateATSScore(data));
    }, [data]);

    const getBgColor = (score: number) => {
        if (score >= 71) return "bg-emerald-500";
        if (score >= 41) return "bg-amber-500";
        return "bg-red-500";
    };

    return (
        <div className="mb-6 p-4 rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        ATS Score
                    </h3>
                    <p className={`text-[10px] font-medium mt-0.5 ${result.color}`}>
                        {result.level}
                    </p>
                </div>
                <div className="relative flex items-center justify-center">
                    <div className={`text-2xl font-bold ${result.color}`}>
                        {result.score}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mb-4">
                <div
                    className={`h-full transition-all duration-500 ease-out ${getBgColor(result.score)}`}
                    style={{ width: `${result.score}%` }}
                />
            </div>

            {/* Improvements */}
            {result.improvements.length > 0 ? (
                <div className="space-y-2">
                    <h4 className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        To Improve:
                    </h4>
                    {result.improvements.map((suggestion, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                            <ArrowRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                            <span>{suggestion}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        Resume looks strong!
                    </p>
                </div>
            )}
        </div>
    );
};

export default ATSScorePanel;
