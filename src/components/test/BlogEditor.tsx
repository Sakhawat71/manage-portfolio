"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
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
import { useEffect, useState } from "react";

// Create lowlight instance
const lowlight = createLowlight();

// Register languages
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

interface BlogEditorProps {
    onChange: (html: string, json: any) => void;
    initialContent?: string;
}

export default function BlogEditor({ onChange, initialContent = "" }: BlogEditorProps) {
    const [title, setTitle] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
                heading: {
                    levels: [1, 2],
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: "plaintext",
            }),
            TextAlign.configure({
                types: ["heading", "paragraph", "image"],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 hover:underline",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-lg border mx-auto max-w-full h-auto",
                },
            }),
            Highlight.configure({
                multicolor: true,
            }),
            Underline,
            Placeholder.configure({
                placeholder: "Write your content here...",
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
          h1 { border-left: 4px solid #3b82f6; padding-left: 0.75rem; margin: 1.5rem 0 1rem; }
          h2 { border-left: 3px solid #3b82f6; padding-left: 0.75rem; margin: 1.25rem 0 0.75rem; }
          img { transition: all 0.2s ease; }
          img:hover { box-shadow: 0 0 0 2px #3b82f6; }
          a { text-decoration: none; }
        `,
            },
            handleDOMEvents: {
                keydown: (view, event) => {
                    if (event.key === "Enter" && title === "") {
                        setTitle(editor?.getText().split("\n")[0] || "");
                        return false;
                    }
                    return false;
                },
            },
        },
    });

    const addImage = () => {
        const url = window.prompt("Enter image URL") || "";
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) return;

        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    if (!editor) {
        return <div className="border rounded-lg p-4 min-h-[300px] bg-background animate-pulse">Loading editor...</div>;
    }

    return (
        <div className="space-y-4">

            {/* Editor Toolbar */}
            <Toolbar editor={editor} addImage={addImage} setLink={setLink} />

            {/* Title Input */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title"
                className="w-full text-3xl font-bold border-none focus:ring-0 focus:outline-none bg-white py-1 px-2 rounded-lg shadow-sm mb-4"
            />

            {/* Bubble Menu for Links */}
            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    {editor.isActive("link") ? (
                        <div className="flex gap-1 bg-white dark:bg-gray-800 p-1 rounded-md shadow-lg border">
                            <button
                                onClick={() => editor.chain().focus().unsetLink().run()}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                                Remove Link
                            </button>
                            <button
                                onClick={setLink}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                                Edit Link
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={setLink}
                            className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg border"
                        >
                            Add Link
                        </button>
                    )}
                </BubbleMenu>
            )}

            {/* Editor Content */}
            <div className="border rounded-lg overflow-hidden shadow-sm bg-background">
                <EditorContent editor={editor} />
            </div>

            {/* Image Resize Handles (Example) */}
            {editor?.isActive("image") && (
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() => editor.chain().focus().setImage({ width: "50%" }).run()}
                        className="px-2 py-1 text-xs border rounded"
                    >
                        50% Width
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setImage({ width: "100%" }).run()}
                        className="px-2 py-1 text-xs border rounded"
                    >
                        Full Width
                    </button>
                </div>
            )}
        </div>
    );
}