import { ResumeData } from "./resume-types";
import { actionVerbs } from "./string-utils";

export interface ATSResult {
    score: number;
    level: "Needs Work" | "Getting There" | "Strong Resume";
    color: string; // Tailwind class component reference or hex
    improvements: string[];
}

export const calculateATSScore = (data: ResumeData): ATSResult => {
    let score = 0;
    const improvements: string[] = [];

    // 1. Name provided (+10)
    if (data.personal.name && data.personal.name.trim().length > 0) {
        score += 10;
    } else {
        improvements.push("Add your full name (+10)");
    }

    // 2. Email provided (+10)
    if (data.personal.email && data.personal.email.trim().length > 0) {
        score += 10;
    } else {
        improvements.push("Add a professional email (+10)");
    }

    // 3. Summary > 50 chars (+10)
    if (data.summary && data.summary.trim().length > 50) {
        score += 10;
    } else {
        improvements.push("Expand summary to >50 characters (+10)");
    }

    // 4. Summary Action Verbs (+10)
    // Check if summary contains any action verbs
    const summaryLower = (data.summary || "").toLowerCase();
    const hasActionVerb = actionVerbs.some(verb => summaryLower.includes(verb.toLowerCase()));
    if (hasActionVerb) {
        score += 10;
    } else {
        improvements.push("Use strong action verbs in summary (e.g. Led, Built) (+10)");
    }

    // 5. Experience: At least 1 entry with bullets (+15)
    // Simple check: has experience and description is not empty
    const hasExperience = data.experience.length > 0 && data.experience.some(exp => exp.description && exp.description.trim().length > 10);
    if (hasExperience) {
        score += 15;
    } else {
        improvements.push("Add at least 1 detailed experience entry (+15)");
    }

    // 6. Education: At least 1 entry (+10)
    if (data.education.length > 0) {
        score += 10;
    } else {
        improvements.push("Add education details (+10)");
    }

    // 7. Skills: At least 5 added (+10)
    const allSkills = [
        ...(data.skills.technical || []),
        ...(data.skills.soft || []),
        ...(data.skills.tools || [])
    ];
    if (allSkills.length >= 5) {
        score += 10;
    } else {
        improvements.push(`Add more skills (currently ${allSkills.length}/5) (+10)`);
    }

    // 8. Projects: At least 1 added (+10)
    if (data.projects.length >= 1) {
        score += 10;
    } else {
        improvements.push("Add at least 1 project (+10)");
    }

    // 9. Phone provided (+5)
    if (data.personal.phone && data.personal.phone.trim().length > 0) {
        score += 5;
    } else {
        improvements.push("Add phone number (+5)");
    }

    // 10. LinkedIn provided (+5)
    if (data.linkedinLink && data.linkedinLink.trim().length > 0) {
        score += 5;
    } else {
        improvements.push("Add LinkedIn profile (+5)");
    }

    // 11. GitHub provided (+5)
    if (data.githubLink && data.githubLink.trim().length > 0) {
        score += 5;
    } else {
        improvements.push("Add GitHub profile (+5)");
    }

    // Determine Level
    let level: ATSResult["level"] = "Needs Work";
    let color = "text-red-500";

    if (score >= 71) {
        level = "Strong Resume";
        color = "text-emerald-500";
    } else if (score >= 41) {
        level = "Getting There";
        color = "text-amber-500";
    }

    return {
        score: Math.min(score, 100),
        level,
        color,
        improvements
    };
};
