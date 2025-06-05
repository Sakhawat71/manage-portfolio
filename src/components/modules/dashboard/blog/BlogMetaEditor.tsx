"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagsInput } from "@/components/ui/TagsInput";

export function BlogMetaEditor({
    initialTitle = "",
    initialTags = [],
    onChange,
}: {
    initialTitle?: string;
    initialTags?: string[];
    onChange: (meta: { title: string; tags: string[] }) => void;
}) {
    const [title, setTitle] = useState(initialTitle);
    const [tags, setTags] = useState<string[]>(initialTags);

    // Debounce the onChange calls
    useEffect(() => {
        const timer = setTimeout(() => {
            onChange({ title, tags });
        }, 300);

        return () => clearTimeout(timer);
    }, [title, tags, onChange]);

    return (
        <div className="space-y-2 mb-4">
            <div className="space-y-1">
                <Label htmlFor="blog-title">Blog Title</Label>
                <Input
                    id="blog-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your blog title..."
                    className="text-lg font-medium h-12 bg-white"
                />
            </div>

            <div className="space-y-1">
                <Label>Tags</Label>
                <TagsInput
                    value={tags}
                    onChange={setTags}
                    placeholder="Type and press enter to add tags"
                />
            </div>
        </div>
    );
}