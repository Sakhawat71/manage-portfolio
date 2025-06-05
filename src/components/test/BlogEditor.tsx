"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { Toolbar } from "./Toolbar";
// import { Toolbar } from "../modules/dashboard/blog/Toolbar";


// Setup syntax highlighting
const lowlight = createLowlight();
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

interface BlogEditorProps {
    onChange: (html: string, json: any) => void;
    initialContent?: string;
    onTitleChange?: (title: string) => void;
    onCoverImageChange?: (imageUrl: string) => void;
    initialTitle?: string;
    initialCoverImage?: string;
}

export default function BlogEditor({
    onChange,
    initialContent = "",
    onTitleChange,
    onCoverImageChange,
    initialTitle = "",
    initialCoverImage = "",
}: BlogEditorProps) {
    const [title, setTitle] = useState(initialTitle);
    const [coverImage, setCoverImage] = useState(initialCoverImage);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: "plaintext",
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ["left", "center", "right", "justify"],
                defaultAlignment: "left",
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 hover:underline",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-lg border mx-auto",
                },
            }),
            Highlight.configure({ multicolor: true }),
            Underline,
            Placeholder.configure({
                placeholder: "Start writing your blog here...",
            }),
        ],
        content: initialContent,
        onUpdate({ editor }) {
            onChange(editor.getHTML(), editor.getJSON());
        },
        editorProps: {
            attributes: {
                class:
                    "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4",
                style: `
          h1 { border-left: 4px solid #3b82f6; padding-left: 0.75rem; margin: 1rem 0; }
          h2 { border-left: 3px solid #3b82f6; padding-left: 0.75rem; margin: 0.8rem 0; }
          ul, ol { 
            background-color: rgba(59, 130, 246, 0.05); 
            padding: 0.5rem 1.5rem; 
            border-radius: 0.5rem;
            margin: 0.5rem 0;
          }
          [data-text-align="center"] { text-align: center }
          [data-text-align="right"] { text-align: right }
          [data-text-align="justify"] { text-align: justify }
        `,
            },
        },
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        onTitleChange?.(e.target.value);
    };

    const handleCoverImageChange = () => {
        const url = window.prompt("Enter image URL:");
        if (url) {
            setCoverImage(url);
            onCoverImageChange?.(url);
        }
    };

    if (!editor) {
        return (
            <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50 dark:bg-gray-800 animate-pulse">
                Loading editor...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Title Input */}
            <input
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter blog title..."
                className="text-3xl font-bold w-full border-none outline-none bg-transparent"
            />

            {/* Cover Image Preview */}
            {coverImage && (
                <img
                    src={coverImage}
                    alt="Cover"
                    className="rounded-lg w-full max-h-96 object-cover"
                />
            )}
            <button
                onClick={handleCoverImageChange}
                type="button"
                className="text-sm text-blue-600 hover:underline"
            >
                {coverImage ? "Change Cover Image" : "Add Cover Image"}
            </button>

            {/* Editor Toolbar + Content */}
            <Toolbar editor={editor} addImage={function (): void {
                throw new Error("Function not implemented.");
            } } setLink={function (): void {
                throw new Error("Function not implemented.");
            } } />

            <div className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-900">
                <EditorContent editor={editor} />
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
                Tip: Use Markdown shortcuts (## for heading, **bold**, etc.) for faster writing
            </div>
        </div>
    );
}
