"use client"

import AddSkillPage from '@/components/modules/dashboard/skills/CreateSkillComponent';
import { createSkill } from '@/services/skills';
import React from 'react';
import toast from 'react-hot-toast';


type TSkillForm = {
    name: string;
    type: string;
    icon: FileList | null;
};

const CreateSkillPage = () => {

    const handleSubmit = async (data: TSkillForm) => {
        try {
            const formData = new FormData();
            const textData = {
                name: data.name,
                type: data.type
            };

            formData.append("data", JSON.stringify(textData));
            if (data.icon && data.icon[0]) {
                formData.append("icon", data.icon[0]);
            }

            // console.log(data);
            const res = await createSkill(formData);
            // console.log(res);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to submit Skill");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-1 text-center">Add New Skill</h2>
            <AddSkillPage onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateSkillPage;