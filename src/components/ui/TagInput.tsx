import { X } from "lucide-react";
import { useState } from "react";

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
}

export const TagInput = ({ tags, onChange, placeholder = "Type & press Enter", className = "" }: TagInputProps) => {
    const [input, setInput] = useState("");

    // Safety check for tags
    const safeTags = Array.isArray(tags) ? tags : [];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = input.trim();
            if (trimmed && !safeTags.includes(trimmed)) {
                onChange([...safeTags, trimmed]);
                setInput("");
            }
        } else if (e.key === "Backspace" && !input && safeTags.length > 0) {
            // Optional: remove last tag on backspace if input empty
            // onChange(safeTags.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(safeTags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className={`flex flex-wrap gap-1.5 p-2 bg-background border border-border rounded-md focus-within:ring-1 focus-within:ring-primary/50 ${className}`}>
            {safeTags.map((tag) => (
                <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono bg-secondary text-secondary-foreground rounded-full border border-border/50 animate-in fade-in zoom-in duration-200"
                >
                    {tag}
                    <button
                        onClick={() => removeTag(tag)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        type="button"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={safeTags.length === 0 ? placeholder : ""}
                className="flex-1 bg-transparent border-none text-sm focus:outline-none min-w-[100px] font-mono placeholder:text-muted-foreground/40"
            />
        </div>
    );
};
