"use client";
import { TProjectFormData } from "@/types/project.type";
import { ProjectForm } from "@/components/modules/dashboard/projects/ProjectForm";
// import { useState } from "react";


export default function AddProjectPage() {
    // const [setSubmissionStatus] = useState<{
    //     success: boolean;
    //     message: string;
    // } | null>(null);

    const handleSubmit = async (data: TProjectFormData) => {
        try {
            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("techStack", JSON.stringify(data.techStack));
            formData.append("liveUrl", data.liveUrl);
            formData.append("githubUrl", data.githubUrl);

            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            // Send to your API route
            // const response = await fetch("/api/projects", {
            //     method: "POST",
            //     body: formData,
            // });

            // if (!response.ok) {
            //     throw new Error("Failed to submit project");
            // }
            console.log(data);
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Add New Project</h1>
            <ProjectForm onSubmit={handleSubmit} />
        </div>
    );
}