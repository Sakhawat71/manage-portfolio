'use client'

import { useState } from "react";
import BlogEditor from "@/components/modules/dashboard/blog/BlogEditor";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';

interface BlogContent {
    html: string;
    json?: any;
}

const WriteBlogPage = () => {
    const [content, setContent] = useState<BlogContent>({ html: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!content.html || content.html === "<p></p>") {
            toast.error("Blog content cannot be empty");
            return;
        }

        setIsSubmitting(true);

        try {
            // Uncomment when ready to connect to your API
            // const response = await fetch("/api/blogs", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ content }),
            // });

            // if (!response.ok) throw new Error("Failed to save blog");

            toast.success("Blog saved successfully!");
            console.log("Blog content:", content);
        } catch (error) {
            toast.error("Failed to save blog. Please try again.");
            console.error("Error saving blog:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Write a New Blog Post</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Share your knowledge and ideas with the world
                </p>
            </header>

            <BlogEditor onChange={(html, json) => setContent({ html, json })} />

            <div className="mt-6 flex justify-end">
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !content.html || content.html === "<p></p>"}
                    className="min-w-32"
                >
                    {isSubmitting ? "Publishing..." : "Publish"}
                </Button>
            </div>
        </div>
    );
};

export default WriteBlogPage;
