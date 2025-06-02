"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { createLowlight } from "lowlight"; // Updated import
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { Toolbar } from "./Toolbar";

// Create lowlight instance
const lowlight = createLowlight();

// Register languages with lowlight
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

interface BlogEditorProps {
    onChange: (html: string, json: any) => void;
}

export default function BlogEditor({ onChange }: BlogEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false, // Disable the default code block
            }),
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: 'plaintext', // Default language if none specified
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
            Highlight.configure({
                multicolor: true,
            }),
            Underline,
            Placeholder.configure({
                placeholder: "Start writing your blog here...",
            }),
        ],
        content: "",
        onUpdate({ editor }) {
            onChange(editor.getHTML(), editor.getJSON());
        },
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4",
            },
        },
    });

    if (!editor) {
        return <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50 dark:bg-gray-800">Loading editor...</div>;
    }

    return (
        <div className="space-y-4">
            <Toolbar editor={editor} />

            <div className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-900">
                <EditorContent editor={editor} />
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
                Tip: Use Markdown shortcuts (## for heading, **bold**, etc.) for faster writing
            </div>
        </div>
    );
}