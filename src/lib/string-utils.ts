export const actionVerbs = [
    "Built",
    "Developed",
    "Designed",
    "Implemented",
    "Led",
    "Improved",
    "Created",
    "Optimized",
    "Automated",
    "Managed",
    "Engineered",
    "Architected",
    "Deployed",
    "Reduced",
    "Increased",
    "Streamlined",
    "Initiated",
    "Spearheaded",
    "Orchestrated",
    "Revamped",
];

export const checkBulletDiscipline = (text: string): string | null => {
    if (!text || text.trim().length === 0) return null;

    const firstWord = text.trim().split(" ")[0];
    // Simple check: is the first word in our list? (Case insensitive check might be better but let's stick to list for now or slightly smarter)
    // Actually, let's just check if it starts with a capital letter and looks like a verb. 
    // But user requirement says: "simple check for common verbs".
    const startsWithActionVerb = actionVerbs.some((verb) =>
        firstWord.toLowerCase() === verb.toLowerCase()
    );

    if (!startsWithActionVerb) {
        return "Start with a strong action verb (e.g., Built, Led, Optimized).";
    }

    // Check for numbers
    const hasNumbers = /[0-9%Xk$]/.test(text);
    if (!hasNumbers) {
        return "Add measurable impact (numbers like %, X, k).";
    }

    return null;
};
