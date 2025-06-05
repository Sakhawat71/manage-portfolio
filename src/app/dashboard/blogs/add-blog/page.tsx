'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
import { createBlog } from "@/services/blog";
import BlogEditor from "@/components/modules/dashboard/blog/BlogEditor";
// import BlogEditor from "@/components/test/BlogEditor";

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

        const title = "hello world"
        const data = {
            title: "New Blog Post",
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            content: content.html,
        }

        try {

            // const res = await createBlog(data);
            // console.log(res);
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
        <div className="container mx-auto px-0 py-2 max-w-5xl">
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
