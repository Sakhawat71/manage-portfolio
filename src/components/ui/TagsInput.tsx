"use client";
import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function TagsInput({
    value,
    onChange,
    placeholder,
}: {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent) => {
        if (["Enter", ","].includes(e.key) && inputValue.trim()) {
            e.preventDefault();
            if (!value.includes(inputValue.trim())) {
                onChange([...value, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    return (
        <div className="border rounded-lg p-2 bg-background">
            <div className="flex flex-wrap gap-2 mb-2">
                {value.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                        {tag}
                        <button
                            type="button"
                            onClick={() => onChange(value.filter((t) => t !== tag))}
                            className="ml-2 rounded-full"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="border-0 focus-visible:ring-0"
            />
        </div>
    );
}