"use client";

import BlogEditor from "@/components/modules/dashboard/blog/BlogEditor";
import { useState } from "react";

const WriteBlogPage = () => {
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        // const response = await fetch("/api/blogs", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ content }),
        // });

        // if (response.ok) {
        //     alert("Blog saved!");
        // }
        console.log(content);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Write a Blog</h1>
            <BlogEditor onChange={setContent} />
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                Publish
            </button>
        </div>
    );
};

export default WriteBlogPage;
