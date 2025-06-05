"use client";

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

// Create lowlight instance
const lowlight = createLowlight();

// Register languages with lowlight
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

interface BlogEditorProps {
    onChange: (html: string, json: any) => void;
    initialContent?: string;
}

export default function BlogEditor({ onChange, initialContent = "" }: BlogEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
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
            Highlight.configure({
                multicolor: true,
            }),
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
                class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4",
                style: `
        p {
            margin: 0.75rem 0;
            line-height: 1.6;
        }
        h1 { 
            border-left: 4px solid #3b82f6; 
            padding-left: 0.75rem; 
            margin: 1rem 0; 
        }
        h2 { 
            border-left: 3px solid #3b82f6; 
            padding-left: 0.75rem; 
            margin: 0.8rem 0;
        }
        h3 {
            border-left: 2px solid #3b82f6;
            padding-left: 0.75rem;
            margin: 0.7rem 0;
            font-weight: 600;
        }
        h4, h5, h6 {
            margin: 0.6rem 0;
            font-weight: 600;
        }
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

    if (!editor) {
        return (
            <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50 dark:bg-gray-800 animate-pulse">
                Loading editor...
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {/* Sticky Toolbar */}
            <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b">
                <Toolbar editor={editor} />
            </div>

            {/* Editor */}
            <div className="border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-900">
                <EditorContent editor={editor} />
            </div>

            {/* Tip */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
                Tip: Use Markdown shortcuts (## for heading, **bold**, etc.) for faster writing
            </div>
        </div>

    );
}