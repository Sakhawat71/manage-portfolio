"use client"
import ProjectForm from "@/components/modules/dashboard/projects/ProjectForm";
import { TProjectFormData } from "@/types/project.type";
import { useState } from "react";


export default function AddProjectPage() {
    const [submissionStatus, setSubmissionStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

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
            const response = await fetch("/api/projects", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to submit project");
            }

            setSubmissionStatus({
                success: true,
                message: "Project submitted successfully!",
            });
        } catch (error) {
            console.error("Submission error:", error);
            setSubmissionStatus({
                success: false,
                message: "Failed to submit project. Please try again.",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Add New Project</h1>

            {submissionStatus && (
                <div
                    className={`mb-4 p-4 rounded-md ${submissionStatus.success
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                >
                    {submissionStatus.message}
                </div>
            )}

            <ProjectForm onSubmit={handleSubmit} />
        </div>
    );
}