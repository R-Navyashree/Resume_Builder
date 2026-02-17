import { ResumeData } from "./resume-types";

/**
 * Validates resume data for critical missing fields before export.
 * Returns an array of warning messages.
 */
export const validateForExport = (data: ResumeData): string[] => {
    const warnings: string[] = [];

    if (!data.personal.name || data.personal.name.trim().length === 0) {
        warnings.push("Name is missing.");
    }

    if (data.experience.length === 0 && data.projects.length === 0) {
        warnings.push("No experience or projects listed.");
    }

    return warnings;
};

/**
 * Generates a clean plain-text version of the resume.
 */
export const generateResumePlainText = (data: ResumeData): string => {
    const sections: string[] = [];

    // 1. Header
    let header = data.personal.name.toUpperCase();
    const contactParts = [
        data.personal.email,
        data.personal.phone,
        data.personal.location,
        data.linkedinLink,
        data.githubLink
    ].filter(Boolean);

    if (contactParts.length > 0) {
        header += `\n${contactParts.join(" | ")}`;
    }
    sections.push(header);

    // 2. Summary
    if (data.summary) {
        sections.push(`SUMMARY\n${data.summary}`);
    }

    // 3. Experience
    if (data.experience.length > 0) {
        const expContent = data.experience.map(exp => {
            const line1 = `${exp.role} at ${exp.company}`;
            const line2 = `${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ""}`;
            const desc = exp.description ? `\n${exp.description}` : "";
            return `${line1} (${line2})${desc}`;
        }).join("\n\n");
        sections.push(`EXPERIENCE\n${expContent}`);
    }

    // 4. Projects
    if (data.projects.length > 0) {
        const projContent = data.projects.map(proj => {
            const title = proj.title;
            const tech = proj.techStack.length > 0 ? ` [${proj.techStack.join(", ")}]` : "";
            const desc = proj.description ? `\n${proj.description}` : "";
            const live = proj.liveUrl ? `\nLive: ${proj.liveUrl}` : "";
            const git = proj.githubUrl ? `\nGitHub: ${proj.githubUrl}` : "";
            return `${title}${tech}${desc}${live}${git}`;
        }).join("\n\n");
        sections.push(`PROJECTS\n${projContent}`);
    }

    // 5. Education
    if (data.education.length > 0) {
        const eduContent = data.education.map(edu => {
            const line1 = `${edu.degree} in ${edu.field}`;
            const line2 = `${edu.institution}`;
            const dates = `${edu.startDate}${edu.endDate ? ` - ${edu.endDate}` : ""}`;
            return `${line1}\n${line2} | ${dates}`;
        }).join("\n\n");
        sections.push(`EDUCATION\n${eduContent}`);
    }

    // 6. Skills
    const allSkills = [
        ...(data.skills.technical || []),
        ...(data.skills.tools || []),
        ...(data.skills.soft || [])
    ];
    if (allSkills.length > 0) {
        sections.push(`SKILLS\n${allSkills.join(", ")}`);
    }

    return sections.join("\n\n----------------------------------------\n\n");
};
