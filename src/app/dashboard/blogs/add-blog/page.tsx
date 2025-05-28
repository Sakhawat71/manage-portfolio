"use client"

import TiptapEditor from "@/components/modules/dashboard/blog/TiptapEditor"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { useState } from "react"

export default function CreateBlogPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ title, content }) // send to your API
    }

    return (
        // <SimpleEditor />
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4 p-4">
            <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded"
            />

            <TiptapEditor content={content} onChange={setContent} />

            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Publish
            </button>
        </form>
    )
}
