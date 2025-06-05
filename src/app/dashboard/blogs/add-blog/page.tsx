'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
import { createBlog } from "@/services/blog";
import BlogEditor from "@/components/modules/dashboard/blog/BlogEditor";
import { BlogMetaEditor } from "@/components/modules/dashboard/blog/BlogMetaEditor";

interface BlogContent {
    html: string;
    json?: any;
}

const WriteBlogPage = () => {
    const [content, setContent] = useState<BlogContent>({ html: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [blogMeta, setBlogMeta] = useState<{ title: string; tags: string[] }>({
        title: "",
        tags: [],
    });

    const handleSubmit = async () => {
        if (!content.html || content.html === "<p></p>") {
            toast.error("Blog content cannot be empty");
            return;
        }
        setIsSubmitting(true);

        const { title, tags } = blogMeta;
        const data = {
            title,
            tags,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            contentHtml: content.html,
            contentJson: content.json,
        }

        try {
            const res = await createBlog(data);
            // console.log(res);
            if(res.success){
                toast.success(res.message);
            }else{
                toast.error(res.message)
            }
            // console.log("Blog content:", data);
        } catch (error) {
            toast.error("Failed to save blog. Please try again.");
            console.error("Error saving blog:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-0 py-2 max-w-5xl">
            <BlogMetaEditor
                onChange={setBlogMeta}
            />

            <BlogEditor
                onChange={(html, json) => setContent({ html, json })}
            />

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
