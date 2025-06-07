"use client";
import { TProjectFormData } from "@/types/project.type";
import { ProjectForm } from "@/components/modules/dashboard/projects/ProjectForm";
import toast from "react-hot-toast";
import { createProject } from "@/services/project";


export default function AddProjectPage() {

    const handleSubmit = async (data: TProjectFormData) => {
        try {
            const formData = new FormData();

            // Create the text object
            const textData = {
                title: data.title,
                description: data.description,
                techStack: data.techStack,
                liveUrl: data.liveUrl,
                githubUrl: data.githubUrl,
            };

            formData.append("data", JSON.stringify(textData));
            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            const res = await createProject(formData);
            console.log(res);
            toast.success(res.message);
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to submit project");
        }
    };



    return (
        <div className="container mx-auto px-4 py-8">
            <ProjectForm onSubmit={handleSubmit} />
        </div>
    );
}