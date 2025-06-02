// Toolbar.tsx
"use client";

import { Editor } from "@tiptap/react";
import {
    Bold,
    Italic,
    Strikethrough,
    Underline,
    List,
    ListOrdered,
    Link2,
    Image,
    Code,
    Heading1,
    Heading2,
    Quote,
    Undo,
    Redo,
    Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ToolbarProps {
    editor: Editor | null;
}

export function Toolbar({ editor }: ToolbarProps) {
    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt("Enter the URL of the image:");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-1 border rounded-lg bg-background">
            {/* Text formatting */}
            <Button
                type="button"
                variant={editor.isActive("bold") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
            >
                <Bold className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant={editor.isActive("italic") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
                <Italic className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant={editor.isActive("underline") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <Underline className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant={editor.isActive("strike") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant={editor.isActive("highlight") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
                <div className="h-4 w-4 bg-yellow-300 rounded-sm" />
            </Button>

            <div className="h-6 border-l mx-1" />

            {/* Headings */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" size="sm">
                        <Heading1 className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2">
                    <Button
                        type="button"
                        variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    >
                        <Heading1 className="mr-2 h-4 w-4" />
                        Heading 1
                    </Button>
                    <Button
                        type="button"
                        variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-start mt-1"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    >
                        <Heading2 className="mr-2 h-4 w-4" />
                        Heading 2
                    </Button>
                </PopoverContent>
            </Popover>

            {/* Lists */}
            <Button
                type="button"
                variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                <Code2 className="h-4 w-4" />
            </Button>

            <div className="h-6 border-l mx-1" />

            {/* Links & Images */}
            <Button
                type="button"
                variant={editor.isActive("link") ? "secondary" : "ghost"}
                size="sm"
                onClick={setLink}
            >
                <Link2 className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addImage}
            >
                <Image className="h-4 w-4" />
            </Button>

            <div className="h-6 border-l mx-1" />

            {/* Code */}
            <Button
                type="button"
                variant={editor.isActive("code") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <Code className="h-4 w-4" />
            </Button>

            <div className="h-6 border-l mx-1" />

            {/* Undo/Redo */}
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                <Undo className="h-4 w-4" />
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                <Redo className="h-4 w-4" />
            </Button>
        </div>
    );
}