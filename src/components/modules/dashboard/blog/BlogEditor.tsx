"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import React from "react";

export default function BlogEditor({ onChange }: { onChange: (content: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Image,
            Highlight,
            Placeholder.configure({
                placeholder: "Start writing your blog here...",
            }),
        ],
        content: "",
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border p-4 rounded shadow">
            <EditorContent editor={editor} />
        </div>
    );
}
