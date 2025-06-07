"use client";
import { TProjectFormData } from "@/types/project.type";
import { ProjectForm } from "@/components/modules/dashboard/projects/ProjectForm";
import toast from "react-hot-toast";
import { createProject } from "@/services/project";


export default function AddProjectPage() {

    const handleSubmit = async (data: TProjectFormData) => {
        try {
            const formData = new FormData();
            const textData = {
                title: data.title,
                description: data.description,
                techStack: data.techStack,
                liveUrl: data.liveUrl,
                githubUrl: data.githubUrl,
                isTeam: data.isTeam,
                teamSize: Number(data.teamSize),
                roleInTeam: data.roleInTeam,
                startDate: data.startDate,
                endDate: data.endDate
            };

            // console.log('textData', textData);

            formData.append("data", JSON.stringify(textData));
            if (data.image && data.image[0]) {
                formData.append("image", data.image[0]);
            }

            const res = await createProject(formData);
            // console.log(res);
            if (res.success) {
                toast.success(res.message);
            } else {
                // toast.error(`${res.meta.target} should be unique` || 'Failed to create project');
                toast.error(res.message)
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to submit project");
        }
    };



    return (
        <div className="container mx-auto px-4 py-8">
            <ProjectForm onSubmit={handleSubmit} />
        </div>
    );
}