"use client";

import { useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";

interface EditorTitleProps {
    editor: ReturnType<typeof useEditor>;
}

export function EditorTitle({ editor }: EditorTitleProps) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (!editor) return;

        // Get initial title from editor JSON
        const json = editor.getJSON();
        if (json.content?.[0]?.type === "heading") {
            setTitle(json.content[0].content?.[0]?.text || "");
        }
    }, [editor]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (!editor) return;

        // Update the first heading in the document
        const { state } = editor;
        const { doc } = state;

        // Find the first heading node
        let found = false;
        doc.descendants((node, pos) => {
            if (found || node.type.name !== "heading") return;

            editor
                .chain()
                .focus()
                .command(({ tr }) => {
                    tr.replaceWith(pos, pos + node.nodeSize,
                        state.schema.nodes.heading.create(
                            { level: 1 },
                            state.schema.text(e.target.value)
                        ))
                    return true;
                })
                .run();

            found = true;
        });

        // If no heading exists, insert one at the start
        if (!found && e.target.value) {
            editor
                .chain()
                .focus()
                .insertContentAt(0, {
                    type: "heading",
                    attrs: { level: 1 },
                    content: [{ type: "text", text: e.target.value }],
                })
                .run();
        }
    };

    return (
        <div className="mb-6">
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Blog post title..."
                className="w-full text-4xl font-bold border-none outline-none bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 w-24" />
        </div>
    );
}